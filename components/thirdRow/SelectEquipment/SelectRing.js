import { useState, useEffect } from 'react';
import SelectSearchItem from '../../templates/SelectSearchItem';
import { useLists } from '../../../state/lists.js';
import { useEquippedGear } from '../../../state/equippedGear.js';
import useHover from '../../../hooks/useHover';
const fetch = require('node-fetch');

const SelectRing = () => {

	const { findEquipment } = useLists();
	const ringList = useLists(state => state.ring);

	const { equipItem } = useEquippedGear();
	const equippedRing = useEquippedGear(state => state.ring);

	const defaultRingPic = '/Equipment/RingSlot.png';
	const [ringPic, setRingPic] = useState(defaultRingPic);
	const [options, setOptions] = useState([]);

	// for loading options in state (should only be triggered once)
	useEffect(() => {
		const tempOptions = [];
		if (ringList) {
			ringList.forEach(ring => {
				tempOptions.push({
					name: ring.name,
					value: ring.id,
				});
			});
			setOptions(tempOptions);
		}
	}, [ringList])

	const handleItemChange = async (item, equipType) => { // need to catch errors if it doesnt fetch
		const proxyUrl = "https://cors-anywhere.herokuapp.com/";
		const url = "https://raw.githubusercontent.com/osrsbox/osrsbox-db/master/docs/items-icons/";
		
		if (item.value) { // item.value is the ID
			const foundItem = findEquipment(equipType, item.value);
			equipItem(equipType, foundItem);
			console.log('equipped');

			const response = await fetch(`${proxyUrl}${url}${item.value}.png`);
			setRingPic(response.url);
		} else { // equip no ring
			setRingPic(defaultRingPic);
		}
	}

	const [ref, hovered] = useHover();

	return(
		<div className="ring-slot">
			<div className='item-image' ref={ref}>
				{ringPic !== defaultRingPic &&
					<img src={ringPic} alt="weapon pic"/>
				}
			</div>
			<div className='default-image'>
				{ringPic === defaultRingPic &&
					<img src={ringPic} alt="default weapon pic"/>
				}
			</div>
			{hovered && equippedRing && 
				<div className='equipment-item-hover'>
					<h5>{equippedRing.name}</h5>
					<h6>{equippedRing.stats.attStab ? `Stab Att: ${equippedRing.stats.attStab}` : null}</h6>
					<h6>{equippedRing.stats.attSlash ? `Slash Att: ${equippedRing.stats.attSlash}` : null}</h6>
					<h6>{equippedRing.stats.attCrush ? `Crush Att: ${equippedRing.stats.attCrush}` : null}</h6>
					<h6>{equippedRing.stats.attMagic ? `Magic Att: ${equippedRing.stats.attMagic}` : null}</h6>
					<h6>{equippedRing.stats.attRanged ? `Range Att: ${equippedRing.stats.attRanged}` : null}</h6>
					<h6>{equippedRing.stats.strBonus ? `Melee Str: ${equippedRing.stats.strBonus}` : null}</h6>
					<h6>{equippedRing.stats.rngStrBonus ? `Range Str: ${equippedRing.stats.rngStrBonus}` : null}</h6>
					<h6>{equippedRing.stats.magBonus ? `Magic Dmg: ${equippedRing.stats.magBonus}` : null}</h6>
					<h6>{equippedRing.stats.prayBonus ? `Pray Bonus: ${equippedRing.stats.prayBonus}` : null}</h6>
				</div>
			}
			<SelectSearchItem 
				options={options} 
				onChange={handleItemChange} 
				itemType='ring' 
			/>
		</div>	
	)
}

export default SelectRing;