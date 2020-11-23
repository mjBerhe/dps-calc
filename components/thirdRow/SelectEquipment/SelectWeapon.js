import { useState, useEffect } from 'react';
import Image from 'next/image'
import useHover from '../../../hooks/useHover';
import SelectSearch from '../../templates/SelectSearch';
import { useLists } from '../../../state/lists.js';
import { useEquippedGear } from '../../../state/equippedGear.js';
const fetch = require('node-fetch');

export const SelectWeapon = () => {

	const { findEquipment } = useLists();
	const weaponList = useLists(state => state.weapon);

	const { equipItem } = useEquippedGear();
	const equippedWeapon = useEquippedGear(state => state.weapon);

	const [weaponPic, setWeaponPic] = useState('/Equipment/WeaponSlot.png');
	const [options, setOptions] = useState([]);

	// for loading weapon options in state (should only be triggered once)
	useEffect(() => {
		const tempOptions = [];
		if (weaponList) {
			weaponList.forEach(weapon => {
				tempOptions.push({
					name: weapon.name,
					value: weapon.id,
				});
				// console.log(weapon.name)
			})
			setOptions(tempOptions);
			console.log('weapon list loaded');

			// equipping "none" in weapon slot when the weapon list loads
			equipItem('weapon', 100000);
		}
	}, [weaponList]);

	const handleItemChange = async (item, equipType) => {
		const proxyUrl = "https://cors-anywhere.herokuapp.com/";
		const url = "https://raw.githubusercontent.com/osrsbox/osrsbox-db/master/docs/items-icons/";
		
		if (item.value) { // item.value is the ID
			const foundItem = findEquipment(equipType, item.value);
			equipItem(equipType, foundItem);
			console.log('equipped');
			if (item.value !== 100000) { // fetch the equipped weapon
				const response = await fetch(`${proxyUrl}${url}${item.value}.png`);
				setWeaponPic(response.url);
				console.log('finding img')
			} else { // equip no weapon
				equipItem(equipType, 100000);
				setWeaponPic('/Equipment/WeaponSlot.png');
			}
		}
	}

	const [refWeapon, hovered] = useHover();

	return(
		<div className="weapon-slot">
			<div className='item-image' ref={refWeapon}>
				{weaponPic !== '/Equipment/WeaponSlot.png' &&
					<img src={weaponPic} alt="weapon pic"/>
				}
			</div>
			<div className='default-image'>
				{weaponPic === '/Equipment/WeaponSlot.png' &&
					<img src={weaponPic} alt="default weapon pic"/>
				}
			</div>
			{hovered && equippedWeapon.stats &&
				<div className="weapon-hover">
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
			<SelectSearch 
				options={options} 
				onChange={handleItemChange} 
				itemType='weapon' 
			/>
		</div>
	)
}