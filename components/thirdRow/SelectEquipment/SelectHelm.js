import { useState, useEffect } from 'react';
import SelectSearchItem from '../../templates/SelectSearchItem';
import { useLists } from '../../../state/lists.js';
import { useEquippedGear } from '../../../state/equippedGear.js';
import useHover from '../../../hooks/useHover';
const fetch = require('node-fetch');

const SelectHelm = () => {

	const { findEquipment } = useLists();
	const helmList = useLists(state => state.helm);

	const { equipItem } = useEquippedGear();
	const equippedHelm = useEquippedGear(state => state.helm);

	const defaultHelmPic = '/Equipment/HelmSlot.png';
	const [helmPic, setHelmPic] = useState(defaultHelmPic);
	const [options, setOptions] = useState([]);

	// for loading options in state (should only be triggered once)
	useEffect(() => {
		const tempOptions = [];
		if (helmList) {
			helmList.forEach(helm => {
				tempOptions.push({
					name: helm.name,
					value: helm.id,
				});
			});
			setOptions(tempOptions);
		}
	}, [helmList])

	const handleItemChange = async (item, equipType) => { // need to catch errors if it doesnt fetch
		const proxyUrl = "https://cors-anywhere.herokuapp.com/";
		const url = "https://raw.githubusercontent.com/osrsbox/osrsbox-db/master/docs/items-icons/";
		
		if (item.value) { // item.value is the ID
			const foundItem = findEquipment(equipType, item.value);
			equipItem(equipType, foundItem);
			console.log('equipped');

			const response = await fetch(`${proxyUrl}${url}${item.value}.png`);
			setHelmPic(response.url);
		} else { // equip no helm
			setHelmPic(defaultHelmPic);
		}
	}

	const [ref, hovered] = useHover();

	return(
		<div className="helm-slot">
			<div className='item-image' ref={ref}>
				{helmPic !== defaultHelmPic &&
					<img src={helmPic} alt="weapon pic"/>
				}
			</div>
			<div className='default-image'>
				{helmPic === defaultHelmPic &&
					<img src={helmPic} alt="default weapon pic"/>
				}
			</div>
			{hovered && equippedHelm && 
				<div className='equipment-item-hover'>
					<h5>{equippedHelm.name}</h5>
					<h6>{equippedHelm.stats.attStab ? `Stab Att: ${equippedHelm.stats.attStab}` : null}</h6>
					<h6>{equippedHelm.stats.attSlash ? `Slash Att: ${equippedHelm.stats.attSlash}` : null}</h6>
					<h6>{equippedHelm.stats.attCrush ? `Crush Att: ${equippedHelm.stats.attCrush}` : null}</h6>
					<h6>{equippedHelm.stats.attMagic ? `Magic Att: ${equippedHelm.stats.attMagic}` : null}</h6>
					<h6>{equippedHelm.stats.attRanged ? `Range Att: ${equippedHelm.stats.attRanged}` : null}</h6>
					<h6>{equippedHelm.stats.strBonus ? `Melee Str: ${equippedHelm.stats.strBonus}` : null}</h6>
					<h6>{equippedHelm.stats.rngStrBonus ? `Range Str: ${equippedHelm.stats.rngStrBonus}` : null}</h6>
					<h6>{equippedHelm.stats.magBonus ? `Magic Dmg: ${equippedHelm.stats.magBonus}` : null}</h6>
					<h6>{equippedHelm.stats.prayBonus ? `Pray Bonus: ${equippedHelm.stats.prayBonus}` : null}</h6>
				</div>
			}
			<SelectSearchItem 
				options={options} 
				onChange={handleItemChange} 
				itemType='helm' 
			/>
		</div>	
	)
}

export default SelectHelm;