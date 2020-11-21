import { useState, useEffect } from 'react';
import useHover from '../../hooks/useHover';
import { usePrayers } from '../../state/prayers';
import { useUserStats } from '../../state/userStats';
import { useUserStats2 } from '../../state/userStats2';
import shallow from 'zustand/shallow';

const PrayerSelect = () => {

   const { changeAttackPrayer, changeStrengthPrayer, changeSpecialPrayer, changeRangePrayer, changeMagicPrayer } = usePrayers();
   const { attack1, attack2, attack3, strength1, strength2, strength3, chivalry, piety, range1, range2, range3, range4, magic1, magic2, magic3, magic4 } = usePrayers(state => ({
      attack1: state.attack1,
      attack2: state.attack2,
      attack3: state.attack3,
      strength1: state.strength1,
      strength2: state.strength2,
      strength3: state.strength3,
      chivalry: state.chivalry,
      piety: state.piety,
      range1: state.range1,
      range2: state.range2,
      range3: state.range3,
      range4: state.range4,
      magic1: state.magic1,
      magic2: state.magic2,
      magic3: state.magic3,
      magic4: state.magic4,
   }), shallow);

   const { setStat } = useUserStats();
   const attPrayerValue = useUserStats(state => state.attPrayer);
   const { setStat2 } = useUserStats2();

   const handleAttackPrayer = (e) => {
      const { type: type, value: value } = changeAttackPrayer(e.target.name);
      setStat(type, value);
      setStat2(type, value);
   }

   useEffect(() => {
      console.log(attPrayerValue);
   }, [attPrayerValue])

   const handleStrengthPrayer = (e) => {
      const { type: type, value: value } = changeStrengthPrayer(e.target.name);
      setStat(type, value);
      setStat2(type, value);
   }
   
   const handleSpecialPrayer = (e) => {
      const { type: type, value: value } = changeSpecialPrayer(e.target.name);
      setStat(type, value);
      setStat2(type, value);
   }

   const handleRangePrayer = (e) => {
      const { type: type, value: value } = changeRangePrayer(e.target.name);
      setStat(type, value);
      setStat2(type, value);
   }

   const handleMagicPrayer = (e) => {
      const { type: type, value: value } = changeMagicPrayer(e.target.name);
      setStat(type, value);
      setStat2(type, value);
   }

   const [refAttack1, hoveredAttack1] = useHover();
   const [refAttack2, hoveredAttack2] = useHover();
   const [refAttack3, hoveredAttack3] = useHover();
   const [refChivalry, hoveredChivalry] = useHover();
   const [refStrength1, hoveredStrength1] = useHover();
   const [refStrength2, hoveredStrength2] = useHover();
   const [refStrength3, hoveredStrength3] = useHover();
   const [refPiety, hoveredPiety] = useHover();
   const [refRange1, hoveredRange1] = useHover();
   const [refRange2, hoveredRange2] = useHover();
   const [refRange3, hoveredRange3] = useHover();
   const [refRange4, hoveredRange4] = useHover();
   const [refMagic1, hoveredMagic1] = useHover();
   const [refMagic2, hoveredMagic2] = useHover();
   const [refMagic3, hoveredMagic3] = useHover();
   const [refMagic4, hoveredMagic4] = useHover();


   return (
      <div className='r2-c1-prayers'>
         <div className={attack1.class}>
            <input type="image" src="/Prayers/attack/att1.png" name='attack1' ref={refAttack1} value={1} onClick={handleAttackPrayer}/>
            {hoveredAttack1 && <h5 className='prayer-item-hover'>Clarity of Thought</h5>}
         </div>
         <div className={attack2.class}>
            <input type="image" src="/Prayers/attack/att2.png" name='attack2' ref={refAttack2} value={2} onClick={handleAttackPrayer}/>
            {hoveredAttack2 && <h5 className='prayer-item-hover'>Improved Reflexes</h5>}
         </div>
         <div className={attack3.class}>
            <input type="image" src="/Prayers/attack/att3.png" name='attack3' ref={refAttack3} value={3} onClick={handleAttackPrayer}/>
            {hoveredAttack3 && <h5 className='prayer-item-hover'>Incredible Reflexes</h5>}
         </div>
         <div className={chivalry.class}>
            <input type="image" src="/Prayers/attack/chivalry.png" name='chivalry' ref={refChivalry} value={4} onClick={handleSpecialPrayer}/>
            {hoveredChivalry && <h5 className='prayer-item-hover'>Chivalry</h5>}
         </div>
         <div className={strength1.class}>
            <input type="image" src="/Prayers/strength/str1.png" name='strength1' ref={refStrength1} value={1} onClick={handleStrengthPrayer}/>
            {hoveredStrength1 && <h5 className='prayer-item-hover'>Burst of Strength</h5>}
         </div>
         <div className={strength2.class}>
            <input type="image" src="/Prayers/strength/str2.png" name='strength2' ref={refStrength2} value={2} onClick={handleStrengthPrayer}/>
            {hoveredStrength2 && <h5 className='prayer-item-hover'>Superhuman Strength</h5>}
         </div>
         <div className={strength3.class}>
            <input type="image" src="/Prayers/strength/str3.png" name='strength3' ref={refStrength3} value={3} onClick={handleStrengthPrayer}/>
            {hoveredStrength3 && <h5 className='prayer-item-hover'>Ultimate Strength</h5>}
         </div>
         <div className={piety.class}>
            <input type="image" src="/Prayers/attack/piety.png" name='piety' ref={refPiety} value={5} onClick={handleSpecialPrayer}/>
            {hoveredPiety && <h5 className='prayer-item-hover'>Piety</h5>}
         </div>
         <div className={range1.class}>
            <input type="image" src="/Prayers/range/rng1.png" name='range1' value={1} ref={refRange1} onClick={handleRangePrayer}/>
            {hoveredRange1 && <h5 className='prayer-item-hover'>Sharp Eye</h5>}
         </div>
         <div className={range2.class}>
            <input type="image" src="/Prayers/range/rng2.png" name='range2' value={2} ref={refRange2} onClick={handleRangePrayer}/>
            {hoveredRange2 && <h5 className='prayer-item-hover'>Hawk Eye</h5>}
         </div>
         <div className={range3.class}>
            <input type="image" src="/Prayers/range/rng3.png" name='range3' value={3} ref={refRange3} onClick={handleRangePrayer}/>
            {hoveredRange3 && <h5 className='prayer-item-hover'>Eagle Eye</h5>}
         </div>
         <div className={range4.class}>
            <input type="image" src="/Prayers/range/rng4.png" name='range4' value={4} ref={refRange4} onClick={handleRangePrayer}/>
            {hoveredRange4 && <h5 className='prayer-item-hover'>GOD MODE</h5>}
         </div>
         <div className={magic1.class}>
            <input type="image" src="/Prayers/magic/mag1.png" name='magic1' value={1} ref={refMagic1} onClick={handleMagicPrayer}/>
            {hoveredMagic1 && <h5 className='prayer-item-hover'>Mystic Will</h5>}
         </div>
         <div className={magic2.class}>
            <input type="image" src="/Prayers/magic/mag2.png" name='magic2' value={2} ref={refMagic2} onClick={handleMagicPrayer}/>
            {hoveredMagic2 && <h5 className='prayer-item-hover'>Mystic Lore</h5>}
         </div>
         <div className={magic3.class}>
            <input type="image" src="/Prayers/magic/mag3.png" name='magic3' value={3} ref={refMagic3} onClick={handleMagicPrayer}/>
            {hoveredMagic3 && <h5 className='prayer-item-hover'>Mystic Might</h5>}
         </div>
         <div className={magic4.class}>
            <input type="image" src="/Prayers/magic/mag4.png" name='magic4' value={4} ref={refMagic4} onClick={handleMagicPrayer}/>
            {hoveredMagic4 && <h5 className='prayer-item-hover'>Waste of Money</h5>}
         </div>
      </div>
   )
}

export default PrayerSelect;