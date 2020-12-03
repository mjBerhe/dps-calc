import { useEffect } from 'react';
import { useEquippedGear } from '../../state/equippedGear';
import { useEquippedGear2 } from '../../state/equippedGear2';
import { useUserStats } from '../../state/userStats';
import { useUserStats2 } from '../../state/userStats2';
import { useFinalStats } from '../../state/finalStats';
import { useFinalStats2 } from '../../state/finalStats2';
import shallow from 'zustand/shallow';

const SpecialAttack = () => {

   const equippedWeapon = useEquippedGear(state => state.weapon);
   const equippedWeapon2 = useEquippedGear2(state => state.weapon);

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

   // setFinalStat('specMaxHit', Math.floor());
   // setFinalStat('specAccuracy', );

   // useEffect(() => {
   //    if (equippedWeapon) {
   //       if (equippedWeapon.id === 13263) { // bludgeon
   //          setFinalStat('specMaxHit', Math.floor(maxHit*1.495));
   //          setFinalStat('specAccuracy', accuracy)
   //       } else if (equippedWeapon.id === 13265 || equippedWeapon.id === 13267 || equippedWeapon.id === 13269 || equippedWeapon.id === 13271) {
   //          setFinalStat('specMaxHit', Math.floor(maxHit*0.85)*2);
   //          setFinalStat('specAccuracy', );
   //       }
   //    }

   // }, [equippedWeapon, maxHit, accuracy])

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