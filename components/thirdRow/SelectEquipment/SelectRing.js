import React, { useState, useEffect } from 'react';
import ringImg from "../../images/Equipment/RingSlot.png";
import { Select } from 'react-select-virtualized';
import { customStyles1 } from "./Styles/SelectStyle1";
import useHover from '../../hooks/useHover';
const fetch = require('node-fetch');

export const SelectRing = React.memo(({ handleEquipmentChange, equipmentList, equippedGear }) => {

	// NEED equipmentList for loading ring options (contains names + id's)
	// NEED handleEquipmentChange for equippingGear after a select

	const [select, setSelect] = useState({
		name: 'ring',
		VCWidth: 0,
		VCHeight: 0,
		VCOpacity: 1,
		options: [],
	})

	const [pic, setPic] = useState(ringImg);

	// for loading options in state (should only be triggered once)
	useEffect(() => {
		const loadOptions = () => {
			const options = [];
			if (equipmentList.ring) {
				equipmentList.ring.forEach((ring) => {
					options.push({
						label: ring.name,
						value: ring.id,
					})
				})

				setSelect((prevSelect) => ({
					...prevSelect,
					options: options,
				}))
			}
		}
		loadOptions();
	}, [equipmentList.ring])

	// for fetching image and equipping item after every select
	useEffect(() => {
		async function fetchImage() {
			const proxyUrl = "https://cors-anywhere.herokuapp.com/";
			const url = "https://raw.githubusercontent.com/osrsbox/osrsbox-db/master/docs/items-icons/";
			let id;
			if (equippedGear.ring) {
				id = equippedGear.ring.id;
				const response = await fetch(`${proxyUrl}${url}${id}.png`);
				setPic(response.url);
			} else {
				setPic(ringImg);
			}
		}
		fetchImage();
	}, [equippedGear.ring])

	const handleChange = ring => {
		if (ring) {
			handleEquipmentChange('ring', ring.value);
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
		<div className="ring-slot">
			<img src={pic} alt="selected ring" ref={ref}/>
			{hovered && equippedGear.ring && 
				<div className='ring-hover'>
					<h5>{equippedGear.ring.name}</h5>
					<h6>{equippedGear.ring.stats.attStab ? `Stab Att: ${equippedGear.ring.stats.attStab}` : null}</h6>
					<h6>{equippedGear.ring.stats.attSlash ? `Slash Att: ${equippedGear.ring.stats.attSlash}` : null}</h6>
					<h6>{equippedGear.ring.stats.attCrush ? `Crush Att: ${equippedGear.ring.stats.attCrush}` : null}</h6>
					<h6>{equippedGear.ring.stats.attMagic ? `Magic Att: ${equippedGear.ring.stats.attMagic}` : null}</h6>
					<h6>{equippedGear.ring.stats.attRanged ? `Range Att: ${equippedGear.ring.stats.attRanged}` : null}</h6>
					<h6>{equippedGear.ring.stats.strBonus ? `Melee Str: ${equippedGear.ring.stats.strBonus}` : null}</h6>
					<h6>{equippedGear.ring.stats.rngStrBonus ? `Range Str: ${equippedGear.ring.stats.rngStrBonus}` : null}</h6>
					<h6>{equippedGear.ring.stats.magBonus ? `Magic Dmg: ${equippedGear.ring.stats.magBonus}` : null}</h6>
					<h6>{equippedGear.ring.stats.prayBonus ? `Pray Bonus: ${equippedGear.ring.stats.prayBonus}` : null}</h6>
				</div>
			}
			<Select
				className="ring-select"
				placeholder="Search for Ring"
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