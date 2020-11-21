const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();

// Monster Model
const Monster = require('../../models/Monsters');

const url = 'https://www.osrsbox.com/osrsbox-db/monsters-json/';

// @route 			GET api/monsters
// @description 	Get all monsters in alphabetical order
router.get('/', (req, res) => {
	Monster.find().sort({ name: 1 })
		.then(Monsters => res.json(Monsters));
});

const loadDatabase = async () => {
	for (let i = 0; i < 12000; i++) {
		fetchAndCheckMonster(i);
		await new Promise(resolve => setTimeout(resolve, 20));
	}
}

//loadDatabase();

// fetchAndCheckMonster(2042);



async function fetchAndCheckMonster(ID) {
	try {
		const response = await fetch(`${url}${ID}.json`);
		const mon = await response.json();
		const monster = new Monster({
			id: mon.id,
			name: `${mon.name} (${mon.combat_level})`,
			cmbLvl: mon.combat_level,
			hitpoints: mon.hitpoints,
			maxHit: mon.max_hit,
			attType: mon.attack_type,
			attSpeed: mon.attack_speed,
			attributes: mon.attributes,
			slayerMonster: mon.slayer_monster,
			slayerReq: mon.slayer_level,
			slayerExp: mon.slayer_xp,
			slayerMasters: mon.slayer_masters,
			stats: {
				attLvl: mon.attack_level,
				strLvl: mon.strength_level,
				defLvl: mon.defence_level,
				magLvl: mon.magic_level,
				rngLvl: mon.ranged_level,
				attAccuracy: mon.attack_accuracy,
				meleeStr: mon.melee_strength,
				rangedStr: mon.ranged_strength,
				magicDmg: mon.magic_damage,
				attacks: {
					stab: mon.attack_stab,
					slash: mon.attack_slash,
					crush: mon.attack_crush,
					range: mon.attack_ranged,
					magic: mon.attack_magic,
				},
				defences: {
					stab: mon.defence_stab,
					slash: mon.defence_slash,
					crush: mon.defence_crush,
					range: mon.defence_ranged,
					magic: mon.defence_magic,
				},
			},
			drops: mon.drops,
		})

		monster.save(function(err) {
			if (err) {
				return err;
			}
			console.log(`Monster created! ${monster}`);
		})
		console.log(`ID:${ID} is a Monster!`);	
	} catch (error) {
		console.log(`Website doesn't exist for ID:${ID}`);
	}
}	

module.exports = router;