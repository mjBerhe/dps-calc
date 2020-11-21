import React, { useState, useEffect } from 'react';
import SelectSearch from 'react-select-search';
import { useLists } from '../../state/lists.js';

export const SelectMonster = React.memo(() => {

	const { setCurrentMonster } = useLists();
	const monsterList = useLists(state => state.monsters);
	const currentMonster = useLists(state => state.currentMonster);

	const [options, setOptions] = useState([]);
	const [monsterID, setMonsterID] = useState(null);

	// when monsterList loads, create and set the list of options
	useEffect(() => {
		const tempOptions = [];
		if (monsterList) {
			monsterList.forEach(monster => {
				tempOptions.push({
					name: monster.name,
					value: monster.id,
				});
			});
			setOptions(tempOptions);
			console.log('monster list loaded')
		}
	}, [monsterList]);

	// setting the monster when chosen from the list of options
	useEffect(() => {
		if (monsterID) {
			setCurrentMonster(monsterID);
		}
	}, [monsterID]);

	// useEffect(() => {
	// 	console.log(currentMonster)
	// }, [currentMonster])

	return(
		<div className="monster-container">
			<div className="monster-select">
				<SelectSearch
					options={options}
					value={monsterID}
					search
					placeholder="Select Monster"
					onChange={setMonsterID}
				/>
			</div>
		</div>
	)
})

