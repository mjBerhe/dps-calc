const calcMaxHit = (statObject, equipmentObject, monsterObject) => {

	const { effectiveStrLvl, equipmentMeleeStrBonus, equipmentRangeStrBonus, equipmentMagicDmgBonus, isRange, isMagic, chosenSpell, isSlayerTask } = statObject;
	const { equippedWeapon, isArclight, isBlisterFlail, isChaosGauntlets, isDHCB, isDHL, isIvandisFlail, isLeafBB, isObbyNeck, isObbySet, isObbyWep, isSalve, isSalveE, isSalveI, isSalveEI, isScythe, isSlayerHelm, isSlayerHelmImbued, isSmokeStaff, isTbow, isTomeOfFire, isVoidMageElite, isWildy } = equipmentObject;
	const { currentMonster, isDemon, isDragon, isLeafy, isUndead, isVampyre } = monsterObject;

	let maxHit = 0;

	if (isRange) { // if using range
		maxHit = Math.floor(((effectiveStrLvl*(equipmentRangeStrBonus + 64)) / 640) + 0.5);
		// if on slayer task and slayer helm imbued is equipped
		if (isSlayerTask && isSlayerHelmImbued) {
			if (isUndead && isSalveEI) { // AND if monster is undead and have salve(ei) equipped
				maxHit = Math.floor(maxHit*1.2);
			} else { // else just get the slayer helm bonus (same if salve(i) were to be equipped)
				maxHit = Math.floor(maxHit*1.15);
			}
		// if not on slayer task
		} else if (isUndead && isSalveEI) { // if monster is undead and salve (ei) is equipped
			maxHit = Math.floor(maxHit*1.2);
		} else if (isUndead && isSalveI) { // if monster is undead and salve(i) is equipped
			maxHit = Math.floor(maxHit*1.15);
		}
		// if monster is dragon and dhcb is equipped
		if (isDragon && isDHCB) {
			maxHit = Math.floor(maxHit*1.3);
		}
		if (isWildy) {
			maxHit = Math.floor(maxHit*1.5);
		}
		// if tbow equipped
		// right now, magic level capped at 250
		if (isTbow && currentMonster) {
			let magic = currentMonster.stats.magLvl;
			if (currentMonster.stats.magLvl >= 250) { 
				magic = 250;
			} else {
				magic = currentMonster.stats.magLvl;
			}
			const tBowMultiplier = (250 + Math.trunc((magic*3-14)/100) - Math.trunc((Math.pow(((magic*3/10)-140), 2))/100))/100;
			maxHit = maxHit*tBowMultiplier;
		}
		return Math.floor(maxHit);
	
	} else if (isMagic) { // else if using magic
		if (chosenSpell) { // if a spell was chosen
			maxHit = chosenSpell.maxHit;
			if (chosenSpell.grade === 'bolt' && isChaosGauntlets) {
				maxHit += 3;
				console.log('chaos gauntlets activated')
			}
		// else a powered staff must be equipped
		} else {
			// getting magic lvl (including potion boost)
			const visibleMagicLvl = effectiveStrLvl - 8;
			if (equippedWeapon) {
				if (equippedWeapon.id === 11907 || equippedWeapon.id === 11905 || equippedWeapon.id === 22288) { // trident of the seas
					maxHit = 20 + Math.floor((visibleMagicLvl - 75)/3);
				} else if (equippedWeapon.id === 12899 || equippedWeapon.id === 22292) { // trident of the swamp
					maxHit = 23 + Math.floor((visibleMagicLvl - 75)/3);
				} else if (equippedWeapon.id === 22323 || equippedWeapon.id === 22381) { // sanguinesti staff
					maxHit = 24 + Math.floor((visibleMagicLvl - 75)/3);
				}
			}
		}

		// applying all Magic Damage multipliers
		let multiplier = 100;
		if (equipmentMagicDmgBonus) { // adding current magic damage bonus from equipment
			multiplier += equipmentMagicDmgBonus;
		}
		if (isUndead && isSalveEI) { // if undead monster + salve (ei)
			multiplier += 20;
		} else if (isUndead && isSalveI) { // if undead monster + salve (i)
			multiplier += 15;
		}
		if (isSmokeStaff && chosenSpell) {
			if (chosenSpell.spellbook === 'standard') { // if smoke staff + standard spell
				multiplier += 10;
			}
		}
		if (isVoidMageElite) { // if void mage elite equipped
			multiplier += 2.5;
		}

		maxHit = Math.floor((maxHit*multiplier)/100);

		if (isSlayerTask && isSlayerHelmImbued && !isSalveEI && !isSalveI) {
			maxHit = Math.floor(maxHit*1.15);
		}
		if (chosenSpell && isTomeOfFire) {
			if (chosenSpell.element === 'fire') { // if tome of fire + fire spell
				maxHit = Math.floor(maxHit*1.5);
			}
		}
		return Math.floor(maxHit);
 
	} else { // else we assume its melee
		maxHit = Math.floor(((effectiveStrLvl*(equipmentMeleeStrBonus + 64)) / 640) + 0.5);
		// if on slayer task and slayer helm is equipped
		if (isSlayerTask && isSlayerHelm) {
			if (isSalveE || isSalveEI) { // if salve (e) or salve (ei) is equipped
				if (isUndead) { // if monster is undead
					maxHit = Math.floor(maxHit*1.2);
				} 
			} else { // else just get the slayer helm bonus (as it is greater than normal salve bonus)
				maxHit = Math.floor(maxHit*(7/6));
			}
		// if not on slayer task and monster is undead
		} else if (isUndead) {
			// if salve (e) or salve (ei) is equipped
			if (isSalveE || isSalveEI) {
				maxHit = Math.floor(maxHit*1.2);
			// if salve or salve (i) is equipped
			} else if (isSalve || isSalveI) {
				maxHit = Math.floor(maxHit*1.15);
			}
		}
		
		if (isDemon && isArclight) {
			maxHit = Math.floor(maxHit*1.7);
		}
		if (isVampyre) {
			if (isBlisterFlail) {
				maxHit = Math.floor(maxHit*1.25);
			} else if (isIvandisFlail) {
				maxHit = Math.floor(maxHit*1.2);
			}
		}
		if (isDragon && isDHL) {
			maxHit = Math.floor(maxHit*1.2);
		}
		if (isLeafy && isLeafBB) {
			maxHit = Math.floor(maxHit*1.175);
		}
		if (isObbySet && isObbyWep) {
			maxHit = Math.floor(maxHit*1.1);
		}
		if (isObbyWep && isObbyNeck) {
			maxHit = Math.floor(maxHit*1.2);
		}
		if (isScythe) {
			const halfHit = Math.floor(maxHit/2);
			const quarterHit = Math.floor(halfHit/2);
			maxHit = Math.floor(maxHit) + halfHit + quarterHit;
		}
		if (isWildy) {
			maxHit = Math.floor(maxHit*1.5);
		}
		return Math.floor(maxHit);
	}
}

export default calcMaxHit;