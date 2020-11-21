const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();

// Helmet Model
const Helmet = require('../../models/Helmets');

const url = 'https://www.osrsbox.com/osrsbox-db/items-json/';

// @route 			GET api/helmets
// @description 	Get all helmets in alphabetical order
router.get('/', (req, res) => {
	Helmet.find().sort({ name: 1 })
		.then(helms => res.json(helms));
});

const loadDatabase = async () => {
	for (let i = 0; i < 25000; i++) {
		fetchAndCheckHelmet(i);
		await new Promise(resolve => setTimeout(resolve, 20));
	}
}

//loadDatabase();


async function fetchAndCheckHelmet(ID) {
	try {
		const response = await fetch(`${url}${ID}.json`);
		const helm = await response.json();
		if (helm.equipable_by_player) {
			if (helm.equipment.slot === 'head') {
				const helmet = new Helmet({
					id: helm.id,
					name: helm.name,
					equipableByPlayer: helm.equipable_by_player,
					equipableWeapon: helm.equipable_weapon,
					stats: {
						attStab: helm.equipment.attack_stab,
						attSlash: helm.equipment.attack_slash,
						attCrush: helm.equipment.attack_crush,
						attMagic: helm.equipment.attack_magic,
						attRanged: helm.equipment.attack_ranged,
						defStab: helm.equipment.defence_stab,
						defSlash: helm.equipment.defence_slash,
						defCrush: helm.equipment.defence_crush,
						defMagic: helm.equipment.defence_magic,
						defRanged: helm.equipment.defence_ranged,
						strBonus: helm.equipment.melee_strength,
						rngStrBonus: helm.equipment.ranged_strength,
						magBonus: helm.equipment.magic_damage,
						prayBonus: helm.equipment.prayer,
						slot: helm.equipment.slot,
					}
				})

				helmet.save(function(err) {
					if (err) {
						return err;
					}
					console.log(`Helmet created! ${helmet}`);
				})
				console.log(`ID:${ID} is an EQUIPPABLE HELMET!`);
			}
		}
		console.log(`ID:${ID} is NOT a helmet.`);		
	} catch (error) {
		console.log(`Website doesn't exist for ID:${ID}`);
	}
}

module.exports = router;