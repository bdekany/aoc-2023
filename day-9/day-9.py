##
# URL https://adventofcode.com/2023/day/9
##

def tous_egaux(serie):
    return all(element == serie[0] for element in serie)

def preduction(serie):
    difference = []
    
    for i in range( len(serie) -  1):
        difference.append( serie[i+1] - serie[i] )
    
    if tous_egaux(difference):
        return serie[-1] + difference[0], serie[0] - difference[0]

    return serie[-1] + preduction(difference)[0], serie[0] - preduction(difference)[1]

resulat_puzzle = 0
resulat_puzzle_part2 = 0

# Ouvre le fichier en mode lecture
nom_fichier = 'puzzle-input.txt'
with open(nom_fichier, 'r') as fichier:
    # Lit chaque ligne du fichier
    for ligne in fichier:
        # Créer un serie
        serie = list(map(lambda x: int(x), ligne.split()))
        # Prédiction de la prochaine valeur
        futur, passer = preduction(serie)
        resulat_puzzle += futur
        resulat_puzzle_part2 += passer

print("===== Réponse du day-1 =====")
print(resulat_puzzle)
print(resulat_puzzle_part2)