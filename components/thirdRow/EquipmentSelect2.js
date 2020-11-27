import { useState, useEffect } from 'react';
import SelectWeapon from './SelectEquipment1/SelectWeapon';
import { SelectWeaponStyle } from './SelectEquipment1/SelectWeaponStyle';
import SelectAmmo from './SelectEquipment1/SelectAmmo';
import SelectBody from './SelectEquipment1/SelectBody';
import SelectBoot from './SelectEquipment1/SelectBoot';
import SelectCape from './SelectEquipment1/SelectCape';
import SelectGlove from './SelectEquipment1/SelectGlove';
import SelectHelm from './SelectEquipment1/SelectHelm';
import SelectLeg from './SelectEquipment1/SelectLeg';
import SelectNeck from './SelectEquipment1/SelectNeck';
import SelectRing from './SelectEquipment1/SelectRing';
import SelectShield from './SelectEquipment1/SelectShield';
import HeaderR3C1 from './HeaderR3C1';
import EquipmentStats from './EquipmentStats';
import SelectSpell from './SelectEquipment1/SelectSpell';

import { useUserStats } from '../../state/userStats';
import shallow from 'zustand/shallow';

const EquipmentSelect2 = () => {

   const { isRange, isMagic } = useUserStats(state => ({
      isRange: state.isRange,
      isMagic: state.isMagic,
   }), shallow);
   
   const meleeBackground = 'r3-c1-equipment-container-melee';
   const rangeBackground = 'r3-c1-equipment-container-range';
   const magicBackground = 'r3-c1-equipment-container-magic';

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
         <HeaderR3C1/>
         <SelectWeapon/>
         <SelectWeaponStyle/>
         <SelectAmmo/>
         <SelectBody/>
         <SelectBoot/>
         <SelectCape/>
         <SelectGlove/>
         <SelectHelm/>
         <SelectLeg/>
         <SelectNeck/>
         <SelectRing/>
         <SelectShield/>
         <SelectSpell/>
         <EquipmentStats/>
      </div>
   );
}

export default EquipmentSelect2;