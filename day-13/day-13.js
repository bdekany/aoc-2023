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
        this.chance = -1
        this.smudge = new Array()
        this.lines = arr
        this.columns = new Array()
        this.alreadyMirror = false
    }

    swithTile = (index, i) => {
        if (this.columns.length > 0) {
            console.log(this.columns)
            let line = this.columns[index].split('');
            line[i] = (line[i] === '#') ? '.' : '#' // Remplace le caractère
            // Rejoindre le tableau pour reformer une chaîne modifiée
            this.columns[index] = line.join('')
        } else {
            let line = this.lines[index].split('');
            line[i] = (line[i] === '#') ? '.' : '#' // Remplace le caractère
            // Rejoindre le tableau pour reformer une chaîne modifiée
            this.lines[index] = line.join('')
        }
    }

    strAlmostEq = (a, b, index) => {
        for (let i = 0; i < a.length; i++) {
            if (a[i] !== b[i]) {
                if (this.smudge.length > this.chance) {
                    return false
                }
                this.smudge.push([index, i])
                console.log("moi", index, i)
                this.swithTile(index, i)
            }
        }
        return true
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
       let pivot = 0
    
       for (let index = 0 ; index < arr.length - 1 ; index++ ) {
            console.log("compare: " + index + " " + arr[index] + " > " + arr[index+1])
            if ( this.strAlmostEq(arr[index], arr[index+1], index) ) { // On trouve une potentielle ligne de symetrie
                pivot = index                    // On stock l'index comme pivot
                console.log("pivot potentiel " + pivot)
                let i = pivot - 1
                let j = pivot + 2
                if ( i < 0 || j > arr.length - 1 ) {
                    if (this.smudge.length == 0) {
                        continue
                    }
                    console.log(this.num + " gagne : " + pivot)
                    this.alreadyMirror = true
                    return pivot + 1
                }
                while ( this.strAlmostEq(arr[i], arr[j], i) ) {   // on compare en partant du pivot
                    console.log("check: " + i + ":" + j + " " + arr[i] + " > " + arr[j])
                    if ( i == 0 || j == arr.length - 1 ) { // Si on arrive à un bout de tablea, c'est gagné
                        if (this.smudge.length == 0) {
                            break
                        }
                        console.log(this.num + " gagne : " + pivot)
                        this.alreadyMirror = true
                        return pivot + 1
                    }
                    i--
                    j++
                }


            }
            // reset smudge
            if(this.smudge.length > 0) {
                this.swithTile(this.smudge[0][0], this.smudge[0][1])
                this.smudge.pop()
            }
       }

       console.log(this.num + " perdu")
       return 0 // echec, pas de symetrie
    }

    rowMirror = () => {
        return this.symetry(this.lines);
    }

    colMirror = () => {
       if (this.alreadyMirror) {
            return 0
        }
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
    
/*
    resultat_part1 = chateau_de_cartes.map((carte) => carte.rowMirror())
                    .reduce((acc, valeur) => acc + valeur, 0)
    resultat_part1 *= 100
    resultat_part1 += chateau_de_cartes.map((carte) => carte.colMirror())
    .reduce((acc, valeur) => acc + valeur, 0)
*/
   resultat_part2 = chateau_de_cartes.map((carte) => {
        carte.chance = 0
        return carte.rowMirror()
    }).reduce((acc, valeur) => acc + valeur, 0)
    resultat_part2 *= 100
    resultat_part2 += chateau_de_cartes.map((carte) => {
        carte.chance = 0
        return carte.colMirror()
    }).reduce((acc, valeur) => acc + valeur, 0)

    console.log('Lecture du fichier terminée.');
    console.log(chateau_de_cartes.length)
    console.log('===== Resulat Day 13 ======');
    console.log('Part 1: ' + resultat_part1);
    console.log('Part 2: ' + resultat_part2);
});



