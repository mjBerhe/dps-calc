import { useEffect } from 'react';
import { useUserStats } from '../../../state/userStats';
import { useUserStats2 } from '../../../state/userStats2';
import useHover from '../../../hooks/useHover';

const SlayerToggle = () => {

   const { setStat } = useUserStats();
   const isSlayerTask = useUserStats(state => state.isSlayerTask);

   const { setStat2 } = useUserStats2();
   const isSlayerTask2 = useUserStats2(state => state.isSlayerTask);

   const handleToggle = () => {
      setStat('isSlayerTask', !isSlayerTask);
      setStat2('isSlayerTask', !isSlayerTask2);
   }

   const [ref, hovered] = useHover();

   return (
      <div className='slayer-toggle-container'>
         <img src="/Misc/slayerIcon.png" alt="slayer icon" ref={ref}/>
         <label className='toggle-control'>
            <input type="checkbox" onChange={handleToggle}/>
            <span className='control'></span>
         </label>
         {hovered && <h5 className='utility-hover'>Slayer Task</h5>}
      </div>
   );
}

export default SlayerToggle;