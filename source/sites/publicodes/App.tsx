import Route404 from 'Components/Route404'
import 'Components/ui/index.css'
import News from 'Pages/News'
import React, { Suspense } from 'react'
import { useTranslation } from 'react-i18next'
import { Redirect, useLocation } from 'react-router'
import { Link, Route, Switch } from 'react-router-dom'
import Provider from '../../Provider'
import {
	persistSimulation,
	retrievePersistedSimulation,
} from '../../storage/persistSimulation'
import Tracker, { devTracker } from '../../Tracker'
import About from './About'
import Diffuser from './Diffuser'
import Actions from './Actions'
import Contribution from './Contribution'
import Fin from './Fin'
import Landing from './Landing'
import Logo, { InlineLogo } from './Logo'
import Documentation from './pages/Documentation'
import Personas from './Personas.tsx'
import Privacy from './Privacy'
import Simulateur from './Simulateur'
import sitePaths from './sitePaths'
const ConferenceLazy = React.lazy(() => import('./conference/Conference'))
import ConferenceBarLazy from './conference/ConferenceBarLazy'

let tracker = devTracker
if (NODE_ENV === 'production') {
	tracker = new Tracker()
}

export default function Root({}) {
	const { language } = useTranslation().i18n
	const paths = sitePaths()

	const urlParams = new URLSearchParams(window.location.search)
	/* This enables loading the rules of a branch,
	 * to showcase the app as it would be once this branch of -data  has been merged*/
	const branch = urlParams.get('branch')
	const pullRequestNumber = urlParams.get('PR')

	const iframeShareData = new URLSearchParams(
		document?.location.search.substring(1)
	).get('shareData')

	return (
		<Provider
			tracker={tracker}
			sitePaths={paths}
			reduxMiddlewares={[]}
			onStoreCreated={(store) => {
				//persistEverything({ except: ['simulation'] })(store)
				persistSimulation(store)
			}}
			initialStore={{
				//...retrievePersistedState(),
				previousSimulation: retrievePersistedSimulation(),
				iframeOptions: { iframeShareData },
			}}
			rulesURL={process.env.MODEL_URL}
			dataBranch={branch || pullRequestNumber}
		>
			<Router />
		</Provider>
	)
}

const Router = ({}) => {
	const location = useLocation()
	return (
		<>
			<div className="ui__ container">
				<ConferenceBarLazy />
				<nav css="display: flex; justify-content: center; margin: .6rem auto">
					<Link
						to="/"
						css={`
							display: flex;
							align-items: center;
							text-decoration: none;
							font-size: 170%;
							margin-bottom: 0.4rem;
							@media (max-width: 800px) {
								margin-bottom: 0;
							}
						`}
					>
						{location.pathname === '/' ? <Logo /> : <InlineLogo />}
					</Link>
				</nav>
				<Switch>
					<Route exact path="/" component={Landing} />
					{/* Removes trailing slashes */}
					<Route
						path={'/:url*(/+)'}
						exact
						strict
						render={({ location }) => (
							<Redirect
								to={location.pathname.replace(/\/+$/, location.search)}
							/>
						)}
					/>

					<Route path="/documentation" component={Documentation} />
					<Route path="/simulateur/:name+" component={Simulateur} />
					{/* Lien de compatibilité, à retirer par exemple mi-juillet 2020*/}
					<Route path="/fin/:score" component={Fin} />
					<Route path="/fin" component={Fin} />
					<Route path="/personas" component={Personas} />
					<Route path="/actions" component={Actions} />
					<Route path="/contribuer/:input?" component={Contribution} />
					<Route path="/à-propos" component={About} />
					<Route path="/partenaires" component={Diffuser} />
					<Route path="/diffuser" component={Diffuser} />
					<Route path="/vie-privée" component={Privacy} />
					<Route path="/nouveautés" component={News} />
					<Route path="/conférence/:room?">
						<Suspense fallback="Chargement">
							<ConferenceLazy />
						</Suspense>
					</Route>
					<Route component={Route404} />
				</Switch>
			</div>
		</>
	)
}
