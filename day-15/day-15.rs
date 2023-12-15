use std::collections::HashMap;
use std::collections::LinkedList;
use std::fs::File;
use std::io::{self, BufRead};

fn hash(seq: &str) -> Option<usize> {
    let mut value: usize = 0;
    for i in seq.as_bytes() {
        value += *i as usize;
        value *= 17;
        value %= 256;
    }
    return Some(value);
}

fn label_at(list: &LinkedList<HashMap<String, usize>>, label: &str) -> Option<usize> {
    // Parcours de la liste pour trouver l'index de l'élément recherché
    let mut index: usize = 0;

    for element in list {
        if element.contains_key(label) {
            return Some(index);
        }
        index += 1;
    }

    return None;
}

fn main() -> io::Result<()> {
    // Ouverture du fichier
    let file = File::open("puzzle-input.txt")?;
    let mut reader = io::BufReader::new(file);

    // Création de line pour stocker la chaine
    let mut line = String::new();
    let len = reader.read_line(&mut line)?;
    println!("First line is {len} bytes long");

    // Variable pour Part 1
    let mut result_part1: usize = 0;

    // Création d'un vecteur de LinkedList avec des HashMap vides à l'intérieur
    let mut boxes: Vec<LinkedList<HashMap<String, usize>>> = vec![];

    // Ajout de 255 LinkedList avec des HashMap vides
    for _ in 0..256 {
        boxes.push(LinkedList::new());
    }

    // Utilisation de la méthode split() pour itérer sur les éléments séparés par ';'
    for seq in line.split(',') {
        // hash sur toute la string pour Part 1
        result_part1 += hash(seq).unwrap();

        // Extraction des deux premiers caractères dans la variable `box`
        let mut label: String = "".to_string(); //= seq.chars().take(2).collect();
                                                // Extraction du troisième caractère dans la variable `operation`
        let mut operation: String = "".to_string(); //= seq.chars().nth(2).unwrap().to_string();

        // Extraction du quatrième caractère dans la variable `lens` et conversion en entier
        let mut lens = 0;
        //if seq.len() > 3 {
        //    lens = seq.chars().nth(3).unwrap().to_string().parse().unwrap();
        //}

        // Decoupage pour Part 2
        for c in seq.chars() {
            if c == '-' || c == '=' {
                operation = c.to_string();
                continue;
            }
            if c.is_digit(10) {
                lens = c.to_string().parse().unwrap();
                continue;
            } else {
                label += &c.to_string();
                continue;
            }
        }

        // println!("box: {}", boite_n); // Affichera les deux premiers caractères
        // println!("label: {}", label);
        // println!("operation: {}", operation); // Affichera le troisième caractère
        // println!("lens: {}", lens); // Affichera le quatrième caractère converti en entier

        // Utilisation du vecteur
        let boite_n: usize = hash(&label).unwrap();
        // Par exemple, accéder à la première LinkedList
        let boite = &mut boxes[boite_n];
        // Supprime une lens
        if operation.contains('-') {
            if let Some(index) = label_at(boite, &label) {
                // Split the list in 2
                let mut split_list = boite.split_off(index);
                // Remove the first element of the second half
                split_list.pop_front();
                // Join the 2 halves back together, except for the middle element
                boite.append(&mut split_list);
                //boite.remove(index);
            }
        } else {
            // Else operation =
            // If element exist => Update
            if let Some(index) = label_at(boite, &label) {
                let mut j: usize = 0;
                for l in boite.iter_mut() {
                    if j == index {
                        l.insert((*label).to_string(), lens);
                    }
                    j += 1;
                }
            } else {
                // Else add lens
                let mut new_lens = HashMap::new();
                new_lens.insert(label, lens);
                boite.push_back(new_lens);
            }
        }

        // Affichage pour vérification
        // println!("{:?}", boxes);
    }

    // Variable pour Part 2
    let mut result_part2: usize = 0;
    let mut b: usize = 1;

    for boite in boxes {
        // boite is LinkedList
        let mut e: usize = 1;
        for element in boite {
            result_part2 += b
                * e
                * element
                    .values()
                    .cloned()
                    .collect::<Vec<_>>()
                    .first()
                    .unwrap();
            //result_part2 += b * e * element.values().chars().nth(1).parse().unwrap();
            e += 1;
        }
        b += 1;
    }

    println!("Day 15 Part 1 {:?}", result_part1);
    println!("Day 15 Part 2 {:?}", result_part2);
    Ok(())
}
