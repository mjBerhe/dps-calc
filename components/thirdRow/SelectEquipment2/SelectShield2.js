import { useState, useEffect } from 'react';
import SelectSearchItem from '../../templates/SelectSearchItem';
import { useLists } from '../../../state/lists.js';
import { useEquippedGear2 } from '../../../state/equippedGear2.js';
import useHover from '../../../hooks/useHover';
const fetch = require('node-fetch');

const SelectShield2 = () => {

	const { findEquipment } = useLists();
	const shieldList = useLists(state => state.shield);

	const { equipItem } = useEquippedGear2();
	const equippedShield = useEquippedGear2(state => state.shield);

	const defaultShieldPic = '/Equipment/ShieldSlot.png';
	const [shieldPic, setShieldPic] = useState(defaultShieldPic);
	const [options, setOptions] = useState([]);

	// for loading options in state (should only be triggered once)
	useEffect(() => {
		const tempOptions = [];
		if (shieldList) {
			shieldList.forEach(shield => {
				tempOptions.push({
					name: shield.name,
					value: shield.id,
				});
			});
			setOptions(tempOptions);
		}
	}, [shieldList])

	const handleItemChange = (item, equipType) => { // need to catch errors if it doesnt fetch
		if (item.value) { // item.value is the ID
			const foundItem = findEquipment(equipType, item.value);
			equipItem(equipType, foundItem);
		} else { // equip no shield
			setShieldPic(defaultShieldPic);
		}
	}

	useEffect(async () => {
		const proxyUrl = "https://cors-anywhere.herokuapp.com/";
		const url = "https://raw.githubusercontent.com/osrsbox/osrsbox-db/master/docs/items-icons/";
		if (equippedShield) {
			const response = await fetch(`${proxyUrl}${url}${equippedShield.id}.png`);
			setShieldPic(response.url);
		} else setShieldPic(defaultShieldPic);
	}, [equippedShield]);

	const [ref, hovered] = useHover();

	return(
		<div className="shield-slot">
			<div className='item-image' ref={ref}>
				{shieldPic !== defaultShieldPic &&
					<img src={shieldPic} alt="weapon pic"/>
				}
			</div>
			<div className='default-image'>
				{shieldPic === defaultShieldPic &&
					<img src={shieldPic} alt="default weapon pic"/>
				}
			</div>
			{hovered && equippedShield && 
				<div className='equipment-item-hover'>
					<h5>{equippedShield.name}</h5>
					<h6>{equippedShield.stats.attStab ? `Stab Att: ${equippedShield.stats.attStab}` : null}</h6>
					<h6>{equippedShield.stats.attSlash ? `Slash Att: ${equippedShield.stats.attSlash}` : null}</h6>
					<h6>{equippedShield.stats.attCrush ? `Crush Att: ${equippedShield.stats.attCrush}` : null}</h6>
					<h6>{equippedShield.stats.attMagic ? `Magic Att: ${equippedShield.stats.attMagic}` : null}</h6>
					<h6>{equippedShield.stats.attRanged ? `Range Att: ${equippedShield.stats.attRanged}` : null}</h6>
					<h6>{equippedShield.stats.strBonus ? `Melee Str: ${equippedShield.stats.strBonus}` : null}</h6>
					<h6>{equippedShield.stats.rngStrBonus ? `Range Str: ${equippedShield.stats.rngStrBonus}` : null}</h6>
					<h6>{equippedShield.stats.magBonus ? `Magic Dmg: ${equippedShield.stats.magBonus}` : null}</h6>
					<h6>{equippedShield.stats.prayBonus ? `Pray Bonus: ${equippedShield.stats.prayBonus}` : null}</h6>
				</div>
			}
			<SelectSearchItem 
				options={options} 
				onChange={handleItemChange} 
				itemType='shield' 
			/>
		</div>	
	)
}

export default SelectShield2;