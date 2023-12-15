use std::fs::File;
use std::io::{self, BufRead};

fn main() -> io::Result<()> {
    // Ouverture du fichier
    let file = File::open("puzzle-input.txt")?;
    let mut reader = io::BufReader::new(file);

    // Création de line pour stocker la chaine
    let mut line = String::new();
    let len = reader.read_line(&mut line)?;
    println!("First line is {len} bytes long");

    // Variable pour Part 1
    let mut result_part1: u32 = 0;

    // Utilisation de la méthode split() pour itérer sur les éléments séparés par ';'
    for seq in line.split(',') {
        println!("{:?}", seq.as_bytes());
        let mut value: u32 = 0;
        for i in seq.as_bytes() {
            value += *i as u32;
            value *= 17;
            value %= 256
        }
        result_part1 += value;
    }

    println!("Day 15 Part 1 {:?}", result_part1);
    Ok(())
}
