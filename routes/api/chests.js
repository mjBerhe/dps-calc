const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();

// Chest Model
const Chest = require('../../models/Chests');

const url = 'https://www.osrsbox.com/osrsbox-db/items-json/';

// @route 			GET api/chests
// @description 	Get all chests in alphabetical order
router.get('/', (req, res) => {
	Chest.find().sort({ name: 1 })
		.then(Chests => res.json(Chests));
});

const loadDatabase = async () => {
	for (let i = 0; i < 25000; i++) {
		fetchAndCheckChest(i);
		await new Promise(resolve => setTimeout(resolve, 20));
	}
}

//loadDatabase();


async function fetchAndCheckChest(ID) {
	try {
		const response = await fetch(`${url}${ID}.json`);
		const chst = await response.json();
		if (chst.equipable_by_player) {
			if (chst.equipment.slot === 'body') {
				const chest = new Chest({
					id: chst.id,
					name: chst.name,
					equipableByPlayer: chst.equipable_by_player,
					equipableWeapon: chst.equipable_weapon,
					stats: {
						attStab: chst.equipment.attack_stab,
						attSlash: chst.equipment.attack_slash,
						attCrush: chst.equipment.attack_crush,
						attMagic: chst.equipment.attack_magic,
						attRanged: chst.equipment.attack_ranged,
						defStab: chst.equipment.defence_stab,
						defSlash: chst.equipment.defence_slash,
						defCrush: chst.equipment.defence_crush,
						defMagic: chst.equipment.defence_magic,
						defRanged: chst.equipment.defence_ranged,
						strBonus: chst.equipment.melee_strength,
						rngStrBonus: chst.equipment.ranged_strength,
						magBonus: chst.equipment.magic_damage,
						prayBonus: chst.equipment.prayer,
						slot: chst.equipment.slot,
					}
				})

				chest.save(function(err) {
					if (err) {
						return err;
					}
					console.log(`Chest created! ${chest}`);
				})
				console.log(`ID:${ID} is an EQUIPPABLE Chest!`);
			}
		}
		console.log(`ID:${ID} is NOT a Chest.`);		
	} catch (error) {
		console.log(`Website doesn't exist for ID:${ID}`);
	}
}

module.exports = router;