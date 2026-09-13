// effects — ToN Web Manager
function renderCustomEffects() {
        elements.customEffectsContainer.innerHTML = "";
        customEffects.forEach((eff, index) => {
            const row = document.createElement('div'); row.className = "effect-row";
            const info = document.createElement('div'); info.className = "effect-info";
            info.innerHTML = `<span style="color:var(--text-muted);">[${escapeHtml(ROUND_NAME_MAP[eff.roundType] || eff.roundType)}]</span> <strong>${escapeHtml(eff.terror)}</strong> <span class="effect-color-preview" style="background-color: ${eff.color};"></span> <span style="color:${eff.color}">${eff.color}</span>`;
            const btns = document.createElement('div'); btns.style.display = "flex"; btns.style.gap = "6px";
            const btnTest = document.createElement('button'); btnTest.textContent = "確認"; btnTest.className = "btn-wiki-search"; btnTest.style.margin = "0"; btnTest.onclick = () => testCustomEffect(eff.color);
            const btnDel = document.createElement('button'); btnDel.textContent = "削除"; btnDel.className = "btn-section-reset"; btnDel.onclick = () => { customEffects.splice(index, 1); saveLogs(); renderCustomEffects(); checkSpecialEffect(); };
            btns.appendChild(btnTest); btns.appendChild(btnDel); row.appendChild(info); row.appendChild(btns); elements.customEffectsContainer.appendChild(row);
        });
    }

    function addCustomEffect() {
        const round = elements.selEffectRound.value; const terror = elements.txtEffectTerror.value.trim(); let color = elements.txtEffectColorHex.value.trim(); 
        if (!terror) { alert("演出をつけたいテラー名を入力してください。"); return; }
        
        if (/^#[0-9A-Fa-f]{3}$/i.test(color)) { color = '#' + color[1]+color[1] + color[2]+color[2] + color[3]+color[3]; } 
        else if (!/^#[0-9A-Fa-f]{6}$/i.test(color)) { color = elements.colEffectColor.value; }

        const existingIdx = customEffects.findIndex(e => e.terror.toLowerCase() === terror.toLowerCase() && e.roundType === round);
        if (existingIdx !== -1) { customEffects[existingIdx].color = color; } 
        else { customEffects.push({ roundType: round, terror: terror, color: color }); }

        elements.txtEffectTerror.value = ""; saveLogs(); renderCustomEffects(); checkSpecialEffect();

        const btn = document.querySelector('.btn-add-master');
        if (btn) {
            const orig = btn.textContent; btn.textContent = "登録完了!"; btn.style.background = "var(--success)"; btn.style.color = "#000";
            setTimeout(() => { btn.textContent = orig; btn.style.background = "var(--info)"; btn.style.color = "#fff"; }, 1200);
        }
    }

    function testCustomEffect(colorCode) {
        isTestingEffect = true; document.body.style.setProperty('--special-color', colorCode); document.body.classList.add('special-border');
        clearTimeout(testEffectTimeout); testEffectTimeout = setTimeout(() => { isTestingEffect = false; checkSpecialEffect(); }, 3000);
    }

    function checkSpecialEffect() {
        if (isTestingEffect) return; 
        if (!currentRoundData.active) { document.body.classList.remove('special-border'); return; }
        const typeLower = currentRoundData.type.toLowerCase(); const terrors = Array.from(activeTerrorSet).map(t => t.trim().toLowerCase());
        let isSpecial = false; let specialColor = '';

        for (const eff of customEffects) {
            const regTerror = eff.terror.trim().toLowerCase();
            const matchTerror = terrors.some(t => t === regTerror || t.includes(regTerror));
            const matchRound = (eff.roundType === "ALL" || typeLower.includes(eff.roundType.toLowerCase()));

            if (matchRound && matchTerror) { isSpecial = true; specialColor = eff.color; break; }
        }
        if (isSpecial) { document.body.style.setProperty('--special-color', specialColor); document.body.classList.add('special-border'); } 
        else { document.body.classList.remove('special-border'); }
    }

    function renderMasterTags() {
        elements.masterTagsContainer.innerHTML = "";
        [...DEFAULT_ALT_TERRORS, ...customAltTerrors].forEach(name => {
            const isCustom = customAltTerrors.includes(name);
            const tag = document.createElement('span'); tag.className = "master-tag"; tag.textContent = name;
            if (isCustom) { const del = document.createElement('span'); del.className = "master-tag-del"; del.textContent = "×"; del.onclick = () => { customAltTerrors = customAltTerrors.filter(n => n !== name); saveLogs(); renderMasterTags(); renderTables(); updateActiveTerrorDisplay(); }; tag.appendChild(del); }
            elements.masterTagsContainer.appendChild(tag);
        });
    }
    function addAltTerrorMaster() {
        const inputVal = elements.txtNewAltTerror.value.trim(); if (!inputVal) return;
        if ([...DEFAULT_ALT_TERRORS, ...customAltTerrors].some(n => n.toLowerCase() === inputVal.toLowerCase())) { alert("登録済みです"); return; }
        customAltTerrors.push(inputVal); elements.txtNewAltTerror.value = ""; saveLogs(); renderMasterTags(); renderTables(); updateActiveTerrorDisplay();
    }
