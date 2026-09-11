import logging
from datetime import datetime, timezone, timedelta
from sqlalchemy.orm import Session
from sqlalchemy import select, update, delete
from app.models.article import Article
from app.models.category import Category
from app.models.user import User

logger = logging.getLogger(__name__)

# List of legacy slugs requested for complete removal
REMOVED_SLUGS = [
    "mumbai-pune-expressway-ai-traffic-system",
    "thane-municipal-budget-infrastructure-focus",
    "maharashtra-assembly-elections-political-alliances",
]

SAMPLE_ARTICLES = [
    {
        "title": "'निर्भीड न्यूज'च्या अधिकृत डिजिटल न्यूज पोर्टलचे भव्य लोकार्पण; मुख्य संपादक राहुल जोगदंड यांच्या नेतृत्वाखाली निष्पक्ष पत्रकारितेची नवी सुरुवात",
        "slug": "nirbhid-news-website-launch",
        "category_slug": "maharashtra",
        "excerpt": "महाराष्ट्रातील जनतेसाठी २४ तास सत्य, अचूक आणि निर्भीड बातम्या पोहोचवणारे आधुनिक डिजिटल न्यूज व्यासपीठ आजपासून जनसेवेत रुजू.",
        "content": """# 'निर्भीड न्यूज'च्या डिजिटल पोर्टलचे दिमाखात लोकार्पण

महाराष्ट्रातील अग्रगण्य डिजिटल माध्यम समूह **'निर्भीड न्यूज'** च्या अधिकृत डिजिटल न्यूज वेबसाईट व आधुनिक वेब पोर्टलचे आज मुख्य संपादक **राहुल जोगदंड** यांच्या शुभहस्ते भव्य लोकार्पण करण्यात आले.

> "सत्य, अचूकता आणि निर्भीडपणा हीच आमची ओळख आहे. कोणत्याही राजकीय अथवा आर्थिक दबावाला बळी न पडता सर्वसामान्य नागरिकांचे प्रश्न शासन दरबारी मांडणे हेच निर्भीड न्यूजचे सर्वोच्च ध्येय आहे." — राहुल जोगदंड (मुख्य संपादक)

### वेबसाईटची प्रमुख वैशिष्ट्ये:
- **२४ तास थेट प्रवाह (Live 24x7):** ताज्या घडामोडींचे अविरत थेट प्रक्षेपण.
- **AI बातमी सारांश (AI Quick Summary):** लांबलचक बातम्यांचा सेकंदात अचूक ३-मुद्द्यांचा सारांश.
- **AI ऑडिओ वाचक (AI Voice Reader):** बातमी वाचण्यासोबत ऐकण्याची आधुनिक सोय.
- **त्रिभाषिक बातमी सेवा:** मराठी, हिंदी व इंग्रजी भाषेत एका क्लिकवर सहज वाचन.
- **विभागवार सखोल विश्लेषण:** महाराष्ट्र, मुंबई, ठाणे, राजकारण, गुन्हेगारी, क्रीडा, मनोरंजन व तंत्रज्ञान.

सर्व वाचक, प्रेक्षक आणि हितचिंतकांचे मनःपूर्वक आभार! निष्पक्ष आणि रोकठोक पत्रकारितेसाठी नेहमी जोडलेले राहा.""",
        "featured_image_url": "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1200&q=80",
        "author_name": "राहुल जोगदंड (मुख्य संपादक)",
        "is_featured": True,
        "is_breaking": True,
        "days_ago": 0,
    },
    {
        "title": "मुंबई मेट्रो ३ आरे-बीकेसी टप्प्याला प्रवाशांचा उत्स्फूर्त प्रतिसाद; दैनंदिन प्रवासी संख्येत विक्रमी वाढ",
        "slug": "mumbai-metro-3-aarey-bkc-passenger-surge",
        "category_slug": "mumbai",
        "excerpt": "भूमिगत मेट्रो सुरू झाल्यामुळे पश्चिम उपनगरांतील रस्ते वाहतुकीवरील ताण २५ टक्क्यांनी कमी झाल्याचा प्राथमिक अंदाज.",
        "content": """# मुंबईच्या वेगवान प्रवासाला मेट्रो ३ ची साथ

मुंबईकरांचे बहुप्रतिक्षित स्वप्न असलेली **अंडरग्राउंड मेट्रो ३ (अक्वा लाईन)** चा आरे ते बीकेसी टप्पा सुरू झाल्यानंतर पहिल्याच आठवड्यात प्रवाशांची संख्या दररोज १.५ लाखांवर पोहोचली आहे.

> "अंधेरी, सीपझ आणि बीकेसीमधील आयटी व कॉर्पोरेट कर्मचाऱ्यांना या मेट्रो सेवेचा प्रचंड फायदा होत असून प्रवासाचा वेळ ४५ मिनिटांवरून अवघ्या १५ मिनिटांवर आला आहे."

### मेट्रो स्थानकांवरील प्रवासी सुविधा:
- संपूर्ण वातानुकूलित भूमिगत स्थानके
- व्हॉट्सअ‍ॅप व क्यूआर कोड आधारित डिजिटल तिकीट प्रणाली
- महिला प्रवाशांच्या सुरक्षेसाठी विशेष सुरक्षा रक्षक व सीसीटीव्ही कव्हरेज.""",
        "featured_image_url": "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80",
        "author_name": "प्रिया कांबळे (मुंबई ब्युरो)",
        "is_featured": False,
        "is_breaking": False,
        "days_ago": 1,
    },
    {
        "title": "सायबर गुन्हेगारीविरोधात महाराष्ट्र पोलिसांची मोठी कारवाई; आंतरराज्यीय टोळीचा पर्दाफाश",
        "slug": "maharashtra-police-cyber-crime-busted",
        "category_slug": "crime",
        "excerpt": "डिजिटल अरेस्ट आणि बनावट शेअर मार्केट ॲप्सच्या नावाखाली कोट्यवधी रुपयांची फसवणूक करणाऱ्या टोळीला अटक.",
        "content": """# सायबर गुन्हेगारांवर पोलिसांचा दणका

महाराष्ट्र सायबर सेल आणि गुन्हे अन्वेषण विभागाने संयुक्त कारवाई करून बनावट स्टॉक ट्रेडिंग प्लॅटफॉर्म चालवणाऱ्या आंतरराज्यीय टोळीचा पर्दाफाश केला आहे. या कारवाईत पोलिसांनी ८ संशयितांना ताब्यात घेतले असून कोट्यवधींची मालमत्ता जप्त केली आहे.

### नागरिकांना पोलिसांचे आवाहन:
> "कोणतीही सरकारी तपास यंत्रणा नागरिकांना 'डिजिटल अरेस्ट' करत नाही. संशयास्पद कॉल्स आल्यास त्वरित १९३० या हेल्पलाइनवर संपर्क साधावा." — सायबर पोलीस उपायुक्त

- जप्त साहित्य: ४२ लॅपटॉप्स, १५० मोबाईल फोन्स आणि ३०० हून अधिक बनावट बँक खात्यांची माहिती.""",
        "featured_image_url": "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80",
        "author_name": "सुनील पाटील (गुन्हे वार्ताहर)",
        "is_featured": False,
        "is_breaking": True,
        "days_ago": 2,
    },
    {
        "title": "भारतीय शेअर बाजारात ऐतिहासिक तेजी; सेन्सेक्स ८२,००० पार, आयटी व बँकिंग शेअर्समध्ये तेजी",
        "slug": "indian-stock-market-sensex-record-high",
        "category_slug": "business",
        "excerpt": "परदेशी गुंतवणूकदारांचा वाढता ओघ आणि भक्कम आर्थिक विकास दरामुळे भारतीय बाजाराने नवा उच्चांक प्रस्थापित केला.",
        "content": """# भांडवली बाजारात विक्रमी उत्साह

जागतिक बाजारातील सकारात्मक संकेतांच्या बळावर मुंबई शेअर बाजाराचा निर्देशांक (सेन्सेक्स) ऐतिहासिक पातळीवर पोहोचला आहे. राष्ट्रीय शेअर बाजाराचा निफ्टी २५,००० अंकांच्या जवळ व्यवहार करत आहे.

### बाजारातील प्रमुख घडामोडी:
- बँकिंग, ऑटोमोबाईल आणि आयटी क्षेत्रातील आघाडीच्या कंपन्यांच्या शेअर्समध्ये ३ ते ५ टक्क्यांची वाढ.
- विदेशी संस्थागत गुंतवणूकदारांनी (FIIs) या महिन्यात १५ हजार कोटींची नवीन गुंतवणूक केली.
- देशांतर्गत किरकोळ गुंतवणूकदारांचा म्युच्युअल फंड एसआयपी (SIP) मधील ओघ विक्रमी पातळीवर.""",
        "featured_image_url": "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80",
        "author_name": "विक्रम मेहता (अर्थविषयक संपादक)",
        "is_featured": False,
        "is_breaking": False,
        "days_ago": 3,
    },
    {
        "title": "भारतीय क्रिकेट संघाचा शानदार विजय; कसोटी मालिकेत २-० अशी निर्विवाद आघाडी",
        "slug": "indian-cricket-team-series-victory",
        "category_slug": "sports",
        "excerpt": "फलंदाजी आणि गोलंदाजीत अष्टपैलू कामगिरीच्या जोरावर भारताने प्रतिस्पर्धी संघावर एक डाव आणि ५० धावांनी विजय मिळवला.",
        "content": """# मैदानावर भारतीय खेळाडूंची विजयी गर्जना

मायदेशात सुरू असलेल्या कसोटी मालिकेत भारतीय संघाने आपली पकड अधिक मजबूत केली आहे. दुसऱ्या कसोटी सामन्यात भारताच्या उत्कृष्ट गोलंदाजी आणि संयमी फलंदाजीमुळे मोठा विजय साकार झाला.

### सामन्यातील ठळक नोंदी:
- सलामीवीराचे शानदार शतक आणि मधल्या फळीतील महत्त्वपूर्ण भागीदारी.
- फिरकीपटूंनी दोन्ही डावांत मिळून १२ बळी घेत प्रतिस्पर्धी संघाला धक्के दिले.
- संघाच्या या कामगिरीमुळे जागतिक कसोटी अजिंक्यपद स्पर्धेत (WTC) भारताचे अव्वल स्थान आणखी मजबूत झाले आहे.""",
        "featured_image_url": "https://images.unsplash.com/photo-1531415074868-036b1c5d53ec?auto=format&fit=crop&w=1200&q=80",
        "author_name": "महेश जोशी (क्रीडा प्रतिनिधी)",
        "is_featured": False,
        "is_breaking": False,
        "days_ago": 4,
    },
    {
        "title": "मराठी चित्रपटसृष्टीत नवीन प्रयोग; ऐतिहासिक आणि सामाजिक चित्रपटांना बॉक्स ऑफिसवर पसंती",
        "slug": "marathi-cinema-box-office-success",
        "category_slug": "entertainment",
        "excerpt": "सकस पटकथा, दर्जेदार दिग्दर्शन आणि दमदार अभिनयाच्या जोरावर प्रादेशिक चित्रपटांनी प्रेक्षकांची मने जिंकली.",
        "content": """# मराठी सिनेसृष्टीचा सुवर्णकाळ

गेल्या काही महिन्यांत प्रदर्शित झालेल्या मराठी चित्रपटांनी बॉक्स ऑफिसवर कोट्यवधींची कमाई करत राष्ट्रीय पातळीवर लक्ष वेधले आहे. नव्या दमाच्या दिग्दर्शकांनी हाताळलेले सामाजिक आणि कौटुंबिक विषय प्रेक्षकांना चित्रपटगृहांकडे खेचून आणत आहेत.

### प्रेक्षकांचा कौल:
- मल्टिप्लेक्समध्ये मराठी चित्रपटांसाठी वाढवले गेलेले शोज.
- आंतरराष्ट्रीय चित्रपट महोत्सवांमध्ये मराठी कलाकृतींचा गौरव.
- ओटीटी (OTT) प्लॅटफॉर्म्सवरही मराठी सिनेमांना प्रचंड व्ह्यूज.""",
        "featured_image_url": "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1200&q=80",
        "author_name": "अमृता चिटणीस",
        "is_featured": False,
        "is_breaking": False,
        "days_ago": 4,
    },
    {
        "title": "भारताच्या अंतराळ मोहिमेत आणखी एक यश; इस्रोकडून पुढील पिढीच्या उपग्रहाचे यशस्वी प्रक्षेपण",
        "slug": "isro-launches-next-gen-satellite",
        "category_slug": "technology",
        "excerpt": "हवामान अंदाज, आपत्ती व्यवस्थापन आणि दळणवळण क्षेत्रात क्रांती घडवणारा प्रगत उपग्रह कक्षेत स्थापित.",
        "content": """# अंतराळ विज्ञानात भारताची भरारी

भारतीय अंतराळ संशोधन संस्थेने (ISRO) श्रीहरिकोटा येथील सतीश धवन अंतराळ केंद्रावरून आपल्या सर्वात शक्तिशाली रॉकेटच्या सहाय्याने नवीन उपग्रहाचे यशस्वी प्रक्षेपण केले.

### मोहिमेचे उद्दिष्टे:
- अचूक हवामान अंदाज आणि चक्रीवादळाची पूर्वसूचना मिळवणे.
- ग्रामीण भागातील इंटरनेट कनेक्टिव्हिटी सुधारणे.
- शेती क्षेत्रासाठी मातीची आर्द्रता आणि पिकांच्या आरोग्याचे विश्लेषण उपलब्ध करून देणे.""",
        "featured_image_url": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
        "author_name": "डॉ. मंदार वैद्य (विज्ञान वार्ताहर)",
        "is_featured": False,
        "is_breaking": True,
        "days_ago": 5,
    },
    {
        "title": "जागतिक हवामान परिषदेत नवी दिल्ली जाहीरनाम्याचे स्वागत; विकसनशील देशांसाठी हरित निधीची मागणी",
        "slug": "global-climate-summit-green-fund",
        "category_slug": "world",
        "excerpt": "कार्बन उत्सर्जन कमी करण्यासाठी विकसित देशांनी आर्थिक व तांत्रिक सहाय्य देण्याची भारताची भूमिका सर्वमान्य.",
        "content": """# हवामान बदलावर जागतिक एकमत

आंतरराष्ट्रीय हवामान परिषदेमध्ये भारताने मांडलेल्या शाश्वत विकास आणि जीवनशैली (LiFE) संकल्पनेला विविध देशांनी पाठिंबा दिला आहे. 

### ठळक घडामोडी:
- २०३० पर्यंत सौर आणि पवन ऊर्जेचे प्रमाण तिप्पट करण्याचे उद्दिष्ट.
- विकसनशील देशांना पूर आणि दुष्काळ निवारणासाठी आपत्कालीन निधी उपलब्ध करून देण्याचा निर्णय.
- पर्यावरणपूरक तंत्रज्ञानाची देवाणघेवाण वाढवण्यावर भर.""",
        "featured_image_url": "https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1200&q=80",
        "author_name": "संजय गोखले (आंतरराष्ट्रीय घडामोडी)",
        "is_featured": False,
        "is_breaking": False,
        "days_ago": 5,
    },
    {
        "title": "महाराष्ट्र राज्य माध्यमिक व उच्च माध्यमिक मंडळाचा नवीन शैक्षणिक आराखडा जाहीर",
        "slug": "maharashtra-board-new-education-framework",
        "category_slug": "education",
        "excerpt": "१०वी आणि १२वीच्या परीक्षा पद्धतीत कौशल्याधारित शिक्षणाला अधिक महत्त्व; प्रात्यक्षिक गुणांची पुनर्रचना.",
        "content": """# शालेय शिक्षणात क्रांतिकारी बदल

राष्ट्रीय शैक्षणिक धोरणानुसार (NEP) महाराष्ट्र राज्य शिक्षण मंडळाने अभ्यासक्रमात आणि मूल्यमापन पद्धतीत महत्त्वपूर्ण बदल केले आहेत. आता पाठांतराऐवजी विद्यार्थ्यांच्या विश्लेषणात्मक विचारसरणीवर भर दिला जाईल.

### प्रमुख सुधारणा:
- ६वी ते १२वीच्या विद्यार्थ्यांसाठी व्यावसायिक कौशल्य प्रशिक्षण सक्तीचे.
- डिजिटल ई-लर्निंग प्लॅटफॉर्मवर सर्व पाठ्यपुस्तके व व्हिडिओ लेक्चर्स मोफत उपलब्ध.
- विद्यार्थ्यांवरील ताण कमी करण्यासाठी समुपदेशन कक्ष प्रत्येक शाळेत सुरू होणार.""",
        "featured_image_url": "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80",
        "author_name": "प्रा. शशिकांत कुलकर्णी",
        "is_featured": False,
        "is_breaking": False,
        "days_ago": 6,
    },
    {
        "title": "आरोग्य संजीवनी: बदलत्या ऋतूत प्रतिकारशक्ती वाढवण्यासाठी तज्ज्ञांचा बहुमोल सल्ला",
        "slug": "health-immunity-tips-seasonal-wellness",
        "category_slug": "health",
        "excerpt": "सकस आहार, नियमित व्यायाम आणि पुरेशी झोप या त्रिसूत्रीने हंगामी आजारांपासून दूर राहा.",
        "content": """# निरोगी आरोग्याची गुरुकिल्ली

हवामानातील बदलांमुळे उद्भवणाऱ्या सर्दी, खोकला आणि फ्लूच्या संसर्गापासून बचाव करण्यासाठी आहारात व्हिटॅमिन सी आणि अँटिऑक्सिडंट्सयुक्त पदार्थांचा समावेश करणे अत्यंत आवश्यक आहे.

### तज्ज्ञांचे मार्गदर्शन:
- **पाण्याचे प्रमाण:** दिवसातून किमान ३ लिटर कोमट पाणी प्यावे.
- **नैसर्गिक औषधी:** हळद, आले, तुळस आणि मधाचा नियमित वापर करावा.
- **व्यायाम:** दररोज किमान ३० मिनिटे योगासने किंवा चालण्याचा व्यायाम शरीराची ऊर्जा टिकवून ठेवतो.""",
        "featured_image_url": "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80",
        "author_name": "डॉ. स्मिता पाटील (आरोग्य तज्ज्ञ)",
        "is_featured": False,
        "is_breaking": False,
        "days_ago": 6,
    }
]


def seed_articles(db: Session, admin_user: User) -> int:
    """Seed rich realistic sample articles and enforce only Website Launch is featured."""
    # 1. Permanently remove requested legacy articles from the database
    if REMOVED_SLUGS:
        db.execute(delete(Article).where(Article.slug.in_(REMOVED_SLUGS)))
        db.commit()
        logger.info(f"Purged removed articles from database: {REMOVED_SLUGS}")

    created_count = 0
    now = datetime.now(timezone.utc)

    # Cache categories by slug
    categories = {c.slug: c for c in db.scalars(select(Category)).all()}

    for art_data in SAMPLE_ARTICLES:
        existing = db.scalar(select(Article).where(Article.slug == art_data["slug"]))
        if not existing:
            cat = categories.get(art_data["category_slug"])
            if not cat:
                continue

            pub_date = now - timedelta(days=art_data.get("days_ago", 0), hours=2)

            article = Article(
                title=art_data["title"],
                slug=art_data["slug"],
                excerpt=art_data["excerpt"],
                content=art_data["content"],
                featured_image_url=art_data["featured_image_url"],
                category_id=cat.id,
                author_id=admin_user.id if admin_user else None,
                author_name=art_data["author_name"],
                status="published",
                is_featured=art_data.get("is_featured", False),
                is_breaking=art_data.get("is_breaking", False),
                published_at=pub_date,
            )
            db.add(article)
            created_count += 1
        else:
            # Sync is_featured flag
            existing.is_featured = art_data.get("is_featured", False)

    # Make sure all other articles that are not 'nirbhid-news-website-launch' have is_featured = False
    db.execute(
        update(Article)
        .where(Article.slug != "nirbhid-news-website-launch")
        .values(is_featured=False)
    )

    db.commit()
    logger.info(f"Seeded {created_count} articles and enforced single featured website launch story.")
    return created_count
