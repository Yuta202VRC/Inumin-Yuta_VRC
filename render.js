// render — ToN Web Manager
function clearShopWarning() { elements.shopWarningBar.style.display = "none"; }
    function changeDisplayLimit() { displayMaxLimit = parseInt(elements.selectLimit.value, 10) || 100; saveLogs(); renderTables(); }

    function updateCountersDisplay() {
        elements.cntTotal.textContent = gameCounters.total; elements.cntSurvival.textContent = gameCounters.survival;
        const rate = gameCounters.total > 0 ? Math.round((gameCounters.survival / gameCounters.total) * 100) : 0;
        elements.cntRate.textContent = `${rate}%`; elements.cntCStreak.textContent = gameCounters.currentStreak; 
        const top3 = [...gameCounters.bestStreaks, gameCounters.currentStreak].sort((a,b) => b-a).slice(0, 3);
        elements.cntBStreak1.textContent = `1st: ${top3[0]}`; elements.cntBStreak2.textContent = `2nd: ${top3[1]}`; elements.cntBStreak3.textContent = `3rd: ${top3[2]}`;
    }

    function updateLamps() {
        elements.lampMystic.classList.toggle('active', trackerState.mystic); elements.lampTwilight.classList.toggle('active', trackerState.twilight); 
        elements.lampBlood.classList.toggle('active', trackerState.blood); elements.lampSolstice.classList.toggle('active', trackerState.solstice);
        elements.lampBigBird.classList.toggle('active', trackerState.bigBird); elements.lampPunishingBird.classList.toggle('active', trackerState.punishingBird); 
        elements.lampJudgementBird.classList.toggle('active', trackerState.judgementBird);
    }

    function formatTerrorsForTable(terrorsStr) {
        if (!terrorsStr) return "";
        return terrorsStr.split('&').map(t => {
            let trimT = t.trim(); let lowerName = trimT.toLowerCase();
            if (lowerName.includes("alternate")) return `<span class="terror-alt">${escapeHtml(trimT)}</span>`;
            if ([...DEFAULT_ALT_TERRORS,...customAltTerrors].some(n=>n.toLowerCase() === lowerName)) return `<span class="terror-midnight">${escapeHtml(trimT)}</span>`;
            return escapeHtml(trimT);
        }).join(' <span style="color:var(--text-muted)">&</span> ');
    }

    function renderTables() {
        elements.globalHistoryBody.innerHTML = "";
        globalHistory.slice(0, displayMaxLimit).forEach((item, index) => {
            const row = document.createElement('tr'); 
            const typeLower = item.type ? item.type.toLowerCase() : "";
            let typeHtml = `<span class="terror-midnight">${escapeHtml(item.type)}</span>`;
            if (typeLower.includes("alternate")) typeHtml = `<span class="terror-alt">${escapeHtml(item.type)}</span>`;
            else if (typeLower.includes("cold night")) typeHtml = `<span class="terror-cold">${escapeHtml(item.type)}</span>`;
            else if (!typeLower.includes("midnight")) typeHtml = escapeHtml(item.type); // Classic etc.

            row.innerHTML = `<td>${escapeHtml(item.time)}</td><td>${typeHtml}</td><td><span class="editable-log-text" onclick="editLogTerrorText(${index})">${formatTerrorsForTable(item.terrors)}</span></td>`;
            elements.globalHistoryBody.appendChild(row);
        });
        if (!globalHistory.length) elements.globalHistoryBody.innerHTML = '<tr><td colspan="3" class="help-text">ラウンド終了後に履歴が表示されます。</td></tr>';
        
        elements.altHistoryBody.innerHTML = "";
        altHistory.slice(0, displayMaxLimit).forEach((item, index) => {
            const row = document.createElement('tr'); const resultMark = item.isDead ? '<span class="result-cross">✕</span>' : '<span class="result-circle">○</span>';
            const typeLower = item.type ? item.type.toLowerCase() : "";
            let typeHtml = `<span class="terror-midnight">${escapeHtml(item.type)}</span>`;
            if (typeLower.includes("alternate")) typeHtml = `<span class="terror-alt">${escapeHtml(item.type)}</span>`;
            else if (typeLower.includes("cold night")) typeHtml = `<span class="terror-cold">${escapeHtml(item.type)}</span>`;

            row.innerHTML = `<td>${escapeHtml(item.time)}</td><td>${typeHtml}</td><td>${formatTerrorsForTable(item.terrors)}</td><td style="text-align: center;"><span class="editable-result-mark" onclick="toggleAltResult(${index})">${resultMark}</span></td>`;
            elements.altHistoryBody.appendChild(row);
        });
        if (!altHistory.length) elements.altHistoryBody.innerHTML = '<tr><td colspan="4" class="help-text">特殊ラウンドの履歴はまだありません。</td></tr>';
    }

    function sortStats(key) {
        if (currentSort.key === key) { currentSort.order = currentSort.order === 'desc' ? 'asc' : 'desc'; } else { currentSort.key = key; currentSort.order = 'desc'; } renderTerrorDatabase();
    }

    function renderTerrorDatabase() {
        const body = elements.terrorStatsBody; const query = elements.terrorSearchInput.value.toLowerCase(); body.innerHTML = "";
        let entries = Object.entries(terrorDatabase).map(([name, data]) => ({ name, met: data.met, survivability: data.met > 0 ? (data.survived / data.met) : 0 }));
        if (query) entries = entries.filter(e => e.name.toLowerCase().includes(query));
        entries.sort((a, b) => currentSort.order === 'desc' ? (b[currentSort.key] - a[currentSort.key]) : (a[currentSort.key] - b[currentSort.key]));
        if (entries.length === 0) { body.innerHTML = '<tr><td colspan="3" style="color: var(--text-muted); text-align: center;">該当なし</td></tr>'; return; }
        entries.forEach(item => {
            const rate = Math.round(item.survivability * 100); const row = document.createElement('tr');
            row.innerHTML = `<td><strong class="clickable-terror" onclick="openTerrorMemo(decodeURIComponent('${encodeURIComponent(item.name).replace(/'/g, '%27')}'))">${escapeHtml(item.name)}</strong></td><td style="text-align: center;">${item.met}</td><td style="text-align: center; font-weight: bold; color: ${rate >= 50 ? 'var(--success)' : 'var(--accent)'};">${rate}%</td>`;
            body.appendChild(row);
        });
    }
