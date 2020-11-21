const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();

// Ammo Model
const Ammo = require('../../models/Ammos');

const url = 'https://www.osrsbox.com/osrsbox-db/items-json/';

// @route 			GET api/ammos
// @description 	Get all ammos in alphabetical order
router.get('/', (req, res) => {
	Ammo.find().sort({ name: 1 })
		.then(Ammos => res.json(Ammos));
});

const loadDatabase = async () => {
	for (let i = 0; i < 25000; i++) {
		fetchAndCheckDart(i);
		await new Promise(resolve => setTimeout(resolve, 20));
	}
}

//loadDatabase(); 

async function fetchAndCheckDart(ID) {
	try{
		const response = await fetch(`${url}${ID}.json`);
		const dart = await response.json();
		const dartSplit = dart.name.split(" ");
		if (dartSplit[1] === 'dart') {
			const ammo = new Ammo({
				id: dart.id,
				name: dart.name,
				equipableByPlayer: dart.equipable_by_player,
				equipableWeapon: dart.equipable_weapon,
				stats: {
					attStab: dart.equipment.attack_stab,
					attSlash: dart.equipment.attack_slash,
					attCrush: dart.equipment.attack_crush,
					attMagic: dart.equipment.attack_magic,
					attRanged: dart.equipment.attack_ranged,
					defStab: dart.equipment.defence_stab,
					defSlash: dart.equipment.defence_slash,
					defCrush: dart.equipment.defence_crush,
					defMagic: dart.equipment.defence_magic,
					defRanged: dart.equipment.defence_ranged,
					strBonus: dart.equipment.melee_strength,
					rngStrBonus: dart.equipment.ranged_strength,
					magBonus: dart.equipment.magic_damage,
					prayBonus: dart.equipment.prayer,
					slot: dart.equipment.slot,
				}
			})

			ammo.save(function(err) {
				if (err) {
					return err;
				}
				console.log(`Ammo created! ${ammo}`);
			})
			console.log(`ID:${ID} is an EQUIPPABLE Ammo!`);
		}
		console.log(`ID:${ID} is NOT a Ammo.`);		
	} catch (error) {
		console.log(`Website doesn't exist for ID:${ID}`);
	}
}


async function fetchAndCheckAmmo(ID) {
	try {
		const response = await fetch(`${url}${ID}.json`);
		const amm = await response.json();
		if (amm.equipable_by_player) {
			if (amm.equipment.slot === 'ammo') {
				const ammo = new Ammo({
					id: amm.id,
					name: amm.name,
					equipableByPlayer: amm.equipable_by_player,
					equipableWeapon: amm.equipable_weapon,
					stats: {
						attStab: amm.equipment.attack_stab,
						attSlash: amm.equipment.attack_slash,
						attCrush: amm.equipment.attack_crush,
						attMagic: amm.equipment.attack_magic,
						attRanged: amm.equipment.attack_ranged,
						defStab: amm.equipment.defence_stab,
						defSlash: amm.equipment.defence_slash,
						defCrush: amm.equipment.defence_crush,
						defMagic: amm.equipment.defence_magic,
						defRanged: amm.equipment.defence_ranged,
						strBonus: amm.equipment.melee_strength,
						rngStrBonus: amm.equipment.ranged_strength,
						magBonus: amm.equipment.magic_damage,
						prayBonus: amm.equipment.prayer,
						slot: amm.equipment.slot,
					}
				})

				ammo.save(function(err) {
					if (err) {
						return err;
					}
					console.log(`Ammo created! ${ammo}`);
				})
				console.log(`ID:${ID} is an EQUIPPABLE Ammo!`);
			}
		}
		console.log(`ID:${ID} is NOT a Ammo.`);		
	} catch (error) {
		console.log(`Website doesn't exist for ID:${ID}`);
	}
}

module.exports = router;