package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

// Signale représente un event
type Signal struct {
	nomModule string
	source    string
	pulse     int // 0 low, 1 high
}

// Module représente une structure de module
type Module struct {
	name         string
	modtype      string
	isOn         bool
	destinations []string
	sources      map[string]int
}

// NouveauModule crée une nouvelle instance de Module avec des valeurs par défaut
func NouveauModule(name, modtype string, destinations []string) *Module {
	return &Module{
		name:         name,
		modtype:      modtype,
		isOn:         false, // État par défaut
		destinations: destinations,
		sources:      make(map[string]int),
	}
}

// SetState change l'état du module
func (m *Module) SetState(newState bool) {
	m.isOn = newState
}

// AddDestination ajoute une destination au module
func (m *Module) AddDestination(destination string) {
	m.destinations = append(m.destinations, destination)
}

// AddSource ajoute une source avec une valeur au module
func (m *Module) AddSource(key string, value int) {
	m.sources[key] = value
}

func (m *Module) NewSignal(s Signal) []Signal {
	var sType = s.pulse
	var newSignals []Signal

	// if broadcast : pas de changement
	if m.modtype == "b" {
		for _, dest := range m.destinations {
			newSignals = append(newSignals, Signal{dest, m.name, sType})
		}
	}
	// Flip-flop
	if m.modtype == "%" && sType == 0 {
		if m.isOn {
			m.isOn = false
		} else {
			m.isOn = true
			sType = 1
		}
		for _, dest := range m.destinations {
			newSignals = append(newSignals, Signal{dest, m.name, sType})
		}
	}

	// Conjunction
	if m.modtype == "&" {
		m.sources[s.source] = sType
		var srcValue int

		for _, src := range m.sources {
			srcValue += src
		}

		if len(m.sources) == srcValue { // If all source High
			sType = 0
		} else {
			sType = 1
		}

		for _, dest := range m.destinations {
			newSignals = append(newSignals, Signal{dest, m.name, sType})
		}

	}
	/* for _, dest := range m.destinations {
		s = append(s, Signal{dest, sType})
	} */

	return newSignals
}

func main() {
	// Ouvrir le fichier
	file, err := os.Open("puzzle-input.txt")
	if err != nil {
		fmt.Println("Erreur lors de l'ouverture du fichier:", err)
		return
	}
	defer file.Close()

	m := make(map[string]*Module)
	var result_part1 int
	pulseCount := [2]int{0, 0} // pulseCount[0] low , pulseCount[1] high
	signals := []Signal{}      // Liste des signaux a process

	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		line := scanner.Text()

		args := strings.Split(line, " -> ")
		typeModule := args[0][:1]
		nomModule := args[0][1:]
		destinations := strings.Split(args[1], ", ")

		m[nomModule] = NouveauModule(nomModule, typeModule, destinations)

	}

	if err := scanner.Err(); err != nil {
		fmt.Println("Erreur lors de la lecture du fichier :", err)
	}

	// Low pulse pour Conjunction
	for n, mod := range m {
		//fmt.Println("name ", n, "dest", mod.destinations)
		for _, d := range mod.destinations {
			if val, ok := m[d]; ok {
				val.AddSource(n, 0)
			}
		}
	}

	for i := 1; i <= 1000; i++ { // Mille push de chauffe
		// Press button to broadcast
		signals = append(signals, Signal{"roadcaster", "button", 0})

		for len(signals) > 0 {
			s := signals[0] // pop First item
			signals = signals[1:]

			pulseCount[s.pulse] += 1

			// fmt.Println(s.source, "->", s.pulse, "->", s.nomModule)
			if mod, ok := m[s.nomModule]; ok {
				newSignals := mod.NewSignal(s)
				signals = append(signals, newSignals...)
			}

		}

	}

	result_part1 = pulseCount[0] * pulseCount[1]

	fmt.Println("Day 20 - Part 1: ", result_part1)
}
