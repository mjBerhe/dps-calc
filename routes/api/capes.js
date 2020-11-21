const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();

// Cape Model
const Cape = require('../../models/Capes');

const url = 'https://www.osrsbox.com/osrsbox-db/items-json/';

// @route 			GET api/capes
// @description 	Get all capes in alphabetical order
router.get('/', (req, res) => {
	Cape.find().sort({ name: 1 })
		.then(Capes => res.json(Capes));
});

const loadDatabase = async () => {
	for (let i = 0; i < 25000; i++) {
		fetchAndCheckCape(i);
		await new Promise(resolve => setTimeout(resolve, 20));
	}
}

//loadDatabase();


async function fetchAndCheckCape(ID) {
	try {
		const response = await fetch(`${url}${ID}.json`);
		const cap = await response.json();
		if (cap.equipable_by_player) {
			if (cap.equipment.slot === 'cape') {
				const cape = new Cape({
					id: cap.id,
					name: cap.name,
					equipableByPlayer: cap.equipable_by_player,
					equipableWeapon: cap.equipable_weapon,
					stats: {
						attStab: cap.equipment.attack_stab,
						attSlash: cap.equipment.attack_slash,
						attCrush: cap.equipment.attack_crush,
						attMagic: cap.equipment.attack_magic,
						attRanged: cap.equipment.attack_ranged,
						defStab: cap.equipment.defence_stab,
						defSlash: cap.equipment.defence_slash,
						defCrush: cap.equipment.defence_crush,
						defMagic: cap.equipment.defence_magic,
						defRanged: cap.equipment.defence_ranged,
						strBonus: cap.equipment.melee_strength,
						rngStrBonus: cap.equipment.ranged_strength,
						magBonus: cap.equipment.magic_damage,
						prayBonus: cap.equipment.prayer,
						slot: cap.equipment.slot,
					}
				})

				cape.save(function(err) {
					if (err) {
						return err;
					}
					console.log(`Cape created! ${cape}`);
				})
				console.log(`ID:${ID} is an EQUIPPABLE Cape!`);
			}
		}
		console.log(`ID:${ID} is NOT a Cape.`);		
	} catch (error) {
		console.log(`Website doesn't exist for ID:${ID}`);
	}
}

module.exports = router;