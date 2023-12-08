package main

import (
	"bufio"
	"fmt"
	"os"
	"regexp"
)

func toAscii(chaine string) (int, int, int) {
	valeurs := [3]int{}

    // Parcours de la chaîne pour obtenir les valeurs ASCII de chaque caractère
    for i, char := range chaine {
		// A = 65, -65 pour commence à 0
    	valeurs[i] = int(char) - 65
    }

    return valeurs[0], valeurs[1], valeurs[2]
}

func convertionChemin(chaine string) []int {
	// Chaîne de caractères composée de 'R' et 'L'
	// Initialisation d'un tableau d'entiers
	tableau := make([]int, len(chaine))

	// Remplissage du tableau selon la correspondance 'L' = 0 et 'R' = 1
	for i, char := range chaine {
		if char == 'L' {
			tableau[i] = 0
		} else if char == 'R' {
			tableau[i] = 1
		}
	}

	return tableau
}

func main() {
	// Ouvrir le fichier
	file, err := os.Open("puzzle-input.txt")
	if err != nil {
		fmt.Println("Erreur lors de l'ouverture du fichier:", err)
		return
	}
	defer file.Close()

	scanner := bufio.NewScanner(file)

	// Expression régulière pour correspondre aux nodes
	regex := regexp.MustCompile(`[A-Z]{3}`)

	// Tableau pour stocker les nombres des deux premières lignes
	var motifGaucheDroite string

	// Tableau des nodes, ou le nom de la node sera son code ASCII
	//				X.   Y.  Z. R,L xyz
	tableauNodes := [27][27][27][2][3]int{}

	// Lire les deux premières lignes
	for scanner.Scan() {
		line := scanner.Text()

		// Stocker le motif gauche droite de la première ligne
		// si motifGaucheDroite est vide, on est sur la première ligne
		if len(motifGaucheDroite) == 0 {
			motifGaucheDroite = line
			continue
		}

		// Correspondre à la regex pour extraire les nodes
		nodes := regex.FindAllString(line, -1)
		if len(nodes) < 1 {
			continue
		}
		xn, yn, zn := toAscii(nodes[0])
		xl, yl, zl := toAscii(nodes[1])
		xr, yr, zr := toAscii(nodes[2])
		// Creation de la node; ajout des nodes a gauche (0) et droite (1)
		tableauNodes[xn][yn][zn][0] = [3]int{xl, yl, zl}
		tableauNodes[xn][yn][zn][1] = [3]int{xr, yr, zr}

	}

	// Vérifier les tableaux de nombres obtenus
	// fmt.Println("Tableau de Nodes:", tableauNodes)

	if err := scanner.Err(); err != nil {
		fmt.Println("Erreur lors de la lecture du fichier :", err)
	}

	// Part 1
	// Convertion de la carte
	chemin := convertionChemin(motifGaucheDroite)
	// On cherche en partant de A, A, A
	nombrePas := 0
	x, y, z := 0, 0, 0
	for x > -1 { // infini
		if x == 25 && y == 25 && z == 25 {
			// ZZZ, tout le monde descend
			break
		}
		// On lit L(0) ou R(1) sur la premier ligne
		direction := chemin[nombrePas % len(chemin)]

		prochaineNode := tableauNodes[x][y][z][direction]
		x, y, z = prochaineNode[0], prochaineNode[1], prochaineNode[2]
		nombrePas++

	}

	fmt.Println("Part 1 Nombre de Pas :", nombrePas)
	
/*
	// Part2
	// On reutilise la variable chemin
	// chemin
	// position x, y, z * ??? (spoil 6)
	ghostNode := [][3]int{}

	// On cherche les XXA
	for i := 0; i < len(tableauNodes); i++ {
        for j := 0; j < len(tableauNodes[i]); j++ {
			// Si XXA, a une direction L(0), on le stocke en point de départ
            if tableauNodes[i][j][0][0][0] > 0 {
				ghostNode = append(ghostNode, [3]int{i, j, 0})
			}
        }
    }

	// Points de depart trouvés
	fmt.Println(ghostNode)

	nombrePas_part2 := 0
	// drapeau temoin pour valider l'arrivée 
	drapeauZ := 0
	for drapeauZ < len(ghostNode) { // si en début de boucle, drapeauZ est true, on est arrivée
		// On lit L(0) ou R(1) sur la premier ligne
		direction := chemin[nombrePas_part2 % len(chemin)]
		drapeauZ = 0
		nombrePas_part2++

		for index, node := range ghostNode {
			// node actuelle
			x, y, z := node[0], node[1], node[2]
			if z == 25 {
				drapeauZ++
			}
			prochaineNode := tableauNodes[x][y][z][direction]
			ghostNode[index] = [3]int{prochaineNode[0], prochaineNode[1], prochaineNode[2]}
		}
		if drapeauZ > 2 {
			fmt.Println(ghostNode, drapeauZ)
		}

	}

	fmt.Println("Part 2 Nombre de Pas :", nombrePas_part2)

*/
}
