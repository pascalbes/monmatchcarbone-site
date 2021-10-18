import React, { useContext } from 'react'
import emoji from 'react-easy-emoji'
import { IframeOptionsContext } from 'Components/utils/IframeOptionsProvider'
//This component is unfortunately repeated in index.html, where we can't yet use a component :-(

export default () => (
	<span css="margin-top: .2rem;font-weight: 400;color: black; position: relative; ">
		<img src='MMC.jpg' css="height: 5rem"/>
	</span>
)

export const MMCMonument = (props) => {
	return (
		<div css={`
			display: flex;
			flex-direction: column;
			color: white;
			@font-face {
				font-family: "Monument";
				src: url("MonumentExtended-Regular.otf");
			}
			@font-face {
				font-family: "Monument Bold";
				src: url("MonumentExtended-Ultrabold.otf");
			}
			p:first-child {
				font-family: 'Monument';
				font-size: 50px;
			}
			p:nth-child(2) {
				font-family: 'Monument Bold';
				font-size: 50px;
			}
			p:nth-child(3) {
				font-family: 'Monument Bold';
				font-size: 50px;
			}
		`}>
			<p>MON</p>
			<p>MATCH</p>
			<p>CARBONE</p>
		</div>
	)
}

export const GELogo = (props) => {
	const { width } = props;
	const maxWidth = width ? width : "200px"
	return (
		<img src="Logo Game Earth.png" alt="logo Game Earth" css={`
			max-width: ${maxWidth}
		`}/>
	)
}

export const MMCWhite = (props) => {
	const { width } = props;
	const maxWidth = width ? width : "200px"
	return (
		<img src="MMC_blanc.png" alt="logo Mon Match Carbone" css={`
			max-width: ${maxWidth}
		`}/>
	)
}

export const InlineLogo = () => {
	const { integratorLogo, integratorName } = useContext(IframeOptionsContext)

	return (
		<div
			css={`
				display: flex;
				justify-content: center;
				align-items: center;
				margin: 4px 0;
				@media (max-width: 800px) {
					flex-direction: column;
					justify-content: center;
					align-items: center;
				}
			`}
		>
			{integratorLogo && integratorName && (
				<>
					<span
						css={`
							display: flex;
							justify-content: center;
							align-items: center;
						`}
					>
						<img src={integratorLogo} width="40px" css={``} />
						<span css="font-size: 70%">{integratorName}</span>
					</span>
					<span css="margin: 0 .6rem; font-size: 80%">x</span>
				</>
			)}

			<MMCInline />
		</div>
	)
}

const MMCInline = () => (
	<img style={{maxWidth: '200px'}} src="MMC_inline.png" alt="Logo Mon Match Carbone" />
)

const NosGestesClimatInline = () => (
	<span
		css={`
			display: flex;
			align-items: center;
			font-weight: 400;
			color: black;
			position: relative;
		`}
	>
		<span css=" font-size: 70%; align-self: center">nos</span>
		<span css="margin: 0 .25rem">
			<span css="color: var(--color); font-weight: bold; text-transform: uppercase; font-size: 75%">
				ges
			</span>
			tes
		</span>
		<span css="font-size: 70%; align-self: center">climat</span>
	</span>
)
