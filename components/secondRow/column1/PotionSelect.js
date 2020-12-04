import { useState, useEffect } from 'react';
import useHover from '../../../hooks/useHover';
import { usePotions } from '../../../state/potions';
import { useUserStats } from '../../../state/userStats';
import { useUserStats2 } from '../../../state/userStats2';
import shallow from 'zustand/shallow';

const PotionSelect = () => {

   const { changeAttackPotion, changeStrengthPotion, changeRangePotion, changeMagicPotion, changeOverloadPotion } = usePotions();
   const { none, attack1, attack2, attack3, strength1, strength2, strength3, range1, range2, magic1, magic2, magic3, overload1, overload2, overload3, overload4 } = usePotions(state => ({
      none: state.none,
      attack1: state.attack1,
      attack2: state.attack2,
      attack3: state.attack3,
      strength1: state.strength1,
      strength2: state.strength2,
      strength3: state.strength3,
      range1: state.range1,
      range2: state.range2,
      magic1: state.magic1,
      magic2: state.magic2,
      magic3: state.magic3,
      overload1: state.overload1,
      overload2: state.overload2,
      overload3: state.overload3,
      overload4: state.overload4,
   }), shallow);

   const { setStat, setMultipleStats } = useUserStats();
   const { setStat2, setMultipleStats2 } = useUserStats2();

   const handleAttackPotion = (e) => {
      const { type, value, overloadOff } = changeAttackPotion(e.target.name);
      setStat(type, value);
      setStat2(type, value);
      if (overloadOff) {
         setMultipleStats({
            strPotion: 0,
            rngPotion: 0,
            magPotion: 0,
         });
         setMultipleStats2({
            strPotion: 0,
            rngPotion: 0,
            magPotion: 0,
         });
      }
   }

   const handleStrengthPotion = (e) => {
      const { type, value, overloadOff } = changeStrengthPotion(e.target.name);
      setStat(type, value);
      setStat2(type, value);
      if (overloadOff) {
         setMultipleStats({
            attPotion: 0,
            rngPotion: 0,
            magPotion: 0,
         });
         setMultipleStats2({
            attPotion: 0,
            rngPotion: 0,
            magPotion: 0,
         });
      }
   }

   const handleRangePotion = (e) => {
      const { type, value, overloadOff } = changeRangePotion(e.target.name);
      setStat(type, value);
      setStat2(type, value);
      if (overloadOff) {
         setMultipleStats({
            strPotion: 0,
            attPotion: 0,
            magPotion: 0,
         });
         setMultipleStats2({
            strPotion: 0,
            attPotion: 0,
            magPotion: 0,
         });
      }
   }

   const handleMagicPotion = (e) => {
      const { type, value, overloadOff } = changeMagicPotion(e.target.name);
      setStat(type, value);
      setStat2(type, value);
      if (overloadOff) {
         setMultipleStats({
            strPotion: 0,
            rngPotion: 0,
            attPotion: 0,
         });
         setMultipleStats2({
            strPotion: 0,
            rngPotion: 0,
            attPotion: 0,
         });
      }
   }

   const handleOverloadPotion = (e) => {
      const { type, value } = changeOverloadPotion(e.target.name);
      setMultipleStats({
         attPotion: value,
         strPotion: value,
         rngPotion: value,
         magPotion: value,
      });
      setMultipleStats2({
         attPotion: value,
         strPotion: value,
         rngPotion: value,
         magPotion: value,
      });
      // setStat(type, value);
      // setStat2(type, value);
   }


   const [refEmpty, hoveredEmpty] = useHover();
   const [refAttack1, hoveredAttack1] = useHover();
   const [refAttack2, hoveredAttack2] = useHover();
   const [refAttack3, hoveredAttack3] = useHover();
   const [refStrength1, hoveredStrength1] = useHover();
   const [refStrength2, hoveredStrength2] = useHover();
   const [refStrength3, hoveredStrength3] = useHover();
   const [refRange1, hoveredRange1] = useHover();
   const [refRange2, hoveredRange2] = useHover();
   const [refMagic1, hoveredMagic1] = useHover();
   const [refMagic2, hoveredMagic2] = useHover();
   const [refMagic3, hoveredMagic3] = useHover();
   const [refOverload1, hoveredOverload1] = useHover();
   const [refOverload2, hoveredOverload2] = useHover();
   const [refOverload3, hoveredOverload3] = useHover();
   const [refOverload4, hoveredOverload4] = useHover();

   return (
      <div className="r2-c1-potions">
         <div className={none.class}>
            <input type="image" src='/Potions/attack/empty.png' name='none' ref={refEmpty} onClick={handleOverloadPotion}/>
            {hoveredEmpty && <h5 className='potion-item-hover'>None</h5>}
         </div>
         <div className={range1.class}>
            <input type="image" src='/Potions/range/rng1.png' name='range1' ref={refRange1} onClick={handleRangePotion}/>
            {hoveredRange1 && <h5 className='potion-item-hover'>Ranging</h5>}
         </div>
         <div className={range2.class}>
            <input type="image" src='/Potions/range/rng2.png' name='range2' ref={refRange2} onClick={handleRangePotion}/>
            {hoveredRange2 && <h5 className='potion-item-hover'>Divine Ranging</h5>}
         </div>
         <div className={overload1.class}>
            <input type="image" src='/Potions/overload/nmz.png' name='overload1' ref={refOverload1} onClick={handleOverloadPotion}/>
            {hoveredOverload1 && <h5 className='potion-item-hover'>Overload (NMZ)</h5>}
         </div>
         <div className={attack1.class}>
            <input type="image" src='/Potions/attack/att1.png' name='attack1' ref={refAttack1} onClick={handleAttackPotion}/>
            {hoveredAttack1 && <h5 className='potion-item-hover'>Attack</h5>}
         </div>
         <div className={attack2.class}>
            <input type="image" src='/Potions/attack/att2.png' name='attack2' ref={refAttack2} onClick={handleAttackPotion}/>
            {hoveredAttack2 && <h5 className='potion-item-hover'>Super Attack</h5>}
         </div>
         <div className={attack3.class}>
            <input type="image" src='/Potions/attack/att3.png' name='attack3' ref={refAttack3} onClick={handleAttackPotion}/>
            {hoveredAttack3 && <h5 className='potion-item-hover'>DS Attack</h5>}
         </div>
         <div className={overload2.class}>
            <input type="image" src='/Potions/overload/cox.png' name='overload2' ref={refOverload2} onClick={handleOverloadPotion}/>
            {hoveredOverload2 && <h5 className='potion-item-hover'>Overload (-)</h5>}
         </div>
         <div className={strength1.class}>
            <input type="image" src='/Potions/strength/str1.png' name='strength1' ref={refStrength1} onClick={handleStrengthPotion}/>
            {hoveredStrength1 && <h5 className='potion-item-hover'>Strength</h5>}
         </div>
         <div className={strength2.class}>
            <input type="image" src='/Potions/strength/str2.png' name='strength2' ref={refStrength2} onClick={handleStrengthPotion}/>
            {hoveredStrength2 && <h5 className='potion-item-hover'>Super Strength</h5>}
         </div>
         <div className={strength3.class}>
            <input type="image" src='/Potions/strength/str3.png' name='strength3' ref={refStrength3} onClick={handleStrengthPotion}/>
            {hoveredStrength3 && <h5 className='potion-item-hover'>DS Strength</h5>}
         </div>
         <div className={overload3.class}>
            <input type="image" src='/Potions/overload/cox.png' name='overload3' ref={refOverload3} onClick={handleOverloadPotion}/>
            {hoveredOverload3 && <h5 className='potion-item-hover'>Overload</h5>}
         </div>
         <div className={magic3.class}>
            <input type="image" src='/Potions/magic/mag3.png' name='magic3' ref={refMagic3} onClick={handleMagicPotion}/>
            {hoveredMagic3 && <h5 className='potion-item-hover'>Imbued Heart</h5>}
         </div>
         <div className={magic1.class}>
            <input type="image" src='/Potions/magic/mag1.png' name='magic1' ref={refMagic1} onClick={handleMagicPotion}/>
            {hoveredMagic1 && <h5 className='potion-item-hover'>Magic</h5>}
         </div>
         <div className={magic2.class}>
            <input type="image" src='/Potions/magic/mag2.png' name='magic2' ref={refMagic2} onClick={handleMagicPotion}/>
            {hoveredMagic2 && <h5 className='potion-item-hover'>Divine Magic</h5>}
         </div>
         <div className={overload4.class}>
            <input type="image" src='/Potions/overload/cox.png' name='overload4' ref={refOverload4} onClick={handleOverloadPotion}/>
            {hoveredOverload4 && <h5 className='potion-item-hover'>Overload (+)</h5>}
         </div>
      </div>
   );
}

export default PotionSelect;