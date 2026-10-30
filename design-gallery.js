const designProjects = [
    {
        slug: "vigneflow",
        title: "Vigneflow | Event Planning Agency Identity",
        description:
            "Brand identity for an event management and planning agency: logo, palette, typography and applications.",
        category: "Brand Identity",
        year: "2026",
        tools: ["Illustrator", "InDesign"],
        cover: "img/design/vigneflow/cover.png",
        pages: [
            "img/design/vigneflow/01-overview.png",
            "img/design/vigneflow/02-logo.png",
            "img/design/vigneflow/03-palette.png",
            "img/design/vigneflow/04-applications.png",
        ],
    },
    {
        slug: "bonfire-night",
        title: "Bonfire Night | Campaign Visuals",
        description: "Flyers and social visuals for a campus event at Mitini Lounge.",
        category: "Campaign Design",
        year: "2026",
        tools: ["Illustrator"],
        cover: "img/design/bonfire-night/cover.png",
        pages: [
            "img/design/bonfire-night/01-flyer-main.png",
            "img/design/bonfire-night/02-social-partner.png",
            "img/design/bonfire-night/03-social-ticket.png",
            "img/design/bonfire-night/04-social-CUNSA.png",
            "img/design/bonfire-night/05-mascot.png",
        ],
    },

    {
        slug: "csa-brand guideline",
        title: "CSA Brand identity design",
        description: "Brand identity for international outreach under the School of Computing Science, \n" +
            "University of Glasgow.",
        category: "Brand Identity design",
        year: "2025",
        tools: ["Illustrator"],
        cover: "img/design/csa-brand/cover.png",
        pages: [
            "img/design/csa-brand/01-overview.png",
            "img/design/csa-brand/02-logo.png",
            "img/design/csa-brand/03-palette.png",
            "img/design/csa-brand/04-typeface.png",
            "img/design/csa-brand/05-applications.png",
        ],
    },
    {
        slug: "AIESEC OGX Exchange guideline",
        title: "AIESEC OGX Exchange guideline",
        description: "A document presentation for a session I was presenting on AIESEC Outgoing Global Exchange",
        category: "Campaign Design",
        year: "2025",
        tools: ["Indesign"],
        cover: "img/design/ogxmsssession/cover.png",
        pages: [
            "img/design/ogxmsssession/cover-page.png",
            "img/design/ogxmsssession/page1.png",
            "img/design/ogxmsssession/page2.png",
            "img/design/ogxmsssession/page3.png",
            "img/design/ogxmsssession/page4.png",
            "img/design/ogxmsssession/page5.png",
            "img/design/ogxmsssession/page6.png",
            "img/design/ogxmsssession/page7.png",
        ],
    },

    {
        slug: "AIESEC guideline on signing up",
        title: "AIESEC guideline on signing up",
        description: "A document presentation for a session I was presenting about OGX AIESEC portfolio.",
        category: "Campaign Design",
        year: "2026",
        tools: ["Indesign"],
        cover: "img/design/ogxinfosession/cover.png",
        pages: [
            "img/design/ogxinfosession/cover.png",
            "img/design/ogxinfosession/page1.png",
            "img/design/ogxinfosession/page2.png",
            "img/design/ogxinfosession/page3.png",
            "img/design/ogxinfosession/page4.png",
            "img/design/ogxinfosession/page5.png",
        ],
    },

    {
        slug: "AIESEC OGX Info session presentation ",
        title: "AIESEC OGX Info session presentation ",
        description: "A document presentation to help new members and leads on signing up on AIESEC's main platform",
        category: "Campaign Design",
        year: "2026",
        tools: ["Indesign"],
        cover: "img/design/signupaiesec/cover.png",
        pages: [
            "img/design/signupaiesec/page1.png",
            "img/design/signupaiesec/page2.png",
            "img/design/signupaiesec/page3.png",
            "img/design/signupaiesec/page4.png",
            "img/design/signupaiesec/page5.png",
            "img/design/signupaiesec/page6.png",
        ],
    },
];


(function () {
    const grid = document.getElementById("design-grid");
    const viewer = document.getElementById("design-viewer");
    const scroller = document.getElementById("design-viewer-scroll");
    const titleEl = document.getElementById("design-viewer-title");
    const descEl = document.getElementById("design-viewer-desc");
    const metaEl = document.getElementById("design-viewer-meta");
    const pagesEl = document.getElementById("design-viewer-pages");
    if (!grid || !viewer) return;

    let current = -1;
    let trigger = null;

    // Build cards
    designProjects.forEach((p, i) => {
        const li = document.createElement("li");
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "design-card";
        btn.setAttribute("aria-label", "Open project: " + p.title);

        const img = document.createElement("img");
        img.src = p.cover;
        img.alt = "";
        img.loading = "lazy";

        const cap = document.createElement("div");
        cap.className = "design-card-caption";
        const strong = document.createElement("strong");
        strong.textContent = p.title;
        const span = document.createElement("span");
        span.textContent = p.category;
        cap.append(strong, span);

        btn.append(img, cap);
        btn.addEventListener("click", () => {
            trigger = btn;
            show(i);
            if (!viewer.open) viewer.showModal();
            document.body.style.overflow = "hidden";
        });
        li.appendChild(btn);
        grid.appendChild(li);
    });
    function show(i) {
        current = (i + designProjects.length) % designProjects.length;
        const p = designProjects[current];
        titleEl.textContent = p.title;
        descEl.textContent = p.description;
        metaEl.textContent = [p.category, p.year, (p.tools || []).join(", ")]
            .filter(Boolean)
            .join("  |  ");

        pagesEl.replaceChildren();
        p.pages.forEach((src, n) => {
            const img = document.createElement("img");
            img.src = src;
            img.alt = p.title + ", page " + (n + 1) + " of " + p.pages.length;
            img.loading = "lazy";
            pagesEl.appendChild(img);
        });

        scroller.scrollTo({ top: 0 });
        history.replaceState(null, "", "#" + p.slug);
    }

    document.getElementById("design-prev").addEventListener("click", () => show(current - 1));
    document.getElementById("design-next").addEventListener("click", () => show(current + 1));
    document.getElementById("design-close").addEventListener("click", () => viewer.close());


    viewer.addEventListener("click", (e) => {
        if (e.target === viewer) viewer.close();
    });


    viewer.addEventListener("close", () => {
        document.body.style.overflow = "";
        history.replaceState(null, "", location.pathname + location.search + "#design");
        if (trigger) trigger.focus();
        current = -1;
    });


    const startSlug = location.hash.slice(1);
    const startIndex = designProjects.findIndex((p) => p.slug === startSlug);
    if (startIndex >= 0) {
        show(startIndex);
        viewer.showModal();
        document.body.style.overflow = "hidden";
    }
})();