/* =========================================
   CŒUR ERRANT
   EXPÉRIENCES COMMUNES
   global.js
   ========================================= */

(() => {

    "use strict";

    function initCoeurErrant() {

        if (document.querySelector(".ce-global-tools")) {
            return;
        }

        const isDutch = document.documentElement.lang
            .toLowerCase()
            .startsWith("nl");

        const reducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        const STORAGE_KEY = "coeur-errant-passport-v1";

        const CONSENT_KEY =
            "coeur-errant-kingdom-consent-v1";

        const translations = {

            fr: {
                tagline: "Chaque animal a une histoire.",
                backToTop: "Retour en haut",
                dailyWord: "Le petit mot du cœur",
                openLetter: "Un petit mot vous attend...",
                close: "Fermer",
                tomorrow: "Un nouveau petit mot vous attend demain.",
                signature: "Avec amour, Cœur Errant ♡",
                kingdom: "Le Royaume des cœurs errants",
                treasures: "trésors retrouvés"
            },

            nl: {
                tagline: "Elk dier heeft een verhaal.",
                backToTop: "Terug naar boven",
                dailyWord: "Een woordje uit het hart",
                openLetter: "Er wacht een klein berichtje op jou...",
                close: "Sluiten",
                tomorrow: "Morgen wacht er een nieuw berichtje op jou.",
                signature: "Met liefde, Cœur Errant ♡",
                kingdom: "Het Koninkrijk van de zwervende hartjes",
                treasures: "gevonden schatten"
            }

        };

        const t = translations[isDutch ? "nl" : "fr"];

        /* =====================================
           SAUVEGARDE LOCALE
           ===================================== */

        function hasConsent() {

            try {

                return localStorage.getItem(
                    CONSENT_KEY
                ) === "yes";

            } catch {

                return false;

            }
        }

        /* =====================================
           LES 31 PETITS MOTS DU CŒUR
           ===================================== */

        const quotes = [

            {
                fr: "Il suffit parfois d'un regard pour qu'une âme cesse de se sentir invisible.",
                nl: "Soms is één blik genoeg om een ziel niet langer onzichtbaar te laten voelen."
            },

            {
                fr: "Un petit geste pour vous peut représenter un monde entier pour eux.",
                nl: "Een klein gebaar voor jou kan voor hen een hele wereld betekenen."
            },

            {
                fr: "Les animaux des rues ne demandent pas le monde. Seulement une petite place dans le nôtre.",
                nl: "Straatdieren vragen niet om de hele wereld. Alleen om een klein plekje in de onze."
            },

            {
                fr: "La bienveillance ne connaît ni frontières ni espèces.",
                nl: "Vriendelijkheid kent geen grenzen of diersoorten."
            },

            {
                fr: "Chaque gamelle remplie est une petite victoire contre l'indifférence.",
                nl: "Elk gevuld voerbakje is een kleine overwinning op onverschilligheid."
            },

            {
                fr: "Le plus beau souvenir d'un voyage est parfois celui qui possède quatre pattes.",
                nl: "De mooiste herinnering aan een reis heeft soms vier pootjes."
            },

            {
                fr: "Nous ne pouvons pas changer toutes les histoires, mais nous pouvons en rendre certaines plus douces.",
                nl: "We kunnen niet alle verhalen veranderen, maar sommige kunnen we wel mooier maken."
            },

            {
                fr: "Le cœur reconnaît ceux que le monde oublie.",
                nl: "Het hart herkent wie de wereld vergeet."
            },

            {
                fr: "Même les plus petites âmes méritent les plus grandes tendresses.",
                nl: "Zelfs de kleinste zieltjes verdienen de grootste liefde."
            },

            {
                fr: "Aider, c'est parfois simplement s'arrêter là où les autres continuent leur chemin.",
                nl: "Helpen betekent soms gewoon stilstaan waar anderen verder lopen."
            },

            {
                fr: "Une patte tendue, un regard croisé, une histoire qui commence.",
                nl: "Een uitgestoken pootje, een ontmoeting, een verhaal dat begint."
            },

            {
                fr: "La rue ne devrait jamais être le seul endroit où un animal peut espérer vivre.",
                nl: "De straat zou nooit de enige plek mogen zijn waar een dier kan leven."
            },

            {
                fr: "La douceur est une force que l'on peut offrir gratuitement.",
                nl: "Zachtheid is een kracht die we gratis kunnen geven."
            },

            {
                fr: "Il n'existe pas de geste trop petit lorsqu'il est fait avec amour.",
                nl: "Geen enkel gebaar is te klein wanneer het met liefde wordt gedaan."
            },

            {
                fr: "Ils ne parlent pas notre langue, mais leurs yeux racontent tant de choses.",
                nl: "Ze spreken onze taal niet, maar hun ogen vertellen zoveel."
            },

            {
                fr: "Voyager, c'est aussi apprendre à regarder ceux que l'on ne cherchait pas.",
                nl: "Reizen is ook leren kijken naar wie we niet zochten."
            },

            {
                fr: "Une rencontre peut durer quelques minutes et rester dans le cœur toute une vie.",
                nl: "Een ontmoeting kan enkele minuten duren en een leven lang in je hart blijven."
            },

            {
                fr: "L'amour ne se mesure pas à ce que l'on possède, mais à ce que l'on partage.",
                nl: "Liefde wordt niet gemeten aan wat we bezitten, maar aan wat we delen."
            },

            {
                fr: "Chaque animal mérite une histoire qui ne se termine pas dans l'indifférence.",
                nl: "Elk dier verdient een verhaal dat niet eindigt in onverschilligheid."
            },

            {
                fr: "L'espoir commence parfois au fond d'une petite gamelle.",
                nl: "Hoop begint soms op de bodem van een klein voerbakje."
            },

            {
                fr: "Un monde plus doux commence par nos propres gestes.",
                nl: "Een zachtere wereld begint bij onze eigen gebaren."
            },

            {
                fr: "Derrière chaque regard errant se cache une vie qui mérite d'être respectée.",
                nl: "Achter elke zwervende blik schuilt een leven dat respect verdient."
            },

            {
                fr: "Prendre soin d'une petite âme, c'est rendre le monde un peu plus humain.",
                nl: "Voor een klein zieltje zorgen maakt de wereld een beetje menselijker."
            },

            {
                fr: "On ne choisit pas toujours les rencontres qui changent notre vie.",
                nl: "We kiezen niet altijd de ontmoetingen die ons leven veranderen."
            },

            {
                fr: "Le bonheur tient parfois dans une queue qui remue.",
                nl: "Geluk zit soms in een kwispelend staartje."
            },

            {
                fr: "L'indifférence éloigne. La bienveillance rapproche.",
                nl: "Onverschilligheid verwijdert. Vriendelijkheid brengt dichterbij."
            },

            {
                fr: "Leur confiance est un cadeau précieux. Prenons-en soin.",
                nl: "Hun vertrouwen is een kostbaar geschenk. Laten we ervoor zorgen."
            },

            {
                fr: "Même loin de chez nous, nous pouvons offrir un peu de chaleur.",
                nl: "Zelfs ver van huis kunnen we een beetje warmte geven."
            },

            {
                fr: "Chaque jour est une nouvelle occasion de faire preuve de douceur.",
                nl: "Elke dag is een nieuwe kans om zachtheid te tonen."
            },

            {
                fr: "Peu importe la destination, le cœur connaît déjà le chemin.",
                nl: "Welke bestemming ook, het hart kent de weg al."
            },

            {
                fr: "Chaque animal a une histoire. Apprenons à l'écouter.",
                nl: "Elk dier heeft een verhaal. Laten we leren luisteren."
            }

        ];

        /* =====================================
           ICÔNE DE PATTE
           ===================================== */

        const pawIcon = `

            <svg viewBox="0 0 100 100"
                 fill="currentColor"
                 aria-hidden="true">

                <ellipse cx="20" cy="39"
                         rx="10" ry="14"
                         transform="rotate(-25 20 39)"/>

                <ellipse cx="40" cy="23"
                         rx="10" ry="15"
                         transform="rotate(-10 40 23)"/>

                <ellipse cx="63" cy="23"
                         rx="10" ry="15"
                         transform="rotate(10 63 23)"/>

                <ellipse cx="82" cy="40"
                         rx="10" ry="14"
                         transform="rotate(25 82 40)"/>

                <path d="
                    M50 43
                    C37 43 34 56 25 64
                    C13 76 22 91 35 89
                    C42 88 46 83 51 83
                    C57 83 63 89 70 89
                    C84 89 89 75 77 64
                    C68 56 64 43 50 43Z
                "/>

            </svg>

        `;

        /* =====================================
           ICÔNE DU MÉDAILLON
           ARBRE DE VIE
           ===================================== */

        const medallionIcon = `

            <svg viewBox="0 0 64 64"
                 fill="none"
                 stroke="currentColor"
                 stroke-width="1.8"
                 stroke-linecap="round"
                 stroke-linejoin="round"
                 aria-hidden="true">

                <circle cx="32" cy="32" r="29"/>

                <circle cx="32" cy="32" r="25"
                        stroke-width=".7"/>

                <path d="
                    M32 51
                    C29 41 33 33 32 22
                    M32 37 Q22 34 17 24
                    M32 32 Q42 29 47 19
                    M32 27 Q24 23 25 14
                    M32 23 Q38 19 38 12
                    M32 42 Q42 38 48 30
                    M31 43 Q21 40 15 33
                "/>

                <path d="
                    M32 49 Q23 51 19 54
                    M32 49 Q41 51 45 54
                    M32 49 V56
                "/>

                <path d="
                    M17 24 Q8 23 12 15 Q20 15 17 24Z
                    M25 14 Q18 10 24 5 Q31 8 25 14Z
                    M38 12 Q36 4 44 6 Q46 12 38 12Z
                    M47 19 Q47 10 55 13 Q56 21 47 19Z
                    M48 30 Q52 22 58 28 Q55 35 48 30Z
                    M15 33 Q5 34 7 26 Q14 25 15 33Z
                "
                fill="currentColor"
                fill-opacity=".25"/>

                <path d="
                    M32 15
                    C27 10 20 16 32 23
                    C44 16 37 10 32 15Z
                "
                fill="currentColor"
                fill-opacity=".4"/>

            </svg>

        `;

        /* =====================================
           ÉCRAN DE BIENVENUE
           ===================================== */

        function createWelcomeScreen() {

            if (reducedMotion) return;

            /*
             * Sans autorisation de sauvegarde,
             * l'animation apparaît uniquement
             * sur la page d'accueil.
             */

            if (hasConsent()) {

                try {

                    const alreadyVisited =
                        sessionStorage.getItem(
                            "ce-welcome-seen"
                        ) === "yes";

                    if (alreadyVisited) return;

                    sessionStorage.setItem(
                        "ce-welcome-seen",
                        "yes"
                    );

                } catch {

                    return;

                }

            } else {

                const page =
                    window.location.pathname
                        .split("/")
                        .pop();

                if (
                    page &&
                    page !== "index.html" &&
                    page !== "index-nl.html"
                ) {
                    return;
                }
            }

            const welcome =
                document.createElement("div");

            welcome.className = "ce-welcome-screen";

            welcome.setAttribute(
                "aria-hidden",
                "true"
            );

            welcome.innerHTML = `

                <div class="ce-welcome-decoration">
                    <span>♡</span>
                    <span>✧</span>
                    <span>✦</span>
                    <span>♡</span>
                </div>

                <div class="ce-welcome-content">

                    <div class="ce-welcome-paw">
                        ${pawIcon}
                    </div>

                    <div class="ce-welcome-brand">
                        Cœur Errant
                    </div>

                    <p>${t.tagline}</p>

                    <div class="ce-welcome-progress">
                        <span></span>
                    </div>

                </div>

            `;

            document.body.appendChild(welcome);

            let dismissed = false;

            function dismissWelcome() {

                if (dismissed) return;

                dismissed = true;

                welcome.classList.add(
                    "ce-welcome-finished"
                );

                window.setTimeout(() => {
                    welcome.remove();
                }, 500);
            }

            window.setTimeout(
                dismissWelcome,
                1100
            );

            welcome.addEventListener(
                "click",
                dismissWelcome,
                { once: true }
            );
        }

        /* =====================================
           OUTILS FLOTTANTS
           ===================================== */

        const tools = document.createElement("div");

        tools.className = "ce-global-tools";

        tools.innerHTML = `

            <button
                type="button"
                class="ce-passport-button"
                aria-label="${t.kingdom}"
                title="${t.kingdom}">

                ${medallionIcon}

                <span class="ce-passport-counter"
                      aria-hidden="true">
                    0/14
                </span>

            </button>

            <button
                type="button"
                class="ce-daily-button"
                aria-label="${t.dailyWord}"
                aria-haspopup="dialog"
                title="${t.dailyWord}">

                <svg viewBox="0 0 24 24"
                     fill="none"
                     stroke="currentColor"
                     stroke-width="1.4"
                     aria-hidden="true">

                    <rect x="2.5" y="5"
                          width="19" height="14"
                          rx="2"/>

                    <path d="M3 6L12 13L21 6"/>

                </svg>

                <span class="ce-daily-notification"
                      aria-hidden="true">♡</span>

            </button>

            <button
                type="button"
                class="ce-back-top"
                aria-label="${t.backToTop}"
                title="${t.backToTop}"
                hidden>

                ${pawIcon}

                <span aria-hidden="true">↑</span>

            </button>

        `;

        document.body.appendChild(tools);

        /* =====================================
           LE ROYAUME
           LES 14 TRÉSORS
           ===================================== */

        const treasureIds = [

            "corse-2023",
            "tanger-2024",
            "sicile-2024",
            "varsovie-2025",
            "tanger-2025",
            "chefchaouen-2025",
            "akchour-2025",
            "istanbul-2025",
            "skopje-2026",
            "pristina-2026",
            "tirana-2026",
            "marrakech-2026",
            "agadir-2026",
            "djerba-2026"

        ];

        const kingdomButton = tools.querySelector(
            ".ce-passport-button"
        );

        const kingdomCounter = tools.querySelector(
            ".ce-passport-counter"
        );

        let previousCount = null;

        function getTreasureCount() {

            if (!hasConsent()) return 0;

            try {

                const saved = JSON.parse(
                    localStorage.getItem(STORAGE_KEY)
                    || "{}"
                );

                if (
                    saved &&
                    Array.isArray(saved.stamps)
                ) {

                    return treasureIds.filter(
                        id => saved.stamps.includes(id)
                    ).length;

                }

            } catch {

                return 0;

            }

            return 0;
        }

        function updateKingdomCounter() {

            const count = getTreasureCount();

            const total = treasureIds.length;

            kingdomCounter.textContent =
                `${count}/${total}`;

            kingdomButton.classList.toggle(
                "ce-has-treasures",
                count > 0
            );

            kingdomButton.classList.toggle(
                "ce-passport-complete",
                count === total
            );

            const label =
                `${t.kingdom} — ${count}/${total} ${t.treasures}`;

            kingdomButton.title = label;

            kingdomButton.setAttribute(
                "aria-label",
                label
            );

            if (
                previousCount !== null &&
                count > previousCount &&
                !reducedMotion
            ) {

                kingdomButton.classList.remove(
                    "ce-new-treasure"
                );

                void kingdomButton.offsetWidth;

                kingdomButton.classList.add(
                    "ce-new-treasure"
                );

            }

            previousCount = count;
        }

        kingdomButton.addEventListener(
            "animationend",
            event => {

                if (
                    event.animationName ===
                    "ceTreasurePulse"
                ) {

                    kingdomButton.classList.remove(
                        "ce-new-treasure"
                    );

                }
            }
        );

        /* OUVRIR LE ROYAUME */

        kingdomButton.addEventListener("click", () => {

            const section =
                document.getElementById(
                    "mon-passeport"
                );

            if (section) {

                section.scrollIntoView({

                    behavior: reducedMotion
                        ? "auto"
                        : "smooth",

                    block: "start"

                });

            } else {

                /*
                 * On conserve passeport.html.
                 * Aucun changement de nom de fichier.
                 */

                window.location.href =
                    "passeport.html";

            }

        });

        /* SYNCHRONISATION */

        window.addEventListener(
            "coeur-errant-passport-updated",
            updateKingdomCounter
        );

        window.addEventListener(
            "storage",
            updateKingdomCounter
        );

        window.addEventListener(
            "pageshow",
            updateKingdomCounter
        );

        window.addEventListener(
            "focus",
            updateKingdomCounter
        );

        document.addEventListener(
            "visibilitychange",
            updateKingdomCounter
        );

        /*
         * Vérification complémentaire pour les
         * modifications provenant d'anciens scripts.
         */

        window.setInterval(() => {

            if (!document.hidden) {

                updateKingdomCounter();

            }

        }, 1500);

        updateKingdomCounter();

        /* =====================================
           RETOUR EN HAUT
           ===================================== */

        const backTop = tools.querySelector(
            ".ce-back-top"
        );

        function updateBackTop() {

            backTop.hidden =
                window.scrollY < 500;

        }

        window.addEventListener(
            "scroll",
            updateBackTop,
            { passive: true }
        );

        updateBackTop();

        backTop.addEventListener("click", () => {

            window.scrollTo({

                top: 0,

                behavior: reducedMotion
                    ? "auto"
                    : "smooth"

            });

        });

        /* =====================================
           CITATION DU JOUR
           ===================================== */

        function getTodayQuote() {

            const now = new Date();

            const dayNumber = Math.floor(

                Date.UTC(
                    now.getFullYear(),
                    now.getMonth(),
                    now.getDate()
                ) / 86400000

            );

            const quoteIndex =
                dayNumber % quotes.length;

            return quotes[quoteIndex][
                isDutch ? "nl" : "fr"
            ];

        }

        function getTodayKey() {

            const now = new Date();

            return [

                now.getFullYear(),
                now.getMonth() + 1,
                now.getDate()

            ].join("-");

        }

        /* =====================================
           LETTRE DU JOUR
           ===================================== */

        const dailyDialog =
            document.createElement("dialog");

        dailyDialog.className =
            "ce-daily-dialog";

        dailyDialog.setAttribute(
            "aria-labelledby",
            "ce-daily-title"
        );

        dailyDialog.innerHTML = `

            <div class="ce-daily-letter">

                <button
                    type="button"
                    class="ce-daily-close"
                    aria-label="${t.close}">

                    ×

                </button>

                <div class="ce-daily-decoration"
                     aria-hidden="true">

                    <span>✧</span>
                    <span>♡</span>
                    <span>✦</span>

                </div>

                <div class="ce-daily-heart"
                     aria-hidden="true">

                    ♡

                </div>

                <p class="ce-daily-label">
                    CŒUR ERRANT
                </p>

                <h2 id="ce-daily-title">
                    ${t.dailyWord}
                </h2>

                <p class="ce-daily-date"></p>

                <blockquote
                    class="ce-daily-quote">
                </blockquote>

                <div class="ce-daily-signature">
                    ${t.signature}
                </div>

                <div class="ce-daily-divider"></div>

                <p class="ce-daily-tomorrow">
                    ${t.tomorrow}
                </p>

            </div>

        `;

        document.body.appendChild(dailyDialog);

        const dailyButton = tools.querySelector(
            ".ce-daily-button"
        );

        const notification = tools.querySelector(
            ".ce-daily-notification"
        );

        const dailyClose = dailyDialog.querySelector(
            ".ce-daily-close"
        );

        let readTodayInMemory = null;

        function updateNotification() {

            const today = getTodayKey();

            let alreadyRead =
                readTodayInMemory === today;

            if (hasConsent()) {

                try {

                    alreadyRead =
                        alreadyRead ||
                        localStorage.getItem(
                            "ce-daily-read"
                        ) === today;

                } catch {

                    // La lettre reste accessible.

                }
            }

            notification.hidden = alreadyRead;

            dailyButton.title = alreadyRead
                ? t.dailyWord
                : t.openLetter;

        }

        updateNotification();

        dailyButton.addEventListener("click", () => {

            const dateText = new Intl.DateTimeFormat(

                isDutch ? "nl-BE" : "fr-BE",

                {
                    day: "numeric",
                    month: "long",
                    year: "numeric"
                }

            ).format(new Date());

            dailyDialog.querySelector(
                ".ce-daily-date"
            ).textContent = dateText;

            dailyDialog.querySelector(
                ".ce-daily-quote"
            ).textContent =
                "« " + getTodayQuote() + " »";

            if (!dailyDialog.open) {

                dailyDialog.showModal();

            }

            readTodayInMemory = getTodayKey();

            if (hasConsent()) {

                try {

                    localStorage.setItem(
                        "ce-daily-read",
                        getTodayKey()
                    );

                } catch {

                    // La lecture reste possible
                    // sans sauvegarde.

                }

            }

            updateNotification();

        });

        dailyClose.addEventListener("click", () => {

            dailyDialog.close();

        });

        dailyDialog.addEventListener(
            "click",
            event => {

                if (event.target !== dailyDialog) {
                    return;
                }

                const rect =
                    dailyDialog.getBoundingClientRect();

                const outside =

                    event.clientX < rect.left ||
                    event.clientX > rect.right ||
                    event.clientY < rect.top ||
                    event.clientY > rect.bottom;

                if (outside) {

                    dailyDialog.close();

                }

            }
        );

        dailyDialog.addEventListener("close", () => {

            dailyButton.focus({
                preventScroll: true
            });

        });

        window.addEventListener(
            "focus",
            updateNotification
        );

        window.addEventListener(
            "pageshow",
            updateNotification
        );

        window.addEventListener(
            "storage",
            updateNotification
        );

        document.addEventListener(
            "visibilitychange",
            updateNotification
        );

        window.setInterval(
            updateNotification,
            60000
        );

        /* =====================================
           PAGE ACTIVE DANS LE HEADER
           ===================================== */

        function normalizePath(path) {

            return path.endsWith("/")
                ? path + "index.html"
                : path;

        }

        const currentPath = normalizePath(
            window.location.pathname
        );

        document.querySelectorAll(".nav-links a")
            .forEach(link => {

                const href =
                    link.getAttribute("href");

                if (!href) return;

                try {

                    const url = new URL(
                        href,
                        window.location.href
                    );

                    const active =

                        url.origin ===
                            window.location.origin &&

                        normalizePath(url.pathname) ===
                            currentPath &&

                        !url.hash;

                    link.classList.toggle(
                        "active",
                        active
                    );

                    if (active) {

                        link.setAttribute(
                            "aria-current",
                            "page"
                        );

                    } else {

                        link.removeAttribute(
                            "aria-current"
                        );

                    }

                } catch {

                    // Ignorer les liens invalides.

                }

            });

        /* =====================================
           INITIALISATION
           ===================================== */

        createWelcomeScreen();

    }

    if (document.readyState === "loading") {

        document.addEventListener(

            "DOMContentLoaded",

            initCoeurErrant,

            { once: true }

        );

    } else {

        initCoeurErrant();

    }

})();

/* =========================================
   FIN — CŒUR ERRANT
   Chaque animal a une histoire.
   ========================================= */