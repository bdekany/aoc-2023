#!/usr/bin/python3


# Ouvre le fichier en mode lecture
nom_fichier = 'puzzle-input.txt'
resulat_puzzle = 0
carte_galactique = list()

def waze(depart, arrivee):
    x = abs(depart[0] - arrivee[0])
    y = abs(depart[1] - arrivee[1])
    return x + y

with open(nom_fichier, 'r') as fichier:
    # Lit chaque ligne du fichier
    for ligne in fichier:
        # On ajout la ligne dans la galaxie
        carte_galactique.append(ligne.strip())
        # Si ligne sans galaxy (#) on duplique
        if '#' not in ligne:
            carte_galactique.append(ligne.strip())
        
i = 0
while i < len(carte_galactique[0]):
    # Si on trouve une colone sans galaxie (#) On double
    if all(ligne[i] == '.' for ligne in carte_galactique):
        carte_galactique = list(map(lambda ligne: ligne[:i] + '.' + ligne[i:], carte_galactique))
        i += 1
    i += 1

# Trouve les galaxies
positions = list()
for j, ligne in enumerate(carte_galactique):
    for pos, char in enumerate(ligne):
        if char == '#':
            positions.append([j, pos])

for k, position in enumerate(positions):
    if k+1 == len(positions):
        # On ne compare pas la derniere galaxie à elle meme
        break
    
    # Part 1
    for galaxie_lointaine in positions[k+1:]:
        resulat_puzzle += waze(position, galaxie_lointaine)

    #print(positions[k+1:])

print("===== Réponse du day-1 =====")
print(resulat_puzzle)
#print(resulat_puzzle_part2)