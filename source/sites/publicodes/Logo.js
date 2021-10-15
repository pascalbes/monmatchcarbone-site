import React, { useContext } from 'react'
import emoji from 'react-easy-emoji'
import { IframeOptionsContext } from 'Components/utils/IframeOptionsProvider'
//This component is unfortunately repeated in index.html, where we can't yet use a component :-(

export default () => (
	<span css="margin-top: .2rem;font-weight: 400;color: black; position: relative; ">
		<img src='MMC.jpg' css="height: 5rem"/>
	</span>
)

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
