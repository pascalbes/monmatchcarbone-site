import { utils } from 'publicodes'
import React from 'react'
import emoji from 'react-easy-emoji'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
	objectifsSelector,
	situationSelector,
} from '../../selectors/simulationSelectors'
import SimulationHumanWeight from './HumanWeight'
import { useEngine } from 'Components/utils/EngineContext'
import { correctValue, splitName } from '../../components/publicodesUtils'
import { lightenColor } from '../../components/utils/colors'
import Progress from 'Components/ui/Progress'
import { useSimulationProgress } from 'Components/utils/useNextQuestion'

export default ({}) => {
	const objectif = useSelector(objectifsSelector)[0],
		// needed for this component to refresh on situation change :
		situation = useSelector(situationSelector),
		engine = useEngine(),
		rules = useSelector((state) => state.rules),
		evaluation = engine.evaluate(objectif),
		{ nodeValue: rawNodeValue, dottedName, unit, rawNode } = evaluation
	const foldedSteps = useSelector((state) => state.simulation?.foldedSteps),
		simulationStarted = foldedSteps && foldedSteps.length,
		persona = useSelector((state) => state.simulation?.persona)

	const nodeValue = correctValue({ nodeValue: rawNodeValue, unit })

	const category = rules[splitName(dottedName)[0]],
		color = category && category.couleur

	const isMainSimulation = objectif === 'bilan'

	const progress = useSimulationProgress()
	return (
		<div
			css={`
				background-color: var(--darkColor);
				color: var(--textColor);
				a {
					color: inherit;
				}
				text-align: center;
				box-shadow: 2px 2px 10px #bbb;

				.unitSuffix {
					font-size: 90%;
				}
			`}
		>
			<div
				css={`
					display: flex;
					justify-content: space-evenly;
					> div {
						display: flex;
						justify-content: center;
						align-items: center;
					}
					padding: 0.4rem;
				`}
			>
				<div
					css={`
						display: flex;
						justify-content: space-evenly;
						flex-direction: column;
						width: 80%;
					`}
				>
					{isMainSimulation &&
						!persona &&
						(!simulationStarted ? (
							<em>{emoji('🇫🇷 ')} Un Français émet en moyenne</em>
						) : (
							<em>Votre total provisoire</em>
						))}
					{persona && (
						<em>
							{emoji('👤')} {persona}
						</em>
					)}
					<div>
						<SimulationHumanWeight nodeValue={nodeValue} />
					</div>
				</div>
				<div>
					<Link to={'/documentation/' + utils.encodeRuleName(dottedName)}>
						<span css="font-size: 140%" alt="Comprendre le calcul">
							{emoji('❔ ')}
						</span>
						<small
							css={`
								color: var(--textColor);
								@media (max-width: 800px) {
									display: none;
								}
							`}
						>
							Comprendre le calcul
						</small>
					</Link>
				</div>
			</div>
			{progress < 1 && (
				<Progress progress={progress} style={!progress ? 'height: 0' : ''} />
			)}
		</div>
	)
}
