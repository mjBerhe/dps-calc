const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();

// Boot Model
const Boot = require('../../models/Boots');

const url = 'https://www.osrsbox.com/osrsbox-db/items-json/';

// @route 			GET api/boots
// @description 	Get all boots in alphabetical order
router.get('/', (req, res) => {
	Boot.find().sort({ name: 1 })
		.then(Boots => res.json(Boots));
});

const loadDatabase = async () => {
	for (let i = 0; i < 25000; i++) {
		fetchAndCheckBoot(i);
		await new Promise(resolve => setTimeout(resolve, 20));
	}
}

//loadDatabase();


async function fetchAndCheckBoot(ID) {
	try {
		const response = await fetch(`${url}${ID}.json`);
		const bt = await response.json();
		if (bt.equipable_by_player) {
			if (bt.equipment.slot === 'feet') {
				const boot = new Boot({
					id: bt.id,
					name: bt.name,
					equipableByPlayer: bt.equipable_by_player,
					equipableWeapon: bt.equipable_weapon,
					stats: {
						attStab: bt.equipment.attack_stab,
						attSlash: bt.equipment.attack_slash,
						attCrush: bt.equipment.attack_crush,
						attMagic: bt.equipment.attack_magic,
						attRanged: bt.equipment.attack_ranged,
						defStab: bt.equipment.defence_stab,
						defSlash: bt.equipment.defence_slash,
						defCrush: bt.equipment.defence_crush,
						defMagic: bt.equipment.defence_magic,
						defRanged: bt.equipment.defence_ranged,
						strBonus: bt.equipment.melee_strength,
						rngStrBonus: bt.equipment.ranged_strength,
						magBonus: bt.equipment.magic_damage,
						prayBonus: bt.equipment.prayer,
						slot: bt.equipment.slot,
					}
				})

				boot.save(function(err) {
					if (err) {
						return err;
					}
					console.log(`Boot created! ${boot}`);
				})
				console.log(`ID:${ID} is an EQUIPPABLE Boot!`);
			}
		}
		console.log(`ID:${ID} is NOT a Boot.`);		
	} catch (error) {
		console.log(`Website doesn't exist for ID:${ID}`);
	}
}

module.exports = router;