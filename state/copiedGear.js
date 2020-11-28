import create from 'zustand';

export const useCopiedGear = create((set, get) => ({
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
   getCopiedGear: () => {
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
      return equippedGear;
   },
   setCopiedGear: (gearSet) => {
      set(() => ({
         weapon: gearSet.weapon,
         shield: gearSet.shield,
         helm: gearSet.helm,
         body: gearSet.body,
         leg: gearSet.leg,
         boot: gearSet.boot,
         cape: gearSet.cape,
         glove: gearSet.glove,
         neck: gearSet.neck,
         ring: gearSet.ring,
         ammo: gearSet.ammo,
      }));
   }
}));