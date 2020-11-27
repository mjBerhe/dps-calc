import create from 'zustand';

const sumReducer = (acc, curVal) => acc + curVal;

export const useEquippedGear2 = create((set, get) => ({
   weapon: null,
   shield: null,
   helm: null,
   body: null,
   leg: null,
   boot: null,
   cape: null,
   glove: null,
   neck: null,
   ring: null,
   ammo: null,
   equippedItemCount: 0,
   isArclight: false,
   isChaosGauntlets: false,
   isDHCB: false,
   isDHL: false,
   isLeafBB: false,
   isObbyNeck: false,
   isObbySet: false,
   isObbyWep: false,
   isSalve: false,
   isSalveE: false,
   isSalveI: false,
   isSalveEI: false,
   isScythe: false,
   isSlayerHelm: false,
   isSlayerHelmImbued: false,
   isSmokeStaff: false,
   isTbow: false,
   isTomeOfFire: false,
   isVoidMelee: false,
   isVoidRange: false,
   isVoidRangeElite: false,
   isVoidMage: false,
   isVoidMageElite: false,
   equipItem: (equipType, item) => {
      set(() => ({
         [equipType]: item,
         equippedItemCount: get().equippedItemCount += 1,
      }));
   },
   calcTotalBonuses: () => {
      const equippedGear = {
         weapon: get().weapon,
         shield: get().shield,
         helm: get().helm,
         body: get().body,
         leg: get().leg,
         boot: get().boot,
         cape: get().cape,
         glove: get().glove,
         neck: get().neck,
         ring: get().ring,
         ammo: get().ammo,
      }
      const listOfEquipmentTypes = Object.keys(equippedGear); // ['weapon', 'shield', ...]

      return ({
         totalStabAttBonus: listOfEquipmentTypes.map(equipmentType => equippedGear[equipmentType] ? equippedGear[equipmentType].stats.attStab : 0).reduce(sumReducer),
         totalSlashAttBonus: listOfEquipmentTypes.map(equipmentType => equippedGear[equipmentType] ? equippedGear[equipmentType].stats.attSlash : 0).reduce(sumReducer),
         totalCrushAttBonus: listOfEquipmentTypes.map(equipmentType => equippedGear[equipmentType] ? equippedGear[equipmentType].stats.attCrush : 0).reduce(sumReducer),
         totalMagicAttBonus: listOfEquipmentTypes.map(equipmentType => equippedGear[equipmentType] ? equippedGear[equipmentType].stats.attMagic : 0).reduce(sumReducer),
         totalRangeAttBonus: listOfEquipmentTypes.map(equipmentType => equippedGear[equipmentType] ? equippedGear[equipmentType].stats.attRanged : 0).reduce(sumReducer),
         totalStabDefBonus: listOfEquipmentTypes.map(equipmentType => equippedGear[equipmentType] ? equippedGear[equipmentType].stats.defStab : 0).reduce(sumReducer),
         totalSlashDefBonus: listOfEquipmentTypes.map(equipmentType => equippedGear[equipmentType] ? equippedGear[equipmentType].stats.defSlash : 0).reduce(sumReducer),
         totalCrushDefBonus: listOfEquipmentTypes.map(equipmentType => equippedGear[equipmentType] ? equippedGear[equipmentType].stats.defCrush : 0).reduce(sumReducer),
         totalMagicDefBonus: listOfEquipmentTypes.map(equipmentType => equippedGear[equipmentType] ? equippedGear[equipmentType].stats.defMagic : 0).reduce(sumReducer),
         totalRangeDefBonus: listOfEquipmentTypes.map(equipmentType => equippedGear[equipmentType] ? equippedGear[equipmentType].stats.defRanged : 0).reduce(sumReducer),
         totalMeleeStrBonus: listOfEquipmentTypes.map(equipmentType => equippedGear[equipmentType] ? equippedGear[equipmentType].stats.strBonus : 0).reduce(sumReducer),
         totalRangeStrBonus: listOfEquipmentTypes.map(equipmentType => equippedGear[equipmentType] ? equippedGear[equipmentType].stats.rngStrBonus : 0).reduce(sumReducer),
         totalMagicDmgBonus: listOfEquipmentTypes.map(equipmentType => equippedGear[equipmentType] ? equippedGear[equipmentType].stats.magBonus : 0).reduce(sumReducer),
         totalPrayerBonus: listOfEquipmentTypes.map(equipmentType => equippedGear[equipmentType] ? equippedGear[equipmentType].stats.prayBonus : 0).reduce(sumReducer),
      });
   },
   checkArclight: () => {
      const equippedWeapon = get().weapon;
      if (equippedWeapon.id === 19675) {
         set(() => ({
            isArclight: true,
         }));
         console.log('arclight equipped');
      } else {
         set(() => ({
            isArclight: false,
         }));
      }
   },
   checkChaosGauntlets: () => {
      const equippedGloves = get().glove;
      if (equippedGloves) {
         if (equippedGloves.id === 777) {
            set(() => ({
               isChaosGauntlets: true,
            }));
         } else {
            set(() => ({
               isChaosGauntlets: false,
            }));
         }
      }
   },
   checkDHCB: () => {
      const equippedWeapon = get().weapon;
      if (equippedWeapon.id === 21012) {
         set(() => ({
            isDHCB: true,
         }));
      } else {
         set(() => ({
            isDHCB: false,
         }));
      }
   },
   checkDHL: () => {
      const equippedWeapon = get().weapon;
      if (equippedWeapon.id === 22978) {
         set(() => ({
            isDHL: true,
         }));
      } else {
         set(() => ({
            isDHL: false,
         }));
      }
   },
   checkLeafBB: () => {
      const equippedWeapon = get().weapon;
      if (equippedWeapon.id === 20727) {
         set(() => ({
            isLeafBB: true,
         }));
      } else {
         set(() => ({
            isLeafBB: false,
         }));
      }
   },
   checkObbyNeck: () => {
      const equippedNecklace = get().neck;
      if (equippedNecklace) {
         if (equippedNecklace.id === 23240 || equippedNecklace.id === 11128) {
            set(() => ({
               isObbyNeck: true,
            }));
         } else {
            set(() => ({
               isObbyNeck: false,
            }));
         }
      }
   },
   checkObbySet: () => {
      const equippedHelm = get().helm;
      const equippedBody = get().body;
      const equippedLegs = get().legs
      if (equippedHelm && equippedBody && equippedLegs) {
         if (equippedHelm.id === 21298 && equippedBody.id === 21301 && equippedLegs.id === 21304) {
            set(() => ({
               isObbySet: true,
            }));
         }
      } else {
         set(() => ({
            isObbySet: false,
         }));
      }
   },
   checkObbyWep: () => {
      const equippedWeapon = get().weapon;
      const listOfObbyWeps = [6525, 6523, 6527, 6528, 23235];
      if (listOfObbyWeps.includes(equippedWeapon.id)) {
         set(() => ({
            isObbyWep: true,
         }));
      } else {
         set(() => ({
            isObbyWep: false,
         }));
      }
   },
   checkSalve: () => {
      const equippedNecklace = get().neck;
      if (equippedNecklace) {
         if (equippedNecklace.id === 4081) { // salve
            set(() => ({
               isSalve: true,
               isSalveE: false,
               isSalveI: false,
               isSalveEI: false,
            }));
         } else if (equippedNecklace.id === 10588) { // salve E
            set(() => ({
               isSalve: false,
               isSalveE: true,
               isSalveI: false,
               isSalveEI: false,
            }));
         } else if (equippedNecklace.id === 12017) { // salve I
            set(() => ({
               isSalve: false,
               isSalveE: false,
               isSalveI: true,
               isSalveEI: false,
            }));
         } else if (equippedNecklace.id === 12018) { // salve EI
            set(() => ({
               isSalve: false,
               isSalveE: false,
               isSalveI: false,
               isSalveEI: true,
            }));
         } else {
            set(() => ({
               isSalve: false,
               isSalveE: false,
               isSalveI: false,
               isSalveEI: false,
            }));
         }
      }
   },
   checkScythe: () => {
      const equippedWeapon = get().weapon;
      if (equippedWeapon.id === 22325 || equippedWeapon.id === 22486) {
         set(() => ({
            isScythe: true,
         }));
      } else {
         set(() => ({
            isScythe: false,
         }));
      }
   },
   checkSlayerHelm: () => {
      const equippedHelm = get().helm;
      const listOfSlayerHelms = [19641, 19645, 23075, 21266, 19649, 11865, 21890, 11783, 11774, 11782, 11781, 11780, 11779, 11778, 11777, 11776, 11775, 11784, 19639, 19643, 23073, 21264, 19647, 11864, 21888, 24370, 8921, 8919, 8901, 8917, 8915, 8913, 8911, 8909, 8907, 8905, 8903];
      if (equippedHelm) {
         if (listOfSlayerHelms.includes(equippedHelm.id)) {
            set(() => ({
               isSlayerHelm: true,
            }));
         } else {
            set(() => ({
               isSlayerHelm: false,
            }));
         }
      }
   },
   checkSlayerHelmImbued: () => {
      const equippedHelm = get().helm;
      const listOfSlayerHelmsImbued = [19641, 19645, 23075, 21266, 19649, 11865, 21890, 11774, 11775, 11776, 11777, 11778, 11779, 11780, 11781, 11782, 11783, 11784];
      if (equippedHelm) {
         if (listOfSlayerHelmsImbued.includes(equippedHelm.id)) {
            set(() => ({
               isSlayerHelmImbued: true,
            }));
         } else {
            set(() => ({
               isSlayerHelmImbued: false,
            }));
         }
      }
   },
   checkSmokeStaff: () => {
      const equippedWeapon = get().weapon;
      if (equippedWeapon.id === 12000 || equippedWeapon.id === 11998) {
         set(() => ({
            isSmokeStaff: true,
         }));
      } else {
         set(() => ({
            isSmokeStaff: false,
         }));
      }
   },
   checkTbow: () => {
      const equippedWeapon = get().weapon;
      if (equippedWeapon.id === 20997) {
         set(() => ({
            isTbow: true,
         }));
      } else {
         set(() => ({
            isTbow: false,
         }));
      }
   },
   checkTomeOfFire: () => {
      const equippedShield = get().shield;
      if (equippedShield) {
         if (equippedShield.id === 20714 || equippedShield.id === 20716) {
            set(() => ({
               isTomeOfFire: true,
            }));
         } else {
            set(() => ({
               isTomeOfFire: false,
            }));
         }
      }
   },
   checkVoid: () => {
      const equippedBody = get().body;
      const equippedLegs = get().leg;
      const equippedHelm = get().helm;
      const equippedGloves = get().glove;
      if (equippedBody && equippedLegs && equippedHelm && equippedGloves) { // first check if all slots are filled
         if (equippedBody.id === 8839 || equippedBody.id === 13072) { // if any void body are on
            if (equippedLegs.id === 8840 || equippedLegs.id === 13073) { // if any void legs are on
               if (equippedGloves.id === 8842) { // if gloves are on
                  if (equippedHelm.id === 11665) { // if melee helm is on
                     set(() => ({ // void melee is active
                        isVoidMelee: true,
                        isVoidRange: false,
                        isVoidRangeElite: false,
                        isVoidMage: false,
                        isVoidMageElite: false,
                     }));
                  } else if (equippedHelm.id === 11664) { // if range helm is on
                     if (equippedBody.id === 13072 && equippedLegs.id === 13073) { // if elite top+bot are on
                        set(() => ({ // void range elite is active
                           isVoidMelee: false,
                           isVoidRange: false,
                           isVoidRangeElite: true,
                           isVoidMage: false,
                           isVoidMageElite: false,
                        }));
                     } else {
                        set(() => ({ // void range is active
                           isVoidMelee: false,
                           isVoidRange: true,
                           isVoidRangeElite: false,
                           isVoidMage: false,
                           isVoidMageElite: false,
                        }));
                     }
                  } else if (equippedHelm.id === 11663) { // if mage helm is on
                     if (equippedBody.id === 13072 && equippedLegs.id === 13073) { // if elite top+bot are on
                        set(() => ({ // void mage elite is active
                           isVoidMelee: false,
                           isVoidRange: false,
                           isVoidRangeElite: false,
                           isVoidMage: false,
                           isVoidMageElite: true,
                        }));
                     } else {
                        set(() => ({ // void mage is active
                           isVoidMelee: false,
                           isVoidRange: false,
                           isVoidRangeElite: false,
                           isVoidMage: true,
                           isVoidMageElite: false,
                        }));
                     }
                  } else {
                     set(() => ({ // no set is active
                        isVoidMelee: false,
                        isVoidRange: false,
                        isVoidRangeElite: false,
                        isVoidMage: false,
                        isVoidMageElite: false,
                     }));
                  }
               }
            }
         }
      }
   }
}));