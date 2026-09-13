// rounds — ToN Web Manager
function handleTerrorDetection(rawName) {
        const c = cleanTerrorName(rawName, currentRoundData.type);
        if (currentRoundData.active && c !== "") {
            activeTerrorSet.add(c);
            let hasRealTerror = Array.from(activeTerrorSet).some(t => !/^[?？]+$/.test(t));
            if (hasRealTerror) { activeTerrorSet.delete("???"); }
        }
        if (currentRoundData.active) parseGameEvents(rawName, currentRoundData.type);
    }

    function parseGameEvents(name, type) {
        const cleanedName = cleanTerrorName(name, type); const lowerName = cleanedName ? cleanedName.toLowerCase() : ""; const lowerType = type ? type.toLowerCase() : "";
        let envChanged = false;
        if (lowerName.includes("big bird") && !trackerState.bigBird) { trackerState.bigBird = true; envChanged = true; }
        if (lowerName.includes("punishing bird") && !trackerState.punishingBird) { trackerState.punishingBird = true; envChanged = true; }
        if (lowerName.includes("judgement bird") && !trackerState.judgementBird) { trackerState.judgementBird = true; envChanged = true; }
        if (lowerType.includes("mystic") && !trackerState.mystic) { trackerState.mystic = true; envChanged = true; }
        if (lowerType.includes("twilight") && !trackerState.twilight) { trackerState.twilight = true; envChanged = true; }
        if (lowerType.includes("solstice") && !trackerState.solstice) { trackerState.solstice = true; envChanged = true; }
        if (/^blood(?:\s*moon)?$/i.test(String(type).trim()) && !trackerState.blood) { trackerState.blood = true; envChanged = true; }
        
        if (envChanged) { saveLogs(); updateLamps(); }
        if(envChanged && isHost) sendToNetwork({ type: "SYNC_ENVIRONMENT", tracker: trackerState });
    }

    function generateVRChatUrl(rawString) {
        if (typeof rawString !== 'string') return '';
        rawString = rawString.trim();
        if (!/^wrld_[a-zA-Z0-9-]+(?::[^\s]+)?$/.test(rawString)) return '';
        const parts = rawString.split(':');
        return parts.length >= 2 ? "https://vrchat.com/home/launch?worldId=" + encodeURIComponent(parts[0]) + "&instanceId=" + encodeURIComponent(parts.slice(1).join(':')) : "https://vrchat.com/home/launch?worldId=" + encodeURIComponent(rawString.trim());
    }

function handleInstanceUpdate(rawString) {
        currentInstanceRawString = typeof rawString === 'string' ? rawString : '';
        const url = generateVRChatUrl(currentInstanceRawString);
        elements.curInstance.textContent = currentInstanceRawString || '未接続';
        elements.btnCopyUrl.disabled = !url; elements.btnOpenUrl.href = url || '#';
        elements.btnOpenUrl.style.display = url ? 'inline-block' : 'none'; elements.btnOpenUrlDummy.style.display = url ? 'none' : 'inline-block';
    }
function copyInstanceUrl() {
        const url = generateVRChatUrl(currentInstanceRawString);
        if (url) copyText(url, elements.btnCopyUrl);
    }

    window.addEventListener('keydown', (e) => { if (e.key === 'Escape') document.querySelectorAll('.modal-overlay.open').forEach(modal => toggleModal(modal.id, false)); });

    function finishRoundDisplay() {
        const wasActive = currentRoundData.active;
        finalizeRound();
        elements.curRoundType.textContent = '休憩時間'; elements.curRoundType.className = 'status-val intermission'; elements.curTerror.textContent = '---'; checkSpecialEffect();
        if (wasActive && isHost) sendToNetwork({type:'SYNC_ROUND',roundType:currentRoundData.type,active:false});
    }

    function abandonInterruptedRound() {
        if (!currentRoundData.active) return;
        currentRoundData.active = false; currentRoundData.isDead = false; activeTerrorSet.clear();
        elements.curRoundType.textContent = '次のラウンド待ち'; elements.curTerror.textContent = '---'; checkSpecialEffect();
        showNotice('通信が途切れたラウンドは結果を確認できないため集計しません。次のラウンドから記録を再開します。');
    }

    function updateActiveTerrorDisplay() {
        if (!currentRoundData.active) return;
        let array = Array.from(activeTerrorSet); let finalSet = new Set(array); let lowerToOriginal = {};
        array.forEach(item => lowerToOriginal[item.toLowerCase()] = item);
        for (const [key, exclusions] of Object.entries(EXCLUSION_MAP)) { if (lowerToOriginal[key.toLowerCase()]) exclusions.forEach(ex => { if (lowerToOriginal[ex.toLowerCase()]) finalSet.delete(lowerToOriginal[ex.toLowerCase()]); }); }
        
        if (finalSet.size === 0) { elements.curTerror.textContent = "探索中..."; return; }
        elements.curTerror.innerHTML = "";
        finalSet.forEach((tName) => {
            const p = document.createElement('p'); p.className = "active-terror-p";
            const nameSpan = document.createElement('span'); nameSpan.className = "clickable-terror";
            let lowerName = tName.toLowerCase();
            if (lowerName.includes("alternate")) nameSpan.classList.add('terror-alt');
            else if ([...DEFAULT_ALT_TERRORS,...customAltTerrors].some(n=>n.toLowerCase() === lowerName)) nameSpan.classList.add('terror-midnight');
            nameSpan.textContent = tName; nameSpan.onclick = () => openTerrorMemo(tName); p.appendChild(nameSpan);
            const memo = terrorMemos[tName];
            if (memo) {
                if (memo.stun) { const sBadge = document.createElement('span'); sBadge.className = "terror-badge badge-stun"; sBadge.textContent = "スタン可"; p.appendChild(sBadge); }
                if (memo.gaze) { const aBadge = document.createElement('span'); aBadge.className = "terror-badge badge-achievement"; aBadge.textContent = "実績"; p.appendChild(aBadge); }
            }
            elements.curTerror.appendChild(p);
        });
    }

    function checkShopWarningNeeds(roundType) {
        if (typeof roundType !== 'string') return; const upper = roundType.toUpperCase();
        if (upper.includes("PUNISH") || upper.includes("SABOTAGE") || upper.includes("PAGE") || upper.includes("RANDOM")) { elements.shopWarningBar.style.display = "block"; window.scrollTo({ top: 0, behavior: 'smooth' }); }
    }

    function finalizeRound() {
        if (!currentRoundData.active) return;
        currentRoundData.active = false; const timeStr = new Date().toLocaleTimeString();
        let array = Array.from(activeTerrorSet); let finalSet = new Set(array); let lowerToOriginal = {};
        array.forEach(item => lowerToOriginal[item.toLowerCase()] = item);
        for (const [key, exclusions] of Object.entries(EXCLUSION_MAP)) { if (lowerToOriginal[key.toLowerCase()]) exclusions.forEach(ex => { if (lowerToOriginal[ex.toLowerCase()]) finalSet.delete(lowerToOriginal[ex.toLowerCase()]); }); }
        activeTerrorSet = finalSet;
        
        let terrorsStr = activeTerrorSet.size > 0 ? Array.from(activeTerrorSet).join(" & ") : "不明なテラー";
        if(terrorsStr === "") terrorsStr = "不明なテラー";
        
        gameCounters.total++;
        if (!currentRoundData.isDead) { gameCounters.survival++; gameCounters.currentStreak++; }
        else { if (gameCounters.currentStreak > 0) { gameCounters.bestStreaks.push(gameCounters.currentStreak); gameCounters.bestStreaks.sort((a,b) => b-a); gameCounters.bestStreaks = gameCounters.bestStreaks.slice(0, 3); } gameCounters.currentStreak = 0; }
        
        activeTerrorSet.forEach(tName => {
            if (tName && tName !== "不明なテラー") {
                if (!Object.hasOwn(terrorDatabase, tName)) terrorDatabase[tName] = { met: 0, survived: 0 };
                terrorDatabase[tName].met++; if (!currentRoundData.isDead) terrorDatabase[tName].survived++;
            }
        });
        
        const isAlt = isSpecialRound(currentRoundData.type, terrorsStr);
        
        const logItem = { id: newRecordId(), time: timeStr, type: currentRoundData.type, terrors: terrorsStr, isDead: currentRoundData.isDead, isAlt: isAlt };
        globalHistory.unshift(logItem); 
        if (isAlt) altHistory.unshift(logItem);
        
        applyHistoryLimit(); saveLogs(); updateCountersDisplay(); renderTerrorDatabase(); renderTables(); checkShopWarningNeeds(currentRoundData.type); activeTerrorSet.clear();
        
        if (isInRoom) {
            if (!currentRoundData.isDead) {
                multiSessionSurvival++; sessionStreak++; if (sessionStreak > maxStreak) maxStreak = sessionStreak;
            } else { sessionStreak = 0; }

            localPlayerInfo.survivalCount = multiSessionSurvival; localPlayerInfo.sessionStreak = sessionStreak; localPlayerInfo.maxStreak = maxStreak;

            if (isHost) {
                let p = roomPlayers.find(p => p.peerId === peer.id);
                if(p) { p.info.survivalCount = localPlayerInfo.survivalCount; p.info.sessionStreak = localPlayerInfo.sessionStreak; p.info.maxStreak = localPlayerInfo.maxStreak; }
                broadcastRoomState(); sendToNetwork({ type: "SYNC_HISTORY", log: logItem });
            } else { sendToNetwork({ type: "UPDATE_STATS", survivalCount: localPlayerInfo.survivalCount, sessionStreak: localPlayerInfo.sessionStreak, maxStreak: localPlayerInfo.maxStreak }); }
        }
    }
