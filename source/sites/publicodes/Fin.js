import SessionBar from 'Components/SessionBar'
import ShareButton from 'Components/ShareButton'
import { findContrastedTextColor } from 'Components/utils/colors'
import { AnimatePresence, motion } from 'framer-motion'
import React, { useContext } from 'react'
import emoji from 'react-easy-emoji'
import { useLocation } from 'react-router'
import { Link } from 'react-router-dom'
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
	const backgroundColor = getBackgroundColor(value).toHexString(),
		backgroundColor2 = getBackgroundColor(value + 2000).toHexString(),
		textColor = findContrastedTextColor(backgroundColor, true),
		roundedValue = (value / 1000).toLocaleString('fr-FR', {
			maximumSignificantDigits: 2,
			minimumSignificantDigits: 2,
		}),
		integerValue = roundedValue.split(',')[0],
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
				padding: 0 0.3rem 1rem;
				max-width: 600px;
				margin: 0 auto;
				${sessionBarMargin}
			`}
		>
			<Meta
				title="Mon Match Carbone"
				description={`Mon empreinte climat est de ${roundedValue} tonnes de CO2e. Mesure la tienne !`}
				image={shareImage}
				url={window.location}
			/>
			<SessionBar noResults />
			<motion.div
				animate={{ scale: [0.9, 1] }}
				transition={{ duration: headlessMode ? 0 : 0.6 }}
				className=""
				id="fin"
				css={`
					background: ${backgroundColor};
					background: linear-gradient(
						180deg,
						${backgroundColor} 0%,
						${backgroundColor2} 100%
					);
					color: ${textColor};
					margin: 0 auto;
					border-radius: 0.6rem;
					display: flex;
					flex-direction: column;
					justify-content: space-evenly;

					text-align: center;
					font-size: 110%;
				`}
			>
				<div id="shareImage" css="padding: 2rem 0 0">
					<div css="display: flex; align-items: center; justify-content: center">
						<img src={BallonGES} css="height: 10rem" />
						<div
							css={`
								flex-direction: ${headlessMode ? 'column-reverse' : 'column'};
								display: flex;
								justify-content: space-evenly;
								height: 10rem;
							`}
						>
							<div css="font-weight: bold; font-size: 280%;">
								<span css="width: 4rem; text-align: right; display: inline-block">
									{integerValue}
									{score < 10000 && (
										<AnimatePresence>
											{(score - value) / score < 0.01 && (
												<motion.small
													initial={{ opacity: 0, width: 0 }}
													animate={{ opacity: 1, width: 'auto' }}
													css={`
														color: inherit;
														font-size: 60%;
													`}
												>
													,{decimalValue}
												</motion.small>
											)}
										</AnimatePresence>
									)}
								</span>{' '}
								tonnes
							</div>
							<div
								css={`
									background: #ffffff3d;
									border-radius: 0.6rem;
									padding: 0.4rem 1rem;

									> div {
										display: flex;
										justify-content: space-between;
										flex-wrap: wrap;
									}
									strong {
										font-weight: bold;
									}
									> img {
										margin: 0 0.6rem !important;
									}
								`}
							>
								<div>
									<span>
										{emoji('🇫🇷 ')}
										moyenne{' '}
									</span>{' '}
									<strong>
										{' '}
										<DefaultFootprint />{' '}
									</strong>
								</div>
								<div>
									<span>
										{emoji('🎯 ')}
										objectif{' '}
									</span>
									<strong>2 tonnes</strong>
								</div>
								{!headlessMode && (
									<div css="margin-top: .2rem;justify-content: flex-end !important">
										<a
											css="color: inherit"
											href="https://datagir.ademe.fr/blog/budget-empreinte-carbone-c-est-quoi/"
											target="_blank"
										>
											Comment ça ?
										</a>
									</div>
								)}
							</div>
						</div>
					</div>
					{!integratorActionText && <ActionButton text="Passer à l'action" />}
					<div css="padding: 1rem">
						<Chart
							details={details}
							color={textColor}
							noAnimation
							noText
							noCompletion
							valueColor={textColor}
						/>
					</div>
				</div>
				<div css="display: flex; flex-direction: column; margin: 1rem 0">
					<ShareButton
						text="Voilà mon empreinte climat. Mesure la tienne !"
						url={window.location}
						title={'Nos Gestes Climat'}
						color={textColor}
						label="Partager mes résultats"
					/>
				</div>

				{integratorActionText && integratorActionUrl && (
					<IntegratorActionButton />
				)}

				{integratorYoutubeVideo && (
					<div
						class="videoWrapper"
						css={`
							iframe {
								width: 100%;
							}
						`}
					>
						<iframe
							width="560"
							height="315"
							src={integratorYoutubeVideo}
							title="YouTube video player"
							frameborder="0"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
							allowfullscreen
						></iframe>
					</div>
				)}

				{integratorActionText && <ActionButton text="Réduire mon empreinte" />}
			</motion.div>
		</div>
	)
})

const ActionButton = ({ text }) => (
	<Link
		to="/actions"
		className="ui__ button plain"
		css={`
			margin: 0.6rem auto;
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
				width: 100%;
			`}
		>
			<img src={StartingBlock} />
			{text}
		</div>
	</Link>
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
