import React, { useState, useEffect } from 'react';
import { Select } from 'react-select-virtualized';
import { customStyles1 } from "./Styles/SelectStyle1";
import useHover from "../../hooks/useHover";

import defaultSpell from '../../images/Equipment/SpellSlot.PNG';
import WindStrike from '../../images/SpellsFinal/WindStrike.png';
import WaterStrike from '../../images/SpellsFinal/WaterStrike.png';
import EarthStrike from '../../images/SpellsFinal/EarthStrike.png'
import FireStrike from '../../images/SpellsFinal/FireStrike.png'
import WindBolt from '../../images/SpellsFinal/WindBolt.png'
import WaterBolt from '../../images/SpellsFinal/WaterBolt.png'
import EarthBolt from '../../images/SpellsFinal/EarthBolt.png'
import FireBolt from '../../images/SpellsFinal/FireBolt.png'
import WindBlast from '../../images/SpellsFinal/WindBlast.png'
import WaterBlast from '../../images/SpellsFinal/WaterBlast.png'
import EarthBlast from '../../images/SpellsFinal/EarthBlast.png'
import FireBlast from '../../images/SpellsFinal/FireBlast.png'
import WindWave from '../../images/SpellsFinal/WindWave.png'
import WaterWave from '../../images/SpellsFinal/WaterWave.png'
import EarthWave from '../../images/SpellsFinal/EarthWave.png'
import FireWave from '../../images/SpellsFinal/FireWave.png'
import WindSurge from '../../images/SpellsFinal/WindSurge.png';
import WaterSurge from '../../images/SpellsFinal/WaterSurge.png'
import EarthSurge from '../../images/SpellsFinal/EarthSurge.png'
import FireSurge from '../../images/SpellsFinal/FireSurge.png'
import CrumbleUndead from '../../images/SpellsFinal/CrumbleUndead.png';
import IbanBlast from '../../images/SpellsFinal/IbanBlast.png';
import MagicDart from '../../images/SpellsFinal/MagicDart.png';
import SaradominStrike from '../../images/SpellsFinal/SaradominStrike.png';
import ClawsOfGuthix from '../../images/SpellsFinal/ClawsOfGuthix.png';
import FlamesOfZamorak from '../../images/SpellsFinal/FlamesOfZamorak.png';
import SmokeRush from '../../images/SpellsFinal/SmokeRush.png';
import ShadowRush from '../../images/SpellsFinal/ShadowRush.png';
import BloodRush from '../../images/SpellsFinal/BloodRush.png';
import IceRush from '../../images/SpellsFinal/IceRush.png';
import SmokeBurst from '../../images/SpellsFinal/SmokeBurst.png';
import ShadowBurst from '../../images/SpellsFinal/ShadowBurst.png';
import BloodBurst from '../../images/SpellsFinal/BloodBurst.png';
import IceBurst from '../../images/SpellsFinal/IceBurst.png';
import SmokeBlitz from '../../images/SpellsFinal/SmokeBlitz.png';
import ShadowBlitz from '../../images/SpellsFinal/ShadowBlitz.png';
import BloodBlitz from '../../images/SpellsFinal/BloodBlitz.png';
import IceBlitz from '../../images/SpellsFinal/IceBlitz.png';
import SmokeBarrage from '../../images/SpellsFinal/SmokeBarrage.png';
import ShadowBarrage from '../../images/SpellsFinal/ShadowBarrage.png';
import BloodBarrage from '../../images/SpellsFinal/BloodBarrage.png';
import IceBarrage from '../../images/SpellsFinal/IceBarrage.png';

export const SelectSpell = React.memo(({ userStats, setUserStats }) => {

	const [select, setSelect] = useState({
		name: 'spell',
		VCWidth: 0,
		VCHeight: 0,
		VCOpacity: 1,
		options: [],
	})

	const [currentSpell, setCurrentSpell] = useState({
		name: null,
		value: null,
		maxHit: null,
		imgNumber: null,
	})

	const [pic, setPic] = useState(defaultSpell);

	const spellImages = [defaultSpell, 
		WindStrike, WaterStrike, EarthStrike, FireStrike,
		WindBolt, WaterBolt, EarthBolt, FireBolt,
		WindBlast, WaterBlast, EarthBlast, FireBlast,
		WindWave, WaterWave, EarthWave, FireWave,
		WindSurge, WaterSurge, EarthSurge, FireSurge,
		CrumbleUndead, IbanBlast, MagicDart,
		SaradominStrike, ClawsOfGuthix, FlamesOfZamorak,
		SmokeRush, ShadowRush, BloodRush, IceRush,
		SmokeBurst, ShadowBurst, BloodBurst, IceBurst,
		SmokeBlitz, ShadowBlitz, BloodBlitz, IceBlitz,
		SmokeBarrage, ShadowBarrage, BloodBarrage, IceBarrage];

	useEffect(() => {
		const options = [
			{
				label: 'None',
				value: 0,
				maxHit: null,
				imgNumber: 0,
				spellbook: null,
			},
			{
				label: 'Wind Strike',
				value: 1,
				maxHit: 2,
				imgNumber: 1,
				spellbook: 'standard',
				element: 'wind',
			},
			{
				label: 'Water Strike',
				value: 2,
				maxHit: 4,
				imgNumber: 2,
				spellbook: 'standard',
				element: 'water',
			},
			{
				label: 'Earth Strike',
				value: 3,
				maxHit: 6,
				imgNumber: 3,
				spellbook: 'standard',
				element: 'earth',
			},
			{
				label: 'Fire Strike',
				value: 4,
				maxHit: 8,
				imgNumber: 4,
				spellbook: 'standard',
				element: 'fire',
			},
			{
				label: 'Wind Bolt',
				value: 5,
				maxHit: 9,
				imgNumber: 5,
				spellbook: 'standard',
				element: 'wind',
				grade: 'bolt',
			},
			{
				label: 'Water Bolt',
				value: 6,
				maxHit: 10,
				imgNumber: 6,
				spellbook: 'standard',
				//element: 'water',
				grade: 'bolt',
			},
			{
				label: 'Earth Bolt',
				value: 7,
				maxHit: 11,
				imgNumber: 7,
				spellbook: 'standard',
				element: 'earth',
				grade: 'bolt',
			},
			{
				label: 'Fire Bolt',
				value: 8,
				maxHit: 12,
				imgNumber: 8,
				spellbook: 'standard',
				element: 'fire',
				grade: 'bolt',
			},
			{
				label: 'Wind Blast',
				value: 9,
				maxHit: 13,
				imgNumber: 9,
				spellbook: 'standard',
				element: 'wind',
			},
			{
				label: 'Water Blast',
				value: 10,
				maxHit: 14,
				imgNumber: 10,
				spellbook: 'standard',
				element: 'water',
			},
			{
				label: 'Earth Blast',
				value: 11,
				maxHit: 15,
				imgNumber: 11,
				spellbook: 'standard',
				element: 'earth',
			},
			{
				label: 'Fire Blast',
				value: 12,
				maxHit: 16,
				imgNumber: 12,
				spellbook: 'standard',
				element: 'fire',
			},
			{
				label: 'Wind Wave',
				value: 13,
				maxHit: 17,
				imgNumber: 13,
				spellbook: 'standard',
				element: 'wind',
			},
			{
				label: 'Water Wave',
				value: 14,
				maxHit: 18,
				imgNumber: 14,
				spellbook: 'standard',
				element: 'water',
			},
			{
				label: 'Earth Wave',
				value: 15,
				maxHit: 19,
				imgNumber: 15,
				spellbook: 'standard',
				element: 'earth',
			},
			{
				label: 'Fire Surge',
				value: 20,
				maxHit: 24,
				imgNumber: 20,
				spellbook: 'standard',
				element: 'fire',
			},
			{
				label: 'Crumble Undead',
				value: 21,
				maxHit: 15,
				imgNumber: 21,
				spellbook: 'standard',
			},
			{
				label: 'Iban Blast',
				value: 22,
				maxHit: 25,
				imgNumber: 22,
				spellbook: 'standard',
			},
			{
				label: 'Magic Dart',
				value: 23,
				maxHit: null,
				imgNumber: 23,
				spellbook: 'standard',
			},
			{
				label: 'Saradomin Strike',
				value: 24,
				maxHit: 20,
				imgNumber: 24,
				spellbook: 'standard',
			},
			{
				label: 'Saradomin Strike (Charged)',
				value: 25,
				maxHit: 30,
				imgNumber: 24,
				spellbook: 'standard',
			},
			{
				label: 'Claws of Guthix',
				value: 26,
				maxHit: 20,
				imgNumber: 25,
				spellbook: 'standard',
			},
			{
				label: 'Claws of Guthix (Charged)',
				value: 27,
				maxHit: 30,
				imgNumber: 25,
				spellbook: 'standard',
			},
			{
				label: 'Flames of Zamorak',
				value: 28,
				maxHit: 20,
				imgNumber: 26,
				spellbook: 'standard',
			},
			{
				label: 'Flames of Zamorak (Charged)',
				value: 29,
				maxHit: 30,
				imgNumber: 26,
				spellbook: 'standard',
			},
			{
				label: 'Smoke Rush',
				value: 30,
				maxHit: 13,
				imgNumber: 27,
				spellbook: 'standard',
			},
			{
				label: 'Shadow Rush',
				value: 31,
				maxHit: 14,
				imgNumber: 28,
				spellbook: 'ancients',
			},
			{
				label: 'Blood Rush',
				value: 32,
				maxHit: 15,
				imgNumber: 29,
				spellbook: 'ancients',
			},
			{
				label: 'Ice Rush',
				value: 33,
				maxHit: 16,
				imgNumber: 30,
				spellbook: 'ancients',
			},
			{
				label: 'Smoke Burst',
				value: 34,
				maxHit: 17,
				imgNumber: 31,
				spellbook: 'ancients',
			},
			{
				label: 'Shadow Burst',
				value: 35,
				maxHit: 18,
				imgNumber: 32,
				spellbook: 'ancients',
			},
			{
				label: 'Blood Burst',
				value: 36,
				maxHit: 21,
				imgNumber: 33,
				spellbook: 'ancients',
			},
			{
				label: 'Ice Burst',
				value: 37,
				maxHit: 22,
				imgNumber: 34,
				spellbook: 'ancients',
			},
			{
				label: 'Smoke Blitz',
				value: 38,
				maxHit: 23,
				imgNumber: 35,
				spellbook: 'ancients',
			},
			{
				label: 'Shadow Blitz',
				value: 39,
				maxHit: 24,
				imgNumber: 36,
				spellbook: 'ancients',
			},
			{
				label: 'Blood Blitz',
				value: 40,
				maxHit: 25,
				imgNumber: 37,
				spellbook: 'ancients',
			},
			{
				label: 'Ice Blitz',
				value: 41,
				maxHit: 26,
				imgNumber: 38,
				spellbook: 'ancients',
			},
			{
				label: 'Smoke Barrage',
				value: 42,
				maxHit: 27,
				imgNumber: 39,
				spellbook: 'ancients',
			},
			{
				label: 'Shadow Barrage',
				value: 43,
				maxHit: 28,
				imgNumber: 40,
				spellbook: 'ancients',
			},
			{
				label: 'Blood Barrage',
				value: 44,
				maxHit: 29,
				imgNumber: 41,
				spellbook: 'ancients',
			},
			{
				label: 'Ice barrage',
				value: 45,
				maxHit: 30,
				imgNumber: 42,
				spellbook: 'ancients',
			}
		];

		setSelect(prevSelect => ({
			...prevSelect,
			options: options,
		}))

	}, [])

	useEffect(() => {
		if (userStats.chosenSpell) {
			setPic(spellImages[currentSpell.imgNumber])
		} else {
			setPic(defaultSpell);
		}

	}, [userStats.chosenSpell])

	// HAVE TO CHANGE THE ELSE STATEMENT AFTER
	const handleChange = spell => {
		// if a spell has been chosen
		if (spell.value) {
			setUserStats(prevStats => ({
				...prevStats,
				isMagic: true,
				isRange: false,
				chosenSpell: spell,
				attType: 'magic',
				attStyle: 'magic',
			}));
			setCurrentSpell({
				name: spell.label,
				value: spell.value,
				maxHit: spell.maxHit,
				imgNumber: spell.imgNumber,
			});
		} else {
			setUserStats(prevStats => ({
				...prevStats,
				isMagic: false,
				chosenSpell: null,
				attType: null,
				attStyle: null,
			}));
			setCurrentSpell({
				imgNumber: 0,
			})
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

	return (
		<div className="spell-slot">
			<img src={pic} alt="selected spell" ref={ref}/>
			{hovered && userStats.chosenSpell &&
				<div className="spell-hover">
					<h5>{userStats.chosenSpell.label}</h5>
				</div>
			}
			<Select
				className="spell-select"
				placeholder="Search for Spell"
				isSearchable
				onChange={selectedOption => handleChange(selectedOption)}
				onMenuOpen={() => handleMenuOpen()}
				onMenuClose={() => handleMenuClose()}
				options={select.options}
				styles={customStyles1(select)}
			/>
		</div>
	)


})