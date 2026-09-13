// storage — ToN Web Manager
function loadLogs() {
        const gLog = storage.getItem('ton_v4_global'); const aLog = storage.getItem('ton_v4_alt');
        const cLog = storage.getItem('ton_v4_counters'); const tLog = storage.getItem('ton_v4_tracker_state');
        const dLog = storage.getItem('ton_v4_terror_db'); const sLimit = storage.getItem('ton_v4_display_limit');
        const mLog = storage.getItem('ton_v5_terror_memos'); const mAlt = storage.getItem('ton_v6_custom_alt_master'); 
        const eLog = storage.getItem('ton_v7_custom_effects'); const maxH = storage.getItem('ton_v8_max_history');
        const savedPlayerName = storage.getItem('ton_multi_player_name');

        if (gLog) { try { globalHistory = JSON.parse(gLog); } catch(e){} }
        if (aLog) { try { altHistory = JSON.parse(aLog); } catch(e){} }
        if (cLog) { try { gameCounters = { ...gameCounters, ...JSON.parse(cLog) }; if (!gameCounters.bestStreaks) gameCounters.bestStreaks = [0, 0, 0]; } catch(e){} }
        if (tLog) { try { trackerState = { ...trackerState, ...JSON.parse(tLog) }; delete trackerState.coldNight; } catch(e){} } 
        if (dLog) { try { terrorDatabase = JSON.parse(dLog); } catch(e){} }
        if (mLog) { try { terrorMemos = JSON.parse(mLog); } catch(e){} }
        if (mAlt) { try { customAltTerrors = JSON.parse(mAlt); } catch(e){} }
        if (eLog) { try { customEffects = JSON.parse(eLog); } catch(e){} }
        if (sLimit) { displayMaxLimit = parseInt(sLimit, 10) || 100; elements.selectLimit.value = displayMaxLimit; }
        if (!Object.hasOwn(gameCounters, 'currentStreak')) { gameCounters.currentStreak = 0; }
        if (maxH) { maxHistorySave = parseInt(maxH, 10) || 200; }
        if (savedPlayerName) { elements.myPlayerNameInput.value = savedPlayerName; }
        
        normalizeLoadedState();
        elements.selectLimit.value = displayMaxLimit;
        elements.numMaxHistory.value = maxHistorySave;

        if(elements.txtEffectTerror) {
            elements.txtEffectTerror.addEventListener('keydown', (e) => {
                if(e.key === 'Enter') { e.preventDefault(); addCustomEffect(); }
            });
        }

        renderMasterTags(); renderCustomEffects();
    }

    function saveLogs() {
        storage.setItem('ton_v4_tracker_state', JSON.stringify(trackerState));
        storage.setItem('ton_v4_global', JSON.stringify(globalHistory)); storage.setItem('ton_v4_alt', JSON.stringify(altHistory));
        storage.setItem('ton_v4_counters', JSON.stringify(gameCounters)); storage.setItem('ton_v4_terror_db', JSON.stringify(terrorDatabase));
        storage.setItem('ton_v5_terror_memos', JSON.stringify(terrorMemos)); storage.setItem('ton_v6_custom_alt_master', JSON.stringify(customAltTerrors));
        storage.setItem('ton_v7_custom_effects', JSON.stringify(customEffects)); storage.setItem('ton_v4_display_limit', displayMaxLimit.toString());
        storage.setItem('ton_v8_max_history', maxHistorySave.toString());
    }

    // --- セッション再接続機能 ---
