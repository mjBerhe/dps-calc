import create from 'zustand';

export const useFinalStats = create((set, get) => ({
   effectiveAttLvl: 0,
   effectiveStrLvl: 0,
   maxAttRoll: 0,
   maxDefRoll: 0,
   maxHit: 0,
   accuracy: 0,
   attSpeed: 0,
   dps: 0,
   specMaxHit: 0,
   specAccuracy: 0,
   setFinalStat: (statType, value) => {
      set(() => ({
         [statType]: value,
         // userStatCount: get().userStatCount + 1,
      })); 
      // console.log(`${statType} is now ${value}`);
   },
}));