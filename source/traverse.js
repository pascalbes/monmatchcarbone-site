import removeDiacritics from './utils/remove-diacritics'
import R from 'ramda'
import cddRules from './load-cdd-rules'
import initialSituation from './initialSituation'

/*

L'objectif dans un premier temps est de faire une démonstration d'interface de saisie pour calculer les obligations du CDD. Le CDD est un contrat d'exception, ce qui le rend assez complexe.

Les Variables du système social comportent des entrées particulières (des cléfs de l'objet) que l'on nommera "mécanismes". Elles diffèrent des entrées simples (telle la description d'une variable) car elles sont susceptibles de comporter des variables, et la description de calculs.

Voici une liste des mécanismes qui sont à traverser pour notamment :
	- d'extraire les variables utilisées et donc que l'utilisateur devra saisir
	- d'attribuer une note à ces variables pour déterminer la prochaine saisie (ou "question")
	- de court-circuiter les branches rendues inutiles par la situation courante saisie par l'utilisateur, ce qui influence la note.

Dans un premier temps, l'idée est de créer un formulaire à questions unitaires optimisées pour que la saisie de données inutiles soit évitée.


- Il faut résoudre le calcul des variables.
	- ça introduit l'assiette 2300€
	- ça nous donne son intervalle en % vu que l'assiette est constante, et donc un avancement du formulaire
	- ça nous donne des résultats !!!!!! :))


- Il faut donner des explications à TOUTES les variables. Aucune n'est triviale !

- Il faut ajouter la notion d'entité.
- Ce qui permettra de regrouper les questions par thème. Exemple, demander "Quel type de CDD" et ordonner les réponses possibles par influence (e.g. si c'est un CDD d'usage )


-----------------------------------------

*/


let expressionTests = {
	'negatedVariable': v => /!((?:[a-z0-9]|\s|_)+)/g.exec(v),
	// Cette regexp est trop complexe (il faut parser le tableau après le symbole d'inclusion) !
	// 'variableIsIncludedIn': v => /((?:[a-z0-9]|\s|_)+)⊂*/g.exec(v),
	'variableComparedToNumber': v => /((?:[a-z0-9]|\s|_)+)([<|>]=?)\s+([0-9]+)/g.exec(v),
	'numberComparedToVariable': v =>  /([0-9]+)\s+([<|>]=?)((?:[a-z0-9]|\s|_)+)/g.exec(v),
	'variableEqualsNumber': v =>  /((?:[a-z0-9]|\s|_)+)=((?:[a-z0-9]|\s|_)+)/g.exec(v),
	'variable': v =>  /((?:[a-z0-9]|\s|_)+)/g.exec(v)
}

let recognizeExpression = rawValue => {
	let
		value = removeDiacritics(rawValue).toLowerCase(),
		match

	match = expressionTests['negatedVariable'](value)
	if (match) {
		let [, variableName] = match
		return [variableName, `!${variableName}`]
	}

	match = expressionTests['variableComparedToNumber'](value)
	if (match) {
		let [, variableName, symbol, number] = match
		return [variableName, `situation[${variableName}] ${symbol} ${number}`]
	}

	match = expressionTests['numberComparedToVariable'](value)
	if (match) {
		let [, number, symbol, variableName] = match
		return [variableName, `${number} ${symbol} situation[${variableName}]`]
	}

	match = expressionTests['variableEqualsNumber'](value)
	if (match) {
		let [, variableName, number] = match
		return [variableName, `situation[${variableName}] == ${number}`]
	}


	match = expressionTests['variable'](value)
	if (match) {
		let [variableName] = match
		return [variableName, `situation["${variableName}"]`]
	}
}



let analyseVariable = situation =>
	R.pipe(
		R.toPairs,
		R.reduce(([variableNames, result], [key, value]) => {
			if (key === 'concerne'){
				let [variableName, evaluation] = recognizeExpression(value)
				if (typeof situation[variableName] !== 'undefined'){
					if (!eval(evaluation)){
						return R.reduced([[]])
					} else {
						return [variableNames, null]
					}
				}
				return [[...variableNames, variableName]]
			}

			if (key === 'non applicable si') {
				let conditions = value['l\'une de ces conditions']
				let subVariableNames = R.reduce((variableNames, expression) => {
					let [variableName, evaluation] = recognizeExpression(expression)
					// console.log('evaluation', variableName, evaluation)
					if (typeof situation[variableName] !== 'undefined'){
						if (eval(evaluation)){
							return R.reduced([])
						} else {
							return variableNames
						}
					}
					return [...variableNames, variableName]
				}, [])(conditions)
				console.log('subVariableNames', subVariableNames)
				return [variableNames.concat(subVariableNames)]
			}

			if (key === 'formule'){
				if (value['linéaire']){
					let {assiette, taux} = value['linéaire']

					// A propos de l'assiette
					let assietteVariableName = removeDiacritics(assiette),
						assietteValue = situation[assietteVariableName],
						unknownAssiette = typeof assietteValue !== 'number'

					if (unknownAssiette){
						return [[...variableNames, assietteVariableName]]
					} else {
						if (variableNames.length > 0) {
							return [variableNames]
						}
					}

					// Arrivés là, cette formule devrait être calculable !

					// A propos du taux
					if (typeof taux !== 'string' && typeof taux !== 'number'){
						throw 'Oups, pas de taux compliqués s\'il-vous-plaît'
					}
					let tauxValue = taux.indexOf('%') > -1 ?
						+taux.replace('%', '')/100 :
						+taux

					return R.reduced([null, assietteValue * tauxValue])
				}
			}

			return [variableNames]
		}, [[], null])
	)

export let analyseSituation = (situation = initialSituation) =>
	R.pipe(
		R.map(analyseVariable(situation)),
		R.flatten()
	)(cddRules)


// console.log('RES', JSON.stringify(res))


// let types = {
	/*
	(expression):
		| (variable)
		| (négation)
		| (égalité)
		| (comparaison numérique)
		| (test d'inclusion court)
	*/

// }

// let root = {
// 	Variable: {
// 		'concerne': types['expression'],
// 		'ne concerne pas': types['expression']
// 		// 'applicable si': types['boolean logic'],
// 		// 'non applicable si': types['boolean logic']
// 	}
// }

/*
Variable:
	- applicable si: (boolean logic)
	- non applicable si: (boolean logic)
	- concerne: (expression)
	- ne concerne pas: (expression)

(boolean logic):
	toutes ces conditions: ([expression | boolean logic])
	l'une de ces conditions: ([expression | boolean logic])
	conditions exclusives: ([expression | boolean logic])

"If you write a regular expression, walk away for a cup of coffee, come back, and can't easily understand what you just wrote, then you should look for a clearer way to express what you're doing."

Les expressions sont le seul mécanisme relativement embêtant pour le moteur. Dans un premier temps, il les gerera au moyen d'expressions régulières, puis il faudra probablement mieux s'équiper avec un "javascript parser generator" :
https://medium.com/@daffl/beyond-regex-writing-a-parser-in-javascript-8c9ed10576a6


(variable): (string)

(négation):
	! (variable)

(égalité):
	(variable) = (variable.type)

(comparaison numérique):
	| (variable) < (variable.type)
	| (variable) <= (variable.type)
	| (variable) > (variable.type)
	| (variable) <= (variable.type)

(test d'inclusion court):
	(variable) ⊂ [variable.type]

in Variable.formule :
	- composantes
	- linéaire
	- barème en taux marginaux
	- test d'inclusion: (test d'inclusion)

(test d'inclusion):
	variable: (variable)
	possibilités: [variable.type]


# pas nécessaire pour le CDD

	in Variable
		- variations: [si]

	(si):
		si: (expression)
		# corps




	*/