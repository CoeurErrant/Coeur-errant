




(() => {
    "use strict";

    const page = document.querySelector(".kingdom-page");

    if (!page) return;

    const $ = id => document.getElementById(id);
    const isNL = document.documentElement.lang.toLowerCase().startsWith("nl");
    const t = (fr, nl) => isNL ? nl : fr;

    const STORAGE_KEY = "coeur-errant-passport-v1";
    const CONSENT_KEY = "coeur-errant-kingdom-consent-v1";

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;


    /* =========================================
       LES 14 TRÉSORS
    ========================================== */

    const treasures = [
        {
            id: "corse-2023",
            destination: t("Corse", "Corsica"),
            name: t("Le coquillage des rêves", "De schelp der dromen"),
            meaning: t("Il représente les rêves que l'on garde précieusement au fond de soi.", "Deze schelp staat voor de dromen die we diep in ons hart koesteren."),
            color: "#e5b9bc",
            symbol: "shell"
        },
        {
            id: "tanger-2024",
            destination: "Tanger",
            name: t("La plume du courage", "De veer van moed"),
            meaning: t("Le courage commence parfois par un simple geste de douceur.", "Moed begint soms met een eenvoudig gebaar van zachtheid."),
            color: "#d8bd83",
            symbol: "feather"
        },
        {
            id: "sicile-2024",
            destination: t("Sicile", "Sicilië"),
            name: t("Le fruit du soleil", "De vrucht van de zon"),
            meaning: t("Une lumière chaleureuse, même lorsque le monde semble gris.", "Een warm licht, zelfs wanneer de wereld grijs lijkt."),
            color: "#e5ca75",
            symbol: "sun"
        },
        {
            id: "varsovie-2025",
            destination: t("Varsovie", "Warschau"),
            name: t("Le flocon éternel", "De eeuwige sneeuwvlok"),
            meaning: t("Chaque âme est unique, comme les cristaux d'un flocon.", "Elke ziel is uniek, net als de kristallen van een sneeuwvlok."),
            color: "#b6d4e5",
            symbol: "snow"
        },
        {
            id: "tanger-2025",
            destination: "Tanger",
            name: t("Le cristal de l'amour", "Het kristal van liefde"),
            meaning: t("L'amour véritable ne demande rien en retour.", "Ware liefde vraagt niets terug."),
            color: "#e8a5b9",
            symbol: "heart"
        },
        {
            id: "chefchaouen-2025",
            destination: "Chefchaouen",
            name: t("Le papillon de la liberté", "De vlinder van vrijheid"),
            meaning: t("Chaque être vivant mérite de pouvoir vivre librement et dignement.", "Elk levend wezen verdient een vrij en waardig leven."),
            color: "#94bad8",
            symbol: "butterfly"
        },
        {
            id: "akchour-2025",
            destination: "Akchour",
            name: t("La feuille de vie", "Het blad van het leven"),
            meaning: t("La nature nous rappelle la fragilité et la beauté de la vie.", "De natuur herinnert ons aan de kwetsbaarheid en schoonheid van het leven."),
            color: "#a6c5a0",
            symbol: "leaf"
        },
        {
            id: "istanbul-2025",
            destination: "Istanbul",
            name: t("La pierre des secrets", "De steen der geheimen"),
            meaning: t("Les plus beaux trésors sont parfois les plus discrets.", "De mooiste schatten zijn soms de meest onopvallende."),
            color: "#b6a6d4",
            symbol: "gem"
        },
        {
            id: "skopje-2026",
            destination: "Skopje",
            name: t("La clé des possibles", "De sleutel tot mogelijkheden"),
            meaning: t("Un petit geste peut ouvrir des portes que l'on croyait fermées.", "Een klein gebaar kan deuren openen waarvan we dachten dat ze gesloten waren."),
            color: "#d8b77b",
            symbol: "key"
        },
        {
            id: "pristina-2026",
            destination: "Pristina",
            name: t("L'étoile de l'espoir", "De ster van hoop"),
            meaning: t("Même dans l'obscurité, une petite lumière peut subsister.", "Zelfs in de duisternis kan een klein lichtje blijven schijnen."),
            color: "#e8d19a",
            symbol: "star"
        },
        {
            id: "tirana-2026",
            destination: "Tirana",
            name: t("Le sablier de la patience", "De zandloper van geduld"),
            meaning: t("Certaines rencontres demandent simplement du temps et de la patience.", "Sommige ontmoetingen vragen gewoon tijd en geduld."),
            color: "#d8ad94",
            symbol: "hourglass"
        },
        {
            id: "marrakech-2026",
            destination: "Marrakech",
            name: t("La lanterne de la lumière", "De lantaarn van het licht"),
            meaning: t("La bienveillance éclaire les chemins les plus inattendus.", "Goedhartigheid verlicht de meest onverwachte paden."),
            color: "#dfa88e",
            symbol: "lantern"
        },
        {
            id: "agadir-2026",
            destination: "Agadir",
            name: t("La larme de l'océan", "De traan van de oceaan"),
            meaning: t("Une seule goutte peut rejoindre un océan de solidarité.", "Eén druppel kan deel worden van een oceaan van solidariteit."),
            color: "#93c9cf",
            symbol: "drop"
        },
        {
            id: "djerba-2026",
            destination: "Djerba",
            name: t("La fleur de la douceur", "De bloem van zachtheid"),
            meaning: t("La douceur est une force silencieuse.", "Zachtheid is een stille kracht."),
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
        cat: t("Votre chat", "Jouw kat"),
        dog: t("Votre chien", "Jouw hond"),
        rabbit: t("Votre lapin", "Jouw konijn")
    };


    /* =========================================
       SAUVEGARDE ET CONSENTEMENT
    ========================================== */

    let storageAvailable = true;
    let deletionFailed = false;
    let consentBlocked = false;

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
        if (consentBlocked) return false;

        try {
            return localStorage.getItem(CONSENT_KEY) === "yes";
        } catch {
            storageAvailable = false;
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

    function notifyPassportUpdate() {
        window.dispatchEvent(
            new CustomEvent(
                "coeur-errant-passport-updated"
            )
        );
    }

    function removeStoredAdventure() {
        let success = true;

        consentBlocked = true;

        try {
            localStorage.removeItem(CONSENT_KEY);
        } catch {
            success = false;
        }

        try {
            localStorage.removeItem(STORAGE_KEY);
        } catch {
            success = false;
        }

        deletionFailed = !success;

        return success;
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

    /*
     * Une ancienne sauvegarde sans consentement
     * ne doit jamais être restaurée.
     */

    if (!hasConsent() && storageAvailable) {
        removeStoredAdventure();
    }

    function saveState() {
        if (!hasConsent()) {
            return false;
        }

        try {
            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify(state)
            );

            notifyPassportUpdate();

            return true;
        } catch {
            showToast(
                t("Sauvegarde indisponible", "Opslag niet beschikbaar"),
                t("Votre navigateur ne permet pas la sauvegarde.", "Je browser staat het opslaan niet toe.")
            );

            return false;
        }
    }


    /* =========================================
       ACTIVATION DE LA SAUVEGARDE
    ========================================== */

    function enableAdventureStorage() {
        if (hasConsent()) {
            updateStorageNote();
            return;
        }

        /*
         * Aucune ancienne donnée non autorisée
         * n'est lue ou fusionnée avec l'aventure.
         */

        if (!removeStoredAdventure()) {
            updateStorageNote();

            showToast(
                t("Sauvegarde impossible", "Opslaan niet mogelijk"),
                t("Vous pouvez explorer le royaume sans sauvegarde.", "Je kunt het Koninkrijk zonder opslag verkennen.")
            );

            return;
        }

        try {
            localStorage.setItem(
                CONSENT_KEY,
                "yes"
            );

            consentBlocked = false;
            storageAvailable = true;
            deletionFailed = false;

            if (!saveState()) {
                removeStoredAdventure();

                updateStorageNote();

                notifyPassportUpdate();

                return;
            }

            renderAll();
            updateStorageNote();

            showToast(
                t("Sauvegarde activée", "Opslag ingeschakeld"),
                t("Votre aventure sera conservée sur cet appareil.", "Jouw avontuur wordt op dit apparaat bewaard.")
            );
        } catch {
            removeStoredAdventure();

            updateStorageNote();

            notifyPassportUpdate();

            showToast(
                t("Sauvegarde impossible", "Opslaan niet mogelijk"),
                t("Vous pouvez explorer le royaume sans sauvegarde.", "Je kunt het Koninkrijk zonder opslag verkennen.")
            );
        }
    }


    /* =========================================
       RETRAIT DU CONSENTEMENT
    ========================================== */

    function disableAdventureStorage() {
        const removed = removeStoredAdventure();

        state = createState();

        const secretMessage = $("kingdom-secret-message");
        const nameMessage = $("kingdom-name-message");

        if (secretMessage) {
            secretMessage.hidden = true;
        }

        if (nameMessage) {
            nameMessage.textContent = "";
        }

        renderAll();
        updateStorageNote();

        notifyPassportUpdate();

        if (removed) {
            showToast(
                t("Sauvegarde désactivée", "Opslag uitgeschakeld"),
                t("Les données enregistrées ont été effacées.", "De opgeslagen gegevens zijn gewist.")
            );
        } else {
            showToast(
                t("Action impossible", "Actie niet mogelijk"),
                t("La suppression n'a pas pu être confirmée.", "Het wissen kon niet worden bevestigd.")
            );
        }
    }


    /* =========================================
       BOUTONS DE CONSENTEMENT
    ========================================== */

    function setupStorageConsent() {
        const note = $("kingdom-storage-note");

        const enableButton = $("enable-adventure-storage");

        const disableButton = $("disable-adventure-storage");

        let button = $("kingdom-consent-button");

        if (!button && !disableButton && note) {
            button = document.createElement("button");

            button.id = "kingdom-consent-button";
            button.type = "button";
            button.className = "kingdom-outline-button";
            button.style.margin = "10px 0 25px";

            note.insertAdjacentElement("afterend", button);
        }

        if (enableButton) {
            enableButton.addEventListener(
                "click",
                enableAdventureStorage
            );
        }

        if (disableButton) {
            disableButton.addEventListener(
                "click",
                disableAdventureStorage
            );
        }

        if (button) {
            button.addEventListener("click", () => {
                if (hasConsent() || deletionFailed) {
                    disableAdventureStorage();
                } else {
                    enableAdventureStorage();
                }
            });
        }

        if (note) {
            note.setAttribute("role", "status");
            note.setAttribute("aria-live", "polite");
            note.setAttribute("aria-atomic", "true");
        }

        const consentStatus = $("kingdom-consent-status");

        if (consentStatus) {
            consentStatus.setAttribute("role", "status");
            consentStatus.setAttribute("aria-live", "polite");
            consentStatus.setAttribute("aria-atomic", "true");
        }

        updateStorageNote();
    }

    function updateStorageNote() {
        const note = $("kingdom-storage-note");

        const button = $("kingdom-consent-button");

        const enableButton = $("enable-adventure-storage");

        const disableButton = $("disable-adventure-storage");

        const consentStatus = $("kingdom-consent-status");

        const active = hasConsent();

        let message;

        if (deletionFailed) {
            message =
                t("La sauvegarde est désactivée pour cette page, mais la suppression des données locales n'a pas pu être confirmée. Vous pouvez réessayer.", "De opslag is uitgeschakeld voor deze pagina, maar het wissen van lokale gegevens kon niet worden bevestigd. Je kunt het opnieuw proberen.");
        } else if (!storageAvailable) {
            message =
                t("La sauvegarde locale est indisponible. Vous pouvez continuer votre exploration sans sauvegarde.", "Lokale opslag is niet beschikbaar. Je kunt verdergaan zonder opslag.");
        } else if (active) {
            message =
                t("Vos trésors et votre progression sont conservés localement sur cet appareil. Vous pouvez retirer votre accord à tout moment.", "Jouw schatten en voortgang worden lokaal op dit apparaat bewaard. Je kunt jouw toestemming altijd intrekken.");
        } else {
            message =
                t("La sauvegarde est désactivée. Activez-la pour retrouver vos trésors et votre progression lors de vos prochaines visites.", "De opslag is uitgeschakeld. Schakel deze in om jouw schatten en voortgang bij een volgend bezoek terug te vinden.");
        }

        if (note) {
            note.textContent = message;
        }

        if (consentStatus) {
            consentStatus.textContent = message;
        }

        if (button) {
            button.textContent = deletionFailed
                ? t("Réessayer la suppression de mes données", "Opnieuw proberen mijn gegevens te wissen")
                : active
                    ? t("Désactiver la sauvegarde et effacer mes données", "Opslag uitschakelen en mijn gegevens wissen")
                    : t("Activer la sauvegarde de mon aventure", "Opslag van mijn avontuur inschakelen");

            button.setAttribute(
                "aria-pressed",
                String(active)
            );

            if (note) {
                button.setAttribute(
                    "aria-describedby",
                    note.id
                );
            }

            button.disabled = false;
        }

        if (enableButton) {
            enableButton.textContent = active
                ? t("Sauvegarde de mon aventure activée", "Opslag van mijn avontuur ingeschakeld")
                : t("Activer la sauvegarde de mon aventure", "Opslag van mijn avontuur inschakelen");

            enableButton.setAttribute(
                "aria-pressed",
                String(active)
            );

            enableButton.disabled = active || deletionFailed;

            if (consentStatus) {
                enableButton.setAttribute(
                    "aria-describedby",
                    consentStatus.id
                );
            }
        }

        if (disableButton) {
            disableButton.textContent = deletionFailed
                ? t("Réessayer la suppression de mes données", "Opnieuw proberen mijn gegevens te wissen")
                : t("Désactiver la sauvegarde et effacer mes données", "Opslag uitschakelen en mijn gegevens wissen");

            disableButton.disabled =
                !active && !deletionFailed;

            if (note) {
                disableButton.setAttribute(
                    "aria-describedby",
                    note.id
                );
            }
        }
    }


    /* =========================================
       NOTIFICATIONS
    ========================================== */

    let toastTimer;

    function showToast(title, message) {
        const toast = $("kingdom-toast");

        if (!toast) return;

        const toastTitle = $("kingdom-toast-title");
        const toastMessage = $("kingdom-toast-message");

        if (!toastTitle || !toastMessage) return;

        toast.setAttribute("role", "status");
        toast.setAttribute("aria-live", "polite");
        toast.setAttribute("aria-atomic", "true");

        toast.hidden = false;

        toastTitle.textContent = title;
        toastMessage.textContent = message;

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

        if (!container) return;

        container.setAttribute("aria-hidden", "true");

        container.replaceChildren();

        if (reducedMotion) return;

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
        const door =
            $("enchanted-door") ||
            document.querySelector(".enchanted-door");

        const button = $("enter-kingdom");

        const introduction = $("kingdom-introduction");

        if (!button || !introduction) return;

        door?.classList.add("is-open");

        button.textContent = t("Bienvenue dans le royaume", "Welkom in het Koninkrijk");
        button.disabled = true;

        setTimeout(() => {
            introduction.setAttribute("tabindex", "-1");

            introduction.focus({
                preventScroll: true
            });

            introduction.scrollIntoView({
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

            const input = $("kingdom-name");

            if (!input) return;

            const name = cleanText(
                input.value,
                30
            );

            if (!name) {
                input.focus();
                return;
            }

            state.name = name;

            const saved = saveState();

            renderIdentity();
            renderCertificate();

            const message = $("kingdom-name-message");

            if (message) {
                message.setAttribute("role", "status");
                message.setAttribute("aria-live", "polite");

                message.textContent = saved
                    ? t(`Bienvenue dans votre royaume, ${name}.`, `Welkom in jouw Koninkrijk, ${name}.`)
                    : t(`Bienvenue, ${name}. Activez la sauvegarde pour conserver votre prénom.`, `Welkom, ${name}. Schakel opslag in om jouw voornaam te bewaren.`);
            }

            showToast(
                t("Votre identité", "Jouw identiteit"),
                t(`Bienvenue, ${name}.`, `Welkom, ${name}.`)
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
        const input = $("kingdom-name");
        const owner = $("medallion-owner");
        const emblem = $("medallion-emblem");

        if (input) {
            input.value = state.name;
        }

        if (owner) {
            owner.textContent =
                state.name || t("Votre royaume", "Jouw Koninkrijk");
        }

        if (emblem) {
            emblem.textContent =
                emblemSymbols[state.emblem];
        }

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
    }    /* =========================================
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

                $("companion-name")?.focus();
            });
        });

    $("companion-name-form")?.addEventListener(
        "submit",
        event => {
            event.preventDefault();

            if (!state.companion) return;

            const input = $("companion-name");

            if (!input) return;

            state.companionName = cleanText(
                input.value,
                25
            );

            if (!state.companionName) {
                input.focus();
                return;
            }

            saveState();
            renderCompanion();

            showToast(
                t("Un nouveau compagnon", "Een nieuwe reisgenoot"),
                t(`${state.companionName} vous accompagne désormais.`, `${state.companionName} vergezelt je vanaf nu.`)
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

        const personalization = $("companion-personalization");
        const input = $("companion-name");
        const message = $("companion-message");

        if (personalization) {
            personalization.hidden = !state.companion;
        }

        if (input) {
            input.value = state.companionName;
        }

        if (message) {
            message.setAttribute("role", "status");
            message.setAttribute("aria-live", "polite");

            message.textContent =
                state.companionName
                    ? t(`${state.companionName} vous attend sur les chemins du royaume.`, `${state.companionName} wacht op je langs de paden van het Koninkrijk.`)
                    : state.companion
                        ? t("Choisissez maintenant son prénom.", "Kies nu een naam voor jouw reisgenoot.")
                        : "";
        }
    }


    /* =========================================
       MÉDAILLON
    ========================================== */

    function renderMedallion() {
        const container = $("medallion-gems");

        if (!container) return;

        container.replaceChildren();

        container.setAttribute(
            "aria-hidden",
            "true"
        );

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
                : t("Trésor encore à découvrir", "Nog te ontdekken schat");

            gem.setAttribute("aria-hidden", "true");

            container.appendChild(gem);
        });

        const count = state.stamps.length;

        const counter = $("fragment-count");
        const total = $("fragment-total");
        const medallion = $("royal-medallion");

        if (counter) {
            counter.textContent = count;
        }

        if (total) {
            total.textContent = treasures.length;
        }

        medallion?.classList.toggle(
            "is-complete",
            count === treasures.length
        );
    }


    /* =========================================
       PROGRESSION
    ========================================== */

    function getRank(count) {
        if (count >= 14) return t("Gardien des cœurs errants", "Beschermer van de zwervende harten");
        if (count >= 10) return t("Gardien des merveilles", "Beschermer der wonderen");
        if (count >= 8) return t("Explorateur des secrets", "Ontdekker der geheimen");
        if (count >= 5) return t("Collectionneur de lumière", "Verzamelaar van licht");
        if (count >= 3) return t("Chercheur de trésors", "Schatzoeker");
        if (count >= 1) return t("Cueilleur de lumière", "Lichtverzamelaar");

        return t("Âme voyageuse", "Reizende ziel");
    }

    function renderProgress() {
        const count = state.stamps.length;
        const percent = count / treasures.length * 100;

        const rank = $("kingdom-rank");
        const progressFill = $("kingdom-progress-fill");
        const progressTrack = $("kingdom-progress-track");
        const progressMessage = $("kingdom-progress-message");

        if (rank) {
            rank.textContent = getRank(count);
        }

        if (progressFill) {
            progressFill.style.width = `${percent}%`;
        }

        if (progressTrack) {
            progressTrack.setAttribute(
                "role",
                "progressbar"
            );

            progressTrack.setAttribute(
                "aria-valuemin",
                "0"
            );

            progressTrack.setAttribute(
                "aria-valuemax",
                String(treasures.length)
            );

            progressTrack.setAttribute(
                "aria-valuenow",
                String(count)
            );

            progressTrack.setAttribute(
                "aria-valuetext",
                t(`${count} trésors retrouvés sur ${treasures.length}`, `${count} van de ${treasures.length} schatten gevonden`)
            );
        }

        const remaining = treasures.length - count;

        if (progressMessage) {

            if (count === treasures.length) {

                progressMessage.textContent =
                    t("Félicitations ! Vous avez retrouvé les 14 trésors. Le château et votre passeport vous attendent.", "Gefeliciteerd! Je hebt alle 14 schatten gevonden. Het kasteel en jouw paspoort wachten op je.");

            } else if (count === 0) {

                progressMessage.textContent =
                    t("Explorez la carte aux trésors et réussissez votre premier mini-jeu pour commencer votre collection.", "Verken de schatkaart en voltooi je eerste minigame om jouw verzameling te beginnen.");

            } else {

                progressMessage.textContent =
                    t(`Vous avez retrouvé ${count} trésor${count > 1 ? "s" : ""} sur 14. Il vous en reste ${remaining} à découvrir.`, `Je hebt ${count} van de 14 schatten gevonden. Nog ${remaining} te ontdekken.`);

            }

        }

        document.querySelectorAll("[data-milestone]")
            .forEach(item => {
                const milestone = Number(
                    item.dataset.milestone
                );

                const reached = count >= milestone;

                item.classList.toggle(
                    "is-unlocked",
                    reached
                );

                item.classList.toggle(
                    "is-reached",
                    reached
                );

                item.setAttribute(
                    "aria-label",
                    `${milestone} ${t("trésors", "schatten")} — ${
                        reached
                            ? t("Palier atteint", "Mijlpaal bereikt")
                            : t("Palier à atteindre", "Nog te bereiken mijlpaal")
                    }`
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
                     aria-hidden="true"
                     focusable="false">

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
                 aria-hidden="true"
                 focusable="false">

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
        image.decoding = "async";

        image.addEventListener("error", () => {

            /*
             * Ne pas remplacer une illustration
             * si le contenu a changé entre-temps.
             */

            if (image.parentElement !== container) {
                return;
            }

            container.innerHTML =
                createTreasureSVG(treasure);

        }, { once: true });

        container.appendChild(image);
    }


    /* =========================================
       COFFRET DES TRÉSORS
    ========================================== */

    function renderTreasures() {
        const grid = $("treasure-grid");

        if (!grid) return;

        /*
         * Conserver le focus clavier si le coffret
         * est actualisé pendant son utilisation.
         */

        const focusedTreasure =
            grid.contains(document.activeElement)
                ? document.activeElement.dataset.treasureId
                : null;

        grid.replaceChildren();

        treasures.forEach(treasure => {
            const discovered = state.stamps.includes(
                treasure.id
            );

            const card = document.createElement("button");

            card.type = "button";

            card.className =
                `treasure-card treasure-item ${discovered
                    ? "is-discovered"
                    : "is-locked"}`;

            card.dataset.treasureId = treasure.id;

            card.style.setProperty(
                "--treasure-color",
                treasure.color
            );

            card.setAttribute(
                "aria-label",
                `${treasure.destination} — ${
                    discovered
                        ? treasure.name
                        : t("Trésor encore à découvrir", "Nog te ontdekken schat")
                }`
            );

            card.setAttribute(
                "aria-haspopup",
                "dialog"
            );

            card.setAttribute(
                "aria-controls",
                "treasure-dialog"
            );

            const visual = document.createElement("div");

            visual.className = "treasure-object";

            visual.setAttribute(
                "aria-hidden",
                "true"
            );

            renderTreasureVisual(
                visual,
                treasure,
                !discovered
            );

            const title = document.createElement("strong");

            title.textContent = treasure.destination;

            const status = document.createElement("small");

            status.textContent = discovered
                ? t("Trésor retrouvé", "Schat gevonden")
                : t("Trésor à découvrir", "Nog te ontdekken schat");

            card.append(visual, title, status);

            card.addEventListener("click", () => {
                openTreasure(treasure);
            });

            grid.appendChild(card);
        });

        if (focusedTreasure) {
            const restoredButton = Array.from(
                grid.querySelectorAll("[data-treasure-id]")
            ).find(button =>
                button.dataset.treasureId === focusedTreasure
            );

            restoredButton?.focus({
                preventScroll: true
            });
        }
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
                : t("Un trésor mystérieux", "Een mysterieuze schat");

        $("treasure-meaning").textContent =
            discovered
                ? treasure.meaning
                : t(`Pour retrouver ce trésor, rendez-vous sur la carte aux trésors et réussissez le mini-jeu de ${treasure.destination}.`, `Ga naar de schatkaart en voltooi de minigame van ${treasure.destination} om deze schat te vinden.`);

        $("treasure-status").textContent =
            discovered
                ? t("Ce trésor fait désormais partie de votre médaillon.", "Deze schat maakt nu deel uit van jouw medaillon.")
                : t("Trésor pas encore retrouvé", "Schat nog niet gevonden");

        openDialog("treasure-dialog");
    }    /* =========================================
       LIEUX ENCHANTÉS
    ========================================== */

    const locations = {
        library: {
            title: t("La bibliothèque des âmes", "De bibliotheek der zielen"),
            image: "royaume-bibliotheque.png",
            required: 3,
            description:
                t("Dans le silence des livres anciens, une lettre semble vous attendre.", "In de stilte tussen oude boeken lijkt een brief op je te wachten.")
        },
        greenhouse: {
            title: t("La serre des lumières", "De serre der lichtjes"),
            image: "royaume-serre.png",
            required: 5,
            description:
                t("Parmi les roses, trois petits secrets se cachent dans la lumière.", "Tussen de rozen verbergen zich drie kleine geheimen in het licht.")
        },
        lake: {
            title: t("Le lac des souhaits", "Het meer der wensen"),
            image: "royaume-lac.png",
            required: 8,
            description:
                t("Confiez un souhait à l'eau et regardez votre lanterne s'éloigner.", "Vertrouw een wens toe aan het water en kijk hoe jouw lantaarn wegdrijft.")
        },
        spring: {
            title: t("La source des merveilles", "De bron der wonderen"),
            image: "royaume-source.png",
            required: 10,
            description:
                t("Une étrange lumière scintille sous la surface de l'eau.", "Een mysterieus licht schittert onder het wateroppervlak.")
        },
        castle: {
            title: t("Le château des cœurs errants", "Het kasteel der zwervende harten"),
            image: "royaume-chateau.png",
            required: 14,
            description:
                t("Les portes du château s'ouvrent enfin. Toutes les lumières du royaume sont réunies.", "De deuren van het kasteel gaan eindelijk open. Alle lichtjes van het Koninkrijk zijn verenigd.")
        }
    };


    /* =========================================
       SECRETS DÉCOUVERTS
    ========================================== */

    function isLocationExplored(id) {

        switch (id) {

            case "library":

                return state.rewards.includes(
                    "library-letter"
                );

            case "greenhouse":

                return [0, 1, 2].every(index =>
                    state.rewards.includes(
                        `greenhouse-flower-${index}`
                    )
                );

            case "lake":

                return state.rewards.includes(
                    "lake-lantern"
                );

            case "spring":

                return state.rewards.includes(
                    "spring-crystal"
                );

            case "castle":

                return state.rewards.includes(
                    "castle-letter"
                );

            default:

                return false;

        }

    }


    /* =========================================
       PROGRESSION DES LIEUX SECRETS
    ========================================== */

    function renderLocations() {

        const count = state.stamps.length;

        document.querySelectorAll("[data-location]")
            .forEach(card => {

                const id = card.dataset.location;

                const location = locations[id];

                if (!location) return;

                const required = location.required;

                const unlocked = count >= required;

                const explored =
                    unlocked && isLocationExplored(id);

                const remaining = Math.max(
                    0,
                    required - count
                );

                const current = Math.min(
                    count,
                    required
                );

                const percent =
                    current / required * 100;


                /* État du lieu */

                card.classList.toggle(
                    "is-locked",
                    !unlocked
                );

                card.classList.toggle(
                    "is-unlocked",
                    unlocked
                );

                card.classList.toggle(
                    "is-explored",
                    explored
                );


                /* Badge du lieu */

                const requirement = card.querySelector(
                    ".location-requirement"
                );

                if (requirement) {

                    requirement.textContent = explored

                        ? t("Secret découvert ✓", "Geheim ontdekt ✓")

                        : unlocked

                            ? t("Lieu débloqué ✧", "Plek ontgrendeld ✧")

                            : t(`À débloquer avec ${required} trésors`, `Te ontgrendelen met ${required} schatten`);

                }


                /* Compteur individuel */

                const progressLabel = card.querySelector(
                    ".location-progress-label"
                );

                if (progressLabel) {

                    progressLabel.textContent =
                        t(`${current} / ${required} trésors retrouvés`, `${current} / ${required} schatten gevonden`);

                }


                /* Barre de progression */

                const progressTrack = card.querySelector(
                    ".location-progress-track"
                );

                const progressFill = card.querySelector(
                    ".location-progress-fill"
                );

                if (progressFill) {

                    progressFill.style.width =
                        `${percent}%`;

                }

                if (progressTrack) {

                    progressTrack.setAttribute(
                        "role",
                        "progressbar"
                    );

                    progressTrack.setAttribute(
                        "aria-valuemin",
                        "0"
                    );

                    progressTrack.setAttribute(
                        "aria-valuemax",
                        String(required)
                    );

                    progressTrack.setAttribute(
                        "aria-valuenow",
                        String(current)
                    );

                    progressTrack.setAttribute(
                        "aria-valuetext",
                        t(`${current} trésors retrouvés sur ${required}`, `${current} van de ${required} schatten gevonden`)
                    );

                }


                /* Bouton d'exploration */

                const button = card.querySelector(
                    "[data-open-location]"
                );

                if (!button) return;

                button.disabled = !unlocked;

                if (explored) {

                    button.textContent =
                        t("Revisiter ce lieu", "Deze plek opnieuw bezoeken");

                } else if (unlocked) {

                    button.textContent =
                        t("Explorer ce lieu", "Deze plek verkennen");

                } else {

                    button.textContent =
                        t(`Encore ${remaining} trésor${remaining > 1 ? "s" : ""} à retrouver`, `Nog ${remaining} ${remaining === 1 ? "schat" : "schatten"} te vinden`);

                }

                button.setAttribute(
                    "aria-haspopup",
                    "dialog"
                );

                button.setAttribute(
                    "aria-controls",
                    "location-dialog"
                );

            });

    }


    /* =========================================
       OUVERTURE DES LIEUX SECRETS
    ========================================== */

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

        const title = $("location-dialog-title");

        const description = $("location-dialog-description");

        const image = $("location-dialog-image");

        const interaction = $("location-interaction");

        if (
            !title ||
            !description ||
            !image ||
            !interaction
        ) return;

        title.textContent = location.title;

        description.textContent = location.description;

        image.style.backgroundImage =
            `url("${location.image}")`;

        image.setAttribute(
            "role",
            "img"
        );

        image.setAttribute(
            "aria-label",
            location.title
        );

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

        button.textContent = t("Décacheter la lettre", "De brief openen");

        button.setAttribute(
            "aria-expanded",
            "false"
        );

        button.setAttribute(
            "aria-controls",
            "library-secret-letter"
        );

        const letter = document.createElement("div");

        letter.className = "location-letter";

        letter.id = "library-secret-letter";

        letter.hidden = true;

        letter.tabIndex = -1;

        letter.textContent =
            t("Il n'est pas nécessaire de changer le monde entier pour faire une différence. Parfois, changer un seul instant dans la vie d'une petite âme suffit.", "Je hoeft niet de hele wereld te veranderen om een verschil te maken. Soms volstaat één moment in het leven van een kleine ziel.");

        button.addEventListener("click", () => {

            letter.hidden = false;

            button.setAttribute(
                "aria-expanded",
                "true"
            );

            button.hidden = true;

            letter.focus({
                preventScroll: true
            });

            unlockReward("library-letter");

        });

        container.append(button, letter);

    }


    /* =========================================
       SERRE — MESSAGES CACHÉS
    ========================================== */

    function createGreenhouseInteraction(container) {

        const messages = [

            t("La douceur n'est jamais une faiblesse.", "Zachtheid is nooit een zwakte."),

            t("Chaque vie mérite d'être regardée.", "Elk leven verdient het om gezien te worden."),

            t("La liberté est un trésor que nul ne devrait perdre.", "Vrijheid is een schat die niemand zou mogen verliezen.")

        ];

        const buttons = document.createElement("div");

        buttons.className =
            "butterfly-buttons butterfly-options";

        buttons.setAttribute(
            "role",
            "group"
        );

        buttons.setAttribute(
            "aria-label",
            t("Les trois fleurs de la serre", "De drie bloemen van de serre")
        );

        const message = document.createElement("div");

        message.className = "location-letter";

        message.id = "greenhouse-message";

        message.setAttribute(
            "role",
            "status"
        );

        message.setAttribute(
            "aria-live",
            "polite"
        );

        message.setAttribute(
            "aria-atomic",
            "true"
        );

        message.textContent =
            t("Découvrez les trois fleurs pour révéler tous les messages secrets de la serre.", "Ontdek de drie bloemen om alle geheime boodschappen van de serre te onthullen.");

        const progress = document.createElement("p");

        progress.className =
            "greenhouse-progress";

        function updateFlowerProgress() {

            const discovered = [0, 1, 2].filter(index =>
                state.rewards.includes(
                    `greenhouse-flower-${index}`
                )
            ).length;

            progress.textContent =
                t(`${discovered} / 3 messages découverts`, `${discovered} / 3 boodschappen ontdekt`);

        }

        messages.forEach((text, index) => {

            const button = document.createElement("button");

            button.type = "button";

            button.className = "butterfly-button";

            button.textContent = "❀";

            const rewardId =
                `greenhouse-flower-${index}`;

            button.classList.toggle(
                "is-discovered",
                state.rewards.includes(rewardId)
            );

            button.setAttribute(
                "aria-label",
                t(`Découvrir la fleur ${index + 1}`, `Bloem ${index + 1} ontdekken`)
            );

            button.setAttribute(
                "aria-controls",
                message.id
            );

            button.addEventListener("click", () => {

                message.textContent = text;

                unlockReward(rewardId);

                button.classList.add(
                    "is-discovered"
                );

                updateFlowerProgress();

            });

            buttons.appendChild(button);

        });

        updateFlowerProgress();

        container.append(
            buttons,
            message,
            progress
        );

    }


    /* =========================================
       LAC — LANTERNE DES SOUHAITS
    ========================================== */

    function createLakeInteraction(container) {

        const scene = document.createElement("div");

        scene.className = "lantern-scene";

        scene.setAttribute(
            "aria-hidden",
            "true"
        );

        const textarea = document.createElement("textarea");

        textarea.className = "location-wish";

        textarea.placeholder = t("Votre souhait...", "Jouw wens...");

        textarea.maxLength = 300;

        textarea.setAttribute(
            "aria-label",
            t("Votre souhait personnel", "Jouw persoonlijke wens")
        );

        textarea.setAttribute(
            "aria-describedby",
            "lake-wish-note"
        );

        textarea.setAttribute(
            "autocomplete",
            "off"
        );

        const note = document.createElement("p");

        note.id = "lake-wish-note";

        note.textContent =
            t("Votre souhait n'est ni enregistré ni envoyé.", "Jouw wens wordt niet opgeslagen of verzonden.");

        const message = document.createElement("p");

        message.setAttribute(
            "role",
            "status"
        );

        message.setAttribute(
            "aria-live",
            "polite"
        );

        message.setAttribute(
            "aria-atomic",
            "true"
        );

        message.hidden = true;

        const button = document.createElement("button");

        button.type = "button";

        button.className = "kingdom-button";

        button.textContent = t("Libérer ma lanterne", "Mijn lantaarn loslaten");

        button.addEventListener("click", () => {

            if (!textarea.value.trim()) {

                textarea.focus();

                return;

            }

            const lantern = document.createElement("span");

            lantern.className = "floating-lantern";

            scene.appendChild(lantern);

            textarea.value = "";

            message.hidden = false;

            message.textContent =
                t("Votre souhait s'éloigne doucement vers l'horizon.", "Jouw wens drijft zachtjes naar de horizon.");

            unlockReward("lake-lantern");

            setTimeout(() => {

                lantern.remove();

            }, 4200);

        });

        container.append(
            scene,
            note,
            textarea,
            button,
            message
        );

    }


    /* =========================================
       SOURCE — SECRET SOUS L'EAU
    ========================================== */

    function createSpringInteraction(container) {

        const water = document.createElement("div");

        water.className =
            "spring-water spring-pool";

        const button = document.createElement("button");

        button.type = "button";

        button.textContent = "✧";

        button.setAttribute(
            "aria-label",
            t("Toucher la surface de l'eau", "Het wateroppervlak aanraken")
        );

        button.setAttribute(
            "aria-controls",
            "spring-discovery-message"
        );

        const message = document.createElement("p");

        message.id = "spring-discovery-message";

        message.setAttribute(
            "role",
            "status"
        );

        message.setAttribute(
            "aria-live",
            "polite"
        );

        message.setAttribute(
            "aria-atomic",
            "true"
        );

        message.textContent =
            t("Touchez la lumière à la surface de l'eau.", "Raak het licht op het wateroppervlak aan.");

        let rippleTimer;

        button.addEventListener("click", () => {

            const ripple = document.createElement("span");

            ripple.className = "water-ripple";

            ripple.setAttribute(
                "aria-hidden",
                "true"
            );

            if (!reducedMotion) {

                water.appendChild(ripple);

                water.classList.remove(
                    "is-rippling"
                );

                void water.offsetWidth;

                water.classList.add(
                    "is-rippling"
                );

                clearTimeout(rippleTimer);

                rippleTimer = setTimeout(() => {

                    water.classList.remove(
                        "is-rippling"
                    );

                }, 2100);

            }

            button.textContent = "◇";

            message.textContent =
                t("Vous avez découvert la pierre de sérénité, un secret précieux du royaume.", "Je hebt de steen van sereniteit ontdekt, een kostbaar geheim van het Koninkrijk.");

            const fresh = unlockReward(
                "spring-crystal"
            );

            if (fresh) {

                if (!reducedMotion) {

                    celebrate(25);

                }

                showToast(
                    t("Secret découvert", "Geheim ontdekt"),
                    t("La pierre de sérénité vous a révélé son secret.", "De steen van sereniteit heeft zijn geheim aan je onthuld.")
                );

            }

            setTimeout(() => {

                ripple.remove();

            }, 2100);

        });

        water.appendChild(button);

        container.append(
            water,
            message
        );

    }


    /* =========================================
       CHÂTEAU — DERNIÈRE LETTRE
    ========================================== */

    function createCastleInteraction(container) {

        const letter = document.createElement("div");

        letter.className = "location-letter";

        const paragraphs = [

            t("Il était une fois un cœur qui décida de ne plus détourner le regard.", "Er was eens een hart dat besloot niet langer weg te kijken."),

            t("Ce cœur n'avait ni couronne, ni baguette magique, ni pouvoirs extraordinaires.", "Dit hart had geen kroon, geen toverstaf en geen buitengewone krachten."),

            t("Il possédait simplement quelque chose de précieux : la bienveillance.", "Het bezat gewoon iets kostbaars: goedhartigheid."),

            state.name

                ? t(`Et ce cœur, ${state.name}, c'était le vôtre.`, `En dat hart, ${state.name}, was jouw hart.`)

                : t("Et ce cœur, c'était le vôtre.", "En dat hart was jouw hart."),

            t("Vous avez parcouru des chemins, découvert des histoires et retrouvé quatorze trésors de lumière.", "Je hebt paden bewandeld, verhalen ontdekt en veertien lichtschatten gevonden."),

            t("Mais le plus précieux des trésors n'était caché dans aucun de ces lieux.", "Maar de kostbaarste schat was op geen van deze plekken verborgen."),

            t("Il était en vous depuis le début.", "Die schat zat vanaf het begin in jou."),

            t("Bienvenue parmi les Gardiens des cœurs errants.", "Welkom bij de Beschermers van de zwervende harten.")

        ];

        paragraphs.forEach(text => {

            const paragraph = document.createElement("p");

            paragraph.textContent = text;

            letter.appendChild(paragraph);

        });

        const button = document.createElement("button");

        button.type = "button";

        button.className = "kingdom-button";

        button.textContent =
            t("Découvrir mon passeport", "Mijn paspoort ontdekken");

        button.addEventListener("click", () => {

            closeDialog("location-dialog");

            const reward = $("recompense-finale");

            if (reward) {

                reward.setAttribute(
                    "tabindex",
                    "-1"
                );

                reward.focus({
                    preventScroll: true
                });

                reward.scrollIntoView({

                    behavior: reducedMotion

                        ? "auto"

                        : "smooth"

                });

            }

            if (!reducedMotion) {

                celebrate(45);

            }

        });

        container.append(
            letter,
            button
        );

        unlockReward("castle-letter");

    }


    /* =========================================
       ENREGISTREMENT DES SECRETS
    ========================================== */

    function unlockReward(id) {

        if (state.rewards.includes(id)) {

            return false;

        }

        state.rewards.push(id);

        saveState();

        renderLocations();

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

        page.classList.toggle(
            "is-night",
            night
        );

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

                const atmosphere =
                    button.dataset.atmosphere;

                if (![

                    "auto",

                    "day",

                    "night"

                ].includes(atmosphere)) {

                    return;

                }

                state.atmosphere = atmosphere;

                saveState();

                applyAtmosphere();

            });

        });

    setInterval(() => {

        if (state.atmosphere === "auto") {

            applyAtmosphere();

        }

    }, 60000);    /* =========================================
       CERTIFICAT
    ========================================== */

    function formatDate(value) {
        if (!value) return "";

        return new Intl.DateTimeFormat(t("fr-BE", "nl-BE"), {
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

        const certificate = $("kingdom-certificate");

        const lock = $("certificate-lock");

        const name = $("certificate-name");

        const date = $("certificate-date");

        const downloadButton = $("download-certificate");

        certificate?.classList.toggle(
            "is-unlocked",
            complete
        );

        if (lock) {
            lock.hidden = complete;
        }

        if (name) {
            name.textContent =
                state.name || t("Une âme bienveillante", "Een goedhartige ziel");
        }

        if (date) {
            date.textContent =
                complete
                    ? formatDate(state.completedAt)
                    : t("Votre date de découverte", "Jouw ontdekkingsdatum");
        }

        if (downloadButton) {
            downloadButton.disabled = !complete;
        }
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

        if (!ctx) {
            showToast(
                t("Téléchargement indisponible", "Download niet beschikbaar"),
                t("Votre navigateur ne permet pas de créer le passeport.", "Je browser kan het paspoort niet aanmaken.")
            );

            return;
        }

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
            t("Gardien des cœurs errants", "Beschermer van de zwervende harten"),
            800,
            440
        );

        ctx.fillStyle = "#82747b";
        ctx.font = "27px Georgia";

        ctx.fillText(
            t("Passeport symbolique décerné à", "Symbolisch paspoort uitgereikt aan"),
            800,
            510
        );

        const name = state.name || t("Une âme bienveillante", "Een goedhartige ziel");

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
            t("Pour avoir retrouvé les quatorze trésors du royaume", "Voor het vinden van de veertien schatten van het Koninkrijk"),
            t("et célébré les valeurs de bienveillance,", "en het vieren van de waarden van goedhartigheid,"),
            t("de douceur et de respect.", "zachtheid en respect.")
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

        ctx.fillText(
            t("Avec le cœur, Cœur Errant", "Met het hart, Cœur Errant"),
            800,
            970
        );

        canvas.toBlob(blob => {
            if (!blob) {
                showToast(
                    t("Téléchargement impossible", "Download niet mogelijk"),
                    t("Le passeport n'a pas pu être créé. Veuillez réessayer.", "Het paspoort kon niet worden aangemaakt. Probeer opnieuw.")
                );

                return;
            }

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

    const secretButton = $("kingdom-secret");

    const secretMessage = $("kingdom-secret-message");

    if (secretButton && secretMessage) {

        if (!secretMessage.textContent.trim()) {

            secretMessage.textContent =
                t("La plus belle magie du royaume se trouve dans les petits gestes de bienveillance que vous offrez chaque jour.", "De mooiste magie van het Koninkrijk zit in de kleine gebaren van goedhartigheid die je elke dag schenkt.");

        }

        secretMessage.hidden = true;

        secretButton.setAttribute(
            "aria-controls",
            secretMessage.id
        );

        secretButton.setAttribute(
            "aria-expanded",
            String(!secretMessage.hidden)
        );

        secretMessage.setAttribute(
            "aria-live",
            "polite"
        );

        secretButton.addEventListener("click", () => {

            secretMessage.hidden =
                !secretMessage.hidden;

            secretButton.setAttribute(
                "aria-expanded",
                String(!secretMessage.hidden)
            );

            if (!state.secretFound) {

                state.secretFound = true;

                saveState();

                showToast(
                    t("Un secret découvert", "Een geheim ontdekt"),
                    t("Les âmes curieuses trouvent parfois les plus belles surprises.", "Nieuwsgierige zielen vinden soms de mooiste verrassingen.")
                );

            }

        });

    }


    /* =========================================
       FENÊTRES
    ========================================== */

    const dialogFocus = new WeakMap();

    function openDialog(id) {

        const dialog = $(id);

        if (!dialog || dialog.open) return;

        if (typeof dialog.showModal !== "function") {

            showToast(
                t("Fenêtre indisponible", "Venster niet beschikbaar"),
                t("Votre navigateur ne permet pas d'ouvrir cette fenêtre.", "Je browser kan dit venster niet openen.")
            );

            return;

        }

        dialogFocus.set(
            dialog,
            document.activeElement
        );

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

                const id = button.dataset.closeDialog;

                if (id) {

                    closeDialog(id);

                } else {

                    button.closest("dialog")?.close();

                }

            });

        });

    document.querySelectorAll(".kingdom-dialog")
        .forEach(dialog => {

            dialog.addEventListener("close", () => {

                const previousFocus =
                    dialogFocus.get(dialog);

                dialogFocus.delete(dialog);

                /*
                 * Ne pas déplacer le focus si une autre
                 * interaction l'a déjà placé ailleurs.
                 */

                const active = document.activeElement;

                if (
                    active === document.body ||
                    active === dialog ||
                    dialog.contains(active)
                ) {

                    if (
                        previousFocus?.isConnected &&
                        !previousFocus.disabled
                    ) {

                        previousFocus.focus({
                            preventScroll: true
                        });

                    }

                }

                /*
                 * Le souhait personnel du lac
                 * ne doit pas rester dans la fenêtre.
                 */

                if (dialog.id === "location-dialog") {

                    const wish = dialog.querySelector(
                        ".location-wish"
                    );

                    if (wish) {

                        wish.value = "";

                    }

                }

            });

            dialog.addEventListener("click", event => {

                if (event.target !== dialog) return;

                const rect =
                    dialog.getBoundingClientRect();

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

        container.setAttribute(
            "aria-hidden",
            "true"
        );

        const symbols = [
            "✧",
            "❀",
            "♡",
            "◇"
        ];

        const colors = [
            "#d9a6bc",
            "#b99a65",
            "#f0d6dc",
            "#a8b29b"
        ];

        for (let i = 0; i < amount; i++) {

            const piece = document.createElement("span");

            piece.className =
                "celebration-piece celebration-particle";

            piece.textContent =
                symbols[i % symbols.length];

            piece.setAttribute(
                "aria-hidden",
                "true"
            );

            const x =
                `${Math.random() * 100}%`;

            const color =
                colors[i % colors.length];

            const size =
                `${10 + Math.random() * 16}px`;

            const duration =
                `${3 + Math.random() * 3}s`;

            const delay =
                `${Math.random() * 1.5}s`;

            piece.style.setProperty(
                "--piece-x",
                x
            );

            piece.style.setProperty(
                "--piece-color",
                color
            );

            piece.style.setProperty(
                "--piece-size",
                size
            );

            piece.style.setProperty(
                "--piece-duration",
                duration
            );

            piece.style.setProperty(
                "--piece-delay",
                delay
            );

            /*
             * Compatibilité avec les classes CSS
             * utilisées dans les parties précédentes.
             */

            piece.style.setProperty(
                "--celebration-x",
                x
            );

            piece.style.setProperty(
                "--celebration-color",
                color
            );

            piece.style.setProperty(
                "--celebration-size",
                size
            );

            piece.style.setProperty(
                "--celebration-duration",
                duration
            );

            piece.style.animationDelay = delay;

            container.appendChild(piece);

            setTimeout(() => {

                piece.remove();

            }, 8000);

        }

    }


    /* =========================================
       RÉINITIALISATION
    ========================================== */

    function clearAdventureInterface() {

        const message = $("kingdom-secret-message");

        const button = $("kingdom-secret");

        const nameMessage = $("kingdom-name-message");

        const celebration = $("kingdom-celebration");

        if (message) {

            message.hidden = true;

        }

        if (button) {

            button.setAttribute(
                "aria-expanded",
                "false"
            );

        }

        if (nameMessage) {

            nameMessage.textContent = "";

        }

        if (celebration) {

            celebration.replaceChildren();

        }

        const interaction = $("location-interaction");

        if (interaction) {

            interaction.replaceChildren();

        }

        closeDialog("treasure-dialog");
        closeDialog("location-dialog");
        closeDialog("fragment-game-dialog");

    }

    $("reset-kingdom")?.addEventListener("click", () => {

        openDialog("kingdom-reset-dialog");

    });

    $("confirm-reset-kingdom")?.addEventListener(
        "click",
        () => {

            state = createState();

            let resetSaved = true;

            if (hasConsent()) {

                /*
                 * Réinitialiser la progression sans
                 * retirer le consentement existant.
                 */

                resetSaved = saveState();

            } else if (deletionFailed) {

                resetSaved = removeStoredAdventure();

            }

            clearAdventureInterface();

            renderAll();

            updateStorageNote();

            notifyPassportUpdate();

            closeDialog("kingdom-reset-dialog");

            if (resetSaved) {

                showToast(
                    t("Une nouvelle aventure", "Een nieuw avontuur"),
                    t("Votre royaume est prêt à être redécouvert.", "Jouw Koninkrijk is klaar om opnieuw ontdekt te worden.")
                );

            } else {

                showToast(
                    t("Réinitialisation incomplète", "Onvolledige reset"),
                    t("Votre aventure actuelle a été réinitialisée, mais la suppression de l'ancienne sauvegarde n'a pas pu être confirmée.", "Jouw huidige avontuur is opnieuw ingesteld, maar het wissen van de oude opslag kon niet worden bevestigd.")
                );

            }

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

        /*
         * Rendre immédiatement visible une section
         * atteinte au clavier.
         */

        page.addEventListener("focusin", event => {

            const section = event.target.closest(
                ".kingdom-reveal"
            );

            if (!section) return;

            section.classList.add("is-visible");

            observer.unobserve(section);

        });

        function revealHashTarget() {

            if (!window.location.hash) return;

            let id;

            try {

                id = decodeURIComponent(
                    window.location.hash.slice(1)
                );

            } catch {

                return;

            }

            const target = $(id);

            const section = target?.closest(
                ".kingdom-reveal"
            );

            if (!section) return;

            section.classList.add("is-visible");

            observer.unobserve(section);

        }

        revealHashTarget();

        window.addEventListener(
            "hashchange",
            revealHashTarget
        );

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
         * Le trésor doit déjà faire partie
         * de la collection enregistrée.
         */

        if (
            treasure &&
            hasConsent() &&
            state.stamps.includes(id)
        ) {

            showToast(
                t("Un trésor retrouvé", "Een schat gevonden"),
                t(`${treasure.name} a rejoint votre médaillon.`, `${treasure.name} maakt nu deel uit van jouw medaillon.`)
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

    let previousConsent = hasConsent();

    function refreshState() {

        let active;

        try {

            active =
                localStorage.getItem(CONSENT_KEY) === "yes";

            storageAvailable = true;

        } catch {

            storageAvailable = false;

            updateStorageNote();

            return;

        }

        /*
         * Si une suppression a échoué, ne pas
         * restaurer les données potentiellement restantes.
         */

        if (deletionFailed) {

            consentBlocked = true;

            updateStorageNote();

            return;

        }

        if (active) {

            consentBlocked = false;

            const nextState = readState();

            const changed =
                JSON.stringify(nextState) !==
                JSON.stringify(state);

            if (changed) {

                const reset =
                    nextState.stamps.length <
                    state.stamps.length ||

                    (
                        state.secretFound &&
                        !nextState.secretFound
                    );

                state = nextState;

                if (reset) {

                    clearAdventureInterface();

                }

                renderAll();

            }

        } else {

            consentBlocked = true;

            /*
             * Le retrait du consentement depuis
             * un autre onglet réinitialise le royaume.
             *
             * Sans consentement préalable, conserver
             * la progression temporaire en mémoire.
             */

            if (previousConsent) {

                state = createState();

                clearAdventureInterface();

                renderAll();

            }

        }

        previousConsent = active;

        updateStorageNote();

    }

    window.addEventListener("storage", event => {

        if (
            event.key === STORAGE_KEY ||
            event.key === CONSENT_KEY ||
            event.key === null
        ) {

            refreshState();

        }

    });

    /*
     * Actualiser le statut après une modification
     * réalisée dans cette même page.
     */

    window.addEventListener(
        "coeur-errant-passport-updated",
        () => {

            previousConsent = hasConsent();

            updateStorageNote();

        }
    );

    window.addEventListener("pageshow", event => {

        if (event.persisted) {

            refreshState();

        }

    });

    window.addEventListener("focus", () => {

        refreshState();

    });

    document.addEventListener(
        "visibilitychange",
        () => {

            if (
                document.visibilityState === "visible"
            ) {

                refreshState();

            }

        }
    );


    /* =========================================
       ACTUALISATION DU ROYAUME
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

        const button = $("kingdom-secret");

        const message = $("kingdom-secret-message");

        if (button && message) {

            button.setAttribute(
                "aria-expanded",
                String(!message.hidden)
            );

        }

        window.dispatchEvent(
            new CustomEvent(
                "coeur-errant-map-updated"
            )
        );

    }


    /* =========================================
       LIAISON AVEC LA CARTE AUX TRÉSORS

       Les noms techniques restent inchangés
       pour assurer la compatibilité avec
       carte-fragments.js.
    ========================================== */

    window.CoeurErrantPassport = Object.freeze({

        getCollectedFragments() {

            return [...state.stamps];

        },

        completeFragment(id) {

            if (!validIds.has(id)) {

                return false;

            }

            if (state.stamps.includes(id)) {

                return true;

            }

            const treasure = treasures.find(
                item => item.id === id
            );

            if (!treasure) return false;

            state.stamps.push(id);

            const adventureCompleted =
                state.stamps.length === treasures.length;

            if (adventureCompleted) {

                state.completedAt =
                    new Date().toISOString();

            }

            const saved = saveState();

            renderAll();

            updateStorageNote();

            if (!saved) {

                notifyPassportUpdate();

            }

            showToast(

                adventureCompleted
                    ? t("Votre aventure est accomplie", "Jouw avontuur is voltooid")
                    : t("Un trésor retrouvé", "Een schat gevonden"),

                adventureCompleted
                    ? t("Bienvenue parmi les Gardiens des cœurs errants. Vous avez retrouvé les 14 trésors du royaume.", "Welkom bij de Beschermers van de zwervende harten. Je hebt alle 14 schatten van het Koninkrijk gevonden.")
                    : t(`${treasure.name} a rejoint votre médaillon.`, `${treasure.name} maakt nu deel uit van jouw medaillon.`)

            );

            celebrate(
                adventureCompleted ? 65 : 20
            );

            return true;

        }

    });


    /* =========================================
       DÉMARRAGE DU ROYAUME
    ========================================== */

    setupStorageConsent();

    createParticles();

    renderAll();

    setupReveal();

    handleTravelReturn();

})();




