#!/usr/bin/env ruby

##
# URL https://adventofcode.com/2023/day/3
# Part 1
# Mettre le fichier en tablea
# Pour chaque ligne trouve les nombres
# pour chaque nombre trouve symbole adjacents
# Addition
##

def trouve_symbole(position, taille, tableau, index)
    caratere_adjacents = ""
    
    # On evite les outOfBound
    if position == 0
        droite = 0
    else
        droite = position-1
    end
    if position+taille > tableau[0].length-1
        gauche = tableau[0].length-1
    else
        gauche = position+taille
    end
    
    # Caractères au dessus sauf index=0
    if index != 0
        caratere_adjacents += tableau[index-1][droite..gauche]
    end

    # Caratères au dessous sauf index=tableau.length-1
    if index != tableau.length-1
        caratere_adjacents += tableau[index+1][droite..gauche]
    end

    # Caractères à droite et gauche
    caratere_adjacents += tableau[index][droite] + tableau[index][gauche]

    if caratere_adjacents.match(/[^\.\d]/)
        return true
    end
end

##
# Part 2
# pour chaque nombre,
# trouver * adjacente
# stock nombre dans un tableau avec la position de l'étoile
# si nombre existe  => on mutiplie
##

def trouve_etoile(position, taille, tableau, index)
    # On evite les outOfBound
    if position == 0
        droite = 0
    else
        droite = position-1
    end
    if position+taille > tableau[0].length-1
        gauche = tableau[0].length-1
    else
        gauche = position+taille
    end
    
    # Caractères au dessus sauf index=0
    if index != 0
        ligne = tableau[index-1][droite..gauche]
        if ligne.index("*")
            x_pos = position + ligne.index("*")
            y_pos = index-1
        end
    end

    # Caratères au dessous sauf index=tableau.length-1
    if index != tableau.length-1
        ligne = tableau[index+1][droite..gauche]
        if ligne.index("*")
            x_pos = position + ligne.index("*")
            y_pos = index+1
        end
    end

    # Caractères à droite et gauche
    if tableau[index][droite].index("*")
        x_pos = tableau[index][droite].index("*")
        y_pos = index
    end
    if tableau[index][gauche].index("*")
        x_pos = tableau[index][gauche].index("*")
        y_pos = index
    end

    if x_pos != nil && y_pos != nil
        return x_pos, y_pos
    end
    return nil, nil
end

resultat_part1 = 0
resultat_part2 = 0

# Lis le contenu du fichier et met chaque ligne dans un tableau
file_path = 'puzzle-input.txt'
tableau = File.readlines(file_path, chomp: true)

# Tableau GPS Etoile pour part2
gps_etoile = Hash.new

# Utilisation de la méthode each_with_index pour parcourir le tableau et afficher chaque élément avec son index
tableau.each_with_index do |chaine, index|
    # Utiliser une expression régulière pour trouver toutes les occurrences du nombre dans la chaîne
    chaine.scan(/(\d+)/) do |w|
        valeur = w[0]
        taille = valeur.length
        position = Regexp.last_match.begin(0)
        if trouve_symbole(position, taille, tableau, index)
            puts "#{valeur} est une piece"
            resultat_part1 += valeur.to_i
        end

        x, y = trouve_etoile(position, taille, tableau, index)
        if x != nil && y != nil
            if gps_etoile[[x,y]] != nil
                puts "#{valeur} est une co-gear"
                resultat_part2 += gps_etoile[[x,y]] * valeur.to_i
            else
                puts "#{valeur} est une gear"
                gps_etoile[[x,y]] = valeur.to_i
            end
        end
    end
end


puts "===== Resultats Day 3 ====="
puts "Part 1: #{resultat_part1}"
puts "Part 2: #{resultat_part2}"