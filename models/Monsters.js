const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MonsterSchema = new Schema({
	id: Number,
	name: String,
	cmbLvl: Number,
	hitpoints: Number,
	maxHit: Number,
	attType: Array,
	attSpeed: Number,
	attributes: Array,
	slayerMonster: Boolean,
	slayerReq: Number,
	slayerExp: Number,
	slayerMasters: Array,
	stats: {
		attLvl: Number,
		strLvl: Number,
		defLvl: Number,
		magLvl: Number,
		rngLvl: Number,
		attAccuracy: Number,
		meleeStr: Number,
		rangedStr: Number,
		magicDmg: Number,
		attacks: {
			stab: Number,
			slash: Number,
			crush: Number,
			range: Number,
			magic: Number,
		},
		defences: {
			stab: Number,
			slash: Number,
			crush: Number,
			range: Number,
			magic: Number,
		}
	},
	drops: Array,
})

module.exports = Monster = mongoose.model('Monster', MonsterSchema);