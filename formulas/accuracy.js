const calcHitChance = (attRoll, defRoll) => {
	if (attRoll && defRoll) {
		if (attRoll >= defRoll) {
			return 1 - ((defRoll + 2) / (2*(attRoll + 1))); 
		} else {
			return attRoll / (2*(defRoll + 1));
		}
	}
	return 0;
}

export default calcHitChance;