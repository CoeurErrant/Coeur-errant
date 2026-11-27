



(() => {
    "use strict";

    const isNL = document.documentElement.lang.toLowerCase().startsWith("nl");
    const t = (fr, nl) => isNL ? nl : fr;

    const $ = id => document.getElementById(id);

    const mapSection = $("carte-enchantee");

    if (!mapSection) return;

    const svg = $("fragment-map-artwork");
    const markers = $("fragment-map-markers");
    const destinationGrid = $("fragment-destination-grid");
    const viewport = $("fragment-map-viewport");
    const world = $("fragment-map-world");

    const dialog = $("fragment-game-dialog");
    const gameContent = $("fragment-game-content");
    const feedback = $("fragment-game-feedback");
    const reward = $("fragment-game-reward");

    const SVG_NS = "http://www.w3.org/2000/svg";

    let activeDestination = null;
    let gameCompleted = false;
    let gameSession = 0;
    let zoom = 1;
    let offsetX = 0;
    let offsetY = 0;
    let lastTrigger = null;

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;


    /* =========================================
       LES 14 DESTINATIONS
    ========================================== */

    const destinations = [

        {
            id: "corse-2023",
            name: t("Corse", "Corsica"),
            country: t("France", "Frankrijk"),
            date: t("Avril 2023", "April 2023"),
            lat: 42.15,
            lon: 9.1,
            symbol: "🐚",
            game: "puzzle",
            title: t("Les souvenirs de Corse", "De herinneringen aan Corsica")
        },

        {
            id: "tanger-2024",
            name: "Tanger",
            country: t("Maroc", "Marokko"),
            date: t("Juin 2024", "Juni 2024"),
            lat: 35.76,
            lon: -5.83,
            dx: -25,
            dy: -20,
            symbol: "🪶",
            game: "riddle",
            title: t("L'énigme du courage", "Het raadsel van moed")
        },

        {
            id: "sicile-2024",
            name: t("Sicile", "Sicilië"),
            country: t("Italie", "Italië"),
            date: t("Août 2024", "Augustus 2024"),
            lat: 37.6,
            lon: 14.0,
            symbol: "☀",
            game: "memory",
            title: t("Les souvenirs du soleil", "De herinneringen aan de zon")
        },

        {
            id: "varsovie-2025",
            name: t("Varsovie", "Warschau"),
            country: t("Pologne", "Polen"),
            date: t("Janvier 2025", "Januari 2025"),
            lat: 52.23,
            lon: 21.01,
            symbol: "❄",
            game: "observation",
            title: t("Le flocon disparu", "De verdwenen sneeuwvlok")
        },

        {
            id: "tanger-2025",
            name: "Tanger",
            country: t("Maroc", "Marokko"),
            date: t("Septembre 2025", "September 2025"),
            lat: 35.76,
            lon: -5.83,
            dx: 25,
            dy: -35,
            symbol: "♡",
            game: "quiz",
            title: t("Le cristal de l'amour", "Het kristal van liefde")
        },

        {
            id: "chefchaouen-2025",
            name: "Chefchaouen",
            country: t("Maroc", "Marokko"),
            date: t("Septembre 2025", "September 2025"),
            lat: 35.17,
            lon: -5.27,
            dx: 65,
            dy: 20,
            symbol: "🦋",
            game: "match",
            title: t("Les papillons de la liberté", "De vlinders van vrijheid")
        },

        {
            id: "akchour-2025",
            name: "Akchour",
            country: t("Maroc", "Marokko"),
            date: t("Septembre 2025", "September 2025"),
            lat: 35.25,
            lon: -5.18,
            dx: 105,
            dy: -20,
            symbol: "🍃",
            game: "path",
            title: t("Le chemin de la vie", "Het levenspad")
        },

        {
            id: "istanbul-2025",
            name: "Istanbul",
            country: t("Turquie", "Turkije"),
            date: t("Novembre 2025", "November 2025"),
            lat: 41.01,
            lon: 28.98,
            symbol: "♦",
            game: "memory",
            title: t("Les secrets d'Istanbul", "De geheimen van Istanbul")
        },

        {
            id: "skopje-2026",
            name: "Skopje",
            country: t("Macédoine du Nord", "Noord-Macedonië"),
            date: t("Janvier 2026", "Januari 2026"),
            lat: 42.0,
            lon: 21.43,
            dx: 45,
            dy: 20,
            symbol: "🗝",
            game: "riddle",
            title: t("La clé des possibles", "De sleutel tot mogelijkheden")
        },

        {
            id: "pristina-2026",
            name: "Pristina",
            country: "Kosovo",
            date: t("Janvier 2026", "Januari 2026"),
            lat: 42.66,
            lon: 21.16,
            dx: 25,
            dy: -45,
            symbol: "✦",
            game: "quiz",
            title: t("Une étoile dans la nuit", "Een ster in de nacht")
        },

        {
            id: "tirana-2026",
            name: "Tirana",
            country: t("Albanie", "Albanië"),
            date: t("Janvier 2026", "Januari 2026"),
            lat: 41.33,
            lon: 19.82,
            dx: -35,
            dy: 35,
            symbol: "⌛",
            game: "order",
            title: t("Le temps de la confiance", "De tijd van vertrouwen")
        },

        {
            id: "marrakech-2026",
            name: "Marrakech",
            country: t("Maroc", "Marokko"),
            date: t("Juin 2026", "Juni 2026"),
            lat: 31.63,
            lon: -8.0,
            dx: 20,
            dy: 5,
            symbol: "✧",
            game: "order",
            title: t("Une lumière dans la rue", "Een lichtje op straat")
        },

        {
            id: "agadir-2026",
            name: "Agadir",
            country: t("Maroc", "Marokko"),
            date: t("Juin 2026", "Juni 2026"),
            lat: 30.42,
            lon: -9.6,
            dx: -20,
            dy: 20,
            symbol: "💧",
            game: "difference",
            title: t("Les différences de l'océan", "De verschillen van de oceaan")
        },

        {
            id: "djerba-2026",
            name: "Djerba",
            country: t("Tunisie", "Tunesië"),
            date: t("Août 2026", "Augustus 2026"),
            lat: 33.8,
            lon: 10.85,
            symbol: "❀",
            game: "riddle",
            title: t("La fleur de la douceur", "De bloem van zachtheid")
        }

    ];


    /* =========================================
       PROJECTION GÉOGRAPHIQUE
    ========================================== */

    function project(lon, lat) {

        return {
            x: (lon + 15) / 55 * 1000,
            y: (58 - lat) / 33 * 800
        };

    }

    function getPosition(destination) {

        const position = project(
            destination.lon,
            destination.lat
        );

        return {
            x: position.x + (destination.dx || 0),
            y: position.y + (destination.dy || 0)
        };

    }

    function svgElement(tag, attributes = {}) {

        const element = document.createElementNS(
            SVG_NS,
            tag
        );

        Object.entries(attributes).forEach(
            ([name, value]) => {
                element.setAttribute(name, value);
            }
        );

        return element;

    }

    function drawPolygon(points, className) {

        const path = points.map(
            ([lon, lat], index) => {

                const point = project(lon, lat);

                return `${index === 0 ? "M" : "L"}
                    ${point.x} ${point.y}`;

            }
        ).join(" ");

        const element = svgElement("path", {
            d: `${path} Z`,
            class: className
        });

        svg.appendChild(element);

    }

    function drawLine(points, className) {

        const path = points.map(
            ([lon, lat], index) => {

                const point = project(lon, lat);

                return `${index === 0 ? "M" : "L"}
                    ${point.x} ${point.y}`;

            }
        ).join(" ");

        const element = svgElement("path", {
            d: path,
            class: className
        });

        svg.appendChild(element);

    }

    function drawLabel(text, lon, lat, className) {

        const point = project(lon, lat);

        const element = svgElement("text", {
            x: point.x,
            y: point.y,
            class: className,
            "text-anchor": "middle"
        });

        element.textContent = text;

        svg.appendChild(element);

    }


    /* =========================================
       DESSIN DE LA CARTE
    ========================================== */

    function drawMap() {

        svg.replaceChildren();


        /* Quadrillage vintage */

        for (let lon = -15; lon <= 40; lon += 5) {

            drawLine(
                [[lon, 25], [lon, 58]],
                "map-grid-line"
            );

        }

        for (let lat = 25; lat <= 58; lat += 5) {

            drawLine(
                [[-15, lat], [40, lat]],
                "map-grid-line"
            );

        }


        /* Europe continentale */

        drawPolygon([

            [-10, 36],
            [-9.3, 38.7],
            [-9, 41.8],
            [-8.7, 43.1],
            [-5, 43.6],
            [-1.5, 43.5],
            [-1.2, 46],
            [-4.8, 48.5],
            [-2, 49.7],
            [2, 51],
            [4, 52.5],
            [8, 53.8],
            [8, 55],
            [10, 57.8],
            [12, 56],
            [12, 54],
            [16, 54.5],
            [20, 54.8],
            [22, 56],
            [24, 58],
            [40, 58],
            [40, 47],
            [37, 46],
            [33, 46.5],
            [30, 45.5],
            [29, 43.5],
            [28, 41.9],
            [26, 40.7],
            [24, 40.7],
            [23.8, 38],
            [22, 36.5],
            [21, 37],
            [20, 39.5],
            [19, 41.5],
            [17, 43],
            [15, 44.8],
            [13.5, 45.7],
            [12.5, 44.5],
            [13.5, 42.5],
            [16, 41.8],
            [18.5, 40],
            [17.8, 39.5],
            [16.5, 40],
            [16.5, 38],
            [15.5, 38],
            [14, 40],
            [12, 41.5],
            [10, 44],
            [8, 44],
            [7, 43.5],
            [5, 43.3],
            [3, 42.5],
            [1, 41],
            [0, 39],
            [-1, 37.5],
            [-5.5, 36],
            [-7.5, 37]

        ], "map-land");


        /* Afrique du Nord */

        drawPolygon([

            [-15, 25],
            [-15, 27.5],
            [-12, 29],
            [-10, 30],
            [-9.5, 32],
            [-7.5, 33.5],
            [-6, 35.8],
            [-3, 35.2],
            [0, 35.7],
            [3, 36.8],
            [7, 37],
            [10, 37.3],
            [11, 36],
            [10.5, 34],
            [11.5, 33],
            [15, 32.5],
            [20, 32],
            [23, 31.5],
            [28, 31],
            [32, 31.5],
            [34, 30],
            [35, 25]

        ], "map-land");


        /* Turquie et Proche-Orient */

        drawPolygon([

            [26, 40.5],
            [29, 41],
            [32, 41.8],
            [36, 41.2],
            [40, 41.5],
            [40, 25],
            [35, 25],
            [34.5, 31],
            [35.5, 35.5],
            [32, 36],
            [29, 36.5],
            [27, 37.5]

        ], "map-land");


        /* Grande-Bretagne */

        drawPolygon([

            [-5.8, 50],
            [-3, 50.3],
            [1.5, 51],
            [1, 53],
            [-1.5, 55],
            [-3, 58],
            [-5.5, 57.5],
            [-6, 55],
            [-3, 53],
            [-5, 52]

        ], "map-island");


        /* Irlande */

        drawPolygon([

            [-10.5, 51.5],
            [-9.5, 54.5],
            [-7, 55.3],
            [-5.5, 54],
            [-6, 52],
            [-9, 51.5]

        ], "map-island");


        /* Corse */

        drawPolygon([

            [8.6, 41.4],
            [8.5, 42.5],
            [9.4, 43],
            [9.6, 42],
            [9.2, 41.4]

        ], "map-island");


        /* Sardaigne */

        drawPolygon([

            [8.2, 39],
            [8.1, 40.5],
            [9.5, 41.2],
            [9.8, 40],
            [9.4, 38.9]

        ], "map-island");


        /* Sicile */

        drawPolygon([

            [12.4, 38],
            [15.6, 38.2],
            [15.1, 36.7],
            [13.6, 37.2]

        ], "map-island");


        /* Crète */

        drawPolygon([

            [23.4, 35.6],
            [26.3, 35.3],
            [25.8, 34.9],
            [23.6, 35.1]

        ], "map-island");


        /* Chypre */

        drawPolygon([

            [32.2, 35],
            [34.6, 35.7],
            [33.7, 34.6],
            [32.4, 34.6]

        ], "map-island");


        /* Frontières décoratives */

        drawLine([
            [-1.5, 43.5],
            [0.5, 42.8],
            [3, 42.5]
        ], "map-country-border");

        drawLine([
            [2, 51],
            [4, 49.8],
            [7.5, 48.5],
            [7, 46],
            [6.5, 44]
        ], "map-country-border");

        drawLine([
            [14, 54],
            [14.5, 51],
            [17, 50],
            [22, 49]
        ], "map-country-border");

        drawLine([
            [-1.5, 35],
            [-2, 32],
            [-4, 30],
            [-8, 27.5]
        ], "map-country-border");

        drawLine([
            [8.5, 36.8],
            [8, 34],
            [9.5, 31]
        ], "map-country-border");


        /* Noms géographiques */

        drawLabel(
            "EUROPE",
            12, 56,
            "map-country-label"
        );

        drawLabel(
            "FRANCE",
            2, 47,
            "map-country-label"
        );

        drawLabel(
            t("ESPAGNE", "SPANJE"),
            -4, 40.5,
            "map-country-label"
        );

        drawLabel(
            t("ITALIE", "ITALIË"),
            11, 44.5,
            "map-country-label"
        );

        drawLabel(
            t("MAROC", "MAROKKO"),
            -6, 28,
            "map-country-label"
        );

        drawLabel(
            t("ALGÉRIE", "ALGERIJE"),
            4, 30,
            "map-country-label"
        );

        drawLabel(
            t("TUNISIE", "TUNESIË"),
            9.5, 35.5,
            "map-country-label"
        );

        drawLabel(
            t("TURQUIE", "TURKIJE"),
            34, 38.5,
            "map-country-label"
        );

        drawLabel(
            t("Océan Atlantique", "Atlantische Oceaan"),
            -11, 45,
            "map-water-label"
        );

        drawLabel(
            t("Mer Méditerranée", "Middellandse Zee"),
            14, 34.5,
            "map-water-label"
        );

        drawLabel(
            t("Mer Noire", "Zwarte Zee"),
            34, 44,
            "map-water-label"
        );


        /* Petites étoiles décoratives */

        [
            [-12, 53],
            [-12, 38],
            [5, 38],
            [18, 30],
            [30, 34],
            [35, 50]
        ].forEach(([lon, lat]) => {

            drawLabel(
                "✧",
                lon,
                lat,
                "map-decoration"
            );

        });

        drawRoutes();

    }


    /* =========================================
       CHEMINS ENTRE LES DESTINATIONS
    ========================================== */

    function drawRoutes() {

        destinations.forEach((destination, index) => {

            if (index === 0) return;

            const previous = getPosition(
                destinations[index - 1]
            );

            const current = getPosition(destination);

            const middleX =
                (previous.x + current.x) / 2;

            const middleY =
                (previous.y + current.y) / 2 - 30;

            const path = svgElement("path", {

                d: `
                    M ${previous.x} ${previous.y}
                    Q ${middleX} ${middleY}
                    ${current.x} ${current.y}
                `,

                class: "map-route",

                "data-route-from":
                    destinations[index - 1].id,

                "data-route-to": destination.id

            });

            svg.appendChild(path);

        });

    }


    /* =========================================
       MARQUEURS INTERACTIFS
    ========================================== */

    function createMarkers() {

        markers.replaceChildren();

        destinations.forEach((destination, index) => {

            const position = getPosition(destination);

            const button = document.createElement("button");

            button.type = "button";
            button.className = "fragment-map-marker";

            button.dataset.destination = destination.id;

            button.style.left =
                `${position.x / 1000 * 100}%`;

            button.style.top =
                `${position.y / 800 * 100}%`;

            button.setAttribute(
                "aria-label",
                `${destination.name}, ${destination.date}`
            );

            button.setAttribute(
                "aria-haspopup",
                "dialog"
            );

            button.setAttribute(
                "aria-controls",
                "fragment-game-dialog"
            );

            const symbol = document.createElement("span");

            symbol.className = "map-marker-symbol";
            symbol.textContent = "✧";

            symbol.setAttribute(
                "aria-hidden",
                "true"
            );

            const label = document.createElement("span");

            label.className = "fragment-map-marker-label";

            label.textContent =
                destination.name === "Tanger"
                    ? `Tanger ${index === 1 ? "2024" : "2025"}`
                    : destination.name;

            button.append(symbol, label);

            button.addEventListener("click", () => {

                openGame(destination, button);

            });

            markers.appendChild(button);

        });

    }


    /* =========================================
       CARNET DES DESTINATIONS
    ========================================== */

    function createDestinationCards() {

        destinationGrid.replaceChildren();

        destinations.forEach((destination, index) => {

            const button = document.createElement("button");

            button.type = "button";

            button.className =
                "fragment-destination-card";

            button.dataset.destination = destination.id;

            button.setAttribute(
                "aria-haspopup",
                "dialog"
            );

            button.setAttribute(
                "aria-controls",
                "fragment-game-dialog"
            );

            const number = document.createElement("span");

            number.className =
                "fragment-destination-number";

            number.textContent =
                String(index + 1).padStart(2, "0");

            const symbol = document.createElement("span");

            symbol.className =
                "fragment-destination-symbol";

            symbol.textContent = "✧";

            symbol.setAttribute(
                "aria-hidden",
                "true"
            );

            const name = document.createElement("span");

            name.className =
                "fragment-destination-name";

            name.textContent = destination.name;

            const date = document.createElement("span");

            date.className =
                "fragment-destination-date";

            date.textContent = destination.date;

            const status = document.createElement("span");

            status.className =
                "fragment-destination-status";

            status.textContent = t("Découvrir le défi", "Ontdek de uitdaging");

            button.append(
                number,
                symbol,
                name,
                date,
                status
            );

            button.addEventListener("click", () => {

                openGame(destination, button);

            });

            destinationGrid.appendChild(button);

        });

    }


    /* =========================================
       ZOOM ET DÉPLACEMENT
    ========================================== */

    function updateMapTransform() {

        const maxX =
            Math.max(0, (world.offsetWidth * zoom
                - viewport.clientWidth) / 2);

        const maxY =
            Math.max(0, (world.offsetHeight * zoom
                - viewport.clientHeight) / 2);

        offsetX = Math.max(
            -maxX,
            Math.min(maxX, offsetX)
        );

        offsetY = Math.max(
            -maxY,
            Math.min(maxY, offsetY)
        );

        world.style.transform = `
            translate(${offsetX}px, ${offsetY}px)
            scale(${zoom})
        `;

        $("map-zoom-in").disabled = zoom >= 3;
        $("map-zoom-out").disabled = zoom <= 1;

        viewport.style.cursor =
            zoom > 1 ? "grab" : "default";

        viewport.style.touchAction =
            zoom > 1 ? "none" : "pan-y";

    }

    $("map-zoom-in").addEventListener("click", () => {

        zoom = Math.min(3, zoom + .5);

        updateMapTransform();

    });

    $("map-zoom-out").addEventListener("click", () => {

        zoom = Math.max(1, zoom - .5);

        if (zoom === 1) {

            offsetX = 0;
            offsetY = 0;

        }

        updateMapTransform();

    });

    $("map-zoom-reset").addEventListener("click", () => {

        zoom = 1;
        offsetX = 0;
        offsetY = 0;

        updateMapTransform();

    });

    let dragging = false;
    let startX = 0;
    let startY = 0;
    let initialX = 0;
    let initialY = 0;

    viewport.addEventListener("pointerdown", event => {

        if (
            zoom <= 1 ||
            event.target.closest("button") ||
            !event.isPrimary
        ) return;

        dragging = true;

        startX = event.clientX;
        startY = event.clientY;

        initialX = offsetX;
        initialY = offsetY;

        world.style.transition = "none";

        viewport.style.cursor = "grabbing";

        viewport.setPointerCapture(event.pointerId);

    });

    viewport.addEventListener("pointermove", event => {

        if (!dragging) return;

        offsetX = initialX + event.clientX - startX;
        offsetY = initialY + event.clientY - startY;

        updateMapTransform();

        viewport.style.cursor = "grabbing";

    });

    function stopDragging() {

        dragging = false;

        world.style.transition = reducedMotion
            ? "none"
            : "";

        updateMapTransform();

    }

    viewport.addEventListener(
        "pointerup",
        stopDragging
    );

    viewport.addEventListener(
        "pointercancel",
        stopDragging
    );

    viewport.addEventListener(
        "lostpointercapture",
        stopDragging
    );

    window.addEventListener(
        "resize",
        updateMapTransform
    );    /* =========================================
       OUTILS DES MINI-JEUX
    ========================================== */

    function shuffle(items) {

        const result = [...items];

        for (let i = result.length - 1; i > 0; i--) {

            const j = Math.floor(
                Math.random() * (i + 1)
            );

            [result[i], result[j]] =
                [result[j], result[i]];

        }

        return result;

    }

    function createElement(tag, className, text) {

        const element = document.createElement(tag);

        if (className) {
            element.className = className;
        }

        if (text !== undefined) {
            element.textContent = text;
        }

        return element;

    }

    function createButton(className, text) {

        const button = createElement(
            "button",
            className,
            text
        );

        button.type = "button";

        return button;

    }

    function setFeedback(message, type = "") {

        feedback.textContent = message;

        feedback.classList.remove(
            "is-success",
            "is-error"
        );

        if (type) {
            feedback.classList.add(`is-${type}`);
        }

    }

    function createCounter(text) {

        const counter = createElement(
            "div",
            "fragment-game-counter",
            text
        );

        counter.setAttribute("role", "status");

        return counter;

    }

    function createHint(text) {

        const hint = createElement(
            "p",
            "fragment-game-hint",
            text
        );

        gameContent.appendChild(hint);

    }

    function gameDelay(callback, delay = 700) {

        const session = gameSession;

        setTimeout(() => {

            if (
                session !== gameSession ||
                !dialog.open
            ) return;

            callback();

        }, reducedMotion ? Math.min(delay, 500) : delay);

    }


    /* =========================================
       CONTENU DES ÉNIGMES
    ========================================== */

    const riddles = {

        "tanger-2024": {

            description:
                t("Une petite énigme vous attend dans les rues de Tanger.", "Een klein raadsel wacht op je in de straten van Tanger."),

            question:
                t("Je ne fais aucun bruit, je ne demande aucune récompense, mais je peux changer la journée d'un animal. Qui suis-je ?", "Ik maak geen geluid, vraag geen beloning, maar kan de dag van een dier veranderen. Wie ben ik?"),

            answers: [
                t("Un geste de bienveillance", "Een vriendelijk gebaar"),
                t("Un rayon de soleil", "Een zonnestraal"),
                t("Un souvenir de voyage", "Een reisherinnering"),
                t("Une pièce d'or", "Een gouden munt")
            ],

            correct: 0,

            explanation:
                t("Le courage commence parfois par un simple geste de douceur.", "Moed begint soms met een eenvoudig gebaar van zachtheid.")

        },

        "skopje-2026": {

            description:
                t("Retrouvez la clé qui ouvre les portes du possible.", "Vind de sleutel die de deuren naar mogelijkheden opent."),

            question:
                t("Je peux ouvrir un cœur sans serrure et rapprocher deux êtres qui ne se connaissent pas. Qui suis-je ?", "Ik kan een hart openen zonder slot en twee onbekenden dichter bij elkaar brengen. Wie ben ik?"),

            answers: [
                t("La richesse", "Rijkdom"),
                t("La confiance", "Vertrouwen"),
                t("La vitesse", "Snelheid"),
                t("La chance", "Geluk")
            ],

            correct: 1,

            explanation:
                t("La confiance ouvre des portes que l'on croyait fermées.", "Vertrouwen opent deuren die gesloten leken.")

        },

        "djerba-2026": {

            description:
                t("Au bord de la mer, une dernière énigme fleurit dans le sable.", "Aan zee bloeit een laatste raadsel in het zand."),

            question:
                t("Je ne suis ni une fleur ni un parfum. Pourtant, je peux apaiser une âme blessée et rassurer un animal inquiet. Qui suis-je ?", "Ik ben geen bloem of parfum. Toch kan ik een gekwetste ziel kalmeren en een angstig dier geruststellen. Wie ben ik?"),

            answers: [
                t("Le vent", "De wind"),
                t("La lumière", "Het licht"),
                t("La douceur", "Zachtheid"),
                t("Le silence", "De stilte")
            ],

            correct: 2,

            explanation:
                t("La douceur est une force silencieuse.", "Zachtheid is een stille kracht.")

        }

    };


    /* =========================================
       CONTENU DES QUIZ
    ========================================== */

    const quizzes = {

        "tanger-2025": {

            description:
                t("Trois petites questions pour découvrir la véritable valeur de l'amour.", "Drie kleine vragen om de ware waarde van liefde te ontdekken."),

            questions: [

                {
                    question:
                        t("Un chien errant semble avoir peur de vous. Que faire ?", "Een zwerfhond lijkt bang voor je. Wat doe je?"),

                    answers: [
                        t("Courir vers lui", "Naar hem toe rennen"),
                        t("Lui laisser de l'espace", "Hem ruimte geven"),
                        t("Le prendre immédiatement dans ses bras", "Hem meteen in je armen nemen"),
                        t("Le suivre partout", "Hem overal volgen")
                    ],

                    correct: 1,

                    explanation:
                        t("Respecter sa distance lui permet de se sentir plus en sécurité.", "Door afstand te respecteren voelt hij zich veiliger.")
                },

                {
                    question:
                        t("Quelle aide est particulièrement utile pendant une journée très chaude ?", "Welke hulp is bijzonder nuttig op een erg warme dag?"),

                    answers: [
                        t("Du chocolat", "Chocolade"),
                        t("Du lait", "Melk"),
                        t("De l'eau propre et fraîche", "Schoon en vers water"),
                        t("Des aliments très salés", "Erg zout voedsel")
                    ],

                    correct: 2,

                    explanation:
                        t("Une gamelle d'eau propre peut faire une vraie différence.", "Een kommetje schoon water kan echt een verschil maken.")
                },

                {
                    question:
                        t("Aimer un animal, c'est avant tout...", "Van een dier houden betekent vooral..."),

                    answers: [
                        t("Respecter ses besoins", "Zijn behoeften respecteren"),
                        t("Le forcer à accepter nos caresses", "Hem dwingen onze aaien te aanvaarden"),
                        t("Attendre quelque chose en retour", "Iets terug verwachten"),
                        t("Le considérer comme un jouet", "Hem als speelgoed beschouwen")
                    ],

                    correct: 0,

                    explanation:
                        t("L'amour véritable commence par le respect.", "Ware liefde begint met respect.")
                }

            ]

        },

        "pristina-2026": {

            description:
                t("Faites briller une étoile en répondant à trois questions sur l'espoir et la solidarité.", "Laat een ster stralen door drie vragen over hoop en solidariteit te beantwoorden."),

            questions: [

                {
                    question:
                        t("Vous découvrez un animal blessé. Quelle est la meilleure réaction ?", "Je ontdekt een gewond dier. Wat is de beste reactie?"),

                    answers: [
                        t("Lui donner un médicament humain", "Hem medicijnen voor mensen geven"),
                        t("Le déplacer sans précaution", "Hem zonder voorzorg verplaatsen"),
                        t("Contacter un vétérinaire ou une association", "Een dierenarts of vereniging contacteren"),
                        t("Le faire courir", "Hem laten rennen")
                    ],

                    correct: 2,

                    explanation:
                        t("Une aide professionnelle permet de mieux protéger l'animal.", "Professionele hulp beschermt het dier beter.")
                },

                {
                    question:
                        t("Comment aider les animaux sans dépenser d'argent ?", "Hoe kun je dieren helpen zonder geld uit te geven?"),

                    answers: [
                        t("Partager les appels à l'adoption", "Adoptieoproepen delen"),
                        t("Ignorer les associations", "Verenigingen negeren"),
                        t("Effrayer les animaux", "Dieren bang maken"),
                        t("Publier de fausses informations", "Valse informatie publiceren")
                    ],

                    correct: 0,

                    explanation:
                        t("Partager un appel fiable peut permettre une belle rencontre.", "Een betrouwbare oproep delen kan tot een mooie ontmoeting leiden.")
                },

                {
                    question:
                        t("Faut-il pouvoir sauver tous les animaux pour faire une différence ?", "Moet je alle dieren kunnen redden om een verschil te maken?"),

                    answers: [
                        t("Oui, absolument", "Ja, absoluut"),
                        t("Non, chaque geste compte", "Nee, elk gebaar telt")
                    ],

                    correct: 1,

                    explanation:
                        t("Même une petite lumière peut éclairer une vie.", "Zelfs een klein lichtje kan een leven verlichten.")
                }

            ]

        }

    };


    /* =========================================
       MOTEUR DES ÉNIGMES
    ========================================== */

    function renderRiddle(destination) {

        const data = riddles[destination.id];

        $("fragment-game-description").textContent =
            data.description;

        const question = createElement(
            "div",
            "fragment-question",
            data.question
        );

        const answers = createElement(
            "div",
            "fragment-answer-grid"
        );

        const options = shuffle(
            data.answers.map((text, index) => ({
                text,
                index
            }))
        );

        let solved = false;

        options.forEach(option => {

            const button = createButton(
                "fragment-answer",
                option.text
            );

            button.addEventListener("click", () => {

                if (solved) return;

                if (option.index === data.correct) {

                    solved = true;

                    button.classList.add("is-correct");

                    answers.querySelectorAll("button")
                        .forEach(item => {
                            item.disabled = true;
                        });

                    setFeedback(
                        data.explanation,
                        "success"
                    );

                    gameDelay(() => {

                        completeGame();

                    }, 1100);

                } else {

                    button.classList.add("is-incorrect");

                    button.disabled = true;

                    setFeedback(
                        t("Ce n'est pas encore la bonne réponse. Prenez votre temps.", "Dat is nog niet het juiste antwoord. Neem je tijd."),
                        "error"
                    );

                }

            });

            answers.appendChild(button);

        });

        gameContent.append(question, answers);

        createHint(
            t("Il n'y a aucune limite de temps. Écoutez votre cœur.", "Er is geen tijdslimiet. Luister naar je hart.")
        );

    }


    /* =========================================
       MOTEUR DES QUIZ
    ========================================== */

    function renderQuiz(destination) {

        const data = quizzes[destination.id];

        $("fragment-game-description").textContent =
            data.description;

        let questionIndex = 0;

        function showQuestion() {

            gameContent.replaceChildren();

            setFeedback("");

            const current =
                data.questions[questionIndex];

            const counter = createCounter(
                t(`Question ${questionIndex + 1} / ${data.questions.length}`, `Vraag ${questionIndex + 1} / ${data.questions.length}`)
            );

            const question = createElement(
                "div",
                "fragment-question",
                current.question
            );

            const answers = createElement(
                "div",
                "fragment-answer-grid"
            );

            const options = shuffle(
                current.answers.map((text, index) => ({
                    text,
                    index
                }))
            );

            let answered = false;

            options.forEach(option => {

                const button = createButton(
                    "fragment-answer",
                    option.text
                );

                button.addEventListener("click", () => {

                    if (answered) return;

                    if (option.index !== current.correct) {

                        button.classList.add(
                            "is-incorrect"
                        );

                        button.disabled = true;

                        setFeedback(
                            t("Essayez encore, vous êtes sur le bon chemin.", "Probeer opnieuw, je bent op de goede weg."),
                            "error"
                        );

                        return;

                    }

                    answered = true;

                    button.classList.add("is-correct");

                    answers.querySelectorAll("button")
                        .forEach(item => {
                            item.disabled = true;
                        });

                    setFeedback(
                        current.explanation,
                        "success"
                    );

                    const isLast =
                        questionIndex ===
                        data.questions.length - 1;

                    const nextButton = createButton(
                        "kingdom-button",
                        isLast
                            ? t("Découvrir mon trésor ✧", "Ontdek mijn schat ✧")
                            : t("Question suivante →", "Volgende vraag →")
                    );

                    nextButton.style.marginTop = "20px";

                    nextButton.addEventListener(
                        "click",
                        () => {

                            if (isLast) {

                                completeGame();

                            } else {

                                questionIndex++;

                                showQuestion();

                                gameContent
                                    .querySelector("button")
                                    ?.focus();

                            }

                        }
                    );

                    gameContent.appendChild(nextButton);

                    nextButton.focus();

                });

                answers.appendChild(button);

            });

            gameContent.append(
                counter,
                question,
                answers
            );

        }

        showQuestion();

    }


    /* =========================================
       LES MEMORY ENCHANTÉS
    ========================================== */

    const memoryGames = {

        "sicile-2024": {

            description:
                t("Retrouvez les quatre paires inspirées des couleurs et de la chaleur de la Sicile.", "Vind de vier paren geïnspireerd door de kleuren en warmte van Sicilië."),

            symbols: [

                {
                    icon: "☀",
                    name: t("Soleil", "Zon")
                },

                {
                    icon: "🍋",
                    name: t("Citron", "Citroen")
                },

                {
                    icon: "🌿",
                    name: t("Feuille", "Blad")
                },

                {
                    icon: "🐚",
                    name: t("Coquillage", "Schelp")
                }

            ]

        },

        "istanbul-2025": {

            description:
                t("Derrière ces petites cartes se cachent les secrets d'Istanbul. Retrouvez les quatre paires.", "Achter deze kaartjes schuilen de geheimen van Istanbul. Vind de vier paren."),

            symbols: [

                {
                    icon: "🐈",
                    name: t("Chat", "Kat")
                },

                {
                    icon: "☾",
                    name: t("Lune", "Maan")
                },

                {
                    icon: "🌹",
                    name: "Rose"
                },

                {
                    icon: "🐾",
                    name: t("Empreinte", "Pootafdruk")
                }

            ]

        }

    };


    /* =========================================
       MOTEUR DU MEMORY
    ========================================== */

    function renderMemory(destination) {

        const data = memoryGames[destination.id];

        $("fragment-game-description").textContent =
            data.description;

        const cards = shuffle([
            ...data.symbols,
            ...data.symbols
        ]);

        const counter = createCounter(
            t(`0 / ${data.symbols.length} paires`, `0 / ${data.symbols.length} paren`)
        );

        const grid = createElement(
            "div",
            "fragment-memory-grid"
        );

        let firstCard = null;
        let secondCard = null;
        let locked = false;
        let matchedPairs = 0;

        function revealCard(card) {

            card.button.classList.add("is-flipped");

            card.button.textContent = card.symbol.icon;

            card.button.setAttribute(
                "aria-label",
                card.symbol.name
            );

            card.button.setAttribute(
                "aria-pressed",
                "true"
            );

        }

        function hideCard(card) {

            card.button.classList.remove("is-flipped");

            card.button.textContent = "✧";

            card.button.setAttribute(
                "aria-label",
                t(`Carte ${card.index + 1}, face cachée`, `Kaart ${card.index + 1}, omgekeerd`)
            );

            card.button.setAttribute(
                "aria-pressed",
                "false"
            );

        }

        cards.forEach((symbol, index) => {

            const button = createButton(
                "fragment-memory-card",
                "✧"
            );

            const card = {
                button,
                symbol,
                index,
                matched: false
            };

            button.setAttribute(
                "aria-label",
                t(`Carte ${index + 1}, face cachée`, `Kaart ${index + 1}, omgekeerd`)
            );

            button.setAttribute(
                "aria-pressed",
                "false"
            );

            button.addEventListener("click", () => {

                if (
                    locked ||
                    card.matched ||
                    card === firstCard
                ) return;

                revealCard(card);

                if (!firstCard) {

                    firstCard = card;

                    return;

                }

                secondCard = card;

                locked = true;

                if (
                    firstCard.symbol.name ===
                    secondCard.symbol.name
                ) {

                    firstCard.matched = true;
                    secondCard.matched = true;

                    firstCard.button.classList.add(
                        "is-matched"
                    );

                    secondCard.button.classList.add(
                        "is-matched"
                    );

                    firstCard.button.disabled = true;
                    secondCard.button.disabled = true;

                    matchedPairs++;

                    counter.textContent =
                        t(`${matchedPairs} / ${data.symbols.length} paires`, `${matchedPairs} / ${data.symbols.length} paren`);

                    setFeedback(
                        t("Une belle paire retrouvée !", "Een mooi paar gevonden!"),
                        "success"
                    );

                    firstCard = null;
                    secondCard = null;
                    locked = false;

                    if (
                        matchedPairs ===
                        data.symbols.length
                    ) {

                        locked = true;

                        gameDelay(() => {

                            completeGame();

                        }, 900);

                    } else {

                        grid.querySelector(
                            "button:not(:disabled)"
                        )?.focus();

                    }

                } else {

                    setFeedback(
                        t("Ces deux souvenirs sont différents. Réessayez !", "Deze herinneringen verschillen. Probeer opnieuw!")
                    );

                    gameDelay(() => {

                        hideCard(firstCard);
                        hideCard(secondCard);

                        firstCard = null;
                        secondCard = null;

                        locked = false;

                        setFeedback("");

                    }, 1000);

                }

            });

            grid.appendChild(button);

        });

        gameContent.append(counter, grid);

        createHint(
            t("Retournez deux cartes à la fois pour retrouver les symboles identiques.", "Draai telkens twee kaarten om en vind de gelijke symbolen.")
        );

    }


    /* =========================================
       PUZZLE PHOTO DE CORSE
    ========================================== */

    function renderPuzzle() {

        $("fragment-game-description").textContent =
            t("Reconstituez un véritable souvenir de voyage en Corse. Une petite âme vous attend derrière ces neuf morceaux.", "Reconstrueer een echte reisherinnering aan Corsica. Achter deze negen stukjes wacht een kleine ziel op je.");

        const imageSource = "corsee.jpeg";

        const preview = createElement(
            "img",
            "fragment-puzzle-preview"
        );

        preview.src = imageSource;

        preview.alt =
            t("Photo du chat rencontré en Corse, modèle du puzzle", "Foto van de kat ontmoet op Corsica, voorbeeld van de puzzel");

        const counter = createCounter(
            t("0 / 9 morceaux bien placés", "0 / 9 stukjes juist geplaatst")
        );

        const grid = createElement(
            "div",
            "fragment-puzzle-grid"
        );

        let pieces = shuffle(
            Array.from({ length: 9 }, (_, i) => i)
        );

        if (pieces.every((piece, index) => piece === index)) {

            [pieces[0], pieces[1]] =
                [pieces[1], pieces[0]];

        }

        let selected = null;
        let solved = false;
        let imageAvailable = true;

        function drawPuzzle() {

            grid.replaceChildren();

            let correctPieces = 0;

            pieces.forEach((piece, index) => {

                const button = createButton(
                    "fragment-puzzle-piece",
                    ""
                );

                const row = Math.floor(piece / 3);
                const column = piece % 3;

                button.style.backgroundImage =
                    imageAvailable
                        ? `url("${imageSource}")`
                        : "none";

                button.style.backgroundPosition =
                    `${column * 50}% ${row * 50}%`;

                if (!imageAvailable) {

                    button.textContent = piece + 1;

                    button.style.fontSize = "1.5rem";

                }

                button.setAttribute(
                    "aria-label",
                    t(`Case ${index + 1}, morceau ${piece + 1}`, `Vakje ${index + 1}, stukje ${piece + 1}`)
                );

                button.setAttribute(
                    "aria-pressed",
                    String(selected === index)
                );

                if (piece === index) {

                    correctPieces++;

                    button.classList.add("is-correct");

                }

                if (selected === index) {

                    button.classList.add("is-selected");

                }

                button.disabled = solved;

                button.addEventListener("click", () => {

                    if (solved) return;

                    if (selected === null) {

                        selected = index;

                        setFeedback(
                            t("Choisissez maintenant le morceau avec lequel l'échanger.", "Kies nu het stukje waarmee je wilt wisselen.")
                        );

                    } else if (selected === index) {

                        selected = null;

                        setFeedback("");

                    } else {

                        [pieces[selected], pieces[index]] =
                            [pieces[index], pieces[selected]];

                        selected = null;

                        setFeedback("");

                    }

                    drawPuzzle();

                    grid.children[index]?.focus();

                });

                grid.appendChild(button);

            });

            counter.textContent =
                t(`${correctPieces} / 9 morceaux bien placés`, `${correctPieces} / 9 stukjes juist geplaatst`);

            if (correctPieces === 9 && !solved) {

                solved = true;

                grid.querySelectorAll("button")
                    .forEach(button => {
                        button.disabled = true;
                    });

                setFeedback(
                    t("Le souvenir de Corse est reconstitué !", "De herinnering aan Corsica is hersteld!"),
                    "success"
                );

                gameDelay(() => {

                    completeGame();

                }, 1100);

            }

        }

        preview.addEventListener("error", () => {

            if (!preview.isConnected) return;

            imageAvailable = false;

            preview.hidden = true;

            setFeedback(
                t("La photo est indisponible. Vous pouvez reconstituer le puzzle avec les numéros.", "De foto is niet beschikbaar. Je kunt de puzzel met de nummers oplossen.")
            );

            drawPuzzle();

        });

        gameContent.append(
            preview,
            counter,
            grid
        );

        createHint(
            t("Sélectionnez deux morceaux pour échanger leur place. La petite photo vous sert de modèle.", "Selecteer twee stukjes om ze te verwisselen. De kleine foto dient als voorbeeld.")
        );

        drawPuzzle();

    }    /* =========================================
       LE FLOCON DISPARU — VARSOVIE
    ========================================== */

    function renderObservation() {

        $("fragment-game-description").textContent =
            t("L'hiver a recouvert Varsovie de petits cristaux. Retrouvez les trois flocons cachés parmi les symboles.", "De winter heeft Warschau bedekt met kleine kristallen. Vind de drie sneeuwvlokken tussen de symbolen.");

        const symbols = shuffle([
            "❄", "❄", "❄",
            "✧", "✧", "✧",
            "✦", "✦", "✦",
            "❀", "❀", "❀",
            "✳", "✳", "✳",
            "♡", "♡", "♡",
            "☾", "☾"
        ]);

        const names = {
            "❄": t("Flocon", "Sneeuwvlok"),
            "✧": t("Étoile creuse", "Open ster"),
            "✦": t("Étoile pleine", "Gevulde ster"),
            "❀": t("Fleur", "Bloem"),
            "✳": t("Rosace", "Rozet"),
            "♡": t("Cœur", "Hart"),
            "☾": t("Lune", "Maan")
        };

        const counter = createCounter(
            t("0 / 3 flocons retrouvés", "0 / 3 sneeuwvlokken gevonden")
        );

        const grid = createElement(
            "div",
            "fragment-observation-grid"
        );

        let found = 0;
        let solved = false;

        symbols.forEach(symbol => {

            const button = createButton(
                "fragment-observation-item",
                symbol
            );

            button.setAttribute(
                "aria-label",
                names[symbol]
            );

            button.addEventListener("click", () => {

                if (solved || button.disabled) return;

                if (symbol === "❄") {

                    found++;

                    button.classList.add("is-found");

                    button.disabled = true;

                    counter.textContent =
                        t(`${found} / 3 flocons retrouvés`, `${found} / 3 sneeuwvlokken gevonden`);

                    setFeedback(
                        t("Un petit cristal de lumière retrouvé !", "Een klein lichtkristal gevonden!"),
                        "success"
                    );

                    if (found === 3) {

                        solved = true;

                        grid.querySelectorAll("button")
                            .forEach(item => {
                                item.disabled = true;
                            });

                        gameDelay(() => {

                            completeGame();

                        }, 900);

                    }

                } else {

                    button.classList.add(
                        "is-incorrect"
                    );

                    setFeedback(
                        t("Ce n'est pas un flocon. Regardez attentivement.", "Dit is geen sneeuwvlok. Kijk goed.")
                    );

                    gameDelay(() => {

                        button.classList.remove(
                            "is-incorrect"
                        );

                    }, 600);

                }

            });

            grid.appendChild(button);

        });

        gameContent.append(counter, grid);

        createHint(
            t("Le symbole recherché est celui-ci : ❄", "Dit is het symbool dat je zoekt: ❄")
        );

    }


    /* =========================================
       LES PAPILLONS DE CHEFCHAOUEN
    ========================================== */

    function renderMatch() {

        $("fragment-game-description").textContent =
            t("Dans les ruelles bleues de Chefchaouen, quatre petits symboles cherchent leur signification. Réunissez-les.", "In de blauwe straatjes van Chefchaouen zoeken vier symbolen hun betekenis. Breng ze samen.");

        const pairs = [

            {
                id: "butterfly",
                symbol: "🦋",
                name: t("Papillon", "Vlinder"),
                meaning: t("La liberté", "Vrijheid")
            },

            {
                id: "heart",
                symbol: "♡",
                name: t("Cœur", "Hart"),
                meaning: t("L'amour", "Liefde")
            },

            {
                id: "star",
                symbol: "✦",
                name: t("Étoile", "Ster"),
                meaning: t("L'espoir", "Hoop")
            },

            {
                id: "leaf",
                symbol: "🍃",
                name: t("Feuille", "Blad"),
                meaning: t("La vie", "Het leven")
            }

        ];

        const counter = createCounter(
            t("0 / 4 associations", "0 / 4 combinaties")
        );

        const grid = createElement(
            "div",
            "fragment-match-grid"
        );

        const leftColumn = createElement(
            "div",
            "fragment-match-column"
        );

        const rightColumn = createElement(
            "div",
            "fragment-match-column"
        );

        let selected = null;
        let matched = 0;

        shuffle(pairs).forEach(pair => {

            const button = createButton(
                "fragment-match-item",
                `${pair.symbol} ${pair.name}`
            );

            button.dataset.match = pair.id;

            button.setAttribute(
                "aria-pressed",
                "false"
            );

            button.addEventListener("click", () => {

                if (button.disabled) return;

                leftColumn.querySelectorAll("button")
                    .forEach(item => {

                        item.classList.remove(
                            "is-selected"
                        );

                        item.setAttribute(
                            "aria-pressed",
                            "false"
                        );

                    });

                if (selected === button) {

                    selected = null;

                    setFeedback("");

                    return;

                }

                selected = button;

                button.classList.add("is-selected");

                button.setAttribute(
                    "aria-pressed",
                    "true"
                );

                setFeedback(
                    t("Choisissez maintenant sa signification.", "Kies nu de betekenis ervan.")
                );

            });

            leftColumn.appendChild(button);

        });

        shuffle(pairs).forEach(pair => {

            const button = createButton(
                "fragment-match-item",
                pair.meaning
            );

            button.addEventListener("click", () => {

                if (button.disabled) return;

                if (!selected) {

                    setFeedback(
                        t("Choisissez d'abord un symbole à gauche.", "Kies eerst een symbool links.")
                    );

                    return;

                }

                if (
                    selected.dataset.match === pair.id
                ) {

                    selected.classList.remove(
                        "is-selected"
                    );

                    selected.classList.add(
                        "is-matched"
                    );

                    selected.setAttribute(
                        "aria-pressed",
                        "false"
                    );

                    button.classList.add("is-matched");

                    selected.disabled = true;
                    button.disabled = true;

                    selected = null;

                    matched++;

                    counter.textContent =
                        t(`${matched} / 4 associations`, `${matched} / 4 combinaties`);

                    setFeedback(
                        t("Deux belles significations réunies.", "Twee mooie betekenissen samengebracht."),
                        "success"
                    );

                    if (matched === pairs.length) {

                        gameDelay(() => {

                            completeGame();

                        }, 900);

                    }

                } else {

                    setFeedback(
                        t("Ces deux éléments ne correspondent pas encore.", "Deze twee elementen horen niet bij elkaar."),
                        "error"
                    );

                }

            });

            rightColumn.appendChild(button);

        });

        grid.append(leftColumn, rightColumn);

        gameContent.append(counter, grid);

        createHint(
            t("Sélectionnez un symbole à gauche, puis sa signification à droite.", "Selecteer links een symbool en daarna rechts de betekenis.")
        );

    }


    /* =========================================
       LE CHEMIN DE LA VIE — AKCHOUR
    ========================================== */

    function renderPath() {

        $("fragment-game-description").textContent =
            t("Traversez les petits chemins d'Akchour pour rejoindre la feuille enchantée, sans traverser les obstacles.", "Volg de paadjes van Akchour naar het betoverde blad zonder obstakels te raken.");

        const size = 5;

        const start = 0;
        const goal = 24;

        const obstacles = new Set([
            1, 3, 8, 11,
            13, 16, 21
        ]);

        let current = start;
        let solved = false;

        const visited = new Set([start]);

        const grid = createElement(
            "div",
            "fragment-path-grid"
        );

        const counter = createCounter(
            t("Départ du sentier", "Begin van het pad")
        );

        function isAdjacent(a, b) {

            const rowA = Math.floor(a / size);
            const colA = a % size;

            const rowB = Math.floor(b / size);
            const colB = b % size;

            return (
                Math.abs(rowA - rowB) +
                Math.abs(colA - colB)
            ) === 1;

        }

        function drawPath() {

            grid.replaceChildren();

            for (let index = 0; index < 25; index++) {

                const button = createButton(
                    "fragment-path-cell",
                    ""
                );

                const row = Math.floor(index / size) + 1;
                const column = index % size + 1;

                let label =
                    t(`Ligne ${row}, colonne ${column}`, `Rij ${row}, kolom ${column}`);

                if (obstacles.has(index)) {

                    button.classList.add(
                        "is-obstacle"
                    );

                    button.textContent = "🌿";

                    button.disabled = true;

                    label += t(", obstacle", ", obstakel");

                } else if (index === current) {

                    button.classList.add(
                        "is-current"
                    );

                    button.textContent = "🐾";

                    label += t(", votre position", ", jouw positie");

                } else if (index === goal) {

                    button.classList.add("is-goal");

                    button.textContent = "🍃";

                    label += t(", destination", ", bestemming");

                } else if (visited.has(index)) {

                    button.classList.add(
                        "is-visited"
                    );

                    button.textContent = "·";

                    label += t(", chemin visité", ", bezocht pad");

                } else {

                    button.textContent = "·";

                }

                button.setAttribute(
                    "aria-label",
                    label
                );

                if (solved) {
                    button.disabled = true;
                }

                button.addEventListener("click", () => {

                    if (
                        solved ||
                        obstacles.has(index)
                    ) return;

                    if (!isAdjacent(current, index)) {

                        setFeedback(
                            t("Avancez d'une seule case, horizontalement ou verticalement.", "Verplaats je één vakje tegelijk, horizontaal of verticaal.")
                        );

                        return;

                    }

                    current = index;

                    visited.add(index);

                    counter.textContent =
                        t("Sur le chemin de la lumière", "Op weg naar het licht");

                    setFeedback("");

                    if (current === goal) {

                        solved = true;

                        counter.textContent =
                            t("Destination atteinte !", "Bestemming bereikt!");

                        setFeedback(
                            t("Vous avez retrouvé la feuille de vie.", "Je hebt het levensblad gevonden."),
                            "success"
                        );

                        gameDelay(() => {

                            completeGame();

                        }, 900);

                    }

                    drawPath();

                    if (!solved) {

                        grid.children[current]?.focus();

                    }

                });

                grid.appendChild(button);

            }

        }

        gameContent.append(counter, grid);

        createHint(
            t("🐾 Votre position — 🌿 Obstacles — 🍃 Destination. Vous pouvez revenir sur vos pas.", "🐾 Jouw positie — 🌿 Obstakels — 🍃 Bestemming. Je kunt terugkeren op je stappen.")
        );

        drawPath();

    }


    /* =========================================
       HISTOIRES À RECONSTRUIRE
    ========================================== */

    const orderGames = {

        "tirana-2026": {

            description:
                t("La confiance ne se construit pas en un instant. Remettez les étapes de cette petite rencontre dans le bon ordre.", "Vertrouwen ontstaat niet meteen. Zet de stappen van deze ontmoeting in de juiste volgorde."),

            steps: [

                t("Observer l'animal à distance.", "Observeer het dier vanop afstand."),

                t("Déposer une gamelle d'eau dans un endroit calme.", "Plaats een kommetje water op een rustige plek."),

                t("S'éloigner pour lui laisser de l'espace.", "Ga verder weg om het dier ruimte te geven."),

                t("Le laisser venir boire à son rythme.", "Laat het dier op zijn eigen tempo komen drinken.")

            ],

            success:
                t("La patience permet de respecter le rythme de chaque animal.", "Met geduld respecteer je het tempo van elk dier.")

        },

        "marrakech-2026": {

            description:
                t("Reconstituez une petite histoire de solidarité, inspirée de l'esprit de Cœur Errant.", "Reconstrueer een klein verhaal over solidariteit, geïnspireerd door Cœur Errant."),

            steps: [

                t("Remarquer un animal qui semble avoir besoin d'aide.", "Merk een dier op dat hulp nodig lijkt te hebben."),

                t("Observer son état sans l'effrayer.", "Observeer zijn toestand zonder het bang te maken."),

                t("Contacter une personne compétente pour l'aider.", "Contacteer een deskundige die het dier kan helpen."),

                t("Suivre ses conseils pour apporter une aide adaptée.", "Volg het advies om passende hulp te bieden.")

            ],

            success:
                t("Une simple attention peut devenir le début d'une belle chaîne de solidarité.", "Een klein gebaar kan het begin zijn van een mooie keten van solidariteit.")

        }

    };


    /* =========================================
       MOTEUR DES HISTOIRES
    ========================================== */

    function renderOrder(destination) {

        const data = orderGames[destination.id];

        $("fragment-game-description").textContent =
            data.description;

        const steps = shuffle(
            data.steps.map((text, index) => ({
                text,
                index
            }))
        );

        const counter = createCounter(
            t(`0 / ${data.steps.length} étapes`, `0 / ${data.steps.length} stappen`)
        );

        const list = createElement(
            "div",
            "fragment-order-list"
        );

        const result = createElement(
            "div",
            "fragment-order-result"
        );

        result.setAttribute(
            "aria-label",
            t("Votre histoire reconstituée", "Jouw gereconstrueerde verhaal")
        );

        let expected = 0;
        let solved = false;

        const resultPlaceholder = createElement(
            "p",
            "fragment-game-hint",
            t("Votre histoire apparaîtra ici.", "Jouw verhaal verschijnt hier.")
        );

        result.appendChild(resultPlaceholder);

        steps.forEach(step => {

            const button = createButton(
                "fragment-order-item",
                ""
            );

            const icon = createElement(
                "span",
                "fragment-order-number",
                "✧"
            );

            icon.setAttribute(
                "aria-hidden",
                "true"
            );

            const text = createElement(
                "span",
                "",
                step.text
            );

            button.append(icon, text);

            button.addEventListener("click", () => {

                if (solved || button.disabled) return;

                if (step.index !== expected) {

                    setFeedback(
                        t("Cette étape viendra un peu plus tard. Quelle est la prochaine ?", "Deze stap komt later. Wat is de volgende stap?"),
                        "error"
                    );

                    return;

                }

                expected++;

                resultPlaceholder.remove();

                const item = createElement(
                    "div",
                    "fragment-order-item"
                );

                const number = createElement(
                    "span",
                    "fragment-order-number",
                    expected
                );

                const sentence = createElement(
                    "span",
                    "",
                    step.text
                );

                item.append(number, sentence);

                result.appendChild(item);

                button.disabled = true;
                button.hidden = true;

                counter.textContent =
                    t(`${expected} / ${data.steps.length} étapes`, `${expected} / ${data.steps.length} stappen`);

                setFeedback(
                    t("Votre histoire prend forme.", "Jouw verhaal krijgt vorm."),
                    "success"
                );

                if (expected === data.steps.length) {

                    solved = true;

                    list.hidden = true;

                    setFeedback(
                        data.success,
                        "success"
                    );

                    gameDelay(() => {

                        completeGame();

                    }, 1100);

                } else {

                    list.querySelector(
                        "button:not(:disabled)"
                    )?.focus();

                }

            });

            list.appendChild(button);

        });

        gameContent.append(
            counter,
            list,
            result
        );

        createHint(
            t("Cliquez sur les phrases dans l'ordre où les événements devraient se dérouler.", "Klik op de zinnen in de volgorde waarin de gebeurtenissen moeten plaatsvinden.")
        );

    }


    /* =========================================
       LES DIFFÉRENCES D'AGADIR
    ========================================== */

    function renderDifference() {

        $("fragment-game-description").textContent =
            t("Deux petits tableaux inspirés de l'océan se ressemblent presque parfaitement. Retrouvez les trois différences dans le second tableau.", "Twee afbeeldingen geïnspireerd door de oceaan lijken bijna identiek. Vind de drie verschillen in de tweede afbeelding.");

        const original = [
            "☀", "☁", "🐦",
            "🌊", "🐚", "🌊",
            "⭐", "🐾", "💧"
        ];

        const replacements = {
            0: "☾",
            4: "❀",
            7: "♡"
        };

        const modified = original.map(
            (symbol, index) =>
                replacements[index] || symbol
        );

        const symbolNames = {
            "☀": t("Soleil", "Zon"),
            "☁": "Nuage",
            "🐦": "Oiseau",
            "🌊": "Vague",
            "🐚": t("Coquillage", "Schelp"),
            "⭐": t("Étoile", "Ster"),
            "🐾": t("Empreinte", "Pootafdruk"),
            "💧": "Goutte d'eau",
            "☾": t("Lune", "Maan"),
            "❀": t("Fleur", "Bloem"),
            "♡": t("Cœur", "Hart")
        };

        const differences = new Set([0, 4, 7]);

        const found = new Set();

        const counter = createCounter(
            t("0 / 3 différences", "0 / 3 verschillen")
        );

        const scenes = createElement(
            "div",
            "fragment-difference-scenes"
        );

        const firstScene = createElement(
            "div",
            "fragment-difference-scene"
        );

        const secondScene = createElement(
            "div",
            "fragment-difference-scene"
        );

        const firstTitle = createElement(
            "p",
            "fragment-game-hint",
            t("Le souvenir original", "De oorspronkelijke herinnering")
        );

        const secondTitle = createElement(
            "p",
            "fragment-game-hint",
            t("Le souvenir enchanté", "De betoverde herinnering")
        );

        const firstGrid = createElement(
            "div",
            "fragment-difference-grid"
        );

        const secondGrid = createElement(
            "div",
            "fragment-difference-grid"
        );

        let solved = false;

        original.forEach((symbol, index) => {

            const item = createElement(
                "div",
                "fragment-difference-item",
                symbol
            );

            item.setAttribute(
                "aria-label",
                t(`Case ${index + 1}, ${symbolNames[symbol]}`, `Vakje ${index + 1}, ${symbolNames[symbol]}`)
            );

            firstGrid.appendChild(item);

        });

        modified.forEach((symbol, index) => {

            const button = createButton(
                "fragment-difference-item",
                symbol
            );

            button.setAttribute(
                "aria-label",
                t(`Case ${index + 1}, ${symbolNames[symbol]}`, `Vakje ${index + 1}, ${symbolNames[symbol]}`)
            );

            button.addEventListener("click", () => {

                if (
                    solved ||
                    found.has(index)
                ) return;

                if (differences.has(index)) {

                    found.add(index);

                    button.classList.add("is-found");

                    firstGrid.children[index]
                        .classList.add("is-found");

                    button.disabled = true;

                    counter.textContent =
                        t(`${found.size} / 3 différences`, `${found.size} / 3 verschillen`);

                    setFeedback(
                        t("Une différence retrouvée !", "Een verschil gevonden!"),
                        "success"
                    );

                    if (
                        found.size === differences.size
                    ) {

                        solved = true;

                        secondGrid.querySelectorAll("button")
                            .forEach(item => {
                                item.disabled = true;
                            });

                        setFeedback(
                            t("Aucun détail ne vous échappe !", "Geen enkel detail ontsnapt aan je aandacht!"),
                            "success"
                        );

                        gameDelay(() => {

                            completeGame();

                        }, 900);

                    }

                } else {

                    setFeedback(
                        t("Ces deux symboles sont identiques. Observez encore.", "Deze symbolen zijn identiek. Kijk nog eens goed.")
                    );

                }

            });

            secondGrid.appendChild(button);

        });

        firstScene.append(firstTitle, firstGrid);

        secondScene.append(secondTitle, secondGrid);

        scenes.append(firstScene, secondScene);

        gameContent.append(counter, scenes);

        createHint(
            t("Comparez chaque case avec celle qui se trouve à la même place dans l'autre tableau.", "Vergelijk elk vakje met het vakje op dezelfde plaats in de andere afbeelding.")
        );

    }    /* =========================================
       LIAISON AVEC LE PASSEPORT
    ========================================== */

    function getPassport() {

        return window.CoeurErrantPassport || null;

    }

    function getCollectedFragments() {

        const passport = getPassport();

        if (
            !passport ||
            typeof passport.getCollectedFragments !== "function"
        ) {

            return new Set();

        }

        const collected =
            passport.getCollectedFragments();

        return new Set(
            Array.isArray(collected) ? collected : []
        );

    }


    /* =========================================
       LES RÉCOMPENSES
    ========================================== */

    const fragmentRewards = {

        "corse-2023": {

            name: t("Le coquillage des rêves", "De schelp van dromen"),

            meaning:
                t("Chaque grande aventure commence par un petit rêve.", "Elk groot avontuur begint met een kleine droom.")

        },

        "tanger-2024": {

            name: t("La plume du courage", "De veer van moed"),

            meaning:
                t("Le courage, c'est aussi choisir de ne pas détourner le regard.", "Moed betekent ook ervoor kiezen niet weg te kijken.")

        },

        "sicile-2024": {

            name: t("Le fruit du soleil", "De vrucht van de zon"),

            meaning:
                t("Même dans les journées difficiles, une petite lumière peut réchauffer un cœur.", "Zelfs op moeilijke dagen kan een klein lichtje een hart verwarmen.")

        },

        "varsovie-2025": {

            name: t("Le flocon éternel", "De eeuwige sneeuwvlok"),

            meaning:
                t("Chaque âme est unique et mérite que l'on prenne soin d'elle.", "Elke ziel is uniek en verdient zorg.")

        },

        "tanger-2025": {

            name: t("Le cristal de l'amour", "Het kristal van liefde"),

            meaning:
                t("L'amour véritable ne demande rien en retour.", "Ware liefde vraagt niets terug.")

        },

        "chefchaouen-2025": {

            name: t("Le papillon de la liberté", "De vlinder van vrijheid"),

            meaning:
                t("Chaque être vivant mérite de connaître la liberté et la sécurité.", "Elk levend wezen verdient vrijheid en veiligheid.")

        },

        "akchour-2025": {

            name: t("La feuille de vie", "Het levensblad"),

            meaning:
                t("Toute vie est précieuse, même lorsqu'elle passe inaperçue.", "Elk leven is kostbaar, ook als het onopgemerkt blijft.")

        },

        "istanbul-2025": {

            name: t("La pierre des secrets", "De steen van geheimen"),

            meaning:
                t("Derrière chaque regard se cache une histoire que nous ne connaissons pas encore.", "Achter elke blik schuilt een verhaal dat we nog niet kennen.")

        },

        "skopje-2026": {

            name: t("La clé des possibles", "De sleutel tot mogelijkheden"),

            meaning:
                t("Un petit geste peut ouvrir la porte à un avenir différent.", "Een klein gebaar kan de deur naar een andere toekomst openen.")

        },

        "pristina-2026": {

            name: t("L'étoile de l'espoir", "De ster van hoop"),

            meaning:
                t("Même dans la nuit la plus sombre, une étoile peut continuer de briller.", "Zelfs in de donkerste nacht kan een ster blijven stralen.")

        },

        "tirana-2026": {

            name: t("Le sablier de la patience", "De zandloper van geduld"),

            meaning:
                t("Les plus belles rencontres demandent parfois simplement du temps.", "De mooiste ontmoetingen vragen soms gewoon tijd.")

        },

        "marrakech-2026": {

            name: t("La lanterne de la lumière", "De lantaarn van licht"),

            meaning:
                t("Lorsque nous choisissons d'aider, nous devenons une petite lumière sur le chemin d'une autre âme.", "Wanneer we kiezen om te helpen, worden we een lichtje op het pad van een andere ziel.")

        },

        "agadir-2026": {

            name: t("La larme de l'océan", "De traan van de oceaan"),

            meaning:
                t("Une goutte de bienveillance peut rejoindre un océan de solidarité.", "Een druppel vriendelijkheid kan deel worden van een oceaan van solidariteit.")

        },

        "djerba-2026": {

            name: t("La fleur de la douceur", "De bloem van zachtheid"),

            meaning:
                t("La douceur possède une force que le monde oublie parfois.", "Zachtheid bezit een kracht die de wereld soms vergeet.")

        }

    };


    /* =========================================
       ACTUALISATION DE LA CARTE
    ========================================== */

    function updateMapProgress() {

        const collected = getCollectedFragments();

        const count = destinations.filter(
            destination => collected.has(destination.id)
        ).length;

        $("map-fragment-count").textContent = count;

        $("map-progress-fill").style.width =
            `${count / destinations.length * 100}%`;

        $("map-progress-track").setAttribute(
            "aria-valuenow",
            String(count)
        );

        $("map-progress-track").setAttribute(
            "aria-valuetext",
            t(`${count} trésors sur 14 retrouvés`, `${count} van 14 schatten gevonden`)
        );

        let message =
            t("Votre aventure ne fait que commencer.", "Jouw avontuur begint pas.");

        if (count === 1) {

            message =
                t("Votre première lumière vient de s'allumer.", "Jouw eerste lichtje is gaan stralen.");

        } else if (count >= 2 && count < 5) {

            message =
                t("Les chemins du royaume commencent à s'illuminer.", "De paden van het koninkrijk beginnen op te lichten.");

        } else if (count >= 5 && count < 8) {

            message =
                t("De nouvelles merveilles vous attendent.", "Nieuwe wonderen wachten op je.");

        } else if (count >= 8 && count < 11) {

            message =
                t("Votre médaillon devient de plus en plus lumineux.", "Jouw medaillon straalt steeds meer.");

        } else if (count >= 11 && count < 14) {

            message =
                t("Vous approchez du plus précieux des trésors.", "Je nadert de kostbaarste schat.");

        } else if (count === 14) {

            message =
                t("Les quatorze trésors sont réunis. Bienvenue parmi les Gardiens des cœurs errants.", "De veertien schatten zijn verzameld. Welkom bij de Bewakers van de zwervende harten.");

        }

        $("map-progress-message").textContent =
            message;


        /* Actualisation des marqueurs */

        markers.querySelectorAll(
            ".fragment-map-marker"
        ).forEach(button => {

            const id = button.dataset.destination;

            const discovered = collected.has(id);

            const destination = destinations.find(
                item => item.id === id
            );

            button.classList.toggle(
                "is-discovered",
                discovered
            );

            const symbol = button.querySelector(
                ".map-marker-symbol"
            );

            if (symbol) {

                symbol.textContent =
                    discovered ? "✦" : "✧";

            }

            button.setAttribute(
                "aria-label",
                `${destination.name}, ${destination.date}, ${
                    discovered
                        ? t("trésor retrouvé", "schat gevonden")
                        : t("défi à découvrir", "uitdaging te ontdekken")
                }`
            );

        });


        /* Actualisation du carnet */

        destinationGrid.querySelectorAll(
            ".fragment-destination-card"
        ).forEach(button => {

            const id = button.dataset.destination;

            const discovered = collected.has(id);

            const destination = destinations.find(
                item => item.id === id
            );

            button.classList.toggle(
                "is-discovered",
                discovered
            );

            const symbol = button.querySelector(
                ".fragment-destination-symbol"
            );

            const status = button.querySelector(
                ".fragment-destination-status"
            );

            if (symbol) {

                symbol.textContent = discovered
                    ? destination.symbol
                    : "✧";

            }

            if (status) {

                status.textContent = discovered
                    ? t("Trésor retrouvé ✓", "Schat gevonden ✓")
                    : t("Découvrir le défi", "Ontdek de uitdaging");

            }

        });


        /* Illumination des chemins */

        svg.querySelectorAll(
            ".map-route"
        ).forEach(path => {

            const from = path.dataset.routeFrom;
            const to = path.dataset.routeTo;

            path.classList.toggle(
                "is-discovered",
                collected.has(from) &&
                collected.has(to)
            );

        });

    }


    /* =========================================
       OUVERTURE DES MINI-JEUX
    ========================================== */

    function openGame(destination, trigger = null) {

        if (!destination) return;

        if (trigger) {
            lastTrigger = trigger;
        }

        activeDestination = destination;

        gameSession++;

        gameCompleted = false;

        reward.hidden = true;

        gameContent.hidden = false;

        gameContent.replaceChildren();

        setFeedback("");

        $("fragment-game-restart").hidden = false;

        $("fragment-collect-button").disabled = false;

        $("fragment-collect-button").textContent =
            t("	Ajouter ce trésor à mon médaillon", "Voeg deze schat toe aan mijn medaillon");

        $("fragment-game-destination").textContent =
            `${destination.name} · ${destination.date}`;

        $("fragment-game-title").textContent =
            destination.title;

        $("fragment-game-description").textContent =
            "";

        if (!dialog.open) {

            dialog.showModal();

        }

        dialog.scrollTop = 0;


        /* Choix du mini-jeu */

        switch (destination.game) {

            case "riddle":

                renderRiddle(destination);

                break;

            case "quiz":

                renderQuiz(destination);

                break;

            case "memory":

                renderMemory(destination);

                break;

            case "puzzle":

                renderPuzzle(destination);

                break;

            case "observation":

                renderObservation(destination);

                break;

            case "match":

                renderMatch(destination);

                break;

            case "path":

                renderPath(destination);

                break;

            case "order":

                renderOrder(destination);

                break;

            case "difference":

                renderDifference(destination);

                break;

            default:

                setFeedback(
                    t("Ce défi sera bientôt disponible.", "Deze uitdaging is binnenkort beschikbaar.")
                );

        }

        if (
            getCollectedFragments().has(destination.id)
        ) {

            createHint(
                t("Vous possédez déjà ce trésor. Vous pouvez rejouer librement pour le plaisir.", "Je bezit deze schat al. Je kunt opnieuw spelen voor je plezier.")
            );

        }

        $("fragment-game-close").focus();

    }


    /* =========================================
       MINI-JEU TERMINÉ
    ========================================== */

    function completeGame() {

        if (
            gameCompleted ||
            !activeDestination ||
            !dialog.open
        ) return;

        gameCompleted = true;

        const destination = activeDestination;

        const fragment =
            fragmentRewards[destination.id];

        const alreadyCollected =
            getCollectedFragments().has(destination.id);

        gameContent.hidden = true;

        $("fragment-game-restart").hidden = true;

        reward.hidden = false;

        setFeedback(
            t("Félicitations, votre défi est réussi !", "Gefeliciteerd, je hebt de uitdaging voltooid!"),
            "success"
        );

        $("fragment-reward-title").textContent =
            fragment.name;

        $("fragment-reward-meaning").textContent =
            fragment.meaning;


        /* Illustration du fragment */

        const visual = $("fragment-reward-visual");

        visual.replaceChildren();

        const image = document.createElement("img");

        image.src =
            `fragment-${destination.id}.webp`;

        image.alt = fragment.name;

        image.addEventListener("error", () => {

            if (image.parentElement !== visual) return;

            const fallback = createElement(
                "span",
                "",
                destination.symbol
            );

            fallback.setAttribute(
                "aria-label",
                fragment.name
            );

            visual.replaceChildren(fallback);

        });

        visual.appendChild(image);


        /* Fragment déjà possédé */

        const collectButton =
            $("fragment-collect-button");

        if (alreadyCollected) {

            collectButton.textContent =
                t("Fragment déjà retrouvé ✓", "Fragment al gevonden ✓");

            collectButton.disabled = true;

            setFeedback(
                t("Vous avez de nouveau réussi ce défi. Votre trésor brille déjà dans votre médaillon.", "Je hebt deze uitdaging opnieuw voltooid. Jouw schat straalt al in je medaillon."),
                "success"
            );

            $("fragment-game-return").focus();

        } else {

            collectButton.textContent =
                t("Ajouter à mon médaillon ✧", "Toevoegen aan mijn medaillon ✧");

            collectButton.disabled = false;

            collectButton.focus();

        }

        reward.scrollIntoView({

            behavior: reducedMotion
                ? "auto"
                : "smooth",

            block: "nearest"

        });

    }


    /* =========================================
       RÉCOLTER UN FRAGMENT
    ========================================== */

    $("fragment-collect-button").addEventListener(
        "click",
        () => {

            if (
                !gameCompleted ||
                !activeDestination
            ) return;

            const passport = getPassport();

            if (
                !passport ||
                typeof passport.completeFragment !== "function"
            ) {

                setFeedback(
                    t("La liaison avec le médaillon est momentanément indisponible.", "De verbinding met het medaillon is tijdelijk niet beschikbaar."),
                    "error"
                );

                return;

            }

            const destination = activeDestination;

            if (
                getCollectedFragments().has(destination.id)
            ) {

                $("fragment-collect-button").disabled =
                    true;

                $("fragment-collect-button").textContent =
                    t("Trésor déjà retrouvé ✓", "Schat al gevonden ✓");

                updateMapProgress();

                return;

            }

            try {

                passport.completeFragment(
                    destination.id
                );

            } catch (error) {

                console.error(
                    t("Impossible de récolter le fragment :", "Kan het fragment niet verzamelen:"),
                    error
                );

                setFeedback(
                    t("Le fragment n'a pas pu être ajouté. Veuillez réessayer.", "Het fragment kon niet worden toegevoegd. Probeer opnieuw."),
                    "error"
                );

                return;

            }

            if (
                !getCollectedFragments().has(destination.id)
            ) {

                setFeedback(
                    t("Le fragment n'a pas pu rejoindre votre médaillon. Veuillez réessayer.", "Het fragment kon je medaillon niet bereiken. Probeer opnieuw."),
                    "error"
                );

                return;

            }

            $("fragment-collect-button").disabled =
                true;

            $("fragment-collect-button").textContent =
                t("Fragment ajouté ✓", "Fragment toegevoegd ✓");

            setFeedback(
                t("Une nouvelle lumière brille dans votre médaillon.", "Een nieuw lichtje straalt in je medaillon."),
                "success"
            );

            updateMapProgress();

            $("fragment-game-return").focus();

        }
    );


    /* =========================================
       FERMETURE ET RECOMMENCER
    ========================================== */

    function closeGame() {

        gameSession++;

        if (dialog.open) {

            dialog.close();

        }

    }

    $("fragment-game-close").addEventListener(
        "click",
        closeGame
    );

    $("fragment-game-return").addEventListener(
        "click",
        closeGame
    );

    $("fragment-game-restart").addEventListener(
        "click",
        () => {

            if (!activeDestination) return;

            openGame(activeDestination);

        }
    );


    /* Fermeture avec la touche Échap */

    dialog.addEventListener("cancel", event => {

        event.preventDefault();

        closeGame();

    });


    /* Fermeture en cliquant en dehors */

    dialog.addEventListener("click", event => {

        if (event.target !== dialog) return;

        const rectangle =
            dialog.getBoundingClientRect();

        const outside =

            event.clientX < rectangle.left ||

            event.clientX > rectangle.right ||

            event.clientY < rectangle.top ||

            event.clientY > rectangle.bottom;

        if (outside) {

            closeGame();

        }

    });


    /* Restauration de l'interface */

    dialog.addEventListener("close", () => {

        gameSession++;

        gameCompleted = false;

        activeDestination = null;

        gameContent.replaceChildren();

        gameContent.hidden = false;

        reward.hidden = true;

        setFeedback("");

        updateMapProgress();

        if (
            lastTrigger &&
            lastTrigger.isConnected
        ) {

            lastTrigger.focus();

        }

        lastTrigger = null;

    });


    /* =========================================
       SYNCHRONISATION AVEC LE ROYAUME
    ========================================== */

    window.addEventListener(
        "coeur-errant-map-updated",
        updateMapProgress
    );

    window.addEventListener(
        "coeur-errant-passport-updated",
        updateMapProgress
    );

    window.addEventListener(
        "pageshow",
        updateMapProgress
    );

    window.addEventListener(
        "focus",
        updateMapProgress
    );

    window.addEventListener(
        "storage",
        updateMapProgress
    );

    document.addEventListener(
        "visibilitychange",
        () => {

            if (!document.hidden) {

                updateMapProgress();

            }

        }
    );


    /* =========================================
       INITIALISATION
    ========================================== */

    drawMap();

    createMarkers();

    createDestinationCards();

    updateMapTransform();

    updateMapProgress();

})();




