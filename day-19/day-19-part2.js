/*
 URL: https://adventofcode.com/2023/day/19
*/

const fs = require('fs');
const readline = require('readline');

applyWorkflow = (wf, partNum, logique, i = 0) => {
    let rules = workflows.get(wf).split(",")
    // console.log(rules);

    for ( ; i < rules.length ; i++) {
        r = rules[i]
        logique += r + ";"
        let groups = r.match(/([xmas])([<>])([0-9]+):([a-zA-Z]+)/)

        if ( groups !== null ) {
            let val = groups[1]
            let operator = groups[2]
            let thresold = parseInt(groups[3])
            let target = groups[4]

            // Object for new path
            let newPart = new Map(partNum)
            let [bot, top] = partNum.get(val)
            
            if ( operator === "<" ) {
                newPart.set(val, [thresold, top])
                //console.log("new", newPart)
                
                partNum.set(val, [bot, thresold - 1])
                //console.log("old", partNum)
            }

            if ( operator === ">" ) {
                newPart.set(val, [bot, thresold])
                //console.log("new", newPart)

                partNum.set(val, [thresold + 1, top])
                //console.log("old", partNum)
            }

            applyWorkflow(wf, newPart, logique, i+1) // Explore new path and next rule (i+1)
            r = target // continue the path

        }

        if ( r === "A" ) {
            let result = 1
            console.log("win ", logique, partNum)
            for (let [k, v] of partNum) {
                result *= v[1] - v[0] + 1
            }
            resultat_part2 += result
            break 
        }

        if ( r === "R" ) {
            // console.log("lose", logique, partNum)
            // Reject
            break 
        }

        if ( r.match(/^[a-z]+$/) ) {
            // console.log("go ", r);
            applyWorkflow(r, partNum, logique)
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
    /* else {
        // console.log("object");
        let part = line.match(partRegex)
        let partNum = new Map()
        partNum.set('x', parseInt(part[1]))
        partNum.set('m', parseInt(part[2]))
        partNum.set('a', parseInt(part[3]))
        partNum.set('s', parseInt(part[4]))

        applyWorkflow('in', partNum)

    } */
});

// Gestion de la fin de fichier
readInterface.on('close', function() {
    let partNum = new Map()
    partNum.set('x', [1, 4000])
    partNum.set('m', [1, 4000])
    partNum.set('a', [1, 4000])
    partNum.set('s', [1, 4000])
    applyWorkflow('in', partNum, "")
    console.log('===== Resulat Day 19 ======');
    //console.log('Part 1: ' + resultat_part1);
    console.log('Part 2: ' + resultat_part2);
});



