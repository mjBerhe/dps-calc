const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WeaponSchema = new Schema({
	id: Number,
	name: String,
	equipableByPlayer: Boolean,
	equipableWeapon: Boolean,
	stats: {
		attStab: Number,
		attSlash: Number,
		attCrush: Number,
		attMagic: Number,
		attRanged: Number,
		defStab: Number,
		defSlash: Number,
		defCrush: Number,
		defMagic: Number,
		defRanged: Number,
		strBonus: Number,
		rngStrBonus: Number,
		magBonus: Number,
		prayBonus: Number,
		slot: String,
	},
	attSpeed: Number,
	wepType: String,
	stances: {
		stance0: {
			cmbStyle: String,
			attType: String,
			attStyle: String,
		},
		stance1: {
			cmbStyle: String,
			attType: String,
			attStyle: String,
		},
		stance2: {
			cmbStyle: String,
			attType: String,
			attStyle: String,
		},
		stance3: {
			cmbStyle: String,
			attType: String,
			attStyle: String,
		},
		stance4: {
			cmbStyle: String,
			attType: String,
			attStyle: String,
		}
	}
})

module.exports = Weapon = mongoose.model('Weapon', WeaponSchema);