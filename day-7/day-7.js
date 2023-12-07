/*
URL https://adventofcode.com/2023/
*/

const fs = require('fs');
const readline = require('readline');

// Chemin vers ton fichier
const filePath = 'puzzle-input.txt';

// Variable Globale pour les résultats finaux
let resultat_part1 = 0;
let tableau_part1 = [];

//if (PART2) {//Part2
const VALEURS = ['J', '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'Q', 'K', 'A'];
//part1
//  VALEURS = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];


class Main {
    constructor(cartes, pari) {
        this.cartes = cartes
        this.pari = pari
        this.type = this.typeMain()
    }

    typeMain = () => {
        let nombreCartes = VALEURS.map( (valeur) => [...this.cartes].filter( (carte) => carte === valeur).length)

        // if (PART2) {
            let jockers = nombreCartes[0]
            nombreCartes[0] = 0
            let max = Math.max(...nombreCartes) + jockers
            let min = Math.min.apply(Math, [...nombreCartes].filter( (n) => n > 0 ))
        // Part1
        //    let max = Math.max(...nombreCartes)
        //    let min = Math.min.apply(Math, [...nombreCartes].filter( (n) => n > 0 ))

        if ( max == 5 ) return 7 // Five of a kind
        if ( max == 4 ) return 6 // Four of a kind
        if ( max == 3 ) {
            if (min == 2 ) {
                return 5 // Full
            }
            return 4 // Triple
        }
        if ( max == 2 ) {
            if (nombreCartes.filter( x => x == 2).length == 2 ) {
                return 3 // Two Pairs
            }
            return 2 // Pairs
        }

        return 1 // High
    }
}

compareMain = (a, b) => {
    if (a.type < b.type) return -1
    if (a.type > b.type) return 1
    
    for (i in a.cartes ) {
        if ( VALEURS.indexOf(a.cartes[i]) < VALEURS.indexOf(b.cartes[i])) return -1
        if ( VALEURS.indexOf(a.cartes[i]) > VALEURS.indexOf(b.cartes[i])) return 1
    }

    return 0
}

// Créer l'interface de lecture
const readInterface = readline.createInterface({
    input: fs.createReadStream(filePath),
//    output: process.stdout,
    console: false
});

// Boucler sur chaque ligne du fichier
readInterface.on('line', function(line) {
    let infos_partie = line.split(" ");

    // Part 1
    tableau_part1.push(new Main(infos_partie[0], infos_partie[1]))

});

// Gestion de la fin de fichier
readInterface.on('close', function() {
    console.log('Lecture du fichier terminée.');

    tableau_part1.sort(compareMain)
    tableau_part1.map( (c, i) => resultat_part1 += c.pari * (i+1));

    console.log('===== Resulat Day 2 ======');
    console.log('Part 1: ' + resultat_part1);
    // console.log('Part 2: ' + resultat_part2);
});

