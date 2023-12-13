package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
	"strconv"
)


func compareMotif(onsen, motif string) bool {
	var isValid = true

	// fmt.Println("compareMotif: ", onsen, motif)

	for i, m := range motif {
		if onsen[i] != byte(m) && m != '?' {
			isValid = false
			break
		} 
	}

	return isValid
}

func last(slice interface{}) int {
	switch s := slice.(type) {
	case []int:
		return len(s) - 1
	case []string:
		return len(s) - 1
	case string:
		return len(s) - 1
	// Ajouter d'autres types de slices selon tes besoins
	default:
		return -1 // Indique un type de slice non supporté
	}
}

func checksumToPattern(str string) []string {
	// 1, 2, 3 => ["#.", "##.", "###"]
	var onsens = []string{}

	for _, val := range strings.Split(str, ",") {
		nombre, _ := strconv.Atoi(val)

		newOnsen := strings.Repeat("#", nombre) + "."
		onsens = append(onsens, newOnsen)
	}

	// recupere le dernier Onsen
	lastOnsen := onsens[last(onsens)]
	// Enleve le dernier char (.)
	lastOnsen = lastOnsen[:last(lastOnsen)]
	// new slice
	onsens = append(onsens[:last(onsens)], lastOnsen)

	// fmt.Println("Onsens trouvés: ", onsens)
	return onsens
}


func genPattern(currentPattern, degradedMotif string, badOnsens []string) int {
	var possible int
	
	// point de dépar de l'ajout de motif
	var index int
	index = len(currentPattern)

	// Onsen à placer
	onsen := badOnsens[0]

	// currentPattern + onsen + a venir <= degradedMotif
	lCurrent := len(currentPattern)
	// longeur de onsens à venir
	var lOnsens int
	for _, o := range badOnsens[1:] {
		lOnsens += len(o)
	}

	for lCurrent + len(onsen) + lOnsens <= len(degradedMotif) {
		
		/*
		if len(currentPattern + onsen) > len(degradedMotif) {
			break
		}
		*/

		// est-ce que pattern i, passe dans motif.slice(a, b)
		// fmt.Println("index ", index, index+len(onsen))
		if compareMotif(onsen, degradedMotif[index:index+len(onsen)]) {

			if len(badOnsens[1:]) == 0 {
				fmt.Println("Full Pattern")
				possible +=1
			} else {
				var nextPattern = currentPattern + onsen
				fmt.Println("Next Deep", nextPattern, degradedMotif, badOnsens[1:])
				possible += genPattern(nextPattern, degradedMotif, badOnsens[1:])
			}

		}
		
		// tenter la prochaine iteration
		onsen = "." + onsen
		fmt.Println("Next Loop", onsen)
	}

	return possible

}

func main() {
	// Ouvrir le fichier
	file, err := os.Open("puzzle-input.txt")
	if err != nil {
		fmt.Println("Erreur lors de l'ouverture du fichier:", err)
		return
	}
	defer file.Close()

	var result_part1 int

	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		line := scanner.Text()

		args := strings.Split(line, " ")
		degradedMotif := args[0]
		badOnsens := checksumToPattern(args[1])

		fmt.Println("Test de ", degradedMotif, badOnsens)
		result_part1 += genPattern("", degradedMotif, badOnsens)

		fmt.Println(result_part1)

	}

	if err := scanner.Err(); err != nil {
		fmt.Println("Erreur lors de la lecture du fichier :", err)
	}

	fmt.Println("Day 12 - Part 1: ", result_part1)
}