
var playerCount = 0
var player = []
var cluedo_selectPlayer = (value, callback) => {
	playerCount = value + 1
	if (playerCount != 0) {
		document.getElementById('selectPlayer').style.display = 'none'
		document.getElementById('renamePlayer').style.display = 'initial'

		for (i = 0; i < playerCount; i++) {
			document.getElementById('renamePlayer').insertAdjacentHTML('beforeend', '<input type="text" class="form-control mb-2 rounded-0 renamePlayer" placeholder="Joueur ' + i + '">')
			player.push({
				'Name': "Default",
				'Possede': [],
				'PeutPosseder': [],
				'PeutPasPosseder': []
			})
			document.getElementById('game').insertAdjacentHTML('beforeend', `<div id="0" class="mb-4 player">
                    <div class="font-weight-bold h4 rename" player="${i}">${player[i].Name}</div>
                    <div class="font-weight-bold">Cartes possédées</div>
                    <div class="font-weight-light small carte_possede mb-2" player="${i}">${player[i].Possede}</div>
                    <div class="font-weight-bold">Cartes qu'il peut obtenir</div>
                    <div class="font-weight-light small carte_peut_posseder mb-2" player="${i}">${player[i].PeutPosseder}</div>
                    <div class="font-weight-bold">Cartes qu'il ne peut pas obtenir</div>
                    <div class="font-weight-light small carte_peut_pas_posseder" player="${i}">${player[i].PeutPasPosseder}</div>
                </div>`)
			document.getElementById('Possede').insertAdjacentHTML('beforeend', '<button onClick="cluedo_ajoutCarte(' + i + ', \'Possede\')" class="btn btn-success btn-small rounded-0 rename" player="' + i + '">' + player[i].Name + '</button>')
			document.getElementById('PeutPosseder').insertAdjacentHTML('beforeend', '<button onClick="cluedo_ajoutCarte(' + i + ', \'PeutPosseder\')" class="btn btn-primary btn-small rounded-0 rename" player="' + i + '">' + player[i].Name + '</button>')
			document.getElementById('PeutPasPosseder').insertAdjacentHTML('beforeend', '<button onClick="cluedo_ajoutCarte(' + i + ', \'PeutPasPosseder\')" class="btn btn-danger btn-small rounded-0 rename" player="' + i + '">' + player[i].Name + '</button>')
		}
		document.getElementById('renamePlayer').insertAdjacentHTML('beforeend', '<button onclick="cluedo_validPlayer()" class="btn btn-dark rounded-0 w-100" >Valider</button>')
	}
	updateGame()
}
var cluedo_validPlayer = () => {
	console.time("cluedo_validPlayer")
	for (i = 0; i < playerCount; i++) {
		player[i].Name = document.getElementsByClassName('renamePlayer')[i].value
	}
	document.getElementById('renamePlayer').style.display = 'none'
	document.getElementById('game').style.display = 'initial'
	document.getElementById('gameBar').style.display = 'flex'
	updateGame()
}
var updateGame = () => {
	eltToUpdate = document.getElementsByClassName('rename')

	for (i = 0; i < eltToUpdate.length; ++i) {
		thisElt = player[eltToUpdate[i].getAttribute('player')].Name
	}
	// Si un joueur essaie de posseder une carte qu'il ne peut pas, je la retire
	for (i = 0; i < player.length; i++)
		for (x = 0; x < player[i].PeutPasPosseder.length; x++)
			if (player[i].PeutPosseder.includes(player[i].PeutPasPosseder[x]))
				player[i].PeutPosseder.splice(player[i].PeutPosseder.indexOf(player[i].PeutPasPosseder[x]), 1)


	// RENOMME LES JOUEURS
	for (i = 0; i < document.querySelectorAll('.rename').length; i++)
		document.querySelectorAll('.rename')[i].innerText = player[document.querySelectorAll('.rename')[i].getAttribute('player')].Name


	// Si un joueur PeutPosseder une carte qu'un joueur possede, je la retire
	for (i = 0; i < player.length; i++)
		for (x = 0; x < player.length; x++)
			for (y = 0; y < player[i].Possede.length; y++)
				if (i != x && player[i].PeutPosseder.includes(player[x].Possede[y])) player[i].PeutPosseder.splice(player[i].PeutPosseder.indexOf(player[x].Possede[y]), 1)


	eltToUpdate = document.getElementsByClassName('carte_possede')
	for (i = 0; i < eltToUpdate.length; ++i)
		eltToUpdate[i].innerHTML = ""
	Object.entries(player[eltToUpdate[i].getAttribute('player')].Possede).forEach(Elt => {
		eltToUpdate[i].insertAdjacentHTML('beforeend', '<span class="btn btn-outline-success px-1 py-0 mr-2 rounded-0">' + Elt[1] + '</span>')
	})
	eltToUpdate = document.getElementsByClassName('carte_peut_posseder')
	for (i = 0; i < eltToUpdate.length; ++i)
		Object.entries(player[eltToUpdate[i].getAttribute('player')].PeutPosseder).forEach(Elt => {
			eltToUpdate[i].insertAdjacentHTML('beforeend', '<span class="btn btn-outline-primary px-1 py-0 mr-2 rounded-0">' + Elt[1] + '</span>')
		})
	eltToUpdate = document.getElementsByClassName('carte_peut_pas_posseder')
	for (i = 0; i < eltToUpdate.length; ++i) {
		eltToUpdate[i].innerHTML = ""
		Object.entries(player[eltToUpdate[i].getAttribute('player')].PeutPasPosseder).forEach(Elt => {
			eltToUpdate[i].insertAdjacentHTML('beforeend', '<span class="btn btn-outline-danger px-1 py-0 mr-2 rounded-0">' + Elt[1] + '</span>')
		})
	}
	console.timeEnd("updateGame")
}


var cluedo_ajoutCarte = (playerIndex, Action) => {

	askPersonnage = document.getElementsByName('cluedoPersonnage')[0].value
	askArme = document.getElementsByName('cluedoArme')[0].value
	askPiece = document.getElementsByName('cluedoPiece')[0].value
	askHave = document.getElementsByName('cluedoPossede')[0].value

	if (Action == "PeutPosseder") {
		if (!player[playerIndex].PeutPosseder.includes(askPersonnage) && !player[playerIndex].PeutPasPosseder.includes(askPersonnage))
			player[playerIndex].PeutPosseder.push(askPersonnage)
		if (!player[playerIndex].PeutPosseder.includes(askArme) && !player[playerIndex].PeutPasPosseder.includes(askArme))
			player[playerIndex].PeutPosseder.push(askArme)
		if (!player[playerIndex].PeutPosseder.includes(askPiece) && !player[playerIndex].PeutPasPosseder.includes(askPiece))
			player[playerIndex].PeutPosseder.push(askPiece)

	} else if (Action == "PeutPasPosseder") {
		if (!player[playerIndex].PeutPasPosseder.includes(askPersonnage) && !player[playerIndex].PeutPasPosseder.includes(askPersonnage))
			player[playerIndex].PeutPasPosseder.push(askPersonnage)
		if (!player[playerIndex].PeutPasPosseder.includes(askArme) && !player[playerIndex].PeutPasPosseder.includes(askArme))
			player[playerIndex].PeutPasPosseder.push(askArme)
		if (!player[playerIndex].PeutPasPosseder.includes(askPiece) && !player[playerIndex].PeutPasPosseder.includes(askPiece))
			player[playerIndex].PeutPasPosseder.push(askPiece)
	} else if (Action == "Possede") {
		if (!player[playerIndex].Possede.includes(askHave) && !player[playerIndex].PeutPasPosseder.includes(askHave)) {
			player[playerIndex].Possede.push(askHave)
			document.getElementsByName('cluedoPossede')[0].remove(document.getElementsByName('cluedoPossede')[0].selectedIndex)
			cardToUpdate = document.querySelectorAll('[carte="' + askHave + '"]')[0].classList
			if (cardToUpdate.contains('btn-primary')) {
				cardToUpdate.remove('btn-primary')
				cardToUpdate.add('btn-success')
				cardToUpdate.add('disabled')
			}
		}
	}
	updateGame()
}