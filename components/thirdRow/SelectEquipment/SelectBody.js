import React, { useState, useEffect } from 'react';
import bodyImg from "../../images/Equipment/BodySlot.png";
import { Select } from 'react-select-virtualized';
import { customStyles1 } from "./Styles/SelectStyle1";
import useHover from '../../hooks/useHover';
const fetch = require('node-fetch');

export const SelectBody = React.memo(({ handleEquipmentChange, equipmentList, equippedGear }) => {

	// NEED equipmentList for loading body options (contains names + id's)
	// NEED handleEquipmentChange for equippingGear after a select

	const [select, setSelect] = useState({
		name: 'body',
		VCWidth: 0,
		VCHeight: 0,
		VCOpacity: 1,
		options: [],
	})

	const [pic, setPic] = useState(bodyImg);

	// for loading options in state (should only be triggered once)
	useEffect(() => {
		const loadOptions = () => {
			const options = [];
			if (equipmentList.body) {
				equipmentList.body.forEach((body) => {
					options.push({
						label: body.name,
						value: body.id,
					})
				})

				setSelect((prevSelect) => ({
					...prevSelect,
					options: options,
				}))
			}
		}
		loadOptions();
	}, [equipmentList.body])

	// for fetching image and equipping item after every select
	useEffect(() => {
		async function fetchImage() {
			const proxyUrl = "https://cors-anywhere.herokuapp.com/";
			const url = "https://raw.githubusercontent.com/osrsbox/osrsbox-db/master/docs/items-icons/";
			let id;
			if (equippedGear.body) {
				id = equippedGear.body.id;
				const response = await fetch(`${proxyUrl}${url}${id}.png`);
				setPic(response.url)
			} else {
				setPic(bodyImg);
			}
		}
		fetchImage();
	}, [equippedGear.body])

	const handleChange = body => {
		if (body) {
			handleEquipmentChange('body', body.value);
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
		<div className="body-slot">
			<img src={pic} alt="selected body" ref={ref}/>
			{hovered && equippedGear.body && 
				<div className='body-hover'>
					<h5>{equippedGear.body.name}</h5>
					<h6>{equippedGear.body.stats.attStab ? `Stab Att: ${equippedGear.body.stats.attStab}` : null}</h6>
					<h6>{equippedGear.body.stats.attSlash ? `Slash Att: ${equippedGear.body.stats.attSlash}` : null}</h6>
					<h6>{equippedGear.body.stats.attCrush ? `Crush Att: ${equippedGear.body.stats.attCrush}` : null}</h6>
					<h6>{equippedGear.body.stats.attMagic ? `Magic Att: ${equippedGear.body.stats.attMagic}` : null}</h6>
					<h6>{equippedGear.body.stats.attRanged ? `Range Att: ${equippedGear.body.stats.attRanged}` : null}</h6>
					<h6>{equippedGear.body.stats.strBonus ? `Melee Str: ${equippedGear.body.stats.strBonus}` : null}</h6>
					<h6>{equippedGear.body.stats.rngStrBonus ? `Range Str: ${equippedGear.body.stats.rngStrBonus}` : null}</h6>
					<h6>{equippedGear.body.stats.magBonus ? `Magic Dmg: ${equippedGear.body.stats.magBonus}` : null}</h6>
					<h6>{equippedGear.body.stats.prayBonus ? `Pray Bonus: ${equippedGear.body.stats.prayBonus}` : null}</h6>
				</div>
			}
			<Select
				className="body-select"
				placeholder="Search for Body"
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