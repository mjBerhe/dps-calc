import { useEffect } from 'react';
import { useUserStats } from '../../state/userStats';
import { useUserStats2 } from '../../state/userStats2';

const SlayerToggle = () => {

   const { setStat } = useUserStats();
   const isSlayerTask = useUserStats(state => state.isSlayerTask);

   const { setStat2 } = useUserStats2();
   const isSlayerTask2 = useUserStats2(state => state.isSlayerTask);

   const handleToggle = () => {
      setStat('isSlayerTask', !isSlayerTask);
      setStat2('isSlayerTask', !isSlayerTask2);
   }

   // useEffect(() => {
   //    console.log(isSlayerTask, isSlayerTask2);
   // }, [isSlayerTask, isSlayerTask2]);

   return (
      <div className='slayer-toggle-container'>
         <img src="/Misc/slayerIcon.png" alt="slayer icon"/>
         <label className='toggle-control'>
            <input type="checkbox" onChange={handleToggle}/>
            <span className='control'></span>
         </label>
      </div>
   );
}

export default SlayerToggle;