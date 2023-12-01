#!/usr/bin/python3

##
# URL: https://adventofcode.com/2023/day/1
# 
# Ouvrir le fichier puzzle-input.txt
# Lire chaque ligne
# Conserver les chiffres
# Concatener le premier et dernier chiffre
# Convertir et additioner les résulats
##

import re

resulat_puzzle = 0

# Ouvre le fichier en mode lecture
nom_fichier = 'puzzle-input.txt'
with open(nom_fichier, 'r') as fichier:
    # Lit chaque ligne du fichier
    for ligne in fichier:
        # Utilisation de re pour conserver les chiffres
        ligne_sans_lettres = re.sub('[\D]', '', ligne)
	# Concatenation du premier et dernier élèments de la ligne
        valeur_cachee = ligne_sans_lettres[0] + ligne_sans_lettres[-1]
	# Convertir la chaîne en entier et ajouter au resultat
        resulat_puzzle += int(valeur_cachee)

print("===== Réponse du day-1 =====")
print(resulat_puzzle)
