import { toPairs } from 'ramda'
import React, { useState } from 'react'
import emoji from 'react-easy-emoji'
import { Markdown } from 'Components/utils/markdown'
import { useLocation } from 'react-router-dom'

let formStyle = `
label {
	display: block;
	margin-bottom: 1em;
}
label input, label textarea {
	display: block;
	border-radius: .3em;
	padding: .3em ;
	border: 1px solid var(--color);
	box-shadow: none;
	margin-top: .6em;
	font-size: 100%;
	width: 80%

}
label textarea {
	height: 6em;
}`

let createIssue = (title, body, setURL, disableButton) => {
	if (title == null || body == null || [title, body].includes('')) {
		return null
	}

	fetch(
		'https://publicodes.netlify.app/.netlify/functions/createIssue?' +
			toPairs({
				repo: 'datagir/nosgestesclimat',
				title,
				body,
				labels: ['contribution'],
			})
				.map(([k, v]) => k + '=' + encodeURIComponent(v))
				.join('&'),
		{ mode: 'cors' }
	)
		.then((response) => response.json())
		.then((json) => {
			setURL(json.url)
			disableButton(false)
		})
}
function useQuery() {
	return new URLSearchParams(useLocation().search)
}

export default ({}) => {
	let fromLocation = useQuery().get('fromLocation')
	let [sujet, setSujet] = useState('')
	let [comment, setComment] = useState('')
	let [URL, setURL] = useState(null)
	let [buttonDisabled, disableButton] = useState(false)

	return (
		<div className="ui__ container" css="padding-bottom: 1rem">
			<h1>Contribuer</h1>
			<h2 css="font-size: 180%">{emoji('🙋‍♀️')}J'ai une autre question</h2>
			<p>
				{emoji('➡ ')}Vous connaissez Github ? Dans ce cas, venez contribuer
				directement sur le projet{' '}
				<a
					href="https://github.com/pascalbes/monmatchcarbone/blob/master/CONTRIBUTING.md"
					target="_blank"
				>
					en suivant ce guide
				</a>
				.
			</p>
			<p>
				{emoji('➡ ')}Sinon, laissez-nous un message via le formulaire suivant.
			</p>
			<br />
			<div className="ui__ card">
				<p>{emoji('✉️🐦')}</p>
				{!URL ? (
					<form css={formStyle}>
						<label css="color: var(--color)">
							Le titre bref de votre question, remarque, correction
							<input
								value={sujet}
								onChange={(e) => setSujet(e.target.value)}
								type="text"
								name="sujet"
								required
							/>
						</label>
						<label css="color: var(--color)">
							<p>La description complète de votre remarque</p>
							<p>
								<em>
									N'hésitez pas à inclure des chiffres, des sources, des
									articles de presse, une ébauche de calcul par vos soins etc.
								</em>
							</p>
							<textarea
								value={comment}
								onChange={(e) => setComment(e.target.value)}
								name="comment"
								required
							/>
						</label>
						<p>
							<em>
								Cette contribution sera publique : n'y mettez pas d'informations
								sensibles
							</em>
						</p>
						<button
							className="ui__ button"
							type="submit"
							disabled={buttonDisabled}
							onClick={(e) => {
								if (buttonDisabled) return null

								e.preventDefault()
								disableButton(true)
								const augmentedComment =
									comment +
									`

${fromLocation ? `Depuis la page : \`${fromLocation}\`` : ''}

> Ce ticket a été créé automatiquement par notre robot depuis notre [page de contribution](https://nosgestesclimat.fr/contribuer).

									`
								createIssue(sujet, augmentedComment, setURL, disableButton)
							}}
						>
							Valider
						</button>
					</form>
				) : (
					<p>
						Merci {emoji('😍')} ! Suivez l'avancement de votre suggestion en
						cliquant sur <a href={URL}>ce lien</a>.
					</p>
				)}
			</div>
		</div>
	)
}
