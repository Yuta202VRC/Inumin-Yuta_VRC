// Exact Wiki URLs are data, never derived by changing the case of a game name.
const wikiExact = new Map();
const wikiNormalized = new Map();
function normalizeWikiName(name) {
    return String(name).normalize('NFKC').replace(/\s*\(LVL\s*\d+\)/gi,'').replace(/[’‘]/g,"'").replace(/\s+/g,'').toLowerCase();
}
function addWikiName(map, key, url) {
    if (!map.has(key)) map.set(key,new Set());
    map.get(key).add(url);
}
for (const entry of WIKI_LINKS) for (const name of entry.names) {
    addWikiName(wikiExact,name,urlForWikiEntry(entry));
    addWikiName(wikiNormalized,normalizeWikiName(name),urlForWikiEntry(entry));
}
function urlForWikiEntry(entry) { return entry.url; }
function validWikiUrl(value) {
    try {
        const url = new URL(value);
        if (url.protocol !== 'https:' || url.hostname !== 'wikiwiki.jp' || url.port || url.username || url.password || !url.pathname.startsWith('/ton_jp/')) return '';
        return url.href;
    } catch { return ''; }
}
function resolveWikiLink(name) {
    const custom = validWikiUrl(terrorMemos[name]?.wikiUrl);
    if (custom) return {url:custom,mode:'custom'};
    const key = normalizeWikiName(name);
    const customMatches = new Set(Object.entries(terrorMemos).filter(([other])=>normalizeWikiName(other) === key).map(([,memo])=>validWikiUrl(memo.wikiUrl)).filter(Boolean));
    if (customMatches.size === 1) return {url:[...customMatches][0],mode:'custom'};
    const exact = wikiExact.get(name);
    if (exact?.size === 1) return {url:[...exact][0],mode:'catalog'};
    const matches = wikiNormalized.get(normalizeWikiName(name));
    if (matches?.size === 1) return {url:[...matches][0],mode:'catalog'};
    return {url:'https://wikiwiki.jp/ton_jp/::cmd/search?word='+encodeURIComponent(name)+'&type=AND',mode:'search'};
}
function updateWikiLink(name) {
    const link = resolveWikiLink(name);
    elements.btnWikiSearch.href = link.url;
    elements.btnWikiSearch.textContent = link.mode === 'search' ? 'Wiki内で検索' : 'Wikiを開く';
    document.getElementById('wikiLinkStatus').textContent = link.mode === 'custom' ? '指定したURLを使用しています。' : link.mode === 'catalog' ? '対応表に登録されたページを開きます。' : '対応表にない名前です。Wiki内検索でページを探し、URLを指定できます。';
}
