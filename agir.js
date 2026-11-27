/* =========================================
   CŒUR ERRANT
   À VOTRE TOUR D'AGIR
   agir.js
   ========================================= */

(function () {

  "use strict";

  const $ = id => document.getElementById(id);
  const isNL = document.documentElement.lang
  .toLowerCase()
  .startsWith("nl");

const t = (fr, nl) => isNL ? nl : fr;

  const page = document.querySelector(".agir-page");

  if (!page) return;

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const STORAGE_KEY = "coeur-errant-packing-v1";

  const CONSENT_KEY = "coeur-errant-packing-consent-v1";


  /* =========================================
     01 — LES SIX SITUATIONS
     ========================================= */
const situations = {

  faim: {

    symbol: "♡",

    title: t("Il a faim.", "Het heeft honger."),

    intro: t(
      "Offrir un repas à un animal errant peut être un beau geste. L'essentiel est de choisir une nourriture adaptée et de respecter sa tranquillité.",
      "Een zwerfdier eten geven kan een mooi gebaar zijn. Het belangrijkste is om geschikte voeding te kiezen en zijn rust te respecteren."
    ),

    good: [

      t(
        "Choisissez des croquettes ou de la pâtée adaptées aux chiens ou aux chats.",
        "Kies geschikte brokjes of natvoer voor honden of katten."
      ),

      t(
        "Déposez la nourriture dans un endroit calme, propre et éloigné de la circulation.",
        "Plaats het voedsel op een rustige, schone plek, ver weg van het verkeer."
      ),

      t(
        "Proposez une petite portion et laissez l'animal manger tranquillement.",
        "Geef een kleine portie en laat het dier rustig eten."
      ),

      t(
        "Éloignez-vous suffisamment pour qu'il puisse s'approcher sans crainte.",
        "Neem voldoende afstand zodat het dier zonder angst dichterbij kan komen."
      ),

      t(
        "Respectez les règles locales concernant le nourrissage des animaux.",
        "Respecteer de lokale regels voor het voederen van dieren."
      )

    ],

    bad: [

      t(
        "Donner du chocolat, de l'oignon, de l'ail ou des os cuits.",
        "Chocolade, ui, knoflook of gekookte botten geven."
      ),

      t(
        "Donner des aliments avariés ou très assaisonnés.",
        "Bedorven of sterk gekruid voedsel geven."
      ),

      t(
        "Nourrir directement à la main un animal inconnu.",
        "Een onbekend dier rechtstreeks uit je hand laten eten."
      ),

      t(
        "Laisser des emballages ou des restes de nourriture sur place.",
        "Verpakkingen of etensresten achterlaten."
      )

    ],

    note: t(
      "Un animal extrêmement maigre, faible ou incapable de manger peut nécessiter une prise en charge vétérinaire. Ne le forcez pas à manger.",
      "Een extreem mager of zwak dier, of een dier dat niet kan eten, heeft mogelijk diergeneeskundige hulp nodig. Dwing het nooit om te eten."
    )

  },


  soif: {

    symbol: "💧",

    title: t("Il a soif.", "Het heeft dorst."),

    intro: t(
      "L'accès à une eau propre peut être difficile pour les animaux qui vivent dehors, particulièrement pendant les périodes de forte chaleur.",
      "Toegang tot schoon drinkwater kan moeilijk zijn voor dieren die buiten leven, vooral tijdens periodes van grote hitte."
    ),

    good: [

      t(
        "Proposez de l'eau potable dans un récipient propre et stable.",
        "Geef drinkwater in een schoon en stabiel bakje."
      ),

      t(
        "Placez la gamelle à l'ombre, loin des routes.",
        "Plaats het drinkbakje in de schaduw, ver weg van wegen."
      ),

      t(
        "Laissez l'animal boire à son rythme.",
        "Laat het dier op zijn eigen tempo drinken."
      ),

      t(
        "Renouvelez l'eau régulièrement si vous restez sur place.",
        "Ververs het water regelmatig als je ter plaatse blijft."
      )

    ],

    bad: [

      t(
        "Remplacer l'eau par du lait ou une boisson sucrée.",
        "Water vervangen door melk of een suikerhoudende drank."
      ),

      t(
        "Forcer l'animal à boire.",
        "Het dier dwingen om te drinken."
      ),

      t(
        "Verser de l'eau directement dans sa bouche.",
        "Water rechtstreeks in zijn bek gieten."
      ),

      t(
        "Laisser un récipient sale ou dangereux.",
        "Een vuil of gevaarlijk drinkbakje achterlaten."
      )

    ],

    note: t(
      "Un animal qui s'effondre, respire difficilement ou semble souffrir d'un coup de chaleur nécessite une aide vétérinaire urgente.",
      "Een dier dat instort, moeilijk ademt of tekenen van een hitteslag vertoont, heeft dringend diergeneeskundige hulp nodig."
    )

  },


  peur: {

    symbol: "♡",

    title: t("Il a peur.", "Het is bang."),

    intro: t(
      "Un animal craintif ne connaît pas vos intentions. Respecter sa distance est parfois la meilleure manière de lui venir en aide.",
      "Een angstig dier kent jouw bedoelingen niet. Zijn afstand respecteren is soms de beste manier om het te helpen."
    ),

    good: [

      t(
        "Observez son comportement à distance.",
        "Observeer zijn gedrag vanop een afstand."
      ),

      t(
        "Restez calme et évitez les mouvements brusques.",
        "Blijf rustig en vermijd plotse bewegingen."
      ),

      t(
        "Laissez toujours une possibilité à l'animal de s'éloigner.",
        "Geef het dier altijd de mogelijkheid om weg te gaan."
      ),

      t(
        "Si vous souhaitez lui offrir de la nourriture, déposez-la puis reculez.",
        "Als je het voedsel wilt geven, zet het dan neer en neem afstand."
      ),

      t(
        "Acceptez qu'il ne souhaite pas s'approcher.",
        "Aanvaard dat het dier misschien niet dichterbij wil komen."
      )

    ],

    bad: [

      t(
        "Courir derrière lui.",
        "Achter het dier aanlopen."
      ),

      t(
        "Le coincer contre un mur ou dans un passage étroit.",
        "Het dier tegen een muur of in een smalle doorgang insluiten."
      ),

      t(
        "Tenter de le caresser ou de le porter de force.",
        "Het dier tegen zijn wil aaien of optillen."
      ),

      t(
        "Laisser un enfant s'approcher seul d'un animal inconnu.",
        "Een kind alleen een onbekend dier laten benaderen."
      )

    ],

    note: t(
      "Dans les régions où la rage circule, évitez tout contact direct avec les animaux errants, même lorsqu'ils semblent affectueux.",
      "Vermijd in gebieden waar hondsdolheid voorkomt elk rechtstreeks contact met zwerfdieren, zelfs wanneer ze aanhankelijk lijken."
    )

  },


  blesse: {

    symbol: "✚",

    title: t("Il est blessé.", "Het is gewond."),

    intro: t(
      "Face à un animal blessé ou malade, votre rôle est avant tout de chercher une aide adaptée sans aggraver sa situation.",
      "Wanneer je een gewond of ziek dier tegenkomt, is het vooral belangrijk om geschikte hulp te zoeken zonder zijn toestand te verergeren."
    ),

    good: [

      t(
        "Observez l'animal depuis un endroit sûr.",
        "Observeer het dier vanaf een veilige plek."
      ),

      t(
        "Notez précisément sa localisation.",
        "Noteer zijn exacte locatie."
      ),

      t(
        "Prenez une photographie à distance si cela peut faciliter son identification.",
        "Maak vanop een afstand een foto als dit kan helpen bij de identificatie."
      ),

      t(
        "Contactez un vétérinaire, une association locale ou un service compétent.",
        "Neem contact op met een dierenarts, een lokale dierenorganisatie of een bevoegde dienst."
      ),

      t(
        "Suivez les instructions des professionnels avant toute manipulation.",
        "Volg de instructies van deskundigen voordat je het dier aanraakt of verplaatst."
      )

    ],

    bad: [

      t(
        "Administrer des médicaments humains.",
        "Geneesmiddelen voor mensen toedienen."
      ),

      t(
        "Essayer de soigner une blessure grave sans connaissances vétérinaires.",
        "Een ernstige verwonding proberen te behandelen zonder diergeneeskundige kennis."
      ),

      t(
        "Déplacer un animal blessé sans avis professionnel lorsque cela peut être évité.",
        "Een gewond dier zonder professioneel advies verplaatsen wanneer dit vermeden kan worden."
      ),

      t(
        "Toucher une plaie ou du sang à mains nues.",
        "Een wonde of bloed met blote handen aanraken."
      )

    ],

    note: t(
      "Même un animal habituellement calme peut mordre lorsqu'il souffre. Une difficulté respiratoire, une perte de connaissance ou un saignement important constitue une urgence vétérinaire.",
      "Zelfs een rustig dier kan bijten wanneer het pijn heeft. Ademhalingsproblemen, bewustzijnsverlies of ernstige bloedingen vereisen dringende diergeneeskundige hulp."
    )

  },


  bebe: {

    symbol: "♡",

    title: t("Il est tout petit.", "Het is nog heel klein."),

    intro: t(
      "Un chaton ou un chiot aperçu seul n'est pas nécessairement abandonné. Sa mère peut être partie chercher de la nourriture.",
      "Een kitten of puppy dat je alleen aantreft, is niet noodzakelijk achtergelaten. De moeder kan op zoek zijn naar voedsel."
    ),

    good: [

      t(
        "Observez la situation à distance, si l'environnement est sûr.",
        "Observeer de situatie vanop een afstand als de omgeving veilig is."
      ),

      t(
        "Vérifiez si une mère ou d'autres petits se trouvent à proximité.",
        "Controleer of de moeder of andere jongen in de buurt zijn."
      ),

      t(
        "Contactez rapidement une association ou un vétérinaire pour obtenir des conseils.",
        "Neem snel contact op met een dierenorganisatie of dierenarts voor advies."
      ),

      t(
        "Demandez une intervention urgente si le petit est froid, blessé, très faible ou exposé à un danger immédiat.",
        "Vraag dringend hulp als het jonge dier koud, gewond, erg zwak of in onmiddellijk gevaar is."
      )

    ],

    bad: [

      t(
        "Séparer automatiquement un petit de sa mère.",
        "Een jong dier zomaar van zijn moeder scheiden."
      ),

      t(
        "Donner du lait de vache.",
        "Koemelk geven."
      ),

      t(
        "Forcer un bébé animal à boire ou à manger.",
        "Een jong dier dwingen om te drinken of te eten."
      ),

      t(
        "Improviser un nourrissage sans connaître son âge et ses besoins.",
        "Zomaar voeding geven zonder zijn leeftijd en behoeften te kennen."
      )

    ],

    note: t(
      "Les nouveau-nés sont particulièrement fragiles. Leur alimentation et leur température nécessitent des soins spécifiques et des conseils professionnels.",
      "Pasgeboren dieren zijn bijzonder kwetsbaar. Hun voeding en lichaamstemperatuur vereisen specifieke zorg en professioneel advies."
    )

  },


  danger: {

    symbol: "!",

    title: t("Il est en danger.", "Het is in gevaar."),

    intro: t(
      "Vouloir protéger un animal est naturel. Mais votre sécurité et celle des personnes autour de vous doivent également être préservées.",
      "Een dier willen beschermen is natuurlijk. Maar ook jouw veiligheid en die van de mensen om je heen zijn belangrijk."
    ),

    good: [

      t(
        "Identifiez le danger depuis un endroit sûr.",
        "Beoordeel het gevaar vanaf een veilige plek."
      ),

      t(
        "Contactez les services locaux compétents.",
        "Neem contact op met de bevoegde lokale diensten."
      ),

      t(
        "Communiquez une localisation précise et décrivez la situation.",
        "Geef de exacte locatie door en beschrijf de situatie."
      ),

      t(
        "Restez disponible pour guider les intervenants si cela ne présente aucun risque.",
        "Blijf beschikbaar om de hulpverleners te begeleiden als dit geen risico inhoudt."
      ),

      t(
        "En cas de maltraitance, signalez les faits aux autorités compétentes.",
        "Meld dierenmishandeling bij de bevoegde autoriteiten."
      )

    ],

    bad: [

      t(
        "Courir sur une route fréquentée pour attraper un animal.",
        "Een drukke weg oplopen om een dier te vangen."
      ),

      t(
        "Entrer dans un bâtiment dangereux ou sur une propriété privée sans autorisation.",
        "Zonder toestemming een gevaarlijk gebouw of privéterrein betreden."
      ),

      t(
        "Confronter directement une personne violente.",
        "Een gewelddadige persoon rechtstreeks confronteren."
      ),

      t(
        "Tenter une intervention risquée sans matériel ni formation.",
        "Een gevaarlijke interventie proberen zonder materiaal of opleiding."
      )

    ],

    note: t(
      "Les services de secours et de protection animale varient selon les pays. Renseignez-vous avant votre départ sur les contacts locaux.",
      "Hulpdiensten en dierenbeschermingsorganisaties verschillen per land. Zoek vóór je vertrek de lokale contactgegevens op."
    )

  }

};

  /* =========================================
     02 — FENÊTRES DE CONSEILS
     ========================================= */

  const adviceDialog = $("advice-dialog");

  let lastAdviceButton = null;


  function fillList(element, items) {

    element.replaceChildren();

    items.forEach(item => {

      const li = document.createElement("li");

      li.textContent = item;

      element.appendChild(li);

    });

  }


  function openAdvice(key, button) {

    const situation = situations[key];

    if (!situation || adviceDialog.open) return;

    lastAdviceButton = button;

    $("advice-symbol").textContent =
      situation.symbol;

    $("advice-title").textContent =
      situation.title;

    $("advice-intro").textContent =
      situation.intro;

    $("advice-note").textContent =
      situation.note;

    fillList(
      $("advice-good-list"),
      situation.good
    );

    fillList(
      $("advice-bad-list"),
      situation.bad
    );

    adviceDialog.showModal();

    adviceDialog.scrollTop = 0;

    $("close-advice").focus();

  }


  document.querySelectorAll(
    ".agir-situation-card"
  ).forEach(button => {

    button.addEventListener("click", () => {

      openAdvice(
        button.dataset.situation,
        button
      );

    });

  });


  $("close-advice").addEventListener(
    "click",
    () => adviceDialog.close()
  );


  $("finish-advice").addEventListener(
    "click",
    () => adviceDialog.close()
  );


  adviceDialog.addEventListener("close", () => {

    if (lastAdviceButton) {

      lastAdviceButton.focus({
        preventScroll: true
      });

    }

  });


  /* Fermer en cliquant en dehors */

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


  enableBackdropClose(adviceDialog);


  /* =========================================
     03 — CHECKLIST SOLIDAIRE
     ========================================= */

  const packingInputs = Array.from(

    document.querySelectorAll(
      "[data-packing]"
    )

  );

  const packingCard = document.querySelector(
    ".agir-packing-card"
  );

  const packingTotal = packingInputs.length;

  const validPackingIds = packingInputs.map(
    input => input.dataset.packing
  );

  const consentButton = $("packing-consent-button");

  const storageNote = $("packing-storage-note");

  let storageAvailable = true;

  let packingConsent = false;

  let deletionFailed = false;


  /* =========================================
     VÉRIFICATION DU CONSENTEMENT
     ========================================= */

  function readPackingConsent() {

    try {

      storageAvailable = true;

      return localStorage.getItem(
        CONSENT_KEY
      ) === "yes";

    } catch (error) {

      storageAvailable = false;

      return false;

    }

  }


  /* =========================================
     SUPPRESSION DES DONNÉES LOCALES
     ========================================= */

  function removePackingStorage() {

    let success = true;

    try {

      localStorage.removeItem(CONSENT_KEY);

    } catch (error) {

      success = false;

    }

    try {

      localStorage.removeItem(STORAGE_KEY);

    } catch (error) {

      success = false;

    }

    deletionFailed = !success;

    storageAvailable = success;

    return success;

  }


  /* =========================================
     AFFICHAGE DU CONSENTEMENT
     ========================================= */

 function updateConsentInterface() {

  if (consentButton) {

    consentButton.setAttribute(
      "aria-pressed",
      String(packingConsent)
    );

    consentButton.textContent =
      packingConsent
        ? t(
            "Désactiver la sauvegarde locale",
            "Lokale opslag uitschakelen"
          )
        : t(
            "Activer la sauvegarde locale",
            "Lokale opslag inschakelen"
          );

    consentButton.disabled = false;

  }

  if (!storageNote) return;

  if (deletionFailed) {

    storageNote.textContent = t(
      "La sauvegarde est désactivée sur cette page, mais la suppression des données n'a pas pu être confirmée. Vous pouvez réessayer ou effacer les données de ce site dans les paramètres de votre navigateur.",
      "De opslag is uitgeschakeld op deze pagina, maar het verwijderen van de gegevens kon niet worden bevestigd. Je kunt het opnieuw proberen of de gegevens van deze website wissen via de instellingen van je browser."
    );

    return;

  }

  if (!storageAvailable) {

    storageNote.textContent = t(
      "La sauvegarde locale est actuellement indisponible. Vous pouvez continuer à utiliser votre checklist sans enregistrement.",
      "Lokale opslag is momenteel niet beschikbaar. Je kunt je checklist blijven gebruiken zonder je voortgang op te slaan."
    );

    return;

  }

  if (packingConsent) {

    storageNote.textContent = t(
      "Votre progression est enregistrée uniquement dans ce navigateur. Vous pouvez retirer votre consentement et supprimer les données enregistrées à tout moment.",
      "Je voortgang wordt uitsluitend in deze browser opgeslagen. Je kunt je toestemming op elk moment intrekken en de opgeslagen gegevens verwijderen."
    );

  } else {

    storageNote.textContent = t(
      "La sauvegarde locale est désactivée. Votre progression reste disponible sur cette page, mais ne sera pas conservée lors de votre prochaine visite.",
      "Lokale opslag is uitgeschakeld. Je voortgang blijft beschikbaar op deze pagina, maar wordt niet bewaard voor je volgende bezoek."
    );

  }

}

  /* =========================================
     CHARGEMENT DE LA CHECKLIST
     ========================================= */

  function loadPacking() {

    if (!packingConsent) {

      return [];

    }

    try {

      const saved = JSON.parse(
        localStorage.getItem(STORAGE_KEY)
      );

      if (!Array.isArray(saved)) {

        return [];

      }

      return saved.filter(
        id => validPackingIds.includes(id)
      );

    } catch (error) {

      storageAvailable = false;

      return null;

    }

  }


  /* =========================================
     SAUVEGARDE DE LA CHECKLIST
     ========================================= */

  function savePacking() {

    if (!packingConsent) {

      return false;

    }

    /*
       Vérifier également le consentement
       enregistré pour éviter de sauvegarder
       après un retrait dans un autre onglet.
    */

    if (!readPackingConsent()) {

      packingConsent = false;

      updateConsentInterface();

      return false;

    }

    const checked = packingInputs

      .filter(input => input.checked)

      .map(input => input.dataset.packing);

    try {

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(checked)
      );

      storageAvailable = true;

      updateConsentInterface();

      return true;

    } catch (error) {

      storageAvailable = false;

      updateConsentInterface();

      return false;

    }

  }


  /* =========================================
     PROGRESSION DE LA CHECKLIST
     ========================================= */

 function updatePacking() {

  const count = packingInputs.filter(
    input => input.checked
  ).length;

  const percentage = packingTotal
    ? count / packingTotal * 100
    : 0;

  $("packing-count").textContent =
    `${count}/${packingTotal}`;

  $("packing-fill").style.width =
    `${percentage}%`;

  $("packing-progress").setAttribute(
    "aria-valuemax",
    packingTotal
  );

  $("packing-progress").setAttribute(
    "aria-valuenow",
    count
  );

  packingCard.classList.toggle(
    "is-complete",
    packingTotal > 0 && count === packingTotal
  );

  let message = "";

  if (count === 0) {

    message = t(
      "Chaque préparation commence par un premier petit geste.",
      "Elke voorbereiding begint met een eerste klein gebaar."
    );

  } else if (count <= 2) {

    message = t(
      "Les premiers essentiels sont prêts. ♡",
      "De eerste benodigdheden liggen klaar. ♡"
    );

  } else if (count <= 4) {

    message = t(
      "Votre petite valise prend forme.",
      "Je kleine reiskoffer krijgt vorm."
    );

  } else if (count < packingTotal) {

    message = t(
      "Encore quelques préparatifs avant de partir.",
      "Nog enkele voorbereidingen voor je vertrekt."
    );

  } else {

    message = t(
      "Votre valise solidaire est prête ! Emportez votre bienveillance partout avec vous. ♡",
      "Je hartverwarmende reiskoffer is klaar! Neem je liefde voor dieren overal met je mee. ♡"
    );

  }

  if (!storageAvailable) {

    message += t(
      " La sauvegarde automatique est actuellement indisponible.",
      " Automatisch opslaan is momenteel niet beschikbaar."
    );

  }

  $("packing-message").textContent = message;

  updateConsentInterface();

}

  /* =========================================
     RESTAURATION DE LA CHECKLIST
     ========================================= */

  function restorePacking() {

    packingConsent = readPackingConsent();

    if (!packingConsent) {

      /*
         Supprimer les anciennes données
         enregistrées sans consentement.

         Les cases actuellement cochées
         restent disponibles en mémoire.
      */

      if (storageAvailable) {

        removePackingStorage();

      }

      updatePacking();

      return;

    }

    const saved = loadPacking();

    if (saved !== null) {

      packingInputs.forEach(input => {

        input.checked = saved.includes(
          input.dataset.packing
        );

      });

    }

    updatePacking();

  }


  /* =========================================
     ACTIVER LA SAUVEGARDE LOCALE
     ========================================= */

  function enablePackingConsent() {

    deletionFailed = false;

    try {

      localStorage.setItem(
        CONSENT_KEY,
        "yes"
      );

      packingConsent = true;

      storageAvailable = true;

      /*
         Enregistrer uniquement la progression
         actuelle après autorisation explicite.
      */

      if (!savePacking()) {

        packingConsent = false;

        removePackingStorage();

        storageAvailable = false;

      }

    } catch (error) {

      packingConsent = false;

      storageAvailable = false;

    }

    updatePacking();

  }


  /* =========================================
     RETIRER LE CONSENTEMENT
     ========================================= */

  function disablePackingConsent() {

    packingConsent = false;

    removePackingStorage();

    /*
       Les données enregistrées sont supprimées
       lorsque le navigateur le permet.

       Les cases actuellement cochées restent
       disponibles jusqu'au départ de la page.
    */

    updatePacking();

  }


  /* =========================================
     BOUTON DE CONSENTEMENT
     ========================================= */

  if (consentButton) {

    consentButton.addEventListener(
      "click",
      () => {

        if (packingConsent || deletionFailed) {

          disablePackingConsent();

        } else {

          enablePackingConsent();

        }

      }
    );

  }


  /* =========================================
     INTERACTIONS AVEC LA CHECKLIST
     ========================================= */

  packingInputs.forEach(input => {

    input.addEventListener("change", () => {

      savePacking();

      updatePacking();

      const complete =

        packingTotal > 0 &&

        packingInputs.every(
          item => item.checked
        );

      if (complete) {

        createConfetti(30);

      }

    });

  });


  /* =========================================
     04 — RÉINITIALISATION DE LA VALISE
     ========================================= */

  const resetDialog = $("packing-reset-dialog");


  $("reset-packing").addEventListener(
    "click",
    () => {

      if (!resetDialog.open) {

        resetDialog.showModal();

        $("cancel-packing-reset").focus();

      }

    }
  );


  $("cancel-packing-reset").addEventListener(
    "click",
    () => resetDialog.close()
  );


  $("confirm-packing-reset").addEventListener(
    "click",
    () => {

      packingInputs.forEach(input => {

        input.checked = false;

      });

      savePacking();

      updatePacking();

      resetDialog.close();

    }
  );


  resetDialog.addEventListener("close", () => {

    $("reset-packing").focus({
      preventScroll: true
    });

  });


  enableBackdropClose(resetDialog);


  /* =========================================
     SYNCHRONISATION ENTRE PLUSIEURS ONGLETS
     ========================================= */

  function synchronizePacking() {

    const previousConsent = packingConsent;

    packingConsent = readPackingConsent();

    if (!packingConsent) {

      /*
         Le consentement a été retiré.

         Ne plus lire ni enregistrer
         la progression de la checklist.
      */

      if (previousConsent && storageAvailable) {

        removePackingStorage();

      }

      updatePacking();

      return;

    }

    deletionFailed = false;

    const saved = loadPacking();

    if (saved !== null) {

      packingInputs.forEach(input => {

        input.checked = saved.includes(
          input.dataset.packing
        );

      });

    }

    updatePacking();

  }


  window.addEventListener("storage", event => {

    if (

      event.key === STORAGE_KEY ||

      event.key === CONSENT_KEY ||

      event.key === null

    ) {

      synchronizePacking();

    }

  });


  /* Vérifier le consentement au retour
     sur la page depuis l'historique. */

  window.addEventListener("pageshow", event => {

    if (event.persisted) {

      synchronizePacking();

    }

  });


  /* Vérifier le consentement lorsqu'un
     onglet redevient visible. */

  document.addEventListener(
    "visibilitychange",
    () => {

      if (document.visibilityState === "visible") {

        synchronizePacking();

      }

    }
  );


  /* =========================================
     05 — LES CONSEILS DÉPLIABLES
     ========================================= */

  const mistakes = document.querySelectorAll(
    ".agir-mistake"
  );


  mistakes.forEach(detail => {

    detail.addEventListener("toggle", () => {

      if (!detail.open) return;

      mistakes.forEach(other => {

        if (other !== detail) {

          other.open = false;

        }

      });

    });

  });  /* =========================================
     06 — QUESTIONS DU QUIZ
     ========================================= */

  const questions = [

  {
    question: t(
      "Le lait de vache est la meilleure boisson pour un chat errant.",
      "Koemelk is de beste drank voor een zwerfkat."
    ),

    answer: false,

    explanation: t(
      "De nombreux chats digèrent mal le lactose. Une gamelle d'eau propre est préférable. Les chatons non sevrés nécessitent une alimentation spécifique.",
      "Veel katten verteren lactose moeilijk. Een bakje schoon drinkwater is beter. Kittens die nog niet gespeend zijn, hebben aangepaste voeding nodig."
    )
  },

  {
    question: t(
      "Il vaut mieux laisser un animal craintif s'approcher à son rythme.",
      "Je laat een angstig dier het best op zijn eigen tempo dichterbij komen."
    ),

    answer: true,

    explanation: t(
      "Respecter sa distance et lui laisser une possibilité de s'éloigner permet de réduire son stress et les risques de morsure ou de griffure.",
      "Door voldoende afstand te bewaren en het dier de mogelijkheid te geven om weg te gaan, verminder je zijn stress en het risico op beten of krabwonden."
    )
  },

  {
    question: t(
      "Un animal qui se promène seul dans la rue est forcément abandonné.",
      "Een dier dat alleen op straat rondloopt, is altijd achtergelaten."
    ),

    answer: false,

    explanation: t(
      "Il peut avoir un propriétaire, être nourri par des habitants ou appartenir à une communauté d'animaux vivant librement.",
      "Het dier kan een eigenaar hebben, door buurtbewoners gevoederd worden of deel uitmaken van een groep vrijlevende dieren."
    )
  },

  {
    question: t(
      "Le chocolat peut être dangereux pour les chiens et les chats.",
      "Chocolade kan gevaarlijk zijn voor honden en katten."
    ),

    answer: true,

    explanation: t(
      "Le chocolat contient notamment de la théobromine, une substance toxique pour les chiens et les chats.",
      "Chocolade bevat onder andere theobromine, een stof die giftig is voor honden en katten."
    )
  },

  {
    question: t(
      "On peut donner du paracétamol à un animal blessé pour soulager sa douleur.",
      "Je mag een gewond dier paracetamol geven om de pijn te verlichten."
    ),

    answer: false,

    explanation: t(
      "Le paracétamol peut provoquer une intoxication grave, particulièrement chez les chats. Aucun médicament ne doit être donné sans avis vétérinaire.",
      "Paracetamol kan ernstige vergiftiging veroorzaken, vooral bij katten. Geef nooit geneesmiddelen zonder advies van een dierenarts."
    )
  },

  {
    question: t(
      "Un chaton aperçu seul peut avoir une mère qui se trouve à proximité.",
      "Een kitten dat je alleen aantreft, kan een moeder hebben die in de buurt is."
    ),

    answer: true,

    explanation: t(
      "Sa mère peut être partie chercher de la nourriture. Lorsque la situation est sûre, observez à distance et demandez conseil avant de déplacer le petit.",
      "De moeder kan op zoek zijn naar voedsel. Observeer vanop een veilige afstand en vraag advies voordat je het kitten verplaatst."
    )
  },

  {
    question: t(
      "Il faut toujours courir après un animal qui traverse une route dangereuse.",
      "Je moet altijd achter een dier aanlopen dat een gevaarlijke weg oversteekt."
    ),

    answer: false,

    explanation: t(
      "Une intervention précipitée peut provoquer un accident ou effrayer davantage l'animal. Contactez les services compétents depuis un endroit sûr.",
      "Een overhaaste interventie kan een ongeval veroorzaken of het dier nog banger maken. Neem vanaf een veilige plek contact op met de bevoegde diensten."
    )
  },

  {
    question: t(
      "Après une morsure ou une griffure, il faut nettoyer la plaie et demander rapidement un avis médical.",
      "Na een beet of krab moet je de wonde reinigen en snel medisch advies vragen."
    ),

    answer: true,

    explanation: t(
      "Lavez immédiatement la plaie à l'eau et au savon pendant au moins 15 minutes. Consultez rapidement un professionnel de santé, notamment pour évaluer le risque de rage et de tétanos.",
      "Was de wonde onmiddellijk gedurende minstens 15 minuten met water en zeep. Raadpleeg snel een arts om onder andere het risico op hondsdolheid en tetanus te beoordelen."
    )
  }

];


  /* =========================================
     07 — FONCTIONNEMENT DU QUIZ
     ========================================= */

  let currentQuestion = 0;

  let score = 0;

  let answered = false;

  const quizTotal = questions.length;

  const answerButtons = Array.from(

    document.querySelectorAll(
      ".agir-answer"
    )

  );


  function showQuizScreen(screen) {

    const screens = [

      "quiz-start-screen",

      "quiz-question-screen",

      "quiz-result-screen"

    ];

    screens.forEach(id => {

      $(id).hidden = id !== screen;

    });

  }


function updateQuizScore() {

  $("quiz-score").textContent =

    score === 1

      ? t(
          "1 bonne réponse",
          "1 juist antwoord"
        )

      : t(
          `${score} bonnes réponses`,
          `${score} juiste antwoorden`
        );

}

  function updateQuizProgress(completed) {

    const percentage =
      completed / quizTotal * 100;

    $("quiz-fill").style.width =
      `${percentage}%`;

    $("quiz-progress").setAttribute(
      "aria-valuemax",
      quizTotal
    );

    $("quiz-progress").setAttribute(
      "aria-valuenow",
      completed
    );

  }


  function renderQuestion() {

    answered = false;

    const question = questions[currentQuestion];

  $("quiz-position").textContent = t(
  `Question ${currentQuestion + 1}/${quizTotal}`,
  `Vraag ${currentQuestion + 1}/${quizTotal}`
);

    $("quiz-question").textContent =
      question.question;

    $("quiz-feedback").hidden = true;

    $("quiz-feedback").classList.remove(
      "is-correct",
      "is-incorrect"
    );

    $("next-question").hidden = true;

    answerButtons.forEach(button => {

      button.disabled = false;

      button.classList.remove(

        "is-correct",

        "is-incorrect",

        "is-selected"

      );

    });

    updateQuizScore();

    updateQuizProgress(currentQuestion);

    $("quiz-question").focus({
      preventScroll: true
    });

  }


  function startQuiz() {

    currentQuestion = 0;

    score = 0;

    answered = false;

    showQuizScreen("quiz-question-screen");

    renderQuestion();

  }


  function answerQuestion(selectedAnswer) {

    if (answered) return;

    answered = true;

    const question = questions[currentQuestion];

    const correct =
      selectedAnswer === question.answer;

    if (correct) {

      score++;

    }

    answerButtons.forEach(button => {

      const value =
        button.dataset.answer === "true";

      button.disabled = true;

      if (value === question.answer) {

        button.classList.add("is-correct");

      }

      if (value === selectedAnswer) {

        button.classList.add("is-selected");

        if (!correct) {

          button.classList.add("is-incorrect");

        }

      }

    });

    const feedback = $("quiz-feedback");

    feedback.classList.add(

      correct

        ? "is-correct"

        : "is-incorrect"

    );

  $("quiz-feedback-title").textContent =

  correct

    ? t(
        "Bonne réponse ! ♡",
        "Juist antwoord! ♡"
      )

    : t(
        "Un nouveau réflexe à retenir.",
        "Weer iets nieuws geleerd."
      );

    $("quiz-explanation").textContent =
      question.explanation;

    feedback.hidden = false;

    updateQuizScore();

    updateQuizProgress(currentQuestion + 1);

    const nextButton = $("next-question");

    nextButton.textContent =

  currentQuestion === quizTotal - 1

    ? t(
        "Découvrir mon résultat ♡",
        "Mijn resultaat ontdekken ♡"
      )

    : t(
        "Question suivante →",
        "Volgende vraag →"
      );

    nextButton.hidden = false;

    nextButton.focus({
      preventScroll: true
    });

  }


 function showQuizResult() {

  showQuizScreen("quiz-result-screen");

  $("quiz-final-score").textContent =
    `${score}/${quizTotal}`;

  let title = "";

  let message = "";

  if (score === quizTotal) {

    title = t(
      "Un cœur bien préparé !",
      "Een goed voorbereid hart!"
    );

    message = t(
      "Bravo ! Vous connaissez les huit bons réflexes de ce quiz. Continuez à agir avec douceur, respect et prudence.",
      "Proficiat! Je kent alle acht goede handelingen uit deze quiz. Blijf handelen met zachtheid, respect en voorzichtigheid."
    );

    createConfetti(60);

  } else if (score >= 6) {

    title = t(
      "De très beaux réflexes !",
      "Je bent al goed op weg!"
    );

    message = t(
      "Vous connaissez déjà beaucoup de gestes utiles. Quelques nouvelles connaissances vous accompagneront lors de vos prochaines rencontres.",
      "Je kent al heel wat nuttige handelingen. Met je nieuwe kennis ben je nog beter voorbereid op je volgende ontmoetingen."
    );

    createConfetti(25);

  } else if (score >= 4) {

    title = t(
      "Chaque apprentissage compte.",
      "Elke les telt."
    );

    message = t(
      "Vous avez acquis de nouveaux réflexes. N'hésitez pas à relire les conseils et à recommencer le quiz.",
      "Je hebt nieuwe dingen geleerd. Lees gerust de tips opnieuw en probeer de quiz nog eens."
    );

  } else {

    title = t(
      "Un premier pas vers demain.",
      "Een eerste stap naar morgen."
    );

    message = t(
      "Personne ne connaît tous les bons gestes dès le départ. L'important est d'apprendre et de savoir demander de l'aide lorsque c'est nécessaire.",
      "Niemand weet vanaf het begin precies wat te doen. Het belangrijkste is dat je blijft leren en hulp durft te vragen wanneer dat nodig is."
    );

  }

  $("quiz-result-title").textContent =
    title;

  $("quiz-result-message").textContent =
    message;

  $("quiz-result-title").focus({
    preventScroll: true
  });

}


  $("start-quiz").addEventListener(
    "click",
    startQuiz
  );


  $("restart-quiz").addEventListener(
    "click",
    startQuiz
  );


  answerButtons.forEach(button => {

    button.addEventListener("click", () => {

      answerQuestion(
        button.dataset.answer === "true"
      );

    });

  });


  $("next-question").addEventListener(
    "click",
    () => {

      if (!answered) return;

      if (currentQuestion < quizTotal - 1) {

        currentQuestion++;

        renderQuestion();

      } else {

        showQuizResult();

      }

    }
  );


  /* =========================================
     08 — PETITS CONFETTIS
     ========================================= */

  function createConfetti(amount = 25) {

    if (reducedMotion) return;

    const existing = document.querySelector(
      ".agir-confetti"
    );

    if (existing) {

      existing.remove();

    }

    const container = document.createElement(
      "div"
    );

    container.className = "agir-confetti";

    container.setAttribute(
      "aria-hidden",
      "true"
    );

    const symbols = [

      "♡",

      "♥",

      "✦",

      "✧",

      "❀"

    ];

    const colors = [

      "#a85e68",

      "#b77d88",

      "#d9b4ba",

      "#c4a477",

      "#e4c6ca",

      "#c9aa90"

    ];

    for (let i = 0; i < amount; i++) {

      const piece = document.createElement(
        "span"
      );

      piece.className = "agir-confetti-piece";

      piece.textContent = symbols[

        Math.floor(
          Math.random() * symbols.length
        )

      ];

      piece.style.setProperty(

        "--confetti-x",

        `${Math.random() * 100}%`

      );

      piece.style.setProperty(

        "--confetti-color",

        colors[

          Math.floor(
            Math.random() * colors.length
          )

        ]

      );

      piece.style.setProperty(

        "--confetti-size",

        `${12 + Math.random() * 17}px`

      );

      piece.style.setProperty(

        "--confetti-duration",

        `${2.5 + Math.random() * 1.5}s`

      );

      piece.style.setProperty(

        "--confetti-delay",

        `${Math.random() * .7}s`

      );

      container.appendChild(piece);

    }

    document.body.appendChild(container);

    window.setTimeout(() => {

      container.remove();

    }, 5000);

  }  /* =========================================
     09 — CRÉATION DE LA FICHE PNG
     ========================================= */

  function wrapText(

    context,

    text,

    x,

    y,

    maxWidth,

    lineHeight

  ) {

    const words = text.split(" ");

    let line = "";

    let currentY = y;

    words.forEach(word => {

      const testLine =
        line ? `${line} ${word}` : word;

      const width =
        context.measureText(testLine).width;

      if (width > maxWidth && line) {

        context.fillText(
          line,
          x,
          currentY
        );

        line = word;

        currentY += lineHeight;

      } else {

        line = testLine;

      }

    });

    if (line) {

      context.fillText(
        line,
        x,
        currentY
      );

    }

    return currentY + lineHeight;

  }


  function drawHeart(context, x, y, size) {

    context.save();

    context.translate(x, y);

    context.scale(size / 100, size / 100);

    context.beginPath();

    context.moveTo(0, 32);

    context.bezierCurveTo(
      -85, -22,
      -36, -75,
      0, -32
    );

    context.bezierCurveTo(
      36, -75,
      85, -22,
      0, 32
    );

    context.strokeStyle = "#a85e68";

    context.lineWidth = 3;

    context.stroke();

    context.restore();

  }


  function drawCorner(

    context,

    x,

    y,

    directionX,

    directionY

  ) {

    context.save();

    context.translate(x, y);

    context.scale(directionX, directionY);

    context.strokeStyle = "#c4a477";

    context.lineWidth = 2;

    context.beginPath();

    context.moveTo(0, 80);

    context.lineTo(0, 0);

    context.lineTo(80, 0);

    context.stroke();

    context.beginPath();

    context.moveTo(10, 45);

    context.quadraticCurveTo(
      45, 45,
      45, 10
    );

    context.stroke();

    context.restore();

  }


  async function downloadGuide() {

    const button = $("download-guide");

    const message = $("guide-download-message");

    button.disabled = true;

    message.textContent =
      "Votre petite fiche se prépare...";

    try {

      if (document.fonts && document.fonts.ready) {

        await document.fonts.ready;

      }

      const canvas = document.createElement(
        "canvas"
      );

      canvas.width = 1200;

      canvas.height = 1800;

      const ctx = canvas.getContext("2d");

      if (!ctx) {

        throw new Error(
          "Canvas indisponible"
        );

      }


      /* Fond crème et rose */

      const gradient = ctx.createLinearGradient(
        0, 0, 1200, 1800
      );

      gradient.addColorStop(
        0,
        "#f4e5e5"
      );

      gradient.addColorStop(
        .4,
        "#fffdf7"
      );

      gradient.addColorStop(
        1,
        "#f3e8df"
      );

      ctx.fillStyle = gradient;

      ctx.fillRect(
        0, 0, 1200, 1800
      );


      /* Double bordure dorée */

      ctx.strokeStyle = "#c4a477";

      ctx.lineWidth = 3;

      ctx.strokeRect(
        45, 45, 1110, 1710
      );

      ctx.strokeStyle = "#dfcbb0";

      ctx.lineWidth = 1;

      ctx.strokeRect(
        60, 60, 1080, 1680
      );


      /* Coins décoratifs */

      drawCorner(ctx, 80, 80, 1, 1);

      drawCorner(ctx, 1120, 80, -1, 1);

      drawCorner(ctx, 80, 1720, 1, -1);

      drawCorner(ctx, 1120, 1720, -1, -1);


      /* Nom du projet */

      ctx.textAlign = "center";

      ctx.fillStyle = "#a85e68";

      ctx.font = "400 25px Jost, sans-serif";

      ctx.fillText(

        "C Œ U R   E R R A N T",

        600,

        150

      );


      /* Petit cœur */

      drawHeart(
        ctx,
        600,
        235,
        95
      );


      /* Titre */

      ctx.fillStyle = "#493c35";

      ctx.font =
        "500 66px 'Cormorant Garamond', Georgia, serif";

      ctx.fillText(

       t("Les petits gestes", "De kleine gebaren"),

        600,

        365

      );

      ctx.fillStyle = "#a85e68";

      ctx.font =
        "italic 400 72px 'Cormorant Garamond', Georgia, serif";

      ctx.fillText(

       t("qui comptent.", "die ertoe doen."),

        600,

        440

      );


      /* Sous-titre */

      ctx.fillStyle = "#80736b";

      ctx.font = "400 25px Jost, sans-serif";

      ctx.fillText(

       t(
  "Le guide du voyageur solidaire",
  "De gids voor de betrokken reiziger"
),

        600,

        495

      );


      /* Ligne décorative */

      ctx.strokeStyle = "#d8c1b5";

      ctx.lineWidth = 1;

      ctx.beginPath();

      ctx.moveTo(170, 540);

      ctx.lineTo(1030, 540);

      ctx.stroke();


      /* Contenu du guide */

      const tips = [

  {

    title: t(
      "Observer avant d'approcher",
      "Observeren vóór je nadert"
    ),

    text: t(
      "Respectez le comportement de l'animal et son environnement.",
      "Respecteer het gedrag van het dier en zijn omgeving."
    )

  },

  {

    title: t(
      "Respecter les distances",
      "Voldoende afstand bewaren"
    ),

    text: t(
      "Ne forcez jamais le contact avec un animal inconnu.",
      "Forceer nooit contact met een onbekend dier."
    )

  },

  {

    title: t(
      "Proposer de l'eau propre",
      "Schoon drinkwater aanbieden"
    ),

    text: t(
      "Déposez une gamelle dans un endroit calme et sûr.",
      "Plaats een drinkbakje op een rustige en veilige plek."
    )

  },

  {

    title: t(
      "Choisir une nourriture adaptée",
      "Geschikte voeding kiezen"
    ),

    text: t(
      "Privilégiez les aliments conçus pour les chiens ou les chats.",
      "Kies bij voorkeur voeding die geschikt is voor honden of katten."
    )

  },

  {

    title: t(
      "Savoir demander de l'aide",
      "Weten wanneer je hulp moet vragen"
    ),

    text: t(
      "Contactez un vétérinaire ou une association locale si nécessaire.",
      "Neem indien nodig contact op met een dierenarts of een lokale dierenorganisatie."
    )

  },

  {

    title: t(
      "Ne jamais se mettre en danger",
      "Breng jezelf nooit in gevaar"
    ),

    text: t(
      "Votre sécurité compte aussi. Faites appel aux services compétents.",
      "Ook jouw veiligheid telt. Doe een beroep op de bevoegde diensten."
    )

  }

];

      let y = 610;

      tips.forEach((tip, index) => {

        /* Numéro */

        ctx.textAlign = "left";

        ctx.fillStyle = "#a85e68";

        ctx.font =
          "500 40px 'Cormorant Garamond', Georgia, serif";

        ctx.fillText(

          String(index + 1).padStart(2, "0"),

          135,

          y

        );


        /* Titre du conseil */

        ctx.fillStyle = "#493c35";

        ctx.font =
          "600 30px Jost, sans-serif";

        ctx.fillText(

          tip.title,

          225,

          y

        );


        /* Description */

        ctx.fillStyle = "#80736b";

        ctx.font =
          "400 25px Jost, sans-serif";

        const nextY = wrapText(

          ctx,

          tip.text,

          225,

          y + 40,

          820,

          32

        );


        /* Séparation */

        ctx.strokeStyle = "#e5d8cf";

        ctx.lineWidth = 1;

        ctx.beginPath();

        ctx.moveTo(225, nextY + 4);

        ctx.lineTo(1040, nextY + 4);

        ctx.stroke();

        y = nextY + 55;

      });


      /* Avertissement */

      ctx.textAlign = "center";

      ctx.fillStyle = "#80736b";

      ctx.font = "400 19px Jost, sans-serif";

      wrapText(

        ctx,

       t(
  "Conseils généraux. Respectez les règles locales et demandez un avis vétérinaire en cas de doute.",
  "Algemene tips. Respecteer de lokale regels en vraag bij twijfel advies aan een dierenarts."
),

        600,

        1535,

        950,

        27

      );


      /* Signature */

      ctx.fillStyle = "#a85e68";

      ctx.font =
        "italic 400 35px 'Cormorant Garamond', Georgia, serif";

      ctx.fillText(

       t(
  "Chaque animal a une histoire.",
  "Elk dier heeft een verhaal."
),

        600,

        1640

      );

      ctx.fillStyle = "#80736b";

      ctx.font = "400 19px Jost, sans-serif";

      ctx.fillText(

        "coeurerrant.github.io/Coeur-errant/",

        600,

        1685

      );


      /* Génération de l'image */

      const blob = await new Promise(

        (resolve, reject) => {

          canvas.toBlob(

            result => {

              if (result) {

                resolve(result);

              } else {

                reject(

                  new Error(
                    "Création impossible"
                  )

                );

              }

            },

            "image/png"

          );

        }

      );


      /* Téléchargement */

      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");

      link.href = url;

   link.download = t(
  "Coeur-Errant-Guide-Solidaire.png",
  "Coeur-Errant-Reisgids.png"
);
      document.body.appendChild(link);

      link.click();

      link.remove();

      window.setTimeout(() => {

        URL.revokeObjectURL(url);

      }, 10000);

message.textContent = t(
  "Votre fiche est prête ! Vérifiez vos téléchargements. ♡",
  "Je gids is klaar! Bekijk je downloads. ♡"
);

      createConfetti(20);

    } catch (error) {

      console.error(

        "Erreur de création du guide :",

        error

      );

     message.textContent = t(
  "La fiche n'a pas pu être créée. Vous pouvez réessayer ou conserver une capture de son aperçu.",
  "De gids kon niet worden aangemaakt. Je kunt het opnieuw proberen of een schermafbeelding van het voorbeeld bewaren."
);
    } finally {

      button.disabled = false;

    }

  }


  $("download-guide").addEventListener(
    "click",
    downloadGuide
  );


  /* =========================================
     10 — ANIMATIONS AU DÉFILEMENT
     ========================================= */

  function initializeAnimations() {

    if (reducedMotion) return;

    if (!("IntersectionObserver" in window)) {

      return;

    }

    const elements = document.querySelectorAll(
      ".agir-reveal"
    );

    page.classList.add(
      "agir-animations"
    );

    const observer = new IntersectionObserver(

      entries => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            entry.target.classList.add(
              "agir-visible"
            );

            observer.unobserve(
              entry.target
            );

          }

        });

      },

      {

        threshold: .05,

        rootMargin: "0px 0px -20px 0px"

      }

    );

    elements.forEach(element => {

      observer.observe(element);

    });

    /* Rendre visible une section ciblée
       directement depuis un lien. */

    function revealTarget() {

      const hash = window.location.hash;

      if (!hash) return;

      const target = document.getElementById(
        hash.slice(1)
      );

      if (!target) return;

      const section = target.closest(
        ".agir-reveal"
      );

      if (section) {

        section.classList.add(
          "agir-visible"
        );

        observer.unobserve(section);

      }

    }

    revealTarget();

    window.addEventListener(
      "hashchange",
      revealTarget
    );

  }
  /* =========================================
     EXPÉRIENCE IMMERSIVE — LES RENCONTRES
     ========================================= */
const immersiveEncounters = [

  /* RENCONTRE 01 — MAROC */

  {
    country: t(
      "🇲🇦 Maroc — Tanger",
      "🇲🇦 Marokko — Tanger"
    ),

    image: "agir-rencontre-01.png",

    alt: t(
      "Un chien craintif dans une ruelle marocaine",
      "Een angstige hond in een Marokkaans steegje"
    ),

    title: t(
      "Un regard au détour d'une ruelle.",
      "Een blik om de hoek van een steegje."
    ),

    description: t(
      "Vous vous promenez dans les petites ruelles de Tanger lorsqu'un chien attire votre attention. Il semble avoir faim, mais dès que vous avancez, il recule et baisse les oreilles. Vous avez quelques croquettes dans votre sac.",
      "Je wandelt door de kleine steegjes van Tanger wanneer een hond je aandacht trekt. Hij lijkt honger te hebben, maar zodra je dichterbij komt, deinst hij achteruit en laat hij zijn oren zakken. Je hebt enkele brokjes in je tas."
    ),

    answers: [

      {
        text: t(
          "M'approcher doucement pour essayer de le caresser.",
          "Voorzichtig dichterbij komen om hem te aaien."
        ),

        explanation: t(
          "Même avec de bonnes intentions, une approche directe peut effrayer un animal craintif. Il pourrait se sentir menacé et réagir pour se protéger.",
          "Zelfs met goede bedoelingen kan een directe benadering een angstig dier afschrikken. Het kan zich bedreigd voelen en reageren om zichzelf te beschermen."
        )
      },

      {
        text: t(
          "Déposer quelques croquettes dans un endroit sûr, puis reculer.",
          "Enkele brokjes op een veilige plek neerleggen en daarna afstand nemen."
        ),

        explanation: t(
          "En respectant sa distance, vous lui permettez de manger sans se sentir menacé. Respectez également les règles locales de nourrissage et évitez tout contact direct.",
          "Door voldoende afstand te bewaren, kan het dier eten zonder zich bedreigd te voelen. Respecteer ook de lokale regels voor het voederen en vermijd rechtstreeks contact."
        )
      },

      {
        text: t(
          "Le suivre jusqu'à ce qu'il accepte ma présence.",
          "Hem volgen totdat hij mijn aanwezigheid aanvaardt."
        ),

        explanation: t(
          "Suivre un animal qui cherche à s'éloigner peut augmenter son stress. Il est important de toujours lui laisser une possibilité de partir.",
          "Een dier volgen dat probeert weg te gaan, kan zijn stress vergroten. Het is belangrijk om het altijd de mogelijkheid te geven om weg te gaan."
        )
      }

    ],

    correct: 1

  },


  /* RENCONTRE 02 — TUNISIE */

  {
    country: t(
      "🇹🇳 Tunisie — Djerba",
      "🇹🇳 Tunesië — Djerba"
    ),

    image: "agir-rencontre-02.png",

    alt: t(
      "Un chat errant cherchant de l'ombre pendant une journée chaude",
      "Een zwerfkat die tijdens een warme dag schaduw zoekt"
    ),

    title: t(
      "Sous le soleil de Djerba.",
      "Onder de zon van Djerba."
    ),

    description: t(
      "Il fait très chaud aujourd'hui. Près d'une terrasse, vous apercevez un petit chat à la recherche d'un peu d'ombre. Vous avez une bouteille d'eau et un récipient propre dans votre sac.",
      "Het is vandaag erg warm. Bij een terras zie je een kleine kat die op zoek is naar wat schaduw. Je hebt een fles water en een schoon bakje in je tas."
    ),

    answers: [

      {
        text: t(
          "Lui acheter du lait pour lui faire plaisir.",
          "Melk kopen om de kat te verwennen."
        ),

        explanation: t(
          "Le lait de vache peut provoquer des troubles digestifs chez les chats. L'eau potable reste la meilleure boisson pour les hydrater.",
          "Koemelk kan spijsverteringsproblemen veroorzaken bij katten. Schoon drinkwater blijft de beste keuze om hen voldoende vocht te geven."
        )
      },

      {
        text: t(
          "Verser directement un peu d'eau dans sa bouche.",
          "Een beetje water rechtstreeks in zijn bek gieten."
        ),

        explanation: t(
          "Il ne faut jamais forcer un animal à boire. Cela peut provoquer une fausse route et augmenter son stress.",
          "Je mag een dier nooit dwingen om te drinken. Het kan zich hierdoor verslikken en meer stress ervaren."
        )
      },

      {
        text: t(
          "Déposer une gamelle d'eau propre à l'ombre et le laisser boire.",
          "Een bakje schoon drinkwater in de schaduw plaatsen en de kat rustig laten drinken."
        ),

        explanation: t(
          "Une gamelle d'eau potable, placée dans un endroit calme et ombragé, est un geste simple et utile. Si l'animal semble très faible ou respire difficilement, demandez une aide vétérinaire urgente.",
          "Een bakje drinkwater op een rustige, schaduwrijke plek is een eenvoudig en nuttig gebaar. Als het dier erg zwak lijkt of moeilijk ademt, vraag dan dringend hulp aan een dierenarts."
        )
      }

    ],

    correct: 2

  },


  /* RENCONTRE 03 — SICILE */

  {
    country: t(
      "🇮🇹 Italie — Sicile",
      "🇮🇹 Italië — Sicilië"
    ),

    image: "agir-rencontre-03.png",

    alt: t(
      "Un petit chaton seul près d'un mur en pierre",
      "Een klein kitten dat alleen bij een stenen muur zit"
    ),

    title: t(
      "Une toute petite âme.",
      "Een piepklein zieltje."
    ),

    description: t(
      "Au détour d'une rue sicilienne, vous entendez un petit miaulement. Un chaton est installé près d'un mur, dans un endroit abrité. Il semble seul, mais vous ne savez pas où se trouve sa mère.",
      "In een Siciliaans straatje hoor je plots een zacht gemiauw. Een kitten zit op een beschutte plek bij een muur. Het lijkt alleen te zijn, maar je weet niet waar zijn moeder is."
    ),

    answers: [

      {
        text: t(
          "Observer à distance et demander conseil à une association locale.",
          "Vanop een afstand observeren en advies vragen aan een lokale dierenorganisatie."
        ),

        explanation: t(
          "Un chaton seul n'est pas forcément abandonné. Sa mère peut être partie chercher de la nourriture. Une association ou un vétérinaire pourra vous conseiller. Si le petit est faible, froid, blessé ou en danger, demandez une aide urgente.",
          "Een kitten dat alleen is, is niet noodzakelijk achtergelaten. De moeder kan op zoek zijn naar voedsel. Een dierenorganisatie of dierenarts kan je adviseren. Vraag dringend hulp als het kitten zwak, koud, gewond of in gevaar is."
        )
      },

      {
        text: t(
          "Le prendre immédiatement pour le ramener à mon hôtel.",
          "Het kitten onmiddellijk meenemen naar mijn hotel."
        ),

        explanation: t(
          "Séparer trop rapidement un chaton de sa mère peut compromettre ses chances de survie. Il est préférable d'évaluer la situation avec un professionnel.",
          "Een kitten te snel van zijn moeder scheiden kan zijn overlevingskansen verkleinen. Het is beter om de situatie samen met een deskundige te beoordelen."
        )
      },

      {
        text: t(
          "Lui donner du lait de vache pour le nourrir.",
          "Het kitten koemelk geven."
        ),

        explanation: t(
          "Les chatons non sevrés ont besoin d'un lait maternisé spécifique. Le lait de vache ne répond pas à leurs besoins et peut provoquer des troubles digestifs.",
          "Kittens die nog niet gespeend zijn, hebben speciale kittenmelk nodig. Koemelk voldoet niet aan hun behoeften en kan spijsverteringsproblemen veroorzaken."
        )
      }

    ],

    correct: 0

  },


  /* RENCONTRE 04 — TURQUIE */

  {
    country: t(
      "🇹🇷 Turquie — Istanbul",
      "🇹🇷 Turkije — Istanbul"
    ),

    image: "agir-rencontre-04.png",

    alt: t(
      "Un chat errant blessé à une patte, installé dans un endroit calme",
      "Een zwerfkat met een gewonde poot op een rustige plek"
    ),

    title: t(
      "Quand un regard demande de l'aide.",
      "Wanneer een blik om hulp vraagt."
    ),

    description: t(
      "Dans une rue d'Istanbul, vous remarquez un chat qui boite. Il reste dans un coin tranquille et semble souffrir. Vous aimeriez le soulager, mais vous ne connaissez pas la gravité de sa blessure.",
      "In een straat in Istanbul merk je een kat op die mank loopt. De kat blijft in een rustig hoekje en lijkt pijn te hebben. Je wilt graag helpen, maar je weet niet hoe ernstig de verwonding is."
    ),

    answers: [

      {
        text: t(
          "Lui donner un antidouleur que j'ai dans mon sac.",
          "De kat een pijnstiller geven die ik in mijn tas heb."
        ),

        explanation: t(
          "Les médicaments destinés aux humains peuvent être extrêmement dangereux pour les animaux. Le paracétamol, notamment, est particulièrement toxique pour les chats.",
          "Geneesmiddelen voor mensen kunnen uiterst gevaarlijk zijn voor dieren. Vooral paracetamol is bijzonder giftig voor katten."
        )
      },

      {
        text: t(
          "Noter sa localisation et contacter un vétérinaire ou une association.",
          "De locatie noteren en contact opnemen met een dierenarts of dierenorganisatie."
        ),

        explanation: t(
          "C'est le réflexe le plus prudent. Une localisation précise et une photographie prise à distance peuvent faciliter l'intervention. Suivez les conseils des professionnels avant toute manipulation.",
          "Dit is de verstandigste keuze. Een exacte locatie en een foto vanop afstand kunnen de hulpverlening vergemakkelijken. Volg het advies van deskundigen voordat je het dier aanraakt of verplaatst."
        )
      },

      {
        text: t(
          "Essayer de nettoyer sa blessure et de le porter moi-même.",
          "Zelf proberen de wonde schoon te maken en de kat op te tillen."
        ),

        explanation: t(
          "Un animal blessé peut mordre ou griffer par douleur. Une manipulation inadaptée peut également aggraver sa blessure. Demandez d'abord un avis professionnel.",
          "Een gewond dier kan uit pijn bijten of krabben. Een verkeerde handeling kan de verwonding ook verergeren. Vraag eerst professioneel advies."
        )
      }

    ],

    correct: 1

  },


  /* RENCONTRE 05 — ALBANIE */

  {
    country: t(
      "🇦🇱 Albanie — Tirana",
      "🇦🇱 Albanië — Tirana"
    ),

    image: "agir-rencontre-05.png",

    alt: t(
      "Un chien errant à proximité d'une route fréquentée",
      "Een zwerfhond in de buurt van een drukke weg"
    ),

    title: t(
      "Quelques secondes pour réfléchir.",
      "Enkele seconden om na te denken."
    ),

    description: t(
      "Vous apercevez un chien désorienté à proximité d'une route fréquentée. Les voitures passent régulièrement et vous craignez qu'il traverse. Vous voulez l'aider avant qu'un accident ne se produise.",
      "Je ziet een gedesoriënteerde hond in de buurt van een drukke weg. Er rijden voortdurend auto's voorbij en je bent bang dat hij zal oversteken. Je wilt hem helpen voordat er een ongeval gebeurt."
    ),

    answers: [

      {
        text: t(
          "Courir vers lui pour l'attraper avant qu'il traverse.",
          "Naar hem toe rennen om hem te vangen voordat hij oversteekt."
        ),

        explanation: t(
          "Courir vers un chien peut l'effrayer et le pousser vers la circulation. Vous risquez également de provoquer un accident ou de vous blesser.",
          "Naar een hond toe rennen kan hem afschrikken en richting het verkeer jagen. Je loopt bovendien het risico een ongeval te veroorzaken of zelf gewond te raken."
        )
      },

      {
        text: t(
          "Me placer au milieu de la route pour arrêter les voitures.",
          "Midden op de weg gaan staan om de auto's tegen te houden."
        ),

        explanation: t(
          "Une intervention au milieu de la circulation peut mettre plusieurs vies en danger. Votre sécurité doit également être préservée.",
          "Een interventie midden in het verkeer kan meerdere levens in gevaar brengen. Ook jouw veiligheid moet beschermd worden."
        )
      },

      {
        text: t(
          "Rester dans un endroit sûr et contacter les services compétents.",
          "Op een veilige plek blijven en de bevoegde diensten contacteren."
        ),

        explanation: t(
          "Vous pouvez aider sans vous exposer au danger. Communiquez une localisation précise, décrivez la situation et suivez les instructions des intervenants.",
          "Je kunt helpen zonder jezelf in gevaar te brengen. Geef de exacte locatie door, beschrijf de situatie en volg de instructies van de hulpverleners."
        )
      }

    ],

    correct: 2

  }

];

    /* =========================================
     EXPÉRIENCE IMMERSIVE — FONCTIONNEMENT
     ========================================= */

  let immersiveIndex = 0;

  let immersiveScore = 0;

  let immersiveAnswered = false;

  const immersiveTotal = immersiveEncounters.length;


  /* CHANGEMENT D'ÉCRAN */

  function showImmersiveScreen(screen) {

    const screens = [

      "immersive-start",

      "immersive-game",

      "immersive-result"

    ];

    screens.forEach(id => {

      $(id).hidden = id !== screen;

    });

  }


  /* BARRE DE PROGRESSION */

  function updateImmersiveProgress(completed) {

    const percentage =
      completed / immersiveTotal * 100;

    $("immersive-fill").style.width =
      `${percentage}%`;

    $("immersive-progress").setAttribute(
      "aria-valuemax",
      immersiveTotal
    );

    $("immersive-progress").setAttribute(
      "aria-valuenow",
      completed
    );

  }


  /* AFFICHER UNE RENCONTRE */

  function renderImmersiveEncounter() {

    immersiveAnswered = false;

    const encounter =
      immersiveEncounters[immersiveIndex];

  $("immersive-position").textContent = t(
  `Rencontre ${immersiveIndex + 1}/${immersiveTotal}`,
  `Ontmoeting ${immersiveIndex + 1}/${immersiveTotal}`
);
    $("immersive-country").textContent =
      encounter.country;

    $("immersive-title").textContent =
      encounter.title;

    $("immersive-description").textContent =
      encounter.description;


    /* Illustration */

    const image = $("immersive-image");

    image.hidden = true;

    image.alt = encounter.alt;

    image.onload = () => {

      image.hidden = false;

    };

    image.onerror = () => {

      image.hidden = true;

    };

    image.src = encounter.image;

    if (image.complete && image.naturalWidth > 0) {

      image.hidden = false;

    }


    /* Réinitialisation des explications */

    const feedback = $("immersive-feedback");

    feedback.hidden = true;

    feedback.classList.remove(

      "is-correct",

      "is-incorrect"

    );

    $("immersive-next").hidden = true;


    /* Création des réponses */

    const answers = $("immersive-answers");

    answers.replaceChildren();

    const letters = ["A", "B", "C"];

    encounter.answers.forEach((answer, index) => {

      const button = document.createElement(
        "button"
      );

      button.type = "button";

      button.className =
        "agir-immersive-answer";

      button.dataset.index = String(index);


      const letter = document.createElement(
        "span"
      );

      letter.className =
        "agir-immersive-answer-letter";

      letter.textContent = letters[index];

      letter.setAttribute(
        "aria-hidden",
        "true"
      );


      const text = document.createElement(
        "span"
      );

      text.textContent = answer.text;

      button.appendChild(letter);

      button.appendChild(text);

      button.addEventListener("click", () => {

        answerImmersiveEncounter(index);

      });

      answers.appendChild(button);

    });

    updateImmersiveProgress(immersiveIndex);

    $("immersive-title").focus({
      preventScroll: true
    });

  }


  /* COMMENCER L'AVENTURE */

  function startImmersiveAdventure() {

    immersiveIndex = 0;

    immersiveScore = 0;

    immersiveAnswered = false;

    showImmersiveScreen("immersive-game");

    renderImmersiveEncounter();

    scrollToImmersive();

  }


  /* DÉFILEMENT VERS L'EXPÉRIENCE */

  function scrollToImmersive() {

    const card = document.querySelector(
      ".agir-immersive-card"
    );

    if (!card) return;

    card.scrollIntoView({

      behavior: reducedMotion
        ? "auto"
        : "smooth",

      block: "start"

    });

  }


  /* VALIDATION D'UNE RÉPONSE */

  function answerImmersiveEncounter(selected) {

    if (immersiveAnswered) return;

    immersiveAnswered = true;

    const encounter =
      immersiveEncounters[immersiveIndex];

    const correct =
      selected === encounter.correct;

    if (correct) {

      immersiveScore++;

    }


    /* Couleurs des réponses */

    const buttons = document.querySelectorAll(
      ".agir-immersive-answer"
    );

    buttons.forEach((button, index) => {

      button.disabled = true;

      if (index === encounter.correct) {

        button.classList.add("is-correct");

        button.setAttribute(
          "aria-label",
    t(
  `${encounter.answers[index].text} — Bonne réponse`,
  `${encounter.answers[index].text} — Juist antwoord`
)
      }

      if (index === selected) {

        button.classList.add("is-selected");

        if (!correct) {

          button.classList.add("is-incorrect");

          button.setAttribute(
            "aria-label",
        t(
  `${encounter.answers[index].text} — Réponse incorrecte`,
  `${encounter.answers[index].text} — Onjuist antwoord`
)
          );

        }

      }

    });


    /* Explication pédagogique */

    const feedback = $("immersive-feedback");

    feedback.classList.add(

      correct

        ? "is-correct"

        : "is-incorrect"

    );

    $("immersive-feedback-symbol").textContent =

      correct ? "♡" : "✧";

 $("immersive-feedback-title").textContent =

  correct

    ? t(
        "Un très beau réflexe !",
        "Een heel mooie reactie!"
      )

    : t(
        "Une nouvelle chose à apprendre.",
        "Weer iets nieuws geleerd."
      );

    let explanation =
      encounter.answers[selected].explanation;

    if (!correct) {

 explanation +=

  t(
    " Le geste recommandé : ",
    " De aanbevolen handeling: "
  ) +

  encounter.answers[encounter.correct].text;

    $("immersive-explanation").textContent =
      explanation;

    feedback.hidden = false;


    /* Progression */

    updateImmersiveProgress(
      immersiveIndex + 1
    );


    /* Bouton suivant */

    const nextButton = $("immersive-next");

 nextButton.textContent =

  immersiveIndex === immersiveTotal - 1

    ? t(
        "Découvrir mon résultat ♡",
        "Mijn resultaat ontdekken ♡"
      )

    : t(
        "Rencontre suivante →",
        "Volgende ontmoeting →"
      );
    nextButton.hidden = false;

    nextButton.focus({
      preventScroll: true
    });

    feedback.scrollIntoView({

      behavior: reducedMotion
        ? "auto"
        : "smooth",

      block: "nearest"

    });

  }


  /* RENCONTRE SUIVANTE */

  function nextImmersiveEncounter() {

    if (!immersiveAnswered) return;

    if (immersiveIndex < immersiveTotal - 1) {

      immersiveIndex++;

      renderImmersiveEncounter();

      scrollToImmersive();

    } else {

      showImmersiveResult();

    }

  }


  /* RÉSULTAT FINAL */

function showImmersiveResult() {

  showImmersiveScreen("immersive-result");

  $("immersive-final-score").textContent =
    `${immersiveScore}/${immersiveTotal}`;

  let title = "";

  let message = "";


  if (immersiveScore === immersiveTotal) {

    title = t(
      "Le cœur d'un voyageur solidaire.",
      "Het hart van een betrokken reiziger."
    );

    message = t(
      "Vous avez choisi les cinq gestes recommandés. Votre bienveillance, votre prudence et votre respect des animaux peuvent faire une véritable différence lors de vos prochaines rencontres.",
      "Je hebt de vijf aanbevolen handelingen gekozen. Jouw zorgzaamheid, voorzichtigheid en respect voor dieren kunnen bij je volgende ontmoetingen echt een verschil maken."
    );

    createConfetti(50);

  } else if (immersiveScore >= 3) {

    title = t(
      "Un cœur rempli de bienveillance.",
      "Een hart vol liefde en zorgzaamheid."
    );

    message = t(
      "Vous connaissez déjà de nombreux gestes utiles. Les rencontres d'aujourd'hui vous ont également permis d'apprendre de nouveaux réflexes pour aider les animaux en toute sécurité.",
      "Je kent al heel wat nuttige handelingen. Dankzij de ontmoetingen van vandaag heb je ook nieuwe dingen geleerd om dieren op een veilige manier te helpen."
    );

    createConfetti(25);

  } else {

    title = t(
      "Chaque petit pas compte.",
      "Elke kleine stap telt."
    );

    message = t(
      "Aider un animal ne s'improvise pas toujours. L'essentiel est de vouloir apprendre, de respecter ses besoins et de savoir demander de l'aide. Chaque nouvelle connaissance peut changer une rencontre.",
      "Een dier helpen vraagt soms de nodige voorbereiding. Het belangrijkste is dat je wilt leren, zijn behoeften respecteert en weet wanneer je hulp moet vragen. Elke nieuwe kennis kan een ontmoeting veranderen."
    );

  }

  $("immersive-result-title").textContent =
    title;

  $("immersive-result-message").textContent =
    message;

  $("immersive-result-title").focus({
    preventScroll: true
  });

  scrollToImmersive();

}



  /* =========================================
     INITIALISATION DE L'EXPÉRIENCE
     ========================================= */

  function initializeImmersiveAdventure() {

    const requiredIds = [

      "immersive-start",
      "immersive-game",
      "immersive-result",
      "immersive-start-button",
      "immersive-position",
      "immersive-country",
      "immersive-progress",
      "immersive-fill",
      "immersive-image",
      "immersive-title",
      "immersive-description",
      "immersive-answers",
      "immersive-feedback",
      "immersive-feedback-symbol",
      "immersive-feedback-title",
      "immersive-explanation",
      "immersive-next",
      "immersive-final-score",
      "immersive-result-title",
      "immersive-result-message",
      "immersive-restart"

    ];

    if (!requiredIds.every(id => $(id))) {

      return;

    }

    $("immersive-start-button").addEventListener(

      "click",

      startImmersiveAdventure

    );

    $("immersive-next").addEventListener(

      "click",

      nextImmersiveEncounter

    );

    $("immersive-restart").addEventListener(

      "click",

      startImmersiveAdventure

    );

    showImmersiveScreen("immersive-start");

    updateImmersiveProgress(0);

  }

  initializeImmersiveAdventure();

  /* =========================================
     11 — INITIALISATION
     ========================================= */

  restorePacking();

  showQuizScreen("quiz-start-screen");

  initializeAnimations();


  /* =========================================
     FIN — CŒUR ERRANT
     Chaque animal a une histoire.
     ========================================= */

})();