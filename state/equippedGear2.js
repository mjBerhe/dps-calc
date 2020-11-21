import create from 'zustand';

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
}));