(() => {
    "use strict";

    const STORAGE_KEY = "coeur-errant-passport-v1";
    const CONSENT_KEY = "coeur-errant-kingdom-consent-v1";

    const fragments = {
        "corse-2023": "Le coquillage des rêves",
        "tanger-2024": "La plume du courage",
        "sicile-2024": "Le fruit du soleil",
        "varsovie-2025": "Le flocon éternel",
        "tanger-2025": "Le cristal de l'amour",
        "chefchaouen-2025": "Le papillon de la liberté",
        "akchour-2025": "La feuille de vie",
        "istanbul-2025": "La pierre des secrets",
        "skopje-2026": "La clé des possibles",
        "pristina-2026": "L'étoile de l'espoir",
        "tirana-2026": "Le sablier de la patience",
        "marrakech-2026": "La lanterne de la lumière",
        "agadir-2026": "La larme de l'océan",
        "djerba-2026": "La fleur de la douceur"
    };

    const buttons = document.querySelectorAll(
        "[data-kingdom-fragment]"
    );

    if (!buttons.length) return;

    function hasConsent() {
        try {
            return localStorage.getItem(CONSENT_KEY) === "yes";
        } catch {
            return false;
        }
    }

    function readState() {
        try {
            const raw = JSON.parse(
                localStorage.getItem(STORAGE_KEY) || "{}"
            );

            const state =
                raw && typeof raw === "object"
                    ? raw
                    : {};

            state.stamps = Array.isArray(state.stamps)
                ? [...new Set(
                    state.stamps.filter(id =>
                        Object.hasOwn(fragments, id)
                    )
                )]
                : [];

            return state;
        } catch {
            return { stamps: [] };
        }
    }

    /* Fenêtre de découverte */

    const dialog = document.createElement("dialog");

    dialog.className = "fragment-discovery-dialog";

    dialog.setAttribute(
        "aria-labelledby",
        "fragment-discovery-title"
    );

    dialog.innerHTML = `
        <div class="fragment-discovery-inner">

            <button type="button"
                    class="fragment-discovery-close"
                    aria-label="Fermer">
                ×
            </button>

            <span class="fragment-discovery-eyebrow">
                Le Royaume des cœurs errants
            </span>

            <div class="fragment-discovery-art">
                <span>◇</span>
            </div>

            <h2 id="fragment-discovery-title"></h2>

            <p class="fragment-discovery-message"></p>

            <button type="button"
                    class="fragment-discovery-save"
                    hidden>
                Activer la sauvegarde et collecter
            </button>

            <a class="fragment-discovery-link"
               href="passeport.html#mon-passeport">
                Voir mon médaillon
            </a>

            <button type="button"
                    class="fragment-discovery-continue">
                Continuer mon voyage
            </button>

        </div>
    `;

    document.body.appendChild(dialog);

    const title = dialog.querySelector(
        "#fragment-discovery-title"
    );

    const message = dialog.querySelector(
        ".fragment-discovery-message"
    );

    const visual = dialog.querySelector(
        ".fragment-discovery-art"
    );

    const saveButton = dialog.querySelector(
        ".fragment-discovery-save"
    );

    const link = dialog.querySelector(
        ".fragment-discovery-link"
    );

    let selectedId = null;
    let previousFocus = null;

    function renderButtons() {
        const state = hasConsent()
            ? readState()
            : { stamps: [] };

        buttons.forEach(button => {
            const id = button.dataset.kingdomFragment;

            const collected = state.stamps.includes(id);

            button.classList.toggle(
                "is-collected",
                collected
            );

            button.setAttribute(
                "aria-label",
                collected
                    ? `${fragments[id]} déjà retrouvé`
                    : "Découvrir un fragment mystérieux"
            );
        });
    }

    function collect(id) {
        if (
            !hasConsent() ||
            !Object.hasOwn(fragments, id)
        ) return;

        const state = readState();

        const alreadyCollected =
            state.stamps.includes(id);

        if (!alreadyCollected) {
            state.stamps.push(id);
        }

        if (state.stamps.length === 14) {
            state.completedAt =
                state.completedAt ||
                new Date().toISOString();
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

            title.textContent = alreadyCollected
                ? "Un trésor déjà retrouvé"
                : fragments[id];

            message.textContent = alreadyCollected
                ? "Ce fragment fait déjà partie de votre collection."
                : `Votre médaillon contient maintenant ${state.stamps.length} fragment${state.stamps.length > 1 ? "s" : ""} sur 14.`;

            if (state.stamps.length === 14) {
                message.textContent =
                    "Votre médaillon est complet. Les portes du château vous attendent !";
            }

            saveButton.hidden = true;

            link.href =
                `passeport.html?fragment=${encodeURIComponent(id)}#mon-passeport`;

            renderButtons();

        } catch {
            title.textContent =
                "Sauvegarde indisponible";

            message.textContent =
                "Votre fragment n'a pas pu être enregistré.";
        }
    }

    function openFragment(id, button) {
        if (!Object.hasOwn(fragments, id)) return;

        selectedId = id;
        previousFocus = button;

        visual.replaceChildren();

        const image = document.createElement("img");

        image.src = `fragment-${id}.webp`;
        image.alt = fragments[id];

        image.addEventListener("error", () => {
            visual.textContent = "◇";
        }, { once: true });

        visual.appendChild(image);

        title.textContent = fragments[id];

        link.href = "passeport.html#mon-passeport";

        if (hasConsent()) {
            collect(id);
        } else {
            message.textContent =
                "Vous avez trouvé un fragment. Pour l'emporter dans votre royaume, autorisez la sauvegarde locale de votre collection.";

            saveButton.hidden = false;
        }

        if (!dialog.open) {
            dialog.showModal();
        }
    }

    saveButton.addEventListener("click", () => {
        if (!selectedId) return;

        try {
            localStorage.setItem(
                CONSENT_KEY,
                "yes"
            );

            collect(selectedId);
        } catch {
            message.textContent =
                "Votre navigateur ne permet pas la sauvegarde.";
        }
    });

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            openFragment(
                button.dataset.kingdomFragment,
                button
            );
        });
    });

    dialog.querySelector(
        ".fragment-discovery-close"
    ).addEventListener("click", () => {
        dialog.close();
    });

    dialog.querySelector(
        ".fragment-discovery-continue"
    ).addEventListener("click", () => {
        dialog.close();
    });

    dialog.addEventListener("close", () => {
        previousFocus?.focus();
    });

    window.addEventListener("storage", renderButtons);
    window.addEventListener("pageshow", renderButtons);

    renderButtons();

})();