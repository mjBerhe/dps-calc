const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CapeSchema = new Schema({
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
})

module.exports = Cape = mongoose.model('Cape', CapeSchema);