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
  { set: 'sv3pt5', num: '199',  name: 'Charizard ex',     stock: 3  },
  { set: 'sv4pt5', num: '233',  name: 'Charizard SAR',    stock: 1  },
  { set: 'base1',  num: '4',    name: 'Charizard 1999',   stock: 2  },
  { set: 'sv3pt5', num: '151',  name: 'Mew',              stock: 7  },
  { set: 'sv3pt5', num: '193',  name: 'Mew ex',           stock: 5  },
  { set: 'sv4pt5', num: '184',  name: 'Charizard ex',     stock: 8  },
  { set: 'sv3pt5', num: '187',  name: 'Alakazam ex',      stock: 14 },
  { set: 'sv3pt5', num: '150',  name: 'Mewtwo',           stock: 22 },
  { set: 'sv3pt5', num: '25',   name: 'Pikachu',          stock: 47 },
  { set: 'sv3pt5', num: '143',  name: 'Snorlax',          stock: 11 },
  { set: 'sv3pt5', num: '6',    name: 'Charizard',        stock: 4  },
  { set: 'sv4pt5', num: '237',  name: 'Mimikyu ex SAR',   stock: 0  }, // sold out for drama
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
    state.freeUsed   = !!saved.freeUsed;
  } catch (e) {
    state.coins = 9999; state.collection = []; state.packs = []; state.listings = []; state.freeUsed = false;
  }
}

function saveInventory() {
  try {
    localStorage.setItem(invKey(state.wallet), JSON.stringify({
      coins: state.coins,
      collection: state.collection,
      packs: state.packs,
      listings: state.listings,
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
      ${isLastOne ? '<div class="rp-fire">▶ LAST ONE</div>' : ''}
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
            <span class="rp-row-label">💵 MARKET</span>
            <span class="rp-row-val">${fmtUSD(p.marketUSD)}<small> USD</small></span>
          </div>`}
          <div class="rp-row rp-burn-row">
            <span class="rp-row-label">▶ BURN</span>
            <span class="rp-row-val">${fmt(p.burn)}<small> $RIP</small></span>
          </div>
          <div class="rp-row rp-sol-row">
            <span class="rp-row-label">+ FEE</span>
            <span class="rp-row-val">${p.sol.toFixed(2)}<small> SOL</small></span>
          </div>
          <div class="rp-divider"><span>OR</span></div>
          <div class="rp-row rp-solpay-row">
            <span class="rp-row-label">◎ SOL ALL-IN</span>
            <span class="rp-row-val">${p.solAllIn.toFixed(3)}<small> SOL</small></span>
          </div>
        </div>
        <div class="rp-btn-row">
          <button class="pixel-btn primary rp-btn" data-pack-id="${p.id}" data-pay="rip">▶ RIP w/ $RIP</button>
          <button class="pixel-btn ghost rp-btn rp-btn-sol" data-pack-id="${p.id}" data-pay="sol">◎ RIP w/ SOL</button>
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
  HERO_CARDS.forEach((c, i) => {
    const stockClass = c.stock === 0 ? 'sold' : c.stock <= 3 ? 'low' : c.stock <= 10 ? 'mid' : 'high';
    const stockLabel = c.stock === 0 ? 'SOLD OUT' : `${c.stock} left`;
    const div = document.createElement('div');
    div.className = `hc hc${i + 1}`;
    div.innerHTML = `
      <img src="${cardImg(c.set, c.num, true)}"
           onerror="this.onerror=null;this.src='${cardImg(c.set, c.num, false)}'"
           alt="${c.name}" loading="${i < 4 ? 'eager' : 'lazy'}" />
      <span class="hc-stock stock-${stockClass}">
        <span class="dot"></span>${stockLabel}
      </span>
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
    lines.push(`<span class="tick-item">▶ <b>${handle}</b> ripped <b>${pack}</b> · burned <b>${burn} $RIP</b></span>`);
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
        <button class="pixel-btn ghost hit-clip">▶ clip</button>
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
      <div class="ft-icon">🪙</div>
      <h3>FREE RIP USED</h3>
      <p>your one free sim is consumed. to rip another, pay with <b>$RIP</b> or <b>SOL</b>.</p>
      ${pack ? `
        <p class="ft-pack-line">selected: <b>${packName}</b> · ${ripPrice} $RIP <small>or</small> ◎ ${solPrice} SOL</p>
      ` : '<p class="ft-soon">token launching on <b>pump.fun</b> soon</p>'}
      <div class="ft-actions">
        ${pack ? `
          <button class="pixel-btn primary" id="ftPaySol">◎ PAY ${solPrice} SOL ▶</button>
          <a class="pixel-btn ghost" href="https://pump.fun" target="_blank" rel="noopener">BUY $RIP</a>
        ` : `
          <a class="pixel-btn primary" href="https://pump.fun" target="_blank" rel="noopener">BUY $RIP ▶</a>
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
    el.innerHTML = `
      <div class="pack-art">
        <img class="pack-logo" src="${setLogo(p.logoSet)}" alt="${p.name}" onerror="this.style.opacity=0.15" />
        <div class="pack-name">${p.name}</div>
        <div class="pack-tag">${p.tag}</div>
      </div>
      <div class="pack-cost">▶ free sim · ${fmtUSD(p.marketUSD)} IRL</div>
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

function setupRipScreen(pack) {
  ripClicks = 0;
  ripTorn = false;
  const front = $('packFront');
  $('packStage').className = `pack-3d`;
  $('packStage').style.setProperty('--accent', pack.accent);
  front.style.background = `linear-gradient(160deg, ${pack.accent}cc 0%, #061222 100%)`;
  front.innerHTML = `
    <img class="pack-face-logo" src="${setLogo(pack.logoSet)}" alt="${pack.name}" onerror="this.style.opacity=0.25" />
    <div class="face-name">${pack.name}</div>
    <div class="face-jp">${pack.nameJp}</div>
  `;
  $('ripBtn').disabled = false;
  $('ripBtn').textContent = '▼ RIP IT ▼';
  $('ripHint').textContent = 'mash to tear it open';
}

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

$('ripBtn').addEventListener('click', () => {
  if (ripTorn) return;
  ripClicks++;
  const stage = $('packStage');

  // escalate charge level on the pack
  stage.classList.remove('charge-1', 'charge-2', 'charge-3', 'shaking');
  if (ripClicks === 1) stage.classList.add('charge-1');
  else if (ripClicks === 2) stage.classList.add('charge-2');
  else if (ripClicks === 3) stage.classList.add('charge-3');

  // immediate ring pulse for click feedback
  const ringColor = ripClicks === 3 ? 'gold' : ripClicks === 2 ? 'pink' : '';
  spawnEnergyRing(stage, ringColor);

  $('ripHint').textContent = ripClicks < 3 ? `${3 - ripClicks} more...` : 'RIIIIIP!';

  if (ripClicks >= 3) {
    ripTorn = true;
    tearPack();
  }
});

function tearPack() {
  $('ripBtn').disabled = true;

  // ROLL FIRST so the animation knows the best pull and can scale intensity
  const pack = PACKS.find(p => p.id === state.selectedPackId);
  state.pulled = rollPack(pack);
  state.revealIdx = 0;
  state.freeUsed = true;
  save();

  // determine peak rarity → drives the cinematic
  let bestRank = 0;
  state.pulled.forEach(c => {
    const r = RARITIES.findIndex(rr => rr.key === c.rarity.key);
    if (r > bestRank) bestRank = r;
  });
  const bestKey = RARITIES[bestRank].key;

  playMegaRip(bestKey).then(() => {
    showScreen('reveal');
    showCurrentCard();
  });
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
    $('nextCardBtn').textContent = (state.revealIdx + 1 >= state.pulled.length) ? 'SEE PULLS ▶' : 'NEXT ▶';
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

// ---------- INIT ----------
renderHeroCards();
renderRealPackGrid('all');
renderQueue();
renderTicker();
renderHitBoard();
renderMarketplace();
