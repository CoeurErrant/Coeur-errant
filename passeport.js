(() => {
    "use strict";

    const page = document.querySelector(".kingdom-page");

    if (!page) return;

    const $ = id => document.getElementById(id);

    const STORAGE_KEY = "coeur-errant-passport-v1";
    const CONSENT_KEY = "coeur-errant-kingdom-consent-v1";

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    /* =========================================
       LES 14 FRAGMENTS
    ========================================== */

    const treasures = [
        {
            id: "corse-2023",
            destination: "Corse",
            name: "Le coquillage des rêves",
            meaning: "Il représente les rêves que l'on garde précieusement au fond de soi.",
            color: "#e5b9bc",
            symbol: "shell"
        },
        {
            id: "tanger-2024",
            destination: "Tanger",
            name: "La plume du courage",
            meaning: "Le courage commence parfois par un simple geste de douceur.",
            color: "#d8bd83",
            symbol: "feather"
        },
        {
            id: "sicile-2024",
            destination: "Sicile",
            name: "Le fruit du soleil",
            meaning: "Une lumière chaleureuse, même lorsque le monde semble gris.",
            color: "#e5ca75",
            symbol: "sun"
        },
        {
            id: "varsovie-2025",
            destination: "Varsovie",
            name: "Le flocon éternel",
            meaning: "Chaque âme est unique, comme les cristaux d'un flocon.",
            color: "#b6d4e5",
            symbol: "snow"
        },
        {
            id: "tanger-2025",
            destination: "Tanger",
            name: "Le cristal de l'amour",
            meaning: "L'amour véritable ne demande rien en retour.",
            color: "#e8a5b9",
            symbol: "heart"
        },
        {
            id: "chefchaouen-2025",
            destination: "Chefchaouen",
            name: "Le papillon de la liberté",
            meaning: "Chaque être vivant mérite de pouvoir vivre librement et dignement.",
            color: "#94bad8",
            symbol: "butterfly"
        },
        {
            id: "akchour-2025",
            destination: "Akchour",
            name: "La feuille de vie",
            meaning: "La nature nous rappelle la fragilité et la beauté de la vie.",
            color: "#a6c5a0",
            symbol: "leaf"
        },
        {
            id: "istanbul-2025",
            destination: "Istanbul",
            name: "La pierre des secrets",
            meaning: "Les plus beaux trésors sont parfois les plus discrets.",
            color: "#b6a6d4",
            symbol: "gem"
        },
        {
            id: "skopje-2026",
            destination: "Skopje",
            name: "La clé des possibles",
            meaning: "Un petit geste peut ouvrir des portes que l'on croyait fermées.",
            color: "#d8b77b",
            symbol: "key"
        },
        {
            id: "pristina-2026",
            destination: "Pristina",
            name: "L'étoile de l'espoir",
            meaning: "Même dans l'obscurité, une petite lumière peut subsister.",
            color: "#e8d19a",
            symbol: "star"
        },
        {
            id: "tirana-2026",
            destination: "Tirana",
            name: "Le sablier de la patience",
            meaning: "Certaines rencontres demandent simplement du temps et de la patience.",
            color: "#d8ad94",
            symbol: "hourglass"
        },
        {
            id: "marrakech-2026",
            destination: "Marrakech",
            name: "La lanterne de la lumière",
            meaning: "La bienveillance éclaire les chemins les plus inattendus.",
            color: "#dfa88e",
            symbol: "lantern"
        },
        {
            id: "agadir-2026",
            destination: "Agadir",
            name: "La larme de l'océan",
            meaning: "Une seule goutte peut rejoindre un océan de solidarité.",
            color: "#93c9cf",
            symbol: "drop"
        },
        {
            id: "djerba-2026",
            destination: "Djerba",
            name: "La fleur de la douceur",
            meaning: "La douceur est une force silencieuse.",
            color: "#f0e1c8",
            symbol: "flower"
        }
    ];

    const validIds = new Set(
        treasures.map(treasure => treasure.id)
    );

    const emblemSymbols = {
        rose: "❀",
        star: "✧",
        heart: "♡",
        moon: "☾"
    };

    const companionLabels = {
        cat: "Votre chat",
        dog: "Votre chien",
        rabbit: "Votre lapin"
    };

    /* =========================================
       SAUVEGARDE ET CONSENTEMENT
    ========================================== */

    function createState() {
        return {
            name: "",
            stamps: [],
            emblem: "heart",
            companion: "",
            companionName: "",
            atmosphere: "auto",
            completedAt: null,
            secretFound: false,
            rewards: []
        };
    }

    function cleanText(value, length) {
        return typeof value === "string"
            ? value.trim().slice(0, length)
            : "";
    }

    function hasConsent() {
        try {
            return localStorage.getItem(CONSENT_KEY) === "yes";
        } catch {
            return false;
        }
    }

    function normalizeState(raw) {
        const base = createState();

        if (!raw || typeof raw !== "object") {
            return base;
        }

        base.name = cleanText(raw.name, 30);

        base.stamps = Array.isArray(raw.stamps)
            ? [...new Set(
                raw.stamps.filter(id => validIds.has(id))
            )]
            : [];

        base.emblem = Object.hasOwn(
            emblemSymbols,
            raw.emblem
        ) ? raw.emblem : "heart";

        base.companion = Object.hasOwn(
            companionLabels,
            raw.companion
        ) ? raw.companion : "";

        base.companionName = cleanText(
            raw.companionName,
            25
        );

        base.atmosphere = [
            "auto",
            "day",
            "night"
        ].includes(raw.atmosphere)
            ? raw.atmosphere
            : "auto";

        base.secretFound = raw.secretFound === true;

        base.rewards = Array.isArray(raw.rewards)
            ? raw.rewards.filter(item =>
                typeof item === "string"
            )
            : [];

        if (base.stamps.length === treasures.length) {
            const date = new Date(raw.completedAt || Date.now());

            base.completedAt = Number.isNaN(date.getTime())
                ? new Date().toISOString()
                : date.toISOString();
        }

        return base;
    }

    function readState() {
        if (!hasConsent()) {
            return createState();
        }

        try {
            return normalizeState(
                JSON.parse(
                    localStorage.getItem(STORAGE_KEY) || "null"
                )
            );
        } catch {
            return createState();
        }
    }

    let state = readState();

    function saveState() {
        if (!hasConsent()) {
            return false;
        }

        try {
            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify(state)
            );

            window.dispatchEvent(
                new CustomEvent(
                    "coeur-errant-passport-updated"
                )
            );

            return true;
        } catch {
            showToast(
                "Sauvegarde indisponible",
                "Votre navigateur ne permet pas la sauvegarde."
            );

            return false;
        }
    }

    function setupStorageConsent() {
        const note = $("kingdom-storage-note");

        if (!note) return;

        let button = $("kingdom-consent-button");

        if (!button) {
            button = document.createElement("button");

            button.id = "kingdom-consent-button";
            button.type = "button";
            button.className = "kingdom-outline-button";
            button.style.margin = "10px 0 25px";

            note.insertAdjacentElement("afterend", button);

            button.addEventListener("click", () => {
                if (hasConsent()) {
                    try {
                        localStorage.removeItem(STORAGE_KEY);
                        localStorage.removeItem(CONSENT_KEY);

                        state = createState();

                        renderAll();

                        showToast(
                            "Sauvegarde désactivée",
                            "Les données enregistrées ont été effacées."
                        );
                    } catch {
                        showToast(
                            "Action impossible",
                            "La suppression n'a pas pu être confirmée."
                        );
                    }
                } else {
                    try {
                        const previous = normalizeState(
                            JSON.parse(
                                localStorage.getItem(
                                    STORAGE_KEY
                                ) || "null"
                            )
                        );

                        state.stamps = [...new Set([
                            ...previous.stamps,
                            ...state.stamps
                        ])];

                        if (!state.name) {
                            state.name = previous.name;
                        }

                        if (
                            state.stamps.length ===
                            treasures.length
                        ) {
                            state.completedAt =
                                previous.completedAt ||
                                new Date().toISOString();
                        }

                        localStorage.setItem(
                            CONSENT_KEY,
                            "yes"
                        );

                        saveState();
                        renderAll();

                        showToast(
                            "Sauvegarde activée",
                            "Votre aventure sera conservée sur cet appareil."
                        );
                    } catch {
                        showToast(
                            "Sauvegarde impossible",
                            "Vous pouvez explorer le royaume sans sauvegarde."
                        );
                    }
                }

                updateStorageNote();
            });
        }

        updateStorageNote();
    }

    function updateStorageNote() {
        const note = $("kingdom-storage-note");
        const button = $("kingdom-consent-button");

        if (!note || !button) return;

        if (hasConsent()) {
            note.textContent =
                "Votre progression est conservée localement sur cet appareil. Vous pouvez retirer votre accord à tout moment.";

            button.textContent =
                "Désactiver la sauvegarde et effacer mes données";
        } else {
            note.textContent =
                "La sauvegarde est désactivée. Activez-la pour conserver vos fragments entre les différentes pages du site.";

            button.textContent =
                "Activer la sauvegarde de mon aventure";
        }
    }

    /* =========================================
       NOTIFICATIONS
    ========================================== */

    let toastTimer;

    function showToast(title, message) {
        const toast = $("kingdom-toast");

        if (!toast) return;

        $("kingdom-toast-title").textContent = title;
        $("kingdom-toast-message").textContent = message;

        toast.hidden = false;

        clearTimeout(toastTimer);

        toastTimer = setTimeout(() => {
            toast.hidden = true;
        }, 5000);
    }

    /* =========================================
       PARTICULES LUMINEUSES
    ========================================== */

    function createParticles() {
        const container = $("kingdom-particles");

        if (!container || reducedMotion) return;

        container.replaceChildren();

        const count = window.innerWidth < 600 ? 24 : 55;

        for (let i = 0; i < count; i++) {
            const particle = document.createElement("span");

            particle.className = "kingdom-particle";

            particle.style.setProperty(
                "--particle-x",
                `${Math.random() * 100}%`
            );

            particle.style.setProperty(
                "--particle-y",
                `${Math.random() * 100}%`
            );

            particle.style.setProperty(
                "--particle-size",
                `${2 + Math.random() * 4}px`
            );

            particle.style.setProperty(
                "--particle-duration",
                `${3 + Math.random() * 5}s`
            );

            particle.style.setProperty(
                "--particle-delay",
                `${Math.random() * -6}s`
            );

            container.appendChild(particle);
        }
    }

    /* =========================================
       OUVERTURE DE LA PORTE
    ========================================== */

    $("enter-kingdom")?.addEventListener("click", () => {
        const door = $("enchanted-door");
        const button = $("enter-kingdom");

        door.classList.add("is-open");

        button.textContent = "Bienvenue dans le royaume";
        button.disabled = true;

        setTimeout(() => {
            $("kingdom-introduction").scrollIntoView({
                behavior: reducedMotion ? "auto" : "smooth"
            });

            button.disabled = false;
        }, reducedMotion ? 0 : 1600);
    });

    /* =========================================
       IDENTITÉ
    ========================================== */

    $("kingdom-name-form")?.addEventListener(
        "submit",
        event => {
            event.preventDefault();

            const name = cleanText(
                $("kingdom-name").value,
                30
            );

            if (!name) return;

            state.name = name;

            const saved = saveState();

            renderIdentity();
            renderCertificate();

            $("kingdom-name-message").textContent = saved
                ? `Bienvenue dans votre royaume, ${name}.`
                : `Bienvenue, ${name}. Activez la sauvegarde pour conserver votre prénom.`;

            showToast(
                "Votre identité",
                `Bienvenue, ${name}.`
            );
        }
    );

    document.querySelectorAll("[data-emblem]")
        .forEach(button => {
            button.addEventListener("click", () => {
                const emblem = button.dataset.emblem;

                if (!Object.hasOwn(
                    emblemSymbols,
                    emblem
                )) return;

                state.emblem = emblem;

                saveState();
                renderIdentity();
            });
        });

    function renderIdentity() {
        $("kingdom-name").value = state.name;

        $("medallion-owner").textContent =
            state.name || "Votre royaume";

        $("medallion-emblem").textContent =
            emblemSymbols[state.emblem];

        const identitySymbol = document.querySelector(
            ".identity-medallion span"
        );

        if (identitySymbol) {
            identitySymbol.textContent =
                emblemSymbols[state.emblem];
        }

        document.querySelectorAll("[data-emblem]")
            .forEach(button => {
                button.setAttribute(
                    "aria-pressed",
                    String(
                        button.dataset.emblem === state.emblem
                    )
                );
            });
    }

    /* =========================================
       COMPAGNON
    ========================================== */

    document.querySelectorAll("[data-companion]")
        .forEach(button => {
            button.addEventListener("click", () => {
                const companion = button.dataset.companion;

                if (!Object.hasOwn(
                    companionLabels,
                    companion
                )) return;

                if (state.companion !== companion) {
                    state.companionName = "";
                }

                state.companion = companion;

                saveState();
                renderCompanion();

                $("companion-name").focus();
            });
        });

    $("companion-name-form")?.addEventListener(
        "submit",
        event => {
            event.preventDefault();

            if (!state.companion) return;

            state.companionName = cleanText(
                $("companion-name").value,
                25
            );

            if (!state.companionName) return;

            saveState();
            renderCompanion();

            showToast(
                "Un nouveau compagnon",
                `${state.companionName} vous accompagne désormais.`
            );
        }
    );

    function renderCompanion() {
        document.querySelectorAll("[data-companion]")
            .forEach(button => {
                button.setAttribute(
                    "aria-pressed",
                    String(
                        button.dataset.companion ===
                        state.companion
                    )
                );
            });

        $("companion-personalization").hidden =
            !state.companion;

        $("companion-name").value =
            state.companionName;

        $("companion-message").textContent =
            state.companionName
                ? `${state.companionName} vous attend sur les chemins du royaume.`
                : state.companion
                    ? "Choisissez maintenant son prénom."
                    : "";
    }

    /* =========================================
       MÉDAILLON
    ========================================== */

    function renderMedallion() {
        const container = $("medallion-gems");

        container.replaceChildren();

        treasures.forEach((treasure, index) => {
            const angle =
                index * Math.PI * 2 / treasures.length;

            const gem = document.createElement("span");

            gem.className = "medallion-gem";

            gem.style.left =
                `${50 + Math.sin(angle) * 41}%`;

            gem.style.top =
                `${50 - Math.cos(angle) * 41}%`;

            gem.style.setProperty(
                "--gem-color",
                treasure.color
            );

            const discovered = state.stamps.includes(
                treasure.id
            );

            gem.classList.toggle(
                "is-discovered",
                discovered
            );

            gem.title = discovered
                ? treasure.name
                : "Fragment encore caché";

            gem.setAttribute("aria-hidden", "true");

            container.appendChild(gem);
        });

        const count = state.stamps.length;

        $("fragment-count").textContent = count;
        $("fragment-total").textContent = treasures.length;

        $("royal-medallion").classList.toggle(
            "is-complete",
            count === treasures.length
        );
    }

    /* =========================================
       PROGRESSION
    ========================================== */

    function getRank(count) {
        if (count >= 14) return "Gardien des cœurs errants";
        if (count >= 10) return "Gardien des merveilles";
        if (count >= 8) return "Explorateur des secrets";
        if (count >= 5) return "Collectionneur de lumière";
        if (count >= 3) return "Chercheur de trésors";
        if (count >= 1) return "Cueilleur de lumière";

        return "Âme voyageuse";
    }

    function renderProgress() {
        const count = state.stamps.length;
        const percent = count / treasures.length * 100;

        $("kingdom-rank").textContent = getRank(count);

        $("kingdom-progress-fill").style.width =
            `${percent}%`;

        $("kingdom-progress-track").setAttribute(
            "aria-valuenow",
            String(count)
        );

        const remaining = treasures.length - count;

        $("kingdom-progress-message").textContent =
            count === 14
                ? "Toutes les lumières sont réunies. Le château vous attend."
                : count === 0
                    ? "Votre aventure ne fait que commencer."
                    : `Il vous reste ${remaining} fragment${remaining > 1 ? "s" : ""} à découvrir.`;

        document.querySelectorAll("[data-milestone]")
            .forEach(item => {
                item.classList.toggle(
                    "is-unlocked",
                    count >= Number(item.dataset.milestone)
                );
            });
    }

    /* =========================================
       ILLUSTRATIONS DE SECOURS
       Les véritables images remplaceront ces SVG.
    ========================================== */

    function createTreasureSVG(treasure, locked = false) {
        const color = treasure.color;

        const shapes = {
            shell: `
                <path d="M60 95
                    C10 78 8 20 60 18
                    C112 20 110 78 60 95Z"/>
                <path d="M60 95L28 35
                    M60 95L45 23
                    M60 95L75 23
                    M60 95L92 35"
                    fill="none"/>
            `,
            feather: `
                <path d="M25 105Q95 55 95 15
                    Q35 15 30 75Z"/>
                <path d="M20 110L88 24
                    M44 80L40 53
                    M58 62L82 61"
                    fill="none"/>
            `,
            sun: `
                <circle cx="60" cy="60" r="30"/>
                <path d="M60 5V20
                    M60 100V115
                    M5 60H20
                    M100 60H115
                    M20 20L32 32
                    M88 88L100 100
                    M20 100L32 88
                    M88 32L100 20"
                    fill="none"/>
            `,
            snow: `
                <path d="M60 8V112
                    M15 34L105 86
                    M15 86L105 34
                    M45 18L60 33L75 18
                    M45 102L60 87L75 102
                    M18 48L38 47L28 28
                    M92 92L82 73L102 72
                    M18 72L38 73L28 92
                    M92 28L82 47L102 48"
                    fill="none" stroke-width="4"/>
            `,
            heart: `
                <path d="M60 100
                    C35 80 8 58 18 34
                    C27 12 49 15 60 35
                    C71 15 93 12 102 34
                    C112 58 85 80 60 100Z"/>
            `,
            butterfly: `
                <path d="M60 65
                    C8 65 5 12 30 15
                    Q60 20 60 65
                    C60 20 90 15 90 15
                    C115 12 112 65 60 65
                    C110 72 95 110 75 95
                    L60 65
                    L45 95
                    C25 110 10 72 60 65Z"/>
                <path d="M60 40V90
                    M60 40L49 25
                    M60 40L71 25"
                    fill="none"/>
            `,
            leaf: `
                <path d="M25 100
                    Q10 25 100 15
                    Q105 95 25 100Z"/>
                <path d="M15 110L90 25
                    M45 75L35 45
                    M65 53L90 58"
                    fill="none"/>
            `,
            gem: `
                <path d="M60 8L100 40
                    L85 92L60 112
                    L35 92L20 40Z"/>
                <path d="M60 8L45 40
                    L60 112L75 40Z
                    M20 40H100"
                    fill="none"/>
            `,
            key: `
                <circle cx="60" cy="28" r="20"
                    fill="none" stroke-width="8"/>
                <path d="M60 48V108
                    M60 85H82
                    M60 100H75"
                    fill="none" stroke-width="8"/>
            `,
            star: `
                <path d="M60 7L75 42
                    L113 45L84 70
                    L93 108L60 88
                    L27 108L36 70
                    L7 45L45 42Z"/>
            `,
            hourglass: `
                <path d="M30 15H90
                    M30 105H90"
                    fill="none" stroke-width="7"/>
                <path d="M38 18
                    Q38 45 60 60
                    Q82 75 82 102
                    H38
                    Q38 75 60 60
                    Q82 45 82 18Z"/>
            `,
            lantern: `
                <path d="M30 35L60 15L90 35Z"/>
                <rect x="35" y="35"
                    width="50" height="65" rx="5"/>
                <path d="M48 35V100
                    M72 35V100
                    M30 100H90
                    M60 15V5"
                    fill="none"/>
                <path d="M60 85
                    Q45 70 60 52
                    Q75 70 60 85Z"
                    fill="#fff2c2"/>
            `,
            drop: `
                <path d="M60 8
                    C50 35 20 60 25 82
                    C30 120 90 120 95 82
                    C100 60 70 35 60 8Z"/>
                <path d="M42 68Q32 90 50 95"
                    fill="none" stroke="#fff8"/>
            `,
            flower: `
                <ellipse cx="60" cy="32"
                    rx="17" ry="26"/>
                <ellipse cx="60" cy="88"
                    rx="17" ry="26"/>
                <ellipse cx="32" cy="60"
                    rx="26" ry="17"/>
                <ellipse cx="88" cy="60"
                    rx="26" ry="17"/>
                <circle cx="60" cy="60"
                    r="14" fill="#d5b67a"/>
            `
        };

        if (locked) {
            return `
                <svg viewBox="0 0 120 120"
                     aria-hidden="true">
                    <path d="M60 12L98 60
                        L60 108L22 60Z"
                        fill="#3e2b3d"
                        stroke="#c4a477"
                        stroke-width="2"/>
                    <rect x="45" y="55"
                        width="30" height="25" rx="4"
                        fill="none"
                        stroke="#c4a477"
                        stroke-width="3"/>
                    <path d="M50 55V45
                        A10 10 0 0 1 70 45V55"
                        fill="none"
                        stroke="#c4a477"
                        stroke-width="3"/>
                </svg>
            `;
        }

        return `
            <svg viewBox="0 0 120 120"
                 aria-hidden="true">
                <g fill="${color}"
                   stroke="#c4a477"
                   stroke-width="2.5"
                   stroke-linecap="round"
                   stroke-linejoin="round">
                    ${shapes[treasure.symbol] || shapes.gem}
                </g>
                <path d="M105 10V26
                    M97 18H113"
                    stroke="#e8c987"
                    stroke-width="2"/>
            </svg>
        `;
    }

    function renderTreasureVisual(
        container,
        treasure,
        locked
    ) {
        container.replaceChildren();

        if (locked) {
            container.innerHTML =
                createTreasureSVG(treasure, true);

            return;
        }

        const image = document.createElement("img");

        image.src = `fragment-${treasure.id}.webp`;
        image.alt = treasure.name;
        image.loading = "lazy";

        image.addEventListener("error", () => {
            container.innerHTML =
                createTreasureSVG(treasure);
        }, { once: true });

        container.appendChild(image);
    }

    /* =========================================
       COFFRET
    ========================================== */

    function renderTreasures() {
        const grid = $("treasure-grid");

        grid.replaceChildren();

        treasures.forEach(treasure => {
            const discovered = state.stamps.includes(
                treasure.id
            );

            const card = document.createElement("button");

            card.type = "button";

            card.className =
                `treasure-card ${discovered
                    ? "is-discovered"
                    : "is-locked"}`;

            card.setAttribute(
                "aria-label",
                `${treasure.destination} — ${
                    discovered
                        ? treasure.name
                        : "Fragment encore caché"
                }`
            );

            const visual = document.createElement("div");

            visual.className = "treasure-object";

            renderTreasureVisual(
                visual,
                treasure,
                !discovered
            );

            const title = document.createElement("strong");

            title.textContent = treasure.destination;

            const status = document.createElement("small");

            status.textContent = discovered
                ? "Retrouvé"
                : "À découvrir";

            card.append(visual, title, status);

            card.addEventListener("click", () => {
                openTreasure(treasure);
            });

            grid.appendChild(card);
        });
    }

    function openTreasure(treasure) {
        const discovered = state.stamps.includes(
            treasure.id
        );

        renderTreasureVisual(
            $("treasure-visual"),
            treasure,
            !discovered
        );

        $("treasure-destination").textContent =
            treasure.destination;

        $("treasure-title").textContent =
            discovered
                ? treasure.name
                : "Un fragment mystérieux";

        $("treasure-meaning").textContent =
            discovered
                ? treasure.meaning
                : "Ce trésor attend encore d'être retrouvé au cours de votre exploration.";

        $("treasure-status").textContent =
            discovered
                ? "Une lumière de plus dans votre royaume."
                : "Fragment non découvert";

        openDialog("treasure-dialog");
    }

    /* =========================================
       LIEUX ENCHANTÉS
    ========================================== */

    const locations = {
        library: {
            title: "La bibliothèque des âmes",
            image: "royaume-bibliotheque.webp",
            required: 3,
            description:
                "Dans le silence des livres anciens, une lettre semble vous attendre."
        },
        greenhouse: {
            title: "La serre des merveilles",
            image: "royaume-serre.webp",
            required: 5,
            description:
                "Parmi les roses, trois petits secrets se cachent dans la lumière."
        },
        lake: {
            title: "Le lac des souhaits",
            image: "royaume-lac.webp",
            required: 8,
            description:
                "Confiez un souhait à l'eau et regardez votre lanterne s'éloigner."
        },
        spring: {
            title: "La source des merveilles",
            image: "royaume-source.webp",
            required: 10,
            description:
                "Une étrange lumière scintille sous la surface de l'eau."
        },
        castle: {
            title: "Le château oublié",
            image: "royaume-chateau.webp",
            required: 14,
            description:
                "Les portes du château s'ouvrent enfin. Toutes les lumières du royaume sont réunies."
        }
    };

    function renderLocations() {
        document.querySelectorAll("[data-location]")
            .forEach(card => {
                const required = Number(
                    card.dataset.required
                );

                const unlocked =
                    state.stamps.length >= required;

                card.classList.toggle(
                    "is-locked",
                    !unlocked
                );

                card.classList.toggle(
                    "is-unlocked",
                    unlocked
                );

                const button = card.querySelector(
                    "[data-open-location]"
                );

                button.disabled = !unlocked;

                button.textContent = unlocked
                    ? "Explorer ce lieu"
                    : `${required} fragments nécessaires`;
            });
    }

    document.querySelectorAll("[data-open-location]")
        .forEach(button => {
            button.addEventListener("click", () => {
                openLocation(
                    button.dataset.openLocation
                );
            });
        });

    function openLocation(id) {
        const location = locations[id];

        if (
            !location ||
            state.stamps.length < location.required
        ) return;

        $("location-dialog-title").textContent =
            location.title;

        $("location-dialog-description").textContent =
            location.description;

        $("location-dialog-image").style.backgroundImage =
            `url("${location.image}")`;

        const interaction = $("location-interaction");

        interaction.replaceChildren();

        if (id === "library") {
            createLibraryInteraction(interaction);
        }

        if (id === "greenhouse") {
            createGreenhouseInteraction(interaction);
        }

        if (id === "lake") {
            createLakeInteraction(interaction);
        }

        if (id === "spring") {
            createSpringInteraction(interaction);
        }

        if (id === "castle") {
            createCastleInteraction(interaction);
        }

        openDialog("location-dialog");
    }

    /* =========================================
       BIBLIOTHÈQUE — LETTRE SECRÈTE
    ========================================== */

    function createLibraryInteraction(container) {
        const button = document.createElement("button");

        button.type = "button";
        button.className = "kingdom-button";
        button.textContent = "Décacheter la lettre";

        const letter = document.createElement("div");

        letter.className = "location-letter";
        letter.hidden = true;

        letter.textContent =
            "Il n'est pas nécessaire de changer le monde entier pour faire une différence. Parfois, changer un seul instant dans la vie d'une petite âme suffit.";

        button.addEventListener("click", () => {
            letter.hidden = false;
            button.hidden = true;

            unlockReward("library-letter");
        });

        container.append(button, letter);
    }

    /* =========================================
       SERRE — MESSAGES CACHÉS
    ========================================== */

    function createGreenhouseInteraction(container) {
        const messages = [
            "La douceur n'est jamais une faiblesse.",
            "Chaque vie mérite d'être regardée.",
            "La liberté est un trésor que nul ne devrait perdre."
        ];

        const buttons = document.createElement("div");

        buttons.className = "butterfly-buttons";

        const message = document.createElement("div");

        message.className = "location-letter";
        message.textContent =
            "Choisissez l'une des trois fleurs.";

        messages.forEach((text, index) => {
            const button = document.createElement("button");

            button.type = "button";
            button.textContent = "❀";

            button.setAttribute(
                "aria-label",
                `Découvrir la fleur ${index + 1}`
            );

            button.addEventListener("click", () => {
                message.textContent = text;

                unlockReward(
                    `greenhouse-flower-${index}`
                );
            });

            buttons.appendChild(button);
        });

        container.append(buttons, message);
    }

    /* =========================================
       LAC — LANTERNE DES SOUHAITS
    ========================================== */

    function createLakeInteraction(container) {
        const scene = document.createElement("div");

        scene.className = "lantern-scene";

        const textarea = document.createElement("textarea");

        textarea.className = "location-wish";
        textarea.placeholder = "Votre souhait...";
        textarea.maxLength = 300;

        textarea.setAttribute(
            "aria-label",
            "Votre souhait personnel"
        );

        const note = document.createElement("p");

        note.textContent =
            "Votre souhait n'est ni enregistré ni envoyé.";

        const button = document.createElement("button");

        button.type = "button";
        button.className = "kingdom-button";
        button.textContent = "Libérer ma lanterne";

        button.addEventListener("click", () => {
            if (!textarea.value.trim()) {
                textarea.focus();
                return;
            }

            const lantern = document.createElement("span");

            lantern.className = "floating-lantern";

            scene.appendChild(lantern);

            textarea.value = "";

            note.textContent =
                "Votre souhait s'éloigne doucement vers l'horizon.";

            unlockReward("lake-lantern");

            setTimeout(() => {
                lantern.remove();
            }, 4200);
        });

        container.append(
            scene,
            note,
            textarea,
            button
        );
    }

    /* =========================================
       SOURCE — TRÉSOR SOUS L'EAU
    ========================================== */

    function createSpringInteraction(container) {
        const water = document.createElement("div");

        water.className = "spring-water";

        const button = document.createElement("button");

        button.type = "button";
        button.textContent = "✧";

        button.setAttribute(
            "aria-label",
            "Toucher la surface de l'eau"
        );

        const message = document.createElement("p");

        message.textContent =
            "Touchez la lumière à la surface de l'eau.";

        button.addEventListener("click", () => {
            const ripple = document.createElement("span");

            ripple.className = "water-ripple";

            water.appendChild(ripple);

            button.textContent = "◇";

            message.textContent =
                "Vous avez découvert la pierre de sérénité, un trésor secret du royaume.";

            const fresh = unlockReward("spring-crystal");

            if (fresh) {
                celebrate(25);

                showToast(
                    "Trésor secret",
                    "La pierre de sérénité est découverte."
                );
            }

            setTimeout(() => ripple.remove(), 2100);
        });

        water.appendChild(button);

        container.append(water, message);
    }

    /* =========================================
       CHÂTEAU — DERNIÈRE LETTRE
    ========================================== */

    function createCastleInteraction(container) {
        const letter = document.createElement("div");

        letter.className = "location-letter";

        const paragraphs = [
            "Il était une fois un cœur qui décida de ne plus détourner le regard.",
            "Ce cœur n'avait ni couronne, ni baguette magique, ni pouvoirs extraordinaires.",
            "Il possédait simplement quelque chose de précieux : la bienveillance.",
            state.name
                ? `Et ce cœur, ${state.name}, c'était le vôtre.`
                : "Et ce cœur, c'était le vôtre."
        ];

        paragraphs.forEach(text => {
            const paragraph = document.createElement("p");

            paragraph.textContent = text;

            letter.appendChild(paragraph);
        });

        const button = document.createElement("button");

        button.type = "button";
        button.className = "kingdom-button";
        button.textContent = "Découvrir mon certificat";

        button.addEventListener("click", () => {
            closeDialog("location-dialog");

            $("kingdom-reward").scrollIntoView({
                behavior: reducedMotion ? "auto" : "smooth"
            });

            celebrate(45);
        });

        container.append(letter, button);

        unlockReward("castle-letter");
    }

    function unlockReward(id) {
        if (state.rewards.includes(id)) {
            return false;
        }

        state.rewards.push(id);

        saveState();

        return true;
    }

    /* =========================================
       AMBIANCE JOUR ET NUIT
    ========================================== */

    function applyAtmosphere() {
        const hour = new Date().getHours();

        const night = state.atmosphere === "night" ||
            (
                state.atmosphere === "auto" &&
                (hour >= 19 || hour < 7)
            );

        page.classList.toggle("is-night", night);

        document.querySelectorAll("[data-atmosphere]")
            .forEach(button => {
                button.setAttribute(
                    "aria-pressed",
                    String(
                        button.dataset.atmosphere ===
                        state.atmosphere
                    )
                );
            });
    }

    document.querySelectorAll("[data-atmosphere]")
        .forEach(button => {
            button.addEventListener("click", () => {
                state.atmosphere =
                    button.dataset.atmosphere;

                saveState();
                applyAtmosphere();
            });
        });

    setInterval(() => {
        if (state.atmosphere === "auto") {
            applyAtmosphere();
        }
    }, 60000);

    /* =========================================
       CERTIFICAT
    ========================================== */

    function formatDate(value) {
        if (!value) return "";

        return new Intl.DateTimeFormat("fr-BE", {
            day: "numeric",
            month: "long",
            year: "numeric"
        }).format(new Date(value));
    }

    function renderCertificate() {
        const complete =
            state.stamps.length === treasures.length;

        if (complete && !state.completedAt) {
            state.completedAt = new Date().toISOString();

            saveState();
        }

        $("kingdom-certificate").classList.toggle(
            "is-unlocked",
            complete
        );

        $("certificate-name").textContent =
            state.name || "Une âme bienveillante";

        $("certificate-date").textContent =
            complete
                ? formatDate(state.completedAt)
                : "Votre date de découverte";

        $("download-certificate").disabled =
            !complete;
    }

    $("download-certificate")?.addEventListener(
        "click",
        downloadCertificate
    );

    function downloadCertificate() {
        if (
            state.stamps.length !== treasures.length
        ) return;

        const canvas = document.createElement("canvas");

        canvas.width = 1600;
        canvas.height = 1100;

        const ctx = canvas.getContext("2d");

        if (!ctx) return;

        const w = canvas.width;
        const h = canvas.height;

        const gradient = ctx.createLinearGradient(
            0, 0, w, h
        );

        gradient.addColorStop(0, "#fffaf0");
        gradient.addColorStop(.5, "#f7eee4");
        gradient.addColorStop(1, "#ead4dc");

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, w, h);

        ctx.strokeStyle = "#b99a65";
        ctx.lineWidth = 5;
        ctx.strokeRect(45, 45, w - 90, h - 90);

        ctx.lineWidth = 1.5;
        ctx.strokeRect(65, 65, w - 130, h - 130);

        ctx.textAlign = "center";

        ctx.fillStyle = "#a58b5d";
        ctx.font = "28px Georgia";
        ctx.fillText("C Œ U R   E R R A N T", 800, 145);

        ctx.beginPath();
        ctx.arc(800, 270, 85, 0, Math.PI * 2);

        ctx.fillStyle = "#493343";
        ctx.fill();

        ctx.strokeStyle = "#d8bb86";
        ctx.lineWidth = 6;
        ctx.stroke();

        ctx.fillStyle = "#e8c987";
        ctx.font = "85px Georgia";

        ctx.fillText(
            emblemSymbols[state.emblem],
            800,
            300
        );

        ctx.fillStyle = "#a85e78";
        ctx.font = "58px Georgia";

        ctx.fillText(
            "Gardien des cœurs errants",
            800,
            440
        );

        ctx.fillStyle = "#82747b";
        ctx.font = "27px Georgia";
        ctx.fillText("Certificat symbolique décerné à", 800, 510);

        const name = state.name || "Une âme bienveillante";

        let fontSize = 65;

        ctx.font = `${fontSize}px Georgia`;

        while (
            ctx.measureText(name).width > 1300 &&
            fontSize > 25
        ) {
            fontSize -= 2;
            ctx.font = `${fontSize}px Georgia`;
        }

        ctx.fillStyle = "#a85e78";
        ctx.fillText(name, 800, 605);

        ctx.fillStyle = "#493c43";
        ctx.font = "27px Georgia";

        [
            "Pour avoir retrouvé les quatorze fragments du royaume",
            "et célébré les valeurs de bienveillance,",
            "de douceur et de respect."
        ].forEach((line, index) => {
            ctx.fillText(
                line,
                800,
                700 + index * 45
            );
        });

        ctx.fillStyle = "#82747b";
        ctx.font = "24px Georgia";

        ctx.fillText(
            formatDate(state.completedAt),
            800,
            870
        );

        ctx.fillStyle = "#a85e78";
        ctx.font = "italic 42px Georgia";
        ctx.fillText("Avec le cœur, Cœur Errant", 800, 970);

        canvas.toBlob(blob => {
            if (!blob) return;

            const url = URL.createObjectURL(blob);

            const link = document.createElement("a");

            link.href = url;
            link.download =
                "certificat-gardien-coeur-errant.png";

            document.body.appendChild(link);
            link.click();
            link.remove();

            setTimeout(() => {
                URL.revokeObjectURL(url);
            }, 3000);
        }, "image/png");
    }

    /* =========================================
       SECRET FACULTATIF
    ========================================== */

    $("kingdom-secret")?.addEventListener("click", () => {
        const message = $("kingdom-secret-message");

        message.hidden = !message.hidden;

        if (!state.secretFound) {
            state.secretFound = true;

            saveState();

            showToast(
                "Un secret découvert",
                "Les âmes curieuses trouvent parfois les plus belles surprises."
            );
        }
    });

    /* =========================================
       FENÊTRES
    ========================================== */

    let previousFocus = null;

    function openDialog(id) {
        const dialog = $(id);

        if (!dialog || dialog.open) return;

        previousFocus = document.activeElement;

        dialog.showModal();
    }

    function closeDialog(id) {
        const dialog = $(id);

        if (dialog?.open) {
            dialog.close();
        }
    }

    document.querySelectorAll("[data-close-dialog]")
        .forEach(button => {
            button.addEventListener("click", () => {
                closeDialog(
                    button.dataset.closeDialog
                );
            });
        });

    document.querySelectorAll(".kingdom-dialog")
        .forEach(dialog => {
            dialog.addEventListener("close", () => {
                previousFocus?.focus();
            });

            dialog.addEventListener("click", event => {
                if (event.target !== dialog) return;

                const rect = dialog.getBoundingClientRect();

                const outside =
                    event.clientX < rect.left ||
                    event.clientX > rect.right ||
                    event.clientY < rect.top ||
                    event.clientY > rect.bottom;

                if (outside) {
                    dialog.close();
                }
            });
        });

    /* =========================================
       CÉLÉBRATION
    ========================================== */

    function celebrate(amount = 40) {
        const container = $("kingdom-celebration");

        if (!container || reducedMotion) return;

        const symbols = ["✧", "❀", "♡", "◇"];

        const colors = [
            "#d9a6bc",
            "#b99a65",
            "#f0d6dc",
            "#a8b29b"
        ];

        for (let i = 0; i < amount; i++) {
            const piece = document.createElement("span");

            piece.className = "celebration-piece";

            piece.textContent =
                symbols[i % symbols.length];

            piece.style.setProperty(
                "--piece-x",
                `${Math.random() * 100}%`
            );

            piece.style.setProperty(
                "--piece-color",
                colors[i % colors.length]
            );

            piece.style.setProperty(
                "--piece-size",
                `${10 + Math.random() * 16}px`
            );

            piece.style.setProperty(
                "--piece-duration",
                `${3 + Math.random() * 3}s`
            );

            piece.style.setProperty(
                "--piece-delay",
                `${Math.random() * 1.5}s`
            );

            container.appendChild(piece);

            setTimeout(() => {
                piece.remove();
            }, 8000);
        }
    }

    /* =========================================
       RÉINITIALISATION
    ========================================== */

    $("reset-kingdom")?.addEventListener("click", () => {
        openDialog("kingdom-reset-dialog");
    });

    $("confirm-reset-kingdom")?.addEventListener(
        "click",
        () => {
            state = createState();

            if (hasConsent()) {
                saveState();
            }

            $("kingdom-secret-message").hidden = true;
            $("kingdom-name-message").textContent = "";

            renderAll();

            closeDialog("kingdom-reset-dialog");

            showToast(
                "Une nouvelle aventure",
                "Votre royaume est prêt à être redécouvert."
            );
        }
    );

    /* =========================================
       ANIMATIONS AU DÉFILEMENT
    ========================================== */

    function setupReveal() {
        if (
            reducedMotion ||
            !("IntersectionObserver" in window)
        ) return;

        page.classList.add("kingdom-animations");

        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (!entry.isIntersecting) return;

                    entry.target.classList.add(
                        "is-visible"
                    );

                    observer.unobserve(entry.target);
                });
            },
            { threshold: .08 }
        );

        document.querySelectorAll(".kingdom-reveal")
            .forEach(section => {
                observer.observe(section);
            });
    }

    /* =========================================
       RETOUR DEPUIS LES VOYAGES
    ========================================== */

    function handleTravelReturn() {
        const url = new URL(window.location.href);

        const id =
            url.searchParams.get("fragment") ||
            url.searchParams.get("tampon");

        if (!id) return;

        const treasure = treasures.find(
            item => item.id === id
        );

        /*
         * Le paramètre URL ne débloque rien.
         * Le fragment doit avoir été réellement enregistré
         * par la page Voyages.
         */

        if (
            treasure &&
            state.stamps.includes(id)
        ) {
            showToast(
                "Un fragment retrouvé",
                `${treasure.name} a rejoint votre médaillon.`
            );

            celebrate(
                state.stamps.length === 14 ? 65 : 20
            );
        }

        url.searchParams.delete("fragment");
        url.searchParams.delete("tampon");

        history.replaceState(
            null,
            "",
            url.pathname + url.search + url.hash
        );
    }

    /* =========================================
       SYNCHRONISATION LOCALE
    ========================================== */

    function refreshState() {
        if (hasConsent()) {
            state = readState();

            renderAll();
        }
    }

    window.addEventListener("storage", event => {
        if (
            event.key === STORAGE_KEY ||
            event.key === CONSENT_KEY ||
            event.key === null
        ) {
            state = readState();

            renderAll();
            updateStorageNote();
        }
    });

    window.addEventListener("pageshow", event => {
        if (event.persisted) {
            refreshState();
        }
    });

    /* =========================================
       INITIALISATION
    ========================================== */

    function renderAll() {
        renderIdentity();
        renderCompanion();
        renderMedallion();
        renderProgress();
        renderTreasures();
        renderLocations();
        renderCertificate();
        applyAtmosphere();
    }

    setupStorageConsent();
    createParticles();
    renderAll();
    setupReveal();
    handleTravelReturn();

})();