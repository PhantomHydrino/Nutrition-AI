package services

import "strings"

func NormalizeFood(input string) string {
	return strings.ToLower(input)
}
