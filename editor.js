// editor — ToN Web Manager
function toggleModal(modalId, open) {
        const modal = document.getElementById(modalId);
        if (!modal) return;
        if (!open && !modal.classList.contains('open')) return;
        modal.setAttribute('aria-hidden', String(!open));
        if (open) modal._returnFocus = document.activeElement;
        if(open) { if(modalId === 'managementModal') { elements.chkStreak.checked = false; elements.chkDb.checked = false; } modal.classList.add('open'); } 
        else { modal.classList.remove('open'); }
        if (open) {
            if (modalId === 'managementModal') document.getElementById('connectionUrl').value = wsUrl;
            modal.querySelector('button, input, select, textarea')?.focus();
        } else if (modal._returnFocus?.isConnected) modal._returnFocus.focus();
    }

    function toggleEditMode() {
        isEditModeEnabled = !isEditModeEnabled;
        if(isEditModeEnabled) { document.body.classList.add('edit-mode-enabled'); elements.btnEditMode.textContent = "編集モード: ON"; elements.btnEditMode.classList.add('active'); } 
        else { document.body.classList.remove('edit-mode-enabled'); elements.btnEditMode.textContent = "編集モード: OFF"; elements.btnEditMode.classList.remove('active'); }
    }

    function toggleTrackerLamp(key) {
        if(!isEditModeEnabled) return;
        if(trackerState.hasOwnProperty(key)) { 
            trackerState[key] = !trackerState[key]; saveLogs(); updateLamps();
            if (isHost) sendToNetwork({ type: "SYNC_ENVIRONMENT", tracker: trackerState });
        }
    }

    function editCounterValue(key) {
        if(!isEditModeEnabled) return;
        if (key === 'bestStreaks') {
            const input = prompt("【手動数値編集】\n最高連勝のTop3をカンマ区切りで入力 (例: 10,5,3)", gameCounters.bestStreaks.join(','));
            if (input === null) return;
            const parts = input.split(',').map(s => Number(s.trim()));
            if (parts.some(n => !Number.isSafeInteger(n) || n < 0)) { alert('0以上の整数を入力してください。'); return; } // validated
            while(parts.length < 3) parts.push(0);
            gameCounters.bestStreaks = parts.sort((a,b)=>b-a).slice(0,3); saveLogs(); updateCountersDisplay(); return;
        }
        if (!['total','survival','currentStreak'].includes(key)) return;
        const input = prompt(`数値を入力:`, gameCounters[key]);
        if(input === null) return; const parsed = Number(input);
        if(Number.isSafeInteger(parsed) && parsed >= 0) {
            const next = {...gameCounters, [key]: parsed};
            if (next.survival > next.total || next.currentStreak > next.survival) { alert('生存回数は総回数以下、現在連勝は生存回数以下にしてください。'); return; }
            gameCounters[key] = parsed; saveLogs(); updateCountersDisplay(); }
    }

function editLogTerrorText(index) {
        if (!isEditModeEnabled || !globalHistory[index]) return;
        const item = globalHistory[index]; const input = prompt('テラー名を編集（複数の場合は & 区切り）', item.terrors);
        if (input === null || !input.trim()) return;
        item.terrors = input.trim(); item.isAlt = isSpecialRound(item.type, item.terrors);
        const other = altHistory.find(a => a.id === item.id);
        if (other) Object.assign(other, item);
        if (!item.isAlt) altHistory = altHistory.filter(a => a.id !== item.id);
        else if (!other) {
            const followingIds = new Set(globalHistory.slice(index + 1).map(row => row.id));
            const insertAt = altHistory.findIndex(row => followingIds.has(row.id));
            altHistory.splice(insertAt < 0 ? altHistory.length : insertAt, 0, {...item});
        }
        applyHistoryLimit(); saveLogs(); renderTables(); syncSharedState();
    }
function toggleAltResult(index) {
        if (!isEditModeEnabled || !altHistory[index]) return;
        const item = altHistory[index]; item.isDead = !item.isDead;
        const match = globalHistory.find(g => g.id === item.id);
        if (match) match.isDead = item.isDead;
        saveLogs(); renderTables(); syncSharedState();
    }

    function cleanTerrorName(name, currentRoundType = "") {
        if (typeof name !== 'string') return ""; 
        let cleaned = name.replace(/\s*\(LVL\s*\d+\)/gi, "").trim();
        if (/^[?？]+$/.test(cleaned)) { 
            return (currentRoundType && currentRoundType.toLowerCase().includes("unbound")) ? "???" : ""; 
        }
        if (cleaned.toLowerCase() === "sonic?") return ""; 
        if (cleaned.toLowerCase() === "lone agent") return "Bliss";
        return cleaned;
    }

    function openTerrorMemo(terrorName) {
        const cleanedName = cleanTerrorName(terrorName, 'Unbound'); // Historical names must not depend on the live round.
        if(!cleanedName || cleanedName === "不明なテラー" || cleanedName === "探索中...") return;
        currentSelectedMemoTerror = cleanedName; 
        if(elements.memoModalTitle) { elements.memoModalTitle.textContent = `【${cleanedName}】`; }
        
        updateWikiLink(cleanedName);
        document.getElementById('memoWikiUrl').value = terrorMemos[cleanedName]?.wikiUrl || '';
        
        if (terrorMemos[cleanedName]) {
            const m = terrorMemos[cleanedName]; elements.memoStun.checked = !!m.stun; elements.memoGaze.checked = !!m.gaze; elements.memoInstant.checked = !!m.instant; elements.memoRating.value = m.rating || "★★★"; elements.memoText.value = m.text || "";
        } else { elements.memoStun.checked = false; elements.memoGaze.checked = false; elements.memoInstant.checked = false; elements.memoRating.value = "★★★"; elements.memoText.value = ""; }
        toggleModal('terrorMemoModal', true);
    }

    function saveTerrorMemo() {
        if (!currentSelectedMemoTerror) return;
        const inputUrl = document.getElementById('memoWikiUrl').value.trim();
        const wikiUrl = inputUrl ? validWikiUrl(inputUrl) : '';
        if (inputUrl && !wikiUrl) { alert('https://wikiwiki.jp/ton_jp/ から始まるWikiページのURLを入力してください。'); return; }
        terrorMemos[currentSelectedMemoTerror] = { stun: elements.memoStun.checked, gaze: elements.memoGaze.checked, instant: elements.memoInstant.checked, rating: elements.memoRating.value, text: elements.memoText.value, wikiUrl };
        saveLogs(); toggleModal('terrorMemoModal', false); renderTerrorDatabase(); updateActiveTerrorDisplay(); 
    }

    function resetSection(sectionKey) {
        if (!confirm(`リセットして初期化しますか？`)) return;
        if (sectionKey === 'counters') {
            gameCounters.bestStreaks = [...gameCounters.bestStreaks, gameCounters.currentStreak].sort((a,b)=>b-a).slice(0,3);
            gameCounters.total = 0; gameCounters.survival = 0; gameCounters.currentStreak = 0; updateCountersDisplay();
        }
        else if (sectionKey === 'lamps') { trackerState = { mystic: false, twilight: false, blood: false, solstice: false, bigBird: false, punishingBird: false, judgementBird: false }; updateLamps(); }
        else if (sectionKey === 'alt') { altHistory = []; renderTables(); } else if (sectionKey === 'global') { globalHistory = []; renderTables(); }
        saveLogs(); syncSharedState();
    }

function executeSelectedDeletions() {
        if (!elements.chkStreak.checked && !elements.chkDb.checked) { alert('削除する項目を選んでください。'); return; }
        if (!confirm('選択した記録を削除しますか？ この操作は元に戻せません。')) return;
        if (elements.chkStreak.checked) gameCounters.bestStreaks = [0,0,0];
        if (elements.chkDb.checked) terrorDatabase = Object.create(null);
        saveLogs(); updateCountersDisplay(); renderTerrorDatabase(); renderTables(); toggleModal('managementModal', false);
    }
