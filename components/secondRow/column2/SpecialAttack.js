import { useEffect } from 'react';
import { useUserStats } from '../../../state/userStats';
import { useUserStats2 } from '../../../state/userStats2';
import shallow from 'zustand/shallow';
import useHover from '../../../hooks/useHover';

const SpecialAttack = () => {

   const { setStat } = useUserStats();
   const isSpecialAttack = useUserStats(state => state.isSpecialAttack);

   const { setStat2 } = useUserStats2();
   const isSpecialAttack2 = useUserStats2(state => state.isSpecialAttack);

   const handleToggle = () => {
      setStat('isSpecialAttack', !isSpecialAttack);
      setStat2('isSpecialAttack', !isSpecialAttack2);
   }

   const [ref, hovered] = useHover();

   return (
      <div className='special-toggle-container'>
         <img src="/Misc/Special Attack.png" alt="special attack logo" ref={ref}/>
         <label className='toggle-control'>
            <input type="checkbox" onChange={handleToggle}/>
            <span className='control'></span>
         </label>
         {hovered && <h5 className='utility-hover'>Spec Overlay</h5>}
      </div>
   );
}

export default SpecialAttack;