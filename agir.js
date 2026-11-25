
/* =========================================
   CŒUR ERRANT
   À VOTRE TOUR D'AGIR
   agir.js
   ========================================= */

(function () {

  "use strict";

  const $ = id => document.getElementById(id);

  const page = document.querySelector(".agir-page");

  if (!page) return;

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const STORAGE_KEY = "coeur-errant-packing-v1";


  /* =========================================
     01 — LES SIX SITUATIONS
     ========================================= */

  const situations = {

    faim: {

      symbol: "♡",

      title: "Il a faim.",

      intro:
        "Offrir un repas à un animal errant peut être un beau geste. L'essentiel est de choisir une nourriture adaptée et de respecter sa tranquillité.",

      good: [

        "Choisissez des croquettes ou de la pâtée adaptées aux chiens ou aux chats.",

        "Déposez la nourriture dans un endroit calme, propre et éloigné de la circulation.",

        "Proposez une petite portion et laissez l'animal manger tranquillement.",

        "Éloignez-vous suffisamment pour qu'il puisse s'approcher sans crainte.",

        "Respectez les règles locales concernant le nourrissage des animaux."

      ],

      bad: [

        "Donner du chocolat, de l'oignon, de l'ail ou des os cuits.",

        "Donner des aliments avariés ou très assaisonnés.",

        "Nourrir directement à la main un animal inconnu.",

        "Laisser des emballages ou des restes de nourriture sur place."

      ],

      note:
        "Un animal extrêmement maigre, faible ou incapable de manger peut nécessiter une prise en charge vétérinaire. Ne le forcez pas à manger."

    },


    soif: {

      symbol: "💧",

      title: "Il a soif.",

      intro:
        "L'accès à une eau propre peut être difficile pour les animaux qui vivent dehors, particulièrement pendant les périodes de forte chaleur.",

      good: [

        "Proposez de l'eau potable dans un récipient propre et stable.",

        "Placez la gamelle à l'ombre, loin des routes.",

        "Laissez l'animal boire à son rythme.",

        "Renouvelez l'eau régulièrement si vous restez sur place."

      ],

      bad: [

        "Remplacer l'eau par du lait ou une boisson sucrée.",

        "Forcer l'animal à boire.",

        "Verser de l'eau directement dans sa bouche.",

        "Laisser un récipient sale ou dangereux."

      ],

      note:
        "Un animal qui s'effondre, respire difficilement ou semble souffrir d'un coup de chaleur nécessite une aide vétérinaire urgente."

    },


    peur: {

      symbol: "♡",

      title: "Il a peur.",

      intro:
        "Un animal craintif ne connaît pas vos intentions. Respecter sa distance est parfois la meilleure manière de lui venir en aide.",

      good: [

        "Observez son comportement à distance.",

        "Restez calme et évitez les mouvements brusques.",

        "Laissez toujours une possibilité à l'animal de s'éloigner.",

        "Si vous souhaitez lui offrir de la nourriture, déposez-la puis reculez.",

        "Acceptez qu'il ne souhaite pas s'approcher."

      ],

      bad: [

        "Courir derrière lui.",

        "Le coincer contre un mur ou dans un passage étroit.",

        "Tenter de le caresser ou de le porter de force.",

        "Laisser un enfant s'approcher seul d'un animal inconnu."

      ],

      note:
        "Dans les régions où la rage circule, évitez tout contact direct avec les animaux errants, même lorsqu'ils semblent affectueux."

    },


    blesse: {

      symbol: "✚",

      title: "Il est blessé.",

      intro:
        "Face à un animal blessé ou malade, votre rôle est avant tout de chercher une aide adaptée sans aggraver sa situation.",

      good: [

        "Observez l'animal depuis un endroit sûr.",

        "Notez précisément sa localisation.",

        "Prenez une photographie à distance si cela peut faciliter son identification.",

        "Contactez un vétérinaire, une association locale ou un service compétent.",

        "Suivez les instructions des professionnels avant toute manipulation."

      ],

      bad: [

        "Administrer des médicaments humains.",

        "Essayer de soigner une blessure grave sans connaissances vétérinaires.",

        "Déplacer un animal blessé sans avis professionnel lorsque cela peut être évité.",

        "Toucher une plaie ou du sang à mains nues."

      ],

      note:
        "Même un animal habituellement calme peut mordre lorsqu'il souffre. Une difficulté respiratoire, une perte de connaissance ou un saignement important constitue une urgence vétérinaire."

    },


    bebe: {

      symbol: "♡",

      title: "Il est tout petit.",

      intro:
        "Un chaton ou un chiot aperçu seul n'est pas nécessairement abandonné. Sa mère peut être partie chercher de la nourriture.",

      good: [

        "Observez la situation à distance, si l'environnement est sûr.",

        "Vérifiez si une mère ou d'autres petits se trouvent à proximité.",

        "Contactez rapidement une association ou un vétérinaire pour obtenir des conseils.",

        "Demandez une intervention urgente si le petit est froid, blessé, très faible ou exposé à un danger immédiat."

      ],

      bad: [

        "Séparer automatiquement un petit de sa mère.",

        "Donner du lait de vache.",

        "Forcer un bébé animal à boire ou à manger.",

        "Improviser un nourrissage sans connaître son âge et ses besoins."

      ],

      note:
        "Les nouveau-nés sont particulièrement fragiles. Leur alimentation et leur température nécessitent des soins spécifiques et des conseils professionnels."

    },


    danger: {

      symbol: "!",

      title: "Il est en danger.",

      intro:
        "Vouloir protéger un animal est naturel. Mais votre sécurité et celle des personnes autour de vous doivent également être préservées.",

      good: [

        "Identifiez le danger depuis un endroit sûr.",

        "Contactez les services locaux compétents.",

        "Communiquez une localisation précise et décrivez la situation.",

        "Restez disponible pour guider les intervenants si cela ne présente aucun risque.",

        "En cas de maltraitance, signalez les faits aux autorités compétentes."

      ],

      bad: [

        "Courir sur une route fréquentée pour attraper un animal.",

        "Entrer dans un bâtiment dangereux ou sur une propriété privée sans autorisation.",

        "Confronter directement une personne violente.",

        "Tenter une intervention risquée sans matériel ni formation."

      ],

      note:
        "Les services de secours et de protection animale varient selon les pays. Renseignez-vous avant votre départ sur les contacts locaux."

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

  let storageAvailable = true;


  function loadPacking() {

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

      return [];

    }

  }


  function savePacking() {

    const checked = packingInputs

      .filter(input => input.checked)

      .map(input => input.dataset.packing);

    try {

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(checked)
      );

      storageAvailable = true;

    } catch (error) {

      storageAvailable = false;

    }

  }


  function updatePacking() {

    const count = packingInputs.filter(
      input => input.checked
    ).length;

    const percentage =
      count / packingTotal * 100;

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
      count === packingTotal
    );

    let message = "";

    if (count === 0) {

      message =
        "Chaque préparation commence par un premier petit geste.";

    } else if (count <= 2) {

      message =
        "Les premiers essentiels sont prêts. ♡";

    } else if (count <= 4) {

      message =
        "Votre petite valise prend forme.";

    } else if (count < packingTotal) {

      message =
        "Encore quelques préparatifs avant de partir.";

    } else {

      message =
        "Votre valise solidaire est prête ! Emportez votre bienveillance partout avec vous. ♡";

    }

    if (!storageAvailable) {

      message +=
        " La sauvegarde automatique est actuellement indisponible.";

    }

    $("packing-message").textContent = message;

  }


  function restorePacking() {

    const saved = loadPacking();

    packingInputs.forEach(input => {

      input.checked = saved.includes(
        input.dataset.packing
      );

    });

    updatePacking();

  }


  packingInputs.forEach(input => {

    input.addEventListener("change", () => {

      savePacking();

      updatePacking();

      const complete = packingInputs.every(
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


  /* Synchronisation entre plusieurs onglets */

  window.addEventListener("storage", event => {

    if (

      event.key === STORAGE_KEY ||

      event.key === null

    ) {

      restorePacking();

    }

  });


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

  });


  /* =========================================
     06 — QUESTIONS DU QUIZ
     ========================================= */

  const questions = [

    {

      question:
        "Le lait de vache est la meilleure boisson pour un chat errant.",

      answer: false,

      explanation:
        "De nombreux chats digèrent mal le lactose. Une gamelle d'eau propre est préférable. Les chatons non sevrés nécessitent une alimentation spécifique."

    },

    {

      question:
        "Il vaut mieux laisser un animal craintif s'approcher à son rythme.",

      answer: true,

      explanation:
        "Respecter sa distance et lui laisser une possibilité de s'éloigner permet de réduire son stress et les risques de morsure ou de griffure."

    },

    {

      question:
        "Un animal qui se promène seul dans la rue est forcément abandonné.",

      answer: false,

      explanation:
        "Il peut avoir un propriétaire, être nourri par des habitants ou appartenir à une communauté d'animaux vivant librement."

    },

    {

      question:
        "Le chocolat peut être dangereux pour les chiens et les chats.",

      answer: true,

      explanation:
        "Le chocolat contient notamment de la théobromine, une substance toxique pour les chiens et les chats."

    },

    {

      question:
        "On peut donner du paracétamol à un animal blessé pour soulager sa douleur.",

      answer: false,

      explanation:
        "Le paracétamol peut provoquer une intoxication grave, particulièrement chez les chats. Aucun médicament ne doit être donné sans avis vétérinaire."

    },

    {

      question:
        "Un chaton aperçu seul peut avoir une mère qui se trouve à proximité.",

      answer: true,

      explanation:
        "Sa mère peut être partie chercher de la nourriture. Lorsque la situation est sûre, observez à distance et demandez conseil avant de déplacer le petit."

    },

    {

      question:
        "Il faut toujours courir après un animal qui traverse une route dangereuse.",

      answer: false,

      explanation:
        "Une intervention précipitée peut provoquer un accident ou effrayer davantage l'animal. Contactez les services compétents depuis un endroit sûr."

    },

    {

      question:
        "Après une morsure ou une griffure, il faut nettoyer la plaie et demander rapidement un avis médical.",

      answer: true,

      explanation:
        "Lavez immédiatement la plaie à l'eau et au savon pendant au moins 15 minutes. Consultez rapidement un professionnel de santé, notamment pour évaluer le risque de rage et de tétanos."

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

        ? "1 bonne réponse"

        : `${score} bonnes réponses`;

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

    $("quiz-position").textContent =
      `Question ${currentQuestion + 1}/${quizTotal}`;

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

        ? "Bonne réponse ! ♡"

        : "Un nouveau réflexe à retenir.";

    $("quiz-explanation").textContent =
      question.explanation;

    feedback.hidden = false;

    updateQuizScore();

    updateQuizProgress(currentQuestion + 1);

    const nextButton = $("next-question");

    nextButton.textContent =

      currentQuestion === quizTotal - 1

        ? "Découvrir mon résultat ♡"

        : "Question suivante →";

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

      title = "Un cœur bien préparé !";

      message =
        "Bravo ! Vous connaissez les huit bons réflexes de ce quiz. Continuez à agir avec douceur, respect et prudence.";

      createConfetti(60);

    } else if (score >= 6) {

      title = "De très beaux réflexes !";

      message =
        "Vous connaissez déjà beaucoup de gestes utiles. Quelques nouvelles connaissances vous accompagneront lors de vos prochaines rencontres.";

      createConfetti(25);

    } else if (score >= 4) {

      title = "Chaque apprentissage compte.";

      message =
        "Vous avez acquis de nouveaux réflexes. N'hésitez pas à relire les conseils et à recommencer le quiz.";

    } else {

      title = "Un premier pas vers demain.";

      message =
        "Personne ne connaît tous les bons gestes dès le départ. L'important est d'apprendre et de savoir demander de l'aide lorsque c'est nécessaire.";

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

  }


  /* =========================================
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

        "Les petits gestes",

        600,

        365

      );

      ctx.fillStyle = "#a85e68";

      ctx.font =
        "italic 400 72px 'Cormorant Garamond', Georgia, serif";

      ctx.fillText(

        "qui comptent.",

        600,

        440

      );


      /* Sous-titre */

      ctx.fillStyle = "#80736b";

      ctx.font = "400 25px Jost, sans-serif";

      ctx.fillText(

        "Le guide du voyageur solidaire",

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

          title: "Observer avant d'approcher",

          text:
            "Respectez le comportement de l'animal et son environnement."

        },

        {

          title: "Respecter les distances",

          text:
            "Ne forcez jamais le contact avec un animal inconnu."

        },

        {

          title: "Proposer de l'eau propre",

          text:
            "Déposez une gamelle dans un endroit calme et sûr."

        },

        {

          title: "Choisir une nourriture adaptée",

          text:
            "Privilégiez les aliments conçus pour les chiens ou les chats."

        },

        {

          title: "Savoir demander de l'aide",

          text:
            "Contactez un vétérinaire ou une association locale si nécessaire."

        },

        {

          title: "Ne jamais se mettre en danger",

          text:
            "Votre sécurité compte aussi. Faites appel aux services compétents."

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

        "Conseils généraux. Respectez les règles locales et demandez un avis vétérinaire en cas de doute.",

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

        "Chaque animal a une histoire.",

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

      link.download =
        "Coeur-Errant-Guide-Solidaire.png";

      document.body.appendChild(link);

      link.click();

      link.remove();

      window.setTimeout(() => {

        URL.revokeObjectURL(url);

      }, 10000);

      message.textContent =
        "Votre fiche est prête ! Vérifiez vos téléchargements. ♡";

      createConfetti(20);

    } catch (error) {

      console.error(

        "Erreur de création du guide :",

        error

      );

      message.textContent =
        "La fiche n'a pas pu être créée. Vous pouvez réessayer ou conserver une capture de son aperçu.";

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
