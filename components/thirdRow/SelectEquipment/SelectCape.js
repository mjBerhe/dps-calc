import React, { useState, useEffect } from 'react';
import capeImg from "../../images/Equipment/CapeSlot.png";
import { Select } from 'react-select-virtualized';
import { customStyles1 } from "./Styles/SelectStyle1";
import useHover from '../../hooks/useHover';
const fetch = require('node-fetch');

export const SelectCape = React.memo(({ handleEquipmentChange, equipmentList, equippedGear }) => {

	// NEED equipmentList for loading cape options (contains names + id's)
	// NEED handleEquipmentChange for equippingGear after a select

	const [select, setSelect] = useState({
		name: 'cape',
		VCWidth: 0,
		VCHeight: 0,
		VCOpacity: 1,
		options: [],
	})

	const [pic, setPic] = useState(capeImg);

	// for loading options in state (should only be triggered once)
	useEffect(() => {
		const loadOptions = () => {
			const options = [];
			if (equipmentList.cape) {
				equipmentList.cape.forEach((cape) => {
					options.push({
						label: cape.name,
						value: cape.id,
					})
				})

				setSelect((prevSelect) => ({
					...prevSelect,
					options: options,
				}))
			}
		}
		loadOptions();
	}, [equipmentList.cape])

	// for fetching image and equipping item after every select
	useEffect(() => {
		async function fetchImage() {
			const proxyUrl = "https://cors-anywhere.herokuapp.com/";
			const url = "https://raw.githubusercontent.com/osrsbox/osrsbox-db/master/docs/items-icons/";
			let id;
			if (equippedGear.cape) {
				id = equippedGear.cape.id;
				const response = await fetch(`${proxyUrl}${url}${id}.png`);
				setPic(response.url);
			} else {
				setPic(capeImg);
			}
		}
		fetchImage();
	}, [equippedGear.cape])

	const handleChange = cape => {
		if (cape) {
			handleEquipmentChange('cape', cape.value);
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
		<div className="cape-slot">
			<img src={pic} alt="selected cape" ref={ref}/>
			{hovered && equippedGear.cape && 
				<div className='cape-hover'>
					<h5>{equippedGear.cape.name}</h5>
					<h6>{equippedGear.cape.stats.attStab ? `Stab Att: ${equippedGear.cape.stats.attStab}` : null}</h6>
					<h6>{equippedGear.cape.stats.attSlash ? `Slash Att: ${equippedGear.cape.stats.attSlash}` : null}</h6>
					<h6>{equippedGear.cape.stats.attCrush ? `Crush Att: ${equippedGear.cape.stats.attCrush}` : null}</h6>
					<h6>{equippedGear.cape.stats.attMagic ? `Magic Att: ${equippedGear.cape.stats.attMagic}` : null}</h6>
					<h6>{equippedGear.cape.stats.attRanged ? `Range Att: ${equippedGear.cape.stats.attRanged}` : null}</h6>
					<h6>{equippedGear.cape.stats.strBonus ? `Melee Str: ${equippedGear.cape.stats.strBonus}` : null}</h6>
					<h6>{equippedGear.cape.stats.rngStrBonus ? `Range Str: ${equippedGear.cape.stats.rngStrBonus}` : null}</h6>
					<h6>{equippedGear.cape.stats.magBonus ? `Magic Dmg: ${equippedGear.cape.stats.magBonus}` : null}</h6>
					<h6>{equippedGear.cape.stats.prayBonus ? `Pray Bonus: ${equippedGear.cape.stats.prayBonus}` : null}</h6>
				</div>
			}
			<Select
				className="cape-select"
				placeholder="Search for Cape"
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