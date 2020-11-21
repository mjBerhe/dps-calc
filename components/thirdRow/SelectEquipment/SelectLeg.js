import React, { useState, useEffect } from 'react';
import legImg from "../../images/Equipment/LegSlot.png";
import { Select } from 'react-select-virtualized';
import { customStyles1 } from "./Styles/SelectStyle1";
import useHover from '../../hooks/useHover';
const fetch = require('node-fetch');

export const SelectLeg = React.memo(({ handleEquipmentChange, equipmentList, equippedGear }) => {

	// NEED equipmentList for loading leg options (contains names + id's)
	// NEED handleEquipmentChange for equippingGear after a select

	const [select, setSelect] = useState({
		name: 'leg',
		VCWidth: 0,
		VCHeight: 0,
		VCOpacity: 1,
		options: [],
	})

	const [pic, setPic] = useState(legImg);

	// for loading options in state (should only be triggered once)
	useEffect(() => {
		const loadOptions = () => {
			const options = [];
			if (equipmentList.leg) {
				equipmentList.leg.forEach((leg) => {
					options.push({
						label: leg.name,
						value: leg.id,
					})
				})

				setSelect((prevSelect) => ({
					...prevSelect,
					options: options,
				}))
			}
		}
		loadOptions();
	}, [equipmentList.leg])

	// for fetching image and equipping item after every select
	useEffect(() => {
		async function fetchImage() {
			const proxyUrl = "https://cors-anywhere.herokuapp.com/";
			const url = "https://raw.githubusercontent.com/osrsbox/osrsbox-db/master/docs/items-icons/";
			let id;
			if (equippedGear.leg) {
				id = equippedGear.leg.id;
				const response = await fetch(`${proxyUrl}${url}${id}.png`);
				setPic(response.url)
			} else {
				setPic(legImg);
			}
		}
		fetchImage();
	}, [equippedGear.leg])

	const handleChange = leg => {
		if (leg) {
			handleEquipmentChange('leg', leg.value);
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
		<div className="leg-slot">
			<img src={pic} alt="selected leg" ref={ref}/>
			{hovered && equippedGear.leg && 
				<div className='leg-hover'>
					<h5>{equippedGear.leg.name}</h5>
					<h6>{equippedGear.leg.stats.attStab ? `Stab Att: ${equippedGear.leg.stats.attStab}` : null}</h6>
					<h6>{equippedGear.leg.stats.attSlash ? `Slash Att: ${equippedGear.leg.stats.attSlash}` : null}</h6>
					<h6>{equippedGear.leg.stats.attCrush ? `Crush Att: ${equippedGear.leg.stats.attCrush}` : null}</h6>
					<h6>{equippedGear.leg.stats.attMagic ? `Magic Att: ${equippedGear.leg.stats.attMagic}` : null}</h6>
					<h6>{equippedGear.leg.stats.attRanged ? `Range Att: ${equippedGear.leg.stats.attRanged}` : null}</h6>
					<h6>{equippedGear.leg.stats.strBonus ? `Melee Str: ${equippedGear.leg.stats.strBonus}` : null}</h6>
					<h6>{equippedGear.leg.stats.rngStrBonus ? `Range Str: ${equippedGear.leg.stats.rngStrBonus}` : null}</h6>
					<h6>{equippedGear.leg.stats.magBonus ? `Magic Dmg: ${equippedGear.leg.stats.magBonus}` : null}</h6>
					<h6>{equippedGear.leg.stats.prayBonus ? `Pray Bonus: ${equippedGear.leg.stats.prayBonus}` : null}</h6>
				</div>
			}
			<Select
				className="leg-select"
				placeholder="Search for Legs"
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