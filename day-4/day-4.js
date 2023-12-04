/*
 URL: https://adventofcode.com/2023/day/4
 C'est day-2 le retour
*/

const fs = require('fs');
const readline = require('readline');

// Chemin vers ton fichier
const filePath = 'puzzle-input.txt';

// Variable Globale pour les résultats finaux
let resultat_part1 = 0;
let resultat_part2 = 0;
let tableau_part2 = new Array(212).fill(1);


// Création d'un objet représentant une carte
class Carte {
    constructor(numeroCarte, partieGratage) {
        this.numero = parseInt(numeroCarte)
        this.numerosGagnants = this.creerSet(partieGratage.split("| ")[0])
        this.numerosTrouves = this.creerSet(partieGratage.split("| ")[1])
    }

    creerSet = (chaine) => {
        //numerosGagnants: new Set([3, 7, 12, 19, 25]),
        let set1 = new Set( chaine.split(" ") )
        set1.forEach((point) => {
            if (point === '' ) {
              set1.delete(point);
            }
        });
        return set1
    }
    
    // Fonction pour comparer les numéros gagnants
    comparerNumeros = () => {
      const intersection = new Set(
        [...this.numerosGagnants].filter(num => this.numerosTrouves.has(num))
      );

      return intersection;
    }

    caculValeur = () => {
        let nombresCommuns = this.comparerNumeros()
        if (nombresCommuns.size > 0 ) {
            return Math.pow(2, nombresCommuns.size - 1);
        }
        return 0
    }
  };

// Créer l'interface de lecture
const readInterface = readline.createInterface({
    input: fs.createReadStream(filePath),
//    output: process.stdout,
    console: false
});

// Boucler sur chaque ligne du fichier
readInterface.on('line', function(line) {
    let infos_partie = line.split(": ");

    // Part 1
    let numeroCarte = infos_partie[0].match(/\d+/)[0];
    let partieGratage = infos_partie[1];

    let carte = new Carte(numeroCarte, partieGratage);
    resultat_part1 += carte.caculValeur()

    // Part 2
    /* lire carte
        calcul copies gagnées
        compteur total += nombre de fois cette carte
        gain des carte suivantes 
         mettre a jour compteur
    */
    let copiesGagnees = carte.comparerNumeros()
    resultat_part2 += tableau_part2[carte.numero]

    for ( var i = 1; i <= copiesGagnees.size; i++ ) {
        copie = carte.numero + i
        tableau_part2[copie] += tableau_part2[carte.numero]
        // console.log("carte: " + copie + " = " + tableau_part2[copie])
    }

});

// Gestion de la fin de fichier
readInterface.on('close', function() {
    console.log('Lecture du fichier terminée.');
    console.log('===== Resulat Day 2 ======');
    console.log('Part 1: ' + resultat_part1);
    console.log('Part 2: ' + resultat_part2);
});



