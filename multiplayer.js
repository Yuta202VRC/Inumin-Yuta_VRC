// multiplayer — ToN Web Manager
function saveSession() {
        if (!isInRoom) return;
        storage.setItem('ton_session', JSON.stringify({
            roomId: currentRoomName, type: currentRoomType, pwd: currentRoomPassword, isHost: isHost, anon: localPlayerInfo.isAnonymous
        }));
    }
    function clearSession() { storage.removeItem('ton_session'); }

    window.onload = async () => {
        if (elements.myPlayerNameInput.value.includes('#')) await validatePlayerName();
        const savedSession = storage.getItem('ton_session');
        if (savedSession) {
            try {
                const data = JSON.parse(savedSession);
                if (typeof data.roomId !== 'string' || !['public','private'].includes(data.type)) throw Error('Invalid session');
                let roomDesc = data.type === 'public' ? "オープン部屋" : `鍵部屋 (ID: ${escapeHtml(data.roomId.substring(0,8))}...)`;
                let hostDesc = data.isHost ? "【ホスト】として作成" : "【ゲスト】として参加";
                document.getElementById('reconnectMsg').innerHTML = `前回のセッション情報が残っています。<br><br>対象: ${roomDesc}<br>状態: ${hostDesc}<br><br>自動的に復帰しますか？`;
                toggleModal('reconnectModal', true);
            } catch(e) { clearSession(); }
        }
    };

    async function confirmReconnect(yes) {
        toggleModal('reconnectModal', false);
        if (yes) {
            let data;
            try {
                data = JSON.parse(storage.getItem('ton_session'));
                if (!data || typeof data.roomId !== 'string' || !['public','private'].includes(data.type)) throw Error();
            } catch { clearSession(); alert('再接続情報がありません。部屋を選び直してください。'); return; }
            if (!await validatePlayerName()) return;
            
            if (data.isHost) {
                elements.createRoomType.value = data.type; elements.createPassword.value = data.pwd || ""; createRoom(true, data.roomId);
            } else {
                if (data.type === 'public') {
                    let searchId = data.roomId.replace("ton_pub_", ""); elements.searchInstanceId.value = searchId; joinOpenRoom(true, data.roomId);
                } else {
                    elements.joinRoomName.value = data.roomId; elements.joinPassword.value = data.pwd || ""; joinRoom(false, data.roomId, data.pwd);
                }
            }
        } else { clearSession(); }
    }

    async function validatePlayerName() {
        const rawName = elements.myPlayerNameInput.value.trim();
        if (!rawName) { alert('ユーザー名を入力してください。'); return false; }
        const displayName = rawName.split('#')[0].trim().slice(0,80);
        if (!displayName) { alert('表示名を入力してください。'); return false; }
        let isCreatorName = false;
        if (rawName.includes('#')) {
            try {
                const bytes = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(rawName));
                isCreatorName = Array.from(new Uint8Array(bytes),b=>b.toString(16).padStart(2,'0')).join('') === CREATOR_NAME_DIGEST;
            } catch { alert('コードを確認できませんでした。HTTPSのページまたはローカルのindex.htmlを開いてください。'); return false; }
            if (elements.myPlayerNameInput.value.trim() !== rawName) return false;
        } else {
            isCreatorName = displayName === '犬峰ゆた' && storage.getItem('ton_creator_badge') === CREATOR_NAME_DIGEST;
        }
        localPlayerName = displayName;
        localVrcId = isCreatorName ? AUTHOR_ID : 'guest_' + newRecordId();
        storage.setItem('ton_multi_player_name',displayName);
        if (isCreatorName) storage.setItem('ton_creator_badge',CREATOR_NAME_DIGEST); else storage.removeItem('ton_creator_badge');
        elements.myPlayerNameInput.value = displayName;
        return true;
    }

    function sanitizeInstanceIdForPeer(rawStr) {
        if (!generateVRChatUrl(rawStr) || !rawStr.includes(':')) return null;
        return rawStr.replace(/[^a-zA-Z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '').toLowerCase();
    }

    function switchMultiTab(tabType) {
        elements.tabCreate.classList.remove('active'); elements.tabJoin.classList.remove('active'); elements.tabOpenSearch.classList.remove('active');
        elements.multiCreateSection.style.display = 'none'; elements.multiJoinSection.style.display = 'none'; elements.multiOpenSection.style.display = 'none';

        if (tabType === 'create') { elements.tabCreate.classList.add('active'); elements.multiCreateSection.style.display = 'block'; } 
        else if (tabType === 'join') { elements.tabJoin.classList.add('active'); elements.multiJoinSection.style.display = 'block'; } 
        else if (tabType === 'open') { elements.tabOpenSearch.classList.add('active'); elements.multiOpenSection.style.display = 'block'; fillCurrentInstance(); }
    }

    function toggleCreatePassword() {
        if (elements.createRoomType.value === 'public') { elements.createPasswordGroup.style.display = 'none'; elements.createPassword.value = ''; } 
        else { elements.createPasswordGroup.style.display = 'block'; }
    }

    function fillCurrentInstance() {
        if (currentInstanceRawString !== "未接続" && currentInstanceRawString !== "") { elements.searchInstanceId.value = currentInstanceRawString; }
    }

    function enterRoomUI(roomId, type, pwd) {
        isInRoom = true; currentRoomName = roomId; currentRoomType = type; currentRoomPassword = pwd; multiSessionSurvival = 0; sessionStreak = 0; maxStreak = 0;
        localPlayerInfo.survivalCount = 0; localPlayerInfo.sessionStreak = 0; localPlayerInfo.maxStreak = 0; elements.myTagSelect.value = "none"; localPlayerInfo.tag = "none";
        
        let displayStr = type === 'public' ? "オープン部屋 (ID連携)" : "Room ID: " + roomId.substring(0, 8) + "...";
        elements.displayRoomName.textContent = displayStr; elements.multiplayerPanel.style.display = "block";
        elements.btnCopyInvite.style.display = type === 'private' ? "inline-block" : "none";
        elements.roomSharedDataCard.style.display = !isHost ? "block" : "none";
        toggleModal('multiplayerModal', false);
        
        if(type === 'public') { elements.multiPrivateContent.style.display = "none"; elements.multiPublicContent.style.display = "block"; } 
        else { elements.multiPrivateContent.style.display = "block"; elements.multiPublicContent.style.display = "none"; }
        saveSession();
    }

    let peerGeneration = 0;
    let connectionTimeout;
    function resetRoomConnection(clearSaved = true) {
        ++peerGeneration; clearTimeout(connectionTimeout);
        const oldPeer = peer; peer = null;
        isInRoom = false; isHost = false; hostConnection = null; connections = []; roomPlayers = [];
        roomAltHistory = []; roomTrackerState = normalizeTracker({});
        elements.roomAltHistoryBody.innerHTML = '';
        document.querySelectorAll('#roomSharedDataCard .lamp').forEach(lamp => lamp.classList.remove('active'));
        elements.playerListContainer.innerHTML = ''; elements.tagSummaryContainer.innerHTML = ''; elements.teamSurvivalRate.textContent = '0%';
        elements.multiplayerPanel.style.display = 'none'; elements.roomSharedDataCard.style.display = 'none';
        document.querySelectorAll('#multiplayerModal button').forEach(b=>b.disabled=false);
        if (oldPeer) oldPeer.destroy();
        if (clearSaved) clearSession();
    }
    function startPeer(id) {
        if (typeof Peer !== 'function') { alert('マルチプレイ通信を読み込めませんでした。ネット接続を確認し、ページを再読み込みしてください。'); return null; }
        resetRoomConnection(false);
        const generation = peerGeneration;
        try { peer = id ? new Peer(id) : new Peer(); }
        catch (error) { failRoom('接続を開始できませんでした。'); return null; }
        connectionTimeout = setTimeout(()=> { if (generation === peerGeneration) failRoom('接続がタイムアウトしました。部屋IDとネット接続を確認してください。'); },20000);
        peer.on('error', error => { if (generation === peerGeneration) failRoom(error.type === 'unavailable-id' ? 'この部屋IDは使用中です。オープン部屋を検索するか、後で再接続してください。' : error.type === 'peer-unavailable' ? '部屋が見つかりません。IDとホストの接続を確認してください。' : '通信エラー: '+error.type); });
        peer.on('disconnected', ()=> { if (generation === peerGeneration) failRoom('通信サーバーから切断されました。マルチプレイ連携から再接続してください。'); });
        return generation;
    }
    function failRoom(message) { resetRoomConnection(false); alert(message); }
    function cleanPlayer(info, host = false, anonymous = false) {
        info = isRecord(info) ? info : {};
        return {vrcId:typeof info.vrcId === 'string' ? info.vrcId.slice(0,80) : '',name:typeof info.name==='string' ? info.name.slice(0,80) : 'Player',tag:Object.hasOwn(tagNamesMap, info.tag) ? info.tag : 'none',isAlive:info.isAlive !== false,survivalCount:count(info.survivalCount),sessionStreak:count(info.sessionStreak),maxStreak:count(info.maxStreak),isHost:host,isAnonymous:anonymous};
    }
    async function createRoom(isRecovery = false, forceId = null) {
        if (!await validatePlayerName()) return;
        const type = elements.createRoomType.value; const pwd = elements.createPassword.value.trim();
        let id = forceId;
        if (type === 'public' && !id) {
            const safe = sanitizeInstanceIdForPeer(currentInstanceRawString);
            if (!safe) { alert('インスタンスに接続してからオープン部屋を作成してください。'); return; }
            id = 'ton_pub_'+safe;
        }
        if (type === 'private' && !pwd) { alert('鍵部屋のパスワードを入力してください。'); return; }
        const generation = startPeer(id); if (generation === null) return;
        peer.on('open', id => {
            if (generation !== peerGeneration) return;
            clearTimeout(connectionTimeout); isHost = true;
            localPlayerInfo = cleanPlayer({vrcId:localVrcId,name:localPlayerName,isAlive:!currentRoundData.isDead},true,false);
            roomPlayers = [{peerId:id,info:localPlayerInfo}]; enterRoomUI(id,type,pwd); broadcastRoomState();
        });
        peer.on('connection', conn => {
            let accepted = false;
            conn.on('open', ()=> {
                if (generation !== peerGeneration || !isHost || !isInRoom) { conn.close(); return; }
                if (currentRoomType === 'private' && conn.metadata?.password !== currentRoomPassword) {
                    conn.send({type:'ERROR',message:'パスワードが違います。'}); setTimeout(()=>conn.close(),300); return;
                }
                accepted = true; connections.push(conn);
                roomPlayers.push({peerId:conn.peer,info:cleanPlayer(conn.metadata?.playerInfo,false,currentRoomType==='public')});
                conn.send({type:'JOIN_ACCEPTED'}); broadcastRoomState();
                conn.send({type:'SYNC_FULL_STATE',altHistory,trackerState});
            });
            conn.on('data', data=> { if (accepted && generation === peerGeneration) handleNetworkDataHost(conn.peer,data); });
            conn.on('close', ()=> {
                if (!accepted || generation !== peerGeneration) return;
                connections = connections.filter(c=>c!==conn); roomPlayers = roomPlayers.filter(p=>p.peerId!==conn.peer); broadcastRoomState();
            });
            conn.on('error', ()=>conn.close());
        });
    }
    async function joinRoom(isOpenRoom, forceId = null, forcePwd = null) {
        if (!await validatePlayerName()) return;
        let id = forceId; const pwd = forcePwd ?? (isOpenRoom ? '' : elements.joinPassword.value.trim());
        if (!id && isOpenRoom) {
            const safe = sanitizeInstanceIdForPeer(elements.searchInstanceId.value.trim());
            if (!safe) { alert('有効なインスタンスIDを入力してください。'); return; } id = 'ton_pub_'+safe;
        }
        if (!id) id = elements.joinRoomName.value.trim();
        if (!id) { alert('部屋IDを入力してください。'); return; }
        const generation = startPeer(); if (generation === null) return;
        localPlayerInfo = cleanPlayer({vrcId:localVrcId,name:localPlayerName,isAlive:!currentRoundData.isDead},false,isOpenRoom);
        const accept = () => {
            if (isInRoom) return;
            clearTimeout(connectionTimeout); enterRoomUI(id,isOpenRoom?'public':'private',pwd);
        };
        peer.on('open', ()=> {
            if (generation !== peerGeneration) return;
            hostConnection = peer.connect(id,{metadata:{password:pwd,playerInfo:localPlayerInfo}});
            hostConnection.on('data', data=> {
                if (generation !== peerGeneration || !isRecord(data)) return;
                // Old hosts send ROOM_STATE_UPDATE after password validation.
                if (data.type === 'JOIN_ACCEPTED' || data.type === 'ROOM_STATE_UPDATE') accept();
                if (data.type === 'ERROR' || isInRoom) handleNetworkDataClient(data);
            });
            hostConnection.on('close', ()=> { if (generation === peerGeneration) failRoom('ホストから切断されました。'); });
            hostConnection.on('error', ()=> { if (generation === peerGeneration) failRoom('ホストとの通信に失敗しました。'); });
        });
    }
    function joinOpenRoom(isRecovery = false, forceId = null) { return joinRoom(true,forceId,null); }
    function leaveRoom() { resetRoomConnection(true); }
    function sendToNetwork(data) {
        if (!isInRoom) return;
        const recipients = isHost ? connections : [hostConnection];
        for (const conn of recipients) if (conn?.open) { try { conn.send(data); } catch { showNotice('共有データを送信できませんでした。接続状態を確認してください。'); } }
    }
    function broadcastRoomState() {
        if (!isHost) return;
        const state = {players:roomPlayers.map(p=>p.info)};
        sendToNetwork({type:'ROOM_STATE_UPDATE',state}); renderMultiplayerState(state);
    }
    function handleNetworkDataHost(peerId, data) {
        if (!isRecord(data)) return;
        const player = roomPlayers.find(p=>p.peerId===peerId); if (!player) return;
        if (data.type === 'UPDATE_TAG') player.info.tag = Object.hasOwn(tagNamesMap,data.tag) ? data.tag : 'none';
        else if (data.type === 'ALIVE_STATE' && typeof data.isAlive === 'boolean') player.info.isAlive = data.isAlive;
        else if (data.type === 'UPDATE_STATS') {
            player.info.survivalCount = count(data.survivalCount); player.info.sessionStreak = count(data.sessionStreak); player.info.maxStreak = count(data.maxStreak);
        } else return;
        broadcastRoomState();
    }
    function handleNetworkDataClient(data) {
        if (!isRecord(data)) return;
        if (data.type === 'ERROR') { failRoom(typeof data.message === 'string' ? data.message : '参加できませんでした。'); }
        else if (data.type === 'ROOM_STATE_UPDATE' && Array.isArray(data.state?.players)) renderMultiplayerState({players:data.state.players.filter(isRecord).map(p=>cleanPlayer(p,p.isHost===true,p.isAnonymous===true))});
        else if (data.type === 'SYNC_FULL_STATE') { roomAltHistory = normalizeHistory(data.altHistory).slice(0,maxHistorySave); roomTrackerState = normalizeTracker(data.trackerState); updateRoomSharedUI(); }
        else if (data.type === 'SYNC_HISTORY') {
            const row = normalizeHistory([data.log])[0];
            if (row?.isAlt && !roomAltHistory.some(r=>r.id===row.id)) { roomAltHistory.unshift(row); roomAltHistory = roomAltHistory.slice(0,maxHistorySave); updateRoomSharedUI(); }
        }
        else if (data.type === 'SYNC_ENVIRONMENT') { roomTrackerState = normalizeTracker(data.tracker); updateRoomSharedUI(); }
        else if (data.type === 'SYNC_ROUND') { if (data.active === false) checkShopWarningNeeds(data.roundType); else if (data.active === true) clearShopWarning(); }
    }

    function updateRoomSharedUI() {
        if (!isInRoom || isHost) return;
        document.getElementById('rLampMystic').classList.toggle('active', roomTrackerState.mystic); document.getElementById('rLampTwilight').classList.toggle('active', roomTrackerState.twilight);
        document.getElementById('rLampBlood').classList.toggle('active', roomTrackerState.blood); document.getElementById('rLampSolstice').classList.toggle('active', roomTrackerState.solstice);
        document.getElementById('rLampBigBird').classList.toggle('active', roomTrackerState.bigBird); document.getElementById('rLampPunishingBird').classList.toggle('active', roomTrackerState.punishingBird);
        document.getElementById('rLampJudgementBird').classList.toggle('active', roomTrackerState.judgementBird);
        
        elements.roomAltHistoryBody.innerHTML = "";
        if (roomAltHistory.length === 0) { elements.roomAltHistoryBody.innerHTML = '<tr><td colspan="3" style="text-align: center; color: var(--text-muted);">共有された特殊記録はありません</td></tr>'; return; }
        roomAltHistory.slice(0, 30).forEach((item) => {
            const row = document.createElement('tr'); const typeLower = item.type ? item.type.toLowerCase() : "";
            let typeHtml = `<span class="terror-midnight">${escapeHtml(item.type)}</span>`;
            if (typeLower.includes("alternate")) typeHtml = `<span class="terror-alt">${escapeHtml(item.type)}</span>`;
            else if (typeLower.includes("cold night")) typeHtml = `<span class="terror-cold">${escapeHtml(item.type)}</span>`;
            row.innerHTML = `<td>${escapeHtml(item.time)}</td><td>${typeHtml}</td><td>${formatTerrorsForTable(item.terrors)}</td>`; elements.roomAltHistoryBody.appendChild(row);
        });
    }

    function updateMyTag() {
        if(!isInRoom || currentRoomType === 'public') return;
        const tag = elements.myTagSelect.value; localPlayerInfo.tag = tag;
        if (isHost) { let p = roomPlayers.find(p => p.peerId === peer.id); if(p) p.info.tag = tag; broadcastRoomState(); } 
        else { sendToNetwork({ type: "UPDATE_TAG", tag: tag }); }
    }

    function forceRespawn() {
        if(!isInRoom || currentRoomType === 'public') return;
        if (!currentRoundData.active) { alert('ラウンド中のみ宣言できます。'); return; }
        if(!confirm("任意リスポーンを宣言し、死亡扱いとしてチームに共有しますか？")) return;
        currentRoundData.isDead = true; localPlayerInfo.isAlive = false; sessionStreak = 0; localPlayerInfo.sessionStreak = 0;
        if (isHost) { let p = roomPlayers.find(p => p.peerId === peer.id); if(p) { p.info.isAlive = false; p.info.sessionStreak = 0; } broadcastRoomState(); } 
        else { sendToNetwork({ type: "ALIVE_STATE", isAlive: false }); sendToNetwork({ type: "UPDATE_STATS", survivalCount: localPlayerInfo.survivalCount, sessionStreak: 0, maxStreak: localPlayerInfo.maxStreak }); }
    }

    function renderMultiplayerState(state) {
        const renderList = state.players || []; elements.playerListContainer.innerHTML = '';
        let totalAlive = 0; let validPlayers = 0; const tagCounts = {}; let maxBestInRoom = 0; let currentBestInRoom = 0;
        renderList.forEach(p => { if (!p.isAnonymous) { if (p.maxStreak > maxBestInRoom) maxBestInRoom = p.maxStreak; if (p.sessionStreak > currentBestInRoom) currentBestInRoom = p.sessionStreak; } });

        renderList.forEach(player => {
            if (player.isAnonymous) return;
            const li = document.createElement('li'); li.className = `player-item ${!player.isAlive ? 'dead' : ''}`;
            let hostMark = player.isHost ? '<span class="host-mark">⭐</span>' : ''; let isAuthor = player.vrcId === AUTHOR_ID; // Display badge only; grants no room permissions.
            let hasMaxCrown = (player.maxStreak > 0 && player.maxStreak === maxBestInRoom); let hasCurrentFire = (player.sessionStreak > 0 && player.sessionStreak === currentBestInRoom);

            let crownHtml = hasMaxCrown ? `<span class="streak-crown">👑</span>` : ''; let fireHtml = hasCurrentFire ? `<span class="streak-fire">🔥</span>` : '';
            let currHighlightClass = hasCurrentFire ? 'current-streak-highlight' : '';

            let nameContent = `<span class="player-name">${escapeHtml(player.name)}</span>`;
            if (isAuthor) { nameContent = `<span class="dev-badge">🛠️ Creator</span> <span class="player-name" style="background: var(--dev-bg); -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-weight:bold;">${escapeHtml(player.name)}</span>`; }
            nameContent += `${crownHtml}${fireHtml}`;
            
            let statsStr = `<span style="color:var(--text-muted); font-size:0.8rem;">[生還:${player.survivalCount || 0} | 最高:<span style="color:#fff;">${player.maxStreak || 0}</span> | <span class="${currHighlightClass}">現在:${player.sessionStreak || 0}</span>]</span>`;
            let tagDisplay = player.tag !== 'none' ? `<span style="color:var(--info); font-size:0.8rem;">[${escapeHtml(tagNamesMap[player.tag] || player.tag)}]</span>` : '';
            
            li.innerHTML = `<div class="player-info">${hostMark} ${statsStr} ${nameContent}</div><div>${tagDisplay}</div>`; elements.playerListContainer.appendChild(li);
            if (player.tag !== 'afk') { validPlayers++; if (player.isAlive) totalAlive++; }
            if (player.tag !== 'none' && player.tag !== 'afk') { tagCounts[player.tag] = (tagCounts[player.tag] || 0) + 1; }
        });
        
        const rate = validPlayers > 0 ? Math.floor((totalAlive / validPlayers) * 100) : 0; elements.teamSurvivalRate.textContent = `${rate}%`;
        elements.tagSummaryContainer.innerHTML = '';
        for (const [tag, count] of Object.entries(tagCounts)) { const badge = document.createElement('div'); badge.className = 'tag-badge'; badge.textContent = `${tagNamesMap[tag] || tag}: ${count}人`; elements.tagSummaryContainer.appendChild(badge); }
    }
    
    function copyInviteInfo() {
        if(!isInRoom) return; const typeStr = currentRoomType === 'private' ? "鍵部屋" : "オープン部屋";
        const inviteText = `【ToN マルチプレイ連携】\n部屋ID: ${currentRoomName}\nパスワード: ${currentRoomPassword || 'なし'}\n（${typeStr}）\n※ツールから「部屋に参加」タブを開いて入力してください。`;
        copyText(inviteText, elements.btnCopyInvite);
    }
