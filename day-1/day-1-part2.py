#!/usr/bin/python3

##
# URL: https://adventofcode.com/2023/day/1
# 
# Ouvrir le fichier puzzle-input.txt
# Lire chaque ligne
# Trouve le premier et denier nombre
# Concatener le premier et dernier chiffre
# Convertir et additioner les résulats
##

import re

resulat_puzzle_part2 = 0

def convertir_lettre_en_chiffre(texte):
    value = re.sub('one', '1', re.sub('two', '2',
        re.sub('three', '3', re.sub('four', '4',
        re.sub('five', '5', re.sub('six', '6',
        re.sub('seven', '7', re.sub('eight', '8',
        re.sub('nine', '9', texte)))))))))
    
    return value

def decode_elf(ligne):
    pos_premier_nombre = 1000 #Oops
    premier_nombre = "zero"
    
    pos_dernier_nombre = -1
    dernier_nombre = "zero"

    chiffres = ["one", "two", "three", "four", "five",
                "six", "seven", "eight", "nine",
                "1", "2", "3", "4", "5", "6", "7", "8", "9"]    

    for c in chiffres:
        pos_find = ligne.find(c)
        if pos_find > -1 and pos_find < pos_premier_nombre :
            pos_premier_nombre = pos_find
            premier_nombre = c
        
        pos_rfind = ligne.rfind(c)
        if pos_rfind > -1 and pos_rfind > pos_dernier_nombre :
            pos_dernier_nombre = pos_rfind
            dernier_nombre = c

    premier_nombre = convertir_lettre_en_chiffre(premier_nombre)
    dernier_nombre = convertir_lettre_en_chiffre(dernier_nombre)
    
    return int(premier_nombre + dernier_nombre)

# Ouvre le fichier en mode lecture
nom_fichier = 'puzzle-input.txt'
with open(nom_fichier, 'r') as fichier:
    # Lit chaque ligne du fichier
    for ligne in fichier:
        print(ligne)
        print(decode_elf(ligne))
        resulat_puzzle_part2 += decode_elf(ligne)

print("===== Réponse du day-1 Part 2 =====")
print(resulat_puzzle_part2)
