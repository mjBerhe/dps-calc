const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();

// Necklace Model
const Necklace = require('../../models/Necklaces');

const url = 'https://www.osrsbox.com/osrsbox-db/items-json/';

// @route 			GET api/necklaces
// @description 	Get all necklaces in alphabetical order
router.get('/', (req, res) => {
	Necklace.find().sort({ name: 1 })
		.then(necklaces => res.json(necklaces));
});

const loadDatabase = async () => {
	for (let i = 0; i < 25000; i++) {
		fetchAndCheckNecklace(i);
		await new Promise(resolve => setTimeout(resolve, 10));
	}
}

//loadDatabase();


async function fetchAndCheckNecklace(ID) {
	try {
		const response = await fetch(`${url}${ID}.json`);
		const neck = await response.json();
		if (neck.equipable_by_player) {
			if (neck.equipment.slot === 'neck') {
				const necklace = new Necklace({
					id: neck.id,
					name: neck.name,
					equipableByPlayer: neck.equipable_by_player,
					equipableWeapon: neck.equipable_weapon,
					stats: {
						attStab: neck.equipment.attack_stab,
						attSlash: neck.equipment.attack_slash,
						attCrush: neck.equipment.attack_crush,
						attMagic: neck.equipment.attack_magic,
						attRanged: neck.equipment.attack_ranged,
						defStab: neck.equipment.defence_stab,
						defSlash: neck.equipment.defence_slash,
						defCrush: neck.equipment.defence_crush,
						defMagic: neck.equipment.defence_magic,
						defRanged: neck.equipment.defence_ranged,
						strBonus: neck.equipment.melee_strength,
						rngStrBonus: neck.equipment.ranged_strength,
						magBonus: neck.equipment.magic_damage,
						prayBonus: neck.equipment.prayer,
						slot: neck.equipment.slot,
					}
				})

				necklace.save(function(err) {
					if (err) {
						return err;
					}
					console.log(`Necklace created! ${necklace}`);
				})
				console.log(`ID:${ID} is an EQUIPPABLE Necklace!`);
			}
		}
		console.log(`ID:${ID} is NOT a Necklace.`);		
	} catch (error) {
		console.log(`Website doesn't exist for ID:${ID}`);
	}
}

module.exports = router;