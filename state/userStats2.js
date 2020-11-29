import create from 'zustand';

export const useUserStats2 = create((set, get) => ({
   attackLvl: '',
   strengthLvl: '',
   rangeLvl: '',
   magicLvl: '',
   equipmentAttBonus: {
      stab: null,
      slash: null,
      crush: null,
      magic: null,
      range: null,
   },
   equipmentDefBonus: {
      stab: null,
      slash: null,
      crush: null,
      magic: null,
      range: null,
   },
   equipmentMeleeStrBonus: null,
   equipmentRangeStrBonus: null,
   equipmentMagicDmgBonus: null,
   equipmentPrayerBonus: null,
   attPotion: 0,
   attPrayer: 0,
   strPotion: 0,
   strPrayer: 0,
   rngPotion: 0,
   rngPrayer: 0,
   magPotion: 0,
   magPrayer: 0,
   attType: null,
   attStyle: null,
   isRange: false,
   isMagic: false,
   chosenSpell: null,
   isSlayerTask: false,
   userStatCount: 0, // reference whenever a stat changes (for useEffect)
   setStat2: (statType, value) => {
      set(() => ({
         [statType]: value,
         userStatCount: get().userStatCount + 1,
      }));
      // console.log(`${statType} is now ${value}`);
   },
   setMultipleStats2: (objectOfStats) => {
      const listOfStats = Object.keys(objectOfStats);
      listOfStats.forEach(stat => {
         set(() => ({
            [stat]: objectOfStats[stat],
            userStatCount: get().userStatCount + 1,
         }));
         // console.log(`${stat} is now ${objectOfStats[stat]}`);
      });
   },
   checkPoweredStaff2: (equippedWeapon) => {
      const listOfPoweredStaves = [11907, 11905, 22288, 12899, 22292, 22323, 22381];
      if (listOfPoweredStaves.includes(equippedWeapon.id)) {
         set(() => ({
            isMagic: true,
            attType: 'magic',
         }));
      }
   },
   checkRange2: (equippedWeapon) => {
      const weaponTypes = ['bows', 'crossbows', 'thrown_weapons', 'chinchompas'];
      if (weaponTypes.includes(equippedWeapon.wepType)) {
         set(() => ({
            isRange: true,
         }));
         // console.log('ranged weapon equipped')
      } else {
         set(() => ({
            isRange: false,
         }));
      }
   },
}));