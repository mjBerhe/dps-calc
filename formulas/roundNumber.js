const roundNumber = (num, decimalPlace) => {
	// if rounding accuracy, change it to a percentage instead of a decimal
	if (decimalPlace === 2) {
		num *= 100;
	}
	let roundedNum = num*(10**decimalPlace);
	roundedNum = Math.round(roundedNum);
	roundedNum = roundedNum/(10**decimalPlace);

	return roundedNum;
}

export default roundNumber;