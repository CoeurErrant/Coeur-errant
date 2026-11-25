
/* =========================================
   CŒUR ERRANT
   LE PASSEPORT DU CŒUR
   passeport.js
   ========================================= */

(() => {

    "use strict";

    const $ = id => document.getElementById(id);

    const page = document.querySelector(".passport-page");

    if (!page) return;

    const STORAGE_KEY = "coeur-errant-passport-v1";

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    /* =====================================
       LES DESTINATIONS
       ===================================== */

    const destinations = [

        {
            id: "corse-2023",
            name: "Corse",
            country: "France",
            date: "Avril 2023",
            shortDate: "AVR. 2023",
            symbol: "♡",
            color: "#a77983",
            image: "corsee.jpeg",
            imageAlt: "Un chat rencontré en Corse",

            story: [
                "Tout a commencé en Corse, en avril 2023. Près de mon camping, j'ai découvert des chats qui vivaient dehors, autour de petites cabanes et de gamelles souvent vides.",

                "Chaque matin et chaque soir, je revenais leur apporter de la nourriture. Petit à petit, certains ont commencé à me reconnaître et à me suivre.",

                "Parmi eux, Sushi a pris une place particulière dans mon cœur. Il venait même dormir dans mon bungalow. Le quitter a été particulièrement difficile.",

                "Je ne le savais pas encore, mais ce voyage allait changer ma manière de regarder le monde."
            ],

            quote: "Certaines rencontres sont le début de toute une histoire."
        },

        {
            id: "tanger-2024",
            name: "Tanger",
            country: "Maroc",
            date: "Juin 2024",
            shortDate: "JUIN 2024",
            symbol: "☀",
            color: "#ad8a58",
            image: "Tanger.jpeg",
            imageAlt: "Un chiot rencontré à Tanger",

            story: [
                "Je pensais découvrir Tanger, ses paysages, ses ruelles et ses traditions. Mais ce sont les animaux des rues qui ont profondément marqué mon voyage.",

                "J'ai rencontré des chiens et des chats qui avaient besoin de nourriture, de soins et parfois simplement d'un peu d'attention.",

                "J'ai commencé à emporter de la nourriture avec moi lors de mes promenades. Chaque rencontre devenait une raison de m'arrêter.",

                "En quittant Tanger, j'ai compris que mes prochains voyages auraient une autre signification."
            ],

            quote: "Je suis partie découvrir une ville. J'y ai découvert une mission."
        },

        {
            id: "sicile-2024",
            name: "Sicile",
            country: "Italie",
            date: "Août 2024",
            shortDate: "AOÛT 2024",
            symbol: "❀",
            color: "#899777",
            image: "sicillle.jpeg",
            imageAlt: "Un chat rencontré en Sicile",

            story: [
                "La Sicile représente une partie de mes origines et occupe une place particulière dans mon cœur.",

                "Durant ce voyage, j'ai croisé quelques animaux des rues, notamment des chiens près d'un magasin auxquels j'ai apporté de la nourriture.",

                "Je me souviens aussi d'un chat roux qui est venu se frotter contre moi avant de s'installer sur mes jambes.",

                "Un moment tout simple, mais de ceux que l'on emporte longtemps avec soi."
            ],

            quote: "Parfois, le bonheur vient simplement s'asseoir sur nos genoux."
        },

        {
            id: "varsovie-2025",
            name: "Varsovie",
            country: "Pologne",
            date: "Janvier 2025",
            shortDate: "JAN. 2025",
            symbol: "❄",
            color: "#8499a7",
            image: null,

            story: [
                "En janvier 2025, je suis partie découvrir Varsovie avec des amis.",

                "Comme lors de mes autres voyages, je gardais les yeux ouverts, attentive aux animaux que je pourrais rencontrer.",

                "Cette fois, j'ai aperçu très peu d'animaux errants. Chaque voyage est différent, et toutes les destinations ne donnent pas lieu aux mêmes rencontres.",

                "Mais apprendre à regarder autour de soi fait aussi partie du chemin."
            ],

            quote: "Même lorsqu'aucune rencontre ne nous attend, la bienveillance voyage avec nous."
        },

        {
            id: "tanger-2025",
            name: "Tanger",
            country: "Maroc",
            date: "Septembre 2025",
            shortDate: "SEPT. 2025",
            symbol: "✦",
            color: "#b27f89",
            image: "nala.jpeg",
            imageAlt: "Nala, une petite chienne rencontrée à Tanger",

            story: [
                "Lors de mon retour à Tanger, une petite chienne a bouleversé mon cœur.",

                "Je l'ai découverte près de poubelles, seule et couverte d'huile. Elle était encore toute petite. Je l'ai appelée Nala.",

                "Elle a été nettoyée, emmenée chez le vétérinaire et vaccinée à mon nom. J'espérais de tout mon cœur qu'une nouvelle vie l'attendait.",

                "Malheureusement, après mon départ, Nala a disparu. Elle a finalement été retrouvée sans vie sous un arbre.",

                "Aujourd'hui, son souvenir continue de m'accompagner. Elle fait partie des petites étoiles de Cœur Errant."
            ],

            quote: "Certaines petites âmes deviennent des étoiles que l'on porte pour toujours."
        },

        {
            id: "chefchaouen-2025",
            name: "Chefchaouen",
            country: "Maroc",
            date: "Septembre 2025",
            shortDate: "SEPT. 2025",
            symbol: "☾",
            color: "#7895ae",
            image: null,

            story: [
                "Au milieu des magnifiques ruelles bleues de Chefchaouen, j'ai rencontré un tout petit chaton.",

                "Ses yeux étaient collés et il se trouvait dans un endroit où beaucoup de personnes passaient.",

                "J'ai pris le temps de m'arrêter et de le déplacer hors du passage.",

                "Derrière la beauté d'une destination, il existe parfois des histoires fragiles que l'on ne remarque pas au premier regard."
            ],

            quote: "Les plus belles couleurs d'une ville ne doivent pas nous empêcher de voir ses petites âmes."
        },

        {
            id: "akchour-2025",
            name: "Akchour",
            country: "Maroc",
            date: "Septembre 2025",
            shortDate: "SEPT. 2025",
            symbol: "❧",
            color: "#829477",
            image: null,

            story: [
                "Akchour a fait partie de mon voyage au Maroc en septembre 2025.",

                "Cette destination représente une autre étape de mon carnet de voyage, entre nature et découverte.",

                "Toutes les étapes ne possèdent pas nécessairement une histoire animale particulière à raconter. Mais chacune fait partie du chemin de Cœur Errant."
            ],

            quote: "La nature nous rappelle que nous partageons tous le même monde."
        },

        {
            id: "istanbul-2025",
            name: "Istanbul",
            country: "Turquie",
            date: "Novembre 2025",
            shortDate: "NOV. 2025",
            symbol: "☽",
            color: "#b58e70",
            image: null,

            story: [
                "Istanbul est une ville où les chats occupent une place particulière dans le paysage quotidien.",

                "Lors de mes promenades, notamment autour de Sainte-Sophie et de la Mosquée bleue, j'en rencontrais régulièrement.",

                "J'emportais de la nourriture avec moi et je m'arrêtais pour leur en donner.",

                "Ces petites rencontres ont ajouté une douceur particulière à mes souvenirs d'Istanbul."
            ],

            quote: "Au détour d'une ruelle, une petite âme peut devenir le plus beau souvenir du voyage."
        },

        {
            id: "skopje-2026",
            name: "Skopje",
            country: "Macédoine du Nord",
            date: "Janvier 2026",
            shortDate: "JAN. 2026",
            symbol: "♡",
            color: "#8c849d",
            image: "Macedoine.jpeg",
            imageAlt: "Un chien rencontré à Skopje",

            story: [
                "En plein hiver, mon voyage m'a menée jusqu'à Skopje.",

                "Parmi les animaux rencontrés, je garde le souvenir d'un chien noir qui s'est allongé sur le dos.",

                "Ce geste de confiance m'a profondément touchée.",

                "Il existe des moments où aucun mot n'est nécessaire pour comprendre la beauté d'une rencontre."
            ],

            quote: "La confiance d'un animal est un cadeau précieux."
        },

        {
            id: "pristina-2026",
            name: "Pristina",
            country: "Kosovo",
            date: "Janvier 2026",
            shortDate: "JAN. 2026",
            symbol: "✧",
            color: "#a68d75",
            image: "kossovo.jpeg",
            imageAlt: "Des chiens rencontrés au Kosovo",

            story: [
                "Au Kosovo, j'ai rencontré des chiens qui vivaient parmi les déchets.",

                "Malgré les conditions dans lesquelles ils se trouvaient, certains remuaient la queue.",

                "Ces regards et ces petits signes de confiance m'ont rappelé combien les animaux peuvent nous toucher, même dans les situations les plus difficiles.",

                "Ils méritent, eux aussi, d'être regardés avec respect et douceur."
            ],

            quote: "La dignité d'une vie ne dépend jamais de l'endroit où elle se trouve."
        },

        {
            id: "tirana-2026",
            name: "Tirana",
            country: "Albanie",
            date: "Janvier 2026",
            shortDate: "JAN. 2026",
            symbol: "❀",
            color: "#ae8181",
            image: "albanie.jpeg",
            imageAlt: "Un chat rencontré à Tirana",

            story: [
                "À Tirana, j'ai rencontré un chat blessé et affamé près d'un supermarché.",

                "Je lui ai acheté de la nourriture et j'ai essayé de contacter des associations pour trouver une solution.",

                "Sans réponse, je suis retournée le lendemain avec l'espoir de pouvoir l'emmener chez un vétérinaire.",

                "Mais il n'était plus là. Certaines rencontres laissent des questions auxquelles on n'obtiendra peut-être jamais de réponse."
            ],

            quote: "Même lorsque l'on ne peut pas tout changer, essayer garde toute sa valeur."
        },

        {
            id: "marrakech-2026",
            name: "Marrakech",
            country: "Maroc",
            date: "Juin 2026",
            shortDate: "JUIN 2026",
            symbol: "☀",
            color: "#b88368",
            image: "djibou-avant.png",
            imageAlt: "Djibou lors de sa rencontre à Marrakech",

            story: [
                "Lors d'un voyage à Marrakech avec mon père, j'ai rencontré un minuscule chaton noir et blanc.",

                "Il était maigre, couvert de puces et souffrait de problèmes respiratoires. Je l'ai appelé Djibou.",

                "Il venait dormir contre mon cou et m'attendait près de la porte. Très rapidement, une relation particulière s'est créée entre nous.",

                "Une personne au Maroc a ensuite accepté de prendre soin de lui.",

                "Djibou représente l'espoir qu'une rencontre puisse ouvrir le chemin vers une vie meilleure."
            ],

            quote: "Les plus petites rencontres peuvent prendre les plus grandes places dans nos cœurs."
        },

        {
            id: "agadir-2026",
            name: "Agadir",
            country: "Maroc",
            date: "Juin 2026",
            shortDate: "JUIN 2026",
            symbol: "≈",
            color: "#7d9a9d",
            image: "agadir-chat.png",
            imageAlt: "Un chat roux rencontré à Agadir",

            story: [
                "À Agadir, j'ai aperçu un chat roux près d'un pot de fleurs et d'une bouteille vide.",

                "Je me suis arrêtée pour lui offrir de la nourriture et de l'eau.",

                "Je ne l'ai plus revu par la suite.",

                "Cette rencontre n'a duré qu'un instant, mais elle fait partie de ces petits gestes qui donnent du sens à mes voyages."
            ],

            quote: "Un instant de douceur peut compter, même lorsqu'il ne dure pas."
        },

        {
            id: "djerba-2026",
            name: "Djerba",
            country: "Tunisie",
            date: "Août 2026",
            shortDate: "AOÛT 2026",
            symbol: "☼",
            color: "#b19a69",
            image: "djerba.webp",
            imageAlt: "Un chien rencontré sur une plage de Djerba",

            story: [
                "Djerba fait partie de mes plus beaux voyages. La Tunisie, ses paysages, sa lumière et la chaleur de ses habitants ont pris une place particulière dans mon cœur.",

                "Sur la plage, j'ai rencontré un chien plutôt timide.",

                "Petit à petit, il s'est approché et j'ai pu lui offrir de la nourriture.",

                "Ces instants passés auprès des animaux font partie des souvenirs les plus précieux que je rapporte de mes voyages."
            ],

            quote: "Il existe des souvenirs que l'on ne rapporte pas dans une valise, mais dans son cœur."
        }

    ];

    /* =====================================
       DESTINATION MYSTÈRE
       ===================================== */

    const mystery = {

        id: "destination-mystere",
        name: "Mystère",
        country: "Quelque part dans le monde",
        date: "Décembre 2026",
        shortDate: "DÉC. 2026",
        symbol: "?",
        color: "#b69b74",
        mystery: true

    };

    const total = destinations.length;

    /* =====================================
       SAUVEGARDE LOCALE
       ===================================== */

    let storageAvailable = true;

    function loadPassport() {

        const emptyPassport = {
            name: "",
            stamps: [],
            completedAt: null
        };

        try {

            const saved = localStorage.getItem(STORAGE_KEY);

            if (!saved) return emptyPassport;

            const parsed = JSON.parse(saved);

            const validIds = destinations.map(
                destination => destination.id
            );

            return {

                name: typeof parsed.name === "string"
                    ? parsed.name.slice(0, 30)
                    : "",

                stamps: Array.isArray(parsed.stamps)
                    ? [...new Set(parsed.stamps)].filter(
                        id => validIds.includes(id)
                    )
                    : [],

                completedAt:
                    typeof parsed.completedAt === "string" &&
                    !Number.isNaN(Date.parse(parsed.completedAt))
                        ? parsed.completedAt
                        : null

            };

        } catch (error) {

            storageAvailable = false;

            return emptyPassport;

        }

    }

    let passport = loadPassport();

    let currentSpread = 0;

    let activeDestination = null;

    let toastTimeout = null;

    let lastFocusedElement = null;

    const totalSpreads = Math.ceil((total + 2) / 2);

    function savePassport() {

        try {

            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify(passport)
            );

            storageAvailable = true;

        } catch (error) {

            storageAvailable = false;

        }

        updateStorageNote();

    }

    function updateStorageNote() {

        if (!storageAvailable) {

            $("passport-storage-note").textContent =
                "Votre navigateur ne permet pas actuellement " +
                "la sauvegarde locale. Votre collection reste " +
                "accessible pendant cette visite, mais pourrait " +
                "disparaître lorsque vous quitterez cette page.";

        }

    }

    function isDiscovered(id) {

        return passport.stamps.includes(id);

    }

    function isComplete() {

        return passport.stamps.length === total;

    }

    /* =====================================
       CRÉATION DES ÉLÉMENTS
       ===================================== */

    function createElement(tag, className, content) {

        const element = document.createElement(tag);

        if (className) {

            element.className = className;

        }

        if (content !== undefined) {

            element.textContent = content;

        }

        return element;

    }

    /* =====================================
       CRÉATION D'UN TAMPON
       ===================================== */

    function createStamp(destination) {

        const stamp = createElement(
            "div",
            "passport-stamp"
        );

        stamp.style.setProperty(
            "--stamp-color",
            destination.color
        );

        stamp.append(

            createElement(
                "span",
                "passport-stamp-brand",
                "CŒUR ERRANT"
            ),

            createElement(
                "span",
                "passport-stamp-symbol",
                destination.symbol
            ),

            createElement(
                "span",
                "passport-stamp-name",
                destination.name
            ),

            createElement(
                "span",
                "passport-stamp-date",
                destination.shortDate
            )

        );

        return stamp;

    }

    /* =====================================
       COLLECTION DES TAMPONS
       ===================================== */

    function renderCollection() {

        const grid = $("passport-stamp-grid");

        grid.replaceChildren();

        [...destinations, mystery].forEach(destination => {

            const discovered = isDiscovered(destination.id);

            const card = createElement(
                "button",
                "passport-stamp-card"
            );

            card.type = "button";

            card.dataset.destination = destination.id;

            if (destination.mystery) {

                card.classList.add("is-mystery");

            } else if (discovered) {

                card.classList.add("is-discovered");

            } else {

                card.classList.add("is-locked");

            }

            card.append(

                createStamp(destination),

                createElement(
                    "h3",
                    "",
                    destination.name
                ),

                createElement(
                    "p",
                    "",
                    destination.date
                ),

                createElement(
                    "span",
                    "passport-stamp-status",
                    destination.mystery
                        ? "✧ À venir"
                        : discovered
                            ? "✓ Découvert"
                            : "♡ À découvrir"
                )

            );

            card.setAttribute(

                "aria-label",

                destination.name + ", " +
                destination.date + ", " +
                (
                    destination.mystery
                        ? "destination mystère"
                        : discovered
                            ? "tampon découvert"
                            : "tampon à découvrir"
                )

            );

            card.addEventListener("click", () => {

                if (destination.mystery) {

                    document.querySelector(
                        ".passport-mystery-section"
                    ).scrollIntoView({

                        behavior: reducedMotion
                            ? "instant"
                            : "smooth",

                        block: "center"

                    });

                } else {

                    openDestination(destination);

                }

            });

            grid.appendChild(card);

        });

    }

    /* =====================================
       IDENTITÉ DU VOYAGEUR
       ===================================== */

    $("passport-name").value = passport.name;

    $("passport-name-form").addEventListener(
        "submit",
        event => {

            event.preventDefault();

            passport.name = $("passport-name")
                .value
                .trim()
                .slice(0, 30);

            $("passport-name").value = passport.name;

            savePassport();

            $("passport-name-message").textContent =
                passport.name
                    ? (
                        storageAvailable
                            ? "Bienvenue, " + passport.name +
                              " ! Votre passeport vous appartient. ♡"
                            : "Bienvenue, " + passport.name +
                              " ! Votre prénom est utilisé pour cette visite."
                    )
                    : "Vous pouvez voyager anonymement.";

            renderBook();

            updateCertificate();

        }
    );

    /* =====================================
       OUVERTURE DU PASSEPORT
       ===================================== */

    function openPassport() {

        $("mon-passeport").scrollIntoView({

            behavior: reducedMotion
                ? "instant"
                : "smooth",

            block: "start"

        });

    }

    $("open-passport").addEventListener(
        "click",
        openPassport
    );

    $("passport-cover").addEventListener(
        "click",
        openPassport
    );

    /* =====================================
       PAGES DU LIVRET
       ===================================== */

    function renderWelcome(container) {

        container.append(

            createElement(
                "span",
                "passport-label",
                "Bienvenue"
            ),

            createElement(
                "h3",
                "",
                passport.name || "Voyageur du cœur"
            ),

            createElement(
                "p",
                "",
                "Ce passeport ne mesure pas les kilomètres parcourus."
            ),

            createElement(
                "p",
                "",
                "Il garde les traces des vies que vous avez pris le temps de découvrir."
            ),

            createElement(
                "p",
                "",
                "♡"
            )

        );

    }

    function renderInstructions(container) {

        container.append(

            createElement(
                "span",
                "passport-label",
                "Votre aventure"
            ),

            createElement(
                "h3",
                "",
                "Une histoire à la fois."
            ),

            createElement(
                "p",
                "",
                "Découvrez chaque récit et ajoutez son empreinte à votre passeport."
            ),

            createElement(
                "p",
                "",
                "Collectionnez les " + total +
                " tampons pour obtenir votre diplôme."
            )

        );

        const button = createElement(
            "button",
            "passport-text-button",
            "Commencer mon voyage →"
        );

        button.type = "button";

        button.addEventListener("click", () => {

            currentSpread = 1;

            renderBook(true);

        });

        container.appendChild(button);

    }

    function renderDestinationPage(
        container,
        destination
    ) {

        if (!destination) {

            container.append(

                createElement(
                    "span",
                    "passport-label",
                    "À suivre"
                ),

                createElement(
                    "h3",
                    "",
                    "Le voyage continue..."
                ),

                createElement(
                    "p",
                    "",
                    "De nouvelles histoires attendent encore d'être écrites."
                )

            );

            return;

        }

        const discovered = isDiscovered(destination.id);

        const stamp = createStamp(destination);

        if (!discovered) {

            stamp.style.filter = "grayscale(1)";

            stamp.style.opacity = ".42";

        }

        container.append(

            createElement(
                "span",
                "passport-label",
                destination.country
            ),

            stamp,

            createElement(
                "h3",
                "",
                destination.name
            ),

            createElement(
                "p",
                "",
                destination.date
            )

        );

        const button = createElement(

            "button",

            "passport-text-button",

            discovered
                ? "Relire cette histoire ♡"
                : "Découvrir cette histoire →"

        );

        button.type = "button";

        button.addEventListener("click", () => {

            openDestination(destination);

        });

        container.appendChild(button);

    }

    function renderBook(animate = false) {

        const left = $("passport-left-page");

        const right = $("passport-right-page");

        left.replaceChildren();

        right.replaceChildren();

        if (currentSpread === 0) {

            renderWelcome(left);

            renderInstructions(right);

        } else {

            const index = (currentSpread - 1) * 2;

            renderDestinationPage(
                left,
                destinations[index]
            );

            renderDestinationPage(
                right,
                destinations[index + 1]
            );

        }

        $("passport-left-number").textContent =
            String(currentSpread * 2 + 1).padStart(2, "0");

        $("passport-right-number").textContent =
            String(currentSpread * 2 + 2).padStart(2, "0");

        $("passport-page-current").textContent =
            currentSpread + 1;

        $("passport-page-total").textContent =
            totalSpreads;

        $("passport-prev").disabled =
            currentSpread === 0;

        $("passport-next").disabled =
            currentSpread >= totalSpreads - 1;

        if (animate && !reducedMotion) {

            const book = $("passport-book");

            book.classList.remove("passport-turning");

            void book.offsetWidth;

            book.classList.add("passport-turning");

        }

    }

    $("passport-prev").addEventListener("click", () => {

        if (currentSpread > 0) {

            currentSpread--;

            renderBook(true);

        }

    });

    $("passport-next").addEventListener("click", () => {

        if (currentSpread < totalSpreads - 1) {

            currentSpread++;

            renderBook(true);

        }

    });

    /* =====================================
       OUVERTURE DES RÉCITS
       ===================================== */

    const destinationDialog =
        $("passport-destination-dialog");

    function openDestination(destination) {

        activeDestination = destination;

        lastFocusedElement = document.activeElement;

        $("destination-title").textContent =
            destination.name;

        $("destination-date").textContent =
            destination.country + " · " + destination.date;

        $("destination-stamp").replaceChildren(
            createStamp(destination)
        );

        const story = $("destination-story");

        story.replaceChildren();

        destination.story.forEach(paragraph => {

            story.appendChild(

                createElement("p", "", paragraph)

            );

        });

        $("destination-quote").textContent =
            "« " + destination.quote + " »";

        const photo = $("destination-photo");

        const image = $("destination-image");

        photo.hidden = true;

        image.onload = null;

        image.onerror = null;

        image.removeAttribute("src");

        if (destination.image) {

            image.alt = destination.imageAlt || "";

            image.onload = () => {

                photo.hidden = false;

            };

            image.onerror = () => {

                photo.hidden = true;

            };

            image.src = destination.image;

        }

        updateDestinationButton();

        if (!destinationDialog.open) {

            destinationDialog.showModal();

        }

        destinationDialog.scrollTop = 0;

    }

    function updateDestinationButton() {

        if (!activeDestination) return;

        const button = $("collect-stamp");

        const discovered = isDiscovered(
            activeDestination.id
        );

        button.disabled = discovered;

        button.textContent = discovered

            ? "✓ Empreinte collectionnée"

            : "Ajouter cette empreinte ♡";

        $("destination-status").textContent = discovered

            ? "Cette histoire fait désormais partie de votre passeport."

            : "Après votre lecture, ajoutez ce souvenir à votre collection.";

    }

    $("close-destination").addEventListener(
        "click",
        () => destinationDialog.close()
    );

    destinationDialog.addEventListener(
        "close",
        () => {

            activeDestination = null;

            if (
                lastFocusedElement &&
                lastFocusedElement.isConnected
            ) {

                lastFocusedElement.focus({
                    preventScroll: true
                });

            }

        }
    );

    /* =====================================
       FERMETURE EN CLIQUANT À L'EXTÉRIEUR
       ===================================== */

    function enableBackdropClose(dialog) {

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

    }

    enableBackdropClose(destinationDialog);

    /* =====================================
       COLLECTIONNER UNE EMPREINTE
       ===================================== */

    $("collect-stamp").addEventListener("click", () => {

        if (!activeDestination) return;

        const destination = activeDestination;

        if (isDiscovered(destination.id)) return;

        passport.stamps.push(destination.id);

        if (isComplete() && !passport.completedAt) {

            passport.completedAt = new Date().toISOString();

        }

        savePassport();

        updateProgress();

        renderCollection();

        renderBook();

        updateCertificate();

        updateDestinationButton();

        const dialogStamp = $("destination-stamp")
            .querySelector(".passport-stamp");

        if (dialogStamp) {

            dialogStamp.classList.add("passport-stamp-new");

        }

        const card = $("passport-stamp-grid")
            .querySelector(
                '[data-destination="' + destination.id + '"]'
            );

        if (card) {

            lastFocusedElement = card;

            const stamp = card.querySelector(
                ".passport-stamp"
            );

            if (stamp) {

                stamp.classList.add("passport-stamp-new");

            }

        }

        destinationDialog.addEventListener(

            "close",

            () => {

                showToast(

                    isComplete()

                        ? "Votre diplôme de voyageur du cœur est disponible !"

                        : destination.name +
                          " rejoint votre collection. ♡"

                );

                createConfetti(isComplete() ? 60 : 18);

            },

            { once: true }

        );

    });

    /* =====================================
       PROGRESSION
       ===================================== */

    function updateProgress() {

        const count = passport.stamps.length;

        const percentage = count / total * 100;

        $("passport-count").textContent = count;

        $("passport-total").textContent = total;

        $("passport-progress-fill").style.width =
            percentage + "%";

        const track = $("passport-progress-track");

        track.setAttribute(
            "aria-valuemax",
            String(total)
        );

        track.setAttribute(
            "aria-valuenow",
            String(count)
        );

        let message;

        if (count === 0) {

            message =
                "Votre première empreinte vous attend...";

        } else if (count === 1) {

            message =
                "Une première histoire rejoint votre cœur. ♡";

        } else if (count < total / 2) {

            message =
                "Votre passeport se remplit de beaux souvenirs.";

        } else if (count < total - 1) {

            message =
                "Plus que " + (total - count) +
                " empreintes à découvrir !";

        } else if (count === total - 1) {

            message =
                "Une dernière histoire avant votre diplôme...";

        } else {

            message =
                "Félicitations ! Vous êtes un voyageur du cœur. ♡";

        }

        $("passport-progress-message").textContent =
            message;

    }

    /* =====================================
       NOTIFICATION
       ===================================== */

    function showToast(message) {

        const toast = $("passport-toast");

        clearTimeout(toastTimeout);

        $("passport-toast-message").textContent =
            message;

        toast.hidden = false;

        toastTimeout = setTimeout(() => {

            toast.hidden = true;

        }, 4500);

    }

    /* =====================================
       CONFETTIS
       ===================================== */

    function createConfetti(amount = 25) {

        if (reducedMotion) return;

        const container = $("passport-confetti");

        const colors = [

            "#b77d88",
            "#d9b4ba",
            "#c4a477",
            "#a9b99b",
            "#e5c8bc"

        ];

        const symbols = ["♡", "✧", "✦", "❀"];

        for (let i = 0; i < amount; i++) {

            const piece = createElement(

                "span",

                "passport-confetti-piece",

                symbols[
                    Math.floor(Math.random() * symbols.length)
                ]

            );

            piece.style.setProperty(
                "--confetti-x",
                Math.random() * 100 + "%"
            );

            piece.style.setProperty(
                "--confetti-color",
                colors[
                    Math.floor(Math.random() * colors.length)
                ]
            );

            piece.style.setProperty(
                "--confetti-size",
                12 + Math.random() * 20 + "px"
            );

            piece.style.setProperty(
                "--confetti-duration",
                2 + Math.random() * 2 + "s"
            );

            piece.style.setProperty(
                "--confetti-delay",
                Math.random() * .7 + "s"
            );

            container.appendChild(piece);

            setTimeout(() => {

                piece.remove();

            }, 5000);

        }

    }

    /* =====================================
       DIPLÔME
       ===================================== */

    function getCertificateDate() {

        const date = passport.completedAt

            ? new Date(passport.completedAt)

            : new Date();

        return new Intl.DateTimeFormat("fr-BE", {

            day: "numeric",
            month: "long",
            year: "numeric"

        }).format(date);

    }

    function updateCertificate() {

        const completed = isComplete();

        const certificate = $("passport-certificate");

        $("certificate-name").textContent =

            passport.name || "Voyageur du cœur";

        $("certificate-date").textContent =
            getCertificateDate();

        $("certificate-lock").hidden = completed;

        $("download-certificate").disabled = !completed;

        certificate.classList.toggle(
            "is-unlocked",
            completed
        );

        const remaining = total - passport.stamps.length;

        $("certificate-lock-message").textContent =

            remaining === 1

                ? "Il vous reste une destination à découvrir."

                : "Il vous reste " + remaining +
                  " destinations à découvrir.";

    }

    /* =====================================
       TÉLÉCHARGEMENT DU DIPLÔME EN PNG
       ===================================== */

    $("download-certificate").addEventListener(

        "click",

        async () => {

            if (!isComplete()) return;

            const button = $("download-certificate");

            button.disabled = true;

            try {

                if (document.fonts) {

                    await document.fonts.ready;

                }

                const canvas = document.createElement(
                    "canvas"
                );

                canvas.width = 1600;

                canvas.height = 1100;

                const ctx = canvas.getContext("2d");

                if (!ctx) {

                    throw new Error("Canvas indisponible");

                }

                /* FOND */

                ctx.fillStyle = "#fffdf7";

                ctx.fillRect(
                    0, 0,
                    canvas.width,
                    canvas.height
                );

                const gradient = ctx.createRadialGradient(

                    0, 0, 0,
                    0, 0, 850

                );

                gradient.addColorStop(0, "#eed9dc");

                gradient.addColorStop(
                    1,
                    "rgba(255,253,247,0)"
                );

                ctx.fillStyle = gradient;

                ctx.fillRect(0, 0, 1600, 1100);

                const secondGradient =
                    ctx.createRadialGradient(

                        1600, 1100, 0,
                        1600, 1100, 850

                    );

                secondGradient.addColorStop(
                    0,
                    "#eed9dc"
                );

                secondGradient.addColorStop(
                    1,
                    "rgba(255,253,247,0)"
                );

                ctx.fillStyle = secondGradient;

                ctx.fillRect(0, 0, 1600, 1100);

                /* BORDURES */

                ctx.strokeStyle = "#c4a477";

                ctx.lineWidth = 5;

                ctx.strokeRect(35, 35, 1530, 1030);

                ctx.lineWidth = 1.5;

                ctx.strokeRect(48, 48, 1504, 1004);

                ctx.strokeRect(63, 63, 1474, 974);

                /* DÉCORATIONS */

                ctx.textAlign = "center";

                ctx.fillStyle = "#c4a477";

                ctx.font = "42px Georgia";

                ctx.fillText("✧", 110, 130);

                ctx.fillText("✧", 1490, 130);

                ctx.fillText("✧", 110, 1000);

                ctx.fillText("✧", 1490, 1000);

                /* MARQUE */

                ctx.font = "500 25px Jost, sans-serif";

                ctx.fillText(
                    "C Œ U R   E R R A N T",
                    800,
                    145
                );

                /* CŒUR */

                ctx.fillStyle = "#a85e68";

                ctx.font = "105px Georgia";

                ctx.fillText("♡", 800, 280);

                /* TITRE */

                ctx.font =
                    "400 31px Jost, sans-serif";

                ctx.fillText(
                    "CERTIFICAT SYMBOLIQUE",
                    800,
                    340
                );

                ctx.font =
                    "400 88px 'Cormorant Garamond', Georgia";

                ctx.fillText(
                    "Voyageur du cœur",
                    800,
                    445
                );

                ctx.fillStyle = "#80736b";

                ctx.font = "28px Jost, sans-serif";

                ctx.fillText(
                    "Décerné à",
                    800,
                    520
                );

                /* PRÉNOM */

                const name =
                    passport.name || "Voyageur du cœur";

                let fontSize = 75;

                do {

                    ctx.font =
                        "italic " + fontSize +
                        "px 'Cormorant Garamond', Georgia";

                    if (
                        ctx.measureText(name).width < 1200
                    ) break;

                    fontSize -= 3;

                } while (fontSize > 25);

                ctx.fillStyle = "#493c35";

                ctx.fillText(name, 800, 620);

                ctx.strokeStyle = "#c4a477";

                ctx.lineWidth = 1;

                ctx.beginPath();

                ctx.moveTo(400, 650);

                ctx.lineTo(1200, 650);

                ctx.stroke();

                /* TEXTE */

                ctx.fillStyle = "#80736b";

                ctx.font =
                    "400 35px 'Cormorant Garamond', Georgia";

                ctx.fillText(
                    "Pour avoir pris le temps de découvrir les histoires",
                    800,
                    720
                );

                ctx.fillText(
                    "des animaux des rues et de voyager avec bienveillance.",
                    800,
                    765
                );

                ctx.fillStyle = "#a85e68";

                ctx.font = "23px Jost, sans-serif";

                ctx.fillText(
                    total + " empreintes collectionnées ♡",
                    800,
                    825
                );

                /* SIGNATURE */

                ctx.fillStyle = "#80736b";

                ctx.font = "23px Jost, sans-serif";

                ctx.fillText(
                    "Avec amour,",
                    800,
                    890
                );

                ctx.fillStyle = "#a85e68";

                ctx.font =
                    "italic 52px 'Cormorant Garamond', Georgia";

                ctx.fillText(
                    "Cœur Errant",
                    800,
                    945
                );

                ctx.fillStyle = "#80736b";

                ctx.font = "20px Jost, sans-serif";

                ctx.fillText(
                    getCertificateDate(),
                    800,
                    990
                );

                /* TÉLÉCHARGEMENT */

                const blob = await new Promise(
                    resolve => canvas.toBlob(
                        resolve,
                        "image/png"
                    )
                );

                if (!blob) {

                    throw new Error(
                        "Impossible de créer le diplôme"
                    );

                }

                const url = URL.createObjectURL(blob);

                const link = document.createElement("a");

                const safeName = name

                    .normalize("NFD")

                    .replace(/[\u0300-\u036f]/g, "")

                    .replace(/[^a-zA-Z0-9-]/g, "-");

                link.download =

                    "Diplome-Coeur-Errant-" +
                    safeName +
                    ".png";

                link.href = url;

                document.body.appendChild(link);

                link.click();

                link.remove();

                setTimeout(() => {

                    URL.revokeObjectURL(url);

                }, 3000);

                createConfetti(40);

                showToast(
                    "Votre diplôme est prêt ! ♡"
                );

            } catch (error) {

                showToast(
                    "Le téléchargement a échoué. Veuillez réessayer."
                );

            } finally {

                button.disabled = !isComplete();

            }

        }

    );

    /* =====================================
       MESSAGE SECRET
       ===================================== */

    $("passport-secret-paw").addEventListener(

        "click",

        () => {

            const paw = $("passport-secret-paw");

            const message = $("passport-secret-message");

            const opened = message.hidden;

            message.hidden = !opened;

            paw.setAttribute(
                "aria-expanded",
                String(opened)
            );

            if (opened) {

                createConfetti(12);

            }

        }

    );

    /* =====================================
       RÉINITIALISATION DU PASSEPORT
       ===================================== */

    const resetDialog = $("passport-reset-dialog");

    $("reset-passport").addEventListener("click", () => {

        resetDialog.showModal();

    });

    $("cancel-reset").addEventListener("click", () => {

        resetDialog.close();

    });

    $("confirm-reset").addEventListener("click", () => {

        passport = {

            name: "",
            stamps: [],
            completedAt: null

        };

        currentSpread = 0;

        savePassport();

        $("passport-name").value = "";

        $("passport-name-message").textContent =
            "Un petit prénom pour une grande aventure.";

        $("passport-secret-message").hidden = true;

        $("passport-secret-paw").setAttribute(
            "aria-expanded",
            "false"
        );

        renderCollection();

        renderBook();

        updateProgress();

        updateCertificate();

        resetDialog.close();

        openPassport();

    });

    enableBackdropClose(resetDialog);

    /* =====================================
       ANIMATIONS AU DÉFILEMENT
       ===================================== */

    function initRevealAnimations() {

        if (

            reducedMotion ||

            !("IntersectionObserver" in window)

        ) return;

        const elements = page.querySelectorAll(

            ".passport-heading, " +

            ".passport-identity, " +

            ".passport-progress, " +

            ".passport-book-wrapper, " +

            ".passport-mystery-inner, " +

            ".passport-certificate, " +

            ".passport-surprise-inner, " +

            ".passport-settings-inner, " +

            ".passport-ending-content"

        );

        const observer = new IntersectionObserver(

            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "passport-visible"
                        );

                        observer.unobserve(entry.target);

                    }

                });

            },

            {
                threshold: .08
            }

        );

        page.classList.add("passport-animations");

        elements.forEach(element => {

            element.classList.add("passport-reveal");

            observer.observe(element);

        });

    }

    /* =====================================
       SYNCHRONISATION ENTRE ONGLETS
       ===================================== */

    window.addEventListener("storage", event => {

        if (event.key !== STORAGE_KEY) return;

        passport = loadPassport();

        $("passport-name").value = passport.name;

        renderCollection();

        renderBook();

        updateProgress();

        updateCertificate();

        updateDestinationButton();

    });

    /* =====================================
       INITIALISATION
       ===================================== */

    renderCollection();

    renderBook();

    updateProgress();

    updateCertificate();

    updateStorageNote();

    initRevealAnimations();

})();

/* =========================================
   FIN — PASSEPORT DU CŒUR
   Sans frontières. Avec le cœur.
   ========================================= */
