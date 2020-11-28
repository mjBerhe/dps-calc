import { useState, useEffect } from 'react';
import SelectWeapon2 from './SelectEquipment2/SelectWeapon2';
import SelectWeaponStyle2 from './SelectEquipment2/SelectWeaponStyle2';
import SelectAmmo2 from './SelectEquipment2/SelectAmmo2';
import SelectBody2 from './SelectEquipment2/SelectBody2';
import SelectBoot2 from './SelectEquipment2/SelectBoot2';
import SelectCape2 from './SelectEquipment2/SelectCape2';
import SelectGlove2 from './SelectEquipment2/SelectGlove2';
import SelectHelm2 from './SelectEquipment2/SelectHelm2';
import SelectLeg2 from './SelectEquipment2/SelectLeg2';
import SelectNeck2 from './SelectEquipment2/SelectNeck2';
import SelectRing2 from './SelectEquipment2/SelectRing2';
import SelectShield2 from './SelectEquipment2/SelectShield2';
import HeaderR3C2 from './HeaderR3C2';
import EquipmentStats2 from './EquipmentStats2';
import SelectSpell2 from './SelectEquipment2/SelectSpell2';

import Utilities2 from './Utilities2';

import { useUserStats2 } from '../../state/userStats2';
import shallow from 'zustand/shallow';

const EquipmentSelect2 = () => {

   const { isRange, isMagic } = useUserStats2(state => ({
      isRange: state.isRange,
      isMagic: state.isMagic,
   }), shallow);
   
   const meleeBackground = 'r3-equipment-container-melee';
   const rangeBackground = 'r3-equipment-container-range';
   const magicBackground = 'r3-equipment-container-magic';

   const [backgroundClass, setBackgroundClass] = useState(meleeBackground);

   useEffect(() => {
      if (isRange) {
         setBackgroundClass(rangeBackground);
      } else if (isMagic) {
         setBackgroundClass(magicBackground);
      } else {
         setBackgroundClass(meleeBackground);
      }
   }, [isRange, isMagic])

   return (
      <div className={backgroundClass}>
         <div className='r3-title-buttons-container'>
            <HeaderR3C2/>
            <Utilities2/>
         </div>
         <SelectWeapon2/>
         <SelectWeaponStyle2/>
         <SelectAmmo2/>
         <SelectBody2/>
         <SelectBoot2/>
         <SelectCape2/>
         <SelectGlove2/>
         <SelectHelm2/>
         <SelectLeg2/>
         <SelectNeck2/>
         <SelectRing2/>
         <SelectShield2/>
         <SelectSpell2/>
         <EquipmentStats2/>
      </div>
   );
}

export default EquipmentSelect2;