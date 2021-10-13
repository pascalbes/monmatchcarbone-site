import DocumentationButton from './DocumentationButton'
import { Link } from 'react-router-dom'
import Illustration from './images/ecolab-climat-dessin.svg'
import Marianne from './images/Marianne.png'
import emoji from 'react-easy-emoji'
import NewsBanner from '../../components/NewsBanner'

export default () => {
	return (
		<div
			css={`
				border-radius: 1rem;
				padding: 0.4rem;
				h1 {
					margin-top: 0.3rem;
					font-size: 140%;
					line-height: 1.2em;
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
			<h1>Connaissez-vous votre empreinte sur le climat ?</h1>
			<img src={Illustration} />
			<div css="margin-bottom: 1rem">
				<div css="margin: 1rem 0 .6rem;">
					<Link to="/simulateur/bilan" className="ui__ plain button">
						Faire le test
					</Link>
				</div>
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
						margin-left: 10%;
						width: 80%;
						display: flex;
						align-items: center;
						justify-content: center;
						margin-bottom: 1rem;
						img {
							margin: 0 0.6rem;
						}
					`}
				>
					<p>Cette déclinaison, développée par <a href="https://www.bl-evolution.com/" target="_blank">BL évolution</a>, s'appuie librement sur la version officielle de <a href="https://nosgestesclimat.fr/" target="_blank">Nos Gestes Climat</a> développé par <a href="https://www.associationbilancarbone.fr/" target="_blank">l'ABC</a> et <a href="https://datagir.ademe.fr/" target="_blank">Datagir (ADEME)</a>.</p>
				</div>
				<div
					css={`
						display: flex;
						justify-content: center;
						flex-wrap: wrap;
						> * {
							margin: 0 0.6rem;
						}
						img {
							font-size: 120%;
						}
					`}
				>
					<Link to="/à-propos">{emoji('❔ ')}À propos</Link>
					<DocumentationButton />
					<Link to="/diffuser">{emoji('📤 ')}Diffuser</Link>
				</div>
			</footer>
		</div>
	)
}
