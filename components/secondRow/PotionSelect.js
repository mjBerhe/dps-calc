import { useState, useEffect } from 'react';
import useHover from '../../hooks/useHover';

const PotionSelect = () => {

   const [potions, setPotions] = useState({
      'none': false, 'range1': false, 'range2': false,
      'attack1': false, 'attack2': false, 'attack3': false,
      'strength1': false, 'strength2': false, 'strength3': false,
      'magic1': false, 'magic2': false, 'magic3': false,
      'overload1': false, 'overload2': false, 'overload3': false, 'overload4': false,
   });

   const [potionClass, setPotionClass] = useState({
      'none': 'potion-unselected', 'range1': 'potion-unselected', 'range2': 'potion-unselected',
      'attack1': 'potion-unselected', 'attack2': 'potion-unselected', 'attack3': 'potion-unselected',
      'strength1': 'potion-unselected', 'strength2': 'potion-unselected', 'strength3': 'potion-unselected',
      'magic1': 'potion-unselected', 'magic2': 'potion-unselected', 'magic3': 'potion-unselected',
      'overload1': 'potion-unselected', 'overload2': 'potion-unselected', 'overload3': 'potion-unselected', 'overload4': 'potion-unselected',
   });

   const changeAttackPotion = (e) => {
      setPotions(prevPotions => ({
         ...prevPotions,
         'none': false,
         'attack1': false,
         'attack2': false,
         'attack3': false,
         'overload1': false,
         'overload2': false,
         'overload3': false,
         'overload4': false,
         [e.target.name]: !prevPotions[e.target.name],
      }));
   }

   const changeStrengthPotion = (e) => {
      setPotions(prevPotions => ({
         ...prevPotions,
         'none': false,
         'strength1': false,
         'strength2': false,
         'strength3': false,
         'overload1': false,
         'overload2': false,
         'overload3': false,
         'overload4': false,
         [e.target.name]: !prevPotions[e.target.name],
      }));
   }

   const changeRangePotion = (e) => {
      setPotions(prevPotions => ({
         ...prevPotions,
         'none': false,
         'range1': false,
         'range2': false,
         'overload1': false,
         'overload2': false,
         'overload3': false,
         'overload4': false,
         [e.target.name]: !prevPotions[e.target.name],
      }));
   }

   const changeMagicPotion = (e) => {
      setPotions(prevPotions => ({
         ...prevPotions,
         'none': false,
         'magic1': false,
         'magic2': false,
         'magic3': false,
         'overload1': false,
         'overload2': false,
         'overload3': false,
         'overload4': false,
         [e.target.name]: !prevPotions[e.target.name],
      }));
   }

   const changeOverloadPotion = (e) => {
      setPotions(prevPotions => ({
         ...prevPotions,
         'none': false, 'range1': false, 'range2': false,
         'attack1': false, 'attack2': false, 'attack3': false,
         'strength1': false, 'strength2': false, 'strength3': false,
         'magic1': false, 'magic2': false, 'magic3': false,
         'overload1': false, 'overload2': false, 'overload3': false, 'overload4': false,
         [e.target.name]: !prevPotions[e.target.name],
      }));
   }

   const listOfPotions = Object.keys(potions);

   useEffect(() => {
      listOfPotions.forEach(potion => {
         if (potions[potion]) {
            setPotionClass(prevState => ({
               ...prevState,
               [potion]: 'potion-selected',
            }));
         } else {
            setPotionClass(prevState => ({
               ...prevState,
               [potion]: 'potion-unselected',
            }));
         }
      });
   }, [potions])

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
         <div className={potionClass.none}>
            <input type="image" src='/Potions/attack/empty.png' name='none' ref={refEmpty} onClick={changeOverloadPotion}/>
            {hoveredEmpty && <h5 className='potion-item-hover'>None</h5>}
         </div>
         <div className={potionClass.range1}>
            <input type="image" src='/Potions/range/rng1.png' name='range1' ref={refRange1} onClick={changeRangePotion}/>
            {hoveredRange1 && <h5 className='potion-item-hover'>Ranging</h5>}
         </div>
         <div className={potionClass.range2}>
            <input type="image" src='/Potions/range/rng2.png' name='range2' ref={refRange2} onClick={changeRangePotion}/>
            {hoveredRange2 && <h5 className='potion-item-hover'>Divine Ranging</h5>}
         </div>
         <div className={potionClass.overload1}>
            <input type="image" src='/Potions/overload/nmz.png' name='overload1' ref={refOverload1} onClick={changeOverloadPotion}/>
            {hoveredOverload1 && <h5 className='potion-item-hover'>Overload (NMZ)</h5>}
         </div>
         <div className={potionClass.attack1}>
            <input type="image" src='/Potions/attack/att1.png' name='attack1' ref={refAttack1} onClick={changeAttackPotion}/>
            {hoveredAttack1 && <h5 className='potion-item-hover'>Attack</h5>}
         </div>
         <div className={potionClass.attack2}>
            <input type="image" src='/Potions/attack/att2.png' name='attack2' ref={refAttack2} onClick={changeAttackPotion}/>
            {hoveredAttack2 && <h5 className='potion-item-hover'>Super Attack</h5>}
         </div>
         <div className={potionClass.attack3}>
            <input type="image" src='/Potions/attack/att3.png' name='attack3' ref={refAttack3} onClick={changeAttackPotion}/>
            {hoveredAttack3 && <h5 className='potion-item-hover'>DS Attack</h5>}
         </div>
         <div className={potionClass.overload2}>
            <input type="image" src='/Potions/overload/cox.png' name='overload2' ref={refOverload2} onClick={changeOverloadPotion}/>
            {hoveredOverload2 && <h5 className='potion-item-hover'>Overload (-)</h5>}
         </div>
         <div className={potionClass.strength1}>
            <input type="image" src='/Potions/strength/str1.png' name='strength1' ref={refStrength1} onClick={changeStrengthPotion}/>
            {hoveredStrength1 && <h5 className='potion-item-hover'>Strength</h5>}
         </div>
         <div className={potionClass.strength2}>
            <input type="image" src='/Potions/strength/str2.png' name='strength2' ref={refStrength2} onClick={changeStrengthPotion}/>
            {hoveredStrength2 && <h5 className='potion-item-hover'>Super Strength</h5>}
         </div>
         <div className={potionClass.strength3}>
            <input type="image" src='/Potions/strength/str3.png' name='strength3' ref={refStrength3} onClick={changeStrengthPotion}/>
            {hoveredStrength3 && <h5 className='potion-item-hover'>DS Strength</h5>}
         </div>
         <div className={potionClass.overload3}>
            <input type="image" src='/Potions/overload/cox.png' name='overload3' ref={refOverload3} onClick={changeOverloadPotion}/>
            {hoveredOverload3 && <h5 className='potion-item-hover'>Overload</h5>}
         </div>
         <div className={potionClass.magic3}>
            <input type="image" src='/Potions/magic/mag3.png' name='magic3' ref={refMagic3} onClick={changeMagicPotion}/>
            {hoveredMagic3 && <h5 className='potion-item-hover'>Imbued Heart</h5>}
         </div>
         <div className={potionClass.magic1}>
            <input type="image" src='/Potions/magic/mag1.png' name='magic1' ref={refMagic1} onClick={changeMagicPotion}/>
            {hoveredMagic1 && <h5 className='potion-item-hover'>Magic</h5>}
         </div>
         <div className={potionClass.magic2}>
            <input type="image" src='/Potions/magic/mag2.png' name='magic2' ref={refMagic2} onClick={changeMagicPotion}/>
            {hoveredMagic2 && <h5 className='potion-item-hover'>Divine Magic</h5>}
         </div>
         <div className={potionClass.overload4}>
            <input type="image" src='/Potions/overload/cox.png' name='overload4' ref={refOverload4} onClick={changeOverloadPotion}/>
            {hoveredOverload4 && <h5 className='potion-item-hover'>Overload (+)</h5>}
         </div>
      </div>

   );
}

export default PotionSelect;