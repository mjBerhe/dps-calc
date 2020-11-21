const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();

// Leg Model
const Leg = require('../../models/Legs');

const url = 'https://www.osrsbox.com/osrsbox-db/items-json/';

// @route 			GET api/legs
// @description 	Get all legs in alphabetical order
router.get('/', (req, res) => {
	Leg.find().sort({ name: 1 })
		.then(Legs => res.json(Legs));
});

const loadDatabase = async () => {
	for (let i = 0; i < 25000; i++) {
		fetchAndCheckLeg(i);
		await new Promise(resolve => setTimeout(resolve, 20));
	}
}

//loadDatabase();


async function fetchAndCheckLeg(ID) {
	try {
		const response = await fetch(`${url}${ID}.json`);
		const lg = await response.json();
		if (lg.equipable_by_player) {
			if (lg.equipment.slot === 'legs') {
				const leg = new Leg({
					id: lg.id,
					name: lg.name,
					equipableByPlayer: lg.equipable_by_player,
					equipableWeapon: lg.equipable_weapon,
					stats: {
						attStab: lg.equipment.attack_stab,
						attSlash: lg.equipment.attack_slash,
						attCrush: lg.equipment.attack_crush,
						attMagic: lg.equipment.attack_magic,
						attRanged: lg.equipment.attack_ranged,
						defStab: lg.equipment.defence_stab,
						defSlash: lg.equipment.defence_slash,
						defCrush: lg.equipment.defence_crush,
						defMagic: lg.equipment.defence_magic,
						defRanged: lg.equipment.defence_ranged,
						strBonus: lg.equipment.melee_strength,
						rngStrBonus: lg.equipment.ranged_strength,
						magBonus: lg.equipment.magic_damage,
						prayBonus: lg.equipment.prayer,
						slot: lg.equipment.slot,
					}
				})

				leg.save(function(err) {
					if (err) {
						return err;
					}
					console.log(`Leg created! ${leg}`);
				})
				console.log(`ID:${ID} is an EQUIPPABLE Leg!`);
			}
		}
		console.log(`ID:${ID} is NOT a Leg.`);		
	} catch (error) {
		console.log(`Website doesn't exist for ID:${ID}`);
	}
}

module.exports = router;