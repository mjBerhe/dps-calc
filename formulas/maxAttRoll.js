const calcMaxAttRoll = (statObject, equipmentObject, monsterObject) => {
	
	const { effectiveAttLvl, equipmentAttBonus, isRange, isMagic, attType, chosenSpell, isSlayerTask } = statObject;
	const { isArclight, isBlisterFlail, isDHCB, isDHL, isObbySet, isObbyWep, isSalve, isSalveE, isSalveI, isSalveEI, isSlayerHelm, isSlayerHelmImbued, isSmokeStaff, isTbow, isWildy } = equipmentObject;
	const { currentMonster, isDemon, isDragon, isUndead, isVampyre } = monsterObject;

	let maxAttRoll = Math.floor(effectiveAttLvl*(equipmentAttBonus[attType] + 64));
	// console.log(effectiveAttLvl, maxAttRoll, equipmentAttBonus[attType], attType)

	if (isRange) { // if range
		// if on slayer task and slayer helm is equipped
		if (isSlayerTask && isSlayerHelmImbued) {
			if (isUndead && isSalveEI) { // AND if monster is undead and have salve(ei) equipped
				maxAttRoll *= 1.2;
			} else { // else just get the slayer helm bonus (same if salve(i) were to be equipped)
				maxAttRoll *= 1.15;
			}
		// if not on slayer task
		} else if (isUndead && isSalveEI) { // if monster is undead and salve (ei) is equipped
			maxAttRoll *= 1.2;
		} else if (isUndead && isSalveI) { // if monster is undead and salve (i) is equipped
			maxAttRoll *= 1.15;
		}
		// if monster is dragon and dhcb is equipped
		if (isDragon && isDHCB) {
			maxAttRoll *= 1.3;
		}
		if (isWildy) {
			maxAttRoll *= 1.5;
		}
		// if tbow equipped
		// right now, accuracy bonus capped at 140%
		if (isTbow && currentMonster) {
			let magic = currentMonster.stats.magLvl;
			const tBowMultiplier = (140 + Math.trunc((magic*3-10)/100) - Math.trunc((Math.pow(((magic*3/10)-100), 2))/100))/100;
			if (tBowMultiplier >= 1.4) {
				maxAttRoll = maxAttRoll*1.4;
			} else {
				maxAttRoll = maxAttRoll*tBowMultiplier;
			}
		}
		// if magic def is capped at 140
		// if (isTbow && currentMonster) {
		// 	let magic =  currentMonster.stats.magLvl;
		// 	if (magic >= 140) {
		// 		magic = 140;
		// 		const tbowMultiplier = Math.floor((140 + Math.trunc((magic*3-10)/100) - Math.trunc((Math.pow(((magic*3/10)-100), 2))/100))/100);
		// 		maxAttRoll = maxAttRoll*tbowMultiplier;
		// 	} else {
		// 		const tbowMultiplier = Math.floor((140 + Math.trunc((magic*3-10)/100) - Math.trunc((Math.pow(((magic*3/10)-100), 2))/100))/100);
		// 		maxAttRoll = maxAttRoll*tbowMultiplier;
		// 	}
		// }
		return Math.floor(maxAttRoll);
	
	// else if magic
	} else if (isMagic) {
		// if on slayer task and slayer helm is equipped
		if (isSlayerTask && isSlayerHelmImbued) {
			if (isUndead && isSalveEI) { // AND if monster is undead and have salve(ei) equipped
				maxAttRoll *= 1.2;
			} else { // else just get the slayer helm bonus (same if salve(i) were to be equipped)
				maxAttRoll *= 1.15;
			}
		// if not on slayer task
		} else if (isUndead && isSalveEI) { // if monster is undead and salve (ei) is equipped
			maxAttRoll *= 1.2;
		} else if (isUndead && isSalveI) { // if monster is undead and salve (i) is equipped
			maxAttRoll *= 1.15;
		}
		// if smoke staff and using standard spellbook
		if (isSmokeStaff && chosenSpell) {
			if (chosenSpell.spellbook === 'standard') {
				maxAttRoll *= 1.1;
			}
		}
		return Math.floor(maxAttRoll);

	// if melee
	} else {
		// if on slayer task and slayer helm is equipped
		if (isSlayerTask && isSlayerHelm) {
			if (isSalveE || isSalveEI) { // if salve (e) or salve (ei) is equipped
				if (isUndead) { // if monster is undead
					maxAttRoll *= 1.2;
				} 
			} else { // else just get the slayer helm bonus (as it is greater than normal salve bonus)
				maxAttRoll *= 7/6;
			}
		// if not on slayer task and monster is undead
		} else if (isUndead) {
			if (isSalveE || isSalveEI) { // if salve (e) or salve (ei) is equipped
				maxAttRoll *= 1.2;
			} else if (isSalve || isSalveI) { // if salve or salve (i) is equipped
				maxAttRoll *= 1.15;
			}
		}
		if (isDemon && isArclight) { // if demon and using arclight
			maxAttRoll *= 1.7;
		}
		if (isVampyre && isBlisterFlail) { // if vampyre and using blisterwood flail
			maxAttRoll *= 1.05;
		}
		if (isDragon && isDHL) { // if dragon and using dragon hunter lance
			maxAttRoll *= 1.2;
		}
		if (isObbySet && isObbyWep) { // if using obby set with any obby wep
			maxAttRoll *= 1.1;
		}
		if (isWildy) {
			maxAttRoll *= 1.5;
		}
		return Math.floor(maxAttRoll);
	}
}

export default calcMaxAttRoll;