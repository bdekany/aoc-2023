/*
 URL: https://adventofcode.com/2023/day/13
*/

const fs = require('fs');
const readline = require('readline');

// Chemin vers ton fichier
const filePath = 'puzzle-input.txt';

// Variable Globale pour les résultats finaux
let resultat_part1 = 0;
let resultat_part2 = 0;

let chateau_de_cartes = new Array()

class Carte {
    constructor(n, arr) {
        this.num = n
        this.lines = arr
        this.columns = new Array()
    }

    linesToCol = () => {
        for (let index in this.lines[0]) {
            this.columns.push(
                this.lines.map((l) => l[index]) // Récupérer la n-ieme lettre de chaque line
                .reduce((acc, lettre) => acc + lettre, '') // Concaténer toutes les lettres
            )
        }
    }

    symetry = (arr) => {
        /* step de i, comapre a i+1
         > vrai, pivot = i, true
           compare pivot - 1  +2 
            > si vrai ; ou i =0 ; ou j > len carte
            > pivpt = answer
            > si faux break
         > faux ; test de i+1
        */

       let pivot = 0
    
       for (let index = 0 ; index < arr.length - 1 ; index++ ) {
            console.log("compare: " + index + " " + arr[index] + " > " + arr[index+1])
            if ( arr[index] === arr[index+1] ) { // On trouve une potentielle ligne de symetrie
                pivot = index                    // On stock l'index comme pivot
                console.log("pivot potentiel " + pivot)
                let i = pivot - 1
                let j = pivot + 2
                if ( i < 0 || j > arr.length - 1 ) {
                    return pivot + 1
                }
                while ( arr[i] === arr[j] ) {   // on compare en partant du pivot
                    console.log("check: " + i + ":" + j + " " + arr[i] + " > " + arr[j])
                    if ( i == 0 || j == arr.length - 1 ) { // Si on arrive à un bout de tablea, c'est gagné
                        console.log(this.num + " gagne : " + pivot)
                        return pivot + 1
                    }
                    i--
                    j++
                }
            }
       }

       console.log(this.num + " perdu")
       return 0 // echec, pas de symetrie
    }

    rowMirror = () => {
        return this.symetry(this.lines);
    }

    colMirror = () => {
        this.linesToCol()
        return this.symetry(this.columns);
    }
}

// Créer l'interface de lecture
const readInterface = readline.createInterface({
    input: fs.createReadStream(filePath),
//    output: process.stdout,
    console: false
});

let tmp = new Array()
let cardN = 1

const regex = /[.#]/;

// Boucler sur chaque ligne du fichier
readInterface.on('line', function(line) {
    if (regex.test(line)) {
        tmp.push(line)
    } else {
        c = new Carte(cardN, tmp)
        chateau_de_cartes.push(c)
        cardN++
        tmp = []
    }
});

// Gestion de la fin de fichier
readInterface.on('close', function() {
    

    resultat_part1 = chateau_de_cartes.map((carte) => carte.rowMirror())
                    .reduce((acc, valeur) => acc + valeur, 0)
    resultat_part1 *= 100
    resultat_part1 += chateau_de_cartes.map((carte) => carte.colMirror())
    .reduce((acc, valeur) => acc + valeur, 0)

    console.log('Lecture du fichier terminée.');
    console.log(chateau_de_cartes.length)
    console.log('===== Resulat Day 13 ======');
    console.log('Part 1: ' + resultat_part1);
    console.log('Part 2: ' + resultat_part2);
});



