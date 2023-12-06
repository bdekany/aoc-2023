package main

import (
	"bufio"
	"fmt"
	"os"
	"regexp"
	"strconv"
	"strings"
)

func calculPart1 (tempsTotal int, distanceRef int) int {
	possibilite := 0

	tempsCharge :=1
	for tempsCharge < tempsTotal {
		tempsMouvement := tempsTotal - tempsCharge

		// tempsCharge == vitesse en mm/ms
		if tempsCharge * tempsMouvement > distanceRef {
			// Condition vraie : le produit est supérieur à distanceRef
			possibilite++
		}
		
		// next
		tempsCharge++
	}

	return possibilite

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

	// Expression régulière pour correspondre aux nombres
	regex := regexp.MustCompile(`\d+`)

	// Tableaux pour stocker les nombres des deux premières lignes
	tempsCourses := make([]string, 0)
	distanceCourses := make([]string, 0)

	// Lire les deux premières lignes
	for scanner.Scan() {
		line := scanner.Text()

		// Correspondre à la regex pour extraire les nombres
		numeros := regex.FindAllString(line, -1)

		// Stocker les nombres des deux lignes respectives
		// si tempsCours est vide, on est sur la première ligne
		if len(tempsCourses) == 0 {
			tempsCourses = append(tempsCourses, numeros...)
			continue
		} 
		distanceCourses = append(distanceCourses, numeros...)
	}

	// Vérifier les tableaux de nombres obtenus
	fmt.Println("Nombres de la première ligne :", tempsCourses)
	fmt.Println("Nombres de la deuxième ligne :", distanceCourses)

	if err := scanner.Err(); err != nil {
		fmt.Println("Erreur lors de la lecture du fichier :", err)
	}

	// Part 1
	resultat_part1 := 1
	for i:=0; i < len(tempsCourses); i++ {
        fmt.Println("Course :", i)
		temps, _ := strconv.Atoi(tempsCourses[i])
		distanceRef, _ := strconv.Atoi(distanceCourses[i])

		resultat_part1 *= calculPart1(temps, distanceRef)
    }

	fmt.Println("Part 1 :", resultat_part1)

	// Part 2
	resultat_part2 := 0
	tempsPart2, _ := strconv.Atoi( strings.Join(tempsCourses, "") )
	distancePart2, _ := strconv.Atoi( strings.Join(distanceCourses, "") )

	resultat_part2 = calculPart1(tempsPart2, distancePart2)
	fmt.Println("Part 2 :", resultat_part2)
	
}
