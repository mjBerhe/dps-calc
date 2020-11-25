// function calculates the effective attack level
// return value depends on both the userStats and void equipment

const calcEffectiveAttLvl = (statObject, equipmentObject) => {

	// unpacking objects
	const { attackLvl, rangeLvl, magicLvl, attPotion, attPrayer, rngPotion, rngPrayer, magPotion, magPrayer, attStyle, isRange, isMagic } = statObject;
	const { isVoidMelee, isVoidRange, isVoidRangeElite, isVoidMage, isVoidMageElite } = equipmentObject;

	let effectiveLvl = 0;

	if (isRange) { // if using range
		const rangePotionMultipliers = [1, 1.1, 1.1, 1.15, 1.1, 1.13, 1.16];
		const rangePotionAddons = [0, 4, 4, 5, 4, 5, 6];
		const rangePrayerMultipliers = [1, 1.05, 1.1, 1.15, 1.20];

		// Has Range lvl been inputted? If so, set effective level to it
		rangeLvl ? effectiveLvl += rangeLvl : effectiveLvl += null;

		// Has a Range potion been selected? If so, adjust effective level depending on potion
		rngPotion ? effectiveLvl = Math.floor(effectiveLvl*rangePotionMultipliers[rngPotion]) + rangePotionAddons[rngPotion] : effectiveLvl += null;

		// Has a Range prayer been selected? If so, adjust effective level depending on prayer
		rngPrayer ? effectiveLvl = Math.floor(effectiveLvl*rangePrayerMultipliers[rngPrayer]) : effectiveLvl += null;

		// Has an attack style been selected? If so adjust effective level depending on attack style
		if (attStyle) {
			if (attStyle === 'accurate' || attStyle === 'short fuse') {
				effectiveLvl += 3;
			}
		}

		effectiveLvl += 8; // add 8 for the funsies
	
		if (isVoidRange || isVoidRangeElite) { // checking if void range or elite void range is equipped	
			effectiveLvl = Math.floor(effectiveLvl*1.1);
		}

		return Math.floor(effectiveLvl);
	
	} else if (isMagic) { // else if using magic
		const magicPotionMultipliers = [1, 1, 1, 1.1, 1.15, 1.1, 1.13, 1.16];
		const magicPotionAddons = [0, 4, 4, 1, 5, 4, 5, 6];
		const magicPrayerValues = [1, 1.05, 1.1, 1.15, 1.25];

		// Has Magic lvl been inputted? If so, set effecive level to it
		magicLvl ? effectiveLvl += magicLvl : effectiveLvl += null;

		// Has a magic potion been selected? If so, adjust effective level accordingly
		magPotion ? effectiveLvl = Math.floor(effectiveLvl*magicPotionMultipliers[magPotion]) + magicPotionAddons[magPotion] : effectiveLvl += null;

		// Has a magic prayer been selected? If so, adjust effective level 
		magPrayer ? effectiveLvl = Math.floor(effectiveLvl*magicPrayerValues[magPrayer]) : effectiveLvl += null;

		// Has an attack style been selected? If so, adjust effective level depending on attack style			
		if (attStyle) {
			if (attStyle === 'accurate') {
				effectiveLvl += 3;
			} else if (attStyle === 'longrange') {
				effectiveLvl += 1;
			}
		}

		effectiveLvl += 8; // for the funsies

		if (isVoidMage || isVoidMageElite) {
			effectiveLvl = Math.floor(effectiveLvl*1.45);
		}

		return Math.floor(effectiveLvl);
	
	} else { // else we assume its melee
		const attackPotionMultipliers = [1, 1.1, 1.15, 1.15, 1.15, 1.1, 1.13, 1.16];
		const attackPotionAddons = [0, 3, 5, 5, 5, 4, 5, 6];
		const attackPrayerValues = [1, 1.05, 1.1, 1.15, 1.15, 1.20]

		// Has Attack lvl been inputted? If so, set effective level to it
		attackLvl ? effectiveLvl += attackLvl : effectiveLvl += null;

		// Has an attack potion been selected? If so, adjust effective level accordingly
		attPotion ? effectiveLvl = Math.floor(effectiveLvl*attackPotionMultipliers[attPotion]) + attackPotionAddons[attPotion] : effectiveLvl += null;

		// Has an attack prayer been selected? If so, adjust effective level accordingly
		attPrayer ? effectiveLvl = Math.floor(effectiveLvl*attackPrayerValues[attPrayer]) : effectiveLvl += null;

		// Has an attack style been selected? If so, adjust effective level depending on attack style			
		if (attStyle) {
			if (attStyle === 'accurate') {
				effectiveLvl += 3;
			} else if (attStyle === 'controlled') {
				effectiveLvl += 1;
			}
		}

		effectiveLvl += 8; // for the funsies

		// checking if void melee is equipped
		if (isVoidMelee) {
			effectiveLvl = Math.floor(effectiveLvl*1.1);
		}
		return Math.floor(effectiveLvl);
	}
}

export default calcEffectiveAttLvl;