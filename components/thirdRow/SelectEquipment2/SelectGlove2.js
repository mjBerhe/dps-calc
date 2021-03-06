import { useState, useEffect } from 'react';
import SelectSearchItem from '../../templates/SelectSearchItem';
import { useLists } from '../../../state/lists.js';
import { useEquippedGear2 } from '../../../state/equippedGear2.js';
import useHover from '../../../hooks/useHover';
const fetch = require('node-fetch');

const SelectGlove2 = () => {

	const { findEquipment } = useLists();
	const gloveList = useLists(state => state.glove);

	const { equipItem } = useEquippedGear2();
	const equippedGlove = useEquippedGear2(state => state.glove);

	const defaultGlovePic = '/Equipment/GloveSlot.png';
	const [glovePic, setGlovePic] = useState(defaultGlovePic);
	const [options, setOptions] = useState([]);

	// for loading options in state (should only be triggered once)
	useEffect(() => {
		const tempOptions = [];
		if (gloveList) {
			gloveList.forEach(glove => {
				tempOptions.push({
					name: glove.name,
					value: glove.id,
				});
			});
			setOptions(tempOptions);
		}
	}, [gloveList])

	const handleItemChange = (item, equipType) => { // need to catch errors if it doesnt fetch
		if (item.value) { // item.value is the ID
			const foundItem = findEquipment(equipType, item.value);
			equipItem(equipType, foundItem);
		} else { // equip no glove
			setGlovePic(defaultGlovePic);
		}
	}

	useEffect(async () => {
		const proxyUrl = "https://cors-anywhere.herokuapp.com/";
		const url = "https://raw.githubusercontent.com/osrsbox/osrsbox-db/master/docs/items-icons/";
		if (equippedGlove) {
			const response = await fetch(`${url}${equippedGlove.id}.png`);
			setGlovePic(response.url);
		} else setGlovePic(defaultGlovePic);
	}, [equippedGlove]);

	const [ref, hovered] = useHover();

	return(
		<div className="glove-slot">
			<div className='item-image' ref={ref}>
				{glovePic !== defaultGlovePic &&
					<img src={glovePic} alt="glove pic"/>
				}
			</div>
			<div className='default-image'>
				{glovePic === defaultGlovePic &&
					<img src={glovePic} alt="default glove pic"/>
				}
			</div>
			{hovered && equippedGlove && 
				<div className='equipment-item-hover'>
					<h5>{equippedGlove.name}</h5>
					<h6>{equippedGlove.stats.attStab ? `Stab Att: ${equippedGlove.stats.attStab}` : null}</h6>
					<h6>{equippedGlove.stats.attSlash ? `Slash Att: ${equippedGlove.stats.attSlash}` : null}</h6>
					<h6>{equippedGlove.stats.attCrush ? `Crush Att: ${equippedGlove.stats.attCrush}` : null}</h6>
					<h6>{equippedGlove.stats.attMagic ? `Magic Att: ${equippedGlove.stats.attMagic}` : null}</h6>
					<h6>{equippedGlove.stats.attRanged ? `Range Att: ${equippedGlove.stats.attRanged}` : null}</h6>
					<h6>{equippedGlove.stats.strBonus ? `Melee Str: ${equippedGlove.stats.strBonus}` : null}</h6>
					<h6>{equippedGlove.stats.rngStrBonus ? `Range Str: ${equippedGlove.stats.rngStrBonus}` : null}</h6>
					<h6>{equippedGlove.stats.magBonus ? `Magic Dmg: ${equippedGlove.stats.magBonus}` : null}</h6>
					<h6>{equippedGlove.stats.prayBonus ? `Pray Bonus: ${equippedGlove.stats.prayBonus}` : null}</h6>
				</div>
			}
			<SelectSearchItem 
				options={options} 
				onChange={handleItemChange} 
				itemType='glove' 
			/>
		</div>	
	)
}

export default SelectGlove2;