import { useEffect } from 'react';
import shallow from 'zustand/shallow';
import { useUserStats } from '../state/userStats.js';
import { useEquippedGear } from '../state/equippedGear';
import { useLists } from '../state/lists';
import { useFinalStats } from '../state/finalStats';

import calcEffectiveAttLvl from '../formulas/effectiveAttLvl';
import calcEffectiveStrLvl from '../formulas/effectiveStrLvl';
import calcMaxAttRoll from '../formulas/maxAttRoll';
import calcMaxDefRoll from '../formulas/maxDefRoll';
import calcMaxHit from '../formulas/maxHit';
import calcAttSpeed from '../formulas/attSpeed.js';

const Set1Calculations = () => {

   const { setStat, setMultipleStats, checkPoweredStaff, checkRange } = useUserStats();
   const { statsHasChanged, attackLvl, strengthLvl, rangeLvl, magicLvl, equipmentAttBonus, equipmentMeleeStrBonus, equipmentRangeStrBonus, equipmentMagicDmgBonus, attPotion, attPrayer, strPotion, strPrayer, rngPotion, rngPrayer, magPotion, magPrayer, attType, attStyle, isRange, isMagic, chosenSpell, isSlayerTask } = useUserStats(state => ({
      statsHasChanged: state.userStatCount,
      attackLvl: state.attackLvl,
      strengthLvl: state.strengthLvl,
		rangeLvl: state.rangeLvl,
      magicLvl: state.magicLvl,
      equipmentAttBonus: state.equipmentAttBonus,
      equipmentMeleeStrBonus: state.equipmentMeleeStrBonus,
      equipmentRangeStrBonus: state.equipmentRangeStrBonus,
      equipmentMagicDmgBonus: state.equipmentMagicStrBonus,
		attPotion: state.attPotion,
      attPrayer: state.attPrayer,
      strPotion: state.strPotion,
      strPrayer: state.strPrayer,
		rngPotion: state.rngPotion,
		rngPrayer: state.rngPrayer,
		magPotion: state.magPotion,
      magPrayer: state.magPrayer,
      attType: state.attType,
		attStyle: state.attStyle,
		isRange: state.isRange,
      isMagic: state.isMagic,
      chosenSpell: state.chosenSpell,
      isSlayerTask: state.isSlayerTask,
	}), shallow);

   const { calcTotalBonuses, checkArclight, checkChaosGauntlets, checkDHCB, checkDHL, checkLeafBB, checkObbyNeck, checkObbySet, checkObbyWep, checkSalve, checkScythe, checkSlayerHelm, checkSlayerHelmImbued, checkSmokeStaff, checkTbow, checkTomeOfFire, checkVoid } = useEquippedGear();
   const { equipmentHasChanged, equippedWeapon, isArclight, isChaosGauntlets, isDHCB, isDHL, isLeafBB, isObbyNeck, isObbySet, isObbyWep, isSalve, isSalveE, isSalveI, isSalveEI, isScythe, isSlayerHelm, isSlayerHelmImbued, isSmokeStaff, isTbow, isTomeOfFire, isVoidMelee, isVoidRange, isVoidRangeElite, isVoidMage, isVoidMageElite } = useEquippedGear(state => ({
      equipmentHasChanged: state.equippedItemCount,
      equippedWeapon: state.weapon,
      isArclight: state.isArclight,
      isChaosGauntlets: state.isChaosGauntlets,
      isDHCB: state.isDHCB,
      isDHL: state.isDHL,
      isLeafBB: state.isLeafBB,
      isObbyNeck: state.isObbyNeck,
      isObbySet: state.isObbySet,
      isObbyWep: state.isObbyWep,
      isSalve: state.isSalve,
      isSalveE: state.isSalveE,
      isSalveI: state.isSalveI,
      isSalveEI: state.isSalveEI,
      isScythe: state.isScythe,
      isSlayerHelm: state.isSlayerHelm,
      isSlayerHelmImbued: state.isSlayerHelmImbued,
      isSmokeStaff: state.isSmokeStaff,
      isTbow: state.isTbow,
      isTomeOfFire: state.isTomeOfFire,
      isVoidMelee: state.isVoidMelee,
		isVoidRange: state.isVoidRange,
		isVoidRangeElite: state.isVoidRangeElite,
		isVoidMage: state.isVoidMage,
		isVoidMageElite: state.isVoidMageElite,
   }), shallow);

   const { monsterHasChanged, currentMonster, isDemon, isDragon, isLeafy, isUndead, isVampyre } = useLists(state => ({
      monsterHasChanged: state.listCount,
      currentMonster: state.currentMonster,
      isDemon: state.isDemon,
      isDragon: state.isDragon,
      isLeafy: state.isLeafy,
      isUndead: state.isUndead,
      isVampyre: state.isVampyre,
   }), shallow);

   const { setFinalStat } = useFinalStats();
   const { effectiveAttLvl, effectiveStrLvl } = useFinalStats(state => ({
      effectiveAttLvl: state.effectiveAttLvl,
      effectiveStrLvl: state.effectiveStrLvl,
   }), shallow);

   useEffect(() => { // gets called after an equipment change
      const { totalStabAttBonus, totalSlashAttBonus, totalCrushAttBonus, totalMagicAttBonus, totalRangeAttBonus, totalStabDefBonus, totalSlashDefBonus, totalCrushDefBonus, totalMagicDefBonus, totalRangeDefBonus, totalMeleeStrBonus, totalRangeStrBonus, totalMagicDmgBonus, totalPrayerBonus } = calcTotalBonuses();
      setMultipleStats({
         equipmentAttBonus: {
            stab: totalStabAttBonus,
            slash: totalSlashAttBonus,
            crush: totalCrushAttBonus,
            magic: totalMagicAttBonus,
            range: totalRangeAttBonus,
         },
         equipmentDefBonus: {
            stab: totalStabDefBonus,
            slash: totalSlashDefBonus,
            crush: totalCrushDefBonus,
            magic: totalMagicDefBonus,
            range: totalRangeDefBonus,
         },
         equipmentMeleeStrBonus: totalMeleeStrBonus,
         equipmentRangeStrBonus: totalRangeStrBonus,
         equipmentMagicDmgBonus: totalMagicDmgBonus,
         equipmentPrayerBonus: totalPrayerBonus,
      });

      if (equippedWeapon) { // basically filter special status's from a weapon equip
         checkArclight();
         checkDHCB();
         checkDHL();
         checkLeafBB();
         checkObbyWep();
         checkScythe();
         checkSmokeStaff();
         checkTbow();
         checkPoweredStaff(equippedWeapon);
         checkRange(equippedWeapon);
      }
      checkChaosGauntlets();
      checkObbyNeck();
      checkObbySet();
      checkSalve();
      checkSlayerHelm();
      checkSlayerHelmImbued();
      checkTomeOfFire();
      checkVoid();
   }, [equipmentHasChanged]);

   useEffect(() => { // runs after user stats change or an equipment change
      const tempEffectiveAttLvl = calcEffectiveAttLvl({
         attackLvl: parseInt(attackLvl, 10), 
         rangeLvl: parseInt(rangeLvl, 10),
         magicLvl: parseInt(magicLvl, 10),
         attPotion: attPotion, 
         attPrayer: attPrayer, 
         rngPotion: rngPotion, 
         rngPrayer: rngPrayer, 
         magPotion: magPotion, 
         magPrayer: magPrayer, 
         attStyle: attStyle, 
         isRange: isRange, 
         isMagic: isMagic,
      }, {
         isVoidMelee: isVoidMelee,
         isVoidRange: isVoidRange,
         isVoidRangeElite: isVoidRangeElite,
         isVoidMage: isVoidMage,
         isVoidMageElite: isVoidMageElite,
      });
      setFinalStat('effectiveAttLvl', tempEffectiveAttLvl);

      const tempEffectiveStrLvl = calcEffectiveStrLvl({
         strengthLvl: parseInt(strengthLvl, 10), 
         rangeLvl: parseInt(rangeLvl, 10),
         magicLvl: parseInt(magicLvl, 10),
         strPotion: strPotion, 
         strPrayer: strPrayer, 
         rngPotion: rngPotion, 
         rngPrayer: rngPrayer, 
         magPotion: magPotion, 
         attStyle: attStyle, 
         isRange: isRange, 
         isMagic: isMagic,
      }, {
         isVoidMelee: isVoidMelee,
         isVoidRange: isVoidRange,
         isVoidRangeElite: isVoidRangeElite,
      });
      setFinalStat('effectiveStrLvl', tempEffectiveStrLvl);
   }, [statsHasChanged, equipmentHasChanged]);

   useEffect(() => { // runs whenever any stat changes pretty much
      const tempMaxAttRoll = calcMaxAttRoll({
         effectiveAttLvl: effectiveAttLvl,
         equipmentAttBonus: equipmentAttBonus,
         isRange: isRange,
         isMagic: isMagic,
         attType: attType,
         chosenSpell: chosenSpell,
         isSlayerTask: isSlayerTask,
      }, {
         isArclight: isArclight,
         isDHCB: isDHCB,
         isDHL: isDHL,
         isObbySet: isObbySet,
         isObbyWep: isObbyWep,
         isSalve: isSalve,
         isSalveE: isSalveE,
         isSalveI: isSalveI,
         isSalveEI: isSalveEI,
         isSlayerHelm: isSlayerHelm,
         isSlayerHelmImbued: isSlayerHelmImbued,
         isSmokeStaff: isSmokeStaff,
         isTbow: isTbow,
      }, {
         currentMonster: currentMonster,
         isDemon: isDemon,
         isDragon: isDragon,
         isUndead: isUndead,
         isVampyre: isVampyre,
      });
      setFinalStat('maxAttRoll', tempMaxAttRoll);
      // console.log(`tempMaxAttRoll: ${tempMaxAttRoll}`)

      const tempMaxDefRoll = calcMaxDefRoll({
         isMagic: isMagic,
         currentMonster: currentMonster,
         attType: attType,
      });
      setFinalStat('maxDefRoll', tempMaxDefRoll);

      const tempMaxHit = calcMaxHit({
         effectiveStrLvl: effectiveStrLvl,
         equipmentMeleeStrBonus: equipmentMeleeStrBonus,
         equipmentRangeStrBonus: equipmentRangeStrBonus,
         equipmentMagicDmgBonus: equipmentMagicDmgBonus,
         equipmentAttBonus: equipmentAttBonus,
         isRange: isRange,
         isMagic: isMagic,
         chosenSpell: chosenSpell,
         isSlayerTask: isSlayerTask,
      }, {
         equippedWeapon: equippedWeapon,
         isArclight: isArclight,
         isChaosGauntlets: isChaosGauntlets,
         isDHCB: isDHCB,
         isDHL: isDHL,
         isLeafBB: isLeafBB,
         isObbyNeck: isObbyNeck,
         isObbySet: isObbySet,
         isObbyWep: isObbyWep,
         isSalve: isSalve,
         isSalveE: isSalveE,
         isSalveI: isSalveI,
         isSalveEI: isSalveEI,
         isScythe: isScythe,
         isSlayerHelm: isSlayerHelm,
         isSlayerHelmImbued: isSlayerHelmImbued,
         isSmokeStaff: isSmokeStaff,
         isTbow: isTbow,
         isTomeOfFire: isTomeOfFire,
         isVoidMageElite: isVoidMageElite,
      }, {
         currentMonster: currentMonster,
         isDemon: isDemon,
         isDragon: isDragon,
         isLeafy: isLeafy,
         isUndead: isUndead,
         isVampyre: isVampyre,
      });
      setFinalStat('maxHit', tempMaxHit);

      const tempAttSpeed = calcAttSpeed(equippedWeapon, chosenSpell, attStyle);
      setFinalStat('attSpeed', tempAttSpeed);

   }, [statsHasChanged, equipmentHasChanged, monsterHasChanged, effectiveAttLvl, effectiveStrLvl]);

   return (
      <></>
   )
}

export default Set1Calculations;