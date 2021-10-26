import SessionBar from 'Components/SessionBar'
import ShareButton from 'Components/ShareButton'
import { findContrastedTextColor } from 'Components/utils/colors'
import { AnimatePresence, motion } from 'framer-motion'
import React, { useContext } from 'react'
import emoji from 'react-easy-emoji'
import { useLocation } from 'react-router'
import { Link, useHistory } from 'react-router-dom'
import { animated, useSpring } from 'react-spring'
import tinygradient from 'tinygradient'
import { sessionBarMargin } from '../../components/SessionBar'
import { IframeOptionsContext } from '../../components/utils/IframeOptionsProvider'
import Meta from '../../components/utils/Meta'
import Chart from './chart'
import DefaultFootprint from './DefaultFootprint'
import IframeDataShareModal from './IframeDataShareModal'
import BallonGES from './images/ballonGES.svg'
import StartingBlock from './images/starting block.svg'
import { GELogo } from './Logo'
import { useDispatch, useSelector } from 'react-redux'
import {
	goToQuestion
} from 'Actions/actions'
import { last } from 'ramda'
import {
	answeredQuestionsSelector
} from 'Selectors/simulationSelectors'

const gradient = tinygradient([
		'#78e08f',
		'#e1d738',
		'#f6b93b',
		'#b71540',
		'#000000',
	]),
	colors = gradient.rgb(20)

const getBackgroundColor = (score) =>
	colors[
		Math.round((score < 2000 ? 0 : score > 20000 ? 19000 : score - 2000) / 1000)
	]

const sumFromDetails = (details) =>
	details.reduce((memo, [name, value]) => memo + value, 0)

export default ({}) => {
	const query = new URLSearchParams(useLocation().search)
	const details = query.get('details')

	console.log(details, query)
	// details=a2.6t2.1s1.3l1.0b0.8f0.2n0.1
	const encodedDetails = details,
		rehydratedDetails =
			encodedDetails &&
			encodedDetails
				.match(/[a-z][0-9]+\.[0-9][0-9]/g)
				.map(([category, ...rest]) => [category, 1000 * +rest.join('')])
				// Here we convert categories with an old name to the new one
				// 'biens divers' was renamed to 'divers'
				.map(([category, ...rest]) =>
					category === 'b' ? ['d', ...rest] : [category, ...rest]
				)
	
	console.log(details)

	const score = sumFromDetails(rehydratedDetails)
	const headlessMode =
		!window || window.navigator.userAgent.includes('HeadlessChrome')

	const { value } = headlessMode
		? { value: score }
		: useSpring({
				config: { mass: 1, tension: 150, friction: 150, precision: 1000 },
				value: score,
				from: { value: 0 },
		  })

	return (
		<div>
			<AnimatedDiv
				value={value}
				score={score}
				details={Object.fromEntries(rehydratedDetails)}
				headlessMode={headlessMode}
			/>
			<IframeDataShareModal data={rehydratedDetails} />
		</div>
	)
}

const AnimatedDiv = animated(({ score, value, details, headlessMode }) => {
	const dispatch = useDispatch();
	const answeredQuestions = useSelector(answeredQuestionsSelector);
	const history = useHistory();
	const backgroundColor = getBackgroundColor(value).toHexString(),
		backgroundColor2 = getBackgroundColor(value + 2000).toHexString(),
		textColor = findContrastedTextColor(backgroundColor, true),
		roundedValue = (value / 1000).toLocaleString('fr-FR', {
			maximumSignificantDigits: 2,
			minimumSignificantDigits: 2,
		}),
		integerValue = roundedValue.split(',')[0],
		unit = integerValue > 1 ? "tonnes" : "tonne",
		decimalValue = roundedValue.split(',')[1],
		shareImage =
			'https://aejkrqosjq.cloudimg.io/v7/' +
			window.location.origin +
			'/.netlify/functions/ending-screenshot?pageToScreenshot=' +
			window.location
	const {
		integratorYoutubeVideo,
		integratorActionText,
		integratorActionUrl,
	} = useContext(IframeOptionsContext)

	return (
		<div
			css={`
				max-width: 600px;
				height: 100vh;
				margin: 0 auto;
				${sessionBarMargin}
			`}
		>
			<Meta
				title="Mon Match Carbone"
				description={`Mon empreinte climat est de ${roundedValue} ${unit} de CO2e. Mesure la tienne !`}
				image={shareImage}
				url={window.location}
			/>
			<motion.div
				// animate={{ scale: [0.9, 1] }}
				// transition={{ duration: headlessMode ? 0 : 0.6 }}
				className=""
				id="fin"
				css={`
					width: 100%;
					height: 100%;
					margin: 0 auto;
					display: flex;
					flex-direction: column;
					text-align: center;
				`}
			>
				<FinalFootPrint 
					roundedValue={roundedValue}
					integerValue={integerValue}
					unit={unit}
					decimalValue={decimalValue}
					backgroundColor={backgroundColor}
					headlessMode={headlessMode}
				/>
				{!integratorActionText && <ActionButton text="PASSER À L'ACTION" />}
				<div css={`
					height: 35%;
					width: 100%;
					ul {
						display: flex;
						flex-direction: column;
						justify-content: space-between;
					}
				`}>
					<Chart
						details={details}
						color={textColor}
						noAnimation
						noText
						noCompletion
						valueColor={textColor}
					/>
				</div>

				<div css={`
					height: calc(10% - 2px);
					margin-top: 2px;
					display: grid;
					grid-template-columns: calc(40% - 1px) calc(60% - 1px);
					column-gap: 2px;
					button {
						background-color:black;
						color:white;
						font-size: 20px;
						width: 100%;
						height: 100%;
						font-weight: 500;
					}
					div > button {
						display: flex;
						justify-content: center;
					}
					button:hover {
						font-weight: bold;
					}
					@media (max-width: 800px) {
						button {
							font-size: 16px;
						}
					}
				`}>
					<button onClick={() => {
							dispatch(goToQuestion(last(answeredQuestions)))
							history.push('/simulateur/bilan')
						}}>Ma simulation
					</button>
					<div css="display: flex; align-items: center;">
						<ShareButton
							text="Voilà mon empreinte climat. Mesure la tienne !"
							url={window.location}
							title={'Nos Gestes Climat'}
							color={textColor}
							label="Partager mes résultats"
						/>
					</div>
				</div>

				

				{integratorActionText && integratorActionUrl && (
					<IntegratorActionButton />
				)}
				{integratorActionText && <ActionButton text="Réduire mon empreinte" />}
			</motion.div>
		</div>
	)
})

const FinalFootPrint = (props) => {
	const {integerValue, decimalValue, backgroundColor, headlessMode, roundedValue, unit } = props;
	const upperUnit = unit.toUpperCase();
	const carbonFootPrintPercentage = Math.round(parseFloat(roundedValue.replace(',','.'))/2*100);
	return (
		<div
			css={`
				padding: 40px 0;
				background-color: ${backgroundColor};
				flex-direction: ${headlessMode ? 'column-reverse' : 'column'};
				display: flex;
				align-items:center;
				justify-content: space-between;
				height: 40%;
				@media (max-width: 800px) {
					padding: 40px 0;
					}
			`}
		>
			<div css={`
				p:first-child {
					font-size: 70px;
					font-weight: bold;
					font-family: 'Montserrat';
					color: white;
					margin-bottom: 8px;
				}
				p:last-child {
					font-size: 28px;
					font-weight: 300;
					font-family: 'Montserrat';
					color: white;
					margin-bottom: 0;
				}
				span {
					font-size: 75%;
				}
				@media (max-width: 800px) {
					p:first-child {
						font-size: 40px;
						font-weight: bold;
						font-family: 'Montserrat';
						color: white;
						margin-bottom: 4px;
					}
					p:last-child {
						font-size: 20px;
						font-weight: 300;
						font-family: 'Montserrat';
						color: white;
					}
				}
			`}>
				<p>{integerValue},<span>{decimalValue} {' '}{upperUnit}</span></p>
				<p>empreinte sportive</p>
			</div>
			<div
				css={`
					width: 100%;
					display: flex;
					flex-direction: column;
					align-items: center;
					p {
						font-size: 16px;
						line-height: 19px;
						font-family: 'Montserrat';
						font-weight: 300;
						color: white;
						width: 90%;
						margin-bottom: 0;
					}
					p:first-child {
						margin-bottom: 6px;
					}
					span {
						font-weight: bold;
					}
					@media (max-width: 800px) {
						p {
							width: 90%;
							font-size: 12px;
							line-height: 15px;
						}
				}
				`}
			>
				<p>Afin de respecter les accords de Paris, chaque français devrait avoir une empreinte globale de <span>2 tonnes</span>. </p>
				<p>Vos pratiques sportives représentent environ <span>{carbonFootPrintPercentage}%</span> de cette valeur</p>
			</div>
			<div>
				{!headlessMode && (
					<div css="justify-content: flex-end !important;margin-bottom: 0;">
						<a
							css="color: black; font-size:14px;"
							href="https://nosgestesclimat.fr/"
							target="_blank"
						>
							CALCULER MON EMPREINTE GLOBALE
						</a>
					</div>
				)}
			</div>
			{/* <div>
				{!headlessMode && (
					<div css="margin-top: .2rem;justify-content: flex-end !important;">
						<a
							css="color: black; font-size:14px;"
							href="https://datagir.ademe.fr/blog/budget-empreinte-carbone-c-est-quoi/"
							target="_blank"
						>
							COMMENT ÇA ?
						</a>
					</div>
				)}
			</div> */}
		</div>
	)
}


const ActionButton = ({ text }) => (
	<div css={`
	width: 100%;
	height: 15%;
	background-color: var(--darkColor);
	a {
		text-decoration: none;
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	p {
		color: white;
		margin: 0;
		font-size: 26px;
	}
	:hover {
		background-color: #62AF9B;
	}
	:hover p {
		color: white;
		font-weight: bold;
	}
	span {
		visibility: hidden;
		width: 250px;
		font-size: 14px;
		background-color: black;
		color: #fff;
		text-align: center;
		padding: 5px 0;
		border-radius: 2px;
		position: absolute;
		z-index: 1;
		margin-top: 110px;
	}
	a:hover span {
		visibility: visible;
	}
	@media (max-width: 800px) {
		p {
			font-size: 20px;
		}
	}
	`}
		>
	<Link to="/actions" onClick={ (event) => event.preventDefault() }>
		<p>
			{text} >
		</p>
		<span>Nous y travaillons, revenez vite passer à l'action !</span>
	</Link>
	</div>
)

const IntegratorActionButton = () => {
	const {
		integratorLogo,
		integratorActionUrl,
		integratorActionText,
	} = useContext(IframeOptionsContext)

	return (
		<a
			href={integratorActionUrl}
			className="ui__ button plain"
			target="_blank"
			css={`
				margin: 0.6rem auto 1rem;
				width: 90%;
				img {
					transform: scaleX(-1);
					height: 2rem;
					margin: 0 0.6rem;
					display: inline-block;
				}
				a {
					color: var(--textColor);
					text-decoration: none;
				}
			`}
		>
			<div
				css={`
					display: flex;
					justify-content: center;
					align-items: center;
					@media (max-width: 800px) {
						flex-direction: column-reverse;
						img {
							display: none;
						}
					}
				`}
			>
				{integratorActionText}
				<img src={integratorLogo} />
			</div>
		</a>
	)
}
