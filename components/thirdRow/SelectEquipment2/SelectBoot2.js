import { useState, useEffect } from 'react';
import SelectSearchItem from '../../templates/SelectSearchItem';
import { useLists } from '../../../state/lists.js';
import { useEquippedGear2 } from '../../../state/equippedGear2.js';
import useHover from '../../../hooks/useHover';
const fetch = require('node-fetch');

const SelectBoot2 = () => {

	const { findEquipment } = useLists();
	const bootList = useLists(state => state.boot);

	const { equipItem } = useEquippedGear2();
	const equippedBoot = useEquippedGear2(state => state.boot);

	const defaultBootPic = '/Equipment/BootSlot.png';
	const [bootPic, setBootPic] = useState(defaultBootPic);
	const [options, setOptions] = useState([]);

	// for loading options in state (should only be triggered once)
	useEffect(() => {
		const tempOptions = [];
		if (bootList) {
			bootList.forEach(boot => {
				tempOptions.push({
					name: boot.name,
					value: boot.id,
				});
			});
			setOptions(tempOptions);
		}
	}, [bootList])

	const handleItemChange = (item, equipType) => { // need to catch errors if it doesnt fetch
		if (item.value) { // item.value is the ID
			const foundItem = findEquipment(equipType, item.value);
			equipItem(equipType, foundItem);
		} else { // equip no boot
			setBootPic(defaultBootPic);
		}
	}

	useEffect(async () => {
		const proxyUrl = "https://cors-anywhere.herokuapp.com/";
		const url = "https://raw.githubusercontent.com/osrsbox/osrsbox-db/master/docs/items-icons/";
		if (equippedBoot) {
			const response = await fetch(`${proxyUrl}${url}${equippedBoot.id}.png`);
			setBootPic(response.url);
		} else setBootPic(defaultBootPic);
	}, [equippedBoot]);

	const [ref, hovered] = useHover();

	return(
		<div className="boot-slot">
			<div className='item-image' ref={ref}>
				{bootPic !== defaultBootPic &&
					<img src={bootPic} alt="weapon pic"/>
				}
			</div>
			<div className='default-image'>
				{bootPic === defaultBootPic &&
					<img src={bootPic} alt="default weapon pic"/>
				}
			</div>
			{hovered && equippedBoot && 
				<div className='equipment-item-hover'>
					<h5>{equippedBoot.name}</h5>
					<h6>{equippedBoot.stats.attStab ? `Stab Att: ${equippedBoot.stats.attStab}` : null}</h6>
					<h6>{equippedBoot.stats.attSlash ? `Slash Att: ${equippedBoot.stats.attSlash}` : null}</h6>
					<h6>{equippedBoot.stats.attCrush ? `Crush Att: ${equippedBoot.stats.attCrush}` : null}</h6>
					<h6>{equippedBoot.stats.attMagic ? `Magic Att: ${equippedBoot.stats.attMagic}` : null}</h6>
					<h6>{equippedBoot.stats.attRanged ? `Range Att: ${equippedBoot.stats.attRanged}` : null}</h6>
					<h6>{equippedBoot.stats.strBonus ? `Melee Str: ${equippedBoot.stats.strBonus}` : null}</h6>
					<h6>{equippedBoot.stats.rngStrBonus ? `Range Str: ${equippedBoot.stats.rngStrBonus}` : null}</h6>
					<h6>{equippedBoot.stats.magBonus ? `Magic Dmg: ${equippedBoot.stats.magBonus}` : null}</h6>
					<h6>{equippedBoot.stats.prayBonus ? `Pray Bonus: ${equippedBoot.stats.prayBonus}` : null}</h6>
				</div>
			}
			<SelectSearchItem 
				options={options} 
				onChange={handleItemChange} 
				itemType='boot' 
			/>
		</div>	
	)
}

export default SelectBoot2;