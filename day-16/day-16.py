#!/usr/bin/python3

##
# URL: https://adventofcode.com/2023/day/16
# 
import pprint
from enum import Enum

def next_tile(x, y, dx, dy):
    x = max(min(x + dx, 109), 0)
    y = max(min(y + dy, 109), 0)
    return x, y

def energize(x, y, tiles, temoin, dx, dy):
    temoin[x] = temoin[x][:y] + "#" + temoin[x][y+1:]
    key = (x, y).__str__()
    dir = (dx, dy).__str__()
    if key not in tiles:
        tiles[key] = list()
    tiles[key].append(dir)

def is_energize(x, y, tiles, dx, dy):
    key = (x, y).__str__()
    dir = (dx, dy).__str__()
    if key not in tiles:
        return False
    if dir not in tiles[key]:
        return False
    return True

carte = list()
temoin = list()
energize_tiles = dict()

# Ouvre le fichier en mode lecture
nom_fichier = 'puzzle-input.txt'
with open(nom_fichier, 'r') as fichier:
    # Lit chaque ligne du fichier
    for ligne in fichier:
        # Creation carte
        carte.append(ligne.strip())

#pprint.pprint(carte)
temoin = carte.copy()

# Entree en haut a gauche
x = 0
y = 0
dx = 0
dy = 1

# crossroads
crossroads = list()

beam = True

while beam or len(crossroads) > 0:
    # Enrgize case + Analyse + set Next Tile
    energize(x, y, energize_tiles, temoin, dx, dy)

    if carte[x][y] == ".":
        x, y = next_tile(x, y, dx, dy)

    elif carte[x][y] == "-":
        if dx == 0:
            x, y = next_tile(x, y, dx, dy)
        else:
            # Store Left path for later
            crossroads.append({'x': x, 'y': y, 'dx': 0, 'dy': -1})
            # Go Right
            dx, dy = 0, 1
            x, y = next_tile(x, y, dx, dy)
    
    elif carte[x][y] == "|":
        if dy == 0:
            x, y = next_tile(x, y, dx, dy)
        else:
            # Store Down path for later
            crossroads.append({'x': x, 'y': y, 'dx': 1, 'dy': 0})
            # Go Up
            dx, dy = -1, 0
            x, y = next_tile(x, y, dx, dy)
    
    elif carte[x][y] == "/":
        if dy == -1:
            dx, dy = 1, 0
            x, y = next_tile(x, y, dx, dy)
        elif dx == -1:
            dx, dy = 0, 1
            x, y = next_tile(x, y, dx, dy)
        elif dy == 1:
            dx, dy = -1, 0
            x, y = next_tile(x, y, dx, dy)
        elif dx == 1:
            dx, dy = 0, -1
            x, y = next_tile(x, y, dx, dy)
            
    elif carte[x][y] == "\\":
        if dy == -1:
            dx, dy = -1, 0
            x, y = next_tile(x, y, dx, dy)
        elif dx == -1:
            dx, dy = 0, -1
            x, y = next_tile(x, y, dx, dy)
        elif dy == 1:
            dx, dy = 1, 0
            x, y = next_tile(x, y, dx, dy)
        elif dx == 1:
            dx, dy = 0, 1
            x, y = next_tile(x, y, dx, dy)

    # Decision
    # If next already Energize: next crossroads
    if is_energize(x, y, energize_tiles, dx, dy):
        beam = False
        if len(crossroads) > 0:
            new_path = crossroads.pop()
            x = new_path['x']
            y = new_path['y']
            dx = new_path['dx']
            dy = new_path['dy']
            beam = True

    #pprint.pprint(temoin)
    #pprint.pprint(energize_tiles)
    #username = input("Enter next:")

resulat_puzzle = len(energize_tiles.keys())

#print("===== Réponse du day-1 =====")
print("Part 1:", resulat_puzzle)
#print("Part 2:", resulat_puzzle_part2)