#!/usr/bin/python3

##
# URL: https://adventofcode.com/2023/day/23
# 
import pprint

def find_path(x, y, c):
    v = list() # Liste de voisins

    if x != 0:
        if carte[x-1][y] == '.' or carte[x-1][y] == '^':
            v.append([x-1, y])
    if x != 140:
        if carte[x+1][y] == "." or carte[x+1][y] == "v":
            v.append([x+1, y])
    if y != 0 :
        if carte[x][y-1] == "." or carte[x][y-1] == "<":
            v.append([x, y-1])
    if y != 140:
        if carte[x][y+1] == "." or carte[x][y+1] == ">":
            v.append([x, y+1])

    return v


carte = list()
temoin = list()


# Ouvre le fichier en mode lecture
nom_fichier = 'puzzle-input.txt'
with open(nom_fichier, 'r') as fichier:
    # Lit chaque ligne du fichier
    for ligne in fichier:
        # Creation carte
        carte.append(ligne.strip())

temoin = carte.copy()

pprint.pprint(carte)

# Entree en haut a gauche
sx = 0
sy = 1

# Sortie bas droite
dx = 140
dy = 139

# crossroads
seen = list()
crossroads = [[sx, sy, seen]]

resulat_puzzle = 0


while len(crossroads) > 0:
    startpoint = crossroads.pop()

    x = startpoint[0]
    y = startpoint[1]
    cur_path = startpoint[2]

    if x == dx and y == dy:
        print('chemin ok %d' % len(cur_path))
        resulat_puzzle = max(resulat_puzzle, len(cur_path) )

    cur_path.append([x, y])

    next_path = find_path(x, y, carte)

    for n in next_path:
        if n not in cur_path:
            crossroads.append([n[0], n[1], cur_path.copy()])
    
for t in cur_path:
    temoin[t[0]] = temoin[t[0]][:t[1]] + "O" + temoin[t[0]][t[1]+1:]
pprint.pprint(temoin)

        


#print("===== Réponse du day-1 =====")
print("Part 1:", resulat_puzzle)
#print("Part 2:", resulat_puzzle_part2)