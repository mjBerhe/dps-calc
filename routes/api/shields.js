const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();

// Shield Model
const Shield = require('../../models/Shields')

const url = 'https://www.osrsbox.com/osrsbox-db/items-json/';

// @router 			GET api/shields
// @description 	Get all shields
router.get('/', (req, res) => {
	Shield.find().sort({ name: 1 })
		.then(shields => res.json(shields));
});


const loadDatabase = async () => {
	for (let i = 0; i < 25000; i++) {
		fetchAndCheckShield(i);
		await new Promise(resolve => setTimeout(resolve, 10));
	}
}

//loadDatabase();


async function fetchAndCheckShield(ID) {
	try {
		const response = await fetch(`${url}${ID}.json`);
		const shd = await response.json();
		if (shd.equipable_by_player) {
			if (shd.equipment.slot === 'shield') {
				const shield = new Shield({
					id: shd.id,
					name: shd.name,
					equipableByPlayer: shd.equipable_by_player,
					stats: {
						attStab: shd.equipment.attack_stab,
						attSlash: shd.equipment.attack_slash,
						attCrush: shd.equipment.attack_crush,
						attMagic: shd.equipment.attack_magic,
						attRanged: shd.equipment.attack_ranged,
						defStab: shd.equipment.defence_stab,
						defSlash: shd.equipment.defence_slash,
						defCrush: shd.equipment.defence_crush,
						defMagic: shd.equipment.defence_magic,
						defRanged: shd.equipment.defence_ranged,
						strBonus: shd.equipment.melee_strength,
						rngStrBonus: shd.equipment.ranged_strength,
						magBonus: shd.equipment.magic_damage,
						prayBonus: shd.equipment.prayer,
						slot: shd.equipment.slot,
					},
				});

				shield.save(function(err) {
					if (err) {
						return err;
					}
					console.log(`Shield created! ${shield}`);
				})
				console.log(`ID:${ID} is an EQUIPPABLE SHIELD!`);
			}
		}
		console.log(`ID:${ID} is NOT a shield.`);		
	} catch (error) {
		console.log(`Website doesn't exist for ID:${ID}`);
	}
}

module.exports = router;