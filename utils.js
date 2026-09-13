// utils — ToN Web Manager
const storage = {
        getItem(key) { try { return window.localStorage.getItem(key); } catch { showNotice('ブラウザーの保存機能が使えません。終了前にバックアップを保存してください。'); return null; } },
        setItem(key, value) { try { window.localStorage.setItem(key, value); } catch { showNotice('データを保存できません。バックアップをエクスポートしてください。'); } },
        removeItem(key) { try { window.localStorage.removeItem(key); } catch { showNotice('保存データを削除できませんでした。'); } }
    };
    function showNotice(message) {
        const el = document.getElementById('appNotice'); if (el) { el.hidden = false; el.textContent = message; }
    }
    function escapeHtml(value) {
        return String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
    }
    function newRecordId() { return typeof crypto.randomUUID === 'function' ? crypto.randomUUID() : Date.now().toString(36) + Math.random().toString(36).slice(2); }
    function isRecord(value) { return !!value && typeof value === 'object' && !Array.isArray(value); }
    function count(value) { return Number.isSafeInteger(value) && value >= 0 ? value : 0; }
    function safeMap(value, convert) {
        const result = Object.create(null);
        if (isRecord(value)) for (const [key, item] of Object.entries(value)) {
            if (isRecord(item)) result[key] = convert(item);
        }
        return result;
    }
    function normalizeHistory(value) {
        return Array.isArray(value) ? value.filter(r => isRecord(r) && typeof r.time === 'string' && typeof r.type === 'string' && typeof r.terrors === 'string').map(r => ({id: typeof r.id === 'string' && r.id ? r.id : newRecordId(), time: r.time, type: r.type, terrors: r.terrors, isDead: r.isDead === true, isAlt: r.isAlt === true || isSpecialRound(r.type, r.terrors)})) : [];
    }
    function normalizeTracker(value) {
        return Object.fromEntries(['mystic','twilight','blood','solstice','bigBird','punishingBird','judgementBird'].map(k=>[k,value?.[k] === true]));
    }
    function isSpecialRound(type, terrors) {
        if (/alternate|midnight|cold night/i.test(type)) return true;
        return terrors.split(/\s+&\s+/).some(name => {
            const lower = name.trim().toLowerCase();
            if (BLOCK_LIST.some(b => b === "parhelion's victims" ? lower.includes(b) : lower === b)) return false;
            return lower.includes('alternate') || [...DEFAULT_ALT_TERRORS,...customAltTerrors].some(m => lower === m.toLowerCase());
        });
    }
    function normalizeLoadedState() {
        customAltTerrors = Array.isArray(customAltTerrors) ? [...new Set(customAltTerrors.filter(x => typeof x === 'string' && x.trim()).map(x=>x.trim()))] : [];
        // Assign the same IDs to separate legacy copies, consuming duplicates in order.
        const rawAlt = Array.isArray(altHistory) ? altHistory.filter(r => isRecord(r) && ['time','type','terrors'].every(k=>typeof r[k] === 'string')) : [];
        globalHistory = normalizeHistory(globalHistory);
        const used = new Set();
        altHistory = normalizeHistory(rawAlt).map((row,i) => {
            if (!rawAlt[i]?.id) {
                const match = globalHistory.find(g => !used.has(g.id) && g.time === row.time && g.type === row.type && g.terrors === row.terrors);
                if (match) { row.id = match.id; used.add(match.id); }
            }
            return row;
        });
        const c = isRecord(gameCounters) ? gameCounters : {};
        gameCounters = {total: count(c.total), survival: Math.min(count(c.total),count(c.survival)), currentStreak: Math.min(count(c.total),count(c.survival), count(c.currentStreak)), bestStreaks: [...(Array.isArray(c.bestStreaks) ? c.bestStreaks.map(count) : []),0,0,0].sort((a,b)=>b-a).slice(0,3)};
        trackerState = normalizeTracker(trackerState);
        terrorDatabase = safeMap(terrorDatabase, d => ({met: count(d.met), survived: Math.min(count(d.met),count(d.survived))}));
        terrorMemos = safeMap(terrorMemos, m => ({stun:m.stun===true,gaze:m.gaze===true,instant:m.instant===true,rating:/^★{1,5}$/.test(m.rating) ? m.rating : '★★★',text: typeof m.text === 'string' ? m.text : '',wikiUrl:validWikiUrl(m.wikiUrl)}));
        customEffects = Array.isArray(customEffects) ? customEffects.filter(e => isRecord(e) && typeof e.terror === 'string' && e.terror.trim() && typeof e.roundType === 'string' && /^#[0-9a-f]{6}$/i.test(e.color)) : [];
        displayMaxLimit = [50,100,150,200].includes(displayMaxLimit) ? displayMaxLimit : 100;
        maxHistorySave = Number.isSafeInteger(maxHistorySave) && maxHistorySave >= 50 && maxHistorySave <= 100000 ? maxHistorySave : 200;
    }
    function validateBackup(data) {
        if (!isRecord(data) || !Array.isArray(data.globalHistory) || !isRecord(data.gameCounters)) throw Error('ToNのバックアップ形式ではありません。');
        for (const key of ['globalHistory','altHistory','customAltTerrors','customEffects']) if (key in data && !Array.isArray(data[key])) throw Error(key + 'の形式が不正です。');
        for (const key of ['gameCounters','trackerState','terrorDatabase','terrorMemos']) if (key in data && !isRecord(data[key])) throw Error(key + 'の形式が不正です。');
        for (const key of ['globalHistory','altHistory']) for (const row of data[key] || []) {
            if (!isRecord(row) || !['time','type','terrors'].every(k=>typeof row[k] === 'string') || typeof row.isDead !== 'boolean') throw Error('履歴の形式が不正です。');
        }
        const c = data.gameCounters;
        for (const key of ['total','survival','currentStreak']) if (!Number.isSafeInteger(c[key]) || c[key] < 0) throw Error('カウンターの値が不正です。');
        if (c.survival > c.total || c.currentStreak > c.survival || (c.bestStreaks !== undefined && (!Array.isArray(c.bestStreaks) || c.bestStreaks.some(n=>!Number.isSafeInteger(n)||n<0)))) throw Error('戦績の数値に矛盾があります。');
        for (const e of data.customEffects || []) if (!isRecord(e) || typeof e.terror !== 'string' || !e.terror.trim() || typeof e.roundType !== 'string' || !/^#[0-9a-f]{6}$/i.test(e.color)) throw Error('特殊演出の設定が不正です。');
        if ((data.customAltTerrors || []).some(n=>typeof n !== 'string')) throw Error('テラー一覧の形式が不正です。');
        for (const key of ['globalHistory','altHistory']) {
            const ids = (data[key] || []).map(r=>r.id).filter(id=>id !== undefined);
            if (ids.some(id=>typeof id !== 'string' || !id) || new Set(ids).size !== ids.length) throw Error('履歴の識別番号が不正または重複しています。');
        }
        for (const value of Object.values(data.trackerState || {})) if (typeof value !== 'boolean') throw Error('ランプの設定が不正です。');
        for (const d of Object.values(data.terrorDatabase || {})) if (!isRecord(d) || !Number.isSafeInteger(d.met) || !Number.isSafeInteger(d.survived) || d.met < 0 || d.survived < 0 || d.survived > d.met) throw Error('テラー戦績の形式が不正です。');
        for (const m of Object.values(data.terrorMemos || {})) {
            if (!isRecord(m) || ('text' in m && typeof m.text !== 'string') || ['stun','gaze','instant'].some(k=>k in m && typeof m[k] !== 'boolean') || ('wikiUrl' in m && (typeof m.wikiUrl !== 'string' || (m.wikiUrl && !validWikiUrl(m.wikiUrl))))) throw Error('個人メモの形式が不正です。');
        }
        if ('displayMaxLimit' in data && ![50,100,150,200].includes(data.displayMaxLimit)) throw Error('表示上限が不正です。');
        if ('maxHistorySave' in data && (!Number.isSafeInteger(data.maxHistorySave) || data.maxHistorySave < 50 || data.maxHistorySave > 100000)) throw Error('保存上限が不正です。');
        return {globalHistory:data.globalHistory,altHistory:data.altHistory||[],gameCounters:c,trackerState:data.trackerState||{},terrorDatabase:data.terrorDatabase||{},terrorMemos:data.terrorMemos||{},customAltTerrors:data.customAltTerrors||[],customEffects:data.customEffects||[],displayMaxLimit:data.displayMaxLimit||100,maxHistorySave:data.maxHistorySave||200};
    }
    async function copyText(text, button) {
        try {
            if (!navigator.clipboard?.writeText) throw Error('clipboard unavailable');
            await navigator.clipboard.writeText(text);
            if (button) { const original = button.textContent; button.textContent = 'コピー完了！'; setTimeout(()=>button.textContent=original,1500); }
        } catch { prompt('自動コピーできませんでした。以下をコピーしてください。', text); }
    }
    function saveConnectionSettings() {
        const input = document.getElementById('connectionUrl'); const value = input.value.trim();
        try { const url = new URL(value); if (!['ws:','wss:'].includes(url.protocol) || url.username || url.password) throw Error(); }
        catch { alert('ws:// または wss:// から始まる接続先を入力してください。'); return; }
        wsUrl = value; storage.setItem('ton_ws_url', wsUrl); connect();
    }
    function syncSharedState() {
        if (isHost) sendToNetwork({type:'SYNC_FULL_STATE',altHistory,trackerState});
    }
