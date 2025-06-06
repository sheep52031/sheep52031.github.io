---
# 專案基本資訊（必填）
title: "Lumacool Delivery：自主可控的餐飲外送生態系統"
date: "2024" # 專案年份 (基於LUMACOOL經歷 2024年1月 – 2025年1月)
image: "/project1/cover_photo.PNG" # 主要顯示圖片
shortDescription: "為解決主流外送平台高抽成及數據不透明問題，獨立開發的餐飲外送平台，旨在賦能商家、降低成本並實現自主行銷。"
technologies: ["Python", "FastAPI", "React", "Next.js", "TypeScript", "Pydantic", "Firebase Firestore", "Google Cloud Platform (GCP)", "Google Cloud Run", "Docker", "Strategy Pattern"] # 使用的技術列表

# 專案連結（選填）
githubLink: "" # GitHub 倉庫連結 (您的Repo是私有的，可留空或放其他公開相關連結)
projectDocumentUrl: "https://deepwiki.com/sheep52031/Delivery-platform-system" # 專案文件連結 (您的DeepWiki)
architectureDiagramUrl: "/project1/lumacool_archtisture02.svg" # 架構圖連結
demoLink: "https://www.lumacool.com/" # 線上演示連結
videoUrl: "" # 視頻連結 (若有請提供)

# 截圖區塊（選填）
screenshots:
  - url: "/project1/menu_page.png"
    caption: "菜單頁面"
    dataAiHint: "menu page"
  - url: "/project1/customized_products.png"
    caption: "商品客製化選項"
    dataAiHint: "customized products"
  - url: "/project1/shopping_cart_list.png"
    caption: "購物車列表"
    dataAiHint: "shopping cart list"
  - url: "/project1/referral_code_url.png"
    caption: "推薦碼連結"
    dataAiHint: "referral code url"
  - url: "/project1/new_user_registration_via_referral_code_url.png"
    caption: "透過推薦碼註冊新用戶"
    dataAiHint: "new user registration via referral code"
  - url: "/project1/set_delivery_address.png"
    caption: "設置配送地址"
    dataAiHint: "set delivery address"
  - url: "/project1/check_out_page.png"
    caption: "結帳頁面"
    dataAiHint: "check out page"
  - url: "/project1/generate_order.png"
    caption: "生成訂單"
    dataAiHint: "generate order"
---

# Lumacool Delivery：自主可控的外送餐飲系統 

## 專案背景與目標

在菲律賓宿霧成功創辦LUMACOOL飲料品牌並投入實體店鋪運營後，我透過對日常營收數據的分析及對本地市場的深入觀察，發現了業務持續增長的關鍵瓶頸與潛在機遇。一方面，主流外送平台（如Grab、Uber Eats）憑藉其卓越的用戶體驗、高效配送及強大的訂單轉換能力，確實為商家帶來了可觀的客流，但也因此收取高達50%的綜合抽成（含平台抽佣與必要的廣告投放），嚴重侵蝕了利潤空間，且商家難以掌握核心客戶數據，行銷手段亦受限；另一方面，宿霧地區擁有相對充裕的第三方配送人力資源，且外送服務的物流成本在可控範圍內。

基於以上洞察，同時結合AI Agent技術日益成熟、個人開發工具能力提升的契機，我判斷為LUMACOOL打造一個自主可控的數位外送平台，不僅是解決當前困境的可行方案，更是品牌發展的策略性延伸。因此，在維持飲料店日常運營的同時，我利用業餘時間，並藉助AI Agent輔助開發，啟動了Lumacool Delivery平台的從零到一的建設。此專案的核心目標，從最初為自有店鋪提升效率、降低成本，逐步演化為一個旨在賦能更廣泛商家、建立私域流量、並透過數據洞察優化商業決策的獨立數位生態系統。

## 核心功能與特色

Lumacool Delivery作為LUMACOOL飲料店的專屬外送解決方案，其核心功能模組旨在優化本店運營與顧客體驗，並探索傳統大型平台因其運營成本與商業模式限制而難以提供的行銷彈性：

* **基礎運營模組：** 包含為LUMACOOL品牌客製化的會員系統、動態化菜單管理、流暢的訂單處理與自動化派單功能，確保了基礎外送服務的順暢運行。
* **自主行銷的探索與實踐：**
    * **設計初衷：** 針對LUMACOOL單一品牌，將從自建平台中節省下來的高額平台抽成與廣告費用，轉化為更靈活、更具吸引力的客戶激勵措施，以深化品牌與顧客的連結。
    * **特色機制：** 實現了更具彈性的優惠券系統與推薦獎勵機制。後端針對多樣化的促銷場景（如滿減、折扣、特定商品優惠）採用「策略設計模式」(Strategy Pattern) 進行構建，確保了邏輯的清晰與未來擴展性。這為後續規劃的「聯盟行銷系統」奠定了基礎，讓忠實顧客能成為品牌推廣的參與者並從中獲益，這是大型平台難以提供的深度合作模式。
* **數據洞察的起點 (規劃中)：** 計劃開發數據分析儀表板，用以監測LUMACOOL品牌的銷售趨勢、分析用戶消費行為，為產品調整和行銷策略提供初步的數據支持。

## 技術架構與實現

在技術選型與架構設計上，我始終以系統的穩定性、可擴展性及成本效益為核心考量：

### 前端實現

* 採用 **React** 框架與 **TypeScript** 構建響應式、用戶友好的前端界面，確保了代碼的類型安全與可維護性。
* 選用 **Next.js** 框架，為未來可能的SEO需求及更優的開發體驗打下基礎。
* 重視前後端數據模型的一致性，探索了將後端Pydantic模型自動轉換為前端TypeScript定義的最佳實踐，以減少溝通成本和潛在錯誤。

### 後端架構

* 採用經典的**三層架構**：
    * **API層 (FastAPI)：** 負責處理HTTP請求、路由分發及基礎的請求驗證。選擇FastAPI是看重其基於Python類型提示的高性能、異步支持以及與Pydantic的無縫集成。
    * **Service層：** 封裝核心業務邏輯，處理複雜的業務規則與流程。透過「依賴注入」(Dependency Injection) 管理服務間的依賴關係，有效降低了模組間的耦合度，提升了代碼的可測試性與可維護性。
    * **Repository/Model層：** 負責與數據庫 (Firebase Firestore) 的交互操作，以及使用 **Pydantic** 進行嚴格的數據模型定義與驗證。
* 資料庫選用 **Firebase Firestore** (NoSQL)，因其靈活的數據結構、實時同步能力及與GCP生態的良好集成。

### 部署與運維

* 應用服務透過 **Docker** 進行容器化，確保了開發、測試與生產環境的一致性。
* 部署於 **Google Cloud Run** (GCP)，充分利用其無伺服器特性，實現了服務的按需自動擴展與成本優化，無需管理底層基礎設施。

## 開發過程中的挑戰與解決方案

在Lumacool Delivery從概念到MVP的實踐過程中，我克服了多項技術與流程挑戰，這些經歷不僅錘鍊了我的解決問題能力，更深化了我對軟體工程最佳實踐的理解。主要的學習與成長包括：

### 挑戰一：數據驗證的演進之路——從混亂到有序

* **問題：** 專案初期，對後端數據模型（尤其是在Pydantic的繼承與組合使用上）的設計理解不夠深入，導致部分API的請求與響應數據驗證不夠嚴謹，前端數據格式也缺乏統一規範，為後續的聯調與重構埋下了隱患。
* **解決方案：** 隨著開發的深入，我意識到嚴格的數據驗證是保障系統穩定性的基石。我投入時間重構了核心數據模型，強制要求所有API接口使用Pydantic進行輸入輸出驗證，並建立了從Pydantic模型到前端TypeScript Interface的自動化同步機制。深刻體會到，清晰、一致的數據契約是高效團隊協作的前提，也是系統健壯性的重要保障。

### 挑戰二：模組開發順序的教訓——菜單與優惠券的愛恨情仇

* **問題：** 由於初期對業務流程的整體把握不夠，我曾先於菜單系統的詳細設計便開始了優惠券模組的開發。當優惠券需要與特定商品或品類產生複雜關聯時，發現既有的菜單數據模型無法很好地支持這些需求，導致了返工。
* **解決方案：** 這讓我認識到，在複雜系統中，核心領域模型（如菜單、商品）的穩定性至關重要。後續我調整了開發策略，優先穩定核心數據結構，再開發依賴於這些結構的上層業務功能，從而提升了開發效率和系統的內聚性。

### 挑戰三：前端構建與類型檢查的紀律

* **問題：** 初期習慣於僅在開發環境(`npm run dev`)中調試，忽略了在開發過程中頻繁執行生產環境構建(`npm run build`)的重要性，導致一些潛在的TypeScript類型錯誤或構建問題未能及早暴露。
* **解決方案：** 後來我將定期執行`npm run build`納入開發流程，並更嚴格地遵循TypeScript的類型規範，有效減少了後期集成時的意外。

## 成果與收穫

Lumacool Delivery作為一個旨在優化自有品牌運營的內部專案，其核心數位平台已完成MVP版本的開發與部署。此過程不僅讓我完整實踐了全棧開發、雲端部署、產品設計的技能，更重要的是，錘鍊了我從商業視角出發，運用技術解決實際運營痛點的能力，並深刻體會到在有限資源下進行敏捷開發與迭代的重要性。

面對AI技術的飛速發展，我深刻認識到軟體工程師的核心價值正發生轉變：從單純的編碼執行者，進化為具備深度系統架構理解、巧妙運用設計模式、高效分解與抽象複雜問題，並能洞察業務需求的策略性角色。在Lumacool Delivery的開發過程中，我積極擁抱並實踐了與AI編程助手（如Cursor、Windsurf IDE中的AI Agent）的協作，擔任了需求的精準定義者、架構的規劃者以及AI Agent的引導者與程式碼的審查者。

## 未來展望

雖然LUMACOOL實體店鋪因外部因素調整，但Lumacool Delivery的探索並未停止。展望未來，我認為在現有MVP基礎上，結合AI Agent的潛力，可以為這類外送服務帶來更多創新性的突破：

* **AI驅動的個性化點餐體驗：** 探索整合語音或自然語言處理技術，讓用戶能透過與AI Agent對話的方式快速完成點餐，AI Agent可基於用戶偏好與情境主動推薦，優化傳統UI交互，提升用戶滿意度。
* **智能化第三方配送服務整合：** 針對第三方配送服務未提供標準API的情況，研究利用AI Agent（如類似BrowserUse的技術）實現自動化對接，打通「最後一哩路」。
* **構建用戶數據飛輪與智能推薦：** 隨著用戶數據的積累，利用機器學習分析用戶偏好，形成精準用戶畫像，AI Agent可基於此提供更智能化的商品推薦與促銷，提升轉化率與用戶黏性。

這些基於AI Agent的創新構想，不僅能提升現有MVP的功能深度，更有潛力在未來打造出具備顯著市場差異化的新型態外送服務體驗。這也代表了我對技術發展趨勢的關注，以及將新技術應用於解決實際問題、創造商業價值的熱情。

---
**DeepWiki:** <https://deepwiki.com/sheep52031/Delivery-platform-system>
