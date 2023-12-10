use std::fs::File;
use std::io::{self, BufRead};

fn next_pipe(path_loop: &Vec<(usize, usize)>, lines: &Vec<String>) -> Option<(usize, usize)> {
    // On recupere les coordonées de notre position
    let (courant, chemin) = match path_loop.split_last() {
        Some((last, slice)) => (last, slice),
        None => {
            // Gestion si le vecteur est vide
            println!("Le vecteur est vide !");
            return None;
        }
    };
    // Et d'où on vient
    let precedent = match chemin.last() {
        Some(x) => x,
        None => {
            // Gestion si le vecteur est vide
            println!("Le vecteur est vide !");
            &(0, 0)
        }
    };

    let (cur_index, cur_pos) = *courant;

    println!("courant {:#?} {}.", cur_index, cur_pos);
    // println!("chemin {:#?}.", chemin);

    // Token valides + triche pour S
    let liste_sud = ['7', 'F', '|'];
    let liste_nord = ['J', 'L', '|', 'S'];
    let liste_ouest = ['J', '-', '7'];
    let liste_est = ['-', 'L', 'F'];


    if let Some(c) = lines.get(cur_index)?.chars().nth(cur_pos) {
        // Test Nord
        println!("tile found {}", c);
        if liste_nord.contains(&c) {
            let position = (cur_index - 1, cur_pos);
            if precedent != &position {
                return Some(position)
            }
        }

        // Test Sud
        if liste_sud.contains(&c) {
            let position = (cur_index + 1, cur_pos);
            if precedent != &position {
                return Some(position)
            }
        }

        // Test Est
        if liste_est.contains(&c) {
            let position = (cur_index, cur_pos + 1);
            if precedent != &position {
                return Some(position)
            }
        }

        // Test Ouest
        if liste_ouest.contains(&c) {
            let position = (cur_index, cur_pos - 1);
            if precedent != &position {
                return Some(position)
            }
        }
    }

    None
    
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
    let mut path_loop: Vec<(usize, usize)> = vec![(start_index, start_pos)];

    // Step counter
    let mut counter = 0;

    let result = loop {
        if let Some(next) = next_pipe(&path_loop, &lines) {
            path_loop.push(next);
        }
        counter += 1;

        if path_loop.first() == path_loop.last() && path_loop.len() > 1 {
            println!("Fin");
            break counter
        }
    };

    println!("Part1: Point le plus loin à {}.", result / 2);



    Ok(())
}
