export function calcAttSpeed(equippedGear, userStats) {
	// if using a spell, all spells have an attack speed of 5 ticks
	if (userStats.chosenSpell) {
		// using Harmonised nightmare staff
		if (userStats.chosenSpell.spellbook === 'standard' && equippedGear.weapon) {
			if (equippedGear.weapon.id === 24423) {
				return 4;
			} else {
				return 5;
			}
		} else {
			return 5;
		}
	} else if (equippedGear.weapon) {
		if (userStats.attStyle === "rapid" || userStats.attStyle === 'medium fuse') {
			return equippedGear.weapon.attSpeed - 1;
		} else {
			return equippedGear.weapon.attSpeed;
		}
	 } else {
	 	return null;
	}
}