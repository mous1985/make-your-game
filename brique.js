// let tabScore = {
//   position: 1,
//   pseudo: "guibar",
//   score: 0 + "Pts",
//   temps: 0,
// };
// tabScore.pseudo = "Mus";
// let convTabScore = JSON.stringify(tabScore);
// console.log(convTabScore);
let secondes = 0;
let minutes = 0;
let heures = 0;
let funcTime = () => {
  secondes++;
  if (secondes === 60) {
    //timer
    minutes++;
    secondes = 0;
  }
  if (minutes === 60) {
    heures++;
    minutes = 0;
  }
};

let rightPressed = false; // booleen pour gerer le deplacement barre
let leftPressed = false; //""               ""
let lanceBalle = false; //lancer la balle
let lanceInit = false; //dire que la balle est bien lancee

let reprendrePause = false; //pour distinguer si on recommence depuis la pause ou apres la fin de partie
let vies = 3;
let countScore = 0;
let tps; //variable pour le set interval
let niveau = 1;
let vitesseBarre = 15;
let countBool = false; // pour reprendre et arreter le compteur pendant les pauses
let countTap = 0; // "                ""
let countPause = 0; // compteur si paire pause si impair enleve la pause
let autorisationLancer = true;
let niv = document.getElementById("niv");
let nivAff = document.getElementById("nivAff");
let vieAff = document.getElementById("vies");
let pseudo = document.getElementById("pseudo");
let boutForm = document.getElementById("boutForm");
let valeurPseudo = document.getElementById("entrerPseudo");
let score = document.getElementById("score");
let pauseAff = document.getElementById("pauseAff");
let recommencer = document.getElementById("recommencer");
let reprendre = document.getElementById("reprendre");
let selectDiff = document.getElementById("difficulte");
let fpsAff = document.getElementById("fps");
let essai; //variable de animation frame
let finVies = false;
let diffChoix; //choix de difficulte
let tempsJeu = document.getElementById("temps");
let affPause = document.getElementById("affPause");
let jeu = new ClsEspaceJeu();
let balle = new ClsBall("balle", 30, 0, 600, 600, 45);
let barre = new ClsBarre("barre", 150, 15, 600, 700);
const times = [];
let fps;

function refreshLoop() {
  window.requestAnimationFrame(() => {
    const now = performance.now();
    while (times.length > 0 && times[0] <= now - 1000) {
      times.shift();
    }
    times.push(now);
    fps = times.length;
    fpsAff.textContent = fps + "FPS";
    refreshLoop();
  });
}

refreshLoop();

let espaceBrique = new ClsEspaceBrique("espaceBrique", 1400, 200, 0, 0, 2, 6);

affPause.textContent = "PAUSE";

let i = 0;

if (niveau === 1) {
  for (line = 1; line < espaceBrique.ligne; line++) {
    for (col = 1; col < espaceBrique.colonne; col++) {
      let brique = new ClsBrique("brique" + i, "brique", 200, 50, 0, 100); //NIVEAU 1

      brique.changePosition(brique.largeur * col, brique.hauteur * line);

      i++;
    }
  }
}
boutForm.addEventListener("click", () => {
  pseudo.innerText = valeurPseudo.value;
  diffChoix = selectDiff.options[selectDiff.selectedIndex].value;
});
niv.addEventListener("click", () => {
  if (niveau === 2) {
    autorisationLancer = true;
    for (line = 1; line < espaceBrique.ligne; line++) {
      for (col = 1; col < espaceBrique.colonne; col++) {
        let brique = new ClsBrique("brique" + i, "brique", 200, 50, 0, 0); //NIVEAU 2
        //mettre les conditions ici selon la difficulte
        espaceBrique.colonne = 6;
        espaceBrique.ligne = 4;

        // brique.largeur = 100;
        // brique.hauteur = 50;
        brique.changePosition(brique.largeur * col, brique.hauteur * line);
        if (i === 1 || i === 3 || i === 5 || i === 9) {
          let essai = document.getElementById("brique" + i);
          essai.className = "brique1";
        }

        i++;

        niv.style.visibility = "hidden";
      }
    }
  }
});
niv.addEventListener("click", () => {
  if (niveau === 3) {
    autorisationLancer = true;
    // console.log("niv3");
    espaceBrique.colonne = 6;
    espaceBrique.ligne = 5;
    for (line = 1; line < espaceBrique.ligne; line++) {
      for (col = 1; col < espaceBrique.colonne; col++) {
        let brique = new ClsBrique("brique" + i, "brique", 200, 50, 0, 0); //NIVEAU 3

        brique.changePosition(brique.largeur * col, brique.hauteur * line);
        if (i === 0 || i === 4 || i === 6 || i === 8 || i === 10 || i === 14) {
          let essai = document.getElementById("brique" + i);
          essai.className = "brique1";
        }

        i++;

        niv.style.visibility = "hidden";
      }
    }
  }
});
recommencer.addEventListener("click", () => {
  countPause = 0;
  autorisationLancer = true;

  let element1 = document.querySelectorAll(`[class="brique"]`);
  let incassable = document.querySelectorAll(`[class="brique1"]`);

  pauseAff.style.visibility = "hidden";

  if (reprendrePause === true) {
    requestAnimationFrame(animation);
  }

  for (i = 0; i < incassable.length; i++) {
    incassable[i].remove();
  }
  for (i = 0; i < element1.length; i++) {
    element1[i].remove();
  }

  for (line = 1; line < espaceBrique.ligne; line++) {
    for (col = 1; col < espaceBrique.colonne; col++) {
      let brique = new ClsBrique("brique" + i, "brique", 200, 50, 0, 100); //NIVEAU 1

      brique.changePosition(brique.largeur * col, brique.hauteur * line);

      i++;
    }
    lanceInit = false;
    vies = 3;
    countScore = 0;
    niveau = 1;
    niv.style.visibility = "hidden";
    reprendre.style.visibility = "hidden";
    // countTap = 0;
  }
});
reprendre.addEventListener("click", () => {
  countPause++;
  pauseAff.style.visibility = "hidden";
  countTap = 1;
  countBool = true;
  reprendre.style.visibility = "hidden";
  requestAnimationFrame(animation);
  if (countBool === true && countTap === 1) {
    tps = setInterval(funcTime, 1000);
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") {
    leftPressed = true;
  }
  if (e.key === "ArrowRight") {
    rightPressed = true;
  }
  if (e.key == " " && autorisationLancer == true) {
    lanceBalle = true;
  }
});
document.addEventListener("keyup", (e) => {
  if (e.key == "ArrowLeft") {
    leftPressed = false;
  } else if (e.key == "ArrowRight") {
    rightPressed = false;
  } else if (e.key == " " && autorisationLancer === true) {
    lanceBalle = false;
    countTap++;
    countBool = true;
    if (countBool === true && countTap === 1) {
      tps = setInterval(funcTime, 1000);
    }

    lanceInit = true;
  } else if (e.key == "p" && countPause % 2 === 0) {
    countPause++;
    pauseAff.style.visibility = "visible";
    reprendre.style.visibility = "visible";
    affPause.textContent = "Pause :  Cliquez sur la fenetre ou réappuyez sur P";
    countBool = false;
    countTap = 0;
    reprendrePause = true;

    clearInterval(tps);
    cancelAnimationFrame(essai);

    //sensible ne marche que en appliquant a une variable le requestframe
  } else if (e.key == "p" && countPause % 2 != 0) {
    countPause++;
    pauseAff.style.visibility = "hidden";
    reprendre.style.visibility = "hidden";

    countTap = 1;
    countBool = true;
    requestAnimationFrame(animation);
    if (countBool === true && countTap === 1) {
      tps = setInterval(funcTime, 1000);
    }

    //sensible ne marche que en appliquant a une variable le requestframe
  }
});

function animation() {
  balle.posInit();
  // console.log(balle.vitesse, "vitesse");

  // console.log(diffChoix, "diffchoix");
  // console.log(balle.left + 25, "left");
  // console.log(Math.round(balle.top / 100) * 100, "top");
  nivAff.textContent = "Niveau " + niveau;
  niv.textContent = "Niveau " + niveau + " Cliquez ici";
  vieAff.textContent = "Vies : " + vies;
  score.textContent = "Score : " + countScore * 100 + " POINTS";
  tempsJeu.textContent = heures + " H " + minutes + " min " + secondes + " sec";
  // console.log(barre.left + barre.largeur / 5, "barre coupe");
  // console.log(barre.left + barre.largeur - barre.largeur / 5, " barre 4/5");
  // console.log(lanceBalle, "lanceballe");
  // console.log(lanceInit, "lanceinit");
  balle.deplacementBalle(balle.calculAngle);
  balle.lancementBalle();
  balle.collisionEspace();
  balle.collisionBrique();
  balle.vitesseBalle();

  barre.moveClav(rightPressed, leftPressed);
  essai = requestAnimationFrame(animation);
}
animation();
