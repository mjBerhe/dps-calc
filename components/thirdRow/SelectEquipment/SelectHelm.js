import React, { useState, useEffect } from 'react';
import helmImg from "../../images/Equipment/HelmSlot.png";
import { Select } from 'react-select-virtualized';
import { customStyles1 } from "./Styles/SelectStyle1";
import useHover from '../../../hooks/useHover';
const fetch = require('node-fetch');

export const SelectHelm = React.memo(({ handleEquipmentChange, equipmentList, equippedGear }) => {

	// NEED equipmentList for loading helm options (contains names + id's)
	// NEED handleEquipmentChange for equippingGear after a select

	const [select, setSelect] = useState({
		name: 'helm',
		VCWidth: 0,
		VCHeight: 0,
		VCOpacity: 1,
		options: [],
	})

	const [pic, setPic] = useState(helmImg);

	// for loading options in state (should only be triggered once)
	useEffect(() => {
		const loadOptions = () => {
			const options = [];
			if (equipmentList.helm) {
				equipmentList.helm.forEach((helm) => {
					options.push({
						label: helm.name,
						value: helm.id,
					})
				})

				setSelect((prevSelect) => ({
					...prevSelect,
					options: options,
				}))
			}
		}
		loadOptions();
	}, [equipmentList.helm])

	// for fetching image and equipping item after every select
	useEffect(() => {
		async function fetchImage() {
			const proxyUrl = "https://cors-anywhere.herokuapp.com/";
			const url = "https://raw.githubusercontent.com/osrsbox/osrsbox-db/master/docs/items-icons/";
			let id;
			if (equippedGear.helm) {
				id = equippedGear.helm.id;
				const response = await fetch(`${proxyUrl}${url}${id}.png`);
				setPic(response.url);
			} else {
				setPic(helmImg);
			}
		}
		fetchImage();
	}, [equippedGear.helm])

	const handleChange = helm => {
		if (helm) {
			handleEquipmentChange('helm', helm.value);
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
		<div className="helm-slot">
			<img src={pic} alt="selected helm" ref={ref}/>
			{hovered && equippedGear.helm && 
				<div className='helm-hover'>
					<h5>{equippedGear.helm.name}</h5>
					<h6>{equippedGear.helm.stats.attStab ? `Stab Att: ${equippedGear.helm.stats.attStab}` : null}</h6>
					<h6>{equippedGear.helm.stats.attSlash ? `Slash Att: ${equippedGear.helm.stats.attSlash}` : null}</h6>
					<h6>{equippedGear.helm.stats.attCrush ? `Crush Att: ${equippedGear.helm.stats.attCrush}` : null}</h6>
					<h6>{equippedGear.helm.stats.attMagic ? `Magic Att: ${equippedGear.helm.stats.attMagic}` : null}</h6>
					<h6>{equippedGear.helm.stats.attRanged ? `Range Att: ${equippedGear.helm.stats.attRanged}` : null}</h6>
					<h6>{equippedGear.helm.stats.strBonus ? `Melee Str: ${equippedGear.helm.stats.strBonus}` : null}</h6>
					<h6>{equippedGear.helm.stats.rngStrBonus ? `Range Str: ${equippedGear.helm.stats.rngStrBonus}` : null}</h6>
					<h6>{equippedGear.helm.stats.magBonus ? `Magic Dmg: ${equippedGear.helm.stats.magBonus}` : null}</h6>
					<h6>{equippedGear.helm.stats.prayBonus ? `Pray Bonus: ${equippedGear.helm.stats.prayBonus}` : null}</h6>
				</div>
			}
			<Select
				className="helm-select"
				placeholder="Search for Helm"
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