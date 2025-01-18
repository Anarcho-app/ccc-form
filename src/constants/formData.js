export const initialFormData = {
  white: [],
  black: [],
  nativeAmerican: [],
  africanDiaspora: [],
  asian: [],
  pacificIslander: [],
  other: '',
  delineation: []
};

export const initialOtherValues = {
  white: '',
  black: '',
  nativeAmerican: '',
  africanDiaspora: '',
  asian: '',
  pacificIslander: '',
  other: '',
  delineation: ''
};

export const COLORS = [
  '#EDD3BA', '#F2D2B9', '#F4D1BE', '#F7D0C1', '#FBCFC2', '#FDCEC6',
  '#E6C3A3', '#E8C1A2', '#EEC0A8', '#EFBFA8', '#F5BCAB', '#F7BBB1',
  '#D9B38C', '#DEB08E', '#E4AF8F', '#E9AD95', '#EAAC97', '#EEAA9D',
  '#CDA275', '#D2A179', '#D99E76', '#DD9C80', '#E09985', '#E59989',
  '#BC9260', '#C48F63', '#CA8C67', '#CF896F', '#D38970', '#D8867A',
  '#AE804F', '#B27D51', '#B97B56', '#BC7A5A', '#C2785D', '#C77665',
  '#9A713D', '#9F6F3F', '#A76B46', '#AB6B48', '#B06850', '#B06454',
  '#8A602E', '#8D5E34', '#925A35', '#995A39', '#9A563F', '#9F5645',
  '#755024', '#7A4C28', '#7D4B28', '#80492B', '#844732', '#884535',
  '#5F3F19', '#613D1B', '#643B1D', '#6A3B21', '#703827', '#71372B',
  '#492F14', '#4A2F14', '#4D2D16', '#512A19', '#532919', '#572822'
];

export const sectionTitles = {
  white: '1. White or European American (50) - 1000-1999:',
  black: '2. Black or American Negro (Americas/Tri-Racials) (9) - 3000-3099:',
  nativeAmerican: '3. American Indian or Alaska Native (64) - 5000-6999:',
  africanDiaspora: '4. African Diaspora (54) - 3100-3404:',
  asian: '5. Asian (please specify sub-group if known) (32) - 4000-4999:',
  pacificIslander: '6. Native Hawaiian and Other Pacific Islander (9) - 7500-7999:',
  other: '7. Some other race - 8000-8999:',
  delineation: 'Preferred Disaggration(s) or Delineation(s)?'
};

export const ETHNICITY_DATA = {
  white: [
    { label: 'German (Germanic-1180, Vandili-1180, Suebi-1180, Istvaeones-1180, Irminones-1180, Basternae-1180)', value: '1171' },
    { label: 'Irish (Anglo-Normans, Gaelic people)', value: '1201' },
    { label: 'Scottish (Celtic peoples-1080, the Picts and Gaels)', value: '1320' },
    { label: 'English (Angles-1840, Saxons-1174, and Jutes)', value: '1121' },
    { label: 'French (Belgae, Celtic-1080, Italic, Gauls, Romans)', value: '1156' },
    { label: 'Dutch (Franks, Alamanni, Batavi, Chauci, Chamavi and Chattuarii, Vandals & Saxons)', value: '1115' },
    { label: 'Spanish (Sephardic Jews, Suebi, Alans and Vandals & Visigoths)', value: '2000' },
    { label: 'Latin American (Latin-2600-2609, Latino-2620, Latinx-2621, Mesoamerican Indian/Hispanic-2690, Mestizo-2791)', value: '2600' },
    { label: 'Portuguese (Suebi, Visigoths and Buri)', value: '1290' },
    { label: 'Italian (Etruscans, Latin, Sicilian, Italics, Gallic, Greeks & Romans)', value: '1206' },
    { label: 'Polish (Polans, Goplans, Lendions, Masovians, Visutulons)', value: '1286' },
    { label: 'Scandinavian (Swedes, Danes, Geats, Gutes and Rugii)', value: '1310' },
    { label: 'Russian (Ukrainias-1375, Tatars-1365, Chechens, Bashkirs, Chuvash, Avars)', value: '1305' }
  ],
  black: [
    { label: 'Descendants of the Transatlantic Slave Trade (American Black-3020)', value: '3020' },
    { label: 'Descendants of Intra-American Slave Trade (American Negro-3025, American Gullah Geechee-3030, Yamasee)', value: '3025' },
    { label: 'American Creole', value: '8130' },
    { label: 'Arawak (e.g. Meso-American-2690)', value: '6919' },
    { label: 'Carib (e.g., Jamaican-3446, Haitian-3441)', value: '6961' },
    { label: 'Taino (e.g., Afro.Latino-2500, Garifuna-2510)', value: '6962' },
    { label: 'Cuban', value: '6965' }
  ],
  nativeAmerican: [
    { label: 'Na-Dene - (Navajo-5999, White Mountain-5261, Mescalero-5519, Jicarilla-5517, San Carlos-5520)', value: '5999' },
    { label: 'Iroquoian - (Cherokee-5599, Tuscarora-5874, Erie, Susquehanna-5806)', value: '5599' },
    { label: 'Algonkian - (Powhatan-6162, Shawnee-6269, Cahokia, Miami-5952, Kickapoo-5886, Ojibwa-6521)', value: '6162' },
    { label: 'Gulf - (Choctaw-5689, Chickasaw-5635, Tohome, Chatot, Coweta, Muscogee-5735, Atakapa-5786, Natchez-5796, Alabama-5743)', value: '5689' },
    { label: 'Caddoan - (Pawnee-6085, Wichita-6395, Caddo-5551, Tawakoni, Hasinai)', value: '6085' },
    { label: 'Aztec-Tanoan - (Comanche-5716, Kiowa-5891, Hopi-5851, Pima-6102, Ute, Shoshoni-6283)', value: '5716' },
    { label: 'Floridan - (Timucua, Calusa)', value: '5000' },
    { label: 'Timucua - (Cheyenne-5619, Arapaho-5524, Blackfoot-5536, Gros Ventre-5833)', value: '5619' },
    { label: 'Salish (Plateau/NW) - (Spokane-6322, Kalispel-5880, Flathead-6238, Columbia-6015)', value: '6322' },
    { label: 'Siouan-Yuchi - (Osage-6029, Quapaw-6214, Catawba-5586, Crow-5752, Yanktonai-6318, Santee-5804, Yankton-6318, Iowa-5858)', value: '6029' },
    { label: 'Pentu (Californian) - (Miwok-5969, Cotanoan, Maidu-5926, Yokuts-6430, Modoc-5979, Klamath-5896, Yakima, Cayuse-5588, Palus)', value: '5969' },
    { label: 'Hokan-Coahuiltecan (Californian) - (Yavapai-6451, Chumash-5701, Achomawi, Pomo-6117)', value: '6451' }
  ],
  africanDiaspora: [
    { label: 'Moroccan (Riffians, the Zayanes, and the Cheluh/Shilhah)', value: '7181' },
    { label: 'Nigerians (Hausa, Yoruba-3237, Igbo-3238, Fulani-3400, Ibibio, Ijaw, Kanuri, Tiv, Awori)', value: '3236' },
    { label: 'Ghanaians (Akan, Mole-Dagbon, Ewe, Ga-Dangme, Gurma, Guan, Grusi, Mande-Busanga)', value: '3180' },
    { label: 'Senegalese (Wolof, Fula, Serer, Jola, Mandinka, Soninke, Bassari)', value: '3255' },
    { label: 'Congolese (Bantu, Nilotic, Sudanese, and Pygmy)', value: '3145' },
    { label: 'Liberians (Kpelle, Bassa, Grebo, Krahn, Vai, Dan, Mano, Gio)', value: '3200' },
    { label: 'Ethiopians (Oromo, Amhara, Somali-3266, Tigrayans, Gurage, Sidama, Welayta, Afra, Hadiya, Gamo)', value: '3166' },
    { label: 'South African (Zulu, Xhosa, Khoi, San)', value: '3270' }
  ],
  asian: [
    { label: 'Chinese (Han, Zhuang, Uyghur, Hui, Miao, Cantonese, Hakka)', value: '4020' },
    { label: 'Bhārat (Hindi, Bengali, Marathi, Telugu, Tamil, Gujarati, Kannada, Punjabi-4224, Malayalam-4480)', value: '4220' },
    { label: 'Korean (Goguryeo, Baekje, and Sill)', value: '4050' },
    { label: 'Vietnamese (Tay, Muong, Cham, Nùng, Brau, Bru, Hmong, Kinh, Hoa)', value: '4520' },
    { label: 'Japanese (Yamoto, Ainu, Ryukyuan, Emishi, Hayato)', value: '4040' }
  ],
  pacificIslander: [
    { label: 'Samoan (Upolu, Savai\'i, Manono, Apolima)', value: '7550' },
    { label: 'Hawaiian', value: '7530' },
    { label: 'Tongan (BaTonga, Niuatoputapu)', value: '7561' },
    { label: 'Fijian (Indo-Fijians-7712, Rotumans)', value: '7711' }
  ]
};

export const DELINEATION_OPTIONS = [
  { label: 'By fingerprint (300,000,000+ ->billions)', value: '300000000' },
  { label: 'By family (85,000,000+)', value: '85000000' },
  { label: 'By surnames (150,000+)', value: '150000' },
  { label: 'By neighborhoods (26,000+)', value: '26000' },
  { label: 'By counties (3,000+)', value: '3000' },
  { label: 'By ideology (1,000+)', value: '1000' },
  { label: 'By tribes (575+)', value: '575' },
  { label: 'By ethnicities/ancestry (225+)', value: '225' },
  { label: 'By religion/denominations (200+)', value: '200' },
  { label: 'By nations/countries (195+)', value: '195' },
  { label: 'By age group (100+)', value: '100' },
  { label: 'By phenotypes/skintones (66)', value: '66' },
  { label: 'By state (50+)', value: '50' },
  { label: 'By haplogroups (18yDNA+26mtDNA)=(44+)', value: '44' },
  { label: 'By education attainment levels (9+)', value: '9' },
  { label: 'By race (outside of human) (7+)', value: '7' },
  { label: 'By citizen status (5+)', value: '5' },
  { label: 'By marital status (4+)', value: '4' },
  { label: 'By voter status (2+)', value: '2v' },
  { label: 'By gender (2+)', value: '2g' },
  { label: 'By human race (1)', value: '1' }
];
