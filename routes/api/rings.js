const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();

// Ring Model
const Ring = require('../../models/Rings');

const url = 'https://www.osrsbox.com/osrsbox-db/items-json/';

// @route 			GET api/rings
// @description 	Get all rings in alphabetical order
router.get('/', (req, res) => {
	Ring.find().sort({ name: 1 })
		.then(Rings => res.json(Rings));
});

const loadDatabase = async () => {
	for (let i = 0; i < 25000; i++) {
		fetchAndCheckRing(i);
		await new Promise(resolve => setTimeout(resolve, 10));
	}
}

//loadDatabase();


async function fetchAndCheckRing(ID) {
	try {
		const response = await fetch(`${url}${ID}.json`);
		const rg = await response.json();
		if (rg.equipable_by_player) {
			if (rg.equipment.slot === 'ring') {
				const ring = new Ring({
					id: rg.id,
					name: rg.name,
					equipableByPlayer: rg.equipable_by_player,
					equipableWeapon: rg.equipable_weapon,
					stats: {
						attStab: rg.equipment.attack_stab,
						attSlash: rg.equipment.attack_slash,
						attCrush: rg.equipment.attack_crush,
						attMagic: rg.equipment.attack_magic,
						attRanged: rg.equipment.attack_ranged,
						defStab: rg.equipment.defence_stab,
						defSlash: rg.equipment.defence_slash,
						defCrush: rg.equipment.defence_crush,
						defMagic: rg.equipment.defence_magic,
						defRanged: rg.equipment.defence_ranged,
						strBonus: rg.equipment.melee_strength,
						rngStrBonus: rg.equipment.ranged_strength,
						magBonus: rg.equipment.magic_damage,
						prayBonus: rg.equipment.prayer,
						slot: rg.equipment.slot,
					}
				})

				ring.save(function(err) {
					if (err) {
						return err;
					}
					console.log(`Ring created! ${ring}`);
				})
				console.log(`ID:${ID} is an EQUIPPABLE Ring!`);
			}
		}
		console.log(`ID:${ID} is NOT a Ring.`);		
	} catch (error) {
		console.log(`Website doesn't exist for ID:${ID}`);
	}
}

module.exports = router;