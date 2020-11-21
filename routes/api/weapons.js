const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();

// Weapon Model
const Weapon = require('../../models/Weapons');

const url = 'https://www.osrsbox.com/osrsbox-db/items-json/';

// @route 			GET api/weapons
// @description 	Get all weapons
router.get('/', (req, res) => {
	Weapon.find().sort({ name: 1 })
		.then(weapons => res.json(weapons));
});

const loadDatabase = async () => {
	for (let i = 0; i < 25000; i++) {
		fetchAndCheckWeapon(i);
		await new Promise(resolve => setTimeout(resolve, 20));
	}
}

//loadDatabase();


async function fetchAndCheckWeapon(ID) {
	try {
		const response = await fetch(`${url}${ID}.json`);
		const wep = await response.json();
		if (wep.equipable_by_player) {
			if (wep.equipment.slot === 'weapon' || wep.equipment.slot === '2h') {
				const weapon = new Weapon({
					id: wep.id,
					name: wep.name,
					equipableByPlayer: wep.equipable_by_player,
					equipableWeapon: wep.equipable_weapon,
					stats: {
						attStab: wep.equipment.attack_stab,
						attSlash: wep.equipment.attack_slash,
						attCrush: wep.equipment.attack_crush,
						attMagic: wep.equipment.attack_magic,
						attRanged: wep.equipment.attack_ranged,
						defStab: wep.equipment.defence_stab,
						defSlash: wep.equipment.defence_slash,
						defCrush: wep.equipment.defence_crush,
						defMagic: wep.equipment.defence_magic,
						defRanged: wep.equipment.defence_ranged,
						strBonus: wep.equipment.melee_strength,
						rngStrBonus: wep.equipment.ranged_strength,
						magBonus: wep.equipment.magic_damage,
						prayBonus: wep.equipment.prayer,
						slot: wep.equipment.slot,
					},
					attSpeed: wep.weapon.attack_speed,
					wepType: wep.weapon.weapon_type, 
					stances: {
						stance0: {
							cmbStyle: wep.weapon.stances[0].combat_style,
							attType: wep.weapon.stances[0].attack_type,
							attStyle: wep.weapon.stances[0].attack_style,
						},
						stance1: {
							cmbStyle: wep.weapon.stances[1].combat_style,
							attType: wep.weapon.stances[1].attack_type,
							attStyle: wep.weapon.stances[1].attack_style,
						},
						stance2: {
							cmbStyle: wep.weapon.stances[2].combat_style,
							attType: wep.weapon.stances[2].attack_type,
							attStyle: wep.weapon.stances[2].attack_style,
						},
						stance3: wep.weapon.stances[3] ? {
							cmbStyle: wep.weapon.stances[3].combat_style,
							attType: wep.weapon.stances[3].attack_type,
							attStyle: wep.weapon.stances[3].attack_style,
						} : null,
						stance4: wep.weapon.stances[4] ? {
							cmbStyle: wep.weapon.stances[4].combat_style,
							attType: wep.weapon.stances[4].attack_type,
							attStyle: wep.weapon.stances[4].attack_style,
						} : null,
					}
				})

				weapon.save(function(err) {
					if (err) {
						return err;
					}
					console.log(`Weapon created! ${weapon}`);
				})
				console.log(`ID:${ID} is an EQUIPPABLE WEAPON!`);
			}
		}
		console.log(`ID:${ID} is NOT a weapon.`);		
	} catch (error) {
		console.log(`Website doesn't exist for ID:${ID}`);
	}
}

module.exports = router;