import { useState, useEffect } from 'react';
import SelectSearch from '../../templates/SelectSearch';
import { useLists } from '../../../state/lists.js';

export const SelectMonster = () => {

	const { setNewMonster, checkDemon, checkDragon, checkLeafy, checkUndead, checkVampyre } = useLists();
	const monsterList = useLists(state => state.monsters);
	const currentMonster = useLists(state => state.currentMonster);

	const [options, setOptions] = useState([]);

	// when monsterList loads, set options as the list itself
	useEffect(() => {
		if (monsterList) {
			setOptions(monsterList); // array of each monster
			// console.log('monster list loaded');
		}
	}, [monsterList]);

	const handleMonsterChange = (monster, type) => {
		// monster object passed in is the WHOLE monster object
		setNewMonster(monster);
		// console.log(monster);
	}

	useEffect(() => {
		if (currentMonster) {
			checkDemon();
			checkDragon();
			checkLeafy();
			checkUndead();
			checkVampyre();
		}
		// console.log(currentMonster);
	}, [currentMonster])

	return(
		<div className="r2-c2-monster-container">
			<SelectSearch
				options={options}
				onChange={handleMonsterChange}
				itemType='monster'
			/>
		</div>
	)
}

