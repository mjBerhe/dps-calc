import React, { useState, useEffect } from 'react';
import gloveImg from "../../images/Equipment/GloveSlot.png";
import { Select } from 'react-select-virtualized';
import { customStyles1 } from "./Styles/SelectStyle1";
import useHover from '../../hooks/useHover';
const fetch = require('node-fetch');

export const SelectGlove = React.memo(({ handleEquipmentChange, equipmentList, equippedGear }) => {

	// NEED equipmentList for loading glove options (contains names + id's)
	// NEED handleEquipmentChange for equippingGear after a select

	const [select, setSelect] = useState({
		name: 'glove',
		VCWidth: 0,
		VCHeight: 0,
		VCOpacity: 1,
		options: [],
	})

	const [pic, setPic] = useState(gloveImg);

	// for loading options in state (should only be triggered once)
	useEffect(() => {
		const loadOptions = () => {
			const options = [];
			if (equipmentList.glove) {
				equipmentList.glove.forEach((glove) => {
					options.push({
						label: glove.name,
						value: glove.id,
					})
				})

				setSelect((prevSelect) => ({
					...prevSelect,
					options: options,
				}))
			}
		}
		loadOptions();
	}, [equipmentList.glove])

	// for fetching image and equipping item after every select
	useEffect(() => {
		async function fetchImage() {
			const proxyUrl = "https://cors-anywhere.herokuapp.com/";
			const url = "https://raw.githubusercontent.com/osrsbox/osrsbox-db/master/docs/items-icons/";
			let id;
			if (equippedGear.glove) {
				id = equippedGear.glove.id;
				const response = await fetch(`${proxyUrl}${url}${id}.png`);
				setPic(response.url);
			} else {
				setPic(gloveImg);
			}
		}
		fetchImage();
	}, [equippedGear.glove])

	const handleChange = glove => {
		if (glove) {
			handleEquipmentChange('glove', glove.value);
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
		<div className="glove-slot">
			<img src={pic} alt="selected glove" ref={ref}/>
			{hovered && equippedGear.glove && 
				<div className='glove-hover'>
					<h5>{equippedGear.glove.name}</h5>
					<h6>{equippedGear.glove.stats.attStab ? `Stab Att: ${equippedGear.glove.stats.attStab}` : null}</h6>
					<h6>{equippedGear.glove.stats.attSlash ? `Slash Att: ${equippedGear.glove.stats.attSlash}` : null}</h6>
					<h6>{equippedGear.glove.stats.attCrush ? `Crush Att: ${equippedGear.glove.stats.attCrush}` : null}</h6>
					<h6>{equippedGear.glove.stats.attMagic ? `Magic Att: ${equippedGear.glove.stats.attMagic}` : null}</h6>
					<h6>{equippedGear.glove.stats.attRanged ? `Range Att: ${equippedGear.glove.stats.attRanged}` : null}</h6>
					<h6>{equippedGear.glove.stats.strBonus ? `Melee Str: ${equippedGear.glove.stats.strBonus}` : null}</h6>
					<h6>{equippedGear.glove.stats.rngStrBonus ? `Range Str: ${equippedGear.glove.stats.rngStrBonus}` : null}</h6>
					<h6>{equippedGear.glove.stats.magBonus ? `Magic Dmg: ${equippedGear.glove.stats.magBonus}` : null}</h6>
					<h6>{equippedGear.glove.stats.prayBonus ? `Pray Bonus: ${equippedGear.glove.stats.prayBonus}` : null}</h6>
				</div>
			}
			<Select
				className="glove-select"
				placeholder="Search for Gloves"
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