// backup — ToN Web Manager
function exportData() {
        const data = { globalHistory, altHistory, gameCounters, trackerState, terrorDatabase, terrorMemos, customAltTerrors, customEffects, displayMaxLimit, maxHistorySave };
        const jsonStr = JSON.stringify(data); const blob = new Blob([jsonStr], {type: "application/json"});
        const url = URL.createObjectURL(blob); const a = document.createElement("a"); a.href = url;
        a.download = `ToN_Analyzer_Backup_${new Date().toISOString().slice(0,10)}.json`; document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
    }
function importData(event) {
        const file = event.target.files[0]; if (!file) return;
        if (file.size > 20 * 1024 * 1024) { alert('20MB以下のバックアップを選んでください。'); event.target.value = ''; return; }
        const reader = new FileReader();
        reader.onload = () => {
            try {
                const data = validateBackup(JSON.parse(reader.result));
                if (!confirm('現在のデータをバックアップの内容で置き換えますか？')) return;
                ({globalHistory, altHistory, gameCounters, trackerState, terrorDatabase, terrorMemos, customAltTerrors, customEffects, displayMaxLimit, maxHistorySave} = data);
                normalizeLoadedState(); applyHistoryLimit(); saveLogs();
                elements.selectLimit.value = displayMaxLimit; elements.numMaxHistory.value = maxHistorySave;
                updateCountersDisplay(); updateLamps(); renderTerrorDatabase(); renderTables(); renderMasterTags(); renderCustomEffects(); updateActiveTerrorDisplay(); checkSpecialEffect();
                syncSharedState(); alert('データの復元が完了しました。');
            } catch (err) { alert('復元できません: ' + err.message); }
            finally { event.target.value = ''; }
        };
        reader.onerror = () => { alert('ファイルを読み込めませんでした。'); event.target.value = ''; };
        reader.readAsText(file);
    }

    function saveMaxHistory() {
        const val = Number(elements.numMaxHistory.value);
        if (Number.isInteger(val) && val >= 50 && val <= 100000) { maxHistorySave = val; applyHistoryLimit(); saveLogs(); renderTables(); alert(`履歴保存上限: ${maxHistorySave}件に設定しました。`); } 
        else { alert("50〜100000の整数を入力してください。"); elements.numMaxHistory.value = maxHistorySave; }
    }
    function applyHistoryLimit() {
        let changed = false;
        if (globalHistory.length > maxHistorySave) { globalHistory = globalHistory.slice(0, maxHistorySave); changed = true; }
        if (altHistory.length > maxHistorySave) { altHistory = altHistory.slice(0, maxHistorySave); changed = true; }
        if (changed) saveLogs();
    }
