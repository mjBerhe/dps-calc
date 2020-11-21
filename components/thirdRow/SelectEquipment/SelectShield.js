import React, { useState, useEffect } from 'react';
import shieldImg from "../../images/Equipment/ShieldSlot.png";
import { Select } from 'react-select-virtualized';
import { customStyles1 } from "./Styles/SelectStyle1";
import useHover from '../../hooks/useHover';
const fetch = require('node-fetch');

export const SelectShield = React.memo(({ handleEquipmentChange, equipmentList, equippedGear }) => {

	// NEED equipmentList for loading shield options (contains names + id's)
	// NEED handleEquipmentChange for equippingGear after a select

	const [select, setSelect] = useState({
		name: 'shield',
		VCWidth: 0,
		VCHeight: 0,
		VCOpacity: 1,
		options: [],
	})

	const [pic, setPic] = useState(shieldImg);

	// for loading options in state (should only be triggered once)
	useEffect(() => {
		const loadOptions = () => {
			const options = [];
			if (equipmentList.shield) {
				equipmentList.shield.forEach((shield) => {
					options.push({
						label: shield.name,
						value: shield.id,
					})
				})

				setSelect((prevSelect) => ({
					...prevSelect,
					options: options,
				}))
			}
		}
		loadOptions();
	}, [equipmentList.shield])

	// for fetching image and equipping item after every select
	useEffect(() => {
		async function fetchImage() {
			const proxyUrl = "https://cors-anywhere.herokuapp.com/";
			const url = "https://raw.githubusercontent.com/osrsbox/osrsbox-db/master/docs/items-icons/";
			let id;
			if (equippedGear.shield) {
				id = equippedGear.shield.id;
				const response = await fetch(`${proxyUrl}${url}${id}.png`);
				setPic(response.url);
			} else {
				setPic(shieldImg);
			}
		}
		fetchImage();
	}, [equippedGear.shield])

	const handleChange = shield => {
		if (shield) {
			handleEquipmentChange('shield', shield.value);
		}
	}

	const handleMenuOpen = () => {
		setSelect(prevSelect => ({
			...prevSelect,
			VCWidth: 180,
			VCHeight: "auto",
			VCOpacity: 1,
		}))
	}

	const handleMenuClose = () => {
		setSelect(prevSelect => ({
			...prevSelect,
			VCWidth: 0,
			VCHeight: 0,
			VCOpacity: 0,
		}))
	}

	const [ref, hovered] = useHover();

	return(
		<div className="shield-slot">
			<img src={pic} alt="selected shield" ref={ref}/>
			{hovered && equippedGear.shield && 
				<div className='shield-hover'>
					<h5>{equippedGear.shield.name}</h5>
					<h6>{equippedGear.shield.stats.attStab ? `Stab Att: ${equippedGear.shield.stats.attStab}` : null}</h6>
					<h6>{equippedGear.shield.stats.attSlash ? `Slash Att: ${equippedGear.shield.stats.attSlash}` : null}</h6>
					<h6>{equippedGear.shield.stats.attCrush ? `Crush Att: ${equippedGear.shield.stats.attCrush}` : null}</h6>
					<h6>{equippedGear.shield.stats.attMagic ? `Magic Att: ${equippedGear.shield.stats.attMagic}` : null}</h6>
					<h6>{equippedGear.shield.stats.attRanged ? `Range Att: ${equippedGear.shield.stats.attRanged}` : null}</h6>
					<h6>{equippedGear.shield.stats.strBonus ? `Melee Str: ${equippedGear.shield.stats.strBonus}` : null}</h6>
					<h6>{equippedGear.shield.stats.rngStrBonus ? `Range Str: ${equippedGear.shield.stats.rngStrBonus}` : null}</h6>
					<h6>{equippedGear.shield.stats.magBonus ? `Magic Dmg: ${equippedGear.shield.stats.magBonus}` : null}</h6>
					<h6>{equippedGear.shield.stats.prayBonus ? `Pray Bonus: ${equippedGear.shield.stats.prayBonus}` : null}</h6>
				</div>
			}
			<Select
				className="shield-select"
				placeholder="Search for Shield"
				isSearchable
				onChange={(selectedOption) => handleChange(selectedOption)}
				onMenuOpen={() => handleMenuOpen()}
				onMenuClose={() => handleMenuClose()}
				options={select.options}
				styles={customStyles1(select)}
			/>
		</div>	
	)
})