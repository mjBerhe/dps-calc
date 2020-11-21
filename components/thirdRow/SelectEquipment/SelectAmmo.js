import { useState, useEffect } from 'react';
import ammoImg from "../../images/Equipment/AmmoSlot.png";
import { Select } from 'react-select-virtualized';
import { customStyles1 } from "./Styles/SelectStyle1";
import useHover from '../hooks/useHover';
const fetch = require('node-fetch');

export const SelectAmmo = React.memo(({ handleEquipmentChange, equipmentList, equippedGear }) => {

	// NEED equipmentList for loading ammo options (contains names + id's)
	// NEED handleEquipmentChange for equippingGear after a select

	const [select, setSelect] = useState({
		name: 'ammo',
		VCWidth: 0,
		VCHeight: 0,
		VCOpacity: 1,
		options: [],
	})

	const [pic, setPic] = useState(ammoImg);

	// for loading options in state (should only be triggered once)
	useEffect(() => {
		const loadOptions = () => {
			const options = [];
			if (equipmentList.ammo) {
				equipmentList.ammo.forEach((ammo) => {
					options.push({
						label: ammo.name,
						value: ammo.id,
					})
				})

				setSelect((prevSelect) => ({
					...prevSelect,
					options: options,
				}))
			}
		}
		loadOptions();
	}, [equipmentList.ammo])

	// for fetching image and equipping item after every select
	useEffect(() => {
		async function fetchImage() {
			const proxyUrl = "https://cors-anywhere.herokuapp.com/";
			const url = "https://raw.githubusercontent.com/osrsbox/osrsbox-db/master/docs/items-icons/";
			let id;
			if (equippedGear.ammo) {
				id = equippedGear.ammo.id;
				const response = await fetch(`${proxyUrl}${url}${id}.png`);
				setPic(response.url)
			} else {
				setPic(ammoImg)
			}
		}
		fetchImage();
	}, [equippedGear.ammo])

	const handleChange = ammo => {
		if (ammo) {
			handleEquipmentChange('ammo', ammo.value);
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
		<div className="ammo-slot">
			<img src={pic} alt="selected ammo" ref={ref}/>
			{hovered && equippedGear.ammo && 
				<div className='ammo-hover'>
					<h5>{equippedGear.ammo.name}</h5>
					<h6>{equippedGear.ammo.stats.attStab ? `Stab Att: ${equippedGear.ammo.stats.attStab}` : null}</h6>
					<h6>{equippedGear.ammo.stats.attSlash ? `Slash Att: ${equippedGear.ammo.stats.attSlash}` : null}</h6>
					<h6>{equippedGear.ammo.stats.attCrush ? `Crush Att: ${equippedGear.ammo.stats.attCrush}` : null}</h6>
					<h6>{equippedGear.ammo.stats.attMagic ? `Magic Att: ${equippedGear.ammo.stats.attMagic}` : null}</h6>
					<h6>{equippedGear.ammo.stats.attRanged ? `Range Att: ${equippedGear.ammo.stats.attRanged}` : null}</h6>
					<h6>{equippedGear.ammo.stats.strBonus ? `Melee Str: ${equippedGear.ammo.stats.strBonus}` : null}</h6>
					<h6>{equippedGear.ammo.stats.rngStrBonus ? `Range Str: ${equippedGear.ammo.stats.rngStrBonus}` : null}</h6>
					<h6>{equippedGear.ammo.stats.magBonus ? `Magic Dmg: ${equippedGear.ammo.stats.magBonus}` : null}</h6>
					<h6>{equippedGear.ammo.stats.prayBonus ? `Pray Bonus: ${equippedGear.ammo.stats.prayBonus}` : null}</h6>
				</div>
			}
			<Select
				className="ammo-select"
				placeholder="Search for Ammo"
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