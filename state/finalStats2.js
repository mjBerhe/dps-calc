import create from 'zustand';

export const useFinalStats2 = create((set, get) => ({
   effectiveAttLvl: 0,
   effectiveStrLvl: 0,
   maxAttRoll: 0,
   maxDefRoll: 0,
   maxHit: 0,
   accuracy: 0,
   attSpeed: 0,
   dps: 0,
   setFinalStat2: (statType, value) => {
      set(() => ({
         [statType]: value,
         // userStatCount: get().userStatCount + 1,
      })); 
      // console.log(`${statType} is now ${value}`);
   },
}));