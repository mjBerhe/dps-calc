const calcMaxDefRoll = (statsObject) => {

	const { isMagic, currentMonster, attType } = statsObject;

	let maxDefRoll;

	if (isMagic) { // if using magic
		maxDefRoll = currentMonster ? Math.floor((currentMonster.stats.magLvl + 9)*(currentMonster.stats.defences.magic + 64)) : null;
	// else if using melee/range
	} else {
		maxDefRoll = currentMonster ? Math.floor((currentMonster.stats.defLvl + 9)*(currentMonster.stats.defences[attType] + 64)) : null;
	}
	return maxDefRoll;
}

export default calcMaxDefRoll;