(function () {
  const THEME_STORAGE_KEY = "iist-computex-theme";
  const LANGUAGE_STORAGE_KEY = "iist-computex-language";
  const root = document.documentElement;
  const systemTheme = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;
  const originalTextNodes = new WeakMap();

  const ZH_HANT = {
    "IIST Hardware Trust Platform": "IIST 硬體信任平台",
    "Export page": "匯出頁面",
    "Share": "分享",
    "Website": "官方網站",
    "Email": "電子郵件",
    "Contact IIST": "聯絡 IIST",
    "Share with colleague": "分享給同事",
    "Share this site": "分享此網站",
    "Book a follow-up": "預約後續討論",
    "Watch video": "觀看影片",
    "← Back to profile section": "← 返回角色選擇",
    "Hardware-rooted trust for identity, devices, and authenticity": "以硬體為根基的身分、裝置與真實性信任",
    "Select your profile": "選擇你的角色",
    "IIST brings Dynamic PUF technology into security keys, secure modules, silicon/IP, and trust workflows. Pick a profile and share the page with the colleague who owns the next step.": "IIST 將 Dynamic PUF 技術應用於安全金鑰、安全模組、晶片/IP 與信任流程。請選擇最接近你的角色，並將頁面分享給負責下一步的同事。",
    "FIDO2 and passkeys": "FIDO2 與 Passkeys",
    "Zero-Trust Architecture": "零信任架構",
    "C2PA-oriented": "C2PA 導向",
    "PQC-ready migration": "PQC 遷移準備",
    "OEM / ODM Device Makers": "OEM / ODM 裝置製造商",
    "IT Cybersecurity Providers": "資安服務與平台業者",
    "Semiconductor & IP Partners": "半導體與 IP 夥伴",
    "Investors / CVC": "投資人 / CVC",
    "Solution Distributors": "解決方案通路商",
    "Consumers & Professionals": "個人與專業使用者",
    "Add hardware-rooted trust to network, edge, AIoT, and embedded products.": "為網通、邊緣、AIoT 與嵌入式產品加入硬體信任根。",
    "Bundle physical trust into IAM, MSSP, EDR/XDR, and zero-trust offers.": "將實體硬體信任整合到 IAM、MSSP、EDR/XDR 與零信任方案。",
    "Evaluate Dynamic PUF as a reusable root-of-trust primitive.": "評估 Dynamic PUF 作為可重複使用的信任根基礎。",
    "Review the platform story, product forms, proof points, and market leverage.": "了解平台定位、產品型態、證明點與市場槓桿。",
    "Start with sellable security keys and expand toward modules and projects.": "從可銷售的安全金鑰開始，延伸到模組與專案機會。",
    "Protect important accounts with a physical FIDO2 security key.": "使用實體 FIDO2 安全金鑰保護重要帳號。",
    "SASe module, device identity": "SASe 模組、裝置信任",
    "FIDO2, signing, bundles": "FIDO2、簽章、套裝方案",
    "PUF IP, RoT, TRNG": "PUF IP、信任根、TRNG",
    "Products, roadmap, traction": "產品、路線圖、進展",
    "Demo kits, channel package": "展示套件、通路方案",
    "Ankhor Key, passkeys": "Ankhor Key、Passkeys",
    "Center Stage talk": "Center Stage 演講",
    "June 4, 2026 at 14:30": "2026 年 6 月 4 日 14:30",
    "Center Stage, TaiNEX 2 4F. Meet IIST for a concise introduction to hardware-rooted trust and Dynamic PUF applications.": "地點：南港展覽館二館 4F Center Stage。歡迎聽 IIST 快速介紹硬體信任根與 Dynamic PUF 應用。",
    "Secure identity": "安全身分",
    "FIDO2, passkeys, admin access": "FIDO2、Passkeys、管理者存取",
    "Device trust": "裝置信任",
    "PUF-backed identity and provisioning": "PUF 支援的身分與佈建",
    "Authenticity": "真實性",
    "Evidence, logs, media, and workflows": "證據、紀錄、媒體與流程",
    "Crypto-agility": "密碼敏捷性",
    "Practical path toward PQC migration": "邁向 PQC 遷移的實務路徑",
    "Video introduction": "影片介紹",
    "A short product and platform video can be linked here when the final YouTube URL is ready.": "最終 YouTube 連結準備好後，可在此放置產品與平台短片。",
    "Watch the IIST product and platform video during or after your booth visit.": "在參觀展位期間或之後觀看 IIST 產品與平台影片。",
    "IIST video introduction": "IIST 影片介紹",
    "A concise introduction to IIST, Dynamic PUF, and hardware-rooted trust for COMPUTEX visitors.": "為 COMPUTEX 參觀者準備的 IIST、Dynamic PUF 與硬體信任根簡介。",
    "Where to find us": "如何找到我們",
    "Find IIST at COMPUTEX 2026": "在 COMPUTEX 2026 找到 IIST",
    "First go to TaiNEX 2, 4F, Section S. Then use the detailed Section S map below for the two marked IIST locations.": "請先前往南港展覽館二館 4F 的 S 區，再使用下方 S 區詳細地圖找到兩個以綠色標示的 IIST 位置。",
    "Section S": "S 區",
    "Two marked locations": "兩個標示位置",
    "Booth map": "展位地圖",
    "Use the first map to reach the correct hall. Use the second map once you are on TaiNEX 2, 4F.": "先使用第一張地圖前往正確展館；到達南港展覽館二館 4F 後，再使用第二張地圖。",
    "Step 1": "步驟 1",
    "Get to the right hall": "前往正確展館",
    "TaiNEX 2, 4F, Section S.": "南港展覽館二館 4F，S 區。",
    "Open hall map": "開啟展館地圖",
    "Step 2": "步驟 2",
    "Find the marked locations": "找到標示位置",
    "Two IIST points are marked in green on the Section S floor map.": "S 區平面圖上以綠色標示兩個 IIST 位置。",
    "Open floor map": "開啟樓層地圖",
    "Need help finding us?": "需要協助找到我們嗎？",
    "Contact service@iist.com.tw and tell us you are at COMPUTEX 2026, TaiNEX 2, 4F.": "請聯絡 service@iist.com.tw，並告訴我們你在 COMPUTEX 2026 南港展覽館二館 4F。",
    "Need the right IIST contact?": "需要找到合適的 IIST 聯絡窗口嗎？",
    "Send your profile, company, and target use case. We will route the discussion to the right technical or commercial owner.": "請提供你的角色、公司與目標應用，我們會協助轉給合適的技術或商務窗口。",
    "For connected product teams": "適合連網產品團隊",
    "Add hardware-rooted trust to network equipment, industrial edge, AIoT, gateways, and embedded systems without starting from a full custom chip.": "不必從客製晶片開始，也能為網通設備、工業邊緣、AIoT、閘道器與嵌入式系統加入硬體信任根。",
    "SASe module": "SASe 模組",
    "Ankhor Key": "Ankhor Key",
    "Field evidence": "現場證據",
    "What to discuss at the booth": "展位上適合討論什麼",
    "Bring one target product or reference design. We can map where trust belongs in the device, in the operator key, and in software.": "帶著一個目標產品或參考設計，我們可以協助釐清哪些信任功能應放在裝置、操作員金鑰或軟體層。",
    "Integrate trust faster": "更快整合信任功能",
    "Use a secure module path for identity, key handling, local challenge-response, and protected workflows.": "透過安全模組導入身分、金鑰處理、本地挑戰回應與受保護流程。",
    "Protect operators": "保護操作人員",
    "Add Ankhor Key for admin access, field service, and sensitive maintenance actions.": "以 Ankhor Key 保護管理者存取、現場服務與敏感維護操作。",
    "Strengthen evidence": "強化證據可信度",
    "Make logs, images, firmware events, and service records easier to trust and explain.": "讓紀錄、影像、韌體事件與服務紀錄更容易被信任與說明。",
    "Best fit": "最適合",
    "IIST path": "IIST 導入路徑",
    "Routers, gateways, industrial controllers, edge devices, and AIoT products.": "路由器、閘道器、工業控制器、邊緣裝置與 AIoT 產品。",
    "Products needing stronger device identity, provisioning, or operator access.": "需要更強裝置身分、佈建或操作員存取控管的產品。",
    "Roadmaps moving toward crypto-agile and post-quantum readiness.": "正規劃密碼敏捷與後量子準備的產品路線圖。",
    "SASe secure module for product integration.": "用於產品整合的 SASe 安全模組。",
    "Ankhor Key for operators, admins, and service teams.": "提供給操作員、管理者與服務團隊的 Ankhor Key。",
    "Trust SDK and private architecture review after fit check.": "初步確認適配後，可進行 Trust SDK 與私下架構審查。",
    "SASe secure module": "SASe 安全模組",
    "Integration-ready hardware trust for connected products.": "可整合進連網產品的硬體信任方案。",
    "Visible hardware authentication for operators and enterprise users.": "面向操作員與企業使用者的可見硬體驗證。",
    "Compliance & buyer proof": "合規與買方佐證",
    "Support enterprise review, product-security discussions, and buyer confidence.": "支援企業審查、產品安全討論與買方信心。",
    "Discuss your next device platform.": "討論你的下一代裝置平台。",
    "Share your product class, host interface, security goal, and target timeline.": "分享產品類別、主機介面、安全目標與時程。",
    "For security platforms and bundles": "適合資安平台與套裝方案",
    "Add a hardware-backed trust layer to IAM, MSSP, EDR/XDR, zero-trust, and evidence workflows.": "為 IAM、MSSP、EDR/XDR、零信任與證據流程加入硬體支援的信任層。",
    "Admin access": "管理者存取",
    "Bundle programs": "套裝方案",
    "Where hardware trust helps": "硬體信任可以協助的地方",
    "Use a physical security device to make high-value security workflows easier to trust, sell, and explain.": "透過實體安全裝置，讓高價值資安流程更容易被信任、銷售與說明。",
    "Phishing-resistant login": "抗釣魚登入",
    "Evidence authenticity": "證據真實性",
    "Visible security bundle": "可見的資安套裝",
    "Trust workflows": "信任流程",
    "Demo-ready path": "可展示導入路徑",
    "Explore a hardware-backed security bundle.": "探索硬體支援的資安套裝方案。",
    "For silicon and secure platform teams": "適合晶片與安全平台團隊",
    "Evaluate Dynamic PUF as a reusable hardware trust primitive for secure MCU, SoC, ASIC, and platform IC roadmaps.": "評估 Dynamic PUF 作為安全 MCU、SoC、ASIC 與平台 IC 路線圖中的可重複使用硬體信任基礎。",
    "Dynamic PUF": "Dynamic PUF",
    "Root of trust": "信任根",
    "Architecture conversation starters": "架構討論起點",
    "Device-unique identity": "裝置唯一身分",
    "Reusable trust anchor": "可重複使用的信任錨點",
    "Crypto-agile roadmap": "密碼敏捷路線圖",
    "IP evaluation proof": "IP 評估佐證",
    "Start an NDA discussion on Dynamic PUF.": "啟動 Dynamic PUF 的 NDA 討論。",
    "For venture and strategic investors": "適合創投與策略投資人",
    "Proof points": "證明點",
    "Platform roadmap": "平台路線圖",
    "Investment thesis in brief": "投資觀點摘要",
    "Product now": "現有產品",
    "Platform leverage": "平台槓桿",
    "Strategic timing": "策略時機",
    "Visible today": "目前可見進展",
    "Diligence topics": "盡職調查重點",
    "Investor proof points": "投資人佐證",
    "Request the investor overview and demo.": "索取投資人簡報與展示。",
    "For channels and system integrators": "適合通路與系統整合商",
    "Ankhor Key": "Ankhor Key",
    "Demo kits": "展示套件",
    "Reseller package": "經銷方案",
    "Integration path": "整合路徑",
    "Why it is channel-friendly": "為什麼適合通路",
    "Simple first sale": "容易開始銷售",
    "Fast demos": "快速展示",
    "Expansion path": "擴展路徑",
    "Discuss distribution and demo kits.": "討論通路合作與展示套件。",
    "For personal and work account protection": "適合個人與工作帳號保護",
    "Use a physical FIDO2 security key to protect important accounts instead of relying only on passwords, SMS codes, or recovery questions.": "使用實體 FIDO2 安全金鑰保護重要帳號，不再只依賴密碼、簡訊驗證碼或安全問題。",
    "Passkeys": "Passkeys",
    "Daily login": "日常登入",
    "Why carry a security key": "為什麼需要攜帶安全金鑰",
    "Protect key accounts": "保護關鍵帳號",
    "Reduce phishing risk": "降低釣魚風險",
    "Keep trust local": "讓信任留在本地",
    "Hardware trust foundation": "硬體信任基礎",
    "Ask for a quick Ankhor Key demo.": "詢問 Ankhor Key 快速展示。"
  };

  function storedTheme() {
    try {
      const value = window.localStorage.getItem(THEME_STORAGE_KEY);
      return value === "dark" || value === "light" ? value : "";
    } catch (error) {
      return "";
    }
  }

  function preferredTheme() {
    return systemTheme && systemTheme.matches ? "dark" : "light";
  }

  function activeTheme() {
    return root.getAttribute("data-theme") || storedTheme() || preferredTheme();
  }

  function updateThemeButtons(theme) {
    document.querySelectorAll("[data-theme-toggle]").forEach(function (button) {
      const nextTheme = theme === "dark" ? "light" : "dark";
      button.setAttribute("data-theme-current", theme);
      button.setAttribute("aria-label", "Switch to " + nextTheme + " mode");
      button.setAttribute("title", "Switch to " + nextTheme + " mode");
      const icon = button.querySelector("[data-theme-icon]");
      if (icon) {
        icon.src = icon.src.replace(/icon-(moon|sun)\.svg$/, "icon-" + (theme === "dark" ? "sun" : "moon") + ".svg");
      }
    });
  }

  function applyTheme(theme, persist) {
    const normalizedTheme = theme === "dark" ? "dark" : "light";
    root.setAttribute("data-theme", normalizedTheme);
    if (persist) {
      try {
        window.localStorage.setItem(THEME_STORAGE_KEY, normalizedTheme);
      } catch (error) {
        // Ignore storage failures; the visible theme still changes for this page.
      }
    }
    updateThemeButtons(normalizedTheme);
  }

  applyTheme(storedTheme() || preferredTheme(), false);

  function storedLanguage() {
    try {
      const value = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
      return value === "zh-Hant" || value === "en" ? value : "";
    } catch (error) {
      return "";
    }
  }

  function activeLanguage() {
    return root.getAttribute("data-language") || storedLanguage() || "en";
  }

  function hasNoTranslateAncestor(node) {
    let element = node.parentElement;
    while (element) {
      if (element.hasAttribute("data-no-i18n") || ["SCRIPT", "STYLE", "NOSCRIPT"].includes(element.tagName)) {
        return true;
      }
      element = element.parentElement;
    }
    return false;
  }

  function translateTextValue(value, language) {
    const original = value;
    const trimmed = original.trim();
    if (!trimmed) {
      return original;
    }
    const leading = original.match(/^\s*/)[0];
    const trailing = original.match(/\s*$/)[0];
    const translated = language === "zh-Hant" ? ZH_HANT[trimmed] || trimmed : trimmed;
    return leading + translated + trailing;
  }

  function translatePage(language) {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) {
      nodes.push(walker.currentNode);
    }

    nodes.forEach(function (node) {
      if (hasNoTranslateAncestor(node)) {
        return;
      }
      if (!originalTextNodes.has(node)) {
        originalTextNodes.set(node, node.nodeValue);
      }
      node.nodeValue = translateTextValue(originalTextNodes.get(node), language);
    });
  }

  function updateLanguageButtons(language) {
    document.querySelectorAll("[data-language-toggle]").forEach(function (button) {
      const nextLanguage = language === "zh-Hant" ? "English" : "繁體中文";
      button.setAttribute("aria-label", "Switch to " + nextLanguage);
      button.setAttribute("title", "Switch to " + nextLanguage);
      const code = button.querySelector(".language-code");
      if (code) {
        code.textContent = language === "zh-Hant" ? "EN" : "繁";
      }
    });
  }

  function applyLanguage(language, persist) {
    const normalizedLanguage = language === "zh-Hant" ? "zh-Hant" : "en";
    root.setAttribute("lang", normalizedLanguage === "zh-Hant" ? "zh-Hant" : "en");
    root.setAttribute("data-language", normalizedLanguage);
    translatePage(normalizedLanguage);
    updateLanguageButtons(normalizedLanguage);
    if (persist) {
      try {
        window.localStorage.setItem(LANGUAGE_STORAGE_KEY, normalizedLanguage);
      } catch (error) {
        // Ignore storage failures; the visible language still changes for this page.
      }
    }
  }

  function pageDescription() {
    const description = document.querySelector('meta[name="description"]');
    return description ? description.content : "IIST COMPUTEX 2026 hardware trust brochure.";
  }

  function setStatus(button, text) {
    const id = button.getAttribute("aria-describedby");
    if (!id) {
      return;
    }
    const status = document.getElementById(id);
    if (!status) {
      return;
    }
    status.textContent = text;
    window.setTimeout(function () {
      status.textContent = "";
    }, 2600);
  }

  async function sharePage(button) {
    const shareData = {
      title: document.title,
      text: pageDescription(),
      url: window.location.href
    };

    if (navigator.share) {
      await navigator.share(shareData);
      return;
    }

    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(window.location.href);
      setStatus(button, "Link copied.");
      return;
    }

    setStatus(button, window.location.href);
  }

  function addThemeToggle() {
    const actions = document.querySelector(".page-actions");
    if (!actions || document.querySelector("[data-theme-toggle]")) {
      return;
    }

    const button = document.createElement("button");
    button.type = "button";
    button.className = "control-toggle theme-toggle";
    button.setAttribute("data-theme-toggle", "");
    button.innerHTML = '<img class="control-icon" src="assets/icon-moon.svg" alt="" width="20" height="20" data-theme-icon><span class="visually-hidden">Toggle light or dark mode</span>';
    actions.appendChild(button);
    updateThemeButtons(activeTheme());
  }

  function handleLanguageToggle(event) {
    event.preventDefault();
    applyLanguage(activeLanguage() === "zh-Hant" ? "en" : "zh-Hant", true);
  }

  function handleThemeToggle(event) {
    event.preventDefault();
    applyTheme(activeTheme() === "dark" ? "light" : "dark", true);
  }

  function bindControlButtons() {
    document.querySelectorAll("[data-language-toggle]").forEach(function (button) {
      if (button.dataset.boundControl === "true") {
        return;
      }
      button.dataset.boundControl = "true";
      button.addEventListener("click", handleLanguageToggle);
    });

    document.querySelectorAll("[data-theme-toggle]").forEach(function (button) {
      if (button.dataset.boundControl === "true") {
        return;
      }
      button.dataset.boundControl = "true";
      button.addEventListener("click", handleThemeToggle);
    });
  }

  document.addEventListener("click", function (event) {
    const languageButton = event.target.closest("[data-language-toggle]");
    if (languageButton) {
      return;
    }

    const themeButton = event.target.closest("[data-theme-toggle]");
    if (themeButton) {
      return;
    }

    const printButton = event.target.closest("[data-print-page]");
    if (printButton) {
      event.preventDefault();
      window.print();
      return;
    }

    const shareButton = event.target.closest("[data-share-page]");
    if (shareButton) {
      event.preventDefault();
      sharePage(shareButton).catch(function () {
        setStatus(shareButton, "Share was not completed.");
      });
      return;
    }

  });

  document.addEventListener("DOMContentLoaded", function () {
    addThemeToggle();
    bindControlButtons();
    updateThemeButtons(activeTheme());
    applyLanguage(storedLanguage() || "en", false);
  });

  if (systemTheme && systemTheme.addEventListener) {
    systemTheme.addEventListener("change", function () {
      if (!storedTheme()) {
        applyTheme(preferredTheme(), false);
      }
    });
  }
})();
