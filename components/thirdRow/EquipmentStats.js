import { useUserStats } from '../../state/userStats';
import shallow from 'zustand/shallow';

const EquipmentStats = () => {

   const { equipmentAttBonus, equipmentDefBonus, equipmentMeleeStrBonus, equipmentRangeStrBonus, equipmentMagicDmgBonus, equipmentPrayerBonus } = useUserStats(state => ({
      equipmentAttBonus: state.equipmentAttBonus,
      equipmentDefBonus: state.equipmentDefBonus,
      equipmentMeleeStrBonus: state.equipmentMeleeStrBonus,
      equipmentRangeStrBonus: state.equipmentRangeStrBonus,
      equipmentMagicDmgBonus: state.equipmentMagicDmgBonus,
      equipmentPrayerBonus: state.equipmentPrayerBonus,
   }), shallow);

   return (
      <div className='r3-c1-equipment-stats'>
         <h3>Attack Bonus</h3>
         <h4>Stab: {equipmentAttBonus.stab ? equipmentAttBonus.stab : 0}</h4>
         <h4>Slash: {equipmentAttBonus.slash ? equipmentAttBonus.slash : 0}</h4>
         <h4>Crush: {equipmentAttBonus.crush ? equipmentAttBonus.crush : 0}</h4>
         <h4>Magic: {equipmentAttBonus.magic ? equipmentAttBonus.magic : 0}</h4>
         <h4>Range: {equipmentAttBonus.range ? equipmentAttBonus.range : 0}</h4>
         <h3>Defence Bonus</h3>
         <h4>Stab: {equipmentDefBonus.stab ? equipmentDefBonus.stab : 0}</h4>
         <h4>Slash: {equipmentDefBonus.slash ? equipmentDefBonus.slash : 0}</h4>
         <h4>Crush: {equipmentDefBonus.crush ? equipmentDefBonus.crush : 0}</h4>
         <h4>Magic: {equipmentDefBonus.magic ? equipmentDefBonus.magic : 0}</h4>
         <h4>Range: {equipmentDefBonus.range ? equipmentDefBonus.range : 0}</h4>
         <h3>Other Bonuses</h3>
         <h4>Melee Strength: {equipmentMeleeStrBonus ? equipmentMeleeStrBonus : 0}</h4>
         <h4>Ranged Strength: {equipmentRangeStrBonus ? equipmentRangeStrBonus : 0}</h4>
         <h4>Magic Damage: {equipmentMagicDmgBonus ? equipmentMagicDmgBonus : 0}%</h4>
         <h4>Prayer: {equipmentPrayerBonus ? equipmentPrayerBonus : 0}</h4>
      </div>
   );
}

export default EquipmentStats;