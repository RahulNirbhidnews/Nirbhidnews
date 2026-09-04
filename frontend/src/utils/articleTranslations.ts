import { Article } from '../types';
import { Language } from './translations';

export interface TranslatedArticleFields {
  title: string;
  excerpt?: string;
  content?: string;
  author_name?: string;
}

export const ARTICLE_TRANSLATIONS: Record<string, Record<Language, TranslatedArticleFields>> = {
  'mumbai-pune-expressway-ai-traffic-system': {
    mr: {
      title: 'मुंबई-पुणे एक्सप्रेसवेवर नवीन AI-आधारित इंटेलिजेंट ट्रॅफिक सिस्टीम कार्यान्वित',
      excerpt: 'वाहतूक कोंडी आणि अपघातांवर तात्काळ नियंत्रण मिळवण्यासाठी राज्य रस्ते विकास महामंडळाने नवीन तंत्रज्ञानाचा अवलंब केला आहे.',
      author_name: 'राजेश सावंत (विशेष प्रतिनिधी)',
      content: `# मुंबई-पुणे द्रुतगती मार्गावर आधुनिक तंत्रज्ञान

महाराष्ट्र राज्य रस्ते विकास महामंडळाने (MSRDC) मुंबई-पुणे एक्सप्रेसवेवर **आर्टिफिशियल इंटेलिजन्स (AI)** आधारित प्रगत इंटेलिजेंट ट्रॅफिक मॅनेजमेंट सिस्टीम (ITMS) पूर्णपणे सुरू केली आहे.

> "या अत्याधुनिक प्रणालीमुळे अपघातांची संख्या ६० टक्क्यांहून अधिक कमी होईल आणि वाहतूक नियम तोडणाऱ्यांवर २४ तास स्वयंचलित लक्ष ठेवले जाईल." — सार्वजनिक बांधकाम विभाग

### प्रमुख वैशिष्ट्ये:
- **हाय-स्पीड कॅमेरे:** प्रति तासाला वाहनांचा वेग मोजण्यासाठी १०० हून अधिक गॅन्ट्री कॅमेरे.
- **स्वयंचलित ई-चलन:** ओव्हरस्पीडिंग, लेन कटिंग आणि विना सीटबेल्ट वाहन चालवणाऱ्यांवर थेट कारवाई.
- **तातडीची मदत यंत्रणा:** अपघात घडल्यास ५ मिनिटांत बचाव पथक घटनास्थळी पोहोचणार.

या उपक्रमामुळे घाट विभागात होणारी वाहतूक कोंडी लक्षणीयरीत्या कमी होण्यास मदत होणार आहे.`,
    },
    en: {
      title: 'Mumbai-Pune Expressway Deploys New AI-Powered Intelligent Traffic System',
      excerpt: 'Maharashtra State Road Development Corporation implements advanced AI surveillance to curb traffic congestion and reduce road accidents.',
      author_name: 'Rajesh Sawant (Special Correspondent)',
      content: `# Modern AI Technology on Mumbai-Pune Expressway

The Maharashtra State Road Development Corporation (MSRDC) has officially activated the **Artificial Intelligence (AI)** based Intelligent Traffic Management System (ITMS) on the Mumbai-Pune Expressway.

> "This state-of-the-art system will reduce accident rates by more than 60% and maintain 24/7 automated surveillance against traffic violations." — Public Works Department

### Key Features:
- **High-Speed Gantry Cameras:** Over 100 automated gantry camera stations monitoring vehicular velocity in real-time.
- **Automated E-Challans:** Instant electronic fines for overspeeding, hazardous lane changing, and seatbelt violations.
- **Rapid Emergency Response:** Dedicated rescue units reaching incident locations within 5 minutes.

This initiative is projected to significantly alleviate congestion across the Ghat section during peak travel hours.`,
    },
    hi: {
      title: 'मुंबई-पुणे एक्सप्रेसवे पर नया AI-आधारित इंटेलिजेंट ट्रैफिक मैनेजमेंट सिस्टम शुरू',
      excerpt: 'ट्रैफिक जाम और सड़क हादसों पर तुरंत नियंत्रण पाने के लिए राज्य सड़क विकास निगम ने अत्याधुनिक एआई तकनीक लागू की।',
      author_name: 'राजेश सावंत (विशेष संवाददाता)',
      content: `# मुंबई-पुणे एक्सप्रेसवे पर आधुनिक तकनीक

महाराष्ट्र राज्य सड़क विकास निगम (MSRDC) ने मुंबई-पुणे एक्सप्रेसवे पर **आर्टिफिशियल इंटेलिजेंस (AI)** आधारित उन्नत इंटेलिजेंट ट्रैफिक मैनेजमेंट सिस्टम (ITMS) को पूरी तरह से चालू कर दिया है।

> "इस अत्याधुनिक प्रणाली से दुर्घटनाओं में ६०% से अधिक की कमी आएगी और नियमों का उल्लंघन करने वालों पर २४ घंटे स्वचालित नज़र रखी जाएगी।" — लोक निर्माण विभाग

### मुख्य विशेषताएं:
- **हाई-स्पीड कैमरे:** वाहनों की गति मापने के लिए १०० से अधिक गैन्ट्री कैमरे।
- **स्वचालित ई-चालान:** ओवरस्पीडिंग और लेन कटिंग पर सीधे चालान।
- **त्वरित आपातकालीन सहायता:** दुर्घटना होने पर ५ मिनट के भीतर बचाव दल पहुंचेगा।`,
    },
  },
  'thane-municipal-budget-infrastructure-focus': {
    mr: {
      title: 'ठाणे महापालिकेचा ५ हजार कोटींचा अर्थसंकल्प सादर; पायाभूत सुविधा आणि आरोग्यावर भर',
      excerpt: 'ठाणेकरांसाठी दिलासादायक बाब म्हणजे चालू आर्थिक वर्षात कोणतीही नवीन कर वाढ सुचवण्यात आलेली नाही.',
      author_name: 'नितीन देशमुख',
      content: `# ठाणे शहराचा सर्वांगीण विकास आराखडा

ठाणे महानगरपालिकेने आगामी आर्थिक वर्षासाठी **५,२५० कोटी रुपयांचा** अर्थसंकल्प सादर केला आहे. यामध्ये ठाणेकरांवर कोणताही अतिरिक्त कर न लादता रस्ते सुधारणा, मेट्रो कनेक्टिव्हिटी आणि आरोग्य सुविधांवर मोठा निधी मंजूर करण्यात आला आहे.

### अर्थसंकल्पातील महत्त्वाच्या तरतुदी:
1. **ठाणे कोस्टल रोड आणि उड्डाणपूल:** ९५० कोटी रुपये निधी.
2. **छत्रपती शिवाजी महाराज रुग्णालय आधुनिकीकरण:** नवीन २०० आयसीयू बेड्स.
3. **पर्यावरणपूरक इलेक्ट्रिक बसेस:** टीएमटीच्या ताफ्यात नवीन १०० एसी बसेसचा समावेश.`,
    },
    en: {
      title: 'Thane Municipal Corporation Presents ₹5,250 Cr Budget; Major Focus on Infrastructure & Health',
      excerpt: 'Relief for Thane residents as no new civic tax hikes are introduced in the municipal budget for the upcoming fiscal year.',
      author_name: 'Nitin Deshmukh',
      content: `# Comprehensive Development Blueprint for Thane City

The Thane Municipal Corporation (TMC) has tabled its annual budget of **₹5,250 Crores** for the upcoming financial year. Without introducing any new tax hikes, substantial capital has been allocated towards road upgrades, metro connectivity, and healthcare modernization.

### Key Budgetary Allocations:
1. **Thane Coastal Road & Flyovers:** ₹950 Crore fund allocation.
2. **Chhatrapati Shivaji Maharaj Hospital Modernization:** 200 new advanced ICU beds.
3. **Eco-Friendly Electric Bus Fleet:** Induction of 100 new electric AC buses into TMT.`,
    },
    hi: {
      title: 'ठाणे नगर निगम ने ₹५,२५० करोड़ का बजट पेश किया; बुनियादी ढांचे और स्वास्थ्य पर जोर',
      excerpt: 'ठाणेवासियों के लिए राहत भरी खबर, आगामी वित्तीय वर्ष के लिए नगर निगम बजट में कोई नया कर नहीं बढ़ाया गया।',
      author_name: 'नितिन देशमुख',
      content: `# ठाणे शहर के विकास का नया खाका

ठाणे नगर निगम (TMC) ने आगामी वित्तीय वर्ष के लिए **५,२५० करोड़ रुपये** का बजट पेश किया है। इसमें शहर के बुनियादी ढांचे, सड़कों और अस्पतालों के आधुनिकीकरण के लिए भारी धनराशि का आवंटन किया गया है।`,
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
  'maharashtra-assembly-elections-political-alliances': {
    mr: {
      title: 'विधानसभा निवडणुकीच्या पार्श्वभूमीवर राजकीय पक्षांची मोर्चेबांधणी वेगवान; जागावाटपावर खलबते',
      excerpt: 'प्रमुख आघाड्यांमध्ये जागावाटपाची अंतिम चर्चा निर्णायक टप्प्यात पोहोचली असून उमेदवारांच्या पहिल्या याद्या लवकरच जाहीर होण्याची शक्यता.',
      author_name: 'आनंद कुलकर्णी (वरिष्ठ राजकीय विश्लेषक)',
      content: `# महाराष्ट्राचे राजकारण तापले

राज्यातील आगामी विधानसभा निवडणुकांसाठी सर्वच राजकीय पक्षांनी जोरदार तयारी सुरू केली आहे. मुंबई आणि दिल्लीमध्ये वरिष्ठ नेत्यांच्या बैठकांचे सत्र सुरू असून बंडखोरी रोखण्यासाठी विशेष रणनीती आखली जात आहे.`,
    },
    en: {
      title: 'Political Alliances Intensify Preparations for Maharashtra Assembly Elections; Seat-Sharing Near Finalization',
      excerpt: 'Major coalitions enter conclusive negotiations over seat allocations as first candidate lists are expected to be announced soon.',
      author_name: 'Anand Kulkarni (Senior Political Analyst)',
      content: `# Maharashtra Politics Enters Decisive Phase

With the State Legislative Assembly elections approaching, major political coalitions have ramped up their ground campaigns and strategic candidate selection across Maharashtra.`,
    },
    hi: {
      title: 'महाराष्ट्र विधानसभा चुनाव को लेकर राजनीतिक दलों की हलचल तेज; सीट बंटवारे पर अंतिम मंथन',
      excerpt: 'प्रमुख गठबंधनों में सीट बंटवारे पर अंतिम सहमति बनने के आसार, प्रत्याशियों की पहली सूची जल्द आने की संभावना।',
      author_name: 'आनंद कुलकर्णी (वरिष्ठ राजनीतिक विश्लेषक)',
      content: `# महाराष्ट्र चुनाव: तेज हुई राजनीतिक बिसात

विधानसभा चुनावों की घोषणा के साथ ही सभी राजनीतिक दलों ने मुंबई और दिल्ली में रणनीतिक बैठकों का दौर तेज कर दिया है।`,
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

/**
 * Returns translated article fields based on the current language.
 */
export function getTranslatedArticle(article: Article, language: Language): Article {
  if (!article) return article;

  const translationForSlug = ARTICLE_TRANSLATIONS[article.slug];
  if (!translationForSlug) {
    return article;
  }

  const langFields = translationForSlug[language] || translationForSlug.mr;
  if (!langFields) {
    return article;
  }

  return {
    ...article,
    title: langFields.title || article.title,
    excerpt: langFields.excerpt !== undefined ? langFields.excerpt : article.excerpt,
    content: langFields.content || article.content,
    author_name: langFields.author_name || article.author_name,
  };
}
