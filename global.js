
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

    const translations = {

      fr: {
        tagline: "Chaque animal a une histoire.",
        backToTop: "Retour en haut",
        dailyWord: "Le petit mot du cœur",
        openLetter: "Un petit mot vous attend...",
        close: "Fermer",
        tomorrow: "Un nouveau petit mot vous attend demain.",
        signature: "Avec amour, Cœur Errant ♡"
      },

      nl: {
        tagline: "Elk dier heeft een verhaal.",
        backToTop: "Terug naar boven",
        dailyWord: "Een woordje uit het hart",
        openLetter: "Er wacht een klein berichtje op jou...",
        close: "Sluiten",
        tomorrow: "Morgen wacht er een nieuw berichtje op jou.",
        signature: "Met liefde, Cœur Errant ♡"
      }

    };

    const t = translations[isDutch ? "nl" : "fr"];

    /* =====================================
       LES PETITS MOTS DU CŒUR
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
       ÉCRAN DE CHARGEMENT
       ===================================== */

    function createWelcomeScreen() {

      let alreadyVisited = false;

      try {

        alreadyVisited =
          sessionStorage.getItem("ce-welcome-seen") === "yes";

        sessionStorage.setItem("ce-welcome-seen", "yes");

      } catch (error) {

        // Pas de stockage disponible :
        // on évite de répéter l'animation.
        return;

      }

      if (alreadyVisited || reducedMotion) {
        return;
      }

      const welcome = document.createElement("div");

      welcome.className = "ce-welcome-screen";

      welcome.setAttribute("aria-hidden", "true");

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

      function dismissWelcome() {

        welcome.classList.add("ce-welcome-finished");

        window.setTimeout(() => {
          welcome.remove();
        }, 500);

      }

      window.setTimeout(dismissWelcome, 1100);

      welcome.addEventListener("click", dismissWelcome, {
        once: true
      });

    }

    /* =====================================
       OUTILS FLOTTANTS
       ===================================== */

    const tools = document.createElement("div");

    tools.className = "ce-global-tools";

    tools.innerHTML = `

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
       RETOUR EN HAUT
       ===================================== */

    const backTop = tools.querySelector(".ce-back-top");

    function updateBackTop() {

      backTop.hidden = window.scrollY < 500;

    }

    window.addEventListener("scroll", updateBackTop, {
      passive: true
    });

    updateBackTop();

    backTop.addEventListener("click", () => {

      window.scrollTo({

        top: 0,

        behavior: reducedMotion ? "instant" : "smooth"

      });

    });

    /* =====================================
       CALCUL DE LA CITATION DU JOUR
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

      const quoteIndex = dayNumber % quotes.length;

      return quotes[quoteIndex][isDutch ? "nl" : "fr"];

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

    const dailyDialog = document.createElement("dialog");

    dailyDialog.className = "ce-daily-dialog";

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

        <blockquote class="ce-daily-quote"></blockquote>

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

    const dailyButton =
      tools.querySelector(".ce-daily-button");

    const notification =
      tools.querySelector(".ce-daily-notification");

    const dailyClose =
      dailyDialog.querySelector(".ce-daily-close");

    function updateNotification() {

      try {

        notification.hidden =

          localStorage.getItem("ce-daily-read") ===
          getTodayKey();

      } catch (error) {

        notification.hidden = false;

      }

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
      ).textContent = "« " + getTodayQuote() + " »";

      dailyDialog.showModal();

      try {

        localStorage.setItem(
          "ce-daily-read",
          getTodayKey()
        );

      } catch (error) {

        // La lettre reste accessible
        // même sans stockage local.

      }

      notification.hidden = true;

    });

    dailyClose.addEventListener("click", () => {

      dailyDialog.close();

    });

    dailyDialog.addEventListener("click", (event) => {

      if (event.target === dailyDialog) {

        const rect = dailyDialog.getBoundingClientRect();

        const outside =
          event.clientX < rect.left ||
          event.clientX > rect.right ||
          event.clientY < rect.top ||
          event.clientY > rect.bottom;

        if (outside) {
          dailyDialog.close();
        }

      }

    });

    dailyDialog.addEventListener("close", () => {

      dailyButton.focus({
        preventScroll: true
      });

    });

    /* =====================================
       PAGE ACTIVE DANS LE HEADER
       ===================================== */

    const currentPage =
      window.location.pathname.split("/").pop()
      || "index.html";

    document.querySelectorAll(".nav-links a")
      .forEach(link => {

        const href = link.getAttribute("href");

        if (href === currentPage) {

          link.classList.add("active");

          link.setAttribute(
            "aria-current",
            "page"
          );

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
