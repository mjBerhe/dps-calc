import React, { useState, useEffect } from 'react';
import neckImg from "../../images/Equipment/NeckSlot.png";
import { Select } from 'react-select-virtualized';
import { customStyles1 } from "./Styles/SelectStyle1";
import useHover from '../../hooks/useHover';
const fetch = require('node-fetch');

export const SelectNeck = React.memo(({ handleEquipmentChange, equipmentList, equippedGear }) => {

	// NEED equipmentList for loading neck options (contains names + id's)
	// NEED handleEquipmentChange for equippingGear after a select

	const [select, setSelect] = useState({
		name: 'neck',
		VCWidth: 0,
		VCHeight: 0,
		VCOpacity: 1,
		options: [],
	})

	const [pic, setPic] = useState(neckImg);

	// for loading options in state (should only be triggered once)
	useEffect(() => {
		const loadOptions = () => {
			const options = [];
			if (equipmentList.neck) {
				equipmentList.neck.forEach((neck) => {
					options.push({
						label: neck.name,
						value: neck.id,
					})
				})

				setSelect((prevSelect) => ({
					...prevSelect,
					options: options,
				}))
			}
		}
		loadOptions();
	}, [equipmentList.neck])

	// for fetching image and equipping item after every select
	useEffect(() => {
		async function fetchImage() {
			const proxyUrl = "https://cors-anywhere.herokuapp.com/";
			const url = "https://raw.githubusercontent.com/osrsbox/osrsbox-db/master/docs/items-icons/";
			let id;
			if (equippedGear.neck) {
				id = equippedGear.neck.id;
				const response = await fetch(`${proxyUrl}${url}${id}.png`);
				setPic(response.url);
			} else {
				setPic(neckImg);
			}
		}
		fetchImage();
	}, [equippedGear.neck])

	const handleChange = neck => {
		if (neck) {
			handleEquipmentChange('neck', neck.value);
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
		<div className="neck-slot">
			<img src={pic} alt="selected neck" ref={ref}/>
			{hovered && equippedGear.neck && 
				<div className='neck-hover'>
					<h5>{equippedGear.neck.name}</h5>
					<h6>{equippedGear.neck.stats.attStab ? `Stab Att: ${equippedGear.neck.stats.attStab}` : null}</h6>
					<h6>{equippedGear.neck.stats.attSlash ? `Slash Att: ${equippedGear.neck.stats.attSlash}` : null}</h6>
					<h6>{equippedGear.neck.stats.attCrush ? `Crush Att: ${equippedGear.neck.stats.attCrush}` : null}</h6>
					<h6>{equippedGear.neck.stats.attMagic ? `Magic Att: ${equippedGear.neck.stats.attMagic}` : null}</h6>
					<h6>{equippedGear.neck.stats.attRanged ? `Range Att: ${equippedGear.neck.stats.attRanged}` : null}</h6>
					<h6>{equippedGear.neck.stats.strBonus ? `Melee Str: ${equippedGear.neck.stats.strBonus}` : null}</h6>
					<h6>{equippedGear.neck.stats.rngStrBonus ? `Range Str: ${equippedGear.neck.stats.rngStrBonus}` : null}</h6>
					<h6>{equippedGear.neck.stats.magBonus ? `Magic Dmg: ${equippedGear.neck.stats.magBonus}` : null}</h6>
					<h6>{equippedGear.neck.stats.prayBonus ? `Pray Bonus: ${equippedGear.neck.stats.prayBonus}` : null}</h6>
				</div>
			}
			<Select
				className="neck-select"
				placeholder="Search for Neck"
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