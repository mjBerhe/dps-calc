const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();

// Glove Model
const Glove = require('../../models/Gloves');

const url = 'https://www.osrsbox.com/osrsbox-db/items-json/';

// @route 			GET api/gloves
// @description 	Get all gloves in alphabetical order
router.get('/', (req, res) => {
	Glove.find().sort({ name: 1 })
		.then(Gloves => res.json(Gloves));
});

const loadDatabase = async () => {
	for (let i = 0; i < 25000; i++) {
		fetchAndCheckGlove(i);
		await new Promise(resolve => setTimeout(resolve, 20));
	}
}

//loadDatabase();


async function fetchAndCheckGlove(ID) {
	try {
		const response = await fetch(`${url}${ID}.json`);
		const glv = await response.json();
		if (glv.equipable_by_player) {
			if (glv.equipment.slot === 'hands') {
				const glove = new Glove({
					id: glv.id,
					name: glv.name,
					equipableByPlayer: glv.equipable_by_player,
					equipableWeapon: glv.equipable_weapon,
					stats: {
						attStab: glv.equipment.attack_stab,
						attSlash: glv.equipment.attack_slash,
						attCrush: glv.equipment.attack_crush,
						attMagic: glv.equipment.attack_magic,
						attRanged: glv.equipment.attack_ranged,
						defStab: glv.equipment.defence_stab,
						defSlash: glv.equipment.defence_slash,
						defCrush: glv.equipment.defence_crush,
						defMagic: glv.equipment.defence_magic,
						defRanged: glv.equipment.defence_ranged,
						strBonus: glv.equipment.melee_strength,
						rngStrBonus: glv.equipment.ranged_strength,
						magBonus: glv.equipment.magic_damage,
						prayBonus: glv.equipment.prayer,
						slot: glv.equipment.slot,
					}
				})

				glove.save(function(err) {
					if (err) {
						return err;
					}
					console.log(`Glove created! ${glove}`);
				})
				console.log(`ID:${ID} is an EQUIPPABLE Glove!`);
			}
		}
		console.log(`ID:${ID} is NOT a Glove.`);		
	} catch (error) {
		console.log(`Website doesn't exist for ID:${ID}`);
	}
}

module.exports = router;