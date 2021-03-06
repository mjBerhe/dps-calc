import { useState, useEffect } from 'react';
import SelectSearchItem from '../../templates/SelectSearchItem';
import { useLists } from '../../../state/lists.js';
import { useEquippedGear2 } from '../../../state/equippedGear2.js';
import useHover from '../../../hooks/useHover';
const fetch = require('node-fetch');

const SelectAmmo2 = () => {

	const { findEquipment } = useLists();
	const ammoList = useLists(state => state.ammo);

	const { equipItem } = useEquippedGear2();
	const equippedAmmo = useEquippedGear2(state => state.ammo);

	const defaultAmmoPic = '/Equipment/AmmoSlot.png';
	const [ammoPic, setAmmoPic] = useState(defaultAmmoPic);
	const [options, setOptions] = useState([]);

	// for loading options in state (should only be triggered once)
	useEffect(() => {
		const tempOptions = [];
		if (ammoList) {
			ammoList.forEach(ammo => {
				tempOptions.push({
					name: ammo.name,
					value: ammo.id,
				});
			});
			setOptions(tempOptions);
		}
	}, [ammoList])

	const handleItemChange = (item, equipType) => { // need to catch errors if it doesnt fetch
		if (item.value) { // item.value is the ID
			const foundItem = findEquipment(equipType, item.value);
			equipItem(equipType, foundItem);
		} else { // equip no ammo
			setAmmoPic(defaultAmmoPic);
		}
	}

	useEffect(async () => {
		const proxyUrl = "https://cors-anywhere.herokuapp.com/";
		const url = "https://raw.githubusercontent.com/osrsbox/osrsbox-db/master/docs/items-icons/";
		if (equippedAmmo) {
			const response = await fetch(`${url}${equippedAmmo.id}.png`);
			setAmmoPic(response.url);
		} else setAmmoPic(defaultAmmoPic);
	}, [equippedAmmo]);

	const [ref, hovered] = useHover();

	return(
		<div className="ammo-slot">
			<div className='item-image' ref={ref}>
				{ammoPic !== defaultAmmoPic &&
					<img src={ammoPic} alt="ammo pic"/>
				}
			</div>
			<div className='default-image'>
				{ammoPic === defaultAmmoPic &&
					<img src={ammoPic} alt="default ammo pic"/>
				}
			</div>
			{hovered && equippedAmmo && 
				<div className='equipment-item-hover'>
					<h5>{equippedAmmo.name}</h5>
					<h6>{equippedAmmo.stats.attStab ? `Stab Att: ${equippedAmmo.stats.attStab}` : null}</h6>
					<h6>{equippedAmmo.stats.attSlash ? `Slash Att: ${equippedAmmo.stats.attSlash}` : null}</h6>
					<h6>{equippedAmmo.stats.attCrush ? `Crush Att: ${equippedAmmo.stats.attCrush}` : null}</h6>
					<h6>{equippedAmmo.stats.attMagic ? `Magic Att: ${equippedAmmo.stats.attMagic}` : null}</h6>
					<h6>{equippedAmmo.stats.attRanged ? `Range Att: ${equippedAmmo.stats.attRanged}` : null}</h6>
					<h6>{equippedAmmo.stats.strBonus ? `Melee Str: ${equippedAmmo.stats.strBonus}` : null}</h6>
					<h6>{equippedAmmo.stats.rngStrBonus ? `Range Str: ${equippedAmmo.stats.rngStrBonus}` : null}</h6>
					<h6>{equippedAmmo.stats.magBonus ? `Magic Dmg: ${equippedAmmo.stats.magBonus}` : null}</h6>
					<h6>{equippedAmmo.stats.prayBonus ? `Pray Bonus: ${equippedAmmo.stats.prayBonus}` : null}</h6>
				</div>
			}
			<SelectSearchItem 
				options={options} 
				onChange={handleItemChange} 
				itemType='ammo' 
			/>
		</div>	
	)
}

export default SelectAmmo2;