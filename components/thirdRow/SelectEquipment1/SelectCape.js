import { useState, useEffect } from 'react';
import SelectSearchItem from '../../templates/SelectSearchItem';
import { useLists } from '../../../state/lists.js';
import { useEquippedGear } from '../../../state/equippedGear.js';
import useHover from '../../../hooks/useHover';
const fetch = require('node-fetch');

const SelectCape = () => {

	const { findEquipment } = useLists();
	const capeList = useLists(state => state.cape);

	const { equipItem } = useEquippedGear();
	const equippedCape = useEquippedGear(state => state.cape);

	const defaultCapePic = '/Equipment/CapeSlot.png';
	const [capePic, setCapePic] = useState(defaultCapePic);
	const [options, setOptions] = useState([]);

	// for loading options in state (should only be triggered once)
	useEffect(() => {
		const tempOptions = [];
		if (capeList) {
			capeList.forEach(cape => {
				tempOptions.push({
					name: cape.name,
					value: cape.id,
				});
			});
			setOptions(tempOptions);
		}
	}, [capeList])

	const handleItemChange =  (item, equipType) => { // need to catch errors if it doesnt fetch
		if (item.value) { // item.value is the ID
			const foundItem = findEquipment(equipType, item.value);
			equipItem(equipType, foundItem);
		} else { // equip no cape
			setCapePic(defaultCapePic);
		}
	}

	useEffect(async () => {
		const proxyUrl = "https://cors-anywhere.herokuapp.com/";
		const url = "https://raw.githubusercontent.com/osrsbox/osrsbox-db/master/docs/items-icons/";
		if (equippedCape) {
			const response = await fetch(`${url}${equippedCape.id}.png`);
			setCapePic(response.url);
		} else setCapePic(defaultCapePic);
	}, [equippedCape]);

	const [ref, hovered] = useHover();

	return(
		<div className="cape-slot">
			<div className='item-image' ref={ref}>
				{capePic !== defaultCapePic &&
					<img src={capePic} alt="cape pic"/>
				}
			</div>
			<div className='default-image'>
				{capePic === defaultCapePic &&
					<img src={capePic} alt="default cape pic"/>
				}
			</div>
			{hovered && equippedCape && 
				<div className='equipment-item-hover'>
					<h5>{equippedCape.name}</h5>
					<h6>{equippedCape.stats.attStab ? `Stab Att: ${equippedCape.stats.attStab}` : null}</h6>
					<h6>{equippedCape.stats.attSlash ? `Slash Att: ${equippedCape.stats.attSlash}` : null}</h6>
					<h6>{equippedCape.stats.attCrush ? `Crush Att: ${equippedCape.stats.attCrush}` : null}</h6>
					<h6>{equippedCape.stats.attMagic ? `Magic Att: ${equippedCape.stats.attMagic}` : null}</h6>
					<h6>{equippedCape.stats.attRanged ? `Range Att: ${equippedCape.stats.attRanged}` : null}</h6>
					<h6>{equippedCape.stats.strBonus ? `Melee Str: ${equippedCape.stats.strBonus}` : null}</h6>
					<h6>{equippedCape.stats.rngStrBonus ? `Range Str: ${equippedCape.stats.rngStrBonus}` : null}</h6>
					<h6>{equippedCape.stats.magBonus ? `Magic Dmg: ${equippedCape.stats.magBonus}` : null}</h6>
					<h6>{equippedCape.stats.prayBonus ? `Pray Bonus: ${equippedCape.stats.prayBonus}` : null}</h6>
				</div>
			}
			<SelectSearchItem 
				options={options} 
				onChange={handleItemChange} 
				itemType='cape' 
			/>
		</div>	
	)
}

export default SelectCape;