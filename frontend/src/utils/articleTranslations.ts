import { Article } from '../types';
import { Language } from './translations';

export interface TranslatedArticleFields {
  title: string;
  excerpt?: string;
  content?: string;
  author_name?: string;
}

export const ARTICLE_TRANSLATIONS: Record<string, Record<Language, TranslatedArticleFields>> = {
  'nirbhid-news-website-launch': {
    mr: {
      title: "'निर्भीड न्यूज'च्या अधिकृत डिजिटल न्यूज पोर्टलचे भव्य लोकार्पण; मुख्य संपादक राहुल जोगदंड यांच्या नेतृत्वाखाली निष्पक्ष पत्रकारितेची नवी सुरुवात",
      excerpt: 'महाराष्ट्रातील जनतेसाठी २४ तास सत्य, अचूक आणि निर्भीड बातम्या पोहोचवणारे आधुनिक डिजिटल न्यूज व्यासपीठ आजपासून जनसेवेत रुजू.',
      author_name: 'राहुल जोगदंड (मुख्य संपादक)',
      content: `# 'निर्भीड न्यूज'च्या डिजिटल पोर्टलचे दिमाखात लोकार्पण

महाराष्ट्रातील अग्रगण्य डिजिटल माध्यम समूह **'निर्भीड न्यूज'** च्या अधिकृत डिजिटल न्यूज वेबसाईट व आधुनिक वेब पोर्टलचे आज मुख्य संपादक **राहुल जोगदंड** यांच्या शुभहस्ते भव्य लोकार्पण करण्यात आले.

> "सत्य, अचूकता आणि निर्भीडपणा हीच आमची ओळख आहे. कोणत्याही राजकीय अथवा आर्थिक दबावाला बळी न पडता सर्वसामान्य नागरिकांचे प्रश्न शासन दरबारी मांडणे हेच निर्भीड न्यूजचे सर्वोच्च ध्येय आहे." — राहुल जोगदंड (मुख्य संपादक)

### वेबसाईटची प्रमुख वैशिष्ट्ये:
- **२४ तास थेट प्रवाह (Live 24x7):** ताज्या घडामोडींचे अविरत थेट प्रक्षेपण.
- **AI बातमी सारांश (AI Quick Summary):** लांबलचक बातम्यांचा सेकंदात अचूक ३-मुद्द्यांचा सारांश.
- **AI ऑडिओ वाचक (AI Voice Reader):** बातमी वाचण्यासोबत ऐकण्याची आधुनिक सोय.
- **त्रिभाषिक बातमी सेवा:** मराठी, हिंदी व इंग्रजी भाषेत एका क्लिकवर सहज वाचन.
- **विभागवार सखोल विश्लेषण:** महाराष्ट्र, मुंबई, ठाणे, राजकारण, गुन्हेगारी, क्रीडा, मनोरंजन व तंत्रज्ञान.

सर्व वाचक, प्रेक्षक आणि हितचिंतकांचे मनःपूर्वक आभार! निष्पक्ष आणि रोकठोक पत्रकारितेसाठी नेहमी जोडलेले राहा.`,
    },
    en: {
      title: 'Grand Launch of Nirbhid News Official Digital News Portal & Web Platform under Chief Editor Rahul Jogdand',
      excerpt: 'State-of-the-art 24/7 digital journalism portal officially goes live across Maharashtra, dedicated to fearless, unfiltered public interest reporting.',
      author_name: 'Rahul Jogdand (Chief Editor)',
      content: `# Grand Digital Launch of 'Nirbhid News' Web Portal

Leading digital news and investigative journalism network **'Nirbhid News'** has officially launched its modern digital news website and platform under the visionary leadership of Founder & Chief Editor **Rahul Jogdand**.

> "Truth, precision, and fearlessness define our journalism. Our mission is to raise citizens' voices without yielding to any political or financial pressure." — Rahul Jogdand (Chief Editor)

### Key Platform Highlights:
- **24/7 Live Stream:** Continuous real-time news broadcasts.
- **AI News Intelligence:** Instant 3-point verified summaries for fast reading.
- **AI Voice Reader:** High-clarity native audio news narration.
- **Tri-lingual Switcher:** Instant seamless reading in Marathi, English, and Hindi.
- **Dedicated Categories:** Comprehensive coverage across Maharashtra, Mumbai, Politics, Business, Crime, and Tech.

We extend our heartfelt gratitude to all our readers, viewers, and supporters across Maharashtra and beyond!`,
    },
    hi: {
      title: "'निर्भीड न्यूज' के आधिकारिक डिजिटल पोर्टल और वेबसाइट का भव्य शुभारंभ; मुख्य संपादक राहुल जोगदंड के नेतृत्व में निष्पक्ष पत्रकारिता",
      excerpt: 'महाराष्ट्र की जनता के लिए २४ घंटे सत्य, सटीक और निर्भीक समाचार पहुंचाने वाला आधुनिक डिजिटल न्यूज प्लेटफॉर्म आज से शुरू।',
      author_name: 'राहुल जोगदंड (मुख्य संपादक)',
      content: `# 'निर्भीड न्यूज' के डिजिटल पोर्टल का भव्य लोकार्पण

महाराष्ट्र के अग्रणी डिजिटल मीडिया नेटवर्क **'निर्भीड न्यूज'** की आधिकारिक समाचार वेबसाइट और पोर्टल का आज मुख्य संपादक **राहुल जोगदंड** के करकमलों द्वारा भव्य शुभारंभ किया गया।

> "सत्य, सटीकता और निर्भीकता ही हमारी पहचान है। बिना किसी दबाव के जनता के मुद्दे शासन तक पहुंचाना ही निर्भीड न्यूज का प्रमुख उद्देश्य है।" — राहुल जोगदंड (मुख्य संपादक)

### वेबसाइट की प्रमुख विशेषताएं:
- **२४x७ लाइव प्रसारण:** ताजातरीन खबरों का निरंतर लाइव स्ट्रीम।
- **AI समाचार सारांश:** सेकंडों में ३-बिंदु सटीक एआई सारांश।
- **AI वॉयस रीडर:** समाचार पढ़ने के साथ-साथ सुनने की आधुनिक सुविधा।
- **त्रिभाषी समाचार सेवा:** मराठी, हिंदी व अंग्रेजी में आसान पठन।
- **श्रेणीवार कवरेज:** महाराष्ट्र, मुंबई, राजनीति, अपराध, खेल, मनोरंजन और तकनीकी जगत।

सभी पाठकों और शुभचिंतकों का हार्दिक आभार! निष्पक्ष और बेबाक पत्रकारिता के लिए जुड़े रहें।`,
    },
  },
  'mumbai-metro-3-aarey-bkc-passenger-surge': {
    mr: {
      title: 'मुंबई मेट्रो ३ आरे-बीकेसी टप्प्याला प्रवाशांचा उत्स्फूर्त प्रतिसाद; दैनंदिन प्रवासी संख्येत विक्रमी वाढ',
      excerpt: 'भूमिगत मेट्रो सुरू झाल्यामुळे पश्चिम उपनगरांतील रस्ते वाहतुकीवरील ताण २५ टक्क्यांनी कमी झाल्याचा प्राथमिक अंदाज.',
      author_name: 'प्रिया कांबळे (मुंबई ब्युरो)',
      content: `# मुंबईच्या वेगवान प्रवासाला मेट्रो ३ ची साथ

मुंबईकरांचे बहुप्रतिक्षित स्वप्न असलेली **अंडरग्राउंड मेट्रो ३ (अक्वा लाईन)** चा आरे ते बीकेसी टप्पा सुरू झाल्यानंतर पहिल्याच आठवड्यात प्रवाशांची संख्या दररोज १.५ लाखांवर पोहोचली आहे.

> "अंधेरी, सीपझ आणि बीकेसीमधील आयटी व कॉर्पोरेट कर्मचाऱ्यांना या मेट्रो सेवेचा प्रचंड फायदा होत असून प्रवासाचा वेळ ४५ मिनिटांवरून अवघ्या १५ मिनिटांवर आला आहे."`,
    },
    en: {
      title: 'Mumbai Metro Line 3 Aarey-BKC Phase Sees Massive Rider Surge; Daily Footfall Breaks Records',
      excerpt: 'The underground metro corridor cuts Western Suburbs road congestion by an estimated 25% during morning and evening rush hours.',
      author_name: 'Priya Kamble (Mumbai Bureau)',
      content: `# Fast & Seamless Commuting with Mumbai Metro Line 3

The newly inaugurated underground **Metro Line 3 (Aqua Line)** connecting Aarey Colony to the Bandra-Kurla Complex (BKC) recorded over 150,000 daily commuters in its inaugural operational week.

> "Corporate and IT professionals commuting between Andheri, SEEPZ, and BKC are experiencing dramatic transit time reductions from 45 minutes to just 15 minutes."`,
    },
    hi: {
      title: 'मुंबई मेट्रो लाइन ३ आरे-बीकेसी खंड को मिला भारी समर्थन; दैनिक यात्रियों में रिकॉर्ड वृद्धि',
      excerpt: 'भूमिगत मेट्रो शुरू होने से पश्चिमी उपनगरों में सड़क यातायात का दबाव २५ प्रतिशत तक कम होने का अनुमान।',
      author_name: 'प्रिया कांबले (मुंबई ब्यूरो)',
      content: `# मुंबई की नई लाइफलाइन: अंडरग्राउंड मेट्रो ३

मुंबई मेट्रो लाइन ३ के आरे-बीकेसी चरण के शुरू होते ही पहले हफ्ते में दैनिक यात्रियों की संख्या १.५ लाख के पार पहुंच गई है।`,
    },
  },
  'maharashtra-police-cyber-crime-busted': {
    mr: {
      title: 'सायबर गुन्हेगारीविरोधात महाराष्ट्र पोलिसांची मोठी कारवाई; आंतरराज्यीय टोळीचा पर्दाफाश',
      excerpt: 'डिजिटल अरेस्ट आणि बनावट शेअर मार्केट ॲप्सच्या नावाखाली कोट्यवधी रुपयांची फसवणूक करणाऱ्या टोळीला अटक.',
      author_name: 'सुनील पाटील (गुन्हे वार्ताहर)',
    },
    en: {
      title: 'Maharashtra Police Busts Inter-State Cyber Crime Gang in Massive Digital Fraud Crackdown',
      excerpt: 'Special task force arrests syndicate members involved in fraudulent stock trading apps and bogus digital arrest scams worth crores.',
      author_name: 'Sunil Patil (Crime Reporter)',
    },
    hi: {
      title: 'महाराष्ट्र पुलिस की बड़ी कार्रवाई: डिजिटल अरेस्ट और फर्जी ट्रेडिंग गिरोह का पर्दाफाश',
      excerpt: 'फर्जी शेयर बाजार ऐप और डिजिटल अरेस्ट के नाम पर करोड़ों की ठगी करने वाले अंतरराज्यीय गिरोह के सदस्य गिरफ्तार।',
      author_name: 'सुनील पाटिल (अपराध संवाददाता)',
    },
  },
  'indian-stock-market-sensex-record-high': {
    mr: {
      title: 'भारतीय शेअर बाजारात ऐतिहासिक तेजी; सेन्सेक्स ८२,००० पार, आयटी व बँकिंग शेअर्समध्ये तेजी',
      excerpt: 'परदेशी गुंतवणूकदारांचा वाढता ओघ आणि भक्कम आर्थिक विकास दरामुळे भारतीय बाजाराने नवा उच्चांक प्रस्थापित केला.',
      author_name: 'विक्रम मेहता (अर्थविषयक संपादक)',
    },
    en: {
      title: 'Indian Stock Market Hits Historic High; Sensex Surges Past 82,000 Led by Banking & IT',
      excerpt: 'Strong macroeconomic growth indicators and robust institutional inflows propel Indian equity benchmarks to record territory.',
      author_name: 'Vikram Mehta (Business Editor)',
    },
    hi: {
      title: 'भारतीय शेयर बाजार में ऐतिहासिक उछाल; सेंसेक्स ८२,००० के पार, बैंकिंग और आईटी में तेजी',
      excerpt: 'मजबूत आर्थिक विकास और विदेशी निवेश के दम पर भारतीय शेयर बाजार ने नया कीर्तिमान स्थापित किया।',
      author_name: 'विक्रम मेहता (व्यापार संपादक)',
    },
  },
  'indian-cricket-team-series-victory': {
    mr: {
      title: 'भारतीय क्रिकेट संघाचा शानदार विजय; कसोटी मालिकेत २-० अशी निर्विवाद आघाडी',
      excerpt: 'फलंदाजी आणि गोलंदाजीत अष्टपैलू कामगिरीच्या जोरावर भारताने प्रतिस्पर्धी संघावर एक डाव आणि ५० धावांनी विजय मिळवला.',
      author_name: 'महेश जोशी (क्रीडा प्रतिनिधी)',
    },
    en: {
      title: 'Team India Dominates Test Series with Emphatic 2-0 Lead After Comprehensive Victory',
      excerpt: 'All-round excellence with bat and ball guides India to an innings victory, strengthening its World Test Championship standings.',
      author_name: 'Mahesh Joshi (Sports Desk)',
    },
    hi: {
      title: 'भारतीय क्रिकेट टीम की शानदार जीत; टेस्ट सीरीज में २-० से बनाई अजेय बढ़त',
      excerpt: 'गेंदबाजी और बल्लेबाजी के शानदार प्रदर्शन के दम पर भारत ने एक पारी और ५० रनों से मुकाबला अपने नाम किया।',
      author_name: 'महेश जोशी (खेल संवाददाता)',
    },
  },
  'marathi-cinema-box-office-success': {
    mr: {
      title: 'मराठी चित्रपटसृष्टीत नवीन प्रयोग; ऐतिहासिक आणि सामाजिक चित्रपटांना बॉक्स ऑफिसवर पसंती',
      excerpt: 'सकस पटकथा, दर्जेदार दिग्दर्शन आणि दमदार अभिनयाच्या जोरावर प्रादेशिक चित्रपटांनी प्रेक्षकांची मने जिंकली.',
      author_name: 'अमृता चिटणीस',
    },
    en: {
      title: 'Marathi Cinema Strikes Gold at Box Office; Contemporary & Historical Narratives Win Audiences',
      excerpt: 'Strong scripts, nuanced storytelling, and exceptional acting talent drive regional Marathi films to major theatrical milestones.',
      author_name: 'Amruta Chitnis',
    },
    hi: {
      title: 'मराठी सिनेमा का बॉक्स ऑफिस पर डंका; ऐतिहासिक और सामाजिक फिल्मों को दर्शकों का भरपूर प्यार',
      excerpt: 'मजबूत कहानी, बेहतरीन निर्देशन और दमदार अभिनय के दम पर मराठी फिल्मों ने दर्शकों का दिल जीता।',
      author_name: 'अमृता चिटणीस',
    },
  },
  'isro-launches-next-gen-satellite': {
    mr: {
      title: 'भारताच्या अंतराळ मोहिमेत आणखी एक यश; इस्रोकडून पुढील पिढीच्या उपग्रहाचे यशस्वी प्रक्षेपण',
      excerpt: 'हवामान अंदाज, आपत्ती व्यवस्थापन आणि दळणवळण क्षेत्रात क्रांती घडवणारा प्रगत उपग्रह कक्षेत स्थापित.',
      author_name: 'डॉ. मंदार वैद्य (विज्ञान वार्ताहर)',
    },
    en: {
      title: 'ISRO Achieves Milestone with Successful Launch of Next-Generation Earth Observation Satellite',
      excerpt: 'Advanced spacecraft will revolutionize weather forecasting, disaster monitoring, and agricultural analytics across India.',
      author_name: 'Dr. Mandar Vaidya (Science Desk)',
    },
    hi: {
      title: 'अंतरिक्ष में भारत की नई छलांग; इसरो ने नेक्स्ट-जेनरेशन उपग्रह का किया सफल प्रक्षेपण',
      excerpt: 'सटीक मौसम पूर्वानुमान, आपदा प्रबंधन और कृषि क्षेत्र के लिए अत्यधिक लाभकारी उपग्रह कक्षा में स्थापित।',
      author_name: 'डॉ. मंदार वैद्य (विज्ञान संवाददाता)',
    },
  },
  'global-climate-summit-green-fund': {
    mr: {
      title: 'जागतिक हवामान परिषदेत नवी दिल्ली जाहीरनाम्याचे स्वागत; विकसनशील देशांसाठी हरित निधीची मागणी',
      excerpt: 'कार्बन उत्सर्जन कमी करण्यासाठी विकसित देशांनी आर्थिक व तांत्रिक सहाय्य देण्याची भारताची भूमिका सर्वमान्य.',
      author_name: 'संजय गोखले (आंतरराष्ट्रीय घडामोडी)',
    },
    en: {
      title: 'Global Climate Summit Endorses Green Transition Framework; India Champions Climate Finance for Developing Nations',
      excerpt: 'Developing countries urge developed economies to accelerate capital commitments and technology transfers for renewable energy.',
      author_name: 'Sanjay Gokhale (World Affairs)',
    },
    hi: {
      title: 'वैश्विक जलवायु सम्मेलन में हरित पहल का स्वागत; भारत ने विकासशील देशों के लिए उठाई आवाज़',
      excerpt: 'कार्बन उत्सर्जन घटाने और नवीकरणीय ऊर्जा को बढ़ावा देने के लिए विकसित देशों से वित्तीय सहायता की मांग।',
      author_name: 'संजय गोखले (अंतरराष्ट्रीय मामले)',
    },
  },
  'maharashtra-board-new-education-framework': {
    mr: {
      title: 'महाराष्ट्र राज्य माध्यमिक व उच्च माध्यमिक मंडळाचा नवीन शैक्षणिक आराखडा जाहीर',
      excerpt: '१०वी आणि १२वीच्या परीक्षा पद्धतीत कौशल्याधारित शिक्षणाला अधिक महत्त्व; प्रात्यक्षिक गुणांची पुनर्रचना.',
      author_name: 'प्रा. शशिकांत कुलकर्णी',
    },
    en: {
      title: 'Maharashtra State Education Board Unveils Modern Skill-Centric Curriculum Framework',
      excerpt: 'Curriculum overhaul emphasizes vocational skill training, practical assessments, and experiential learning for secondary students.',
      author_name: 'Prof. Shashikant Kulkarni',
    },
    hi: {
      title: 'महाराष्ट्र राज्य शिक्षा बोर्ड ने नया शैक्षणिक ढांचा किया जारी; कौशल विकास पर विशेष जोर',
      excerpt: '१०वीं और १२वीं के पाठ्यक्रम में व्यावहारिक शिक्षा और वोकेशनल ट्रेनिंग को प्राथमिकता दी जाएगी।',
      author_name: 'प्रो. शशिकांत कुलकर्णी',
    },
  },
  'health-immunity-tips-seasonal-wellness': {
    mr: {
      title: 'आरोग्य संजीवनी: बदलत्या ऋतूत प्रतिकारशक्ती वाढवण्यासाठी तज्ज्ञांचा बहुमोल सल्ला',
      excerpt: 'सकस आहार, नियमित व्यायाम आणि पुरेशी झोप या त्रिसूत्रीने हंगामी आजारांपासून दूर राहा.',
      author_name: 'डॉ. स्मिता पाटील (आरोग्य तज्ज्ञ)',
    },
    en: {
      title: 'Wellness & Immunity: Medical Experts Share Essential Guidelines for Seasonal Health',
      excerpt: 'Balanced nutrition, proper hydration, and daily physical activity form the cornerstone of natural immunity defense.',
      author_name: 'Dr. Smita Patil (Health Specialist)',
    },
    hi: {
      title: 'स्वास्थ्य संजीवनी: बदलते मौसम में रोग प्रतिरोधक क्षमता बढ़ाने के लिए विशेषज्ञों की सलाह',
      excerpt: 'संतुलित आहार, नियमित योग और पर्याप्त नींद से मौसमी बीमारियों से बचें।',
      author_name: 'डॉ. स्मिता पाटिल (स्वास्थ्य विशेषज्ञ)',
    },
  },
};

// Common journalistic titles & bylines dictionary
const AUTHOR_BYLINES_MAP: Record<string, { en: string; hi: string; mr: string }> = {
  'राजेश सावंत (विशेष प्रतिनिधी)': {
    mr: 'राजेश सावंत (विशेष प्रतिनिधी)',
    en: 'Rajesh Sawant (Special Correspondent)',
    hi: 'राजेश सावंत (विशेष संवाददाता)',
  },
  'नितीन देशमुख': {
    mr: 'नितीन देशमुख',
    en: 'Nitin Deshmukh',
    hi: 'नितिन देशमुख',
  },
  'प्रिया कांबळे (मुंबई ब्युरो)': {
    mr: 'प्रिया कांबळे (मुंबई ब्युरो)',
    en: 'Priya Kamble (Mumbai Bureau)',
    hi: 'प्रिया कांबले (मुंबई ब्यूरो)',
  },
  'आनंद कुलकर्णी (वरिष्ठ राजकीय विश्लेषक)': {
    mr: 'आनंद कुलकर्णी (वरिष्ठ राजकीय विश्लेषक)',
    en: 'Anand Kulkarni (Senior Political Analyst)',
    hi: 'आनंद कुलकर्णी (वरिष्ठ राजनीतिक विश्लेषक)',
  },
  'सुनील पाटील (गुन्हे वार्ताहर)': {
    mr: 'सुनील पाटील (गुन्हे वार्ताहर)',
    en: 'Sunil Patil (Crime Reporter)',
    hi: 'सुनील पाटिल (अपराध संवाददाता)',
  },
  'विक्रम मेहता (अर्थविषयक संपादक)': {
    mr: 'विक्रम मेहता (अर्थविषयक संपादक)',
    en: 'Vikram Mehta (Business Editor)',
    hi: 'विक्रम मेहता (व्यापार संपादक)',
  },
  'महेश जोशी (क्रीडा प्रतिनिधी)': {
    mr: 'महेश जोशी (क्रीडा प्रतिनिधी)',
    en: 'Mahesh Joshi (Sports Desk)',
    hi: 'महेश जोशी (खेल संवाददाता)',
  },
  'अमृता चिटणीस': {
    mr: 'अमृता चिटणीस',
    en: 'Amruta Chitnis',
    hi: 'अमृता चिटणीस',
  },
  'डॉ. मंदार वैद्य (विज्ञान वार्ताहर)': {
    mr: 'डॉ. मंदार वैद्य (विज्ञान वार्ताहर)',
    en: 'Dr. Mandar Vaidya (Science Desk)',
    hi: 'डॉ. मंदार वैद्य (विज्ञान संवाददाता)',
  },
  'संजय गोखले (आंतरराष्ट्रीय घडामोडी)': {
    mr: 'संजय गोखले (आंतरराष्ट्रीय घडामोडी)',
    en: 'Sanjay Gokhale (World Affairs)',
    hi: 'संजय गोखले (अंतरराष्ट्रीय मामले)',
  },
  'प्रा. शशिकांत कुलकर्णी': {
    mr: 'प्रा. शशिकांत कुलकर्णी',
    en: 'Prof. Shashikant Kulkarni',
    hi: 'प्रो. शशिकांत कुलकर्णी',
  },
  'डॉ. स्मिता पाटील (आरोग्य तज्ज्ञ)': {
    mr: 'डॉ. स्मिता पाटील (आरोग्य तज्ज्ञ)',
    en: 'Dr. Smita Patil (Health Specialist)',
    hi: 'डॉ. स्मिता पाटिल (स्वास्थ्य विशेषज्ञ)',
  },
};

// ============================================================================
// DYNAMIC TRANSLATION ENGINE (CACHE + DEDUPLICATION + NOTIFICATION SUBSCRIBERS)
// ============================================================================
const MEMORY_CACHE = new Map<string, TranslatedArticleFields>();
const IN_FLIGHT = new Map<string, Promise<TranslatedArticleFields | null>>();
type TranslationListener = () => void;
const listeners = new Set<TranslationListener>();

let notifyTimer: ReturnType<typeof setTimeout> | null = null;
function scheduleNotify() {
  if (notifyTimer) return;
  notifyTimer = setTimeout(() => {
    notifyTimer = null;
    listeners.forEach((fn) => {
      try {
        fn();
      } catch (e) {
        console.error('Translation listener error:', e);
      }
    });
  }, 80);
}

export function subscribeToTranslations(listener: TranslationListener): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

/**
 * Strips HTML tags, unescapes common HTML entities, and removes tag artifacts.
 */
export function stripHtml(raw: string | undefined | null): string {
  if (!raw) return '';
  // 1. Unescape common HTML entities
  let text = raw
    .replace(/&quot;/gi, '"')
    .replace(/&amp;/gi, '&')
    .replace(/&#39;/gi, "'")
    .replace(/&apos;/gi, "'")
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&#(\d+);/g, (_, dec) => {
      try {
        return String.fromCharCode(parseInt(dec, 10));
      } catch {
        return '';
      }
    });

  // 2. Strip only real HTML tags (preserve < and > when used as comparisons/quotes)
  text = text.replace(/<\/?[a-zA-Z][a-zA-Z0-9]*\b[^>]*>/gi, '');

  return text.trim();
}

/**
 * Translates a single string using Google Translate client-side API.
 */
export async function translateText(text: string, targetLang: Language): Promise<string> {
  if (!text || !text.trim()) return text || '';
  const cleanInput = stripHtml(text);
  if (!cleanInput) return text || '';

  // Skip translation if already in target language
  if (targetLang === 'en' && !/[\u0900-\u097F]/.test(cleanInput)) {
    return cleanInput;
  }
  if (targetLang === 'mr' && !/[a-zA-Z]{3,}/.test(cleanInput) && /[\u0900-\u097F]/.test(cleanInput)) {
    return cleanInput;
  }

  const cacheKey = `tr_${targetLang}_${cleanInput.slice(0, 80)}_${cleanInput.length}`;

  try {
    const cached = sessionStorage.getItem(cacheKey);
    if (cached) return cached;
  } catch {}

  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLang}&dt=t&q=${encodeURIComponent(cleanInput)}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (Array.isArray(data) && Array.isArray(data[0])) {
      const rawTranslated = data[0]
        .map((item: any) => (item && item[0] ? item[0] : ''))
        .filter(Boolean)
        .join('');

      const translated = stripHtml(rawTranslated);
      if (translated) {
        try {
          sessionStorage.setItem(cacheKey, translated);
        } catch {}
        return translated;
      }
    }
  } catch (err) {
    console.warn('Dynamic translateText error:', err);
  }
  return cleanInput;
}

/**
 * Translates long markdown content chunked by paragraphs and preserves formatting.
 */
export async function translateMarkdown(markdown: string, targetLang: Language): Promise<string> {
  if (!markdown || !markdown.trim()) return markdown;

  // If already in target language
  if (targetLang === 'en' && !/[\u0900-\u097F]/.test(markdown)) {
    return markdown;
  }
  if (targetLang === 'mr' && !/[a-zA-Z]{4,}/.test(markdown) && /[\u0900-\u097F]/.test(markdown)) {
    return markdown;
  }

  const blocks = markdown.split(/\n\n+/);
  const translatedBlocks = await Promise.all(
    blocks.map(async (block) => {
      const trimmed = block.trim();
      if (!trimmed) return block;

      // Preserve markdown headers (# Header)
      const headerMatch = block.match(/^(#{1,6}\s+)(.*)$/s);
      if (headerMatch) {
        const trans = await translateText(headerMatch[2], targetLang);
        return headerMatch[1] + trans;
      }

      // Preserve blockquotes (> Quote)
      const quoteMatch = block.match(/^(>\s+)(.*)$/s);
      if (quoteMatch) {
        const trans = await translateText(quoteMatch[2], targetLang);
        return quoteMatch[1] + trans;
      }

      // Preserve bullet items (- Item or * Item)
      if (/^[-*]\s+/.test(trimmed)) {
        const lines = block.split('\n');
        const translatedLines = await Promise.all(
          lines.map(async (line) => {
            const lineMatch = line.match(/^([-*]\s+)(.*)$/);
            if (lineMatch) {
              const trans = await translateText(lineMatch[2], targetLang);
              return lineMatch[1] + trans;
            }
            return translateText(line, targetLang);
          })
        );
        return translatedLines.join('\n');
      }

      // Preserve numbered items (1. Item)
      if (/^\d+\.\s+/.test(trimmed)) {
        const lines = block.split('\n');
        const translatedLines = await Promise.all(
          lines.map(async (line) => {
            const lineMatch = line.match(/^(\d+\.\s+)(.*)$/);
            if (lineMatch) {
              const trans = await translateText(lineMatch[2], targetLang);
              return lineMatch[1] + trans;
            }
            return translateText(line, targetLang);
          })
        );
        return translatedLines.join('\n');
      }

      return translateText(block, targetLang);
    })
  );

  return translatedBlocks.join('\n\n');
}

/**
 * Check if translation is currently in-flight
 */
export function isTranslationInFlight(article: Article, targetLang: Language): boolean {
  if (!article) return false;
  const articleKey = article.slug || String(article.id);
  const cacheKey = `${articleKey}_${targetLang}`;
  return IN_FLIGHT.has(cacheKey);
}

/**
 * Asynchronously fetches translation for dynamic/live RSS articles.
 */
export async function fetchDynamicTranslation(
  article: Article,
  targetLang: Language
): Promise<TranslatedArticleFields | null> {
  const articleKey = article.slug || String(article.id);
  const cacheKey = `${articleKey}_${targetLang}`;

  if (IN_FLIGHT.has(cacheKey)) {
    return IN_FLIGHT.get(cacheKey)!;
  }

  const cleanTitle = stripHtml(article.title);
  const cleanExcerpt = article.excerpt ? stripHtml(article.excerpt) : '';

  const promise = (async () => {
    try {
      const [transTitle, transExcerpt, transContent] = await Promise.all([
        cleanTitle ? translateText(cleanTitle, targetLang) : Promise.resolve(''),
        cleanExcerpt ? translateText(cleanExcerpt, targetLang) : Promise.resolve(''),
        article.content ? translateMarkdown(article.content, targetLang) : Promise.resolve(''),
      ]);

      const result: TranslatedArticleFields = {
        title: stripHtml(transTitle) || cleanTitle,
        excerpt: transExcerpt ? stripHtml(transExcerpt) : (cleanExcerpt || undefined),
        content: transContent || (article.content ?? undefined),
      };

      MEMORY_CACHE.set(cacheKey, result);
      try {
        sessionStorage.setItem(`art_trans_${cacheKey}`, JSON.stringify(result));
      } catch {}

      scheduleNotify();
      return result;
    } catch (e) {
      console.error('Dynamic translation failed:', e);
      return null;
    } finally {
      IN_FLIGHT.delete(cacheKey);
    }
  })();

  IN_FLIGHT.set(cacheKey, promise);
  return promise;
}

/**
 * Returns translated article fields based on the current language.
 * Checks static dictionary first -> memory cache -> session cache -> fires background dynamic translation.
 */
export function getTranslatedArticle(article: Article, language: Language): Article {
  if (!article) return article;

  const articleKey = article.slug || String(article.id);
  const dynamicKey = `${articleKey}_${language}`;

  // 1. Direct Static Dictionary Slug Match
  let translationForSlug = ARTICLE_TRANSLATIONS[article.slug];

  // 2. Fuzzy Slug Match
  if (!translationForSlug && article.slug) {
    const slugKey = Object.keys(ARTICLE_TRANSLATIONS).find(
      (k) => article.slug.includes(k) || k.includes(article.slug)
    );
    if (slugKey) {
      translationForSlug = ARTICLE_TRANSLATIONS[slugKey];
    }
  }

  // 3. Title Content Match in static presets
  if (!translationForSlug && article.title) {
    const cleanSrcTitle = stripHtml(article.title);
    const matchedKey = Object.keys(ARTICLE_TRANSLATIONS).find((k) => {
      const entry = ARTICLE_TRANSLATIONS[k];
      return (
        stripHtml(entry.mr?.title) === cleanSrcTitle ||
        stripHtml(entry.en?.title) === cleanSrcTitle ||
        stripHtml(entry.hi?.title) === cleanSrcTitle
      );
    });
    if (matchedKey) {
      translationForSlug = ARTICLE_TRANSLATIONS[matchedKey];
    }
  }

  let finalAuthor = article.author_name;
  if (article.author_name && AUTHOR_BYLINES_MAP[article.author_name.trim()]) {
    finalAuthor = AUTHOR_BYLINES_MAP[article.author_name.trim()][language] || article.author_name;
  }

  // If found in static dictionary, return immediately
  if (translationForSlug) {
    const langFields = translationForSlug[language] || translationForSlug.mr;
    if (langFields) {
      return {
        ...article,
        title: stripHtml(langFields.title || article.title),
        excerpt: langFields.excerpt !== undefined ? stripHtml(langFields.excerpt) : (article.excerpt ? stripHtml(article.excerpt) : undefined),
        content: langFields.content || article.content,
        author_name: langFields.author_name || finalAuthor || article.author_name,
      };
    }
  }

  // Check In-Memory Dynamic Cache
  let cached = MEMORY_CACHE.get(dynamicKey);

  // Check Session Storage Dynamic Cache
  if (!cached) {
    try {
      const sessionData = sessionStorage.getItem(`art_trans_${dynamicKey}`);
      if (sessionData) {
        cached = JSON.parse(sessionData);
        if (cached) {
          MEMORY_CACHE.set(dynamicKey, cached);
        }
      }
    } catch {}
  }

  // Check if content translation is missing while full content is provided
  const hasFullContent = Boolean(article.content && article.content.trim().length > 20);
  const isContentMissingInCache = hasFullContent && (!cached || !cached.content || cached.content === article.content);
  const isTargetDifferentFromSource =
    (language === 'en' && /[\u0900-\u097F]/.test(article.title || article.content || '')) ||
    (language === 'hi' && /[\u0933\u0962\u0963]/.test(article.title || article.content || '') || (language === 'hi' && !/[\u0900-\u097F]/.test(article.title || ''))) ||
    (language === 'mr' && /[a-zA-Z]{5,}/.test(article.title || ''));

  if (cached) {
    if (isContentMissingInCache && isTargetDifferentFromSource) {
      // Trigger background translation for full content
      fetchDynamicTranslation(article, language);
    }

    return {
      ...article,
      title: stripHtml(cached.title || article.title),
      excerpt: cached.excerpt !== undefined ? stripHtml(cached.excerpt) : (article.excerpt ? stripHtml(article.excerpt) : undefined),
      content: cached.content || article.content,
      author_name: finalAuthor || article.author_name,
    };
  }

  // Not yet cached: Trigger dynamic background translation
  fetchDynamicTranslation(article, language);

  return {
    ...article,
    title: stripHtml(article.title),
    excerpt: article.excerpt ? stripHtml(article.excerpt) : undefined,
    content: article.content,
    author_name: finalAuthor || article.author_name,
  };
}


