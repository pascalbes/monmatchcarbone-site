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
					margin-top: 0.3rem;
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
				padding-top: 50px;
				height: 60%;
				display: flex;
				flex-direction: column;
				align-items:center;
				background-image: url("fond_stade.jpg");
				> div:first-child {
					display: flex;
					align-items:center;
					justify-content: center;
					margin-bottom: 20px
				}
				h1 {
					color: white;
				}
			`}>
			 	<div>
					<MMCWhite width="200px" />
					<GELogo width="150px"/>
			 	</div>
				 <MMCMonument />
				 <div css="margin: 1rem 0 .6rem;">
					<Link to="/simulateur/bilan" className="ui__ plain button">
						Commencez votre match
					</Link>
				</div>
			</div>
			
			<div css="margin-bottom: 1rem">
				
				{/* <div css="margin: .6rem 0 1rem;">
					<Link to="/conférence" className="ui__ button small">
						{emoji('👥')} Faire le test à plusieurs
					</Link>
				</div> */}
				<NewsBanner />
			</div>

			<footer>
				<div
					css={`
						margin-left: 5%;
						width: 90%;
						display: flex;
						align-items: center;
						justify-content: center;
						margin-bottom: 1rem;
						img {
							margin: 0 0.6rem;
						}
					`}
				>
					<p>Cette déclinaison, développée par <a href="https://www.gamearth.green/" target="_blank">Game Earth</a> avec <a href="https://www.bl-evolution.com/" target="_blank">BL Évolution</a>, s'appuie librement sur la version officielle de <a href="https://nosgestesclimat.fr/" target="_blank">Nos Gestes Climat</a> développé par <a href="https://www.associationbilancarbone.fr/" target="_blank">l'ABC</a> et <a href="https://datagir.ademe.fr/" target="_blank">Datagir (ADEME)</a>.</p>
				</div>
				
				<div
					css={`
						display: flex;
						justify-content: space-between;
						align-items:center;
						padding: 15px 20px;
						background-color: black;
						> * {
							font-size: 24px;
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
