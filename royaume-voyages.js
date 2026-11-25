(() => {
    "use strict";

    const STORAGE_KEY = "coeur-errant-passport-v1";
    const CONSENT_KEY = "coeur-errant-kingdom-consent-v1";

    const treasures = [
        {
            id: "corse-2023",
            destination: "Corse",
            name: "Le coquillage des rêves",
            meaning: "Chaque petite âme mérite de pouvoir rêver d'une vie meilleure.",
            color: "#d4a3ad",
            symbol: "shell"
        },
        {
            id: "tanger-2024",
            destination: "Tanger",
            name: "La plume du courage",
            meaning: "Le courage commence parfois par un simple geste de douceur.",
            color: "#c4a477",
            symbol: "feather"
        },
        {
            id: "sicile-2024",
            destination: "Sicile",
            name: "Le fruit du soleil",
            meaning: "Un peu de chaleur peut transformer la journée d'une âme oubliée.",
            color: "#d8b86d",
            symbol: "sun"
        },
        {
            id: "varsovie-2025",
            destination: "Varsovie",
            name: "Le flocon éternel",
            meaning: "Chaque être vivant est unique.",
            color: "#91b4cb",
            symbol: "snow"
        },
        {
            id: "tanger-2025",
            destination: "Tanger",
            name: "Le cristal de l'amour",
            meaning: "L'amour véritable ne demande rien en retour.",
            color: "#d49bb1",
            symbol: "heart"
        },
        {
            id: "chefchaouen-2025",
            destination: "Chefchaouen",
            name: "Le papillon de la liberté",
            meaning: "Chaque être vivant mérite de vivre librement et dignement.",
            color: "#91b4cb",
            symbol: "butterfly"
        },
        {
            id: "akchour-2025",
            destination: "Akchour",
            name: "La feuille de vie",
            meaning: "La nature nous rappelle la fragilité et la beauté de la vie.",
            color: "#a8b29b",
            symbol: "leaf"
        },
        {
            id: "istanbul-2025",
            destination: "Istanbul",
            name: "La pierre des secrets",
            meaning: "Les plus beaux trésors sont parfois ceux que personne ne remarque.",
            color: "#b6a6d4",
            symbol: "gem"
        },
        {
            id: "skopje-2026",
            destination: "Skopje",
            name: "La clé des possibles",
            meaning: "Un petit geste peut ouvrir des portes que l'on croyait fermées.",
            color: "#c4a477",
            symbol: "key"
        },
        {
            id: "pristina-2026",
            destination: "Pristina",
            name: "L'étoile de l'espoir",
            meaning: "Même dans l'obscurité, une petite lumière peut subsister.",
            color: "#d8bd83",
            symbol: "star"
        },
        {
            id: "tirana-2026",
            destination: "Tirana",
            name: "Le sablier de la patience",
            meaning: "Certaines rencontres demandent simplement du temps.",
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
            color: "#d6b5a0",
            symbol: "flower"
        }
    ];

    const validIds = new Set(
        treasures.map(treasure => treasure.id)
    );

    /* DESSINS DES TRÉSORS */

    function treasureSVG(symbol, color) {

        const shapes = {

            shell: `
                <path d="M32 55 C5 45 0 15 20 12
                Q32 0 44 12 C64 15 59 45 32 55Z"/>
                <path d="M32 55V10 M32 55L15 15
                M32 55L49 15 M32 55L7 30
                M32 55L57 30"/>
            `,

            feather: `
                <path d="M10 54 C10 20 35 3 56 7
                C60 32 35 54 10 54Z"/>
                <path d="M5 60L49 14 M20 44L18 30
                M30 34L45 34"/>
            `,

            sun: `
                <circle cx="32" cy="32" r="15"/>
                <path d="M32 3V12 M32 52V61
                M3 32H12 M52 32H61
                M11 11L18 18 M46 46L53 53
                M11 53L18 46 M46 18L53 11"/>
            `,

            snow: `
                <path d="M32 4V60 M8 18L56 46
                M8 46L56 18 M23 10L32 19L41 10
                M23 54L32 45L41 54
                M8 29L20 25L17 13
                M47 51L44 39L56 35
                M8 35L20 39L17 51
                M47 13L44 25L56 29"/>
            `,

            heart: `
                <path d="M32 55L10 32
                C-2 15 20 3 32 19
                C44 3 66 15 54 32Z"/>
                <path d="M32 19V55 M10 32H54"/>
            `,

            butterfly: `
                <path d="M32 32
                C12 0 0 12 7 30
                Q12 40 32 32
                C0 38 15 64 32 40
                C49 64 64 38 32 32
                Q52 40 57 30
                C64 12 52 0 32 32Z"/>
                <path d="M32 20V48
                M32 22L24 12 M32 22L40 12"/>
            `,

            leaf: `
                <path d="M10 53 C3 18 29 7 56 8
                C58 37 40 58 10 53Z"/>
                <path d="M5 59L49 15
                M21 43L17 28 M30 34L44 35"/>
            `,

            gem: `
                <path d="M8 20L20 8H44L56 20L32 58Z"/>
                <path d="M8 20H56 M20 8L24 20L32 58
                M44 8L40 20L32 58
                M24 20L32 8L40 20"/>
            `,

            key: `
                <circle cx="23" cy="19" r="13"/>
                <circle cx="23" cy="19" r="5"/>
                <path d="M32 29L56 53L50 59L44 53
                L39 58L33 52L38 47L26 35Z"/>
            `,

            star: `
                <path d="M32 4L40 23L61 25L45 39
                L50 60L32 49L14 60L19 39
                L3 25L24 23Z"/>
            `,

            hourglass: `
                <path d="M13 6H51 M13 58H51
                M17 7Q17 22 32 32Q47 42 47 57
                M47 7Q47 22 32 32Q17 42 17 57"/>
                <path d="M20 17H44L32 29Z
                M20 53L32 40L44 53Z"/>
            `,

            lantern: `
                <path d="M23 10Q32 -5 41 10
                M17 16L24 10H40L47 16
                M17 16H47L44 54H20Z
                M15 54H49V60H15Z"/>
                <path d="M32 25Q14 48 32 48
                Q50 48 32 25Z"/>
            `,

            drop: `
                <path d="M32 4C25 18 11 31 11 42
                A21 21 0 0 0 53 42
                C53 31 39 18 32 4Z"/>
                <path d="M21 39Q17 49 28 52"/>
            `,

            flower: `
                <path d="M32 32
                C9 30 9 8 24 12
                C24 -1 42 0 40 13
                C58 5 64 25 47 32
                C64 43 48 58 38 47
                C34 64 16 56 22 44
                C4 48 4 29 18 29Z"/>
                <circle cx="32" cy="32" r="8"/>
            `
        };

        return `
            <svg viewBox="0 0 64 64"
                 xmlns="http://www.w3.org/2000/svg"
                 fill="${color}"
                 fill-opacity=".2"
                 stroke="${color}"
                 stroke-width="2"
                 stroke-linecap="round"
                 stroke-linejoin="round"
                 aria-hidden="true">
                ${shapes[symbol] || shapes.gem}
            </svg>
        `;
    }

    /* SAUVEGARDE */

    function hasConsent() {
        try {
            return localStorage.getItem(CONSENT_KEY) === "yes";
        } catch {
            return false;
        }
    }

    function emptyState() {
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

    function readState() {

        const base = emptyState();

        if (!hasConsent()) return base;

        try {

            const saved = JSON.parse(
                localStorage.getItem(STORAGE_KEY) || "{}"
            );

            const state = {
                ...base,
                ...saved
            };

            state.stamps = Array.isArray(state.stamps)
                ? [...new Set(
                    state.stamps.filter(id => validIds.has(id))
                )]
                : [];

            return state;

        } catch {
            return base;
        }
    }

    function collectTreasure(treasure) {

        if (!hasConsent()) return false;

        const state = readState();

        if (!state.stamps.includes(treasure.id)) {
            state.stamps.push(treasure.id);
        }

        if (
            state.stamps.length === treasures.length &&
            !state.completedAt
        ) {
            state.completedAt = new Date().toISOString();
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

            updateButtons();

            return true;

        } catch {
            return false;
        }
    }

    /* FENÊTRE DE DÉCOUVERTE */

    const dialog = document.createElement("dialog");

    dialog.className = "fragment-discovery-dialog";

    dialog.setAttribute(
        "aria-labelledby",
        "fragment-dialog-title"
    );

    dialog.innerHTML = `
        <button type="button"
                class="fragment-dialog-close"
                aria-label="Fermer">
            ×
        </button>

        <span class="fragment-dialog-label">
            Le Royaume des cœurs errants
        </span>

        <div class="fragment-dialog-visual"></div>

        <span class="fragment-dialog-destination"></span>

        <h2 id="fragment-dialog-title"></h2>

        <p class="fragment-dialog-meaning"></p>

        <p class="fragment-dialog-status"
           aria-live="polite"></p>

        <div class="fragment-dialog-progress">

            <div class="fragment-dialog-count">
                0 / 14
            </div>

            <div class="fragment-dialog-track">
                <div class="fragment-dialog-fill"></div>
            </div>

        </div>

        <div class="fragment-dialog-actions">

            <button type="button"
                    class="fragment-dialog-button fragment-save">
                Ajouter à mon médaillon
            </button>

            <button type="button"
                    class="fragment-dialog-button fragment-dialog-secondary fragment-continue">
                Continuer ma lecture
            </button>

            <a class="fragment-dialog-link"
               href="passeport.html#mon-passeport">
                Voir mon royaume
            </a>

        </div>
    `;

    document.body.appendChild(dialog);

    const find = selector =>
        dialog.querySelector(selector);

    let currentTreasure = null;
    let previousFocus = null;

    function renderDialog() {

        if (!currentTreasure) return;

        const treasure = currentTreasure;
        const state = readState();

        const collected = state.stamps.includes(
            treasure.id
        );

        find(".fragment-dialog-visual").innerHTML =
            treasureSVG(
                treasure.symbol,
                treasure.color
            );

        find(".fragment-dialog-destination").textContent =
            treasure.destination;

        find("#fragment-dialog-title").textContent =
            treasure.name;

        find(".fragment-dialog-meaning").textContent =
            treasure.meaning;

        find(".fragment-dialog-count").textContent =
            `${state.stamps.length} / ${treasures.length}`;

        find(".fragment-dialog-fill").style.width =
            `${state.stamps.length / treasures.length * 100}%`;

        const saveButton = find(".fragment-save");
        const status = find(".fragment-dialog-status");

        saveButton.hidden = collected;

        if (collected) {

            status.textContent =
                state.stamps.length === treasures.length
                    ? "Les 14 trésors sont réunis ! Votre passeport vous attend au château."
                    : "Ce trésor illumine désormais votre médaillon.";

        } else if (!hasConsent()) {

            status.textContent =
                "Pour conserver ce trésor, autorisez la sauvegarde de votre progression sur cet appareil.";

            saveButton.textContent =
                "Activer la sauvegarde et récolter";

        } else {

            status.textContent =
                "Vous avez découvert un trésor caché !";

            saveButton.textContent =
                "Ajouter à mon médaillon";
        }

        find(".fragment-dialog-link").href =
            collected
                ? `passeport.html?fragment=${treasure.id}#mon-passeport`
                : "passeport.html#mon-passeport";
    }

    function openTreasure(treasure) {

        currentTreasure = treasure;
        previousFocus = document.activeElement;

        renderDialog();

        if (!dialog.open) {
            dialog.showModal();
        }
    }

    find(".fragment-save").addEventListener(
        "click",
        () => {

            if (!currentTreasure) return;

            try {

                if (!hasConsent()) {

                    localStorage.setItem(
                        CONSENT_KEY,
                        "yes"
                    );
                }

                const saved = collectTreasure(
                    currentTreasure
                );

                if (saved) {

                    renderDialog();

                } else {

                    find(".fragment-dialog-status").textContent =
                        "La sauvegarde a échoué. Veuillez réessayer.";
                }

            } catch {

                find(".fragment-dialog-status").textContent =
                    "Votre navigateur ne permet pas la sauvegarde locale.";
            }
        }
    );

    find(".fragment-dialog-close")
        .addEventListener("click", () => {
            dialog.close();
        });

    find(".fragment-continue")
        .addEventListener("click", () => {
            dialog.close();
        });

    dialog.addEventListener("close", () => {

        if (previousFocus?.isConnected) {
            previousFocus.focus();
        }
    });

    dialog.addEventListener("click", event => {

        if (event.target !== dialog) return;

        const rect = dialog.getBoundingClientRect();

        if (
            event.clientX < rect.left ||
            event.clientX > rect.right ||
            event.clientY < rect.top ||
            event.clientY > rect.bottom
        ) {
            dialog.close();
        }
    });

    /* CRÉATION DES TRÉSORS */

    function createFragment(id) {

        const treasure = treasures.find(
            item => item.id === id
        );

        if (!treasure) return null;

        const button = document.createElement("button");

        button.type = "button";
        button.className = "kingdom-fragment";
        button.dataset.kingdomFragment = id;

        button.innerHTML = treasureSVG(
            treasure.symbol,
            treasure.color
        );

        button.title = "Un petit trésor mystérieux";

        button.setAttribute(
            "aria-label",
            "Découvrir un trésor du royaume"
        );

        button.addEventListener("click", () => {
            openTreasure(treasure);
        });

        return button;
    }

    function placeFragment(id, target) {

        if (!target) {
            console.warn(
                "Emplacement du trésor introuvable :",
                id
            );
            return;
        }

        if (
            document.querySelector(
                `[data-kingdom-fragment="${id}"]`
            )
        ) return;

        const fragment = createFragment(id);

        if (fragment) {
            target.appendChild(fragment);
        }
    }

    /* EMPLACEMENTS DANS LES RÉCITS */

    const cards = [
        ...document.querySelectorAll(".voyage-card")
    ];

    function findCard(title) {

        return cards.find(card => {

            const heading = card.querySelector(
                ".voyage-content h3"
            );

            return heading?.textContent
                .trim()
                .startsWith(title);
        });
    }

    function findStory(card, index = 0) {

        if (!card) return null;

        const paragraphs = card.querySelectorAll(
            ".voyage-content .voyage-story"
        );

        return paragraphs[index] ||
            paragraphs[0] ||
            card.querySelector(".voyage-content h3");
    }

    function placeInCard(id, title, index) {

        const card = findCard(title);

        placeFragment(
            id,
            findStory(card, index)
        );
    }

    // Corse
    placeInCard(
        "corse-2023",
        "Corse,",
        1
    );

    // Tanger — juin 2024
    placeInCard(
        "tanger-2024",
        "Tanger,",
        0
    );

    // Sicile
    placeInCard(
        "sicile-2024",
        "Sicile,",
        1
    );

    // Varsovie
    placeInCard(
        "varsovie-2025",
        "Varsovie,",
        0
    );

    // Maroc — septembre 2025
    const morocco = findCard("Maroc, entre");

    placeFragment(
        "tanger-2025",
        findStory(morocco, 1)
    );

    // Chefchaouen et Akchour sont dans
    // le récit détaillé du Maroc.

    const moroccoDetails = morocco
        ? [...morocco.querySelectorAll(
            ".travel-details-content p"
        )]
        : [];

    const chefchaouenParagraph =
        moroccoDetails.find(paragraph =>
            paragraph.textContent.includes(
                "ruelles bleues de Chefchaouen"
            )
        );

    const akchourParagraph =
        moroccoDetails.find(paragraph =>
            paragraph.textContent.includes("Akchour")
        );

    placeFragment(
        "chefchaouen-2025",
        chefchaouenParagraph
    );

    placeFragment(
        "akchour-2025",
        akchourParagraph
    );

    // Istanbul
    placeInCard(
        "istanbul-2025",
        "Istanbul,",
        1
    );

    // Macédoine du Nord
    placeInCard(
        "skopje-2026",
        "Skopje,",
        0
    );

    // Kosovo
    placeInCard(
        "pristina-2026",
        "Pristina,",
        1
    );

    // Albanie
    placeInCard(
        "tirana-2026",
        "Tirana,",
        0
    );

    // Marrakech — histoire de Djibou
    placeFragment(
        "marrakech-2026",
        document.querySelector(
            "#djibou .rescue-photo-caption p:last-child"
        )
    );

    // Agadir
    placeInCard(
        "agadir-2026",
        "Une bouteille vide,",
        1
    );

    // Djerba
    placeInCard(
        "djerba-2026",
        "Djerba,",
        1
    );

    /* ACTUALISATION DES TRÉSORS */

    function updateButtons() {

        const state = readState();

        document.querySelectorAll(
            "[data-kingdom-fragment]"
        ).forEach(button => {

            const collected = state.stamps.includes(
                button.dataset.kingdomFragment
            );

            button.classList.toggle(
                "is-collected",
                collected
            );

            button.title = collected
                ? "Trésor déjà retrouvé"
                : "Un petit trésor mystérieux";

            button.setAttribute(
                "aria-label",
                collected
                    ? "Voir le trésor déjà retrouvé"
                    : "Découvrir un trésor du royaume"
            );
        });
    }

    window.addEventListener(
        "storage",
        () => {
            updateButtons();

            if (dialog.open) {
                renderDialog();
            }
        }
    );

    window.addEventListener(
        "pageshow",
        updateButtons
    );

    updateButtons();

    /* VÉRIFICATION DES 14 EMPLACEMENTS */

    const placedCount = document.querySelectorAll(
        "[data-kingdom-fragment]"
    ).length;

    if (placedCount !== treasures.length) {

        console.warn(
            `Cœur Errant : ${placedCount}/14 trésors placés.`
        );

    } else {

        console.info(
            "Cœur Errant : les 14 trésors sont cachés."
        );
    }

})();