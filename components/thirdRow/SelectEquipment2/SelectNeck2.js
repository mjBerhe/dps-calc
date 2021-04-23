import { useState, useEffect } from 'react';
import SelectSearchItem from '../../templates/SelectSearchItem';
import { useLists } from '../../../state/lists.js';
import { useEquippedGear2 } from '../../../state/equippedGear2.js';
import useHover from '../../../hooks/useHover';
const fetch = require('node-fetch');

const SelectNeck2 = () => {

	const { findEquipment } = useLists();
	const neckList = useLists(state => state.neck);

	const { equipItem } = useEquippedGear2();
	const equippedNeck = useEquippedGear2(state => state.neck);

	const defaultNeckPic = '/Equipment/NeckSlot.png';
	const [neckPic, setNeckPic] = useState(defaultNeckPic);
	const [options, setOptions] = useState([]);

	// for loading options in state (should only be triggered once)
	useEffect(() => {
		const tempOptions = [];
		if (neckList) {
			neckList.forEach(neck => {
				tempOptions.push({
					name: neck.name,
					value: neck.id,
				});
			});
			setOptions(tempOptions);
		}
	}, [neckList])

	const handleItemChange = (item, equipType) => { // need to catch errors if it doesnt fetch
		if (item.value) { // item.value is the ID
			const foundItem = findEquipment(equipType, item.value);
			equipItem(equipType, foundItem);
		} else { // equip no neck
			setNeckPic(defaultNeckPic);
		}
	}

	useEffect(async () => {
		const proxyUrl = "https://cors-anywhere.herokuapp.com/";
		const url = "https://raw.githubusercontent.com/osrsbox/osrsbox-db/master/docs/items-icons/";
		if (equippedNeck) {
			const response = await fetch(`${url}${equippedNeck.id}.png`);
			setNeckPic(response.url);
		} else setNeckPic(defaultNeckPic);
	}, [equippedNeck]);

	const [ref, hovered] = useHover();

	return(
		<div className="neck-slot">
			<div className='item-image' ref={ref}>
				{neckPic !== defaultNeckPic &&
					<img src={neckPic} alt="necklace pic"/>
				}
			</div>
			<div className='default-image'>
				{neckPic === defaultNeckPic &&
					<img src={neckPic} alt="default necklace pic"/>
				}
			</div>
			{hovered && equippedNeck && 
				<div className='equipment-item-hover'>
					<h5>{equippedNeck.name}</h5>
					<h6>{equippedNeck.stats.attStab ? `Stab Att: ${equippedNeck.stats.attStab}` : null}</h6>
					<h6>{equippedNeck.stats.attSlash ? `Slash Att: ${equippedNeck.stats.attSlash}` : null}</h6>
					<h6>{equippedNeck.stats.attCrush ? `Crush Att: ${equippedNeck.stats.attCrush}` : null}</h6>
					<h6>{equippedNeck.stats.attMagic ? `Magic Att: ${equippedNeck.stats.attMagic}` : null}</h6>
					<h6>{equippedNeck.stats.attRanged ? `Range Att: ${equippedNeck.stats.attRanged}` : null}</h6>
					<h6>{equippedNeck.stats.strBonus ? `Melee Str: ${equippedNeck.stats.strBonus}` : null}</h6>
					<h6>{equippedNeck.stats.rngStrBonus ? `Range Str: ${equippedNeck.stats.rngStrBonus}` : null}</h6>
					<h6>{equippedNeck.stats.magBonus ? `Magic Dmg: ${equippedNeck.stats.magBonus}` : null}</h6>
					<h6>{equippedNeck.stats.prayBonus ? `Pray Bonus: ${equippedNeck.stats.prayBonus}` : null}</h6>
				</div>
			}
			<SelectSearchItem 
				options={options} 
				onChange={handleItemChange} 
				itemType='neck' 
			/>
		</div>	
	)
}

export default SelectNeck2;