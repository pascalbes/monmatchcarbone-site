import IllustratedButton from 'Components/IllustratedButton'
import { useDispatch } from 'react-redux'
import { setActionMode } from '../../actions/actions'
import { useSafePreviousSimulation } from '../../components/SessionBar'

export default ({}) => {
	const dispatch = useDispatch()

	return (
		<div
			css={`
				> div {
					margin: 4rem 1rem;
				}
			`}
		>
			<div>
				<h1>Réduire mon empreinte</h1>
				<p>Votre mission : réduire votre empreinte.</p>
				<p>Comment voulez-vous procéder ?</p>
			</div>
			<div>
				{/* <IllustratedButton
					icon="🐣"
					to="/actions"
					onClick={() => dispatch(setActionMode('guidé'))}
				>
					<div>
						<div>Guidé</div>
						<p>
							<small>On vous propose une sélection graduelle de gestes.</small>
						</p>
					</div>
				</IllustratedButton> */}
				<IllustratedButton
					to="/actions"
					icon="🐓"
					onClick={() => dispatch(setActionMode('autonome'))}
				>
					<div>
						<div>Autonome</div>
						<p>
							<small>A vous de choisir vos gestes à la carte.</small>
						</p>
					</div>
				</IllustratedButton>
			</div>
		</div>
	)
}
