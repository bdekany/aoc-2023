/*
 lire fichier
 serialize
 Partie 1:
 - compare set 12 red cubes, 13 green cubes, and 14 blue cubes
 - addition des game valide
 Parie 2:
 - trouver le nombre minum de cube par partie
 - addition
*/

const fs = require('fs');
const readline = require('readline');
const { serialize } = require('v8');

// Chemin vers ton fichier
const filePath = 'puzzle-input.txt';

// Set de comparaison
const ref = {'red': 12, 'green': 13, 'blue': 14}

// Variable Globale pour les résultats finaux
let resultat_part1 = 0;
let resultat_part2 = 0;

serializeTirage = (line) => {
    // Diviser la chaîne en utilisant la virgule comme séparateur
    let elements = line.split(",");
    // Initialiser un objet pour stocker les valeurs
    let obj = {'red': 0, 'green': 0, 'blue': 0};

    // Parcourir les éléments pour créer l'objet clé-valeur
    for (let i = 0; i < elements.length; i++) {
        let keyValue = elements[i].trim().split(" ");
        let key = keyValue[1];
        let value = parseInt(keyValue[0]); // Convertir la chaîne en nombre entier
        obj[key] = value;
    }

    return obj;
}

compareTirage = (tirage) => {
    // Serializer la chaine en object
    obj = serializeTirage(tirage.trim());

    // Comparer avec le set de référence
    if ( ref.red >= obj.red && ref.green >= obj.green && ref.blue >= obj.blue ) {
        return true
    }

    return false
}

partieValide = (line) => {
    // Diviser la chaîne en utilisant le point-virgule comme séparateur
    let tirages = line.split(";");

    // Pour chaque tirage, lancer une comparaison
    for (const tirage of tirages) {
        if ( ! compareTirage(tirage.trim()) ) {
            return false
        }
    }
    return true;
}

puissancePartie = (line) => {
    // Diviser la chaîne en utilisant le point-virgule comme séparateur
    let tirages = line.split(";");

    // Initialiser un objet pour stocker les valeurs
    let obj = {'red': 0, 'green': 0, 'blue': 0};

    // Pour chaque tirage, calul de puissance
    for (const tirage of tirages) {
        obj_tirage = serializeTirage(tirage.trim())

        if (obj.red < obj_tirage.red) {
            obj.red = obj_tirage.red
        }
        if (obj.green < obj_tirage.green) {
            obj.green = obj_tirage.green
        }
        if (obj.blue < obj_tirage.blue) {
            obj.blue = obj_tirage.blue
        }
    }

    return obj.red * obj.green * obj.blue
}


// Créer l'interface de lecture
const readInterface = readline.createInterface({
    input: fs.createReadStream(filePath),
    output: process.stdout,
    console: false
});

// Boucler sur chaque ligne du fichier
readInterface.on('line', function(line) {
    let infos_partie = line.split(": ");

    // Part 1
    let partie_numero = parseInt(infos_partie[0].split(" ")[1]);
    if ( partieValide(infos_partie[1]) ) {
        resultat_part1 += partie_numero;
    }

    // Part 2
    resultat_part2 += puissancePartie(infos_partie[1]);

});

// Gestion de la fin de fichier
readInterface.on('close', function() {
    console.log('Lecture du fichier terminée.');
    console.log('===== Resulat Day 2 ======');
    console.log('Part 1:' + resultat_part1);
    console.log('Part 2:' + resultat_part2);
});

