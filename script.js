/* ====================================================
   PACKRIP — landing + rip flow
   real Pokémon TCG art via images.pokemontcg.io
   ==================================================== */

// ---------- HELPERS ----------
const $ = (id) => document.getElementById(id);
const $$ = (sel) => document.querySelectorAll(sel);
const rand = (n) => Math.floor(Math.random() * n);
const choice = (arr) => arr[rand(arr.length)];
const fmt = (n) => n.toLocaleString();

const cardImg = (set, num, hires = false) =>
  `https://images.pokemontcg.io/${set}/${num}${hires ? '_hires' : ''}.png`;
const setLogo = (set) => `https://images.pokemontcg.io/${set}/logo.png`;
const setSym  = (set) => `https://images.pokemontcg.io/${set}/symbol.png`;

// ---------- REAL POKÉMON CARDS ----------
// curated by rarity. sets are mostly Scarlet & Violet era (current japanese inventory)
// + a few vintage hits. URLs verified against pokemontcg.io.

const REAL_CARDS = {
  common: [
    { set: 'sv3pt5', num: '1',   name: 'Bulbasaur',  hp: 70,  atk: 'Vine Whip',     dmg: 30 },
    { set: 'sv3pt5', num: '4',   name: 'Charmander', hp: 70,  atk: 'Ember',         dmg: 30 },
    { set: 'sv3pt5', num: '7',   name: 'Squirtle',   hp: 70,  atk: 'Water Gun',     dmg: 30 },
    { set: 'sv3pt5', num: '10',  name: 'Caterpie',   hp: 40,  atk: 'String Shot',   dmg: 10 },
    { set: 'sv3pt5', num: '16',  name: 'Beedrill',   hp: 130, atk: 'Twineedle',     dmg: 60 },
    { set: 'sv3pt5', num: '25',  name: 'Pikachu',    hp: 70,  atk: 'Thunder Shock', dmg: 20 },
    { set: 'sv3pt5', num: '52',  name: 'Meowth',     hp: 60,  atk: 'Pay Day',       dmg: 20 },
    { set: 'sv3pt5', num: '129', name: 'Magikarp',   hp: 30,  atk: 'Splash',        dmg:  0 },
    { set: 'sv3pt5', num: '50',  name: 'Diglett',    hp: 60,  atk: 'Dig',           dmg: 30 },
    { set: 'sv3pt5', num: '63',  name: 'Abra',       hp: 60,  atk: 'Teleport',      dmg: 10 },
  ],
  uncommon: [
    { set: 'sv3pt5', num: '2',   name: 'Ivysaur',    hp: 90,  atk: 'Razor Leaf',    dmg: 50 },
    { set: 'sv3pt5', num: '5',   name: 'Charmeleon', hp: 90,  atk: 'Slash',         dmg: 50 },
    { set: 'sv3pt5', num: '8',   name: 'Wartortle',  hp: 90,  atk: 'Bubble Drain',  dmg: 50 },
    { set: 'sv3pt5', num: '26',  name: 'Raichu',     hp: 110, atk: 'Thunderbolt',   dmg: 80 },
    { set: 'sv3pt5', num: '53',  name: 'Persian',    hp: 90,  atk: 'Slash',         dmg: 60 },
    { set: 'sv3pt5', num: '64',  name: 'Kadabra',    hp: 80,  atk: 'Recover',       dmg: 40 },
  ],
  rare: [
    { set: 'sv3pt5', num: '3',   name: 'Venusaur',   hp: 160, atk: 'Solar Beam',    dmg: 120 },
    { set: 'sv3pt5', num: '6',   name: 'Charizard',  hp: 170, atk: 'Fire Spin',     dmg: 130 },
    { set: 'sv3pt5', num: '9',   name: 'Blastoise',  hp: 170, atk: 'Hydro Pump',    dmg: 120 },
    { set: 'sv3pt5', num: '65',  name: 'Alakazam',   hp: 130, atk: 'Mind Blast',    dmg: 110 },
    { set: 'sv3pt5', num: '68',  name: 'Machamp',    hp: 170, atk: 'Cross Chop',    dmg: 120 },
    { set: 'sv3pt5', num: '94',  name: 'Gengar',     hp: 130, atk: 'Shadow Ball',   dmg: 100 },
  ],
  holo: [
    { set: 'sv3pt5', num: '149', name: 'Dragonite',  hp: 180, atk: 'Hyper Beam',    dmg: 160 },
    { set: 'sv3pt5', num: '150', name: 'Mewtwo',     hp: 130, atk: 'Psyshock',      dmg: 110 },
    { set: 'sv3pt5', num: '151', name: 'Mew',        hp: 70,  atk: 'Psychic',       dmg: 30 },
    { set: 'sv3pt5', num: '143', name: 'Snorlax',    hp: 160, atk: 'Body Slam',     dmg: 130 },
    { set: 'sv4pt5', num: '54',  name: 'Mewtwo ex',  hp: 280, atk: 'Psyburn',       dmg: 200 },
  ],
  ultra: [
    { set: 'sv3pt5', num: '199', name: 'Charizard ex',  hp: 330, atk: 'Burning Darkness', dmg: 180 },
    { set: 'sv3pt5', num: '193', name: 'Mew ex',        hp: 180, atk: 'Genome Hacking',   dmg:  70 },
    { set: 'sv3pt5', num: '187', name: 'Alakazam ex',   hp: 310, atk: 'Mind Jack',        dmg: 160 },
    { set: 'sv4pt5', num: '184', name: 'Charizard ex',  hp: 330, atk: 'Burning Darkness', dmg: 180 },
    { set: 'sv4pt5', num: '173', name: 'Greninja ex',   hp: 290, atk: 'Smokescreen Shuriken', dmg: 130 },
  ],
  secret: [
    { set: 'sv4pt5', num: '233', name: 'Charizard ex SAR', hp: 330, atk: 'Burning Darkness', dmg: 180 },
    { set: 'sv4pt5', num: '244', name: 'Iono SR',          hp: '—', atk: 'Trainer · Supporter', dmg: '—' },
    { set: 'sv3pt5', num: '205', name: 'Squirtle SAR',     hp: 70,  atk: 'Water Gun',         dmg: 30 },
    { set: 'sv3pt5', num: '203', name: 'Bulbasaur SAR',    hp: 70,  atk: 'Vine Whip',         dmg: 30 },
    { set: 'sv4pt5', num: '237', name: 'Mimikyu ex SAR',   hp: 280, atk: 'Sneaking Pain',     dmg: 100 },
  ],
};

const RARITIES = [
  { key: 'common',   label: 'C',    css: 'r-common'   },
  { key: 'uncommon', label: 'U',    css: 'r-uncommon' },
  { key: 'rare',     label: 'R',    css: 'r-rare'     },
  { key: 'holo',     label: 'HOLO', css: 'r-holo'     },
  { key: 'ultra',    label: 'ULTRA',css: 'r-ultra'    },
  { key: 'secret',   label: 'SAR',  css: 'r-secret'   },
];

// ---------- REAL POKÉMON PACKS (PACK WALL) ----------
// real loose-pack market values (sealed booster, mid-range USD).
// burn = marketUSD * BURN_RATE; flat 0.05 SOL fee on every pack.
// vintage WOTC packs are extremely limited (1–4 in stock).
const BURN_RATE = 1000; // $RIP burned per $1 USD market value

const PACKS = [
  // ============ VINTAGE WOTC ERA (1999-2002) ============
  {
    id: 'base1-1ed', logoSet: 'base1', featuredCard: { set: 'base1', num: '4' },
    name: 'Base Set 1st Edition',  nameJp: '初版ベースセット',
    year: '1999', era: 'vintage',  tag: 'WOTC · 1ST ED · BBCE',
    marketUSD: 9500,  stock: 1, accent: '#ff5252',
    pull: { common: 5, uncommon: 3, rare: 3.0, holo: 2.0, ultra: 0.7, secret: 0.2 },
  },
  {
    id: 'base1', logoSet: 'base1', featuredCard: { set: 'base1', num: '4' },
    name: 'Base Set Shadowless',   nameJp: 'ベースセット',
    year: '1999', era: 'vintage',  tag: 'WOTC · SHADOWLESS · BBCE',
    marketUSD: 1200, stock: 2, accent: '#ff8a3b',
    pull: { common: 5, uncommon: 3, rare: 2.6, holo: 1.6, ultra: 0.55, secret: 0.16 },
  },
  {
    id: 'base6', logoSet: 'base6', featuredCard: { set: 'base6', num: '3' },
    name: 'Legendary Collection',  nameJp: 'レジェンダリーコレクション',
    year: '2002', era: 'vintage',  tag: 'WOTC · REVERSE HOLO ERA',
    marketUSD: 625,  stock: 1, accent: '#c46bff',
    pull: { common: 5, uncommon: 3, rare: 2.4, holo: 1.4, ultra: 0.45, secret: 0.13 },
  },
  {
    id: 'neo4', logoSet: 'neo4', featuredCard: { set: 'neo4', num: '4' },
    name: 'Neo Destiny',           nameJp: 'ネオデスティニー',
    year: '2002', era: 'vintage',  tag: 'WOTC · DARK POKÉMON',
    marketUSD: 585,  stock: 1, accent: '#9c5dff',
    pull: { common: 5, uncommon: 3, rare: 2.3, holo: 1.4, ultra: 0.42, secret: 0.12 },
  },
  {
    id: 'neo1', logoSet: 'neo1', featuredCard: { set: 'neo1', num: '9' },
    name: 'Neo Genesis',           nameJp: 'ネオジェネシス',
    year: '2000', era: 'vintage',  tag: 'WOTC · LUGIA · TYPHLOSION',
    marketUSD: 495,  stock: 2, accent: '#7cffcb',
    pull: { common: 5, uncommon: 3, rare: 2.2, holo: 1.3, ultra: 0.4, secret: 0.11 },
  },
  {
    id: 'base5', logoSet: 'base5', featuredCard: { set: 'base5', num: '4' },
    name: 'Team Rocket',           nameJp: 'チームロケット',
    year: '2000', era: 'vintage',  tag: 'WOTC · DARK CHARIZARD ERA',
    marketUSD: 410,  stock: 3, accent: '#ff5fa2',
    pull: { common: 5, uncommon: 3, rare: 2.1, holo: 1.2, ultra: 0.35, secret: 0.10 },
  },
  {
    id: 'base2', logoSet: 'base2', featuredCard: { set: 'base2', num: '4' },
    name: 'Jungle 1st Edition',    nameJp: 'ジャングル',
    year: '1999', era: 'vintage',  tag: 'WOTC · 1ST ED',
    marketUSD: 385,  stock: 4, accent: '#4ee06a',
    pull: { common: 5, uncommon: 3, rare: 2.0, holo: 1.1, ultra: 0.32, secret: 0.09 },
  },
  {
    id: 'base3', logoSet: 'base3', featuredCard: { set: 'base3', num: '1' },
    name: 'Fossil Unlimited',      nameJp: '化石',
    year: '1999', era: 'vintage',  tag: 'WOTC · AERODACTYL ERA',
    marketUSD: 295,  stock: 4, accent: '#b08858',
    pull: { common: 5, uncommon: 3, rare: 1.9, holo: 1.0, ultra: 0.28, secret: 0.08 },
  },

  // ============ BOUTIQUE / SPECIAL (2019-2021) ============
  {
    id: 'sm115', logoSet: 'sm115', featuredCard: { set: 'sm115', num: '9' },
    name: 'Hidden Fates',          nameJp: 'ハイドゥンフェイト',
    year: '2019', era: 'boutique', tag: 'SHINY VAULT · LIMITED REPRINT',
    marketUSD: 45,   stock: 8, accent: '#2bd4ff',
    pull: { common: 4, uncommon: 3, rare: 2.0, holo: 0.9, ultra: 0.30, secret: 0.09 },
  },
  {
    id: 'swsh35', logoSet: 'swsh35', featuredCard: { set: 'swsh35', num: '74' },
    name: "Champion's Path",       nameJp: 'チャンピオンズパス',
    year: '2020', era: 'boutique', tag: 'CHARIZARD VMAX · UK EXCLUSIVE',
    marketUSD: 50,   stock: 6, accent: '#ffd35a',
    pull: { common: 4, uncommon: 3, rare: 1.9, holo: 0.85, ultra: 0.28, secret: 0.08 },
  },

  // ============ CURRENT HOT (2023-2025) ============
  {
    id: 'sv8pt5', logoSet: 'sv8pt5', featuredCard: { set: 'sv8pt5', num: '156' },
    name: 'Prismatic Evolutions',  nameJp: 'プリズマティックエボリューション',
    year: '2025', era: 'modern',   tag: 'EEVEE EX · HOT',
    marketUSD: 25,   stock: 12, accent: '#ff5fa2',
    pull: { common: 4, uncommon: 3, rare: 1.8, holo: 0.8, ultra: 0.25, secret: 0.08 },
  },
  {
    id: 'sv3pt5', logoSet: 'sv3pt5', featuredCard: { set: 'sv3pt5', num: '199' },
    name: 'Pokémon 151',           nameJp: 'ポケモンカード151',
    year: '2023', era: 'modern',   tag: 'JAPAN · KANTO 151',
    marketUSD: 10,   stock: 47, accent: '#ff5252',
    pull: { common: 5, uncommon: 3, rare: 1.5, holo: 0.55, ultra: 0.15, secret: 0.04 },
  },
  {
    id: 'sv4pt5', logoSet: 'sv4pt5', featuredCard: { set: 'sv4pt5', num: '233' },
    name: 'Paldean Fates',         nameJp: 'シャイニートレジャーex',
    year: '2024', era: 'modern',   tag: 'JAPAN · SHINY EX',
    marketUSD: 7,    stock: 23, accent: '#ffd35a',
    pull: { common: 4, uncommon: 3, rare: 1.6, holo: 0.7, ultra: 0.22, secret: 0.06 },
  },
  {
    id: 'sv6pt5', logoSet: 'sv6pt5', featuredCard: { set: 'sv6pt5', num: '24' },
    name: 'Shrouded Fable',        nameJp: 'ナイトワンダラー',
    year: '2024', era: 'modern',   tag: 'JAPAN · PECHARUNT',
    marketUSD: 8,    stock: 31, accent: '#c46bff',
    pull: { common: 5, uncommon: 3, rare: 1.5, holo: 0.55, ultra: 0.15, secret: 0.04 },
  },
  {
    id: 'sv7', logoSet: 'sv7', featuredCard: { set: 'sv7', num: '128' },
    name: 'Stellar Crown',         nameJp: 'ステラミラクル',
    year: '2024', era: 'modern',   tag: 'JAPAN · TERAPAGOS',
    marketUSD: 5,    stock: 19, accent: '#7cffcb',
    pull: { common: 5, uncommon: 3, rare: 1.5, holo: 0.55, ultra: 0.15, secret: 0.04 },
  },
  {
    id: 'sv8', logoSet: 'sv8', featuredCard: { set: 'sv8', num: '238' },
    name: 'Surging Sparks',        nameJp: 'バトルパートナーズ',
    year: '2024', era: 'modern',   tag: 'JAPAN · PIKACHU EX',
    marketUSD: 6,    stock: 58, accent: '#ffe14a',
    pull: { common: 5, uncommon: 3, rare: 1.5, holo: 0.6, ultra: 0.18, secret: 0.05 },
  },

  // ============ MYSTERY RIP — unknown contents, pack art is hidden ============
  {
    id: 'mystery', logoSet: null, featuredCard: { set: 'sv3pt5', num: '199' },
    name: 'Mystery RIP',           nameJp: '???',
    year: '????', era: 'mystery',  tag: '??? · CONTENTS UNKNOWN',
    marketUSD: 33,   stock: 99, accent: '#9c5dff',
    mystery: true,
    /* generous pull weights — anything from common to secret rare */
    pull: { common: 4, uncommon: 3, rare: 2.0, holo: 1.0, ultra: 0.4, secret: 0.15 },
  },
];

// derive burn from market price + attach the user-provided pack photo path.
// Also derive a SOL "all-in" price from market USD using a mock $200/SOL conversion —
// users can either burn $RIP+0.05 SOL OR pay full SOL.
const SOL_USD = 200;
const PACK_IMG_EXT = {
  'base1-1ed': 'jpg', 'base1': 'jpg', 'base2': 'jpg', 'base3': 'jpg',
  'base5': 'jpg', 'base6': 'jpg',
  'neo1': 'webp', 'neo4': 'webp',
  'sm115': 'jpg', 'swsh35': 'avif',
  'sv3pt5': 'jpg', 'sv4pt5': 'webp', 'sv6pt5': 'webp',
  'sv7': 'jpg', 'sv8': 'webp', 'sv8pt5': 'jpg',
};
PACKS.forEach(p => {
  p.burn = p.marketUSD * BURN_RATE;
  p.sol  = 0.05; // small SOL fee when paying with $RIP
  // total SOL price if user opts to pay all-in SOL (1.05x market for shop margin)
  p.solAllIn = +(p.marketUSD * 1.05 / SOL_USD).toFixed(3);
  const ext = PACK_IMG_EXT[p.id];
  if (ext) p.packImg = `img/pack-${p.id}.${ext}`;
});

// ---------- HERO CARDS (12 real cards w/ stock-left badges) ----------
const HERO_CARDS = [
  // featured ex / hits
  { set: 'sv3pt5', num: '199',  name: 'Charizard ex'      },
  { set: 'sv4pt5', num: '233',  name: 'Charizard SAR'     },
  { set: 'base1',  num: '4',    name: 'Charizard 1999'    },
  { set: 'sv3pt5', num: '151',  name: 'Mew'               },
  { set: 'sv3pt5', num: '193',  name: 'Mew ex'            },
  { set: 'sv4pt5', num: '184',  name: 'Charizard ex'      },
  { set: 'sv3pt5', num: '187',  name: 'Alakazam ex'       },
  { set: 'sv3pt5', num: '150',  name: 'Mewtwo'            },
  { set: 'sv3pt5', num: '25',   name: 'Pikachu'           },
  { set: 'sv3pt5', num: '143',  name: 'Snorlax'           },
  { set: 'sv3pt5', num: '6',    name: 'Charizard'         },
  { set: 'sv4pt5', num: '237',  name: 'Mimikyu ex SAR'    },
  // expanded back-layer cards (32 total)
  { set: 'sv3pt5', num: '1',    name: 'Bulbasaur'         },
  { set: 'sv3pt5', num: '4',    name: 'Charmander'        },
  { set: 'sv3pt5', num: '7',    name: 'Squirtle'          },
  { set: 'sv3pt5', num: '9',    name: 'Blastoise'         },
  { set: 'sv3pt5', num: '3',    name: 'Venusaur'          },
  { set: 'sv3pt5', num: '5',    name: 'Charmeleon'        },
  { set: 'sv3pt5', num: '8',    name: 'Wartortle'         },
  { set: 'sv3pt5', num: '149',  name: 'Dragonite'         },
  { set: 'sv3pt5', num: '94',   name: 'Gengar'            },
  { set: 'sv3pt5', num: '68',   name: 'Machamp'           },
  { set: 'sv3pt5', num: '65',   name: 'Alakazam'          },
  { set: 'sv3pt5', num: '52',   name: 'Meowth'            },
  { set: 'sv3pt5', num: '129',  name: 'Magikarp'          },
  { set: 'sv3pt5', num: '50',   name: 'Diglett'           },
  { set: 'sv3pt5', num: '63',   name: 'Abra'              },
  { set: 'sv3pt5', num: '16',   name: 'Beedrill'          },
  { set: 'sv3pt5', num: '26',   name: 'Raichu'            },
  { set: 'sv3pt5', num: '53',   name: 'Persian'           },
  { set: 'sv3pt5', num: '64',   name: 'Kadabra'           },
  { set: 'sv4pt5', num: '54',   name: 'Mewtwo ex'         },
  { set: 'sv4pt5', num: '173',  name: 'Greninja ex'       },
];

const ATTACKS_FALLBACK = [
  { name: 'Tackle', dmg: 20 },
  { name: 'Quick Attack', dmg: 30 },
];

const HYPE_LINES = {
  common:   ['nothing crazy.', 'mid pull, ngl.', 'standard fare.', 'we keep it moving.'],
  uncommon: ['decent.', 'not bad, trainer.', "i'll take it.", 'pocket that one.'],
  rare:     ['ooh shiny!', 'rare pull spotted.', "ok that's legit.", 'cooking up something.'],
  holo:     ['HOLO LETS GOOO', 'shiny!! shiny!!', 'we eating tonight.', 'the foil is foiling.'],
  ultra:    ['ULTRA RARE!!', 'you cracked it open.', 'this is THE pull.', 'screaming.'],
  secret:   ['SECRET RARE??!?', 'pack is COOKED.', 'unreal pull. unreal.', 'screenshot this.'],
};

// rip queue / hit board mock data
const HANDLES = [
  '@cypherchad', '@osakaholic', '@mintkid_77', '@pulled_a_zard', '@sealed_in_jp',
  '@ripper_ape', '@vault_or_ship', '@jpn_tcg_only', '@no_cap_holos', '@kyoto_collector',
  '@psa10_or_die', '@graded_pls', '@snorlax_szn', '@brainrot_pulls', '@team_eevee',
  '@sigma_ripper', '@pichu_papi', '@gym_leader_kev', '@tokyo_packs', '@wantmydopa',
];

const HIT_PULLS = [
  { handle: '@pulled_a_zard',  card: REAL_CARDS.secret[0], pack: 'Paldean Fates',  value: '$1,840', when: '14m ago' },
  { handle: '@osakaholic',     card: REAL_CARDS.ultra[0],  pack: 'Pokémon 151',    value: '$420',   when: '38m ago' },
  { handle: '@psa10_or_die',   card: REAL_CARDS.secret[4], pack: 'Paldean Fates',  value: '$310',   when: '1h ago'  },
  { handle: '@sealed_in_jp',   card: REAL_CARDS.ultra[3],  pack: 'Paldean Fates',  value: '$285',   when: '2h ago'  },
  { handle: '@ripper_ape',     card: REAL_CARDS.holo[2],   pack: 'Pokémon 151',    value: '$95',    when: '3h ago'  },
  { handle: '@kyoto_collector',card: REAL_CARDS.secret[3], pack: 'Pokémon 151',    value: '$240',   when: '4h ago'  },
];

const QUEUE_PACKS = ['Pokémon 151', 'Paldean Fates', 'Surging Sparks', 'Shrouded Fable', 'Stellar Crown'];

const PACK_SIZE = 5;

// ---------- STATE (wallet-keyed inventory) ----------
// each wallet has its own localStorage record under packrip_inv_<addr>.
// before a wallet is connected, we use packrip_inv_GUEST as the default bucket.
// when a wallet connects, we load that wallet's inventory; on disconnect we revert to GUEST.

const GLOBAL_KEY = 'packrip_global'; // wallet address only — not per-wallet inventory
const invKey = (addr) => 'packrip_inv_' + (addr || 'GUEST');

const state = {
  // per-wallet inventory
  coins: 9999,
  selectedPackId: null,
  pulled: [],
  revealIdx: 0,
  collection: [],   // cards the user has opened + kept (was: roster)
  packs: [],        // unopened packs the user owns
  listings: [],     // items the user has listed for sale on the (coming soon) marketplace
  watchlist: [],    // card keys (set+num) the user is tracking in Card Intelligence
  freeUsed: false,  // one-time free-rip flag (per wallet)
  // global (shared across wallets)
  wallet: null,
};

function loadInventory(addr) {
  try {
    const saved = JSON.parse(localStorage.getItem(invKey(addr)) || '{}');
    state.coins      = saved.coins      != null ? saved.coins : 9999;
    state.collection = Array.isArray(saved.collection) ? saved.collection
                       : Array.isArray(saved.roster)   ? saved.roster /* legacy */
                       : [];
    state.packs      = Array.isArray(saved.packs)    ? saved.packs    : [];
    state.listings   = Array.isArray(saved.listings) ? saved.listings : [];
    state.watchlist  = Array.isArray(saved.watchlist) ? saved.watchlist : [];
    state.freeUsed   = !!saved.freeUsed;
  } catch (e) {
    state.coins = 9999; state.collection = []; state.packs = []; state.listings = []; state.watchlist = []; state.freeUsed = false;
  }
}

function saveInventory() {
  try {
    localStorage.setItem(invKey(state.wallet), JSON.stringify({
      coins: state.coins,
      collection: state.collection,
      packs: state.packs,
      listings: state.listings,
      watchlist: state.watchlist,
      freeUsed: state.freeUsed,
    }));
  } catch (e) {}
}

function loadGlobal() {
  try {
    const g = JSON.parse(localStorage.getItem(GLOBAL_KEY) || '{}');
    state.wallet = g.wallet || null;
  } catch (e) { state.wallet = null; }
}

function saveGlobal() {
  try {
    localStorage.setItem(GLOBAL_KEY, JSON.stringify({ wallet: state.wallet }));
  } catch (e) {}
}

// migrate the old single-key state ("packrip_state") into the new wallet-keyed model
(function migrateLegacy() {
  try {
    const legacy = JSON.parse(localStorage.getItem('packrip_state') || 'null');
    if (legacy) {
      const addr = legacy.wallet || null;
      const targetKey = invKey(addr);
      if (!localStorage.getItem(targetKey)) {
        localStorage.setItem(targetKey, JSON.stringify({
          coins: legacy.coins,
          collection: legacy.roster || [],
          packs: [],
          listings: [],
          freeUsed: !!legacy.freeUsed,
        }));
      }
      if (addr && !localStorage.getItem(GLOBAL_KEY)) {
        localStorage.setItem(GLOBAL_KEY, JSON.stringify({ wallet: addr }));
      }
      localStorage.removeItem('packrip_state');
    }
  } catch (e) {}
})();

loadGlobal();
loadInventory(state.wallet);

// keep a back-compat alias so older render code that reads state.roster still works
Object.defineProperty(state, 'roster', {
  get() { return state.collection; },
  set(v) { state.collection = v; },
});

const save = saveInventory; // alias used throughout the rest of the file

// ---------- DRAW ----------
function weighted(weights) {
  const total = Object.values(weights).reduce((a, b) => a + b, 0);
  let roll = Math.random() * total;
  for (const [k, w] of Object.entries(weights)) {
    roll -= w;
    if (roll <= 0) return k;
  }
  return Object.keys(weights)[0];
}

function rollCard(pullWeights) {
  const rarityKey = weighted(pullWeights);
  const rarity = RARITIES.find(r => r.key === rarityKey);
  const pool = REAL_CARDS[rarityKey] || REAL_CARDS.common;
  const card = choice(pool);
  return {
    id: Math.random().toString(36).slice(2, 9),
    set: card.set,
    num: card.num,
    name: card.name,
    hp: card.hp,
    attack: { name: card.atk, dmg: card.dmg },
    rarity,
    img: cardImg(card.set, card.num, true),
    imgFallback: cardImg(card.set, card.num, false),
  };
}

function rollPack(pack) {
  const cards = [];
  for (let i = 0; i < PACK_SIZE - 1; i++) {
    const slot = { common: pack.pull.common, uncommon: pack.pull.uncommon };
    cards.push(rollCard(slot));
  }
  const hit = { rare: pack.pull.rare, holo: pack.pull.holo, ultra: pack.pull.ultra, secret: pack.pull.secret };
  cards.push(rollCard(hit));
  return cards;
}

// ---------- LANDING: PACK WALL ----------
function fmtUSD(n) {
  return '$' + n.toLocaleString('en-US', { minimumFractionDigits: 0 });
}

function renderRealPackGrid(filter = 'all') {
  const grid = $('realPackGrid');
  grid.innerHTML = '';
  const filtered = PACKS.filter(p => {
    if (filter === 'all') return true;
    if (filter === 'vintage')  return p.era === 'vintage';
    if (filter === 'boutique') return p.era === 'boutique';
    if (filter === 'modern')   return p.era === 'modern';
    if (filter === 'japan')    return /JAPAN/.test(p.tag);
    if (filter === 'mystery')  return p.era === 'mystery';
    return true;
  });

  filtered.forEach((p) => {
    const stockClass = p.stock <= 3 ? 'low' : p.stock < 15 ? 'mid' : 'high';
    const isLastOne  = p.stock === 1;
    const isMystery  = !!p.mystery;
    const eraLabel   = isMystery ? '???' :
                       p.era === 'vintage' ? 'OG' :
                       p.era === 'boutique' ? 'BOUTIQUE' : 'MODERN';

    const el = document.createElement('div');
    el.className = 'real-pack era-' + p.era + (isLastOne ? ' last-one' : '') + (isMystery ? ' is-mystery' : '');
    el.style.setProperty('--accent', p.accent);

    const artHTML = isMystery
      ? `<div class="rp-art">
           <div class="rp-mystery-art">
             <div class="rp-q">?</div>
             <div class="rp-mystery-label">MYSTERY · RIP</div>
             <div class="rp-mystery-sub">CONTENTS UNKNOWN</div>
           </div>
           <div class="rp-photo-shine"></div>
           <div class="rp-year">????</div>
         </div>`
      : `<div class="rp-art">
           <img class="rp-photo" src="${p.packImg}" alt="${p.name} sealed booster pack" loading="lazy" />
           <div class="rp-photo-shine"></div>
           <div class="rp-year">${p.year}</div>
         </div>`;

    el.innerHTML = `
      <div class="rp-era-tag">${eraLabel}</div>
      ${isLastOne ? '<div class="rp-fire">LAST ONE</div>' : ''}
      ${artHTML}
      <div class="rp-meta">
        <div class="rp-name">${p.name}</div>
        <div class="rp-jp">${p.nameJp}</div>
        <div class="rp-tag">${p.tag}</div>
        <div class="rp-stock stock-${stockClass}">
          <span class="dot"></span> ${isMystery ? '???' : p.stock + ' sealed in stock'}
        </div>
        <div class="rp-pricebox">
          ${isMystery ? '' : `
          <div class="rp-row rp-market">
            <span class="rp-row-label">MARKET</span>
            <span class="rp-row-val">${fmtUSD(p.marketUSD)}<small> USD</small></span>
          </div>`}
          <div class="rp-row rp-burn-row">
            <span class="rp-row-label">BURN</span>
            <span class="rp-row-val">${fmt(p.burn)}<small> $RIP</small></span>
          </div>
          <div class="rp-row rp-sol-row">
            <span class="rp-row-label">+ FEE</span>
            <span class="rp-row-val">${p.sol.toFixed(2)}<small> SOL</small></span>
          </div>
          <div class="rp-divider"><span>OR</span></div>
          <div class="rp-row rp-solpay-row">
            <span class="rp-row-label"><img class="sol-icon-inline" src="img/solana-sol-logo.png" alt="" />SOL ALL-IN</span>
            <span class="rp-row-val">${p.solAllIn.toFixed(3)}<small> SOL</small></span>
          </div>
        </div>
        <div class="rp-btn-row">
          <button class="pixel-btn primary rp-btn rp-btn-rip" data-pack-id="${p.id}" data-pay="rip">
            <img class="rip-icon" src="img/logo.png" alt="" />
            RIP w/ $RIP
          </button>
          <button class="pixel-btn ghost rp-btn rp-btn-sol" data-pack-id="${p.id}" data-pay="sol">
            <img class="sol-icon" src="img/solana-sol-logo.png" alt="" />
            RIP w/ SOL
          </button>
        </div>
      </div>
    `;
    grid.appendChild(el);
  });

  // wire RIP buttons (both $RIP and SOL paths flow into the same simulator;
  // the chosen payment is recorded so the summary can show it)
  grid.querySelectorAll('[data-pack-id]').forEach(btn => {
    btn.addEventListener('click', () => {
      const pid    = btn.dataset.packId;
      const payWith = btn.dataset.pay; // 'rip' | 'sol'
      const pack = PACKS.find(p => p.id === pid);
      if (!pack) return;
      // free rip doesn't apply to a mystery pack flow with paid intent — but for sim
      // purposes we still gate the FIRST rip on freeUsed unless the user has earned packs.
      // Once their freeUsed is consumed, subsequent attempts open with a paid-flow toast.
      if (state.freeUsed && state.packs.length === 0) {
        showFreeUsedToast(pack, payWith);
        return;
      }
      state.selectedPackId = pid;
      state.lastPayWith = payWith;
      openRipModal();
      setupRipScreen(pack);
      showScreen('rip');
    });
  });
}

// ---------- HERO CARDS (12 floating real cards w/ stock badges) ----------
function renderHeroCards() {
  const wrap = $('heroCards');
  if (!wrap) return;
  wrap.innerHTML = '';

  // Deterministic PRNG so the random scatter stays put across reloads
  const rngFor = (i, salt = 1) => ((i * 9301 + salt * 49297 + 11) % 233280) / 233280;

  // Start from a 6x6 grid (skip center 2x2 where hero text lives)
  // then apply HEAVY per-card jitter so the result reads as random scatter, not a grid.
  const cols = 6, rows = 6;
  const positions = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (r >= 2 && r <= 3 && c >= 2 && c <= 3) continue;
      positions.push({ r, c });
    }
  }

  HERO_CARDS.slice(0, positions.length).forEach((card, i) => {
    const { r, c } = positions[i];

    // Base position from grid (cards spread across 0% → 100% of hero)
    const baseTop  = (r / (rows - 1)) * 100;
    const baseLeft = (c / (cols - 1)) * 100;

    // HEAVY jitter — ±12% offset breaks the grid completely
    const offY = (rngFor(i, 7)  - 0.5) * 24; // ±12%
    const offX = (rngFor(i, 11) - 0.5) * 24;
    let top  = baseTop + offY;
    let left = baseLeft + offX;

    // Bigger rotation range — ±32deg for a tossed/scattered feel
    const rot = (rngFor(i, 13) - 0.5) * 64;

    // Random size: 130–200px (was 72–88px, much larger now)
    const sizePx = Math.round(130 + rngFor(i, 19) * 70);

    // Opacity varies more for organic depth
    const distFromCenter = Math.max(Math.abs(c - 2.5), Math.abs(r - 2.5));
    const isFar  = distFromCenter > 2.0;
    const isMid  = distFromCenter > 1.4;
    const baseOp = isFar ? 0.7 : isMid ? 0.5 : 0.35;
    const opJitter = (rngFor(i, 23) - 0.5) * 0.18;
    const opacity = Math.max(0.25, Math.min(0.85, baseOp + opJitter));

    const delay = +(rngFor(i, 17) * 4.5).toFixed(2);

    const div = document.createElement('div');
    div.className = 'hc';
    div.style.cssText = `
      top:  ${top}%;
      left: ${left}%;
      width: ${sizePx}px;
      transform: translate(-50%, -50%) rotate(${rot}deg);
      animation-delay: ${delay}s;
      opacity: ${opacity};
      z-index: ${Math.round(rngFor(i, 31) * 5)};
    `;
    div.innerHTML = `
      <img src="${cardImg(card.set, card.num, false)}"
           alt="${card.name}" loading="${i < 8 ? 'eager' : 'lazy'}" />
    `;
    wrap.appendChild(div);
  });
}

// ---------- LANDING: QUEUE ----------
function renderQueue() {
  const list = $('queueList');
  list.innerHTML = '';
  for (let i = 0; i < 6; i++) {
    const handle = HANDLES[(i * 3) % HANDLES.length];
    const pack = QUEUE_PACKS[i % QUEUE_PACKS.length];
    const eta = `${i + 1}m`;
    const li = document.createElement('li');
    li.innerHTML = `
      <span class="q-num">${(i + 1).toString().padStart(2, '0')}</span>
      <span class="q-handle">${handle}</span>
      <span class="q-pack">${pack}</span>
      <span class="q-eta">~${eta}</span>
    `;
    list.appendChild(li);
  }
}

// ---------- LANDING: TICKER ----------
function renderTicker() {
  const track = $('tickerTrack');
  const lines = [];
  for (let i = 0; i < 12; i++) {
    const handle = HANDLES[i % HANDLES.length];
    const pack = QUEUE_PACKS[i % QUEUE_PACKS.length];
    const burn = (8 + (i * 2.7) % 18).toFixed(0) + 'K';
    lines.push(`<span class="tick-item"><b>${handle}</b> ripped <b>${pack}</b> · burned <b>${burn} $RIP</b></span>`);
  }
  // duplicate for seamless scroll
  track.innerHTML = lines.join('') + lines.join('');
}

// ---------- LANDING: MARKETPLACE (coming soon) ----------
// Seed mock listings so the grid never looks empty; the user's own listings
// (state.listings) are merged in on top so their items show up after they list.
const SEED_LISTINGS = [
  { handle: '@pulled_a_zard',  card: REAL_CARDS.secret[0], askUSD: 1840, when: '14m ago' },
  { handle: '@osakaholic',     card: REAL_CARDS.ultra[0],  askUSD: 420,  when: '38m ago' },
  { handle: '@psa10_or_die',   card: REAL_CARDS.secret[4], askUSD: 310,  when: '1h ago'  },
  { handle: '@sealed_in_jp',   card: REAL_CARDS.ultra[3],  askUSD: 285,  when: '2h ago'  },
  { handle: '@ripper_ape',     card: REAL_CARDS.holo[2],   askUSD: 95,   when: '3h ago'  },
  { handle: '@kyoto_collector',card: REAL_CARDS.secret[3], askUSD: 240,  when: '4h ago'  },
];

function renderMarketplace() {
  const list = $('marketplaceList');
  if (!list) return;
  list.innerHTML = '';

  // user's own listings (newest first), then seed
  const userItems = state.listings.map(l => ({
    handle: 'YOU',
    card: l.card,
    askUSD: l.askUSD,
    when: 'just now',
    own: true,
  }));
  const all = [...userItems, ...SEED_LISTINGS.map(l => ({ ...l, own: false }))];

  all.forEach((item, i) => {
    const card = item.card;
    const row = document.createElement('div');
    row.className = 'hit-row marketplace-row' + (item.own ? ' own-listing' : '');
    const rarityCss = (card.rarity && card.rarity.css) || 'r-ultra';
    const rarityLabel = (card.rarity && card.rarity.label) || 'ULTRA';
    row.innerHTML = `
      <div class="hit-rank">${item.own ? 'YOU' : '#' + (i + 1)}</div>
      <div class="hit-img">
        <img src="${cardImg(card.set, card.num, true)}"
             onerror="this.onerror=null;this.src='${cardImg(card.set, card.num, false)}'"
             alt="${card.name}" loading="lazy" />
      </div>
      <div class="hit-meta">
        <div class="hit-name">${card.name}</div>
        <div class="hit-pack">listed by <b>${item.handle}</b> · ${item.when}</div>
      </div>
      <div class="hit-value">
        <div class="hit-val">$${item.askUSD.toLocaleString()}</div>
        <button class="pixel-btn ghost hit-clip" disabled>BID · soon</button>
      </div>
    `;
    list.appendChild(row);
  });
}

// ---------- LANDING: HIT BOARD ----------
function renderHitBoard() {
  const list = $('hitList');
  list.innerHTML = '';
  HIT_PULLS.forEach((hit, i) => {
    const row = document.createElement('div');
    row.className = `hit-row r-${hit.card.rarity ? hit.card.rarity.key : 'ultra'}`;
    const rarityKey = (hit.card.rarity && hit.card.rarity.key) || 'ultra';
    const rarityCss = (hit.card.rarity && hit.card.rarity.css) || 'r-ultra';
    const rarityLabel = (hit.card.rarity && hit.card.rarity.label) || 'ULTRA';
    // hit.card was a REAL_CARDS entry that doesn't have .rarity; rebuild
    const card = hit.card;
    row.innerHTML = `
      <div class="hit-rank">#${i + 1}</div>
      <div class="hit-img">
        <img src="${cardImg(card.set, card.num, true)}" alt="${card.name}" loading="lazy" />
      </div>
      <div class="hit-meta">
        <div class="hit-name">${card.name}</div>
        <div class="hit-pack">${hit.pack} · pulled by <b>${hit.handle}</b></div>
        <div class="hit-when">${hit.when}</div>
      </div>
      <div class="hit-value">
        <div class="hit-val">${hit.value}</div>
        <button class="pixel-btn ghost hit-clip">clip</button>
      </div>
    `;
    list.appendChild(row);
  });
}

// ---------- MODAL ----------
function openRipModal() {
  $('ripModal').classList.add('open');
  document.body.classList.add('modal-open');
  document.documentElement.classList.add('modal-open');
  // default to pack select unless caller switches screen after
  showScreen('select');
  renderModalPackGrid();
}

function openRosterOnly() {
  $('ripModal').classList.add('open');
  document.body.classList.add('modal-open');
  document.documentElement.classList.add('modal-open');
  showScreen('roster');
  renderRoster();
}

function closeRipModal() {
  $('ripModal').classList.remove('open');
  document.body.classList.remove('modal-open');
  document.documentElement.classList.remove('modal-open');
}

// gate: one free rip per browser (localStorage)
function tryOpenRip() {
  if (state.freeUsed) {
    showFreeUsedToast();
    return;
  }
  openRipModal();
}

document.addEventListener('click', (e) => {
  if (e.target.closest('[data-open-rip]')) {
    e.preventDefault();
    tryOpenRip();
  }
});

// ---------- FREE-USED TOAST ----------
// Now offers a paid path: pay with SOL or burn $RIP to rip another pack,
// instead of fully blocking. Also offers to view your collection/listings.
function showFreeUsedToast(pack, payWith) {
  let t = document.getElementById('freeToast');
  if (!t) {
    t = document.createElement('div');
    t.id = 'freeToast';
    t.className = 'free-toast';
    document.body.appendChild(t);
  }
  const hasCollection = state.collection.length > 0;
  const packName = pack ? pack.name : null;
  const solPrice = pack ? pack.solAllIn.toFixed(3) : null;
  const ripPrice = pack ? fmt(pack.burn) : null;
  t.innerHTML = `
    <div class="ft-card">
      <div class="ft-x" id="ftClose">×</div>
      <div class="ft-icon"><svg viewBox=\"0 0 24 24\" width=\"42\" height=\"42\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><circle cx=\"12\" cy=\"12\" r=\"9\"/><path d=\"M9 12h6M12 9v6\"/></svg></div>
      <h3>FREE RIP USED</h3>
      <p>your one free sim is consumed. to rip another, pay with <b>$RIP</b> or <b>SOL</b>.</p>
      ${pack ? `
        <p class="ft-pack-line">selected: <b>${packName}</b> · ${ripPrice} $RIP <small>or</small> <img class="sol-icon-inline" src="img/solana-sol-logo.png" alt="" />${solPrice} SOL</p>
      ` : '<p class="ft-soon">token launching on <b>pump.fun</b> soon</p>'}
      <div class="ft-actions">
        ${pack ? `
          <button class="pixel-btn primary" id="ftPaySol">PAY ${solPrice} SOL</button>
          <a class="pixel-btn ghost" href="https://pump.fun" target="_blank" rel="noopener">BUY $RIP</a>
        ` : `
          <a class="pixel-btn primary" href="https://pump.fun" target="_blank" rel="noopener">Buy $RIP</a>
        `}
        ${hasCollection ? '<button class="pixel-btn ghost" id="ftRoster">view collection</button>' : ''}
        ${state.wallet ? '' : '<button class="pixel-btn ghost" id="ftWallet">connect wallet</button>'}
      </div>
    </div>
  `;
  t.classList.add('show');
  document.getElementById('ftClose').addEventListener('click', () => t.classList.remove('show'));
  if (hasCollection) {
    document.getElementById('ftRoster').addEventListener('click', () => {
      t.classList.remove('show');
      openRosterOnly();
    });
  }
  const wbtn = document.getElementById('ftWallet');
  if (wbtn) wbtn.addEventListener('click', () => { t.classList.remove('show'); connectWallet(); });
  const sbtn = document.getElementById('ftPaySol');
  if (sbtn) sbtn.addEventListener('click', () => {
    t.classList.remove('show');
    // Mock SOL payment — adds the pack to user's owned-packs inventory and immediately rips it
    state.packs.push({ packId: pack.id, paidWith: 'sol', solPaid: pack.solAllIn, ts: Date.now() });
    saveInventory();
    state.selectedPackId = pack.id;
    state.lastPayWith = 'sol';
    openRipModal();
    setupRipScreen(pack);
    showScreen('rip');
    // freeUsed gate is bypassed because they paid
  });
}

$('modalClose').addEventListener('click', closeRipModal);
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && $('ripModal').classList.contains('open')) closeRipModal();
});

// ---------- MODAL: SCREEN NAV ----------
function showScreen(id) {
  $$('#ripModal .screen').forEach(s => s.classList.remove('active'));
  $('screen-' + id).classList.add('active');
}

document.addEventListener('click', (e) => {
  const t = e.target.closest('[data-go]');
  if (t) {
    showScreen(t.dataset.go);
    if (t.dataset.go === 'select') renderModalPackGrid();
    if (t.dataset.go === 'roster') renderRoster();
  }
});

// ---------- MODAL: PACK SELECT (sim) ----------
function renderModalPackGrid() {
  $('coinCount').textContent = fmt(state.coins);
  const grid = $('packGrid');
  grid.innerHTML = '';
  // free-sim picks: only modern + boutique (the vintage are aspirational, post-launch)
  const SIM_IDS = ['sv3pt5', 'sv4pt5', 'sv8pt5', 'sv6pt5', 'sm115', 'sv8'];
  const simPacks = SIM_IDS.map(id => PACKS.find(p => p.id === id)).filter(Boolean);
  simPacks.forEach((p) => {
    const el = document.createElement('div');
    el.className = `pack-card`;
    el.style.setProperty('--accent', p.accent);
    // Use the REAL product photo (img/pack-<id>.<ext>) — same one used on the Pack Wall
    el.innerHTML = `
      <div class="pack-art-photo">
        <img src="${p.packImg}" alt="${p.name}" loading="lazy" />
      </div>
      <div class="pack-card-info">
        <div class="pack-name">${p.name}</div>
        <div class="pack-tag">${p.tag}</div>
      </div>
      <div class="pack-cost">Free Sim · ${fmtUSD(p.marketUSD)} IRL</div>
    `;
    el.addEventListener('click', () => selectPack(p.id));
    grid.appendChild(el);
  });
}

function selectPack(id) {
  // sim is free, no coin check
  state.selectedPackId = id;
  const pack = PACKS.find(p => p.id === id);
  setupRipScreen(pack);
  showScreen('rip');
}

// ---------- RIP ----------
let ripClicks = 0;
let ripTorn = false;

// ====== GACHA RIP SEQUENCE (Power Packs-style — replaces 3-tap mash) ======

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

function setupRipScreen(pack) {
  // Reset all gacha-screen visuals before kicking off a new sequence
  const machine  = document.getElementById('gachaMachine');
  const holo     = document.getElementById('gmHolo');
  const burst    = document.getElementById('particleBurst');
  const beams    = document.getElementById('lightBeams');
  const flash    = document.getElementById('gachaFlash');
  const cone     = document.getElementById('spotCone');
  const callout  = document.getElementById('rarityCallout');
  const spot     = document.getElementById('cardSpotlight');
  const panel    = document.getElementById('buybackPanel');
  const skip     = document.getElementById('gachaSkip');

  if (machine) machine.style.display = '';
  if (holo) { holo.classList.remove('dropping'); holo.style.display = ''; }
  if (burst) burst.innerHTML = '';
  if (beams) { beams.classList.remove('fire'); beams.innerHTML = ''; }
  if (flash) flash.classList.remove('fire');
  if (cone)  cone.classList.remove('fire');
  if (callout) { callout.classList.remove('show'); callout.className = 'rarity-callout'; }
  if (spot)  spot.classList.remove('show');
  if (panel) panel.classList.remove('show');
  if (skip)  skip.classList.remove('hidden');

  // pack name in the machine header
  const name = document.getElementById('gmPackName');
  if (name) name.textContent = (pack.name || 'PACK').toUpperCase() + ' PACK';

  // kick off the sequence shortly after the screen mounts
  setTimeout(() => playGachaSequence(pack), 600);
}

async function playGachaSequence(pack) {
  // 1. ROLL the cards now
  state.pulled = rollPack(pack);
  state.revealIdx = 0;
  state.freeUsed = true;
  save();

  // pick BEST pull to feature in the spotlight
  let bestRank = -1;
  state.bestIdx = 0;
  state.pulled.forEach((c, i) => {
    const r = RARITIES.findIndex(rr => rr.key === c.rarity.key);
    if (r > bestRank) { bestRank = r; state.bestIdx = i; }
  });
  const bestCard = state.pulled[state.bestIdx];
  const rarityKey = bestCard.rarity.key;
  const rarityLabel = ({
    common: 'COMMON', uncommon: 'UNCOMMON', rare: 'RARE',
    holo: 'HOLO RARE', ultra: 'ULTRA RARE', secret: 'SECRET RARE',
  })[rarityKey] || 'RARE';

  // 2. PACK DROP — holo card slides slowly through the slot (weighted feel)
  await sleep(1100);                                        // longer hold so user sees the holo pack
  const holo = document.getElementById('gmHolo');
  holo.classList.add('dropping');
  await sleep(700);
  holo.style.display = 'none';
  await sleep(180);

  // 3. PARTICLE BURST — bigger fog cloud + light beams + screen flash at peak
  const burst = document.getElementById('particleBurst');
  const beams = document.getElementById('lightBeams');
  const flash = document.getElementById('gachaFlash');
  burst.innerHTML = '';
  beams.innerHTML = '';

  // 3a. fog cloud rises immediately
  const fog = document.createElement('div');
  fog.className = 'particle-fog fire';
  burst.appendChild(fog);

  // 3b. spawn 12 god-ray beams radiating outward
  for (let i = 0; i < 12; i++) {
    const b = document.createElement('div');
    b.className = 'beam';
    b.style.transform = `translateX(-50%) rotate(${(i * 30) - 90}deg)`;
    beams.appendChild(b);
  }
  beams.classList.add('fire');

  // 3c. spawn 100 sparkle particles in pink/purple/white
  const colors = ['#ffffff', '#ff00aa', '#ff66dd', '#aa00ff', '#7700ff', '#ffaaff', '#ffeeff'];
  for (let i = 0; i < 100; i++) {
    const p = document.createElement('div');
    p.className = 'particle fire';
    p.style.left = `calc(50% + ${(Math.random() - 0.5) * 120}px)`;
    p.style.setProperty('--x', ((Math.random() - 0.5) * 800) + 'px');
    p.style.setProperty('--y', -(400 + Math.random() * 350) + 'px');
    p.style.setProperty('--dur', (1.2 + Math.random() * 1.0) + 's');
    p.style.background = colors[i % colors.length];
    p.style.color      = colors[i % colors.length];
    p.style.animationDelay = (Math.random() * 0.5) + 's';
    p.style.width = (4 + Math.random() * 6) + 'px';
    p.style.height = p.style.width;
    burst.appendChild(p);
  }

  // 3d. PEAK FLASH at ~600ms
  await sleep(600);
  flash.classList.remove('fire'); void flash.offsetWidth; flash.classList.add('fire');

  // 4. SPOTLIGHT REVEAL — machine fades, card rises into spotlight cone
  await sleep(150);
  document.getElementById('gachaMachine').style.display = 'none';

  // overhead spotlight cone fires
  const cone = document.getElementById('spotCone');
  cone.classList.remove('fire'); void cone.offsetWidth; cone.classList.add('fire');

  // card materializes
  const spotImg = document.getElementById('cardSpotImg');
  spotImg.src = bestCard.img;
  spotImg.onerror = function () { this.onerror = null; this.src = bestCard.imgFallback; };
  spotImg.alt = bestCard.name;
  const rar = document.getElementById('cardSpotRarity');
  rar.textContent = bestCard.rarity.label;
  rar.className = 'card-spot-rarity ' + bestCard.rarity.css;
  document.getElementById('cardSpotlight').classList.add('show');

  // big rarity callout text flies in
  await sleep(200);
  const callout = document.getElementById('rarityCallout');
  callout.textContent = rarityLabel;
  callout.className = 'rarity-callout show ' + bestCard.rarity.css;

  // 5. After the dramatic hold, slide up the buyback offer
  await sleep(1900);
  showBuybackPanel(bestCard, pack);
}

function showBuybackPanel(card, pack) {
  const grades = ['PSA 10', 'PSA 9', 'Beckett 9.5', 'CGC 9.5', 'Beckett 10'];
  const grade  = grades[Math.floor(Math.random() * grades.length)];
  const baseVal = card.rarity.key === 'secret'   ? 1800 :
                  card.rarity.key === 'ultra'    ? 420  :
                  card.rarity.key === 'holo'     ? 95   :
                  card.rarity.key === 'rare'     ? 18   :
                  card.rarity.key === 'uncommon' ? 6    : 1.5;
  const value     = (baseVal + Math.random() * baseVal * 0.3).toFixed(2);
  const sellPrice = (value * 0.9).toFixed(2);

  document.getElementById('bbCardName').textContent = card.name.toUpperCase();
  document.getElementById('bbGrade').textContent     = grade;
  document.getElementById('bbValue').textContent     = '$' + value;
  document.getElementById('bbPulledFrom').textContent = '$' + pack.marketUSD + ' ' + (pack.tag.split(' ')[0] || pack.name.toUpperCase());
  document.getElementById('bbSellPrice').textContent = '$' + sellPrice;
  document.getElementById('bbAllPullsCount').textContent = state.pulled.length;

  document.getElementById('buybackPanel').classList.add('show');
}

// SKIP — fast-forward to the buyback offer
const skipGachaBtn = document.getElementById('gachaSkip');
if (skipGachaBtn) skipGachaBtn.addEventListener('click', () => {
  if (!state.pulled || state.pulled.length === 0) return;
  const holo = document.getElementById('gmHolo');
  if (holo) holo.style.display = 'none';
  document.getElementById('gachaMachine').style.display = 'none';
  document.getElementById('particleBurst').innerHTML = '';
  const bestCard = state.pulled[state.bestIdx || 0];
  const pack = PACKS.find(p => p.id === state.selectedPackId);
  const spotImg = document.getElementById('cardSpotImg');
  spotImg.src = bestCard.img;
  spotImg.alt = bestCard.name;
  const rar = document.getElementById('cardSpotRarity');
  rar.textContent = bestCard.rarity.label;
  rar.className = 'card-spot-rarity ' + bestCard.rarity.css;
  document.getElementById('cardSpotlight').classList.add('show');
  showBuybackPanel(bestCard, pack);
  document.getElementById('gachaSkip').classList.add('hidden');
});

// BUYBACK PANEL HANDLERS
const bbSellBtnEl          = document.getElementById('bbSellBtn');
const bbBuyAnotherBtnEl    = document.getElementById('bbBuyAnotherBtn');
const bbViewCollectionBtnEl= document.getElementById('bbViewCollectionBtn');
const bbViewAllPullsBtnEl  = document.getElementById('bbViewAllPullsBtn');

if (bbSellBtnEl) bbSellBtnEl.addEventListener('click', () => {
  const sellPrice = parseFloat(document.getElementById('bbSellPrice').textContent.replace('$', '')) || 0;
  state.coins += Math.round(sellPrice);
  // bank the OTHER pulls; sold one is gone
  state.pulled.forEach((c, i) => {
    if (i !== state.bestIdx && !state.collection.find(x => x.id === c.id)) state.collection.unshift(c);
  });
  saveInventory();
  alert(`Sold for $${sellPrice}. The other ${state.pulled.length - 1} pulls were banked to your collection.`);
  closeRipModal();
});

if (bbBuyAnotherBtnEl) bbBuyAnotherBtnEl.addEventListener('click', () => {
  state.pulled.forEach(c => {
    if (!state.collection.find(x => x.id === c.id)) state.collection.unshift(c);
  });
  saveInventory();
  const pack = PACKS.find(p => p.id === state.selectedPackId);
  if (pack) { setupRipScreen(pack); showScreen('rip'); }
});

if (bbViewCollectionBtnEl) bbViewCollectionBtnEl.addEventListener('click', () => {
  state.pulled.forEach(c => {
    if (!state.collection.find(x => x.id === c.id)) state.collection.unshift(c);
  });
  saveInventory();
  showScreen('roster');
  renderRoster();
});

if (bbViewAllPullsBtnEl) bbViewAllPullsBtnEl.addEventListener('click', () => {
  state.pulled.forEach(c => {
    if (!state.collection.find(x => x.id === c.id)) state.collection.unshift(c);
  });
  saveInventory();
  state.revealIdx = 0;
  showScreen('reveal');
  showCurrentCard();
});

// kept as a no-op shim so any older code path that calls tearPack still works
function tearPack() {
  const pack = PACKS.find(p => p.id === state.selectedPackId);
  if (pack) playGachaSequence(pack);
}

async function playMegaRip(bestKey) {
  const stage = $('packStage');
  const flash = $('flash');
  const isMega = ['holo', 'ultra', 'secret'].includes(bestKey);
  const isGodTier = ['ultra', 'secret'].includes(bestKey);

  // mega text per rarity
  const megaTextMap = {
    common: 'RIP!!!', uncommon: 'RIP!!!', rare: 'NICE!!!',
    holo: 'HOLO!!!', ultra: 'ULTRA!!!', secret: 'SECRET!!!',
  };

  // Phase 1 — ramp up the final charge for ~280ms
  $('ripHint').textContent = '';
  for (let i = 0; i < 4; i++) {
    setTimeout(() => spawnEnergyRing(stage, isGodTier ? 'gold' : isMega ? 'pink' : ''), i * 70);
  }
  await sleep(280);

  // Phase 2 — BANG
  document.body.classList.add('rip-shake', 'rip-bang');

  // mega flash on the existing #flash element
  flash.classList.remove('active');
  void flash.offsetWidth; // reset
  flash.classList.add('mega-firing');

  // expanding shockwave rings
  const ringColors = isGodTier ? ['white', 'gold', 'pink', 'gold', 'white']
                  : isMega    ? ['white', 'pink', '', 'pink', 'white']
                  :              ['white', '', 'pink', '', ''];
  ringColors.forEach((c, i) => setTimeout(() => spawnEnergyRing(stage, c), i * 55));

  // particle explosion
  const partCount = isGodTier ? 90 : isMega ? 60 : 40;
  spawnParticles(stage, partCount, { mega: isMega, god: isGodTier });

  // light beam shooting up
  spawnLightBeam(stage, isGodTier ? 'rainbow' : isMega ? 'gold' : '');

  // mega text
  spawnMegaText(megaTextMap[bestKey] || 'RIP!!!', { god: isGodTier });

  // pack disintegrates dramatically
  stage.classList.remove('charge-1', 'charge-2', 'charge-3');
  stage.classList.add('mega-tear');

  // fly-out cards from the tear (delay so the beam reads first)
  setTimeout(() => spawnFlyCards(stage, 5), 220);

  // hold for the spectacle
  await sleep(900);

  // cleanup
  document.body.classList.remove('rip-shake', 'rip-bang');
  flash.classList.remove('mega-firing');
  stage.classList.remove('mega-tear');

  await sleep(150);
}

// ---------- MEGA RIP HELPERS ----------

function packCenter(anchor) {
  const r = anchor.getBoundingClientRect();
  return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
}

function spawnEnergyRing(anchor, colorClass = '') {
  const ring = document.createElement('div');
  ring.className = 'energy-ring' + (colorClass ? ' ' + colorClass : '');
  const c = packCenter(anchor);
  ring.style.left = c.x + 'px';
  ring.style.top = c.y + 'px';
  document.body.appendChild(ring);
  setTimeout(() => ring.remove(), 950);
}

function spawnParticles(anchor, count, opts = {}) {
  const c = packCenter(anchor);
  const types = opts.god ? ['white', 'star', 'pink', 'star', 'star']
              : opts.mega ? ['', 'star', 'pink', 'star', '']
              : ['', '', 'pink', ''];
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'mega-particle ' + types[i % types.length];
    p.style.left = c.x + 'px';
    p.style.top = c.y + 'px';
    const angle = (Math.PI * 2) * (i / count) + Math.random() * 0.4;
    const dist = 220 + Math.random() * 280;
    p.style.setProperty('--tx', Math.cos(angle) * dist + 'px');
    p.style.setProperty('--ty', Math.sin(angle) * dist + 'px');
    p.style.animationDelay = (Math.random() * 0.12) + 's';
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 1200);
  }
}

function spawnLightBeam(anchor, variant = '') {
  const beam = document.createElement('div');
  beam.className = 'light-beam' + (variant ? ' ' + variant : '');
  const c = packCenter(anchor);
  beam.style.left = c.x + 'px';
  beam.style.top = c.y + 'px';
  document.body.appendChild(beam);
  setTimeout(() => beam.remove(), 950);
}

function spawnMegaText(text, opts = {}) {
  const el = document.createElement('div');
  el.className = 'mega-text';
  if (opts.god) el.style.fontSize = 'clamp(56px, 16vw, 200px)';
  el.textContent = text;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 950);
}

function spawnFlyCards(anchor, n) {
  const c = packCenter(anchor);
  for (let i = 0; i < n; i++) {
    const card = document.createElement('div');
    card.className = 'fly-card';
    card.style.left = c.x + 'px';
    card.style.top = c.y + 'px';
    const angle = (Math.PI * 2) * (i / n) - Math.PI / 2;
    const dist = 260 + Math.random() * 80;
    card.style.setProperty('--tx', Math.cos(angle) * dist + 'px');
    card.style.setProperty('--ty', Math.sin(angle) * dist + 'px');
    card.style.setProperty('--rot', (Math.random() * 360 - 180) + 'deg');
    document.body.appendChild(card);
    setTimeout(() => card.remove(), 1150);
  }
}

// ---------- REVEAL ----------
function showCurrentCard() {
  const card = state.pulled[state.revealIdx];
  $('revealCount').textContent = state.revealIdx + 1;
  $('revealTotal').textContent = state.pulled.length;
  $('revealDialog').textContent = 'tap the card to flip it.';

  const deck = $('cardDeck');
  deck.innerHTML = '';
  const el = renderCard(card);
  deck.appendChild(el);

  let flipped = false;
  el.addEventListener('click', () => {
    if (flipped) return;
    flipped = true;
    el.classList.add('flipped');
    onCardFlipped(card, el);
  });

  $('nextCardBtn').style.display = 'none';
}

function renderCard(card) {
  const el = document.createElement('div');
  el.className = `poke-card ${card.rarity.css}`;
  el.innerHTML = `
    <div class="card-side card-back">
      <div class="card-back-logo">PACK<span>RIP</span></div>
    </div>
    <div class="card-side card-front real">
      <img class="real-card-img"
           src="${card.img}"
           onerror="this.onerror=null;this.src='${card.imgFallback}'"
           alt="${card.name}" />
      <div class="real-rarity ${card.rarity.css}">${card.rarity.label}</div>
    </div>
  `;
  return el;
}

function onCardFlipped(card, el) {
  $('revealDialog').textContent = choice(HYPE_LINES[card.rarity.key]);

  if (['holo', 'ultra', 'secret'].includes(card.rarity.key)) {
    spawnSparkles(el);
  }

  /* no longer auto-bank into the collection — the user chooses each card's
     disposition (keep / sell / burn-forward) on the summary screen */

  setTimeout(() => {
    $('nextCardBtn').style.display = '';
    $('nextCardBtn').textContent = (state.revealIdx + 1 >= state.pulled.length) ? 'See Pulls' : 'Next';
  }, 600);
}

function spawnSparkles(el) {
  const rect = el.getBoundingClientRect();
  for (let i = 0; i < 22; i++) {
    const s = document.createElement('div');
    s.className = 'sparkle';
    s.style.left = (rect.left + Math.random() * rect.width) + 'px';
    s.style.top  = (rect.top + Math.random() * rect.height) + 'px';
    s.style.animationDelay = (Math.random() * 0.4) + 's';
    document.body.appendChild(s);
    setTimeout(() => s.remove(), 1200);
  }
}

$('nextCardBtn').addEventListener('click', () => {
  if (state.revealIdx + 1 >= state.pulled.length) {
    showSummary();
  } else {
    state.revealIdx++;
    showCurrentCard();
  }
});

$('skipBtn').addEventListener('click', () => {
  // jump straight to summary — user will choose dispositions there per card
  showSummary();
});

// ---------- SUMMARY ----------
function showSummary() {
  showScreen('summary');
  const grid = $('summaryGrid');
  grid.innerHTML = '';
  let bestRank = -1;
  state.pulled.forEach((card, i) => {
    const mini = document.createElement('div');
    mini.className = `mini-card ${card.rarity.css}` + (card.choice ? ' chose-' + card.choice : '');
    mini.style.animationDelay = (i * 0.08) + 's';
    mini.dataset.cardId = card.id;
    mini.innerHTML = `
      <div class="mini-rarity">${card.rarity.label}</div>
      <img class="mini-img" src="${card.img}"
        onerror="this.onerror=null;this.src='${card.imgFallback}'" alt="${card.name}" />
      <div class="mini-name">${card.name}</div>
      <!-- per-card disposition CTAs -->
      <div class="card-actions">
        <button class="ca-btn ca-keep" data-action="keep">KEEP</button>
        <button class="ca-btn ca-sell" data-action="sell">SELL</button>
        <button class="ca-btn ca-burn" data-action="burn">BURN FWD</button>
      </div>
      <div class="card-action-status"></div>
    `;
    grid.appendChild(mini);

    // wire each card's actions
    mini.querySelectorAll('[data-action]').forEach(b => {
      b.addEventListener('click', () => disposeCard(card, b.dataset.action, mini));
    });

    const rank = RARITIES.findIndex(r => r.key === card.rarity.key);
    if (rank > bestRank) bestRank = rank;
  });

  const bestKey = RARITIES[bestRank].key;
  $('summaryHype').textContent = choice(HYPE_LINES[bestKey]);
  $('rosterCount').textContent = state.collection.length;
}

/* per-card "what should happen to this pull" — keep, sell on marketplace, burn forward */
function disposeCard(card, action, mini) {
  const status = mini.querySelector('.card-action-status');
  if (action === 'keep') {
    if (!state.collection.find(c => c.id === card.id)) state.collection.unshift(card);
    card.choice = 'keep';
    status.textContent = '✓ in collection';
    mini.classList.add('chose-keep');
  } else if (action === 'sell') {
    // mock: move to listings, ask a price (mid-rarity-based estimate)
    const askUSD = { common: 1, uncommon: 3, rare: 8, holo: 25, ultra: 75, secret: 250 }[card.rarity.key] || 5;
    if (!state.listings.find(l => l.card.id === card.id)) {
      state.listings.unshift({ card, askUSD, askSOL: +(askUSD / SOL_USD).toFixed(3), seller: state.wallet || 'GUEST', ts: Date.now() });
    }
    card.choice = 'sell';
    status.textContent = `✓ listed @ $${askUSD}`;
    mini.classList.add('chose-sell');
  } else if (action === 'burn') {
    card.choice = 'burn';
    status.textContent = '✓ donated to raffle pool';
    mini.classList.add('chose-burn');
  }
  saveInventory();
  // re-render the marketplace if it's on-page (so listings appear immediately)
  if (document.getElementById('marketplaceList')) renderMarketplace();
}

$('ripAgainBtn').addEventListener('click', () => {
  if (state.freeUsed) {
    closeRipModal();
    showFreeUsedToast();
    return;
  }
  const pack = PACKS.find(p => p.id === state.selectedPackId);
  setupRipScreen(pack);
  showScreen('rip');
});

$('viewRosterBtn').addEventListener('click', () => {
  showScreen('roster');
  renderRoster();
});

// ---------- ROSTER ----------
function renderRoster() {
  const grid = $('rosterGrid');
  grid.innerHTML = '';
  if (state.roster.length === 0) {
    grid.innerHTML = `<div class="roster-empty">no cards yet. go rip a pack.</div>`;
    return;
  }
  state.roster.forEach((card, i) => {
    const mini = document.createElement('div');
    mini.className = `mini-card ${card.rarity.css}`;
    mini.style.animationDelay = Math.min(i * 0.02, 0.6) + 's';
    mini.innerHTML = `
      <div class="mini-rarity">${card.rarity.label}</div>
      <img class="mini-img" src="${card.img}"
        onerror="this.onerror=null;this.src='${card.imgFallback}'" alt="${card.name}" />
      <div class="mini-name">${card.name}</div>
    `;
    grid.appendChild(mini);
  });
}

$('clearRosterBtn').addEventListener('click', () => {
  if (state.roster.length === 0) return;
  if (confirm('wipe entire roster? this cannot be undone.')) {
    state.roster = [];
    save();
    renderRoster();
  }
});

// ---------- LANDING: FILTER CHIPS ----------
$$('.filter-chip').forEach(chip => {
  chip.addEventListener('click', () => {
    $$('.filter-chip').forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    renderRealPackGrid(chip.dataset.filter);
  });
});

// ---------- VIEWER COUNT WIGGLE ----------
setInterval(() => {
  // both the cam page count and the hero stat count wiggle around the seed
  ['viewerCount', 'statWatch'].forEach((id) => {
    const el = $(id);
    if (!el) return;
    const seed = id === 'statWatch' ? 257 : 251;
    const cur = parseInt(el.textContent.replace(/,/g, ''), 10) || seed;
    const next = Math.max(seed - 30, Math.min(seed + 30, cur + (Math.random() < 0.5 ? -1 : 1) * (1 + rand(4))));
    el.textContent = fmt(next);
  });
}, 2200);

// ---------- PHANTOM WALLET ----------
const walletBtn = $('walletBtn');

function shortAddr(a) {
  if (!a) return '';
  return a.slice(0, 4) + '…' + a.slice(-4);
}

function updateWalletUI() {
  if (!walletBtn) return;
  const label = walletBtn.querySelector('.wallet-label');
  if (state.wallet) {
    walletBtn.classList.add('connected');
    label.textContent = shortAddr(state.wallet);
    walletBtn.title = state.wallet;
  } else {
    walletBtn.classList.remove('connected');
    label.textContent = 'CONNECT WALLET';
    walletBtn.title = 'connect phantom';
  }
}

async function connectWallet() {
  const phantom = window.solana;
  if (!phantom || !phantom.isPhantom) {
    if (confirm('Phantom wallet not detected. Open phantom.app to install?')) {
      window.open('https://phantom.app/', '_blank');
    }
    return;
  }
  try {
    const resp = await phantom.connect();
    // persist current GUEST inventory before swapping
    saveInventory();
    state.wallet = resp.publicKey.toString();
    saveGlobal();
    // load the wallet-specific inventory (or initialize a fresh one for this wallet)
    loadInventory(state.wallet);
    updateWalletUI();
    // re-render anything that shows wallet-derived state
    if (document.getElementById('marketplaceList')) renderMarketplace();
  } catch (e) {
    // user cancelled
  }
}

async function disconnectWallet() {
  try {
    if (window.solana && window.solana.disconnect) await window.solana.disconnect();
  } catch (e) {}
  // persist this wallet's inventory before swapping back to GUEST
  saveInventory();
  state.wallet = null;
  saveGlobal();
  loadInventory(null);
  updateWalletUI();
  if (document.getElementById('marketplaceList')) renderMarketplace();
}

if (walletBtn) {
  walletBtn.addEventListener('click', () => {
    if (state.wallet) {
      if (confirm('disconnect wallet?')) disconnectWallet();
    } else {
      connectWallet();
    }
  });
}

// silent reconnect if previously trusted
if (window.solana && window.solana.isPhantom && state.wallet) {
  window.solana.connect({ onlyIfTrusted: true })
    .then((r) => { state.wallet = r.publicKey.toString(); save(); updateWalletUI(); })
    .catch(() => {});
}

updateWalletUI();

// ============================================================
// ===== NEW LAYOUT RENDERERS (Marketplace split-screen + Live Chat) =====
// ============================================================

let activePackId = 'sv3pt5'; // default selected pack

function renderCategoryStrip() {
  const list = document.getElementById('categoryList');
  if (!list) return;
  list.innerHTML = '';
  PACKS.forEach(p => {
    const chip = document.createElement('button');
    chip.className = 'cat-chip' + (p.id === activePackId ? ' active' : '');
    chip.dataset.cat = p.id;
    const thumb = p.packImg
      ? `<img class="cat-thumb" src="${p.packImg}" alt="" loading="lazy" />`
      : `<span class="cat-thumb" style="background:linear-gradient(135deg,${p.accent},#1d1f29)"></span>`;
    const shortName = p.name.length > 14 ? p.name.slice(0, 12) + '…' : p.name;
    chip.innerHTML = `${thumb}<span class="cat-label">${shortName.toUpperCase()}</span><span class="cat-count">${p.stock}</span>`;
    chip.addEventListener('click', () => {
      activePackId = p.id;
      document.querySelector('.cat-all')?.classList.remove('active');
      renderCategoryStrip();
      renderRightPanel();
      renderCardsGrid();
    });
    list.appendChild(chip);
  });
}

function renderRightPanel() {
  const pack = PACKS.find(p => p.id === activePackId);
  if (!pack) return;
  const t = document.getElementById('packTitle');
  const s = document.getElementById('packSub');
  const v = document.getElementById('packValue');
  const m = document.getElementById('machineImg');
  if (t) t.textContent = pack.name;
  if (s) s.textContent = pack.tag;
  if (v) v.textContent = '$' + pack.marketUSD.toFixed(2);
  if (m && pack.packImg) m.src = pack.packImg;
  renderPackContents(pack);
  if (typeof updateWalletUI === 'function') updateWalletUI();
}

function renderPackContents(pack) {
  const grid = document.getElementById('contentsGrid');
  if (!grid) return;
  grid.innerHTML = '';
  const samples = [];
  ['secret', 'ultra', 'holo', 'rare', 'uncommon', 'common'].forEach(k => {
    (REAL_CARDS[k] || []).slice(0, 2).forEach(c => samples.push(c));
  });
  samples.slice(0, 12).forEach(c => {
    const cell = document.createElement('div');
    cell.className = 'content-card';
    cell.innerHTML = `<img src="${cardImg(c.set, c.num, false)}" alt="${c.name}" loading="lazy" />`;
    grid.appendChild(cell);
  });
}

function renderCardsGrid() {
  const grid = document.getElementById('cardsGrid');
  if (!grid) return;
  grid.innerHTML = '';
  const buckets = [
    ['common', REAL_CARDS.common], ['uncommon', REAL_CARDS.uncommon],
    ['rare', REAL_CARDS.rare], ['holo', REAL_CARDS.holo],
    ['ultra', REAL_CARDS.ultra], ['secret', REAL_CARDS.secret],
  ];
  buckets.forEach(([rk, arr]) => {
    const rar = (typeof RARITIES !== 'undefined') ? RARITIES.find(r => r.key === rk) : null;
    (arr || []).forEach(c => {
      const card = Object.assign({}, c, { rarity: rar });
      const rec  = (typeof getPrice === 'function') ? getPrice(card) : { value: null, isEst: true };
      const tr   = (typeof priceTrend === 'function') ? priceTrend(rec) : null;
      const src  = rec.isEst ? '' : (rec.tcgUrl || rec.cmUrl ||
        `https://www.tcgplayer.com/search/pokemon/product?q=${encodeURIComponent(c.name)}`);
      const nm   = (!rec.isEst && rec.name) ? rec.name : c.name;
      const tile = document.createElement('div');
      tile.className = 'card-tile';
      tile.innerHTML = `
        <div class="card-img-wrap">
          <img src="${cardImg(c.set, c.num, false)}" alt="${nm}" loading="lazy" />
          <span class="card-grade-badge">${rar ? rar.label : ''}</span>
        </div>
        <h3 class="card-name">${c.set.toUpperCase()} · ${nm}</h3>
        <div class="card-meta">
          <div>
            <div class="card-meta-label">Market price${rec.isEst ? ' (est.)' : ''}</div>
            <div class="card-value">${typeof fmtUSD === 'function' ? fmtUSD(rec.value) : ('$' + (rec.value||0))}</div>
          </div>
          <div style="text-align:right">
            <div class="card-meta-label">${tr != null ? '30d · Cardmarket' : 'Source'}</div>
            <div class="card-grade">${tr != null
              ? `<span class="${tr>=0?'cg-up':'cg-down'}">${tr>=0?'+':''}${tr.toFixed(1)}%</span>`
              : (rec.isEst ? 'estimate' : 'TCGplayer')}</div>
          </div>
        </div>
        ${rec.isEst ? '' : `<a class="card-src" href="${src}" target="_blank" rel="noopener" onclick="event.stopPropagation()">Verify price at source ↗</a>`}
      `;
      grid.appendChild(tile);
    });
  });
}

// ---------- LIVE CHAT (mock) ----------

const LC_MESSAGES = [
  { handle: 'cypherchad',  text: 'pulled a Charizard SAR last night' },
  { handle: 'osakaholic',  text: 'JP 151 boosters are the meta rn' },
  { handle: 'kyoto_chad',  text: 'gm gacha sirs' },
  { handle: 'sealed_jp',   text: 'when does kenji ship next batch?' },
];

function renderLiveChat() {
  const msgs = document.getElementById('lcMessages');
  if (!msgs) return;
  msgs.innerHTML = '';
  if (LC_MESSAGES.length === 0) {
    msgs.innerHTML = '<div class="lc-empty">No messages yet. Say hi!</div>';
    return;
  }
  LC_MESSAGES.forEach(m => {
    const el = document.createElement('div');
    el.className = 'lc-message';
    el.innerHTML = `<span class="lc-message-handle">@${m.handle}</span>${m.text}`;
    msgs.appendChild(el);
  });
  msgs.scrollTop = msgs.scrollHeight;
}

// ---------- WIRE NEW LAYOUT BUTTONS ----------

(function wireNewLayout() {
  const openBtn   = document.getElementById('openBtn');
  const connectBt = document.getElementById('connectBtn');
  const allChip   = document.querySelector('.cat-all');
  const lcToggle  = document.getElementById('lcToggle');
  const lcSend    = document.getElementById('lcSend');
  const lcInput   = document.getElementById('lcInput');

  if (openBtn) openBtn.addEventListener('click', () => {
    const pack = PACKS.find(p => p.id === activePackId);
    if (!pack) return;
    state.selectedPackId = activePackId;
    state.lastPayWith = state.wallet ? 'sol' : 'free';
    openRipModal();
    setupRipScreen(pack);
    showScreen('rip');
  });

  if (connectBt) connectBt.addEventListener('click', () => {
    if (state.wallet) { if (confirm('Disconnect wallet?')) disconnectWallet(); }
    else { connectWallet(); }
  });

  if (allChip) allChip.addEventListener('click', () => {
    document.querySelectorAll('.cat-chip').forEach(c => c.classList.remove('active'));
    allChip.classList.add('active');
    activePackId = 'sv3pt5';
    renderRightPanel();
    renderCardsGrid();
  });

  if (lcToggle) lcToggle.addEventListener('click', () => {
    document.getElementById('livechat').classList.toggle('open');
  });

  if (lcSend) lcSend.addEventListener('click', () => {
    const txt = lcInput.value.trim();
    if (!txt) return;
    LC_MESSAGES.push({ handle: state.wallet ? shortAddr(state.wallet) : 'guest', text: txt });
    lcInput.value = '';
    renderLiveChat();
  });

  if (lcInput) lcInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') lcSend.click();
  });

  // pack-detail tabs
  document.querySelectorAll('.pack-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.pack-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const body = document.getElementById('packTabBody');
      const which = tab.dataset.tab;
      const pack = PACKS.find(p => p.id === activePackId);
      if (which === 'contents') {
        body.innerHTML = '<div class="contents-grid" id="contentsGrid"></div>';
        renderPackContents(pack);
      } else if (which === 'buyback') {
        const offer = (pack.marketUSD * 0.85).toFixed(2);
        body.innerHTML = `<div class="tab-stub">Instant buyback: <b style="color:var(--gold)">$${offer}</b><br/><span style="opacity:0.6">85% of market value · paid in SOL</span></div>`;
      } else if (which === 'bigwin') {
        const oddsPct = ((pack.pull.ultra + pack.pull.secret) / Object.values(pack.pull).reduce((a,b)=>a+b,0) * 100).toFixed(2);
        body.innerHTML = `<div class="tab-stub">Big win odds: <b style="color:var(--gold)">${oddsPct}%</b><br/><span style="opacity:0.6">chance of an Ultra Rare or SAR</span></div>`;
      }
    });
  });
})();

// ---------- HERO STATS COUNT-UP ANIMATION ----------
function animateCountUp(el, finalText, dur = 1400) {
  if (!el) return;
  const match = String(finalText).match(/^([\d,.]+)\s*(K|M)?$/i);
  if (!match) { el.textContent = finalText; return; }
  const target = parseFloat(match[1].replace(/,/g, ''));
  const suffix = match[2] || '';
  const start = performance.now();
  function tick(now) {
    const t = Math.min(1, (now - start) / dur);
    const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
    const current = target * eased;
    let display;
    if (suffix === 'K' || suffix === 'M') {
      display = (current).toFixed(current < 10 ? 1 : 0).replace(/\.0$/, '') + suffix;
    } else if (target >= 1000) {
      display = Math.round(current).toLocaleString('en-US');
    } else {
      display = Math.round(current).toString();
    }
    el.textContent = display;
    if (t < 1) requestAnimationFrame(tick);
    else el.textContent = finalText;
  }
  el.textContent = '0' + suffix;
  requestAnimationFrame(tick);
}

function runHeroStatsCountUp() {
  const stats = [
    { id: 'statPacks',   target: '12'   },
    { id: 'statBurn',    target: '486K' },
    { id: 'statHolders', target: '34'   },
    { id: 'statWatch',   target: '257'  },
  ];
  stats.forEach((s, i) => {
    const el = document.getElementById(s.id);
    if (!el) return;
    setTimeout(() => animateCountUp(el, s.target, 1400 + i * 100), 200 + i * 80);
  });
}

// ============================================================
// ===== CARD INTELLIGENCE — LIVE, VERIFIABLE MARKET DATA =====
//   Prices come from the public Pokémon TCG API (pokemontcg.io),
//   which mirrors TCGplayer (USD) and Cardmarket (EUR) market
//   data. Every card links straight to its source so the price
//   can be independently verified. Nothing here is fabricated;
//   if the API is unreachable we show clearly-flagged "EST."
//   rarity estimates instead of inventing numbers.
// ============================================================

const PRICE_API   = 'https://api.pokemontcg.io/v2/cards';
const PRICE_CACHE = 'packrip_prices_v1';
const PRICE_TTL   = 12 * 60 * 60 * 1000;          // 12h
const PRICE_DATA  = {};                            // "set-num" -> record
const PRICE_STATE = { status: 'idle', updated: 0 };

const cardKey = (c) => c.set + '-' + c.num;

// --- deterministic estimate (only when the live API is unreachable) ---
function _cardSeed(card) {
  const s = (card.set || '') + (card.num || '');
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
  return h >>> 0;
}
const RARITY_BASE = { common: 2, uncommon: 6, rare: 22, holo: 85, ultra: 410, secret: 1600 };
function estPrice(card) {
  const key  = (card.rarity && card.rarity.key) || 'rare';
  const base = RARITY_BASE[key] || 22;
  const mult = 0.6 + ((_cardSeed(card) % 1000) / 1000) * 1.1;
  return +(base * mult).toFixed(2);
}

// printing priority — the variant a buyer is most likely to see first
const PRINT_ORDER = ['holofoil', '1stEditionHolofoil', 'unlimitedHolofoil',
  'reverseHolofoil', '1stEdition', 'unlimited', 'normal'];
const PRINT_LABEL = {
  holofoil: 'Holofoil', '1stEditionHolofoil': '1st Ed. Holofoil',
  unlimitedHolofoil: 'Unlimited Holofoil', reverseHolofoil: 'Reverse Holofoil',
  '1stEdition': '1st Edition', unlimited: 'Unlimited', normal: 'Normal',
};
function pickPrinting(prices) {
  if (!prices) return null;
  for (const k of PRINT_ORDER) if (prices[k]) return { key: k, p: prices[k] };
  const ks = Object.keys(prices);
  return ks.length ? { key: ks[0], p: prices[ks[0]] } : null;
}

// turn one raw API card into our normalized record
function parsePrice(api) {
  const rec = { id: api.id, name: api.name, isEst: false };
  const tp = api.tcgplayer;
  if (tp && tp.prices) {
    const pr = pickPrinting(tp.prices);
    if (pr) {
      const p = pr.p;
      rec.printing = PRINT_LABEL[pr.key] || pr.key;
      rec.low = p.low; rec.mid = p.mid; rec.high = p.high;
      rec.market = p.market; rec.directLow = p.directLow;
      rec.value  = p.market != null ? p.market : (p.mid != null ? p.mid : p.low);
    }
    rec.prints = Object.keys(tp.prices).map(k => Object.assign(
      { label: PRINT_LABEL[k] || k }, tp.prices[k]));
    rec.tcgUrl = tp.url;
    rec.tcgUpdated = tp.updatedAt;
  }
  const cm = api.cardmarket;
  if (cm && cm.prices) {
    rec.cm = {
      trend: cm.prices.trendPrice, avg1: cm.prices.avg1,
      avg7: cm.prices.avg7, avg30: cm.prices.avg30,
      low: cm.prices.lowPrice, avgSell: cm.prices.averageSellPrice,
    };
    rec.cmUrl = cm.url;
    rec.cmUpdated = cm.updatedAt;
    if (rec.value == null && rec.cm.trend) rec.value = rec.cm.trend;
  }
  return rec;
}

function allCardIds() {
  const ids = new Set();
  Object.values(REAL_CARDS).forEach(arr => arr.forEach(c => ids.add(cardKey(c))));
  return [...ids];
}

function loadPriceCache() {
  try {
    const j = JSON.parse(localStorage.getItem(PRICE_CACHE) || 'null');
    if (!j || !j.t || !j.d) return false;
    Object.assign(PRICE_DATA, j.d);
    const fresh = (Date.now() - j.t) < PRICE_TTL;
    PRICE_STATE.status  = fresh ? 'ok' : 'stale';
    PRICE_STATE.updated = j.t;
    return fresh;
  } catch (e) { return false; }
}
function savePriceCache() {
  try { localStorage.setItem(PRICE_CACHE, JSON.stringify({ t: Date.now(), d: PRICE_DATA })); }
  catch (e) {}
}

async function fetchRealPrices(force) {
  const fresh = loadPriceCache();
  renderIntel();                                   // paint with cache/estimates first
  if (typeof renderCardsGrid === 'function') renderCardsGrid();
  if (fresh && !force) return;
  if (PRICE_STATE.status === 'loading') return;

  PRICE_STATE.status = 'loading';
  renderIntel();
  try {
    const ids = allCardIds();
    const chunks = [];
    for (let i = 0; i < ids.length; i += 20) chunks.push(ids.slice(i, i + 20));
    for (const ch of chunks) {
      const q   = ch.map(id => `id:${id}`).join(' OR ');
      const url = `${PRICE_API}?q=(${encodeURIComponent(q)})&pageSize=250` +
                  `&select=id,name,tcgplayer,cardmarket`;
      const r = await fetch(url);
      if (!r.ok) throw new Error('HTTP ' + r.status);
      const j = await r.json();
      (j.data || []).forEach(api => { PRICE_DATA[api.id] = parsePrice(api); });
    }
    PRICE_STATE.status  = 'ok';
    PRICE_STATE.updated = Date.now();
    savePriceCache();
  } catch (e) {
    PRICE_STATE.status = Object.keys(PRICE_DATA).length ? 'stale' : 'error';
    console.warn('[packrip] live price fetch failed:', e);
  }
  renderIntel();
  if (typeof renderCardsGrid === 'function') renderCardsGrid();
}

// the single price accessor everything uses
function getPrice(card) {
  const rec = PRICE_DATA[cardKey(card)];
  if (rec && rec.value != null) return rec;
  const v = estPrice(card);                        // flagged fallback
  return {
    id: cardKey(card), name: card.name, value: v, isEst: true,
    low: +(v * 0.7).toFixed(2), mid: v, high: +(v * 1.8).toFixed(2),
    market: v, printing: 'Estimate',
  };
}

// honest momentum from REAL Cardmarket 1-day vs 30-day average sale prices
function priceTrend(rec) {
  if (rec && rec.cm && rec.cm.avg30 && rec.cm.avg1)
    return ((rec.cm.avg1 - rec.cm.avg30) / rec.cm.avg30) * 100;
  return null;
}

function marketAnalysis(card, rec) {
  const nm = (rec && rec.name) || card.name;
  if (rec.isEst) {
    return { sentiment: 'NEUTRAL',
      text: `Live market data for ${nm} is temporarily unavailable, so the figure shown is a rarity-based estimate — not a real quote. Prices reload automatically; use the source links to verify once they do.` };
  }
  const tr = priceTrend(rec);
  const sentiment = tr == null ? 'NEUTRAL' : tr > 5 ? 'BULLISH' : tr < -5 ? 'BEARISH' : 'STABLE';
  const spread = (rec.low != null && rec.high != null)
    ? ` Its current TCGplayer ${rec.printing || ''} spread runs ${fmtUSD(rec.low)}–${fmtUSD(rec.high)} with a market price of ${fmtUSD(rec.market)}.`
    : '';
  let cmBit = '';
  if (rec.cm && tr != null) {
    const dir = tr > 2 ? 'up' : tr < -2 ? 'down' : 'roughly flat';
    cmBit = ` Cardmarket's average sale price moved ${dir} ${tr >= 0 ? '+' : ''}${tr.toFixed(1)}% over the last 30 days (${fmtEUR(rec.cm.avg30)} → ${fmtEUR(rec.cm.avg1)}).`;
  }
  const tail = sentiment === 'BULLISH'
    ? ' Demand is firm right now — verify at the source before paying the high end.'
    : sentiment === 'BEARISH'
    ? ' Pricing is softening — the source links show the live floor.'
    : ' Pricing is steady. Every figure here links to its public source for independent verification.';
  return { sentiment,
    text: `${nm} (${(card.set || '').toUpperCase()} #${card.num}).${spread}${cmBit}${tail}` };
}

// flat list of every card with its rarity attached
function allCardsWithRarity() {
  const out = [];
  ['secret', 'ultra', 'holo', 'rare', 'uncommon', 'common'].forEach(key => {
    const rar = RARITIES.find(r => r.key === key);
    (REAL_CARDS[key] || []).forEach(c => out.push(Object.assign({}, c, { rarity: rar })));
  });
  return out;
}

// ---- formatting + tiny SVG visuals (real numbers only) ----
function fmtUSD(n) {
  return n == null ? '—' : '$' + Number(n).toLocaleString('en-US',
    { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
function fmtEUR(n) {
  return n == null ? '—' : '€' + Number(n).toLocaleString('en-US',
    { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// low — market — high range track with a marker at the market price
function rangeBar(low, val, high, w, h) {
  w = w || 120; h = h || 30;
  const mid = h / 2;
  if (low == null || high == null || val == null || high <= low) {
    return `<svg class="ic-range" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none">` +
      `<line x1="5" y1="${mid}" x2="${w - 5}" y2="${mid}" stroke="var(--line)" stroke-width="4" stroke-linecap="round"/></svg>`;
  }
  const t = Math.max(0, Math.min(1, (val - low) / (high - low)));
  const x = 5 + t * (w - 10);
  return `<svg class="ic-range" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none">
    <line x1="5" y1="${mid}" x2="${w - 5}" y2="${mid}" stroke="var(--line)" stroke-width="4" stroke-linecap="round"/>
    <line x1="5" y1="${mid}" x2="${x.toFixed(1)}" y2="${mid}" stroke="var(--primary-2)" stroke-width="4" stroke-linecap="round"/>
    <circle cx="${x.toFixed(1)}" cy="${mid}" r="5" fill="#fff" stroke="var(--primary-2)" stroke-width="2"/>
  </svg>`;
}

// 3 REAL Cardmarket points: 30-day avg -> 7-day avg -> 1-day avg
function trendDots(cm, w, h) {
  if (!cm || cm.avg30 == null || cm.avg7 == null || cm.avg1 == null) return '';
  const pts = [cm.avg30, cm.avg7, cm.avg1];
  const mn = Math.min(...pts), mx = Math.max(...pts), r = (mx - mn) || 1;
  const up = cm.avg1 >= cm.avg30;
  const col = up ? 'var(--green)' : 'var(--red)';
  const xy = pts.map((v, i) => [4 + (i / 2) * (w - 8), (h - 5) - ((v - mn) / r) * (h - 10)]);
  const d = xy.map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' ');
  return `<svg class="ic-spark" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none">
    <path d="${d}" fill="none" stroke="${col}" stroke-width="2"/>
    ${xy.map(p => `<circle cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="2.4" fill="${col}"/>`).join('')}
  </svg>`;
}

function priceBannerHTML() {
  const s = PRICE_STATE.status;
  const when = PRICE_STATE.updated
    ? new Date(PRICE_STATE.updated).toLocaleString('en-US',
        { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })
    : '';
  let cls = 'load', txt = 'Fetching live prices…';
  if (s === 'loading') { cls = 'load'; txt = 'Loading live market prices from pokemontcg.io…'; }
  else if (s === 'ok') { cls = 'ok';
    txt = `Live prices · TCGplayer &amp; Cardmarket via <a href="https://pokemontcg.io" target="_blank" rel="noopener">pokemontcg.io</a>${when ? ` · synced ${when}` : ''}`; }
  else if (s === 'stale') { cls = 'warn';
    txt = `Showing cached prices${when ? ` from ${when}` : ''} — couldn’t reach the live API just now.`; }
  else if (s === 'error') { cls = 'err';
    txt = 'Live prices unavailable — showing rarity-based estimates (marked “EST.”). These are not real quotes.'; }
  return `<div class="price-banner ${cls}"><span class="pb-dot"></span>` +
    `<span class="pb-txt">${txt}</span>` +
    `${(s === 'stale' || s === 'error') ? '<button class="pb-retry" id="pbRetry">Retry</button>' : ''}</div>`;
}

const INTEL = { tab: 'explore', filter: '', rarity: 'all', sort: 'value-desc', compare: [] };

function intelCardTile(card) {
  const rec = getPrice(card);
  const tr  = priceTrend(rec);
  const up  = tr == null ? null : tr >= 0;
  const watched = state.watchlist.includes(cardKey(card));
  const vis = (rec.cm && trendDots(rec.cm, 120, 30)) ||
              rangeBar(rec.low, rec.value, rec.high, 120, 30);
  const nm = rec.name || card.name;
  let src = 'estimate · not a quote';
  if (!rec.isEst) src = rec.tcgUrl ? 'TCGplayer market price'
                      : rec.cmUrl  ? 'Cardmarket trend price' : 'live market';
  return `
    <div class="ic-tile" data-key="${cardKey(card)}">
      <div class="ic-img">
        <img src="${cardImg(card.set, card.num, false)}" alt="${nm}" loading="lazy" />
        <span class="ic-rar ${card.rarity.css}">${card.rarity.label}</span>
        ${watched ? '<span class="ic-watch-flag">WATCHING</span>' : ''}
        ${rec.isEst ? '<span class="ic-est-flag">EST.</span>' : ''}
      </div>
      <div class="ic-info">
        <div class="ic-name">${nm}</div>
        <div class="ic-set">${(card.set || '').toUpperCase()} #${card.num}</div>
        <div class="ic-price-row">
          <span class="ic-price">${fmtUSD(rec.value)}</span>
          ${tr != null
            ? `<span class="ic-change ${up ? 'up' : 'down'}">${up ? '+' : ''}${tr.toFixed(1)}%</span>`
            : '<span class="ic-change flat">—</span>'}
        </div>
        ${vis}
        <div class="ic-src">${src}</div>
      </div>
    </div>`;
}

function getFilteredCards() {
  let cards = allCardsWithRarity();
  if (INTEL.filter) {
    const q = INTEL.filter.toLowerCase();
    cards = cards.filter(c => c.name.toLowerCase().includes(q) || (c.set || '').toLowerCase().includes(q));
  }
  if (INTEL.rarity !== 'all') cards = cards.filter(c => c.rarity.key === INTEL.rarity);
  cards.sort((a, b) => {
    const ra = getPrice(a), rb = getPrice(b);
    const pa = ra.value || 0, pb = rb.value || 0;
    if (INTEL.sort === 'value-desc') return pb - pa;
    if (INTEL.sort === 'value-asc')  return pa - pb;
    if (INTEL.sort === 'name')       return a.name.localeCompare(b.name);
    if (INTEL.sort === 'change') {
      const ta = priceTrend(ra), tb = priceTrend(rb);
      return (tb == null ? -1e9 : tb) - (ta == null ? -1e9 : ta);
    }
    return 0;
  });
  return cards;
}

function renderIntel() {
  const body = document.getElementById('intelBody');
  if (!body) return;
  document.querySelectorAll('.intel-tab').forEach(t =>
    t.classList.toggle('active', t.dataset.itab === INTEL.tab));

  if (INTEL.tab === 'explore') {
    const cards = getFilteredCards();
    body.innerHTML = `
      <div class="ic-filters">
        <input class="ic-search" id="icSearch" placeholder="Filter by name or set…" value="${INTEL.filter}" />
        <select class="ic-select" id="icRarity">
          ${['all','secret','ultra','holo','rare','uncommon','common'].map(r =>
            `<option value="${r}" ${INTEL.rarity===r?'selected':''}>${r==='all'?'All Rarities':r.toUpperCase()}</option>`).join('')}
        </select>
        <select class="ic-select" id="icSort">
          <option value="value-desc" ${INTEL.sort==='value-desc'?'selected':''}>Price: High → Low</option>
          <option value="value-asc"  ${INTEL.sort==='value-asc'?'selected':''}>Price: Low → High</option>
          <option value="change"     ${INTEL.sort==='change'?'selected':''}>Biggest movers</option>
          <option value="name"       ${INTEL.sort==='name'?'selected':''}>Name (A–Z)</option>
        </select>
        <span class="ic-count">${cards.length} cards</span>
      </div>
      <div class="ic-grid">${cards.map(intelCardTile).join('')}</div>`;
    document.getElementById('icSearch').addEventListener('input', e => { INTEL.filter = e.target.value; renderIntel(); setTimeout(()=>document.getElementById('icSearch').focus(),0); });
    document.getElementById('icRarity').addEventListener('change', e => { INTEL.rarity = e.target.value; renderIntel(); });
    document.getElementById('icSort').addEventListener('change', e => { INTEL.sort = e.target.value; renderIntel(); });
  }

  else if (INTEL.tab === 'compare') {
    const pool = allCardsWithRarity();
    const palette = ['#8a1fd6', '#10b981', '#ffd35a', '#e52e3a', '#4eb8ff'];
    const sel = INTEL.compare.map(k => pool.find(c => cardKey(c) === k)).filter(Boolean);
    let chart = '';
    if (sel.length) {
      const recs = sel.map(c => getPrice(c));
      const max  = Math.max(...recs.map(r => r.value || 0), 1);
      chart = `<div class="cmp-bars">
        ${sel.map((c, i) => {
          const r = recs[i];
          const pct = ((r.value || 0) / max) * 100;
          const tr = priceTrend(r);
          return `<div class="cmp-bar-row">
            <div class="cmp-bar-name">${r.name || c.name}<span>${(c.set||'').toUpperCase()} #${c.num}</span></div>
            <div class="cmp-bar-track"><div class="cmp-bar-fill" style="width:${pct.toFixed(1)}%;background:${palette[i%palette.length]}"></div></div>
            <div class="cmp-bar-val">${fmtUSD(r.value)}${r.isEst?' <em>est.</em>':''}${tr!=null?` <span class="${tr>=0?'up':'down'}">${tr>=0?'+':''}${tr.toFixed(1)}% 30d</span>`:''}</div>
          </div>`;
        }).join('')}
      </div>
      <div class="cmp-foot">Bars compare current market price (TCGplayer, USD). The 30-day change is the real Cardmarket 1-day vs 30-day average move. Open any card for the full sourced breakdown.</div>`;
    } else {
      chart = `<div class="ic-empty">Add 2–5 cards below to compare their real current market price.</div>`;
    }
    body.innerHTML = `
      <div class="cmp-wrap">
        <div class="cmp-head">Compare up to 5 cards by live market price — every figure is sourced.</div>
        ${chart}
        <div class="cmp-pool" id="cmpPool">
          ${pool.slice(0, 24).map(c => {
            const on = INTEL.compare.includes(cardKey(c));
            const cn = (PRICE_DATA[cardKey(c)] && PRICE_DATA[cardKey(c)].name) || c.name;
            return `<button class="cmp-chip ${on?'on':''}" data-key="${cardKey(c)}">${on?'✓ ':''}${cn}</button>`;
          }).join('')}
        </div>
      </div>`;
    document.querySelectorAll('.cmp-chip').forEach(b => b.addEventListener('click', () => {
      const k = b.dataset.key;
      const idx = INTEL.compare.indexOf(k);
      if (idx >= 0) INTEL.compare.splice(idx, 1);
      else if (INTEL.compare.length < 5) INTEL.compare.push(k);
      renderIntel();
    }));
  }

  else if (INTEL.tab === 'watchlist') {
    const pool = allCardsWithRarity();
    const watched = state.watchlist.map(k => pool.find(c => cardKey(c) === k)).filter(Boolean);
    body.innerHTML = watched.length
      ? `<div class="ic-grid">${watched.map(intelCardTile).join('')}</div>`
      : `<div class="ic-empty">Your watchlist is empty. Open a card and tap <b>Watch</b> to track its price here.</div>`;
  }

  else if (INTEL.tab === 'portfolio') {
    const coll = state.collection || [];
    if (!coll.length) {
      body.innerHTML = `<div class="ic-empty">No cards in your portfolio yet. Rip a pack and <b>Keep</b> a card to start tracking real value.</div>`;
    } else {
      let total = 0, estCount = 0;
      const byRar = {};
      coll.forEach(c => {
        const r = getPrice({ set: c.set, num: c.num, name: c.name, rarity: c.rarity });
        total += r.value || 0;
        if (r.isEst) estCount++;
        const rk = (c.rarity && c.rarity.key) || 'rare';
        byRar[rk] = (byRar[rk] || 0) + (r.value || 0);
      });
      const order  = ['secret','ultra','holo','rare','uncommon','common'];
      const labels = { secret:'SAR', ultra:'Ultra', holo:'Holo', rare:'Rare', uncommon:'Uncommon', common:'Common' };
      const colors = { secret:'#e52e3a', ultra:'#ffd35a', holo:'#c46bff', rare:'#4eb8ff', uncommon:'#10b981', common:'#6b7a99' };
      const maxR = Math.max(...Object.values(byRar), 1);
      body.innerHTML = `
        <div class="pf-summary">
          <div class="pf-big">
            <div class="pf-label">Portfolio Market Value</div>
            <div class="pf-value">${fmtUSD(total)}</div>
            <div class="pf-sub">Sum of current TCGplayer market price${estCount?` · ${estCount} estimated`:''}</div>
          </div>
          <div class="pf-stats">
            <div><div class="pf-s-val">${coll.length}</div><div class="pf-s-lbl">Cards</div></div>
            <div><div class="pf-s-val">${fmtUSD(total / coll.length)}</div><div class="pf-s-lbl">Avg / Card</div></div>
            <div><div class="pf-s-val">${Object.keys(byRar).length}</div><div class="pf-s-lbl">Rarities</div></div>
          </div>
        </div>
        <div class="pf-break">
          <div class="pf-break-h">Value by rarity</div>
          ${order.filter(k => byRar[k]).map(k => {
            const v = byRar[k], pct = (v / maxR) * 100;
            return `<div class="pf-break-row">
              <span class="pf-break-l">${labels[k]}</span>
              <div class="pf-break-track"><div class="pf-break-fill" style="width:${pct.toFixed(1)}%;background:${colors[k]}"></div></div>
              <span class="pf-break-v">${fmtUSD(v)}</span>
            </div>`;
          }).join('')}
        </div>
        <div class="pf-note">Values are live TCGplayer market prices via pokemontcg.io. Open any card for its verifiable source. No projected or simulated figures are shown.</div>
        <div class="ic-grid">${coll.map(c =>
          intelCardTile({ set: c.set, num: c.num, name: c.name, rarity: c.rarity })).join('')}</div>`;
    }
  }

  body.insertAdjacentHTML('afterbegin', priceBannerHTML());
  const pbR = document.getElementById('pbRetry');
  if (pbR) pbR.addEventListener('click', () => fetchRealPrices(true));

  // wire tile clicks → detail modal
  document.querySelectorAll('.ic-tile').forEach(t => t.addEventListener('click', () => {
    const k = t.dataset.key;
    const card = allCardsWithRarity().find(c => cardKey(c) === k);
    if (card) openCardDetail(card);
  }));
}

function openCardDetail(card) {
  const rec = getPrice(card);
  const an  = marketAnalysis(card, rec);
  const tr  = priceTrend(rec);
  const up  = tr == null ? null : tr >= 0;
  const watched = state.watchlist.includes(cardKey(card));
  const cm = rec.cm;
  const updated = rec.tcgUpdated || rec.cmUpdated;
  const nm = rec.name || card.name;   // real card name for this exact ID

  const printRows = (rec.prints && rec.prints.length)
    ? rec.prints.map(p => `
        <div class="id-pr-row">
          <span class="id-pr-v">${p.label}</span>
          <span class="id-pr-c">${fmtUSD(p.low)}</span>
          <span class="id-pr-c">${fmtUSD(p.market)}</span>
          <span class="id-pr-c">${fmtUSD(p.high)}</span>
        </div>`).join('')
    : `<div class="id-pr-row"><span class="id-pr-v">Rarity estimate</span><span class="id-pr-c">—</span><span class="id-pr-c">${fmtUSD(rec.value)}</span><span class="id-pr-c">—</span></div>`;

  const verifyBtn = rec.tcgUrl
    ? `<a class="id-verify" href="${rec.tcgUrl}" target="_blank" rel="noopener">Verify on TCGplayer ↗</a>`
    : `<a class="id-verify" href="https://www.tcgplayer.com/search/pokemon/product?q=${encodeURIComponent(nm)}" target="_blank" rel="noopener">Search TCGplayer ↗</a>`;
  const cmBtn = rec.cmUrl
    ? `<a class="id-verify alt" href="${rec.cmUrl}" target="_blank" rel="noopener">Cardmarket ↗</a>` : '';

  document.getElementById('intelDetail').innerHTML = `
    <div class="id-grid">
      <div class="id-card">
        <img src="${cardImg(card.set, card.num, true)}"
             onerror="this.onerror=null;this.src='${cardImg(card.set, card.num, false)}'"
             alt="${nm}" />
        <div class="id-card-actions">
          <button class="id-watch ${watched?'on':''}" id="idWatch">${watched?'♥ Watching':'♡ Watch'}</button>
          <button class="id-portfolio" id="idPortfolio">+ Portfolio</button>
        </div>
        ${verifyBtn}
        ${cmBtn}
      </div>
      <div class="id-main">
        <div class="id-head">
          <div>
            <div class="id-name">${nm}</div>
            <div class="id-set">${(card.set||'').toUpperCase()} #${card.num} · <span class="id-rar ${card.rarity.css}">${card.rarity.label}</span></div>
          </div>
          <div class="id-price">
            <div class="id-price-num">${fmtUSD(rec.value)}</div>
            <div class="id-price-chg ${up==null?'':up?'up':'down'}">${
              rec.isEst ? 'rarity estimate'
              : tr != null ? `${up?'+':''}${tr.toFixed(1)}% · 30d (Cardmarket)`
              : (rec.printing || 'market price')}</div>
          </div>
        </div>

        <div class="id-srcline">${
          rec.isEst
            ? 'Live data unavailable — the figure shown is a flagged estimate, not a quote.'
            : `Source: TCGplayer${rec.printing?` · ${rec.printing}`:''} via pokemontcg.io${updated?` · updated ${updated}`:''}`}</div>

        <div class="id-chart-label">TCGplayer price range (real)</div>
        <div class="id-rangewrap">
          ${rangeBar(rec.low, rec.value, rec.high, 560, 40)}
          <div class="id-range-lbls">
            <span>Low ${fmtUSD(rec.low)}</span>
            <span>Market ${fmtUSD(rec.market)}</span>
            <span>High ${fmtUSD(rec.high)}</span>
          </div>
        </div>

        <div class="id-cond">
          <div class="id-pr-head"><span>Printing</span><span>Low</span><span>Market</span><span>High</span></div>
          ${printRows}
        </div>

        ${cm ? `
        <div class="id-chart-label">Cardmarket average sale price (real · EUR)</div>
        <div class="id-cm">
          <div class="id-cm-grid">
            <div><div class="id-s-val">${fmtEUR(cm.avg30)}</div><div class="id-s-lbl">30-day avg</div></div>
            <div><div class="id-s-val">${fmtEUR(cm.avg7)}</div><div class="id-s-lbl">7-day avg</div></div>
            <div><div class="id-s-val">${fmtEUR(cm.avg1)}</div><div class="id-s-lbl">1-day avg</div></div>
            <div><div class="id-s-val">${fmtEUR(cm.trend)}</div><div class="id-s-lbl">Trend</div></div>
            <div><div class="id-s-val">${fmtEUR(cm.low)}</div><div class="id-s-lbl">Low</div></div>
          </div>
          ${trendDots(cm, 560, 64)}
        </div>` : ''}

        <div class="id-analysis">
          <div class="id-an-head">
            <span class="id-an-title">Market Read</span>
            <span class="id-an-tag ${an.sentiment.toLowerCase()==='neutral'?'stable':an.sentiment.toLowerCase()}">${an.sentiment}</span>
          </div>
          <p class="id-an-text">${an.text}</p>
        </div>

        <div class="id-attr">
          Data: Pokémon TCG API (<a href="https://pokemontcg.io" target="_blank" rel="noopener">pokemontcg.io</a>) — aggregating TCGplayer (USD) &amp; Cardmarket (EUR). Use the buttons on the left to verify this card's price directly at the source.
        </div>
      </div>
    </div>`;

  document.getElementById('intelModal').classList.add('open');
  document.body.classList.add('modal-open');

  document.getElementById('idWatch').addEventListener('click', () => {
    const k = cardKey(card);
    const i = state.watchlist.indexOf(k);
    if (i >= 0) state.watchlist.splice(i, 1); else state.watchlist.push(k);
    saveInventory();
    openCardDetail(card); // re-render button state
    renderIntel();
  });
  document.getElementById('idPortfolio').addEventListener('click', () => {
    const exists = state.collection.find(c => c.set === card.set && c.num === card.num);
    if (!exists) {
      state.collection.unshift({ id: Math.random().toString(36).slice(2,9), set: card.set, num: card.num, name: nm, rarity: card.rarity, img: cardImg(card.set,card.num,true), imgFallback: cardImg(card.set,card.num,false) });
      saveInventory();
    }
    document.getElementById('idPortfolio').textContent = '✓ In Portfolio';
    renderIntel();
  });
}

(function wireIntel() {
  document.querySelectorAll('.intel-tab').forEach(tab => {
    tab.addEventListener('click', () => { INTEL.tab = tab.dataset.itab; renderIntel(); });
  });
  const close = document.getElementById('intelModalClose');
  if (close) close.addEventListener('click', () => {
    document.getElementById('intelModal').classList.remove('open');
    document.body.classList.remove('modal-open');
  });
  const modal = document.getElementById('intelModal');
  if (modal) modal.addEventListener('click', e => {
    if (e.target === modal) {
      modal.classList.remove('open');
      document.body.classList.remove('modal-open');
    }
  });
})();

// ---------- INIT ----------

renderHeroCards();
renderRealPackGrid('all');
renderQueue();
renderTicker();
renderHitBoard();
if (document.getElementById('marketplaceList')) renderMarketplace();

renderCategoryStrip();
renderRightPanel();
renderCardsGrid();
renderLiveChat();
renderIntel();
runHeroStatsCountUp();
fetchRealPrices();   // load real, verifiable TCGplayer/Cardmarket prices
