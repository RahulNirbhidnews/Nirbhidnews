export type Language = 'mr' | 'en' | 'hi';

export interface TranslationDict {
  brandName: string;
  brandTagline: string;
  truthUnfiltered: string;
  breakingNews: string;
  featuredStories: string;
  latestNews: string;
  viewAll: string;
  readMore: string;
  minutesRead: string;
  by: string;
  specialCorrespondent: string;
  share: string;
  linkCopied: string;
  copyLink: string;
  relatedNews: string;
  editorialDisclaimer: string;
  searchNews: string;
  searchPlaceholder: string;
  allCategories: string;
  popularTopics: string;
  resultsFound: string;
  forQuery: string;
  clearFilter: string;
  noArticlesFound: string;
  noArticlesDesc: string;
  showAllNews: string;
  categories: string;
  topStories: string;
  editorialPortal: string;
  adminLogin: string;
  aboutUs: string;
  contactUs: string;
  privacyPolicy: string;
  terms: string;
  disclaimer: string;
  allRightsReserved: string;
  home: string;
  selectLanguage: string;
  breakingAlert: string;
  close: string;
  trending: string;

  // AI Intelligence Features
  aiSummary: string;
  aiSummaryTitle: string;
  aiFactChecked: string;
  aiListenNews: string;
  aiAudioPlaying: string;
  aiVoiceSpeed: string;
  aiAutoTranslate: string;
  aiTranslating: string;

  // Live Portal & Market Ticker
  liveBroadcast: string;
  liveTv: string;
  marketPulse: string;
  weather: string;
  pushAlertsTitle: string;
  pushAlertsDesc: string;
  enableAlerts: string;
  maybeLater: string;

  // Admin CMS & Extended Keys
  adminDashboard: string;
  adminArticles: string;
  adminCategories: string;
  adminMedia: string;
  adminWriteArticle: string;
  adminEditArticle: string;
  adminTutorial: string;
  adminLiveSite: string;
  adminLogout: string;
  adminSaveDraft: string;
  adminPublishStory: string;
  adminHeadlineLabel: string;
  adminSlugLabel: string;
  adminCategoryLabel: string;
  adminContentLabel: string;
  adminVideoLabel: string;
  adminCoverPhotoLabel: string;
  adminStatusLabel: string;
  totalArticles: string;
  totalArticlesDesc: string;
  publishedArticles: string;
  publishedDesc: string;
  draftArticles: string;
  draftDesc: string;
  activeCategories: string;
  activeCategoriesDesc: string;
  mediaAssets: string;
  recentActivity: string;
  viewAllArticles: string;
  createCategory: string;
  uploadMedia: string;
  searchArticlesPlaceholder: string;
  actions: string;
  status: string;
  author: string;
  date: string;
  edit: string;
  delete: string;
  publish: string;
  archive: string;
  welcome: string;

  // Leadership & Chief Editor
  editorName: string;
  editorTitle: string;
  editorQuote: string;
  editorPhone: string;
  editorEmail: string;
  editorOffice: string;

  // Advertisement
  adSpaceAvailable: string;
  adSpaceDesc: string;
  adContactLeader: string;
  bookAdWhatsApp: string;
  callDirect: string;

  categoryNames: Record<string, string>;
}

export const translations: Record<Language, TranslationDict> = {
  mr: {
    brandName: 'NIRBHID NEWS',
    brandTagline: 'Truth Unfiltered • निष्पक्ष आणि निर्भीड पत्रकारिता',
    truthUnfiltered: 'सत्य, निर्भीड आणि निष्पक्ष',
    breakingNews: 'ब्रेकिंग न्यूज',
    featuredStories: 'प्रमुख घडामोडी',
    latestNews: 'ताज्या घडामोडी',
    viewAll: 'सर्व बातम्या',
    readMore: 'सविस्तर वाचा',
    minutesRead: 'मि. वाचन',
    by: 'प्रतिनिधी',
    specialCorrespondent: 'विशेष प्रतिनिधी',
    share: 'शेअर करा',
    linkCopied: 'लिंक कॉपी झाली!',
    copyLink: 'लिंक कॉपी',
    relatedNews: 'संबंधित बातम्या',
    editorialDisclaimer: 'संपादकीय टिप: निर्भीड न्यूजच्या सर्व बातम्या निष्पक्ष आणि वस्तुनिष्ठ पुराव्यांवर आधारित असतात.',
    searchNews: 'बातम्या शोधा',
    searchPlaceholder: 'शोध शब्द प्रविष्ट करा (उदा. मुंबई, कायदा, निवडणूक)...',
    allCategories: 'सर्व विभाग',
    popularTopics: 'लोकप्रिय शोध:',
    resultsFound: 'निकाल सापडले',
    forQuery: 'साठी',
    clearFilter: 'फिल्टर साफ करा',
    noArticlesFound: 'कोणतीही बातमी सापडली नाही',
    noArticlesDesc: 'कृपया वेगळे शब्द वापरून पुन्हा प्रयत्न करा किंवा इतर बातम्या पाहा.',
    showAllNews: 'सर्व बातम्या दाखवा',
    categories: 'विभाग • Categories',
    topStories: 'महत्त्वाच्या बातम्या',
    editorialPortal: 'पत्रकार व संपादक पोर्टल',
    adminLogin: 'CMS लॉगिन',
    aboutUs: 'आमच्याबद्दल',
    contactUs: 'संपर्क',
    privacyPolicy: 'गोपनीयता धोरण',
    terms: 'नियम व अटी',
    disclaimer: 'डिस्क्लेमर',
    allRightsReserved: 'सर्व हक्क राखीव.',
    home: 'मुख्य पृष्ठ',
    selectLanguage: 'भाषा निवडा',
    breakingAlert: 'ताज्या घडामोडी सूचना',
    close: 'बंद करा',
    trending: 'ट्रेंडिंग',

    // AI Intelligence
    aiSummary: 'AI मुख्य सारांश',
    aiSummaryTitle: '🤖 AI बुलेटिन सारांश (Key Insights)',
    aiFactChecked: 'AI प्रमाणित • तथ्य तपासणी पूर्ण',
    aiListenNews: 'बातमी ऐका (Voice)',
    aiAudioPlaying: 'ऑडिओ चालू आहे...',
    aiVoiceSpeed: 'गती',
    aiAutoTranslate: '🤖 AI भाषांतर करा',
    aiTranslating: 'भाषांतर होत आहे...',

    // Live Broadcast & Popups
    liveBroadcast: '🔴 निर्भीड थेट प्रक्षेपण',
    liveTv: 'LIVE TV',
    marketPulse: 'बाजार व हवामान',
    weather: 'हवामान',
    pushAlertsTitle: 'ताज्या ब्रेकिंग न्यूज सूचना मिळवा!',
    pushAlertsDesc: 'महाराष्ट्रातील सर्वात महत्त्वाच्या घडामोडींचे तात्काळ अलर्ट मिळवण्यासाठी सबस्क्राईब करा.',
    enableAlerts: 'अलर्ट सुरू करा',
    maybeLater: 'नंतर आठवण करा',

    // Admin CMS
    adminDashboard: 'डॅशबोर्ड',
    adminArticles: 'बातम्या व्यवस्थापन',
    adminCategories: 'विभाग व्यवस्थापन',
    adminMedia: 'फोटो व व्हिडिओ लायब्ररी',
    adminWriteArticle: 'नवीन बातमी लिहा',
    adminEditArticle: 'बातमी संपादित करा',
    adminTutorial: 'मार्गदर्शक ट्यूटोरियल',
    adminLiveSite: 'थेट वेबसाइट पाहा',
    adminLogout: 'लॉगआउट',
    adminSaveDraft: 'मसुदा सेव्ह करा',
    adminPublishStory: 'थेट प्रकाशित करा',
    adminHeadlineLabel: 'मुख्य बातमी शीर्षक',
    adminSlugLabel: 'वेब लिंक नाव (URL Slug)',
    adminCategoryLabel: 'बातमीचा विभाग',
    adminContentLabel: 'बातमीचा सविस्तर मजकूर',
    adminVideoLabel: 'व्हिडिओ बातमी (YouTube किंवा MP4)',
    adminCoverPhotoLabel: 'मुख्य कव्हर फोटो',
    adminStatusLabel: 'प्रकाशन स्थिती',
    totalArticles: 'एकूण बातम्या',
    totalArticlesDesc: 'सर्व प्रकाशित व मसुदा बातम्या',
    publishedArticles: 'प्रकाशित (Live)',
    publishedDesc: 'वाचकांसाठी थेट उपलब्ध',
    draftArticles: 'मसुदा (Drafts)',
    draftDesc: 'संपादकीय पुनरावलोकन बाकी',
    activeCategories: 'बातम्या विभाग',
    activeCategoriesDesc: 'सक्रिय श्रेण्या',
    mediaAssets: 'मीडिया / फोटो',
    recentActivity: 'अलीकडील बातम्या • Recent Editorial Activity',
    viewAllArticles: 'सर्व बातम्या व्यवस्थापित करा →',
    createCategory: 'नवीन विभाग तयार करा',
    uploadMedia: 'नवीन फोटो/व्हिडिओ अपलोड करा',
    searchArticlesPlaceholder: 'शीर्षक, सारांश किंवा बातमीदार शोधा...',
    actions: 'कृती',
    status: 'स्थिती',
    author: 'बातमीदार / प्रतिनिधी',
    date: 'तारीख',
    edit: 'संपादित करा',
    delete: 'हटवा',
    publish: 'प्रकाशित करा',
    archive: 'आर्काइव्ह करा',
    welcome: 'स्वागत आहे',

    // Leadership & Chief Editor
    editorName: 'राहुल बाबुराव जोगदंड',
    editorTitle: 'मुख्य संपादक व संस्थापक',
    editorQuote: '"सत्य, निर्भीड आणि जनसामान्यांच्या हक्काचा निर्भीड आवाज!"',
    editorPhone: '९९२२२९९०२७',
    editorEmail: 'nirbhidnews.admin@gmail.com',
    editorOffice: 'मुंबई व ठाणे ब्युरो, महाराष्ट्र',

    // Advertisement
    adSpaceAvailable: '📢 येथे जाहिरात उपलब्ध आहे',
    adSpaceDesc: 'आपल्या व्यवसायाची, संस्थेची किंवा राजकीय कार्याची जाहिरात लाखो वाचकांपर्यंत पोहोचवा!',
    adContactLeader: 'संपादकीय व जाहिरात बुकिंग कक्ष',
    bookAdWhatsApp: 'WhatsApp द्वारे जाहिरात बुक करा',
    callDirect: 'थेट फोन संपर्क',

    categoryNames: {
      maharashtra: 'महाराष्ट्र',
      mumbai: 'मुंबई',
      thane: 'ठाणे',
      politics: 'राजकारण',
      crime: 'गुन्हेगारी',
      business: 'व्यापार',
      sports: 'क्रीडा',
      entertainment: 'मनोरंजन',
      technology: 'तंत्रज्ञान',
      education: 'शिक्षण',
      health: 'आरोग्य',
      world: 'आंतरराष्ट्रीय',
      other: 'इतर घडामोडी',
    },
  },

  en: {
    brandName: 'NIRBHID NEWS',
    brandTagline: 'Truth Unfiltered • Fearless & Objective Journalism',
    truthUnfiltered: 'Truth, Fearless & Objective',
    breakingNews: 'BREAKING NEWS',
    featuredStories: 'FEATURED STORIES',
    latestNews: 'Latest Updates',
    viewAll: 'View All',
    readMore: 'Read Full Story',
    minutesRead: 'min read',
    by: 'By',
    specialCorrespondent: 'Special Correspondent',
    share: 'Share',
    linkCopied: 'Link copied to clipboard!',
    copyLink: 'Copy Link',
    relatedNews: 'Related Stories',
    editorialDisclaimer: 'Editorial Note: Nirbhid News stories adhere strictly to objective facts and independent journalism.',
    searchNews: 'Search Articles',
    searchPlaceholder: 'Search by keywords (e.g. Mumbai, Politics, Tech)...',
    allCategories: 'All Categories',
    popularTopics: 'Trending Topics:',
    resultsFound: 'articles found',
    forQuery: 'for',
    clearFilter: 'Clear filter',
    noArticlesFound: 'No news stories found',
    noArticlesDesc: 'Try adjusting your search keywords or browse other categories.',
    showAllNews: 'Show all articles',
    categories: 'Categories',
    topStories: 'Top Stories',
    editorialPortal: 'Journalist & Editorial Portal',
    adminLogin: 'Admin CMS',
    aboutUs: 'About Us',
    contactUs: 'Contact Us',
    privacyPolicy: 'Privacy Policy',
    terms: 'Terms of Service',
    disclaimer: 'Disclaimer',
    allRightsReserved: 'All rights reserved.',
    home: 'Home',
    selectLanguage: 'Language',
    breakingAlert: 'Breaking News Alert',
    close: 'Close',
    trending: 'Trending',

    // AI Intelligence
    aiSummary: 'AI Quick Summary',
    aiSummaryTitle: '🤖 AI Key Insights Summary',
    aiFactChecked: 'AI Verified • Objective Journalism Fact-Checked',
    aiListenNews: 'Listen to Story',
    aiAudioPlaying: 'Playing audio...',
    aiVoiceSpeed: 'Speed',
    aiAutoTranslate: '🤖 AI Auto-Translate',
    aiTranslating: 'Translating with AI...',

    // Live Broadcast & Popups
    liveBroadcast: '🔴 Nirbhid Live Broadcast',
    liveTv: 'LIVE TV',
    marketPulse: 'Markets & Weather',
    weather: 'Weather',
    pushAlertsTitle: 'Get Real-Time Breaking Alerts!',
    pushAlertsDesc: 'Subscribe to instant notifications for major breaking news across Maharashtra and India.',
    enableAlerts: 'Enable Alerts',
    maybeLater: 'Maybe Later',

    // Admin CMS
    adminDashboard: 'Dashboard',
    adminArticles: 'Articles Manager',
    adminCategories: 'Categories Manager',
    adminMedia: 'Media Library',
    adminWriteArticle: 'Create Article',
    adminEditArticle: 'Edit Article',
    adminTutorial: 'CMS Tutorial & Guide',
    adminLiveSite: 'Live Site',
    adminLogout: 'Logout',
    adminSaveDraft: 'Save as Draft',
    adminPublishStory: 'Publish Story',
    adminHeadlineLabel: 'Headline',
    adminSlugLabel: 'URL Slug',
    adminCategoryLabel: 'Category',
    adminContentLabel: 'Article Content (Markdown)',
    adminVideoLabel: 'Video Bulletin (YouTube / MP4)',
    adminCoverPhotoLabel: 'Featured Cover Image',
    adminStatusLabel: 'Publication Status',
    totalArticles: 'Total Articles',
    totalArticlesDesc: 'All published & draft stories',
    publishedArticles: 'Published (Live)',
    publishedDesc: 'Live on public portal',
    draftArticles: 'Drafts',
    draftDesc: 'Pending editorial review',
    activeCategories: 'Categories',
    activeCategoriesDesc: 'Active news topics',
    mediaAssets: 'Media Assets',
    recentActivity: 'Recent Editorial Activity',
    viewAllArticles: 'Manage All Articles →',
    createCategory: 'Add Category',
    uploadMedia: 'Upload Media',
    searchArticlesPlaceholder: 'Search headline, excerpt, or reporter...',
    actions: 'Actions',
    status: 'Status',
    author: 'Author / Reporter',
    date: 'Date',
    edit: 'Edit',
    delete: 'Delete',
    publish: 'Publish',
    archive: 'Archive',
    welcome: 'Welcome',

    // Leadership & Chief Editor
    editorName: 'Rahul Baburao Jogdand',
    editorTitle: 'Chief Editor & Founder',
    editorQuote: '"Truth, Unfiltered and the Fearless Voice of the People!"',
    editorPhone: '9922299027',
    editorEmail: 'nirbhidnews.admin@gmail.com',
    editorOffice: 'Mumbai & Thane Bureau, Maharashtra',

    // Advertisement
    adSpaceAvailable: '📢 Advertisement Space Available Here',
    adSpaceDesc: 'Reach thousands of daily active readers across Maharashtra and India with high-impact promotions!',
    adContactLeader: 'Editorial & Ad Booking Desk',
    bookAdWhatsApp: 'Book Ad on WhatsApp',
    callDirect: 'Call Editor Directly',

    categoryNames: {
      maharashtra: 'Maharashtra',
      mumbai: 'Mumbai Metro',
      thane: 'Thane',
      politics: 'Politics & Governance',
      crime: 'Crime & Law',
      business: 'Business & Economy',
      sports: 'Sports',
      entertainment: 'Entertainment',
      technology: 'Technology',
      education: 'Education',
      health: 'Health & Wellness',
      world: 'World Affairs',
      other: 'Other',
    },
  },

  hi: {
    brandName: 'निर्भीड न्यूज',
    brandTagline: 'Truth Unfiltered • निष्पक्ष एवं निर्भीक पत्रकारिता',
    truthUnfiltered: 'सत्य, निर्भीक एवं निष्पक्ष',
    breakingNews: 'ब्रेकिंग न्यूज़',
    featuredStories: 'प्रमुख खबरें',
    latestNews: 'ताज़ा खबरें',
    viewAll: 'सभी खबरें',
    readMore: 'पूरी खबर पढ़ें',
    minutesRead: 'मिनट',
    by: 'द्वारा',
    specialCorrespondent: 'विशेष संवाददाता',
    share: 'शेयर करें',
    linkCopied: 'लिंक कॉपी हो गया!',
    copyLink: 'लिंक कॉपी',
    relatedNews: 'संबंधित खबरें',
    editorialDisclaimer: 'संपादकीय नोट: निर्भीड न्यूज़ की खबरें निष्पक्ष और प्रामाणिक तथ्यों पर आधारित होती हैं।',
    searchNews: 'खबरें खोजें',
    searchPlaceholder: 'खोज शब्द दर्ज करें (उदा. मुंबई, चुनाव, व्यापार)...',
    allCategories: 'सभी श्रेणियां',
    popularTopics: 'लोकप्रिय विषय:',
    resultsFound: 'परिणाम मिले',
    forQuery: 'के लिए',
    clearFilter: 'फ़िल्टर हटाएं',
    noArticlesFound: 'कोई खबर नहीं मिली',
    noArticlesDesc: 'कृपया अलग कीवर्ड का उपयोग करके पुनः प्रयास करें।',
    showAllNews: 'सभी खबरें देखें',
    categories: 'श्रेणियां',
    topStories: 'शीर्ष समाचार',
    editorialPortal: 'पत्रकार एवं संपादक पोर्टल',
    adminLogin: 'CMS लॉगिन',
    aboutUs: 'हमारे बारे में',
    contactUs: 'संपर्क करें',
    privacyPolicy: 'गोपनीयता नीति',
    terms: 'नियम व शर्तें',
    disclaimer: 'डिस्क्लेमर',
    allRightsReserved: 'सर्वाधिकार सुरक्षित।',
    home: 'मुख्य पृष्ठ',
    selectLanguage: 'भाषा चुनें',
    breakingAlert: 'ताज़ा समाचार सूचना',
    close: 'बंद करें',
    trending: 'ट्रेंडिंग',

    // AI Intelligence
    aiSummary: 'AI मुख्य सारांश',
    aiSummaryTitle: '🤖 AI मुख्य बिंदु सारांश (Key Insights)',
    aiFactChecked: 'AI प्रमाणित • तथ्य सत्यापन पूर्ण',
    aiListenNews: 'खबर सुनें (Voice)',
    aiAudioPlaying: 'ऑडियो चल रहा है...',
    aiVoiceSpeed: 'गति',
    aiAutoTranslate: '🤖 AI अनुवाद करें',
    aiTranslating: 'अनुवाद किया जा रहा है...',

    // Live Broadcast & Popups
    liveBroadcast: '🔴 निर्भीड लाइव प्रसारण',
    liveTv: 'LIVE TV',
    marketPulse: 'बाजार एवं मौसम',
    weather: 'मौसम',
    pushAlertsTitle: 'ब्रेकिंग न्यूज़ नोटिफिकेशन पाएं!',
    pushAlertsDesc: 'महाराष्ट्र एवं देश की प्रमुख खबरों के त्वरित अलर्ट के लिए सब्सक्राइब करें।',
    enableAlerts: 'अलर्ट शुरू करें',
    maybeLater: 'बाद में',

    // Admin CMS
    adminDashboard: 'डैशबोर्ड',
    adminArticles: 'समाचार प्रबंधन',
    adminCategories: 'श्रेणी प्रबंधन',
    adminMedia: 'फोटो व वीडियो लाइब्रेरी',
    adminWriteArticle: 'नई खबर लिखें',
    adminEditArticle: 'खबर संपादित करें',
    adminTutorial: 'CMS ट्यूटोरियल एवं गाइड',
    adminLiveSite: 'लाइव वेबसाइट देखें',
    adminLogout: 'लॉगआउट',
    adminSaveDraft: 'ड्राफ्ट सहेजें',
    adminPublishStory: 'प्रकाशित करें',
    adminHeadlineLabel: 'समाचार शीर्षक',
    adminSlugLabel: 'वेब लिंक (URL Slug)',
    adminCategoryLabel: 'श्रेणी',
    adminContentLabel: 'समाचार का पूरा विवरण',
    adminVideoLabel: 'वीडियो बुलेटिन (YouTube / MP4)',
    adminCoverPhotoLabel: 'कवर फोटो',
    adminStatusLabel: 'प्रकाशन स्थिति',
    totalArticles: 'कुल समाचार',
    totalArticlesDesc: 'सभी प्रकाशित और ड्राफ्ट समाचार',
    publishedArticles: 'प्रकाशित (Live)',
    publishedDesc: 'पाठकों के लिए उपलब्ध',
    draftArticles: 'ड्राफ्ट',
    draftDesc: 'संपादकीय समीक्षा लंबित',
    activeCategories: 'श्रेणियां',
    activeCategoriesDesc: 'सक्रिय श्रेणियां',
    mediaAssets: 'मीडिया / फोटो',
    recentActivity: 'हालिया संपादकीय गतिविधियां',
    viewAllArticles: 'सभी समाचार प्रबंधित करें →',
    createCategory: 'नई श्रेणी जोड़ें',
    uploadMedia: 'फोटो/वीडियो अपलोड करें',
    searchArticlesPlaceholder: 'शीर्षक या संवाददाता खोजें...',
    actions: 'कार्रवाई',
    status: 'स्थिति',
    author: 'संवाददाता',
    date: 'तारीख',
    edit: 'संपादित करें',
    delete: 'हटाएं',
    publish: 'प्रकाशित करें',
    archive: 'संग्रहित करें',
    welcome: 'स्वागत है',

    // Leadership & Chief Editor
    editorName: 'राहुल बाबूराव जोगदंड',
    editorTitle: 'मुख्य संपादक एवं संस्थापक',
    editorQuote: '"सत्य, निर्भीक और जनसामान्य के अधिकारों की बुलंद आवाज़!"',
    editorPhone: '9922299027',
    editorEmail: 'nirbhidnews.admin@gmail.com',
    editorOffice: 'मुंबई एवं ठाणे ब्यूरो, महाराष्ट्र',

    // Advertisement
    adSpaceAvailable: '📢 यहां विज्ञापन स्थान उपलब्ध है',
    adSpaceDesc: 'अपने व्यवसाय, संगठन या राजनीतिक कार्य का विज्ञापन लाखों पाठकों तक पहुंचाएं!',
    adContactLeader: 'संपादकीय एवं विज्ञापन बुकिंग कक्ष',
    bookAdWhatsApp: 'WhatsApp पर विज्ञापन बुक करें',
    callDirect: 'सीधे फोन संपर्क',

    categoryNames: {
      maharashtra: 'महाराष्ट्र',
      mumbai: 'मुंबई मेट्रो',
      thane: 'ठाणे',
      politics: 'राजनीति',
      crime: 'अपराध एवं कानून',
      business: 'व्यापार एवं अर्थव्यवस्था',
      sports: 'खेल',
      entertainment: 'मनोरंजन',
      technology: 'तकनीक',
      education: 'शिक्षा',
      health: 'स्वास्थ्य',
      world: 'अंतरराष्ट्रीय',
      other: 'अन्य',
    },
  },
};
