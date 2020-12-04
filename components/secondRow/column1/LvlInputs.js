import shallow from 'zustand/shallow';
import useHover from '../../../hooks/useHover';
import { useUserStats } from '../../../state/userStats';
import { useUserStats2 } from '../../../state/userStats2';

const LvlInputs = () => {

	const { setStat } = useUserStats();
	const { setStat2 } = useUserStats2();
	const { attLvl, strLvl, rngLvl, magLvl } = useUserStats(state => ({
		attLvl: state.attackLvl,
		strLvl: state.strengthLvl,
		rngLvl: state.rangeLvl,
		magLvl: state.magicLvl,
	}), shallow);

	const handleChange = (e) => {
		setStat(e.target.name, e.target.value);
		setStat2(e.target.name, e.target.value);
	}

   const [refAttack, hoveredAttack] = useHover();
	const [refStrength, hoveredStrength] = useHover();
	const [refRange, hoveredRange] = useHover();
	const [refMagic, hoveredMagic] = useHover();
   
   return (
      <div className="r2-c1-lvlInputs">
			<div className="lvlInput-item">
				<img src='/Skills/Attack.png' alt="attack icon" ref={refAttack}/>
				<input type="number" name='attackLvl' value={attLvl} onChange={handleChange}/>
				{hoveredAttack && <h5 className='lvlInput-item-hover'>Attack Level</h5>}
			</div>
			<div className="lvlInput-item">
				<img src='/Skills/Strength.png' alt="strength icon" ref={refStrength}/>
				<input type='number' name='strengthLvl' value={strLvl} onChange={handleChange}/>
				{hoveredStrength && <h5 className='lvlInput-item-hover'>Strength Level</h5>}
			</div>
			<div className="lvlInput-item">
				<img src='/Skills/Range.png' alt="range icon" ref={refRange}/>
				<input type="number" name="rangeLvl" value={rngLvl} onChange={handleChange}/>
				{hoveredRange && <h5 className='lvlInput-item-hover'>Ranged Level</h5>}
			</div>
			<div className="lvlInput-item">
				<img src='/Skills/Magic.png' alt="magic icon" ref={refMagic}/>
				<input type="number" name="magicLvl" value={magLvl} onChange={handleChange}/>
				{hoveredMagic && <h5 className='lvlInput-item-hover'>Magic Level</h5>}
			</div>
		</div>
   )
}

export default LvlInputs;