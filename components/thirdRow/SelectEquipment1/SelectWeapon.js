import { useState, useEffect } from 'react';
import useHover from '../../../hooks/useHover';
import SelectSearchItem from '../../templates/SelectSearchItem';
import { useLists } from '../../../state/lists.js';
import { useEquippedGear } from '../../../state/equippedGear.js';
const fetch = require('node-fetch');

const SelectWeapon = () => {

	const { findEquipment } = useLists();
	const weaponList = useLists(state => state.weapon);

	const { equipItem } = useEquippedGear();
	const equippedWeapon = useEquippedGear(state => state.weapon);

	const defaultWeaponPic = '/Equipment/WeaponSlot.png';
	const [weaponPic, setWeaponPic] = useState(defaultWeaponPic);
	const [options, setOptions] = useState([]);

	let noWeapon;

	// for loading weapon options in state (should only be triggered once)
	useEffect(() => {
		const tempOptions = [];
		if (weaponList) {
			weaponList.forEach(weapon => {
				tempOptions.push({
					name: weapon.name,
					value: weapon.id,
				});
			})
			setOptions(tempOptions);

			// equipping "none" in weapon slot when the weapon list loads
			noWeapon = findEquipment('weapon', 100000);
			equipItem('weapon', noWeapon);
		}
	}, [weaponList]);

	const handleItemChange = (item, equipType) => { 
		if (item.value) { // item.value is the ID
			const foundItem = findEquipment(equipType, item.value);
			equipItem(equipType, foundItem);
		} else {
			console.log('error: weapon not found');
		}
	}

	useEffect( async () => {
		const proxyUrl = "https://cors-anywhere.herokuapp.com/";
		const url = "https://raw.githubusercontent.com/osrsbox/osrsbox-db/master/docs/items-icons/";
		if (equippedWeapon) {
			if (equippedWeapon.id !== 100000) {
				const response = await fetch(`${url}${equippedWeapon.id}.png`);
				setWeaponPic(response.url);
			} else { // user CHOSE to equip no weapon
				setWeaponPic(defaultWeaponPic);
			}
		} else { // items were cleared so FORCE equip no weapon
			if (weaponList) {
				noWeapon = findEquipment('weapon', 100000);
				equipItem('weapon', noWeapon);
				setWeaponPic(defaultWeaponPic);
			}
		}
	}, [equippedWeapon, weaponList])

	const [ref, hovered] = useHover();

	return(
		<div className="weapon-slot">
			<div className='item-image' ref={ref}>
				{weaponPic !== defaultWeaponPic &&
					<img src={weaponPic} alt="weapon pic"/>
				}
			</div>
			<div className='default-image'>
				{weaponPic === defaultWeaponPic &&
					<img src={weaponPic} alt="default weapon pic"/>
				}
			</div>
			{hovered && equippedWeapon.stats &&
				<div className="equipment-item-hover">
					<h5>{equippedWeapon.name}</h5>
					<h6>{equippedWeapon.stats.attStab ? `Stab Att: ${equippedWeapon.stats.attStab}` : null}</h6>
					<h6>{equippedWeapon.stats.attSlash ? `Slash Att: ${equippedWeapon.stats.attSlash}` : null}</h6>
					<h6>{equippedWeapon.stats.attCrush ? `Crush Att: ${equippedWeapon.stats.attCrush}` : null}</h6>
					<h6>{equippedWeapon.stats.attMagic ? `Magic Att: ${equippedWeapon.stats.attMagic}` : null}</h6>
					<h6>{equippedWeapon.stats.attRanged ? `Range Att: ${equippedWeapon.stats.attRanged}` : null}</h6>
					<h6>{equippedWeapon.stats.strBonus ? `Melee Str: ${equippedWeapon.stats.strBonus}` : null}</h6>
					<h6>{equippedWeapon.stats.rngStrBonus ? `Range Str: ${equippedWeapon.stats.rngStrBonus}` : null}</h6>
					<h6>{equippedWeapon.stats.magBonus ? `Magic Dmg: ${equippedWeapon.stats.magBonus}` : null}</h6>
					<h6>{equippedWeapon.stats.prayBonus ? `Pray Bonus: ${equippedWeapon.stats.prayBonus}` : null}</h6>
				</div>
			}
			<SelectSearchItem 
				options={options} 
				onChange={handleItemChange} 
				itemType='weapon' 
			/>
		</div>
	)
}

export default SelectWeapon;