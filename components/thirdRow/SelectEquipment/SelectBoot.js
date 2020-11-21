import React, { useState, useEffect } from 'react';
import bootImg from "../../images/Equipment/BootSlot.png";
import { Select } from 'react-select-virtualized';
import { customStyles1 } from "./Styles/SelectStyle1";
import useHover from '../../hooks/useHover';
const fetch = require('node-fetch');

export const SelectBoot = React.memo(({ handleEquipmentChange, equipmentList, equippedGear }) => {

	// NEED equipmentList for loading boot options (contains names + id's)
	// NEED handleEquipmentChange for equippingGear after a select

	const [select, setSelect] = useState({
		name: 'boot',
		VCWidth: 0,
		VCHeight: 0,
		VCOpacity: 1,
		options: [],
	})

	const [pic, setPic] = useState(bootImg);

	// for loading options in state (should only be triggered once)
	useEffect(() => {
		const loadOptions = () => {
			const options = [];
			if (equipmentList.boot) {
				equipmentList.boot.forEach((boot) => {
					options.push({
						label: boot.name,
						value: boot.id,
					})
				})

				setSelect((prevSelect) => ({
					...prevSelect,
					options: options,
				}))
			}
		}
		loadOptions();
	}, [equipmentList.boot])

	// for fetching image and equipping item after every select
	useEffect(() => {
		async function fetchImage() {
			const proxyUrl = "https://cors-anywhere.herokuapp.com/";
			const url = "https://raw.githubusercontent.com/osrsbox/osrsbox-db/master/docs/items-icons/";
			let id;
			if (equippedGear.boot) {
				id = equippedGear.boot.id;
				const response = await fetch(`${proxyUrl}${url}${id}.png`);
				setPic(response.url);
			} else {
				setPic(bootImg);
			}
		}
		fetchImage();
	}, [equippedGear.boot])

	const handleChange = boot => {
		if (boot) {
			handleEquipmentChange('boot', boot.value);
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
		<div className="boot-slot">
			<img src={pic} alt="selected boot" ref={ref}/>
			{hovered && equippedGear.boot && 
				<div className='boot-hover'>
					<h5>{equippedGear.boot.name}</h5>
					<h6>{equippedGear.boot.stats.attStab ? `Stab Att: ${equippedGear.boot.stats.attStab}` : null}</h6>
					<h6>{equippedGear.boot.stats.attSlash ? `Slash Att: ${equippedGear.boot.stats.attSlash}` : null}</h6>
					<h6>{equippedGear.boot.stats.attCrush ? `Crush Att: ${equippedGear.boot.stats.attCrush}` : null}</h6>
					<h6>{equippedGear.boot.stats.attMagic ? `Magic Att: ${equippedGear.boot.stats.attMagic}` : null}</h6>
					<h6>{equippedGear.boot.stats.attRanged ? `Range Att: ${equippedGear.boot.stats.attRanged}` : null}</h6>
					<h6>{equippedGear.boot.stats.strBonus ? `Melee Str: ${equippedGear.boot.stats.strBonus}` : null}</h6>
					<h6>{equippedGear.boot.stats.rngStrBonus ? `Range Str: ${equippedGear.boot.stats.rngStrBonus}` : null}</h6>
					<h6>{equippedGear.boot.stats.magBonus ? `Magic Dmg: ${equippedGear.boot.stats.magBonus}` : null}</h6>
					<h6>{equippedGear.boot.stats.prayBonus ? `Pray Bonus: ${equippedGear.boot.stats.prayBonus}` : null}</h6>
				</div>
			}
			<Select
				className="boot-select"
				placeholder="Search for Boots"
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