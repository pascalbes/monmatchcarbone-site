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
				height: 60%;
				display: flex;
				flex-direction: column;
				align-items:center;
				justify-content: space-between;
				background-image: url("fond_stade.png");
				h1 {
					color: white;
				}
			`}>
				<MMCWhite width="200px" />
				<MMCMonument />
				<div
					css={`
						font-size: 14px;
						line-height: 18px;
						width: 80%;
						display: flex;
						align-items: center;
						justify-content: center;
						color:white;
						a:visited {
							color: white;
						}
					`}
				>
					<p>Cette déclinaison, développée par <a href="https://www.gamearth.green/" target="_blank">Game Earth</a> avec <a href="https://www.bl-evolution.com/" target="_blank">BL Évolution</a>, s'appuie librement sur la version officielle de <a href="https://nosgestesclimat.fr/" target="_blank">Nos Gestes Climat</a> développé par <a href="https://www.associationbilancarbone.fr/" target="_blank">l'ABC</a> et <a href="https://datagir.ademe.fr/" target="_blank">Datagir (ADEME)</a>.</p>
				</div>
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
							font-size: 36px;
						}
						:hover {
							background-color: #62AF9B;
						}
						:hover p {
							color: var(--darkColor);
						}
					`}>
				<Link to="/simulateur/bilan">
					<p>Commencez votre match</p>
					<p>></p>
				</Link>
			</div>
			

			<footer css={`
						width: 100%;
						height: 20%;
					`}>			
				<div
					css={`
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
							max-width: 150px;
						}
					`}
				>
					<img src="republique-francaise-logo.png" alt="logo RP" />
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
