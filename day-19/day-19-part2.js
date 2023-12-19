/*
 URL: https://adventofcode.com/2023/day/19
*/

const fs = require('fs');
const readline = require('readline');

applyWorkflow = (wf, partNum, i = 0) => {
    console.log("pattern ", wf, " iter ", i)
    console.log(workflows.get(wf))
    let rules = workflows.get(wf).split(",")
    // console.log(rules);

    for ( ; i < rules.length ; i++) {
        r = rules[i]
        let groups = r.match(/([xmas])([<>])([0-9]+):([a-zA-Z]+)/)

        if ( groups !== null ) {
            // console.log("in solve ", groups);
            let val = groups[1]
            let operator = groups[2]
            let thresold = parseInt(groups[3])
            let target = groups[4]

            if ( operator === "<" ) {
                // Object for new path
                let newPart = new Map(partNum)
                let [bot, top] = partNum.get(val)

                console.log(bot, thresold, top);
                if ( bot < thresold && thresold < top ) {
                    newPart.set(val, [thresold, top])
                    //console.log("new", newPart)
                    applyWorkflow(wf, newPart, i+1)
                }
                
                if (bot > thresold - 1 || thresold - 1 > top ) {
                    continue
                }

                partNum.set(val, [thresold - 1, top])
                //console.log("old", partNum)
                r = target
            }

            if ( operator === ">" ) {
                // Object for new path
                let newPart = new Map(partNum)
                let [bot, top] = partNum.get(val)

                console.log(bot, thresold, top);
                if ( top > thresold && thresold > bot ) {
                    newPart.set(val, [bot, thresold])
                    //console.log("new", newPart)
                    applyWorkflow(wf, newPart, i+1)
                }
                
                if (bot > thresold - 1 || thresold - 1 > top) {
                    continue
                }

                partNum.set(val, [bot, thresold + 1])
                //console.log("old", partNum)
                r = target
            }

            // console.log("r est ", r);

        }

        if ( r === "A" ) {
            let result = 1
            console.log("win ", partNum)
            for (let [k, v] of partNum) {
                result *= v[1] - v[0]
            }
            resultat_part2 += result
            break 
        }

        if ( r === "R" ) {
            //console.log("lose", partNum)
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
const filePath = 'puzzle-input.test';

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
    applyWorkflow('in', partNum)
    console.log('===== Resulat Day 19 ======');
    //console.log('Part 1: ' + resultat_part1);
    console.log('Part 2: ' + resultat_part2);
});



