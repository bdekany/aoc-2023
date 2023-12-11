#!/usr/bin/python3


# Ouvre le fichier en mode lecture
nom_fichier = 'puzzle-input.txt'
resulat_puzzle = 0
carte_galactique = list()
carte_ponderee = list()
positions = list()
# SPACE = 2 # Part 1
SPACE = 1000000 # Part 2


def waze(depart, arrivee, carte_poid):
    x = list()
    y = list()
    if depart[1] < arrivee[1]:
        x = carte_poid[1][depart[1]:arrivee[1]]
    else:
        x = carte_poid[1][arrivee[1]:depart[1]]
    
    if depart[0] < arrivee[0]:
        for i in range(depart[0], arrivee[0]):
            y.append(carte_poid[i][arrivee[1]])
    else:
        for i in range(arrivee[0], depart[0]):
            y.append(carte_poid[i][arrivee[1]])

    #print(x, y)
    return sum(x) + sum(y)

with open(nom_fichier, 'r') as fichier:
    # Lit chaque ligne du fichier
    for j, ligne in enumerate(fichier):

        # Trouve les galaxies;
        for pos, char in enumerate(ligne):
            if char == '#':
                positions.append([j, pos])
       
        # On ajout la ligne dans la galaxie
        carte_galactique.append(ligne.strip())

        # Si ligne sans galaxy (#) on double
        if '#' not in ligne:
            carte_ponderee.append([SPACE] * len(ligne.strip()))
        else:
            carte_ponderee.append([1] * len(ligne.strip()))
        
for i in range(len(carte_galactique[0])):
    # Si on trouve une colone sans galaxie (#) On ajoute un poid
    if all(ligne[i] == '.' for ligne in carte_galactique):
        for j in range(len(carte_ponderee)):
            # carte_ponderee[j][i] += 1 # Part1
            carte_ponderee[j][i] = SPACE

# print(carte_ponderee)

for k, position in enumerate(positions):
    if k+1 == len(positions):
        # On ne compare pas la derniere galaxie à elle meme
        break
    
    # Part 1
    for galaxie_lointaine in positions[k+1:]:
        resulat_puzzle += waze(position, galaxie_lointaine, carte_ponderee)

    #print(positions[k+1:])

print("===== Réponse du day-11 part 2 =====")
print(resulat_puzzle)
#print(resulat_puzzle_part2)