#!/usr/bin/python3

##
# URL: https://adventofcode.com/2023/day/14
# 

import pprint

def bubbleSort(array):
    # loop to access each array element
    for i in range(len(array)):
        # detect unmovable objetc
        if array[i] == '#':
            continue

        # loop to compare array elements
        for j in range(0, len(array)-1):

            # compare two adjacent elements
            # change > to < to sort in descending order
            if array[j] == 'O' and array[j + 1] != '#':

                # swapping elements if elements
                # are not in the intended order
                temp = array[j]
                array[j] = array[j+1]
                array[j+1] = temp

def weight_array_part2(array):
    total_weight = 0
    for i, row in enumerate(array):
        for j, val in enumerate(row):
            if val == 'O':
                total_weight += len(array) - i
    
    return total_weight

def weight_array(array):
    total_weight = 0
    for i, row in enumerate(array):
        for j, val in enumerate(row):
            if val == 'O':
                total_weight += j + 1
    
    return total_weight

def one_tilt(arr):
     return [list(line)[::-1] for line in zip(*arr)]

def hash_list(arr):
    # from [][] to str
    return ''.join(list(map(lambda x: ''.join(x), arr)))

carte = list()
resulat_puzzle = 0

# Cache system to avoid bubbleSort
temoin = dict()

# Detection de Cycle
carte_sorted = dict()
loads_part2 = dict()

# Ouvre le fichier en mode lecture
nom_fichier = 'puzzle-input.txt'
with open(nom_fichier, 'r') as fichier:
    # Lit chaque ligne du fichier
    for ligne in fichier:
        # Creation carte
        carte.append(ligne.strip())

# First
for c in range(0, 1000000000):
    for t in range(0, 4):
        #print('===== tilt %d ======' % t)
        carte = one_tilt(carte) # Transpo colones en lignes
        
        for i, row in enumerate(carte):
            state = str(row)
            if state in temoin:
                #print('use cache')
                carte[i] = temoin[state].copy()
            else:
                bubbleSort(row)
                temoin[state] = row.copy()

        if t == 0 and c == 0: # Part 1
            resulat_puzzle = weight_array(carte)
    
    carte_hash = hash_list(carte)
    if carte_hash in carte_sorted: # Detect cycle pattern
        break
    else:
        carte_sorted[carte_hash] = c + 1 # Store new pattern
        loads_part2[c + 1] = weight_array_part2(carte)
    print("cycle %d : %d" % (c, len(carte_sorted)))


## Solve 
cycle = c + 1
loads_index = (( 1000000000 - carte_sorted[carte_hash]) % (c - carte_sorted[carte_hash])) + carte_sorted[carte_hash]
resulat_puzzle_part2 = loads_part2[loads_index]


print("===== Réponse du day-1 =====")
print("Part 1:", resulat_puzzle)
print("Part 2:", resulat_puzzle_part2)