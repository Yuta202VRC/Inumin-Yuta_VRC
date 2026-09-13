// connection — ToN Web Manager
function connect() {
        clearTimeout(reconnectTimer);
        const generation = ++socketGeneration;
        if (socket) { socket.onopen = socket.onmessage = socket.onerror = socket.onclose = null; socket.close(); }
        abandonInterruptedRound();
        elements.curState.textContent = '接続待ち'; elements.curState.style.color = 'var(--warning)';
        handleInstanceUpdate('未接続');
        try { socket = new WebSocket(wsUrl); }
        catch (error) { elements.curState.textContent = '接続先を確認してください'; elements.curState.style.color = 'var(--accent)'; return; }
        const activeSocket = socket;
        socket.onopen = () => { if (generation !== socketGeneration) return; elements.curState.textContent = "接続中"; elements.curState.style.color = "var(--success)"; };
        socket.onmessage = (event) => {
            if (generation !== socketGeneration) return;
            try {
                const data = JSON.parse(event.data);
                if (!data || typeof data !== 'object') return;
                switch(data.type || data.Type) {
                    case "INSTANCE": handleInstanceUpdate(data.Value || data.Id || "未接続"); break;
                    case "ROUND_TYPE":
                        if (data.Command === 1) {
                            if (currentRoundData.active) break; 
                            currentRoundData.type = typeof data.Name === 'string' && data.Name ? data.Name : "Classic"; currentRoundData.active = true; currentRoundData.isDead = false; activeTerrorSet.clear(); 
                            elements.curRoundType.textContent = currentRoundData.type; elements.curRoundType.className = "status-val searching"; elements.curTerror.textContent = "探索中..."; 
                            clearShopWarning(); parseGameEvents(null, currentRoundData.type); 
                            localPlayerInfo.isAlive = true;
                            if (isInRoom) {
                                if (isHost) { let p = roomPlayers.find(p => p.peerId === peer.id); if(p) p.info.isAlive = true; broadcastRoomState(); } 
                                else { sendToNetwork({ type: "ALIVE_STATE", isAlive: true }); }
                            }
                        }
                        else if (data.Command === 0) { 
                            if (Array.isArray(data.Names) && data.Names.length > 0) data.Names.forEach(name => { handleTerrorDetection(name); }); 
                            finishRoundDisplay();
                        }
                        checkSpecialEffect(); if(isHost && data.Command === 1) sendToNetwork({ type: "SYNC_ROUND", roundType: currentRoundData.type, active: true });
                        break;
                    case "TERRORS":
                        if (Array.isArray(data.Names) && data.Names.length > 0) { data.Names.forEach(name => handleTerrorDetection(name)); } 
                        else if (typeof data.DisplayName === 'string' && data.DisplayName.trim() !== "") { handleTerrorDetection(data.DisplayName); }
                        updateActiveTerrorDisplay(); checkSpecialEffect();
                        break;
                    case "ALIVE": 
                        if (data.Value === false && currentRoundData.active) {
                            currentRoundData.isDead = true; localPlayerInfo.isAlive = false;
                            if (isInRoom) {
                                if (isHost) { let p = roomPlayers.find(p => p.peerId === peer.id); if(p) p.info.isAlive = false; broadcastRoomState(); } 
                                else { sendToNetwork({ type: "ALIVE_STATE", isAlive: false }); }
                            }
                        }
                        break;
                    case "ROUND_ACTIVE": 
                        if (data.Value === false) { 
                            if (Array.isArray(data.Names) && data.Names.length > 0) data.Names.forEach(n => handleTerrorDetection(n)); 
                            finishRoundDisplay();
                        } 
                        break;
                }
            } catch (err) { console.warn('ToN: 受信データを処理できませんでした', err); }
        };
        socket.onclose = () => { if (generation !== socketGeneration) return; abandonInterruptedRound(); elements.curState.textContent = "切断中"; elements.curState.style.color = "var(--accent)"; handleInstanceUpdate("未接続"); reconnectTimer = setTimeout(connect, 4000); };
        socket.onerror = () => { if (generation === socketGeneration) activeSocket.close(); };
    }
    
    loadLogs(); updateCountersDisplay(); updateLamps(); renderTerrorDatabase(); renderTables(); connect();
