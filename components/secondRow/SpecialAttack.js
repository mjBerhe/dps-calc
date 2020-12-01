import { useEffect } from 'react';
import { useUserStats } from '../../state/userStats';
import { useUserStats2 } from '../../state/userStats2';
import { useFinalStats } from '../../state/finalStats';
import { useFinalStats2 } from '../../state/finalStats2';
import shallow from 'zustand/shallow';

const SpecialAttack = () => {

   const { setStat } = useUserStats();
   const isSpecialAttack = useUserStats(state => state.isSpecialAttack);

   const { setStat2 } = useUserStats2();
   const isSpecialAttack2 = useUserStats2(state => state.isSpecialAttack);

   const { setFinalStat } = useFinalStats();
   const { maxHit, accuracy } = useFinalStats(state => ({
      maxHit: state.maxHit,
      accuracy: state.accuracy,
   }), shallow);

   const { setFinalStat2 } = useFinalStats2();
   const { maxHit2, accuracy2 } = useFinalStats2(state => ({
      maxHit2: state.maxHit,
      accuracy2: state.accuracy,
   }), shallow);

   const handleToggle = () => {
      setStat('isSpecialAttack', !isSpecialAttack);
      setStat2('isSpecialAttack', !isSpecialAttack2);
   }

   return (
      <div className='special-toggle-container'>
         <img src="/Misc/Special Attack.png" alt="special attack logo"/>
         <label className='toggle-control'>
            <input type="checkbox" onChange={handleToggle}/>
            <span className='control'></span>
         </label>
      </div>
   );
}

export default SpecialAttack;