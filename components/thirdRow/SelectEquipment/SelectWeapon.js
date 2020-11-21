import React, { useState, useEffect } from 'react';
import SelectSearch from 'react-select-search';
import useHover from '../../../hooks/useHover';
import { useLists } from '../../../state/lists.js';
import { useEquippedGear } from '../../../state/equippedGear.js';
const fetch = require('node-fetch');

export const SelectWeapon = React.memo(() => {

	const { findEquipment } = useLists();
	const weaponList = useLists(state => state.weapon);

	const { equipItem } = useEquippedGear();
	const equippedWeapon = useEquippedGear(state => state.weapon);

	const [weaponPic, setWeaponPic] = useState(defaultWeaponImg);
	const [options, setOptions] = useState([]);
	const [weaponID, setWeaponID] = useState(null);

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

	// equipping weapon
	useEffect(() => {
		if (weaponID) {
			const item = findEquipment('weapon', weaponID);
			equipItem('weapon', item);
		} else equipItem('weapon', 100000);
	}, [weaponID])

	// for fetching image after every select or if equipped weapon changes somehow
	useEffect(() => {
		async function fetchImage() {
			const proxyUrl = "https://cors-anywhere.herokuapp.com/";
			const url = "https://raw.githubusercontent.com/osrsbox/osrsbox-db/master/docs/items-icons/";
			if (equippedWeapon) {
				if (equippedWeapon.id === 100000) {
					setWeaponPic(defaultWeaponImg);
				} else {
					const response = await fetch(`${proxyUrl}${url}${equippedWeapon.id}.png`);
					setWeaponPic(response.url)
				}
			} else setWeaponPic(defaultWeaponImg);
		}
		fetchImage();
	}, [equippedWeapon])

	const [ref, hovered] = useHover();

	return(
		<div className="weapon-slot">
			<img src={weaponPic} alt="selected weapon" ref={ref}/>
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
				value={weaponID}
				search
				placeholder='Select Weapon'
				onChange={setWeaponID}
			/>
		</div>
	)
})

export default function defaultWeaponImg() {
	return <img src='/Equipment/WeaponSlot.png' alt='default weapon img'/>
}