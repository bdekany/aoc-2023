#!/usr/bin/python3

##
# URL: https://adventofcode.com/2023/day/5
# 

import re

class Jardinier:
    maps = {
        "seed-to-soil": list(),
        "soil-to-fertilizer": list(),
        "fertilizer-to-water": list(),
        "water-to-light": list(),
        "light-to-temperature": list(),
        "temperature-to-humidity": list(),
        "humidity-to-location": list()
    }

    def trouve_correspondance(self, nom_de_map, entree):
        for map in self.maps[nom_de_map]:
            if map["source"] <= entree and entree <= map["source"] + map["gamme"]:
                gamme = entree - map["source"]
                # renvoi la destination
                return map["dest"] + gamme
        # renvoie dest == source
        return entree
    
    def trouve_localisation_depuis_seed(self, entree):
        return self.trouve_correspondance("humidity-to-location",
                self.trouve_correspondance("temperature-to-humidity",
                self.trouve_correspondance("light-to-temperature",
                self.trouve_correspondance("water-to-light",
                self.trouve_correspondance("fertilizer-to-water",
                self.trouve_correspondance("soil-to-fertilizer",
                self.trouve_correspondance("seed-to-soil", entree)))))))


resulat_puzzle = 0
liste_seeds = []
nom_de_map = ""
gardener = Jardinier()

# Ouvre le fichier en mode lecture
nom_fichier = 'puzzle-input.txt'
with open(nom_fichier, 'r') as fichier:
    # Lit chaque ligne du fichier
    for ligne in fichier:
        # detection de la ligne 1
        if ligne.startswith("seeds: "):
            # convertion en Int de la ligne seeds: 1 2 3 4
            liste_seeds = list(map(lambda x: int(x), ligne.split()[1:]))
            continue
        
        # Detection debut map
        if "map:" in ligne:
            nom_de_map = ligne.split()[0]
            continue

        # Ajoute une entree dans la map
        if ligne.strip():
            dest, source, gamme = map(lambda x: int(x), ligne.split())
            gardener.maps[nom_de_map].append({'dest': dest, 'source': source, 'gamme': gamme-1})

## Test
# seed = 4106085912
# print(gardener.trouve_localisation_depuis_seed(seed))

for seed in liste_seeds:
    localisation = gardener.trouve_localisation_depuis_seed(seed)
    if resulat_puzzle > localisation or resulat_puzzle == 0:
        resulat_puzzle = localisation

print("===== Réponse du day-1 =====")
print("Part 1:", resulat_puzzle)
