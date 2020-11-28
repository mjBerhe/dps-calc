import React, { useState, useEffect } from 'react';
import SelectSearchItem from '../../templates/SelectSearchItem';
import { useLists } from '../../../state/lists.js';
import { useEquippedGear2 } from '../../../state/equippedGear2.js';
import useHover from '../../../hooks/useHover';
const fetch = require('node-fetch');

const SelectBody2 = () => {

	const { findEquipment } = useLists();
	const bodyList = useLists(state => state.body);

	const { equipItem } = useEquippedGear2();
	const equippedBody = useEquippedGear2(state => state.body);

	const defaultBodyPic = '/Equipment/BodySlot.png';
	const [bodyPic, setBodyPic] = useState(defaultBodyPic);
	const [options, setOptions] = useState([]);

	// for loading options in state (should only be triggered once)
	useEffect(() => {
		const tempOptions = [];
		if (bodyList) {
			bodyList.forEach(body => {
				tempOptions.push({
					name: body.name,
					value: body.id,
				});
			});
			setOptions(tempOptions);
		}
	}, [bodyList])

	const handleItemChange = (item, equipType) => { // need to catch errors if it doesnt fetch
		if (item.value) { // item.value is the ID
			const foundItem = findEquipment(equipType, item.value);
			equipItem(equipType, foundItem);
		} else { // equip no body
			setBodyPic(defaultBodyPic);
		}
	}

	useEffect(async () => {
		const proxyUrl = "https://cors-anywhere.herokuapp.com/";
		const url = "https://raw.githubusercontent.com/osrsbox/osrsbox-db/master/docs/items-icons/";
		if (equippedBody) {
			const response = await fetch(`${proxyUrl}${url}${equippedBody.id}.png`);
			setBodyPic(response.url);
		} else setBodyPic(defaultBodyPic);
	}, [equippedBody]);

	const [ref, hovered] = useHover();

	return(
		<div className="body-slot">
			<div className='item-image' ref={ref}>
				{bodyPic !== defaultBodyPic &&
					<img src={bodyPic} alt="weapon pic"/>
				}
			</div>
			<div className='default-image'>
				{bodyPic === defaultBodyPic &&
					<img src={bodyPic} alt="default weapon pic"/>
				}
			</div>
			{hovered && equippedBody && 
				<div className='equipment-item-hover'>
					<h5>{equippedBody.name}</h5>
					<h6>{equippedBody.stats.attStab ? `Stab Att: ${equippedBody.stats.attStab}` : null}</h6>
					<h6>{equippedBody.stats.attSlash ? `Slash Att: ${equippedBody.stats.attSlash}` : null}</h6>
					<h6>{equippedBody.stats.attCrush ? `Crush Att: ${equippedBody.stats.attCrush}` : null}</h6>
					<h6>{equippedBody.stats.attMagic ? `Magic Att: ${equippedBody.stats.attMagic}` : null}</h6>
					<h6>{equippedBody.stats.attRanged ? `Range Att: ${equippedBody.stats.attRanged}` : null}</h6>
					<h6>{equippedBody.stats.strBonus ? `Melee Str: ${equippedBody.stats.strBonus}` : null}</h6>
					<h6>{equippedBody.stats.rngStrBonus ? `Range Str: ${equippedBody.stats.rngStrBonus}` : null}</h6>
					<h6>{equippedBody.stats.magBonus ? `Magic Dmg: ${equippedBody.stats.magBonus}` : null}</h6>
					<h6>{equippedBody.stats.prayBonus ? `Pray Bonus: ${equippedBody.stats.prayBonus}` : null}</h6>
				</div>
			}
			<SelectSearchItem 
				options={options} 
				onChange={handleItemChange} 
				itemType='body' 
			/>
		</div>	
	)
}

export default SelectBody2;