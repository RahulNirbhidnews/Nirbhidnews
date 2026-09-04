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
      world: 'देश-विदेश',
      other: 'इतर',
    },
  },
  en: {
    brandName: 'NIRBHID NEWS',
    brandTagline: 'Truth Unfiltered • Fearless & Objective Journalism',
    truthUnfiltered: 'Truth Unfiltered & Unbiased',
    breakingNews: 'Breaking News',
    featuredStories: 'Featured Stories',
    latestNews: 'Latest Stories',
    viewAll: 'View All',
    readMore: 'Read Full Story',
    minutesRead: 'min read',
    by: 'By',
    specialCorrespondent: 'Special Correspondent',
    share: 'Share',
    linkCopied: 'Link Copied!',
    copyLink: 'Copy Link',
    relatedNews: 'Related News',
    editorialDisclaimer: 'Editorial Note: Nirbhid News stories adhere to objective and factual journalistic standards.',
    searchNews: 'Search Articles',
    searchPlaceholder: 'Type search keywords (e.g., Mumbai, Economy, Elections)...',
    allCategories: 'All Categories',
    popularTopics: 'Popular Topics:',
    resultsFound: 'results found',
    forQuery: 'for',
    clearFilter: 'Clear Filters',
    noArticlesFound: 'No Articles Found',
    noArticlesDesc: 'Please try searching with different keywords or explore popular topics.',
    showAllNews: 'Show All News',
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
    categoryNames: {
      maharashtra: 'Maharashtra',
      mumbai: 'Mumbai Metro',
      thane: 'Thane',
      politics: 'Politics & Governance',
      crime: 'Crime & Law',
      business: 'Business & Economy',
      sports: 'Sports',
      entertainment: 'Entertainment',
      technology: 'Technology & AI',
      education: 'Education',
      health: 'Health & Wellness',
      world: 'World Affairs',
      other: 'Other',
    },
  },
  hi: {
    brandName: 'NIRBHID NEWS',
    brandTagline: 'Truth Unfiltered • निष्पक्ष और निर्भीक पत्रकारिता',
    truthUnfiltered: 'सत्य और निष्पक्ष पत्रकारिता',
    breakingNews: 'ब्रेकिंग न्यूज़',
    featuredStories: 'प्रमुख खबरें',
    latestNews: 'ताज़ा खबरें',
    viewAll: 'सभी खबरें',
    readMore: 'विस्तार से पढ़ें',
    minutesRead: 'मिनट वाचन',
    by: 'संवाददाता',
    specialCorrespondent: 'विशेष संवाददाता',
    share: 'शेयर करें',
    linkCopied: 'लिंक कॉपी हो गया!',
    copyLink: 'लिंक कॉपी',
    relatedNews: 'संबंधित खबरें',
    editorialDisclaimer: 'संपादकीय नोट: निर्भीड न्यूज़ की सभी खबरें निष्पक्ष और तथ्यपरक साक्ष्यों पर आधारित होती हैं।',
    searchNews: 'खबरें खोजें',
    searchPlaceholder: 'खोज शब्द दर्ज करें (उदा. मुंबई, बजट, चुनाव)...',
    allCategories: 'सभी विभाग',
    popularTopics: 'लोकप्रिय विषय:',
    resultsFound: 'परिणाम मिले',
    forQuery: 'के लिए',
    clearFilter: 'फ़िल्टर साफ़ करें',
    noArticlesFound: 'कोई खबर नहीं मिली',
    noArticlesDesc: 'कृपया अलग शब्दों से प्रयास करें या अन्य लोकप्रिय खबरें देखें।',
    showAllNews: 'सभी खबरें देखें',
    categories: 'विभाग • Categories',
    topStories: 'महत्वपूर्ण खबरें',
    editorialPortal: 'संपादकीय पोर्टल',
    adminLogin: 'CMS लॉगिन',
    aboutUs: 'हमारे बारे में',
    contactUs: 'संपर्क करें',
    privacyPolicy: 'गोपनीयता नीति',
    terms: 'नियम और शर्तें',
    disclaimer: 'डिस्क्लेमर',
    allRightsReserved: 'सर्वाधिकार सुरक्षित।',
    home: 'मुख्य पृष्ठ',
    selectLanguage: 'भाषा चुनें',
    breakingAlert: 'ताज़ा समाचार सूचना',
    close: 'बंद करें',
    trending: 'ट्रेंडिंग',
    categoryNames: {
      maharashtra: 'महाराष्ट्र',
      mumbai: 'मुंबई',
      thane: 'ठाणे',
      politics: 'राजनीति',
      crime: 'अपराध',
      business: 'व्यापार व बाज़ार',
      sports: 'खेल',
      entertainment: 'मनोरंजन',
      technology: 'तकनीक',
      education: 'शिक्षा',
      health: 'स्वास्थ्य',
      world: 'देश-विदेश',
      other: 'अन्य',
    },
  },
};
