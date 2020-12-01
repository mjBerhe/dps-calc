// function calculates the effective strength level
// return value depends on both the userStats and void equipment

const calcEffectiveStrLvl = (statObject, equipmentObject) => {

	// unpacking objects
	const { strengthLvl, rangeLvl, magicLvl, strPotion, strPrayer, rngPotion, rngPrayer, magPotion, attStyle, isRange, isMagic } = statObject;
	const { isVoidMelee, isVoidRange, isVoidRangeElite } = equipmentObject;

	let effectiveLvl = 0;

	if (isRange) { // if using range
		const rangePotionMultipliers = [1, 1.1, 1.1, 0, 1.15, 1.1, 1.13, 1.16];
		const rangePotionAddons = [0, 4, 4, 0, 5, 4, 5, 6];
		const rangePrayerValues = [1, 1.05, 1.1, 1.15, 1.23]

		// Has Range lvl been inputted? If so, set effective level to it
		rangeLvl ? effectiveLvl += rangeLvl : effectiveLvl += null;

		// Has a Range potion been selected? If so, adjust effective level depending on potion
		rngPotion ? effectiveLvl = Math.floor(effectiveLvl*rangePotionMultipliers[rngPotion]) + rangePotionAddons[rngPotion] : effectiveLvl += null;

		// Has a Range prayer been selected? If so, adjust effective level depending on prayer
		rngPrayer ? effectiveLvl = Math.floor(effectiveLvl*rangePrayerValues[rngPrayer]) : effectiveLvl += null;

		// Has an attack style been selected? If so adjust effective level depending on attack style
		if (attStyle) {
			if (attStyle === 'accurate' || attStyle === 'short fuse') {
				effectiveLvl += 3;
			}
		}

		effectiveLvl += 8;

		// checking if void range or elite void range is equipped
		if (isVoidRange) {
			effectiveLvl = Math.floor(effectiveLvl*1.1);
		} else if (isVoidRangeElite) {
			effectiveLvl = Math.floor(effectiveLvl*1.125);
		}

		return Math.floor(effectiveLvl);
	
	} else if (isMagic) { // else if using magic
		const magicPotionMultipliers = [1, 1, 1, 1.1, 1.15, 1.1, 1.13, 1.16];
		const magicPotionAddons = [0, 4, 4, 1, 5, 4, 5, 6];

		// Has Magic lvl been inputted? If so, set effecive level to it
		magicLvl ? effectiveLvl += magicLvl : effectiveLvl += null;

		// Has a magic potion been selected? If so, adjust effective level accordingly
		magPotion ? effectiveLvl = Math.floor(effectiveLvl*magicPotionMultipliers[magPotion]) + magicPotionAddons[magPotion] : effectiveLvl += null;

		effectiveLvl += 8; // for the funsies

		return Math.floor(effectiveLvl);

	// else we assume its melee
	} else {
		const strengthPotionMultipliers = [1, 1.1, 1.15, 1.15, 1.15, 1.1, 1.13, 1.16];
		const strengthPotionAddons = [0, 3, 5, 5, 5, 4, 5, 6];
		const strengthPrayerValues = [1, 1.05, 1.1, 1.15, 1.18, 1.23]

		// Has Strength lvl been inputted? If so, set effective level to it
		strengthLvl ? effectiveLvl += strengthLvl : effectiveLvl += null;

		// Has a Strength potion been selected? If so, adjust effective level depending on potion
		strPotion ? effectiveLvl = Math.floor(effectiveLvl*strengthPotionMultipliers[strPotion]) + strengthPotionAddons[strPotion] : effectiveLvl += null;

		// Has a Strength prayer been selected? If so, adjust effective level depending on prayer
		strPrayer ? effectiveLvl = Math.floor(effectiveLvl*strengthPrayerValues[strPrayer]) : effectiveLvl += null;

		// Has an attack style been selected? If so, adjust effective level depending on attack style			
		if (attStyle) {
			if (attStyle === 'aggressive') {
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

export default calcEffectiveStrLvl;