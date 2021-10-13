import NumberedMosaic from './select/NumberedMosaic'
import SelectDevices from './select/SelectDevices'
import { DottedName } from 'Rules'

const mosaicQuestions: Array<{
	question: string
	description: string
	isApplicable: Function
	component: React.FunctionComponent
	dottedName: DottedName
}> = [
	{
		dottedName: "numérique . liste d'appareils",
		question: 'Quels appareils numériques de moins de 10 ans possédez-vous ?',
		description: `
L'essentiel de l'empreinte du numérique réside dans les appareils que nous achetons.

> ✨️ Par simplicité, ne renseignez que les appareils récents : un smartphone utilisé depuis 5 ans a déjà été bien amorti.

Renseignez ici vos appareils parmi ces choix limités.

> 📡 Nous ajouterons au fur et à mesure d'autres types d'appareils : box internet, box TV, 2ème TV, imprimante, etc..
			`,
		isApplicable: (dottedName: DottedName) =>
			dottedName.includes('numérique') && dottedName.includes(' . présent'),
		component: SelectDevices,
	},
	{
		dottedName: "divers . électroménager . liste d'appareils",
		question:
			'Quels appareils électroménagers de moins de 10 ans possédez-vous ?',
		description: `
L'essentiel de l'empreinte de l'électroménager réside dans les appareils que nous achetons.

> ✨️ Par simplicité, ne renseignez que les appareils récents : un smartphone utilisé depuis 5 ans a déjà été bien amorti.

Si tous vos appareils ne sont pas proposés dans cette liste, ce n'est pas grave, ce test ne se veut pas exhaustif.
			`,
		isApplicable: (dottedName: DottedName) =>
			dottedName.includes('divers . électroménager') &&
			dottedName.includes(' . présent'),
		component: SelectDevices,
	},
	{
		dottedName: 'alimentation . régime',
		question:
			'Choisissez les plats de vos midis et dîners pour une semaine type',
		description: `

Choisissez 14 plats qui représentent votre semaine type : 7 midi et 7 dîners. 

> Bien sûr, toute la diversité des régimes ne peut-être simplifiée en 4 boutons : il manque par exemple le poisson... le menu du pêcheur arrive bientôt ! 

			`,
		isApplicable: (dottedName: DottedName) =>
			dottedName.includes('alimentation . plats') &&
			dottedName.includes(' . nombre'),
		component: NumberedMosaic,
		options: { chipsTotal: 14 },
	},
	{
		dottedName: 'divers . textile',
		question: 'Quels vêtements achetez-vous en général dans une année ?',
		isApplicable: (dottedName: DottedName) =>
			dottedName.includes('divers . textile') &&
			dottedName.includes(' . nombre'),
		component: NumberedMosaic,
	},
	{
		dottedName: 'compétition . déplacements',
		question: 'A quelle échelle se font ces compétitions ? ',
		isApplicable: (dottedName: DottedName) =>
			dottedName.includes('compétition . déplacements ') &&
			dottedName.includes(' . présent'),
		component: SelectDevices,
	},
	{
		dottedName: 'transport',
		question: 'Quels moyens de transport utilisez-vous pour vous rendre sur votre ou vos lieux d’activités sportives ?',
		isApplicable: (dottedName: DottedName) =>
			dottedName.includes('transport ') &&
			dottedName.includes(' . présent'),
		component: SelectDevices,
	},
	{
		dottedName: 'profil . sport',
		question: 'Quels sports pratiquez-vous ?',
		isApplicable: (dottedName: DottedName) =>
			dottedName.includes('profil . sport ') &&
			dottedName.includes(' . présent'),
		component: SelectDevices,
	},
	{
		dottedName: 'equipements . textile',
		question: 'Sur une saison, combien de vêtements achetez-vous pour vos pratiques sportives ?',
		isApplicable: (dottedName: DottedName) =>
			dottedName.includes('equipements . textile') &&
			dottedName.includes(' . nombre'),
		component: NumberedMosaic,
	},
	{
		dottedName: 'alimentation . compléments',
		question: 'Durant l\'effort, combien de compléments alimentaires consommez-vous sur un mois ?',
		isApplicable: (dottedName: DottedName) =>
			dottedName.includes('alimentation . compléments') &&
			dottedName.includes(' . nombre'),
		component: NumberedMosaic,
	},
	{
		dottedName: 'spectateur . déplacements . nationale ou internationale',
		question: 'Sur une année, combien d\'heures passez-vous par moyen de transport pour vous rendre comme spectateur sur des événements sportifs d\'envergure nationale ou internationale ?',
		isApplicable: (dottedName: DottedName) =>
			dottedName.includes('spectateur . déplacements . nationale ou internationale') &&
			dottedName.includes(' . nombre'),
		component: NumberedMosaic,
	},
	{
		dottedName: 'spectateur . numérique',
		question: 'Combien d’heures par semaine passez vous à regarder du sport sur les supports suivants ?',
		isApplicable: (dottedName: DottedName) =>
			dottedName.includes('spectateur . numérique') &&
			dottedName.includes(' . nombre'),
		component: NumberedMosaic,
	},
	{
		dottedName: 'compétition . déplacements . Internationale',
		question: 'Echelle Internationale : sur une année, combien d\'heures passez-vous par moyen de transport pour vous rendre sur des lieux de compétition ?',
		isApplicable: (dottedName: DottedName) =>
			dottedName.includes('compétition . déplacements . Internationale') &&
			dottedName.includes(' . nombre'),
		component: NumberedMosaic,
	},
	// {
	// 	dottedName: 'équipement . matériel',
	// 	question: 'Quels sports pratiquez-vous ?',
	// 	isApplicable: (dottedName: DottedName) =>
	// 		dottedName.includes('équipement . matériel ') &&
	// 		dottedName.includes(' . nombre'),
	// 	component: NumberedMosaic,
	// },
]

export default mosaicQuestions
