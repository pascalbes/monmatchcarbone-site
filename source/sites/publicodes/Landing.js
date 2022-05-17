import DocumentationButton from './DocumentationButton'
import { Link } from 'react-router-dom'
import Illustration from './images/ecolab-climat-dessin.svg'
import Marianne from './images/Marianne.png'
import emoji from 'react-easy-emoji'
import NewsBanner from '../../components/NewsBanner'
import Logo, { GELogo, MMCWhite, MMCMonument } from './Logo'

export default () => {
	return (
		<div
			css={`
				width: 100%;
				height: 100vh;
				@font-face {
					font-family: "Monument";
					src: url("MonumentExtended-Regular.otf");
				}
				h1 {
					font-family: 'Monument';
					font-size: 140%;
					line-height: 1.2em;
				}
				p {
					font-family: 'Montserrat', sans-serif;
				}
				> div > a {
				}
				text-align: center;
				> img {
					width: 70%;
					border-radius: 0.8rem;
				}
				@media (max-width: 800px) {
					> img {
						width: 95%;
					}
				}
			`}
		>
			<div css={`
				width: 100%;
				padding: 10px;
				height: 55%;
				display: flex;
				flex-direction: column;
				align-items:center;
				background-image: url("fond_stade.png");
				> div {
					position: absolute;
					top: 28%;
					transform: translate(0, -40%);
				}
				h1 {
					color: white;
				}
			`}>
				<MMCWhite width="200px" />
				<MMCMonument />
			</div>

			<div css={`
				width: 100%;
				height: 20%;
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
					color: #62AF9B;
					margin: 0;
					font-size: 40px;
				}
				:hover {
					background-color: #62AF9B;
				}
				:hover p {
					color: var(--darkColor);
				}
				@media (max-width: 800px) {
					p {
						font-size: 20px;
					}
				}
			`}>
				<Link to="/simulateur/bilan">
					<p>Commencez le calcul ></p>
				</Link>
			</div>
			
			<div
				css={`
					margin:0;
					font-size: 14px;
					height: 60px;
					line-height: 20px;
					width: 100%;
					padding: 5px 10%;
					display: flex;
					align-items: center;
					justify-content: center;
					background-color:#62AF9B;
					color:black;
					a:visited {
						color: black;
					}
					@media (max-width: 800px) {
						padding: 2px 5%;
						font-size: 9px;
						line-height: 16px;
					}
				`}
			>
				<p>Cette déclinaison, développée par <a href="https://www.gamearth.green/" target="_blank">Game Earth</a> avec <a href="https://www.bl-evolution.com/" target="_blank">BL Évolution</a>, s'appuie librement sur la version officielle de <a href="https://nosgestesclimat.fr/" target="_blank">Nos Gestes Climat</a> développé par <a href="https://www.associationbilancarbone.fr/" target="_blank">l'ABC</a> et <a href="https://datagir.ademe.fr/" target="_blank">Datagir (ADEME)</a>.</p>
			</div>

			<footer css={`
						width: 100%;
						height: calc(25% - 60px);
					`}>			
				<div
					css={`
						width: 100%;
						height: 100%;
						display: flex;
						justify-content: space-between;
						align-items:center;
						padding: 15px 20px;
						background-color: black;
						> * {
							font-size: 20px;
							color: white;
						}
						img {
							max-width: 130px;
							max-height: 100%;
						}
						@media (max-width: 800px) {
							> * {
								font-size: 12px;
							}
							img {
								max-width: 80px;
							}
						}
					`}
				>
					<img src="Logo_GE.png" alt="logo GE" />
					<div css={`
						display: flex;
						flex-direction: column;
						align-items: flex-end;
						a, a:visited {
							color: white;
						}
					`}>
						<Link to="/à-propos">À propos</Link>
						<DocumentationButton />
						<Link to="/diffuser">Diffuser</Link>
					</div>
					
				</div>
			</footer>
		</div>
	)
}
