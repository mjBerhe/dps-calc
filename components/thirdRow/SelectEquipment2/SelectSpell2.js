import { useEffect, useState } from 'react';
import useHover from "../../../hooks/useHover";
import SelectSearchItem from '../../templates/SelectSearchItem';
import { useUserStats2 } from '../../../state/userStats2';

const SelectSpell = () => {

	const { setMultipleStats2 } = useUserStats2();
	const chosenSpell = useUserStats2(state => state.chosenSpell);

	const defaultSpellPic = '/WeaponStyles/staves/staves4.png';
	const [spellPic, setSpellPic] = useState(defaultSpellPic);

	const spellImages = [defaultSpellPic, 
		'WindStrike', 'WaterStrike', 'EarthStrike', 'FireStrike',
		'WindBolt', 'WaterBolt', 'EarthBolt', 'FireBolt',
		'WindBlast', 'WaterBlast', 'EarthBlast', 'FireBlast',
		'WindWave', 'WaterWave', 'EarthWave', 'FireWave',
		'WindSurge','WaterSurge', 'EarthSurge', 'FireSurge',
		'CrumbleUndead', 'IbanBlast', 'MagicDart',
		'SaradominStrike', 'ClawsOfGuthix', 'FlamesOfZamorak',
		'SmokeRush', 'ShadowRush', 'BloodRush', 'IceRush',
		'SmokeBurst', 'ShadowBurst', 'BloodBurst', 'IceBurst',
		'SmokeBlitz', 'ShadowBlitz', 'BloodBlitz', 'IceBlitz',
		'SmokeBarrage', 'ShadowBarrage', 'BloodBarrage', 'IceBarrage'];

	const options = [
		{
			name: 'None',
			value: 0,
			maxHit: null,
			imgNumber: 0,
			spellbook: null,
		},
		{
			name: 'Wind Strike',
			value: 1,
			maxHit: 2,
			imgNumber: 1,
			spellbook: 'standard',
			element: 'wind',
		},
		{
			name: 'Water Strike',
			value: 2,
			maxHit: 4,
			imgNumber: 2,
			spellbook: 'standard',
			element: 'water',
		},
		{
			name: 'Earth Strike',
			value: 3,
			maxHit: 6,
			imgNumber: 3,
			spellbook: 'standard',
			element: 'earth',
		},
		{
			name: 'Fire Strike',
			value: 4,
			maxHit: 8,
			imgNumber: 4,
			spellbook: 'standard',
			element: 'fire',
		},
		{
			name: 'Wind Bolt',
			value: 5,
			maxHit: 9,
			imgNumber: 5,
			spellbook: 'standard',
			element: 'wind',
			grade: 'bolt',
		},
		{
			name: 'Water Bolt',
			value: 6,
			maxHit: 10,
			imgNumber: 6,
			spellbook: 'standard',
			//element: 'water',
			grade: 'bolt',
		},
		{
			name: 'Earth Bolt',
			value: 7,
			maxHit: 11,
			imgNumber: 7,
			spellbook: 'standard',
			element: 'earth',
			grade: 'bolt',
		},
		{
			name: 'Fire Bolt',
			value: 8,
			maxHit: 12,
			imgNumber: 8,
			spellbook: 'standard',
			element: 'fire',
			grade: 'bolt',
		},
		{
			name: 'Wind Blast',
			value: 9,
			maxHit: 13,
			imgNumber: 9,
			spellbook: 'standard',
			element: 'wind',
		},
		{
			name: 'Water Blast',
			value: 10,
			maxHit: 14,
			imgNumber: 10,
			spellbook: 'standard',
			element: 'water',
		},
		{
			name: 'Earth Blast',
			value: 11,
			maxHit: 15,
			imgNumber: 11,
			spellbook: 'standard',
			element: 'earth',
		},
		{
			name: 'Fire Blast',
			value: 12,
			maxHit: 16,
			imgNumber: 12,
			spellbook: 'standard',
			element: 'fire',
		},
		{
			name: 'Wind Wave',
			value: 13,
			maxHit: 17,
			imgNumber: 13,
			spellbook: 'standard',
			element: 'wind',
		},
		{
			name: 'Water Wave',
			value: 14,
			maxHit: 18,
			imgNumber: 14,
			spellbook: 'standard',
			element: 'water',
		},
		{
			name: 'Earth Wave',
			value: 15,
			maxHit: 19,
			imgNumber: 15,
			spellbook: 'standard',
			element: 'earth',
		},
		{
			name: 'Fire Wave',
			value: 16,
			maxHit: 20,
			imgNumber: 16,
			spellbook: 'standard',
			element: 'fire',
		},
		{
			name: 'Wind Surge',
			value: 17,
			maxHit: 21,
			imgNumber: 17,
			spellbook: 'standard',
			element: 'wind',
		},
		{
			name: 'Water Surge',
			value: 18,
			maxHit: 22,
			imgNumber: 18,
			spellbook: 'standard',
			element: 'water',
		},
		{
			name: 'Earth Surge',
			value: 19,
			maxHit: 23,
			imgNumber: 19,
			spellbook: 'standard',
			element: 'earth',
		},
		{
			name: 'Fire Surge',
			value: 20,
			maxHit: 24,
			imgNumber: 20,
			spellbook: 'standard',
			element: 'fire',
		},
		{
			name: 'Crumble Undead',
			value: 21,
			maxHit: 15,
			imgNumber: 21,
			spellbook: 'standard',
		},
		{
			name: 'Iban Blast',
			value: 22,
			maxHit: 25,
			imgNumber: 22,
			spellbook: 'standard',
		},
		{
			name: 'Magic Dart',
			value: 23,
			maxHit: null,
			imgNumber: 23,
			spellbook: 'standard',
		},
		{
			name: 'Saradomin Strike',
			value: 24,
			maxHit: 20,
			imgNumber: 24,
			spellbook: 'standard',
		},
		{
			name: 'Saradomin Strike (Charged)',
			value: 25,
			maxHit: 30,
			imgNumber: 24,
			spellbook: 'standard',
		},
		{
			name: 'Claws of Guthix',
			value: 26,
			maxHit: 20,
			imgNumber: 25,
			spellbook: 'standard',
		},
		{
			name: 'Claws of Guthix (Charged)',
			value: 27,
			maxHit: 30,
			imgNumber: 25,
			spellbook: 'standard',
		},
		{
			name: 'Flames of Zamorak',
			value: 28,
			maxHit: 20,
			imgNumber: 26,
			spellbook: 'standard',
		},
		{
			name: 'Flames of Zamorak (Charged)',
			value: 29,
			maxHit: 30,
			imgNumber: 26,
			spellbook: 'standard',
		},
		{
			name: 'Smoke Rush',
			value: 30,
			maxHit: 13,
			imgNumber: 27,
			spellbook: 'standard',
		},
		{
			name: 'Shadow Rush',
			value: 31,
			maxHit: 14,
			imgNumber: 28,
			spellbook: 'ancients',
		},
		{
			name: 'Blood Rush',
			value: 32,
			maxHit: 15,
			imgNumber: 29,
			spellbook: 'ancients',
		},
		{
			name: 'Ice Rush',
			value: 33,
			maxHit: 16,
			imgNumber: 30,
			spellbook: 'ancients',
		},
		{
			name: 'Smoke Burst',
			value: 34,
			maxHit: 17,
			imgNumber: 31,
			spellbook: 'ancients',
		},
		{
			name: 'Shadow Burst',
			value: 35,
			maxHit: 18,
			imgNumber: 32,
			spellbook: 'ancients',
		},
		{
			name: 'Blood Burst',
			value: 36,
			maxHit: 21,
			imgNumber: 33,
			spellbook: 'ancients',
		},
		{
			name: 'Ice Burst',
			value: 37,
			maxHit: 22,
			imgNumber: 34,
			spellbook: 'ancients',
		},
		{
			name: 'Smoke Blitz',
			value: 38,
			maxHit: 23,
			imgNumber: 35,
			spellbook: 'ancients',
		},
		{
			name: 'Shadow Blitz',
			value: 39,
			maxHit: 24,
			imgNumber: 36,
			spellbook: 'ancients',
		},
		{
			name: 'Blood Blitz',
			value: 40,
			maxHit: 25,
			imgNumber: 37,
			spellbook: 'ancients',
		},
		{
			name: 'Ice Blitz',
			value: 41,
			maxHit: 26,
			imgNumber: 38,
			spellbook: 'ancients',
		},
		{
			name: 'Smoke Barrage',
			value: 42,
			maxHit: 27,
			imgNumber: 39,
			spellbook: 'ancients',
		},
		{
			name: 'Shadow Barrage',
			value: 43,
			maxHit: 28,
			imgNumber: 40,
			spellbook: 'ancients',
		},
		{
			name: 'Blood Barrage',
			value: 44,
			maxHit: 29,
			imgNumber: 41,
			spellbook: 'ancients',
		},
		{
			name: 'Ice barrage',
			value: 45,
			maxHit: 30,
			imgNumber: 42,
			spellbook: 'ancients',
		}
	]

	const handleSpellChange = (spell, itemType) => {
		if (spell.value) { // an actual spell was chosen
			setMultipleStats2({
				isMagic: true,
				isRange: false,
				chosenSpell: spell,
				attType: 'magic',
				attStyle: 'magic',
			});
			setSpellPic(`/SpellsFinal/${spellImages[spell.imgNumber]}.png`);
		} else { // none was chosen (value = 0)
			setMultipleStats2({
				isMagic: false,
				chosenSpell: null,
				attType: null,
				attStyle: null,
			});
			setSpellPic(defaultSpellPic);
		}
	}

	useEffect(() => {
		if (!chosenSpell) {
			setSpellPic(defaultSpellPic);
		}
	}, [chosenSpell])

	const [ref, hovered] = useHover();

	return (
		<div className="spell-slot">
			<img src={spellPic} alt="selected spell" ref={ref}/>
			{hovered && chosenSpell &&
				<div className="attack-style-hover">
					<h5>{chosenSpell.name}</h5>
				</div>
			}
			{hovered && !chosenSpell &&
				<div className='attack-style-hover'>
					<h5>Select a Spell</h5>
				</div>
			}
			<SelectSearchItem
				options={options}
				onChange={handleSpellChange}
				itemType='spell'
			/>
		</div>
	)
}

export default SelectSpell;