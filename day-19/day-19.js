/*
 URL: https://adventofcode.com/2023/day/19
*/

const fs = require('fs');
const readline = require('readline');

applyWorkflow = (wf, partNum) => {
    let rules = workflows.get(wf).split(",")
    // console.log(rules);

    for (let r of rules) {

        let groups = r.match(/([xmas])([<>])([0-9]+):([a-zA-Z]+)/)

        if ( groups !== null ) {
            // console.log("in solve ", groups);
            let val = groups[1]
            let operator = groups[2]
            let thresold = parseInt(groups[3])
            let target = groups[4]

            if ( operator === "<" && partNum.get(val) < thresold ) {
                r = target
            }

            if ( operator === ">" && partNum.get(val) > thresold ) {
                r = target
            }

            // console.log("r est ", r);

        }

        if ( r === "A" ) {
            resultat_part1 += partNum.get('x') + partNum.get('m') + partNum.get('a') + partNum.get('s')
            break 
        }

        if ( r === "R" ) {
            // Reject
            break 
        }

        if ( r.match(/^[a-z]+$/) ) {
            // console.log("go ", r);
            applyWorkflow(r, partNum)
            break
        }

    }

}

// Chemin vers ton fichier
const filePath = 'puzzle-input.txt';

// Variable Globale pour les résultats finaux
let resultat_part1 = 0;
let resultat_part2 = 0;

let workflows = new Map();

const wfRegex = /([a-z]+){(.+)}/;
const partRegex = /{x=([0-9]+),m=([0-9]+),a=([0-9]+),s=([0-9]+)}/;

// Créer l'interface de lecture
const readInterface = readline.createInterface({
    input: fs.createReadStream(filePath),
//    output: process.stdout,
    console: false
});

// Boucler sur chaque ligne du fichier
readInterface.on('line', function(line) {
    if ( line.length == 0 ) { return }
    if ( line[0] !== '{' ) {
        // console.log("workflow");
        // Build Worflow map
        let workflow = line.match(wfRegex)
        let wfName = workflow[1]
        let wfRule = workflow[2]
        workflows.set(wfName, wfRule)

    }
    else {
        // console.log("object");
        let part = line.match(partRegex)
        let partNum = new Map()
        partNum.set('x', parseInt(part[1]))
        partNum.set('m', parseInt(part[2]))
        partNum.set('a', parseInt(part[3]))
        partNum.set('s', parseInt(part[4]))

        applyWorkflow('in', partNum)

    }
});

// Gestion de la fin de fichier
readInterface.on('close', function() {
 
    console.log('===== Resulat Day 19 ======');
    console.log('Part 1: ' + resultat_part1);
    //console.log('Part 2: ' + resultat_part2);
});



