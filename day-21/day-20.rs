use std::fs::File;
use std::io::{self, BufRead};
use std::cmp;
use std::collections::HashSet;

fn next_steps(lines: &Vec<String>, possible_tile: HashSet<(usize, usize)>) -> HashSet<(usize, usize)> {
    let mut new_hs: HashSet<(usize, usize)> = Default::default();
    
    // On recupere les coordonées de nos position
    for (index, pos) in possible_tile {
    // println!("courant {:#?} {}.", cur_index, cur_pos);
    // println!("chemin {:#?}.", chemin);

        // PART 1
        // Haut I - 1
        let up_i = cmp::max(0, index - 1);
        //  Bas i - 1;
        let down_i = cmp::min(130 , index + 1);
        // Droite p + 1
        let droite_p = cmp::min(130 , pos + 1);
        // Gauche p - 1
        let gauche_p = cmp::max(0, pos - 1);


        if let Some(c) = lines.get(up_i).unwrap().chars().nth(pos) {
            // Test Nord
            // println!("tile found {}", c);
            if ".S".contains(c) {
                if new_hs.insert((up_i, pos)) {
                    
                }
            }
        }

        if let Some(c) = lines.get(down_i).unwrap().chars().nth(pos) {
            // Test Sud
            // println!("tile found {}", c);
            if ".S".contains(c) {
                if new_hs.insert((down_i, pos)) {

                }
            }
        }

        if let Some(c) = lines.get(index).unwrap().chars().nth(droite_p) {
            // Test droite
            // println!("tile found {}", c);
            if ".S".contains(c) {
                if new_hs.insert((index, droite_p)){

                }
            }
        }

        if let Some(c) = lines.get(index).unwrap().chars().nth(gauche_p) {
            // Test Gauche
            // println!("tile found {}", c);
            if ".S".contains(c) {
                if new_hs.insert((index, gauche_p)){

                }
            }
        }


    }

    return new_hs
    
}


fn main() -> io::Result<()> {
    // Ouverture du fichier
    let file = File::open("puzzle-input.txt")?;
    let reader = io::BufReader::new(file);

    // Création d'un vecteur pour stocker les lignes
    let mut lines: Vec<String> = Vec::new();

    // Enregistrement du Point de départ
    let mut start_pos = 0;
    let mut start_index = 0;

    // Lecture des lignes du fichier et ajout au vecteur
    for (index, line) in reader.lines().enumerate() {
        let line = line?;
        if let Some(pos) = line.find('S') {
            start_pos = pos;
            start_index = index;
            println!("Le caractère 'S' est présent à la ligne {} position {}.", index, pos);
            //break; // Quitte la boucle dès que 'S' est trouvé dans une ligne
        }
        lines.push(line);
    }

    // Création du chemin du loop
    let mut possible_tile: HashSet<(usize, usize)> = vec![(start_index, start_pos)].into_iter().collect();

    // Step counter
    let mut counter = 0;

    loop {
        possible_tile = next_steps(&lines, possible_tile);

/*
        if let Some(next) = next_pipe(&path_loop, &lines) {
            path_loop.push(next);
        }
        */
        counter += 1;

        if counter == 64 {
            break
        }
    };

    println!("Part1: {}.", possible_tile.len());


    // println!("Part2: Cas dans le loop {}.", in_counter);

    Ok(())
}
