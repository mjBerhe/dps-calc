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
   equipmentMeleeStrBonus: null,
   equipmentRangeStrBonus: null,
   equipmentMagicDmgBonus: null,
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
   isMonsterUndead: false,
   isMonsterDragon: false,
   isMonsterDemon: false,
   isMonsterTurothKurask: false,
   setStat2: (statType, value) => {
      set(() => ({
         [statType]: value,
      }));
   },
   setMultipleStats2: (objectOfStats) => {
      const listOfStats = Object.keys(objectOfStats);
      listOfStats.forEach(stat => {
         set(() => ({
            [stat]: objectOfStats[stat],
         }));
      });
   }
}));