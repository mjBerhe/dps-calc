import { useState, useEffect } from 'react';
import SelectSearchItem from '../../templates/SelectSearchItem';
import { useLists } from '../../../state/lists.js';
import { useEquippedGear } from '../../../state/equippedGear.js';
import useHover from '../../../hooks/useHover';
const fetch = require('node-fetch');

const SelectLeg = () => {

	const { findEquipment } = useLists();
	const legList = useLists(state => state.leg);

	const { equipItem } = useEquippedGear();
	const equippedLeg = useEquippedGear(state => state.leg);

	const defaultLegPic = '/Equipment/LegSlot.png';
	const [legPic, setLegPic] = useState(defaultLegPic);
	const [options, setOptions] = useState([]);

	// for loading options in state (should only be triggered once)
	useEffect(() => {
		const tempOptions = [];
		if (legList) {
			legList.forEach(leg => {
				tempOptions.push({
					name: leg.name,
					value: leg.id,
				});
			});
			setOptions(tempOptions);
		}
	}, [legList])

	const handleItemChange = (item, equipType) => { // need to catch errors if it doesnt fetch
		if (item.value) { // item.value is the ID
			const foundItem = findEquipment(equipType, item.value);
			equipItem(equipType, foundItem);
		} else { // equip no leg
			setLegPic(defaultLegPic);
		}
	}

	useEffect(async () => {
		const proxyUrl = "https://cors-anywhere.herokuapp.com/";
		const url = "https://raw.githubusercontent.com/osrsbox/osrsbox-db/master/docs/items-icons/";
		if (equippedLeg) {
			const response = await fetch(`${url}${equippedLeg.id}.png`);
			setLegPic(response.url);
		} else setLegPic(defaultLegPic);
	}, [equippedLeg]);

	const [ref, hovered] = useHover();

	return(
		<div className="leg-slot">
			<div className='item-image' ref={ref}>
				{legPic !== defaultLegPic &&
					<img src={legPic} alt="leg pic"/>
				}
			</div>
			<div className='default-image'>
				{legPic === defaultLegPic &&
					<img src={legPic} alt="default leg pic"/>
				}
			</div>
			{hovered && equippedLeg && 
				<div className='equipment-item-hover'>
					<h5>{equippedLeg.name}</h5>
					<h6>{equippedLeg.stats.attStab ? `Stab Att: ${equippedLeg.stats.attStab}` : null}</h6>
					<h6>{equippedLeg.stats.attSlash ? `Slash Att: ${equippedLeg.stats.attSlash}` : null}</h6>
					<h6>{equippedLeg.stats.attCrush ? `Crush Att: ${equippedLeg.stats.attCrush}` : null}</h6>
					<h6>{equippedLeg.stats.attMagic ? `Magic Att: ${equippedLeg.stats.attMagic}` : null}</h6>
					<h6>{equippedLeg.stats.attRanged ? `Range Att: ${equippedLeg.stats.attRanged}` : null}</h6>
					<h6>{equippedLeg.stats.strBonus ? `Melee Str: ${equippedLeg.stats.strBonus}` : null}</h6>
					<h6>{equippedLeg.stats.rngStrBonus ? `Range Str: ${equippedLeg.stats.rngStrBonus}` : null}</h6>
					<h6>{equippedLeg.stats.magBonus ? `Magic Dmg: ${equippedLeg.stats.magBonus}` : null}</h6>
					<h6>{equippedLeg.stats.prayBonus ? `Pray Bonus: ${equippedLeg.stats.prayBonus}` : null}</h6>
				</div>
			}
			<SelectSearchItem 
				options={options} 
				onChange={handleItemChange} 
				itemType='leg' 
			/>
		</div>	
	)
}

export default SelectLeg;