// Wiki menu link targets, verified 2026-09-13. Source: https://wikiwiki.jp/ton_jp/MenuBar
// Add alternate in-game spellings to names; preserve the exact url.
const WIKI_LINKS = [
  {
    "page": "_",
    "url": "https://wikiwiki.jp/ton_jp/_",
    "names": [
      "_",
      "_(名無し)"
    ]
  },
  {
    "page": ",D@;Q7Y",
    "url": "https://wikiwiki.jp/ton_jp/%2CD%40%3BQ7Y",
    "names": [
      ",D@;Q7Y"
    ]
  },
  {
    "page": "???",
    "url": "https://wikiwiki.jp/ton_jp/%3F%3F%3F",
    "names": [
      "???"
    ]
  },
  {
    "page": "Aku Ball",
    "url": "https://wikiwiki.jp/ton_jp/Aku%20Ball",
    "names": [
      "Aku Ball"
    ]
  },
  {
    "page": "Akumii-Kari",
    "url": "https://wikiwiki.jp/ton_jp/Akumii-Kari",
    "names": [
      "Akumii-Kari"
    ]
  },
  {
    "page": "All-Around-Helpers",
    "url": "https://wikiwiki.jp/ton_jp/All-Around-Helpers",
    "names": [
      "All-Around-Helpers"
    ]
  },
  {
    "page": "Alternate",
    "url": "https://wikiwiki.jp/ton_jp/Alternate",
    "names": [
      "Alternate",
      "Alternates"
    ]
  },
  {
    "page": "Ambush",
    "url": "https://wikiwiki.jp/ton_jp/Ambush",
    "names": [
      "Ambush"
    ]
  },
  {
    "page": "An Arbiter",
    "url": "https://wikiwiki.jp/ton_jp/An%20Arbiter",
    "names": [
      "An Arbiter"
    ]
  },
  {
    "page": "Ancient Monarch",
    "url": "https://wikiwiki.jp/ton_jp/Ancient%20Monarch",
    "names": [
      "Ancient Monarch",
      "Ancient Monarch(旧Monarch)"
    ]
  },
  {
    "page": "Angels",
    "url": "https://wikiwiki.jp/ton_jp/Angels",
    "names": [
      "Angels"
    ]
  },
  {
    "page": "Angry Munci",
    "url": "https://wikiwiki.jp/ton_jp/Angry%20Munci",
    "names": [
      "Angry Munci"
    ]
  },
  {
    "page": "Ao Oni",
    "url": "https://wikiwiki.jp/ton_jp/Ao%20Oni",
    "names": [
      "Ao Oni"
    ]
  },
  {
    "page": "Apathy",
    "url": "https://wikiwiki.jp/ton_jp/Apathy",
    "names": [
      "Apathy"
    ]
  },
  {
    "page": "Apocalypse Bird",
    "url": "https://wikiwiki.jp/ton_jp/Apocalypse%20Bird",
    "names": [
      "Apocalypse Bird"
    ]
  },
  {
    "page": "Apocrean Harvester",
    "url": "https://wikiwiki.jp/ton_jp/Apocrean%20Harvester",
    "names": [
      "Apocrean Harvester"
    ]
  },
  {
    "page": "Arkus",
    "url": "https://wikiwiki.jp/ton_jp/Arkus",
    "names": [
      "Arkus"
    ]
  },
  {
    "page": "Army in Black",
    "url": "https://wikiwiki.jp/ton_jp/Army%20in%20Black",
    "names": [
      "Army in Black"
    ]
  },
  {
    "page": "Arrival",
    "url": "https://wikiwiki.jp/ton_jp/Arrival",
    "names": [
      "Arrival"
    ]
  },
  {
    "page": "Astrum Aureus",
    "url": "https://wikiwiki.jp/ton_jp/Astrum%20Aureus",
    "names": [
      "Astrum Aureus"
    ]
  },
  {
    "page": "Atrached",
    "url": "https://wikiwiki.jp/ton_jp/Atrached",
    "names": [
      "Atrached"
    ]
  },
  {
    "page": "Azrael",
    "url": "https://wikiwiki.jp/ton_jp/Azrael",
    "names": [
      "Azrael",
      "AZRAEL"
    ]
  },
  {
    "page": "Bacteria",
    "url": "https://wikiwiki.jp/ton_jp/Bacteria",
    "names": [
      "Bacteria"
    ]
  },
  {
    "page": "Bad Batter",
    "url": "https://wikiwiki.jp/ton_jp/Bad%20Batter",
    "names": [
      "Bad Batter"
    ]
  },
  {
    "page": "Baldi",
    "url": "https://wikiwiki.jp/ton_jp/Baldi",
    "names": [
      "Baldi"
    ]
  },
  {
    "page": "Ballin",
    "url": "https://wikiwiki.jp/ton_jp/Ballin",
    "names": [
      "Ballin"
    ]
  },
  {
    "page": "Bed Mecha",
    "url": "https://wikiwiki.jp/ton_jp/Bed%20Mecha",
    "names": [
      "Bed Mecha"
    ]
  },
  {
    "page": "Bekka",
    "url": "https://wikiwiki.jp/ton_jp/Bekka",
    "names": [
      "Bekka"
    ]
  },
  {
    "page": "Beyond's Masks",
    "url": "https://wikiwiki.jp/ton_jp/Beyond%27s%20Masks",
    "names": [
      "Beyond's Masks",
      "Self Inserts"
    ]
  },
  {
    "page": "BFF",
    "url": "https://wikiwiki.jp/ton_jp/BFF",
    "names": [
      "BFF"
    ]
  },
  {
    "page": "Big Bird",
    "url": "https://wikiwiki.jp/ton_jp/Big%20Bird",
    "names": [
      "Big Bird"
    ]
  },
  {
    "page": "Bigger Boot",
    "url": "https://wikiwiki.jp/ton_jp/Bigger%20Boot",
    "names": [
      "Bigger Boot"
    ]
  },
  {
    "page": "Black Sun",
    "url": "https://wikiwiki.jp/ton_jp/Black%20Sun",
    "names": [
      "Black Sun"
    ]
  },
  {
    "page": "Black White",
    "url": "https://wikiwiki.jp/ton_jp/Black%20White",
    "names": [
      "Black White",
      "Black & White"
    ]
  },
  {
    "page": "Bliss",
    "url": "https://wikiwiki.jp/ton_jp/Bliss",
    "names": [
      "Bliss",
      "Bliss (Lone Agent)",
      "Lone Agent"
    ]
  },
  {
    "page": "Blue Haket",
    "url": "https://wikiwiki.jp/ton_jp/Blue%20Haket",
    "names": [
      "Blue Haket"
    ]
  },
  {
    "page": "Blue Monsters",
    "url": "https://wikiwiki.jp/ton_jp/Blue%20Monsters",
    "names": [
      "Blue Monsters"
    ]
  },
  {
    "page": "Bravera",
    "url": "https://wikiwiki.jp/ton_jp/Bravera",
    "names": [
      "Bravera"
    ]
  },
  {
    "page": "Burrowing Heavens",
    "url": "https://wikiwiki.jp/ton_jp/Burrowing%20Heavens",
    "names": [
      "Burrowing Heavens"
    ]
  },
  {
    "page": "Byte Horde",
    "url": "https://wikiwiki.jp/ton_jp/Byte%20Horde",
    "names": [
      "Byte Horde"
    ]
  },
  {
    "page": "Cartoon Cat",
    "url": "https://wikiwiki.jp/ton_jp/Cartoon%20Cat",
    "names": [
      "Cartoon Cat"
    ]
  },
  {
    "page": "CENSORED",
    "url": "https://wikiwiki.jp/ton_jp/CENSORED",
    "names": [
      "CENSORED"
    ]
  },
  {
    "page": "Charlotte",
    "url": "https://wikiwiki.jp/ton_jp/Charlotte",
    "names": [
      "Charlotte"
    ]
  },
  {
    "page": "Chomper",
    "url": "https://wikiwiki.jp/ton_jp/Chomper",
    "names": [
      "Chomper"
    ]
  },
  {
    "page": "Chomper Trio",
    "url": "https://wikiwiki.jp/ton_jp/Chomper%20Trio",
    "names": [
      "Chomper Trio"
    ]
  },
  {
    "page": "Christian Brutal Sniper",
    "url": "https://wikiwiki.jp/ton_jp/Christian%20Brutal%20Sniper",
    "names": [
      "Christian Brutal Sniper"
    ]
  },
  {
    "page": "Classic.exe",
    "url": "https://wikiwiki.jp/ton_jp/Classic.exe",
    "names": [
      "Classic.exe"
    ]
  },
  {
    "page": "Clockey",
    "url": "https://wikiwiki.jp/ton_jp/Clockey",
    "names": [
      "Clockey"
    ]
  },
  {
    "page": "Convict Squad",
    "url": "https://wikiwiki.jp/ton_jp/Convict%20Squad",
    "names": [
      "Convict Squad"
    ]
  },
  {
    "page": "Copyright infringement",
    "url": "https://wikiwiki.jp/ton_jp/Copyright%20infringement",
    "names": [
      "Copyright infringement",
      "Copyright Infringement"
    ]
  },
  {
    "page": "Corrupted Spongebob",
    "url": "https://wikiwiki.jp/ton_jp/Corrupted%20Spongebob",
    "names": [
      "Corrupted Spongebob"
    ]
  },
  {
    "page": "Corrupted Toys",
    "url": "https://wikiwiki.jp/ton_jp/Corrupted%20Toys",
    "names": [
      "Corrupted Toys"
    ]
  },
  {
    "page": "Cubor.",
    "url": "https://wikiwiki.jp/ton_jp/Cubor.",
    "names": [
      "Cubor.",
      "Cubor's Revenge"
    ]
  },
  {
    "page": "Daycare",
    "url": "https://wikiwiki.jp/ton_jp/Daycare",
    "names": [
      "Daycare"
    ]
  },
  {
    "page": "Death From Above",
    "url": "https://wikiwiki.jp/ton_jp/Death%20From%20Above",
    "names": [
      "Death From Above"
    ]
  },
  {
    "page": "Decayed Sponge",
    "url": "https://wikiwiki.jp/ton_jp/Decayed%20Sponge",
    "names": [
      "Decayed Sponge"
    ]
  },
  {
    "page": "Delete Me",
    "url": "https://wikiwiki.jp/ton_jp/Delete%20Me",
    "names": [
      "Delete Me"
    ]
  },
  {
    "page": "Deleted",
    "url": "https://wikiwiki.jp/ton_jp/Deleted",
    "names": [
      "Deleted"
    ]
  },
  {
    "page": "Demented Spongebob",
    "url": "https://wikiwiki.jp/ton_jp/Demented%20Spongebob",
    "names": [
      "Demented Spongebob"
    ]
  },
  {
    "page": "Dev Bytes",
    "url": "https://wikiwiki.jp/ton_jp/Dev%20Bytes",
    "names": [
      "Dev Bytes"
    ]
  },
  {
    "page": "Dev Maulers",
    "url": "https://wikiwiki.jp/ton_jp/Dev%20Maulers",
    "names": [
      "Dev Maulers"
    ]
  },
  {
    "page": "Dog Mimic",
    "url": "https://wikiwiki.jp/ton_jp/Dog%20Mimic",
    "names": [
      "Dog Mimic"
    ]
  },
  {
    "page": "Don't Touch Me",
    "url": "https://wikiwiki.jp/ton_jp/Don%27t%20Touch%20Me",
    "names": [
      "Don't Touch Me"
    ]
  },
  {
    "page": "DoomBox",
    "url": "https://wikiwiki.jp/ton_jp/DoomBox",
    "names": [
      "DoomBox"
    ]
  },
  {
    "page": "Double Ao Oni",
    "url": "https://wikiwiki.jp/ton_jp/Double%20Ao%20Oni",
    "names": [
      "Double Ao Oni"
    ]
  },
  {
    "page": "Dr. Tox",
    "url": "https://wikiwiki.jp/ton_jp/Dr.%20Tox",
    "names": [
      "Dr. Tox"
    ]
  },
  {
    "page": "Drones",
    "url": "https://wikiwiki.jp/ton_jp/Drones",
    "names": [
      "Drones"
    ]
  },
  {
    "page": "Eating Contest",
    "url": "https://wikiwiki.jp/ton_jp/Eating%20Contest",
    "names": [
      "Eating Contest"
    ]
  },
  {
    "page": "Eggman's Announcement",
    "url": "https://wikiwiki.jp/ton_jp/Eggman%27s%20Announcement",
    "names": [
      "Eggman's Announcement"
    ]
  },
  {
    "page": "END OF THE WORLD",
    "url": "https://wikiwiki.jp/ton_jp/END%20OF%20THE%20WORLD",
    "names": [
      "END OF THE WORLD"
    ]
  },
  {
    "page": "Epic Bonnie",
    "url": "https://wikiwiki.jp/ton_jp/Epic%20Bonnie",
    "names": [
      "Epic Bonnie"
    ]
  },
  {
    "page": "Evil Purple Foxy",
    "url": "https://wikiwiki.jp/ton_jp/Evil%20Purple%20Foxy",
    "names": [
      "Evil Purple Foxy"
    ]
  },
  {
    "page": "Express Train To Hell",
    "url": "https://wikiwiki.jp/ton_jp/Express%20Train%20To%20Hell",
    "names": [
      "Express Train To Hell"
    ]
  },
  {
    "page": "Eyes",
    "url": "https://wikiwiki.jp/ton_jp/Eyes",
    "names": [
      "Eyes"
    ]
  },
  {
    "page": "face",
    "url": "https://wikiwiki.jp/ton_jp/face",
    "names": [
      "face",
      ".;.[;.;[..;[';'/.[]'];']/'=.",
      ".;.[;.;[..;[';'/.[]'];']/'=.];';[;-=].-=/;-=;][;-=/;'./=-;."
    ]
  },
  {
    "page": "Faceless Mafia",
    "url": "https://wikiwiki.jp/ton_jp/Faceless%20Mafia",
    "names": [
      "Faceless Mafia"
    ]
  },
  {
    "page": "Father Son Bonding",
    "url": "https://wikiwiki.jp/ton_jp/Father%20Son%20Bonding",
    "names": [
      "Father Son Bonding"
    ]
  },
  {
    "page": "Feddys",
    "url": "https://wikiwiki.jp/ton_jp/Feddys",
    "names": [
      "Feddys"
    ]
  },
  {
    "page": "Forest Guardians",
    "url": "https://wikiwiki.jp/ton_jp/Forest%20Guardians",
    "names": [
      "Forest Guardians"
    ]
  },
  {
    "page": "Fox Squad",
    "url": "https://wikiwiki.jp/ton_jp/Fox%20Squad",
    "names": [
      "Fox Squad",
      "FOX Squad"
    ]
  },
  {
    "page": "Fragmented Memories",
    "url": "https://wikiwiki.jp/ton_jp/Fragmented%20Memories",
    "names": [
      "Fragmented Memories"
    ]
  },
  {
    "page": "Freaks",
    "url": "https://wikiwiki.jp/ton_jp/Freaks",
    "names": [
      "Freaks"
    ]
  },
  {
    "page": "Freezer",
    "url": "https://wikiwiki.jp/ton_jp/Freezer",
    "names": [
      "Freezer"
    ]
  },
  {
    "page": "Furnace",
    "url": "https://wikiwiki.jp/ton_jp/Furnace",
    "names": [
      "Furnace"
    ]
  },
  {
    "page": "Fusion Pilot",
    "url": "https://wikiwiki.jp/ton_jp/Fusion%20Pilot",
    "names": [
      "Fusion Pilot"
    ]
  },
  {
    "page": "Garden Rejects",
    "url": "https://wikiwiki.jp/ton_jp/Garden%20Rejects",
    "names": [
      "Garden Rejects"
    ]
  },
  {
    "page": "GARFIELD",
    "url": "https://wikiwiki.jp/ton_jp/GARFIELD",
    "names": [
      "GARFIELD"
    ]
  },
  {
    "page": "Garten Goers",
    "url": "https://wikiwiki.jp/ton_jp/Garten%20Goers",
    "names": [
      "Garten Goers"
    ]
  },
  {
    "page": "Ghost Girl",
    "url": "https://wikiwiki.jp/ton_jp/Ghost%20Girl",
    "names": [
      "Ghost Girl"
    ]
  },
  {
    "page": "GIGABYTE",
    "url": "https://wikiwiki.jp/ton_jp/GIGABYTE",
    "names": [
      "GIGABYTE"
    ]
  },
  {
    "page": "Glaggle  Gang",
    "url": "https://wikiwiki.jp/ton_jp/Glaggle%20%20Gang",
    "names": [
      "Glaggle  Gang"
    ]
  },
  {
    "page": "Glaggleland Cremators",
    "url": "https://wikiwiki.jp/ton_jp/Glaggleland%20Cremators",
    "names": [
      "Glaggleland Cremators"
    ]
  },
  {
    "page": "Glorbo",
    "url": "https://wikiwiki.jp/ton_jp/Glorbo",
    "names": [
      "Glorbo"
    ]
  },
  {
    "page": "Glorbo Prime",
    "url": "https://wikiwiki.jp/ton_jp/Glorbo%20Prime",
    "names": [
      "Glorbo Prime"
    ]
  },
  {
    "page": "Guidance The Booboo's",
    "url": "https://wikiwiki.jp/ton_jp/Guidance%20The%20Booboo%27s",
    "names": [
      "Guidance The Booboo's",
      "Guidance & The Booboo's"
    ]
  },
  {
    "page": "Haket",
    "url": "https://wikiwiki.jp/ton_jp/Haket",
    "names": [
      "Haket"
    ]
  },
  {
    "page": "Harvest",
    "url": "https://wikiwiki.jp/ton_jp/Harvest",
    "names": [
      "Harvest"
    ]
  },
  {
    "page": "Hell Bell",
    "url": "https://wikiwiki.jp/ton_jp/Hell%20Bell",
    "names": [
      "Hell Bell"
    ]
  },
  {
    "page": "HER",
    "url": "https://wikiwiki.jp/ton_jp/HER",
    "names": [
      "HER"
    ]
  },
  {
    "page": "Herobrine",
    "url": "https://wikiwiki.jp/ton_jp/Herobrine",
    "names": [
      "Herobrine"
    ]
  },
  {
    "page": "Higher Beings",
    "url": "https://wikiwiki.jp/ton_jp/Higher%20Beings",
    "names": [
      "Higher Beings"
    ]
  },
  {
    "page": "HoovyDundy",
    "url": "https://wikiwiki.jp/ton_jp/HoovyDundy",
    "names": [
      "HoovyDundy"
    ]
  },
  {
    "page": "Horseless Headless Horsemann",
    "url": "https://wikiwiki.jp/ton_jp/Horseless%20Headless%20Horsemann",
    "names": [
      "Horseless Headless Horsemann"
    ]
  },
  {
    "page": "Hotel Monsters",
    "url": "https://wikiwiki.jp/ton_jp/Hotel%20Monsters",
    "names": [
      "Hotel Monsters"
    ]
  },
  {
    "page": "Huggy",
    "url": "https://wikiwiki.jp/ton_jp/Huggy",
    "names": [
      "Huggy"
    ]
  },
  {
    "page": "Huggy Horde",
    "url": "https://wikiwiki.jp/ton_jp/Huggy%20Horde",
    "names": [
      "Huggy Horde"
    ]
  },
  {
    "page": "Hungry Home Invader",
    "url": "https://wikiwiki.jp/ton_jp/Hungry%20Home%20Invader",
    "names": [
      "Hungry Home Invader"
    ]
  },
  {
    "page": "Hush",
    "url": "https://wikiwiki.jp/ton_jp/Hush",
    "names": [
      "Hush"
    ]
  },
  {
    "page": "Immortal Snail",
    "url": "https://wikiwiki.jp/ton_jp/Immortal%20Snail",
    "names": [
      "Immortal Snail"
    ]
  },
  {
    "page": "Imposter",
    "url": "https://wikiwiki.jp/ton_jp/Imposter",
    "names": [
      "Imposter"
    ]
  },
  {
    "page": "Infection",
    "url": "https://wikiwiki.jp/ton_jp/Infection",
    "names": [
      "Infection"
    ]
  },
  {
    "page": "Ink Demon",
    "url": "https://wikiwiki.jp/ton_jp/Ink%20Demon",
    "names": [
      "Ink Demon"
    ]
  },
  {
    "page": "Interloper",
    "url": "https://wikiwiki.jp/ton_jp/Interloper",
    "names": [
      "Interloper"
    ]
  },
  {
    "page": "Inverted Roblander",
    "url": "https://wikiwiki.jp/ton_jp/Inverted%20Roblander",
    "names": [
      "Inverted Roblander"
    ]
  },
  {
    "page": "It Came From Bus To Nowhere",
    "url": "https://wikiwiki.jp/ton_jp/It%20Came%20From%20Bus%20To%20Nowhere",
    "names": [
      "It Came From Bus To Nowhere"
    ]
  },
  {
    "page": "Joy",
    "url": "https://wikiwiki.jp/ton_jp/Joy",
    "names": [
      "Joy"
    ]
  },
  {
    "page": "Judas",
    "url": "https://wikiwiki.jp/ton_jp/Judas",
    "names": [
      "Judas"
    ]
  },
  {
    "page": "Judgement Bird",
    "url": "https://wikiwiki.jp/ton_jp/Judgement%20Bird",
    "names": [
      "Judgement Bird"
    ]
  },
  {
    "page": "Judgement Day",
    "url": "https://wikiwiki.jp/ton_jp/Judgement%20Day",
    "names": [
      "Judgement Day"
    ]
  },
  {
    "page": "Karol_Corpse",
    "url": "https://wikiwiki.jp/ton_jp/Karol_Corpse",
    "names": [
      "Karol_Corpse"
    ]
  },
  {
    "page": "Killer Fish",
    "url": "https://wikiwiki.jp/ton_jp/Killer%20Fish",
    "names": [
      "Killer Fish"
    ]
  },
  {
    "page": "Killer Rabbit",
    "url": "https://wikiwiki.jp/ton_jp/Killer%20Rabbit",
    "names": [
      "Killer Rabbit"
    ]
  },
  {
    "page": "Kimera",
    "url": "https://wikiwiki.jp/ton_jp/Kimera",
    "names": [
      "Kimera"
    ]
  },
  {
    "page": "Knight of Toren",
    "url": "https://wikiwiki.jp/ton_jp/Knight%20of%20Toren",
    "names": [
      "Knight of Toren",
      "The Knight of Toren",
      "The Knight Of Toren"
    ]
  },
  {
    "page": "Labyrinth",
    "url": "https://wikiwiki.jp/ton_jp/Labyrinth",
    "names": [
      "Labyrinth"
    ]
  },
  {
    "page": "lain",
    "url": "https://wikiwiki.jp/ton_jp/lain",
    "names": [
      "lain"
    ]
  },
  {
    "page": "LESSER CENSORED",
    "url": "https://wikiwiki.jp/ton_jp/LESSER%20CENSORED",
    "names": [
      "LESSER CENSORED",
      "[LESSER CENSORED]"
    ]
  },
  {
    "page": "Lethal League",
    "url": "https://wikiwiki.jp/ton_jp/Lethal%20League",
    "names": [
      "Lethal League"
    ]
  },
  {
    "page": "Life Death",
    "url": "https://wikiwiki.jp/ton_jp/Life%20Death",
    "names": [
      "Life Death",
      "Life & Death"
    ]
  },
  {
    "page": "Living Shadow",
    "url": "https://wikiwiki.jp/ton_jp/Living%20Shadow",
    "names": [
      "Living Shadow"
    ]
  },
  {
    "page": "Lord's Signal",
    "url": "https://wikiwiki.jp/ton_jp/Lord%27s%20Signal",
    "names": [
      "Lord's Signal"
    ]
  },
  {
    "page": "Lost Souls",
    "url": "https://wikiwiki.jp/ton_jp/Lost%20Souls",
    "names": [
      "Lost Souls"
    ]
  },
  {
    "page": "Luigi - Luigi Dolls",
    "url": "https://wikiwiki.jp/ton_jp/Luigi%20-%20Luigi%20Dolls",
    "names": [
      "Luigi - Luigi Dolls",
      "Luigi & Luigi Dolls"
    ]
  },
  {
    "page": "Luigi Dolls",
    "url": "https://wikiwiki.jp/ton_jp/Luigi%20Dolls",
    "names": [
      "Luigi Dolls"
    ]
  },
  {
    "page": "Lunatic Cult",
    "url": "https://wikiwiki.jp/ton_jp/Lunatic%20Cult",
    "names": [
      "Lunatic Cult"
    ]
  },
  {
    "page": "Lunatic Cultist",
    "url": "https://wikiwiki.jp/ton_jp/Lunatic%20Cultist",
    "names": [
      "Lunatic Cultist"
    ]
  },
  {
    "page": "Malicious Twins",
    "url": "https://wikiwiki.jp/ton_jp/Malicious%20Twins",
    "names": [
      "Malicious Twins"
    ]
  },
  {
    "page": "Mansion Monsters",
    "url": "https://wikiwiki.jp/ton_jp/Mansion%20Monsters",
    "names": [
      "Mansion Monsters"
    ]
  },
  {
    "page": "Manti",
    "url": "https://wikiwiki.jp/ton_jp/Manti",
    "names": [
      "Manti"
    ]
  },
  {
    "page": "Mario Has Logged In",
    "url": "https://wikiwiki.jp/ton_jp/Mario%20Has%20Logged%20In",
    "names": [
      "Mario Has Logged In"
    ]
  },
  {
    "page": "Maul-A-Child",
    "url": "https://wikiwiki.jp/ton_jp/Maul-A-Child",
    "names": [
      "Maul-A-Child"
    ]
  },
  {
    "page": "Maze Thing",
    "url": "https://wikiwiki.jp/ton_jp/Maze%20Thing",
    "names": [
      "Maze Thing"
    ]
  },
  {
    "page": "Me and My Shadow",
    "url": "https://wikiwiki.jp/ton_jp/Me%20and%20My%20Shadow",
    "names": [
      "Me and My Shadow"
    ]
  },
  {
    "page": "Meltdown",
    "url": "https://wikiwiki.jp/ton_jp/Meltdown",
    "names": [
      "Meltdown"
    ]
  },
  {
    "page": "Memory Crypts",
    "url": "https://wikiwiki.jp/ton_jp/Memory%20Crypts",
    "names": [
      "Memory Crypts"
    ]
  },
  {
    "page": "Meteor Shower",
    "url": "https://wikiwiki.jp/ton_jp/Meteor%20Shower",
    "names": [
      "Meteor Shower"
    ]
  },
  {
    "page": "Miros Birds",
    "url": "https://wikiwiki.jp/ton_jp/Miros%20Birds",
    "names": [
      "Miros Birds"
    ]
  },
  {
    "page": "Mirror",
    "url": "https://wikiwiki.jp/ton_jp/Mirror",
    "names": [
      "Mirror"
    ]
  },
  {
    "page": "MissingNo（けつばん）",
    "url": "https://wikiwiki.jp/ton_jp/MissingNo%EF%BC%88%E3%81%91%E3%81%A4%E3%81%B0%E3%82%93%EF%BC%89",
    "names": [
      "MissingNo（けつばん）",
      "MissingNo"
    ]
  },
  {
    "page": "Mona - The Mountain",
    "url": "https://wikiwiki.jp/ton_jp/Mona%20-%20The%20Mountain",
    "names": [
      "Mona - The Mountain",
      "Mona & The Mountain"
    ]
  },
  {
    "page": "Mona　Mona　Mona　Mona",
    "url": "https://wikiwiki.jp/ton_jp/Mona%E3%80%80Mona%E3%80%80Mona%E3%80%80Mona",
    "names": [
      "Mona　Mona　Mona　Mona",
      "Mona & Mona & Mona & Mona"
    ]
  },
  {
    "page": "Monarch",
    "url": "https://wikiwiki.jp/ton_jp/Monarch",
    "names": [
      "Monarch"
    ]
  },
  {
    "page": "MopeMope",
    "url": "https://wikiwiki.jp/ton_jp/MopeMope",
    "names": [
      "MopeMope",
      "Mope Mope"
    ]
  },
  {
    "page": "Mopemopemopemopemopemope",
    "url": "https://wikiwiki.jp/ton_jp/Mopemopemopemopemopemope",
    "names": [
      "Mopemopemopemopemopemope"
    ]
  },
  {
    "page": "MR MEGA",
    "url": "https://wikiwiki.jp/ton_jp/MR%20MEGA",
    "names": [
      "MR MEGA",
      "MR.MEGA"
    ]
  },
  {
    "page": "MX",
    "url": "https://wikiwiki.jp/ton_jp/MX",
    "names": [
      "MX"
    ]
  },
  {
    "page": "Nameless",
    "url": "https://wikiwiki.jp/ton_jp/Nameless",
    "names": [
      "Nameless"
    ]
  },
  {
    "page": "Neo Pilot",
    "url": "https://wikiwiki.jp/ton_jp/Neo%20Pilot",
    "names": [
      "Neo Pilot"
    ]
  },
  {
    "page": "Nextbots",
    "url": "https://wikiwiki.jp/ton_jp/Nextbots",
    "names": [
      "Nextbots"
    ]
  },
  {
    "page": "Nosk",
    "url": "https://wikiwiki.jp/ton_jp/Nosk",
    "names": [
      "Nosk"
    ]
  },
  {
    "page": "Nugget Squad",
    "url": "https://wikiwiki.jp/ton_jp/Nugget%20Squad",
    "names": [
      "Nugget Squad",
      "Happy Meal"
    ]
  },
  {
    "page": "OH NO",
    "url": "https://wikiwiki.jp/ton_jp/OH%20NO",
    "names": [
      "OH NO"
    ]
  },
  {
    "page": "Ordinary Apocalypse Bird",
    "url": "https://wikiwiki.jp/ton_jp/Ordinary%20Apocalypse%20Bird",
    "names": [
      "Ordinary Apocalypse Bird"
    ]
  },
  {
    "page": "OVERSEER",
    "url": "https://wikiwiki.jp/ton_jp/OVERSEER",
    "names": [
      "OVERSEER"
    ]
  },
  {
    "page": "Pack of Wild Yet Curious Creatures",
    "url": "https://wikiwiki.jp/ton_jp/Pack%20of%20Wild%20Yet%20Curious%20Creatures",
    "names": [
      "Pack of Wild Yet Curious Creatures"
    ]
  },
  {
    "page": "Pack of Yolm",
    "url": "https://wikiwiki.jp/ton_jp/Pack%20of%20Yolm",
    "names": [
      "Pack of Yolm"
    ]
  },
  {
    "page": "Pale Association",
    "url": "https://wikiwiki.jp/ton_jp/Pale%20Association",
    "names": [
      "Pale Association"
    ]
  },
  {
    "page": "Pandora",
    "url": "https://wikiwiki.jp/ton_jp/Pandora",
    "names": [
      "Pandora"
    ]
  },
  {
    "page": "Paradise Bird",
    "url": "https://wikiwiki.jp/ton_jp/Paradise%20Bird",
    "names": [
      "Paradise Bird"
    ]
  },
  {
    "page": "Parhelion",
    "url": "https://wikiwiki.jp/ton_jp/Parhelion",
    "names": [
      "Parhelion"
    ]
  },
  {
    "page": "Parhelion's Victims",
    "url": "https://wikiwiki.jp/ton_jp/Parhelion%27s%20Victims",
    "names": [
      "Parhelion's Victims"
    ]
  },
  {
    "page": "Peepy",
    "url": "https://wikiwiki.jp/ton_jp/Peepy",
    "names": [
      "Peepy"
    ]
  },
  {
    "page": "Pizza Mascots",
    "url": "https://wikiwiki.jp/ton_jp/Pizza%20Mascots",
    "names": [
      "Pizza Mascots"
    ]
  },
  {
    "page": "Poly",
    "url": "https://wikiwiki.jp/ton_jp/Poly",
    "names": [
      "Poly"
    ]
  },
  {
    "page": "POV　Bug",
    "url": "https://wikiwiki.jp/ton_jp/POV%E3%80%80Bug",
    "names": [
      "POV　Bug",
      "POV: Bug",
      "POV : Bug",
      "POV Bug"
    ]
  },
  {
    "page": "Prisoner",
    "url": "https://wikiwiki.jp/ton_jp/Prisoner",
    "names": [
      "Prisoner"
    ]
  },
  {
    "page": "Psychosis",
    "url": "https://wikiwiki.jp/ton_jp/Psychosis",
    "names": [
      "Psychosis"
    ]
  },
  {
    "page": "Punishing Bird",
    "url": "https://wikiwiki.jp/ton_jp/Punishing%20Bird",
    "names": [
      "Punishing Bird"
    ]
  },
  {
    "page": "Punishing Birdemic",
    "url": "https://wikiwiki.jp/ton_jp/Punishing%20Birdemic",
    "names": [
      "Punishing Birdemic"
    ]
  },
  {
    "page": "Purple Bros",
    "url": "https://wikiwiki.jp/ton_jp/Purple%20Bros",
    "names": [
      "Purple Bros"
    ]
  },
  {
    "page": "Purple Guy",
    "url": "https://wikiwiki.jp/ton_jp/Purple%20Guy",
    "names": [
      "Purple Guy"
    ]
  },
  {
    "page": "Quadruple Sponge",
    "url": "https://wikiwiki.jp/ton_jp/Quadruple%20Sponge",
    "names": [
      "Quadruple Sponge"
    ]
  },
  {
    "page": "Rabid Snarbolax",
    "url": "https://wikiwiki.jp/ton_jp/Rabid%20Snarbolax",
    "names": [
      "Rabid Snarbolax"
    ]
  },
  {
    "page": "Random Flying Knife",
    "url": "https://wikiwiki.jp/ton_jp/Random%20Flying%20Knife",
    "names": [
      "Random Flying Knife"
    ]
  },
  {
    "page": "Red Bus",
    "url": "https://wikiwiki.jp/ton_jp/Red%20Bus",
    "names": [
      "Red Bus"
    ]
  },
  {
    "page": "Red Fanatic",
    "url": "https://wikiwiki.jp/ton_jp/Red%20Fanatic",
    "names": [
      "Red Fanatic"
    ]
  },
  {
    "page": "Red Merchant",
    "url": "https://wikiwiki.jp/ton_jp/Red%20Merchant",
    "names": [
      "Red Merchant"
    ]
  },
  {
    "page": "Red Mist",
    "url": "https://wikiwiki.jp/ton_jp/Red%20Mist",
    "names": [
      "Red Mist"
    ]
  },
  {
    "page": "Red Mist Apparition",
    "url": "https://wikiwiki.jp/ton_jp/Red%20Mist%20Apparition",
    "names": [
      "Red Mist Apparition"
    ]
  },
  {
    "page": "Red Passengers",
    "url": "https://wikiwiki.jp/ton_jp/Red%20Passengers",
    "names": [
      "Red Passengers"
    ]
  },
  {
    "page": "Red vs Blue",
    "url": "https://wikiwiki.jp/ton_jp/Red%20vs%20Blue",
    "names": [
      "Red vs Blue"
    ]
  },
  {
    "page": "Retep",
    "url": "https://wikiwiki.jp/ton_jp/Retep",
    "names": [
      "Retep"
    ]
  },
  {
    "page": "Reunion",
    "url": "https://wikiwiki.jp/ton_jp/Reunion",
    "names": [
      "Reunion"
    ]
  },
  {
    "page": "Rewrite",
    "url": "https://wikiwiki.jp/ton_jp/Rewrite",
    "names": [
      "Rewrite"
    ]
  },
  {
    "page": "Rift Monsters",
    "url": "https://wikiwiki.jp/ton_jp/Rift%20Monsters",
    "names": [
      "Rift Monsters"
    ]
  },
  {
    "page": "Roblander",
    "url": "https://wikiwiki.jp/ton_jp/Roblander",
    "names": [
      "Roblander"
    ]
  },
  {
    "page": "Ruinborn Afton",
    "url": "https://wikiwiki.jp/ton_jp/Ruinborn%20Afton",
    "names": [
      "Ruinborn Afton"
    ]
  },
  {
    "page": "Rush",
    "url": "https://wikiwiki.jp/ton_jp/Rush",
    "names": [
      "Rush"
    ]
  },
  {
    "page": "S.O.S",
    "url": "https://wikiwiki.jp/ton_jp/S.O.S",
    "names": [
      "S.O.S"
    ]
  },
  {
    "page": "S.T.G.M",
    "url": "https://wikiwiki.jp/ton_jp/S.T.G.M",
    "names": [
      "S.T.G.M"
    ]
  },
  {
    "page": "Sakuya Izayoi",
    "url": "https://wikiwiki.jp/ton_jp/Sakuya%20Izayoi",
    "names": [
      "Sakuya Izayoi"
    ]
  },
  {
    "page": "Sakuya The Ripper",
    "url": "https://wikiwiki.jp/ton_jp/Sakuya%20The%20Ripper",
    "names": [
      "Sakuya The Ripper"
    ]
  },
  {
    "page": "Sanic",
    "url": "https://wikiwiki.jp/ton_jp/Sanic",
    "names": [
      "Sanic"
    ]
  },
  {
    "page": "Saul's goodmen",
    "url": "https://wikiwiki.jp/ton_jp/Saul%27s%20goodmen",
    "names": [
      "Saul's goodmen",
      "Saul's Goodmen"
    ]
  },
  {
    "page": "SawMarathon",
    "url": "https://wikiwiki.jp/ton_jp/SawMarathon",
    "names": [
      "SawMarathon"
    ]
  },
  {
    "page": "Sawrunner",
    "url": "https://wikiwiki.jp/ton_jp/Sawrunner",
    "names": [
      "Sawrunner"
    ]
  },
  {
    "page": "Scavenger",
    "url": "https://wikiwiki.jp/ton_jp/Scavenger",
    "names": [
      "Scavenger"
    ]
  },
  {
    "page": "Scrapyard Machine",
    "url": "https://wikiwiki.jp/ton_jp/Scrapyard%20Machine",
    "names": [
      "Scrapyard Machine"
    ]
  },
  {
    "page": "Scrapyard Takers",
    "url": "https://wikiwiki.jp/ton_jp/Scrapyard%20Takers",
    "names": [
      "Scrapyard Takers"
    ]
  },
  {
    "page": "Search and Destroy",
    "url": "https://wikiwiki.jp/ton_jp/Search%20and%20Destroy",
    "names": [
      "Search and Destroy"
    ]
  },
  {
    "page": "Searchlights",
    "url": "https://wikiwiki.jp/ton_jp/Searchlights",
    "names": [
      "Searchlights"
    ]
  },
  {
    "page": "Security",
    "url": "https://wikiwiki.jp/ton_jp/Security",
    "names": [
      "Security"
    ]
  },
  {
    "page": "Seek",
    "url": "https://wikiwiki.jp/ton_jp/Seek",
    "names": [
      "Seek"
    ]
  },
  {
    "page": "Seekers",
    "url": "https://wikiwiki.jp/ton_jp/Seekers",
    "names": [
      "Seekers",
      "Maze Things"
    ]
  },
  {
    "page": "Shade of Ambition",
    "url": "https://wikiwiki.jp/ton_jp/Shade%20of%20Ambition",
    "names": [
      "Shade of Ambition"
    ]
  },
  {
    "page": "Shadow Freddy",
    "url": "https://wikiwiki.jp/ton_jp/Shadow%20Freddy",
    "names": [
      "Shadow Freddy"
    ]
  },
  {
    "page": "Shadows Of Yharnam",
    "url": "https://wikiwiki.jp/ton_jp/Shadows%20Of%20Yharnam",
    "names": [
      "Shadows Of Yharnam"
    ]
  },
  {
    "page": "Shinto",
    "url": "https://wikiwiki.jp/ton_jp/Shinto",
    "names": [
      "Shinto"
    ]
  },
  {
    "page": "Shiteyanyo",
    "url": "https://wikiwiki.jp/ton_jp/Shiteyanyo",
    "names": [
      "Shiteyanyo"
    ]
  },
  {
    "page": "Signus",
    "url": "https://wikiwiki.jp/ton_jp/Signus",
    "names": [
      "Signus"
    ]
  },
  {
    "page": "Skibidi Guidance",
    "url": "https://wikiwiki.jp/ton_jp/Skibidi%20Guidance",
    "names": [
      "Skibidi Guidance"
    ]
  },
  {
    "page": "Slender",
    "url": "https://wikiwiki.jp/ton_jp/Slender",
    "names": [
      "Slender"
    ]
  },
  {
    "page": "Slendy",
    "url": "https://wikiwiki.jp/ton_jp/Slendy",
    "names": [
      "Slendy"
    ]
  },
  {
    "page": "sm64.z64",
    "url": "https://wikiwiki.jp/ton_jp/sm64.z64",
    "names": [
      "sm64.z64"
    ]
  },
  {
    "page": "Smile Walker",
    "url": "https://wikiwiki.jp/ton_jp/Smile%20Walker",
    "names": [
      "Smile Walker"
    ]
  },
  {
    "page": "Smileghost",
    "url": "https://wikiwiki.jp/ton_jp/Smileghost",
    "names": [
      "Smileghost"
    ]
  },
  {
    "page": "Snarbolax",
    "url": "https://wikiwiki.jp/ton_jp/Snarbolax",
    "names": [
      "Snarbolax"
    ]
  },
  {
    "page": "Solar Cultist",
    "url": "https://wikiwiki.jp/ton_jp/Solar%20Cultist",
    "names": [
      "Solar Cultist"
    ]
  },
  {
    "page": "Something",
    "url": "https://wikiwiki.jp/ton_jp/Something",
    "names": [
      "Something"
    ]
  },
  {
    "page": "Something Old, Something New",
    "url": "https://wikiwiki.jp/ton_jp/Something%20Old%2C%20Something%20New",
    "names": [
      "Something Old, Something New"
    ]
  },
  {
    "page": "Something Wicked",
    "url": "https://wikiwiki.jp/ton_jp/Something%20Wicked",
    "names": [
      "Something Wicked"
    ]
  },
  {
    "page": "Sonic",
    "url": "https://wikiwiki.jp/ton_jp/Sonic",
    "names": [
      "Sonic"
    ]
  },
  {
    "page": "Spamton",
    "url": "https://wikiwiki.jp/ton_jp/Spamton",
    "names": [
      "Spamton"
    ]
  },
  {
    "page": "Spamton Spam",
    "url": "https://wikiwiki.jp/ton_jp/Spamton%20Spam",
    "names": [
      "Spamton Spam"
    ]
  },
  {
    "page": "Specimen 10",
    "url": "https://wikiwiki.jp/ton_jp/Specimen%2010",
    "names": [
      "Specimen 10"
    ]
  },
  {
    "page": "Specimen 2",
    "url": "https://wikiwiki.jp/ton_jp/Specimen%202",
    "names": [
      "Specimen 2"
    ]
  },
  {
    "page": "Specimen 5",
    "url": "https://wikiwiki.jp/ton_jp/Specimen%205",
    "names": [
      "Specimen 5"
    ]
  },
  {
    "page": "Specimen 8",
    "url": "https://wikiwiki.jp/ton_jp/Specimen%208",
    "names": [
      "Specimen 8"
    ]
  },
  {
    "page": "Specimen 9",
    "url": "https://wikiwiki.jp/ton_jp/Specimen%209",
    "names": [
      "Specimen 9"
    ]
  },
  {
    "page": "Spiteful Shadows",
    "url": "https://wikiwiki.jp/ton_jp/Spiteful%20Shadows",
    "names": [
      "Spiteful Shadows"
    ]
  },
  {
    "page": "Spoiler Guardian",
    "url": "https://wikiwiki.jp/ton_jp/Spoiler%20Guardian",
    "names": [
      "Spoiler Guardian"
    ]
  },
  {
    "page": "Spongefly Swarm",
    "url": "https://wikiwiki.jp/ton_jp/Spongefly%20Swarm",
    "names": [
      "Spongefly Swarm"
    ]
  },
  {
    "page": "Squibb Squad",
    "url": "https://wikiwiki.jp/ton_jp/Squibb%20Squad",
    "names": [
      "Squibb Squad"
    ]
  },
  {
    "page": "Squidward",
    "url": "https://wikiwiki.jp/ton_jp/Squidward",
    "names": [
      "Squidward"
    ]
  },
  {
    "page": "Starved",
    "url": "https://wikiwiki.jp/ton_jp/Starved",
    "names": [
      "Starved"
    ]
  },
  {
    "page": "Sturm",
    "url": "https://wikiwiki.jp/ton_jp/Sturm",
    "names": [
      "Sturm"
    ]
  },
  {
    "page": "Tails Doll",
    "url": "https://wikiwiki.jp/ton_jp/Tails%20Doll",
    "names": [
      "Tails Doll"
    ]
  },
  {
    "page": "TAKE THE NAMI CHALLENGE",
    "url": "https://wikiwiki.jp/ton_jp/TAKE%20THE%20NAMI%20CHALLENGE",
    "names": [
      "TAKE THE NAMI CHALLENGE"
    ]
  },
  {
    "page": "TBH",
    "url": "https://wikiwiki.jp/ton_jp/TBH",
    "names": [
      "TBH"
    ]
  },
  {
    "page": "TBH SANS",
    "url": "https://wikiwiki.jp/ton_jp/TBH%20SANS",
    "names": [
      "TBH SANS"
    ]
  },
  {
    "page": "TBH SPY",
    "url": "https://wikiwiki.jp/ton_jp/TBH%20SPY",
    "names": [
      "TBH SPY"
    ]
  },
  {
    "page": "Terror of Nowhere (テラー)",
    "url": "https://wikiwiki.jp/ton_jp/Terror%20of%20Nowhere%20%28%E3%83%86%E3%83%A9%E3%83%BC%29",
    "names": [
      "Terror of Nowhere (テラー)",
      "Terror of Nowhere"
    ]
  },
  {
    "page": "Teuthida",
    "url": "https://wikiwiki.jp/ton_jp/Teuthida",
    "names": [
      "Teuthida"
    ]
  },
  {
    "page": "The Batter",
    "url": "https://wikiwiki.jp/ton_jp/The%20Batter",
    "names": [
      "The Batter"
    ]
  },
  {
    "page": "The Boys",
    "url": "https://wikiwiki.jp/ton_jp/The%20Boys",
    "names": [
      "The Boys"
    ]
  },
  {
    "page": "The Guidance",
    "url": "https://wikiwiki.jp/ton_jp/The%20Guidance",
    "names": [
      "The Guidance"
    ]
  },
  {
    "page": "The Jester",
    "url": "https://wikiwiki.jp/ton_jp/The%20Jester",
    "names": [
      "The Jester"
    ]
  },
  {
    "page": "The LifeBringer",
    "url": "https://wikiwiki.jp/ton_jp/The%20LifeBringer",
    "names": [
      "The LifeBringer"
    ]
  },
  {
    "page": "The MeatBallMan",
    "url": "https://wikiwiki.jp/ton_jp/The%20MeatBallMan",
    "names": [
      "The MeatBallMan",
      "The MeatBall Man"
    ]
  },
  {
    "page": "The Navigator",
    "url": "https://wikiwiki.jp/ton_jp/The%20Navigator",
    "names": [
      "The Navigator"
    ]
  },
  {
    "page": "The Observation",
    "url": "https://wikiwiki.jp/ton_jp/The%20Observation",
    "names": [
      "The Observation"
    ]
  },
  {
    "page": "The Old Man",
    "url": "https://wikiwiki.jp/ton_jp/The%20Old%20Man",
    "names": [
      "The Old Man"
    ]
  },
  {
    "page": "The Origin",
    "url": "https://wikiwiki.jp/ton_jp/The%20Origin",
    "names": [
      "The Origin"
    ]
  },
  {
    "page": "The Painter",
    "url": "https://wikiwiki.jp/ton_jp/The%20Painter",
    "names": [
      "The Painter"
    ]
  },
  {
    "page": "The Plague Doctor",
    "url": "https://wikiwiki.jp/ton_jp/The%20Plague%20Doctor",
    "names": [
      "The Plague Doctor"
    ]
  },
  {
    "page": "The Pursuer",
    "url": "https://wikiwiki.jp/ton_jp/The%20Pursuer",
    "names": [
      "The Pursuer"
    ]
  },
  {
    "page": "The Rat",
    "url": "https://wikiwiki.jp/ton_jp/The%20Rat",
    "names": [
      "The Rat"
    ]
  },
  {
    "page": "The Red Mist",
    "url": "https://wikiwiki.jp/ton_jp/The%20Red%20Mist",
    "names": [
      "The Red Mist"
    ]
  },
  {
    "page": "The Restless",
    "url": "https://wikiwiki.jp/ton_jp/The%20Restless",
    "names": [
      "The Restless"
    ]
  },
  {
    "page": "The Sculpture",
    "url": "https://wikiwiki.jp/ton_jp/The%20Sculpture",
    "names": [
      "The Sculpture"
    ]
  },
  {
    "page": "The Swarm",
    "url": "https://wikiwiki.jp/ton_jp/The%20Swarm",
    "names": [
      "The Swarm"
    ]
  },
  {
    "page": "Third Trumpet",
    "url": "https://wikiwiki.jp/ton_jp/Third%20Trumpet",
    "names": [
      "Third Trumpet"
    ]
  },
  {
    "page": "This Killer does not exist",
    "url": "https://wikiwiki.jp/ton_jp/This%20Killer%20does%20not%20exist",
    "names": [
      "This Killer does not exist"
    ]
  },
  {
    "page": "Those Olden Days",
    "url": "https://wikiwiki.jp/ton_jp/Those%20Olden%20Days",
    "names": [
      "Those Olden Days"
    ]
  },
  {
    "page": "Threepy",
    "url": "https://wikiwiki.jp/ton_jp/Threepy",
    "names": [
      "Threepy"
    ]
  },
  {
    "page": "Thunderstorm",
    "url": "https://wikiwiki.jp/ton_jp/Thunderstorm",
    "names": [
      "Thunderstorm"
    ]
  },
  {
    "page": "Tiffany",
    "url": "https://wikiwiki.jp/ton_jp/Tiffany",
    "names": [
      "Tiffany"
    ]
  },
  {
    "page": "Time Ripper",
    "url": "https://wikiwiki.jp/ton_jp/Time%20Ripper",
    "names": [
      "Time Ripper"
    ]
  },
  {
    "page": "Tinky Winky",
    "url": "https://wikiwiki.jp/ton_jp/Tinky%20Winky",
    "names": [
      "Tinky Winky"
    ]
  },
  {
    "page": "ToN X SlashCo Collab",
    "url": "https://wikiwiki.jp/ton_jp/ToN%20X%20SlashCo%20Collab",
    "names": [
      "ToN X SlashCo Collab"
    ]
  },
  {
    "page": "Too Many Voices",
    "url": "https://wikiwiki.jp/ton_jp/Too%20Many%20Voices",
    "names": [
      "Too Many Voices"
    ]
  },
  {
    "page": "Toren's Shadow",
    "url": "https://wikiwiki.jp/ton_jp/Toren%27s%20Shadow",
    "names": [
      "Toren's Shadow"
    ]
  },
  {
    "page": "Toy Enforcer",
    "url": "https://wikiwiki.jp/ton_jp/Toy%20Enforcer",
    "names": [
      "Toy Enforcer"
    ]
  },
  {
    "page": "Tragedy",
    "url": "https://wikiwiki.jp/ton_jp/Tragedy",
    "names": [
      "Tragedy"
    ]
  },
  {
    "page": "Transportation Trio＆The Drifter",
    "url": "https://wikiwiki.jp/ton_jp/Transportation%20Trio%EF%BC%86The%20Drifter",
    "names": [
      "Transportation Trio＆The Drifter",
      "Transportation Trio&The Drifter",
      "Transportation Trio & The Drifter"
    ]
  },
  {
    "page": "Tricky",
    "url": "https://wikiwiki.jp/ton_jp/Tricky",
    "names": [
      "Tricky"
    ]
  },
  {
    "page": "Triple Akumii Kari",
    "url": "https://wikiwiki.jp/ton_jp/Triple%20Akumii%20Kari",
    "names": [
      "Triple Akumii Kari"
    ]
  },
  {
    "page": "Triple Clockey",
    "url": "https://wikiwiki.jp/ton_jp/Triple%20Clockey",
    "names": [
      "Triple Clockey"
    ]
  },
  {
    "page": "Triple Hush",
    "url": "https://wikiwiki.jp/ton_jp/Triple%20Hush",
    "names": [
      "Triple Hush"
    ]
  },
  {
    "page": "Triple Killer Fish",
    "url": "https://wikiwiki.jp/ton_jp/Triple%20Killer%20Fish",
    "names": [
      "Triple Killer Fish"
    ]
  },
  {
    "page": "Triple Living Shadow",
    "url": "https://wikiwiki.jp/ton_jp/Triple%20Living%20Shadow",
    "names": [
      "Triple Living Shadow"
    ]
  },
  {
    "page": "Triple Munci",
    "url": "https://wikiwiki.jp/ton_jp/Triple%20Munci",
    "names": [
      "Triple Munci"
    ]
  },
  {
    "page": "Triple Signus",
    "url": "https://wikiwiki.jp/ton_jp/Triple%20Signus",
    "names": [
      "Triple Signus"
    ]
  },
  {
    "page": "Triple TBH",
    "url": "https://wikiwiki.jp/ton_jp/Triple%20TBH",
    "names": [
      "Triple TBH"
    ]
  },
  {
    "page": "Triple Trouble",
    "url": "https://wikiwiki.jp/ton_jp/Triple%20Trouble",
    "names": [
      "Triple Trouble"
    ]
  },
  {
    "page": "Trollage",
    "url": "https://wikiwiki.jp/ton_jp/Trollage",
    "names": [
      "Trollage",
      "Problem?"
    ]
  },
  {
    "page": "Trollge",
    "url": "https://wikiwiki.jp/ton_jp/Trollge",
    "names": [
      "Trollge"
    ]
  },
  {
    "page": "Try Not To Touch Me",
    "url": "https://wikiwiki.jp/ton_jp/Try%20Not%20To%20Touch%20Me",
    "names": [
      "Try Not To Touch Me"
    ]
  },
  {
    "page": "Unbound　CENSORED",
    "url": "https://wikiwiki.jp/ton_jp/Unbound%E3%80%80CENSORED",
    "names": [
      "Unbound　CENSORED",
      "[CENSORED",
      "[CENSORED]"
    ]
  },
  {
    "page": "Unbound Scavengers",
    "url": "https://wikiwiki.jp/ton_jp/Unbound%20Scavengers",
    "names": [
      "Unbound Scavengers",
      "Scavengers"
    ]
  },
  {
    "page": "V2",
    "url": "https://wikiwiki.jp/ton_jp/V2",
    "names": [
      "V2"
    ]
  },
  {
    "page": "Virus",
    "url": "https://wikiwiki.jp/ton_jp/Virus",
    "names": [
      "Virus"
    ]
  },
  {
    "page": "Voidwalker",
    "url": "https://wikiwiki.jp/ton_jp/Voidwalker",
    "names": [
      "Voidwalker"
    ]
  },
  {
    "page": "Waldo",
    "url": "https://wikiwiki.jp/ton_jp/Waldo",
    "names": [
      "Waldo"
    ]
  },
  {
    "page": "Walpurgisnacht",
    "url": "https://wikiwiki.jp/ton_jp/Walpurgisnacht",
    "names": [
      "Walpurgisnacht"
    ]
  },
  {
    "page": "Warden",
    "url": "https://wikiwiki.jp/ton_jp/Warden",
    "names": [
      "Warden"
    ]
  },
  {
    "page": "Wario Apparition",
    "url": "https://wikiwiki.jp/ton_jp/Wario%20Apparition",
    "names": [
      "Wario Apparition"
    ]
  },
  {
    "page": "Waterwraith",
    "url": "https://wikiwiki.jp/ton_jp/Waterwraith",
    "names": [
      "Waterwraith"
    ]
  },
  {
    "page": "WHAT IS MY NAME",
    "url": "https://wikiwiki.jp/ton_jp/WHAT%20IS%20MY%20NAME",
    "names": [
      "WHAT IS MY NAME"
    ]
  },
  {
    "page": "WHITEFACE",
    "url": "https://wikiwiki.jp/ton_jp/WHITEFACE",
    "names": [
      "WHITEFACE"
    ]
  },
  {
    "page": "WhiteNight",
    "url": "https://wikiwiki.jp/ton_jp/WhiteNight",
    "names": [
      "WhiteNight"
    ]
  },
  {
    "page": "Wild Yet Bloodthirsty Creature",
    "url": "https://wikiwiki.jp/ton_jp/Wild%20Yet%20Bloodthirsty%20Creature",
    "names": [
      "Wild Yet Bloodthirsty Creature"
    ]
  },
  {
    "page": "Wild Yet Curious Creature",
    "url": "https://wikiwiki.jp/ton_jp/Wild%20Yet%20Curious%20Creature",
    "names": [
      "Wild Yet Curious Creature"
    ]
  },
  {
    "page": "With Many Voices",
    "url": "https://wikiwiki.jp/ton_jp/With%20Many%20Voices",
    "names": [
      "With Many Voices"
    ]
  },
  {
    "page": "Withered Bonnie",
    "url": "https://wikiwiki.jp/ton_jp/Withered%20Bonnie",
    "names": [
      "Withered Bonnie"
    ]
  },
  {
    "page": "Yolm",
    "url": "https://wikiwiki.jp/ton_jp/Yolm",
    "names": [
      "Yolm"
    ]
  },
  {
    "page": "Your Best Friends",
    "url": "https://wikiwiki.jp/ton_jp/Your%20Best%20Friends",
    "names": [
      "Your Best Friends"
    ]
  },
  {
    "page": "Zombie Apocalypse",
    "url": "https://wikiwiki.jp/ton_jp/Zombie%20Apocalypse",
    "names": [
      "Zombie Apocalypse"
    ]
  },
  {
    "page": "Zumbo Sauce",
    "url": "https://wikiwiki.jp/ton_jp/Zumbo%20Sauce",
    "names": [
      "Zumbo Sauce"
    ]
  },
  {
    "page": "チート対策テラー",
    "url": "https://wikiwiki.jp/ton_jp/%E3%83%81%E3%83%BC%E3%83%88%E5%AF%BE%E7%AD%96%E3%83%86%E3%83%A9%E3%83%BC",
    "names": [
      "チート対策テラー",
      "Beyond Plush"
    ]
  }
];
