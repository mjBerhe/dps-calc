import { useState, useEffect } from 'react';
import SelectWeapon from './SelectEquipment/SelectWeapon';
import { SelectWeaponStyle } from './SelectEquipment/SelectWeaponStyle';
import SelectAmmo from './SelectEquipment/SelectAmmo';
import SelectBody from './SelectEquipment/SelectBody';
import SelectBoot from './SelectEquipment/SelectBoot';
import SelectCape from './SelectEquipment/SelectCape';
import SelectGlove from './SelectEquipment/SelectGlove';
import SelectHelm from './SelectEquipment/SelectHelm';
import SelectLeg from './SelectEquipment/SelectLeg';
import SelectNeck from './SelectEquipment/SelectNeck';
import SelectRing from './SelectEquipment/SelectRing';
import SelectShield from './SelectEquipment/SelectShield';
import HeaderR3C1 from './HeaderR3C1';
import EquipmentStats from './EquipmentStats';
import SelectSpell from './SelectEquipment/SelectSpell';

import { useUserStats } from '../../state/userStats';
import shallow from 'zustand/shallow';

const EquipmentSelect = () => {

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
         {/* <HeaderR3C1/> */}
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

export default EquipmentSelect;