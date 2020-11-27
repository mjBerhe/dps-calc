import { useState, useEffect } from 'react';
import useHover from '../../../hooks/useHover';
import SelectSearchItem from '../../templates/SelectSearchItem';
import { useUserStats } from '../../../state/userStats';
import { useEquippedGear } from '../../../state/equippedGear';

export const SelectWeaponStyle = () => {

	const { setMultipleStats } = useUserStats();
	const { attStyle, attType } = useUserStats(state => ({
		attStyle: state.attStyle,
		attType: state.attType,
	}));
	const equippedWeapon = useEquippedGear(state => state.weapon);

	// controls a list of weapon styles for the selected weapon
	const [options, setOptions] = useState([]);
	const defaultStylePic = '/WeaponStyles/default_style.png';
	const [stylePic, setStylePic] = useState(defaultStylePic);

	const styleImages = {
		axes: ["axes1", "axes2", "axes3", "axes4"],
		bladed_staves: ['bladed_staves1', 'bladed_staves2', 'bladed_staves3', 'bladed_staves4', 'bladed_staves5'],
		blunt_weapons: ['blunt_weapons1', 'blunt_weapons2', 'blunt_weapons3'],
		bows: ['bows1', 'bows2', 'bows3'],
		bulwarks: ['bulwark1', 'bulwark2'],
		chinchompas: ['chinchompas1', 'chinchompas2', 'chinchompas3'],
		claws: ['claws1', 'claws2', 'claws3', 'claws4'],
		crossbows: ['crossbows1', 'crossbows2', 'crossbows3'],
		halberds: ['halberds1', 'halberds2', 'halberds3'],
		pickaxes: ['pickaxes1', 'pickaxes2', 'pickaxes3', 'pickaxes4'],
		'trident-class_weapons': ['trident_class_weapons1', 'trident_class_weapons2', 'trident_class_weapons3'],
		scythes: ['scythes1', 'scythes2', 'scythes3', 'scythes4'],
		slashing_swords: ['slashing_swords1', 'slashing_swords2', 'slashing_swords3', 'slashing_swords4'],
		spears: ['spears1', 'spears2', 'spears3', 'spears4'],
		spiked_weapons: ['spiked_weapons1', 'spiked_weapons2', 'spiked_weapons3', 'spiked_weapons4'],
		stabbing_swords: ['stabbing_swords1', 'stabbing_swords2', 'stabbing_swords3', 'stabbing_swords4'],
		staves: ['staves1', 'staves2', 'staves3', 'staves4', 'staves5'],
		thrown_weapons: ['thrown_weapons1', 'thrown_weapons2', 'thrown_weapons3'],
		'two-handed_swords': ['two_handed_swords1', 'two_handed_swords2', 'two_handed_swords3', 'two_handed_swords4'],
		unarmed: ['unarmed1', 'unarmed2', 'unarmed3'],
		whips: ['whips1', 'whips2', 'whips3'],
	}

	const meleeWepTypes = ['axes', 'blunt_weapons', 'bulwarks', 'claws', 'halberds', 'pickaxes', 'polearms', 'scythes', 'slashing_swords', 'spears', 'spiked_weapons', 'stabbing_swords', 'two-handed_swords', 'unarmed', 'whips'];
	const rangedWepTypes = ['bows', 'crossbows', 'thrown_weapons', 'chinchompas'];
	const magicWepTypes = ['staves', 'bladed_staves', 'trident-class_weapons'];

	const rangedAttStyles = ['accurate', 'rapid', 'longrange', 'short fuse', 'medium fuse', 'long fuse'];

	// for loading style options once weapon is selected
	// whenever weapon changes, style pic resets and some stats are reset
	useEffect(() => {
		const tempOptions = [];
		if (equippedWeapon) {
			// checking if equipped weapon is a melee weapon
			if (meleeWepTypes.includes(equippedWeapon.wepType)) {
				Object.keys(equippedWeapon.stances).forEach((stance, i) => {
					tempOptions.push({
						value: parseInt(stance.substring(6, 7), 10),
						name: `${equippedWeapon.stances[stance].attType} - ${equippedWeapon.stances[stance].attStyle}`,
						attType: equippedWeapon.stances[stance].attType,
						attStyle: equippedWeapon.stances[stance].attStyle,
						number: i, // for reference when selecting image
					});
				});
			// else checking if equipped weapon is a ranged weapon
			} else if (rangedWepTypes.includes(equippedWeapon.wepType)) {
				Object.keys(equippedWeapon.stances).forEach((stance, i) => {
					tempOptions.push({
						value: parseInt(stance.substring(6, 7), 10),
						name: `ranged - ${equippedWeapon.stances[stance].cmbStyle}`,
						attType: 'range',
						attStyle: equippedWeapon.stances[stance].cmbStyle,
						number: i, // for reference when selecting image
					});
				});
			// else checking if equipped weapon is a magic weapon
			} else if (magicWepTypes.includes(equippedWeapon.wepType)) {
				Object.keys(equippedWeapon.stances).forEach((stance, i) => {
					if (equippedWeapon.wepType === 'trident-class_weapons') {
						tempOptions.push({
							value: parseInt(stance.substring(6, 7), 10),
							name: `magic - ${equippedWeapon.stances[stance].cmbStyle}`,
							attType: 'magic',
							attStyle: equippedWeapon.stances[stance].cmbStyle,
							number: i, // for reference when selecting image
						});
					} else {
						tempOptions.push({
							value: parseInt(stance.substring(6, 7), 10),
							name: `${equippedWeapon.stances[stance].attType} - ${equippedWeapon.stances[stance].attStyle}`,
							attType: equippedWeapon.stances[stance].attType,
							attStyle: equippedWeapon.stances[stance].attStyle,
							number: i, // for reference when selecting image
						});
					}
				});
			}
			setOptions(tempOptions);
		} else { // weapon was just unequipped
			setOptions([]);
		}
		setStylePic(defaultStylePic);
		// setMultipleStats({
		// 	attType: null,
		// 	attStyle: null,
		// 	isMagic: false,
		// 	isRange: false,
		// });
	}, [equippedWeapon])

	// when a style is chosen, userStats gets updated with the specific attack type and attack style
	// spellcasting and defensive casting are converted simply to magic
	const handleStyleChange = (option, itemType) => {
		if (option) {
			// if selecting a casting style on a magic staff
			if (option.attType === 'spellcasting' || option.attType === 'defensive casting') {
				setMultipleStats({
					attType: 'magic',
					attStyle: option.attStyle,
					isMagic: true,
					isRange: false,
				});
			// if using a trident-type weapon, make sure chosenSpell is turned off
			} else if (equippedWeapon.wepType === 'trident-class_weapons') {
				setMultipleStats({
					attType: 'magic',
					attStyle: option.attStyle,
					isMagic: true,
					isRange: false,
					chosenSpell: null,
				});
			// if the currently equipped weapon is ranged and a style was chosen, turn isRange to true
			// double checking because tridents share similar attStyle
			} else if (rangedWepTypes.includes(equippedWeapon.wepType)) {
				if (rangedAttStyles.includes(option.attStyle)) {
					setMultipleStats({
						attType: option.attType,
						attStyle: option.attStyle,
						isRange: true,
						isMagic: false,
						chosenSpell: null,
					});
				}
			} else { // else, should be melee
				setMultipleStats({
					attType: option.attType,
					attStyle: option.attStyle,
					isMagic: false,
					isRange: false,
					chosenSpell: null,
				});
			}
			// if (equippedWeapon) {
				setStylePic(`/WeaponStyles/${equippedWeapon.wepType}/${styleImages[equippedWeapon.wepType][option.number]}.png`);
				// console.log(`/WeaponStyles/${equippedWeapon.wepType}/${styleImages[equippedWeapon.wepType][option.number]}.png`);
			// }
		}
	}

	useEffect(() => {
		// console.log(attStyle, attType);
	}, [attStyle, attType])

	const [ref, hovered] = useHover();

	return(
		<div className="style-slot">
			<img src={stylePic} alt="selected style" ref={ref}/>
			{hovered && attStyle && 
				<div className='attack-style-hover'>
					<h5>{`${attType} - ${attStyle}`}</h5>
				</div>
			}
			<SelectSearchItem
				options={options}
				onChange={handleStyleChange}
				itemType='style'
			/>
		</div>
	)
}