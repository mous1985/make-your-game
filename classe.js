class ClsEspaceJeu {
  constructor() {
    this.jeuHTML = document.getElementById("jeu");

    this.largeur = this.jeuHTML.getBoundingClientRect().width;
    this.hauteur = this.jeuHTML.getBoundingClientRect().height;
    this.left = this.jeuHTML.getBoundingClientRect().x;
    this.top = this.jeuHTML.getBoundingClientRect().y;
    this.right = this.jeuHTML.getBoundingClientRect().right;
    this.bottom = this.jeuHTML.getBoundingClientRect().bottom;
    // console.log(this.bottom);
    // console.log(this.right);
    // console.log(this.left);
  }
}
class ClsEspaceBrique extends ClsEspaceJeu {
  constructor(id, largeur, hauteur, abs, ord, ligne, colonne) {
    super();
    this.id = id;
    this.largeur = largeur;
    this.hauteur = hauteur;
    this.left = abs;
    this.top = ord;
    this.ligne = ligne;
    this.colonne = colonne;
    this.espacebriqueHTML = document.createElement("div");
    this.espacebriqueHTML.id = this.id;
    this.espacebriqueHTML.style.width = this.largeur + "px";
    this.espacebriqueHTML.style.height = this.hauteur + "px";
    this.espacebriqueHTML.style.left = this.left + "px";
    this.espacebriqueHTML.style.top = this.top + "px";
    jeu.jeuHTML.append(this.espacebriqueHTML);
  }
  // initBrique() {
  //   let element1 = document.querySelectorAll(`[id^="brique"]`);
  //   if (element1.length === 0) {
  //     niv1 = false;
  //     niv2 = true;
  //   }
  // }
}
class ClsBrique extends ClsEspaceBrique {
  constructor(id, classe, largeur, hauteur, abs, ord) {
    super();
    this.id = id;

    this.classe = classe;
    this.largeur = largeur;
    this.hauteur = hauteur;

    this.left = abs;
    this.top = ord;

    this.briqueHTML = document.createElement("div");
    this.briqueHTML.id = this.id;
    this.briqueHTML.className = this.classe;

    this.briqueHTML.style.width = this.largeur + "px";
    this.briqueHTML.style.height = this.hauteur + "px";
    this.briqueHTML.style.left = this.left + "px";
    this.briqueHTML.style.top = this.top + "px";
    espaceBrique.espacebriqueHTML.append(this.briqueHTML);
  }

  changePosition(x, y) {
    this.left = x;
    this.top = y;

    this.briqueHTML.style.left = x + "px";
    this.briqueHTML.style.top = y + "px";
    this.briqueHTML.style.width = this.largeur + "px";
    this.briqueHTML.style.height = this.hauteur + "px";
  }
}

class ClsBall extends ClsEspaceJeu {
  constructor(id, diam, vitesse, abs, ord, angle) {
    super();
    this.id = id;
    this.diam = diam;
    this.vitesse = vitesse;
    this.left = abs;
    this.top = ord;

    this.vecteur = {
      angle: angle,
      x: 0,
      y: 0,
    };

    this.ballHTML = document.createElement("div");
    this.ballHTML.id = this.id;
    this.ballHTML.style.width = this.diam + "px";
    this.ballHTML.style.height = this.diam + "px";
    this.ballHTML.style.left = this.left + "px";
    this.ballHTML.style.top = this.top + "px";
    jeu.jeuHTML.append(this.ballHTML);
  }
  posInit() {
    let element1 = document.querySelectorAll(`[class="brique"]`);
    let incassable = document.querySelectorAll(`[class="brique1"]`);

    if (lanceInit === false) {
      this.left = barre.left + barre.largeur / 2 - this.diam / 2;
      this.top = barre.top - this.diam;
    }
    if (this.top > jeu.bottom) {
      lanceInit = false;
      vies--;
    }
    if (vies === 0) {
      pauseAff.style.visibility = "visible";
      reprendre.style.visibility = "hidden";
      affPause.textContent = "Vous n'avez plus de vies ! Pour reconquérir la forteresse, veuillez appuyer sur recommencer.";
      // finVies = true;
      countBool = false;
      reprendrePause = false;
      lanceBalle = false;
      autorisationLancer = false;
      //   for (i = 0; i < incassable.length; i++) {
      //     incassable[i].remove();
      //   }
      //   for (i = 0; i < element1.length; i++) {
      //     element1[i].remove();
      //   }

      //   // lanceInit = true;
    }
  }

  lancementBalle() {
    if (lanceBalle === true && lanceInit === false /*&& finVies === false*/) {
      this.deplacementBalle(this.calculAngle(315));
      countBool = true;
      // console.log(Math.round(balle.top / 100) * 100, "top");
      // console.log(Math.round(balle.left / 100) * 100, " right");
      // console.log(balle.vecteur.angle, "angle");
    }
  }
  vitesseBalle() {
    if (diffChoix === "facile") {
      this.vitesse = 5;
    } else if (diffChoix === "normal") {
      this.vitesse = 10;
    } else if (diffChoix === "difficile") {
      this.vitesse = 15;
    } else {
      this.vitesse = 10;
    }
  }
  deplacementBalle() {
    this.left += this.vecteur.x;
    this.top += this.vecteur.y;

    this.ballHTML.style.left = this.left + "px";
    this.ballHTML.style.top = this.top + "px";
  }
  calculAngle(angle) {
    this.vecteur.angle = angle;
    this.vecteur.x = this.vitesse * Math.cos(angle * (Math.PI / 180)); //Math.pi convertit l'angle en radiant
    this.vecteur.y = this.vitesse * Math.sin(angle * (Math.PI / 180));
  }
  collisionEspace() {
    if (
      this.vecteur.angle >= 270 &&
      this.vecteur.angle < 360 &&
      Math.round(this.left / 100) * 100 === 1400
    ) {
      this.calculAngle(225);
    }
    if (
      Math.round(this.left / 100) * 100 === 1400 &&
      this.vecteur.angle >= 0 &&
      this.vecteur.angle < 90
    ) {
      this.calculAngle(135);
    }

    if (
      Math.round(this.top / 100) * 100 === jeu.top &&
      this.vecteur.angle >= 270 &&
      this.vecteur.angle <= 360
    ) {
      this.calculAngle(45);
    } else if (
      Math.round(this.top / 100) * 100 === jeu.top &&
      this.vecteur.angle >= 180 &&
      this.vecteur.angle < 270
    ) {
      this.calculAngle(135);
    }

    if (
      Math.round(this.left / 100) * 100 === jeu.left &&
      this.vecteur.angle >= 90 &&
      this.vecteur.angle < 180
    ) {
      this.calculAngle(45);
    }
    if (
      Math.round(this.left / 100) * 100 === jeu.left &&
      this.vecteur.angle >= 180 &&
      this.vecteur.angle < 270
    ) {
      this.calculAngle(315);
    }
    // if (
    //   this.left > barre.left &&
    //   this.left < barre.left + barre.largeur &&
    //   Math.round(this.top / 100) * 100 === barre.top &&
    //   this.vecteur.angle >= 90 &&
    //   this.vecteur.angle < 180
    // ) {
    //   this.calculAngle(225);
    // }
    if (
      this.left + 25 > barre.left &&
      this.left + 25 < barre.left + barre.largeur / 5 &&
      Math.round(this.top / 100) * 100 === barre.top &&
      this.vecteur.angle >= 0 &&
      this.vecteur.angle < 90
    ) {
      // console.log("ok");
      this.calculAngle(225);
      // bout de barre part dans lesens inverse arrive de la gauche
    }
    if (
      this.left > barre.left + barre.largeur / 5 &&
      this.left < barre.left + barre.largeur - barre.largeur / 5 &&
      Math.round(this.top / 100) * 100 === barre.top &&
      this.vecteur.angle >= 0 &&
      this.vecteur.angle < 90
    ) {
      this.calculAngle(315);
      //dans le bon sens arrive de la gauche
    }
    if (
      this.left > barre.left + barre.largeur / 5 &&
      this.left < barre.left + barre.largeur - barre.largeur / 5 &&
      Math.round(this.top / 100) * 100 === barre.top &&
      this.vecteur.angle >= 90 &&
      this.vecteur.angle < 180
    ) {
      console.log("ok");
      this.calculAngle(225);
      //  bon sens arrive par la droite
    }
    if (
      this.left > barre.left + barre.largeur - barre.largeur / 5 &&
      this.left < barre.left + barre.largeur &&
      Math.round(this.top / 100) * 100 === barre.top &&
      this.vecteur.angle >= 90 &&
      this.vecteur.angle < 180
    ) {
      this.calculAngle(315);
      //dans le sens contraire arrive par la droite
    }
    this.ballHTML.style.top = this.top + "px";
    this.ballHTML.style.left = this.left + "px";
  }

  collisionBrique() {
    let element1 = document.querySelectorAll(`[class="brique"]`);
    let incassable = document.querySelectorAll(`[class="brique1"]`);

    if (element1.length === 0 && niveau === 1) {
      lanceInit = false;
      autorisationLancer = false;
      niveau++;

      niv.style.visibility = "visible";
    }
    if (element1.length === 0 && niveau === 2 && lanceInit == true) {
      lanceInit = false;
      autorisationLancer = false;
      // niv.textContent = "3";
      for (i = 0; i < incassable.length; i++) {
        incassable[i].remove();
      }
      niveau++;
      niv.style.visibility = "visible";
    }
    if (element1.length === 0 && niveau === 3 && lanceInit == true) {
      lanceInit = false;
      // niv.textContent = "3";
      for (i = 0; i < incassable.length; i++) {
        incassable[i].remove();
      }
      lanceInit = false;
      reprendrePause = false;

      pauseAff.style.visibility = "visible";
      reprendre.style.visibility = "hidden";
      niv.style.visibility = "hidden";
      affPause.textContent = "A bientot pour de prochains niveaux";
    }
    for (i = 0; i < element1.length; i++) {
      if (
        Math.round(this.top / parseInt(element1[i].style.height)) *
          parseInt(element1[i].style.height) -
          parseInt(element1[i].style.height) ===
          parseInt(element1[i].style.top) &&
        this.left > parseInt(element1[i].style.left) &&
        this.left - parseInt(element1[i].style.width) <
          parseInt(element1[i].style.left) &&
        this.vecteur.angle >= 270 &&
        this.vecteur.angle <= 360

        // collision par le bas gauche
      ) {
        this.calculAngle(45);
        element1[i].remove();
        countScore++;
        // console.log(parseInt(element1[i].style.height), "hauteur");
      } else if (
        Math.round(this.top / parseInt(element1[i].style.height)) *
          parseInt(element1[i].style.height) -
          parseInt(element1[i].style.height) ===
          parseInt(element1[i].style.top) &&
        this.left > parseInt(element1[i].style.left) &&
        this.left - parseInt(element1[i].style.width) <
          parseInt(element1[i].style.left) &&
        this.vecteur.angle >= 180 &&
        this.vecteur.angle < 270
      ) {
        // collision par le bas droit
        this.calculAngle(135);
        element1[i].remove();
        countScore++;
      }

      if (
        this.top > parseInt(element1[i].style.top) &&
        this.top - parseInt(element1[i].style.height) <
          parseInt(element1[i].style.top) &&
        Math.round(this.left / 100) * 100 == parseInt(element1[i].style.left) &&
        this.vecteur.angle >= 270 &&
        this.vecteur.angle < 360
        // collision cote gauche par le bas
      ) {
        // console.log("collision bas gauche");
        this.calculAngle(225);
        element1[i].remove();
        countScore++;
      }
      if (
        this.top > parseInt(element1[i].style.top) &&
        this.top - parseInt(element1[i].style.height) <
          parseInt(element1[i].style.top) &&
        Math.round(this.left / 100) * 100 == parseInt(element1[i].style.left) &&
        this.vecteur.angle >= 0 &&
        this.vecteur.angle < 90
        // collision cote gauche par le haut
      ) {
        // console.log("collision haut gauche");
        this.calculAngle(135);
        element1[i].remove();
        countScore++;
      }
      if (
        this.top > parseInt(element1[i].style.top) &&
        this.top - parseInt(element1[i].style.height) <
          parseInt(element1[i].style.top) &&
        Math.round(this.left / 100) * 100 - parseInt(element1[i].style.width) ==
          parseInt(element1[i].style.left) &&
        this.vecteur.angle >= 180 &&
        this.vecteur.angle < 270
        // collision cote droit par le bas
      ) {
        // console.log("collision bas droit");
        this.calculAngle(315);
        element1[i].remove();
        countScore++;
      }
      if (
        this.top > parseInt(element1[i].style.top) &&
        this.top - parseInt(element1[i].style.height) <
          parseInt(element1[i].style.top) &&
        Math.round(this.left / 100) * 100 - parseInt(element1[i].style.width) ==
          parseInt(element1[i].style.left) &&
        this.vecteur.angle >= 90 &&
        this.vecteur.angle < 180
        // collision cote droit par le haut
      ) {
        // console.log("collision haut droit");
        this.calculAngle(45);
        element1[i].remove();
        countScore++;
      }
      if (
        Math.round(this.top / parseInt(element1[i].style.height)) *
          parseInt(element1[i].style.height) ===
          parseInt(element1[i].style.top) &&
        this.left > parseInt(element1[i].style.left) &&
        this.left - parseInt(element1[i].style.width) <
          parseInt(element1[i].style.left) &&
        this.vecteur.angle >= 0 &&
        this.vecteur.angle <= 45
        // collision par le haut gauche
      ) {
        this.calculAngle(315);
        element1[i].remove();
        countScore++;
      }
      if (
        Math.round(this.top / parseInt(element1[i].style.height)) *
          parseInt(element1[i].style.height) ===
          parseInt(element1[i].style.top) &&
        this.left > parseInt(element1[i].style.left) &&
        this.left - parseInt(element1[i].style.width) <
          parseInt(element1[i].style.left) &&
        this.vecteur.angle >= 90 &&
        this.vecteur.angle <= 135
        // collision par le haut droit
      ) {
        this.calculAngle(225);
        element1[i].remove();
        countScore++;
      }
    }
    for (i = 0; i < incassable.length; i++) {
      if (
        Math.round(this.top / parseInt(incassable[i].style.height)) *
          parseInt(incassable[i].style.height) -
          parseInt(incassable[i].style.height) ===
          parseInt(incassable[i].style.top) &&
        this.left > parseInt(incassable[i].style.left) &&
        this.left - parseInt(incassable[i].style.width) <
          parseInt(incassable[i].style.left) &&
        this.vecteur.angle >= 270 &&
        this.vecteur.angle <= 360
        // collision par le bas gauche
      ) {
        this.calculAngle(45);
      } else if (
        Math.round(this.top / parseInt(incassable[i].style.height)) *
          parseInt(incassable[i].style.height) -
          parseInt(incassable[i].style.height) ===
          parseInt(incassable[i].style.top) &&
        this.left > parseInt(incassable[i].style.left) &&
        this.left - parseInt(incassable[i].style.width) <
          parseInt(incassable[i].style.left) &&
        this.vecteur.angle >= 180 &&
        this.vecteur.angle < 270
      ) {
        // collision par le bas droit
        this.calculAngle(135);
      }

      if (
        this.top > parseInt(incassable[i].style.top) &&
        this.top - parseInt(incassable[i].style.height) <
          parseInt(incassable[i].style.top) &&
        Math.round(this.left / 100) * 100 ==
          parseInt(incassable[i].style.left) &&
        this.vecteur.angle >= 270 &&
        this.vecteur.angle < 360
        // collision cote gauche par le bas
      ) {
        // console.log("collision bas gauche");
        this.calculAngle(225);
      }
      if (
        this.top > parseInt(incassable[i].style.top) &&
        this.top - parseInt(incassable[i].style.height) <
          parseInt(incassable[i].style.top) &&
        Math.round(this.left / 100) * 100 ==
          parseInt(incassable[i].style.left) &&
        this.vecteur.angle >= 0 &&
        this.vecteur.angle < 90
        // collision cote gauche par le haut
      ) {
        // console.log("collision haut gauche");
        this.calculAngle(135);
      }
      if (
        this.top > parseInt(incassable[i].style.top) &&
        this.top - parseInt(incassable[i].style.height) <
          parseInt(incassable[i].style.top) &&
        Math.round(this.left / 100) * 100 -
          parseInt(incassable[i].style.width) ==
          parseInt(incassable[i].style.left) &&
        this.vecteur.angle >= 180 &&
        this.vecteur.angle < 270
        // collision cote droit par le bas
      ) {
        // console.log("collision bas droit");
        this.calculAngle(315);
      }
      if (
        this.top > parseInt(incassable[i].style.top) &&
        this.top - parseInt(incassable[i].style.height) <
          parseInt(incassable[i].style.top) &&
        Math.round(this.left / 100) * 100 -
          parseInt(incassable[i].style.width) ==
          parseInt(incassable[i].style.left) &&
        this.vecteur.angle >= 90 &&
        this.vecteur.angle < 180
        // collision cote droit par le haut
      ) {
        // console.log("collision haut droit");
        this.calculAngle(45);
      }
      if (
        Math.round(this.top / parseInt(incassable[i].style.height)) *
          parseInt(incassable[i].style.height) ===
          parseInt(incassable[i].style.top) &&
        this.left > parseInt(incassable[i].style.left) &&
        this.left - parseInt(incassable[i].style.width) <
          parseInt(incassable[i].style.left) &&
        this.vecteur.angle >= 0 &&
        this.vecteur.angle <= 45
        // collision par le haut gauche
      ) {
        this.calculAngle(315);
      }
      if (
        Math.round(this.top / parseInt(incassable[i].style.height)) *
          parseInt(incassable[i].style.height) ===
          parseInt(incassable[i].style.top) &&
        this.left > parseInt(incassable[i].style.left) &&
        this.left - parseInt(incassable[i].style.width) <
          parseInt(incassable[i].style.left) &&
        this.vecteur.angle >= 90 &&
        this.vecteur.angle <= 135
        // collision par le haut droit
      ) {
        this.calculAngle(225);
      }
    }
    this.ballHTML.style.top = this.top + "px";
    this.ballHTML.style.left = this.left + "px";
  }
}
class ClsBarre extends ClsEspaceJeu {
  constructor(id, largeur, hauteur, abs, ord) {
    super();
    this.id = id;
    this.largeur = largeur;
    this.hauteur = hauteur;

    this.left = abs;
    this.top = ord;

    this.barreHTML = document.createElement("div");
    this.barreHTML.id = this.id;
    this.barreHTML.style.width = this.largeur + "px";
    this.barreHTML.style.height = this.hauteur + "px";
    this.barreHTML.style.left = this.left + "px";
    this.barreHTML.style.top = this.top + "px";
    jeu.jeuHTML.append(this.barreHTML);
  }

  moveClav(rightPressed, leftPressed) {
    if (rightPressed == true) {
      this.left += vitesseBarre;
      // console.log("ok");
    } else if (leftPressed == true) {
      this.left -= vitesseBarre;
    } else if ((leftPressed = false)) {
      this.left = this.left;
    } else if ((leftPressed = false)) {
      this.left = this.left;
    }
    if (this.left <= jeu.left && leftPressed == true) {
      this.left = jeu.left;
    } else if (this.left >= jeu.right - barre.largeur && rightPressed == true) {
      this.left = jeu.right - this.largeur;
    }

    this.barreHTML.style.left = this.left + "px";
  }
}
