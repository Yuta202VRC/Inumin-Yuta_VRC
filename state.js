// state — ToN Web Manager
const AUTHOR_ID = "usr_e375a7dc-fa7a-4dc1-b4e4-671f50368d83";
    let wsUrl = storage.getItem('ton_ws_url') || 'ws://localhost:11398/';
    let socketGeneration = 0;
    let reconnectTimer;
    let socket;
    
    let displayMaxLimit = 100;
    let maxHistorySave = 200; 
    let globalHistory = [];
    let altHistory = [];
    let gameCounters = { total: 0, survival: 0, currentStreak: 0, bestStreaks: [0,0,0] };
    let terrorDatabase = {}; 
    let terrorMemos = {}; 

    // マルチプレイ共有用（ローカルに保存されない別枠データ）
    let roomAltHistory = [];
    let roomTrackerState = { mystic: false, twilight: false, blood: false, solstice: false, bigBird: false, punishingBird: false, judgementBird: false };

    let peer = null;
    let isHost = false;
    let hostConnection = null;
    let connections = []; 

    let localVrcId = ""; 
    let localPlayerName = "Player";
    let isInRoom = false;
    let currentRoomName = ""; 
    let currentRoomType = "private";
    let currentRoomPassword = "";
    
    let multiSessionSurvival = 0;
    let sessionStreak = 0;
    let maxStreak = 0;

    let localPlayerInfo = { vrcId: "", name: "Player", tag: "none", isAlive: true, survivalCount: 0, sessionStreak: 0, maxStreak: 0, isHost: false, isAnonymous: false };
    let roomPlayers = []; 

    const DEFAULT_ALT_TERRORS = [
        "Alternate", "Blue Haket", "Eyes", "Inverted Roblander", "Kimera", "Monarch", "Nameless",
        "Rabid Snarbolax", "Rewrite", "Ruinborn Afton", "Scrapyard Machine", "Search and Destroy",
        "Slendy", "The Batter", "Feddys", "TBH SPY", "Tragedy", "Chomper", "Paradise Bird",
        "The Restless", "Lord's Signal", "Joy", "MR MEGA", "Eggman's Announcement", "The Knight Of Toren",
        "Decayed Sponge", "Parhelion", ",D@;Q7Y", "Army In Black", "Lone Agent", "Bliss", "Glaggle Gang",
        "WHITEFACE", "sm64.z64", "The Red Mist", "Sanic", "S.T.G.M", "Convict Squad", "Fusion Pilot",
        "Azrael", "LISA", "Smile Walker", "Angry Munci", "Ambush", "Roblander", "Walpurgisnacht",
        "Sakuya The Ripper", "Sakuya the Ripper", "Teuthida", "Judas", "Try Not To Touch Me", "The Observation", "Atrached",
        "TBH SANS", "Epic Bonnie", "Hungry Home Invader", "Wild Yet Bloodthirsty Creature",
        "Pizza Mascots", "Red Mist Apparition", "Shadow Freddy", "The Navigator",
        ".;.[;.;[..;[';'/.[]'];']/'=.];';[;-=].-=/;-=;][;-=/;'./=-;.", "Shadow Evil Purple Foxy"
    ];

    const BLOCK_LIST = ["parhelion's victims", "tbh", "withered bonnie"];
    const EXCLUSION_MAP = { "Faker": ["Sonic", "Sanic"], "Shadow Evil Purple Foxy": ["Sanic"] };
    const ROUND_NAME_MAP = { "ALL": "全ラウンド共通", "Alternate": "オルタネイト", "Midnight": "ミッドナイト", "Unbound": "アンバウンド", "Fog": "霧", "Ghost": "ゴースト", "Cold Night": "コールドナイト" };
    const tagNamesMap = { 
        'emeco': 'エメコ', 'pot': '壺', 'stun': 'スタンします', 'chase': 'チェイスします', 
        'survive': '生存希望', 'evo_alt': 'オルタ進化', 'evo_blood': 'ブラバ進化', 'evo_mid': 'ミッド進化',
        'item_brick': 'レンガ', 'item_rock': '岩石', 'item_nut': 'ナッツ', 'item_cat': '猫',
        'item_charm': 'チャーム', 'item_gf': 'ガルフレ', 'afk': '離席中'
    };

    let customAltTerrors = [];
    let customEffects = [
        { roundType: "Unbound", terror: "END OF THE WORLD", color: "#ffd32a" },
        { roundType: "Midnight", terror: "Kimera", color: "#954C93" },
        { roundType: "Unbound", terror: "Angels", color: "#800020" }
    ];

    let activeTerrorSet = new Set();
    let currentRoundData = { type: "Classic", active: false, isDead: false };
    let currentInstanceRawString = ""; 
    let currentSelectedMemoTerror = ""; 
    let currentSort = { key: 'met', order: 'desc' }; 
    
    let trackerState = {
        mystic: false, twilight: false, blood: false, solstice: false,
        bigBird: false, punishingBird: false, judgementBird: false
    };
    
    let isEditModeEnabled = false;
    let isTestingEffect = false;
    let testEffectTimeout;

    const elements = {
        curRoundType: document.getElementById('curRoundType'),
        curState: document.getElementById('curState'),
        curTerror: document.getElementById('curTerror'),
        curInstance: document.getElementById('curInstance'),
        globalHistoryBody: document.getElementById('globalHistoryBody'),
        altHistoryBody: document.getElementById('altHistoryBody'),
        cntTotal: document.getElementById('cntTotal'),
        cntSurvival: document.getElementById('cntSurvival'),
        cntRate: document.getElementById('cntRate'),
        cntCStreak: document.getElementById('cntCStreak'),
        cntBStreak1: document.getElementById('cntBStreak1'),
        cntBStreak2: document.getElementById('cntBStreak2'),
        cntBStreak3: document.getElementById('cntBStreak3'),
        terrorStatsBody: document.getElementById('terrorStatsBody'),
        lampMystic: document.getElementById('lampMystic'),
        lampTwilight: document.getElementById('lampTwilight'),
        lampBlood: document.getElementById('lampBlood'),
        lampSolstice: document.getElementById('lampSolstice'),
        lampBigBird: document.getElementById('lampBigBird'),
        lampPunishingBird: document.getElementById('lampPunishingBird'),
        lampJudgementBird: document.getElementById('lampJudgementBird'),
        btnCopyUrl: document.getElementById('btnCopyUrl'),
        btnOpenUrl: document.getElementById('btnOpenUrl'),
        btnOpenUrlDummy: document.getElementById('btnOpenUrlDummy'),
        selectLimit: document.getElementById('selectLimit'),
        shopWarningBar: document.getElementById('shopWarningBar'),
        btnWikiSearch: document.getElementById('btnWikiSearch'),
        btnEditMode: document.getElementById('btnEditMode'),
        masterTagsContainer: document.getElementById('masterTagsContainer'),
        txtNewAltTerror: document.getElementById('txtNewAltTerror'),
        memoModalTitle: document.getElementById('memoModalTitle'), 
        memoStun: document.getElementById('memoStun'),
        memoGaze: document.getElementById('memoGaze'), 
        memoInstant: document.getElementById('memoInstant'),
        memoRating: document.getElementById('memoRating'),
        memoText: document.getElementById('memoText'),
        chkStreak: document.getElementById('chkStreak'),
        chkDb: document.getElementById('chkDb'),
        terrorSearchInput: document.getElementById('terrorSearchInput'),
        selEffectRound: document.getElementById('selEffectRound'),
        txtEffectTerror: document.getElementById('txtEffectTerror'),
        colEffectColor: document.getElementById('colEffectColor'),
        txtEffectColorHex: document.getElementById('txtEffectColorHex'),
        customEffectsContainer: document.getElementById('customEffectsContainer'),
        numMaxHistory: document.getElementById('numMaxHistory'),
        myPlayerNameInput: document.getElementById('myPlayerNameInput'),
        myTagSelect: document.getElementById('myTagSelect'),
        multiplayerPanel: document.getElementById('multiplayerPanel'),
        displayRoomName: document.getElementById('displayRoomName'),
        multiPrivateContent: document.getElementById('multiPrivateContent'),
        multiPublicContent: document.getElementById('multiPublicContent'),
        playerListContainer: document.getElementById('playerListContainer'),
        tagSummaryContainer: document.getElementById('tagSummaryContainer'),
        teamSurvivalRate: document.getElementById('teamSurvivalRate'),
        btnCopyInvite: document.getElementById('btnCopyInvite'),
        tabCreate: document.getElementById('tabCreate'),
        tabJoin: document.getElementById('tabJoin'),
        tabOpenSearch: document.getElementById('tabOpenSearch'),
        multiCreateSection: document.getElementById('multiCreateSection'),
        multiJoinSection: document.getElementById('multiJoinSection'),
        multiOpenSection: document.getElementById('multiOpenSection'),
        createRoomType: document.getElementById('createRoomType'),
        createPassword: document.getElementById('createPassword'),
        createPasswordGroup: document.getElementById('createPasswordGroup'),
        joinRoomName: document.getElementById('joinRoomName'),
        joinPassword: document.getElementById('joinPassword'),
        searchInstanceId: document.getElementById('searchInstanceId'),
        roomSharedDataCard: document.getElementById('roomSharedDataCard'),
        roomAltHistoryBody: document.getElementById('roomAltHistoryBody')
    };

    elements.colEffectColor.addEventListener('input', function() { elements.txtEffectColorHex.value = this.value; });
    elements.txtEffectColorHex.addEventListener('input', function() { if (/^#[0-9A-Fa-f]{6}$/i.test(this.value)) { elements.colEffectColor.value = this.value; }});
