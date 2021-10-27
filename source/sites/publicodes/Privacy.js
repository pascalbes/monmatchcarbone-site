import React from 'react'
import Meta from '../../components/utils/Meta'

export default () => (
	<div>
		<Meta
			title="Données personnelles"
			description="Mon Match Carbone fonctionne sans serveur, donc vos données restent chez vous. Nous collectons anonymement des données aggregées pour améliorer le simulateur."
		/>
		<h1>Données personnelles</h1>
		<p>
			La simulation se fait sur votre navigateur, donc les réponses aux
			questions restent chez vous, nous n'en collectons aucune.
		</p>
		<p>
			Cependant, nous suivons quelques informations sur votre utilisation de ce
			simulateur, telles que les pages consultées et le temps passé, dans
			l'unique but de l'améliorer.{' '}
		</p>
		<p>
		En particulier, nous suivons l'adresse de la page de fin de simulation, qui contient le total de votre empreinte et sa répartition en grande catégorie.
		</p>
		<p>Vous pouvez en savoir plus et désactiver ce suivi ci-dessous.</p>

		<iframe
			css="border: 0; height: 200px; width: 600px;"
			src="https://stats.data.gouv.fr/index.php?module=CoreAdminHome&action=optOut&language=fr&backgroundColor=&fontColor=&fontSize=&fontFamily="
		></iframe>
	</div>
)
