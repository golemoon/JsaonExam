// Tableau :
var prenoms = ["Mateo", "Alexandre", "Enzo", "Karim", "Yaya"];
var caracteristiques = ["beaux", "sportif", "brun", "grand", "moche"];
var falseeee = [];

// Fonction pour tirer aleatoirement un Nom
function genererNom() {
  if (prenoms.length === 0) {
    prenoms.push(falseeee);
    falseeee.length = 0;
  }

  var index = Math.floor(Math.random() * prenoms.length);
  var nom = prenoms.splice(index, 1)[0];
  falseeee.push(nom);
  return nom;
}

// pareille mais pour la caracteristique
function genererCaracteristique() {
  var caractIndex = Math.floor(Math.random() * caracteristiques.length);
  return caracteristiques[caractIndex];
}

// Classe pour survivant et Jason
class Personnage {
  constructor() {
    this.nom = genererNom();
    this.caracteristique = genererCaracteristique();
    this.pointsDeVie = 100;
  }

  attaquerTueur(jason) {
    var chanceEsquive = Math.random();
    if (chanceEsquive < 0.3) {
      console.log(`${this.nom} a esquivé et a infligé 10 points de dégâts.`);
      jason.pointsDeVie -= 10;
    } else if (chanceEsquive < 0.8) {
      console.log(`${this.nom} a infligé 15 points de dégâts à Jason mais est mort.`);
      jason.pointsDeVie -= 15;
      this.pointsDeVie = 0;
    } else {
      console.log(`Jason a tué ${this.nom}.`);
      this.pointsDeVie = 0;
    }
  }
}

class Jason {
  constructor() {
    this.nom = "Jason";
    this.pointsDeVie = 100;
  }

  attaquerSurvivant(survivant) {
    var chanceEsquive = Math.random();
    if (chanceEsquive < 0.3) {
      console.log(`Jason a attaqué ${survivant.nom}, mais ${survivant.nom} a esquivé.`);
    }
  }
}

var jason = new Jason();
var survivants = [];
for (let i = 0; i < 5; i++) {
  survivants.push(new Personnage());
}

// Boucle vie
while (jason.pointsDeVie > 0 && survivants.some((survivant) => survivant.pointsDeVie > 0)) {
  var survivantAttaque = survivants[Math.floor(Math.random() * survivants.length)];
  if (survivantAttaque.pointsDeVie > 0) {
    survivantAttaque.attaquerTueur(jason);
  }
  if (jason.pointsDeVie > 0) {
    var survivantsEnVie = survivants.filter((survivant) => survivant.pointsDeVie > 0);
    if (survivantsEnVie.length > 0) {
      var survivantCible = survivantsEnVie[Math.floor(Math.random() * survivantsEnVie.length)];
      jason.attaquerSurvivant(survivantCible);
    }
  }
}

// Conclusion

if (jason.pointsDeVie <= 0) {
  console.log("Les survivant on gagné mais RIP a :");
} else {
  console.log("Les survivants ont été tous éliminés. Jason a gagné !");
}
console.log("Survivants éliminés :");
for (var survivant of survivants) {
  if (survivant.pointsDeVie <= 0) {
    console.log(`${survivant.nom} qui a comme caracteristique d'etre (${survivant.caracteristique})`);
  }
}
