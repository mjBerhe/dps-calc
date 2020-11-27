const calcAttSpeed = (equippedWeapon, chosenSpell, attStyle) => {

	if (chosenSpell) { // if using a spell, all spells have an attack speed of 5 ticks
		if (chosenSpell.spellbook === 'standard' && equippedWeapon) { 
			if (equippedWeapon.id === 24423) { // Harmonised nightmare staff
				return 4;
			} else {
				return 5;
			}
		} else {
			return 5;
		}
	} else if (equippedWeapon) {
		if (attStyle === "rapid" || attStyle === 'medium fuse') {
			return equippedWeapon.attSpeed - 1;
		} else {
			return equippedWeapon.attSpeed;
		}
	 } else {
	 	return null;
	}
}

export default calcAttSpeed;