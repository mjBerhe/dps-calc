import create from 'zustand';

export const usePotions = create((set, get) => ({
   none: {
      type: 'none',
      value: 0,
      active: false,
      class: 'potion-unselected',
   },
   attack1: {
      type: 'attPotion',
      value: 1,
      active: false,
      class: 'potion-unselected',
   },
   attack2: {
      type: 'attPotion',
      value: 2,
      active: false,
      class: 'potion-unselected',
   },
   attack3: {
      type: 'attPotion',
      value: 3,
      active: false,
      class: 'potion-unselected',
   },
   strength1: {
      type: 'strPotion',
      value: 1,
      active: false,
      class: 'potion-unselected',
   },
   strength2: {
      type: 'strPotion',
      value: 2,
      active: false,
      class: 'potion-unselected',
   },
   strength3: {
      type: 'strPotion',
      value: 3,
      active: false,
      class: 'potion-unselected',
   },
   range1: {
      type: 'rngPotion',
      value: 1,
      active: false,
      class: 'potion-unselected',
   },
   range2: {
      type: 'rngPotion',
      value: 2,
      active: false,
      class: 'potion-unselected',
   },
   magic1: {
      type: 'magPotion',
      value: 1,
      active: false,
      class: 'potion-unselected',
   },
   magic2: {
      type: 'magPotion',
      value: 2,
      active: false,
      class: 'potion-unselected',
   },
   magic3: {
      type: 'magPotion',
      value: 3,
      active: false,
      class: 'potion-unselected',
   },
   overload1: {
      type: 'overload',
      value: 4,
      active: false,
      class: 'potion-unselected',
   },
   overload2: {
      type: 'overload',
      value: 5,
      active: false,
      class: 'potion-unselected',
   },
   overload3: {
      type: 'overload',
      value: 6,
      active: false,
      class: 'potion-unselected',
   },
   overload4: {
      type: 'overload',
      value: 7,
      active: false,
      class: 'potion-unselected',
   },
   changeAttackPotion: (potionName) => {
      const chosenPotion = get()[potionName];
      let overloadOff = false;
      const overload1 = get().overload1.active;
      const overload2 = get().overload2.active;
      const overload3 = get().overload3.active;
      const overload4 = get().overload4.active;
      if (chosenPotion.active) { // if potion is already on, turn off
         set(() => ({
            [potionName]: {
               type: chosenPotion.type,
               value: chosenPotion.value,
               active: false,
               class: 'potion-unselected',
            }
         }));
         return { type: chosenPotion.type, value: 0 }
      } else {
         if (overload1 || overload2 || overload3 || overload4) {
            overloadOff = true;
         }
         set(() => ({
            none: {
               type: 'none',
               value: 0,
               active: false,
               class: 'potion-unselected',
            },
            attack1: {
               type: 'attPotion',
               value: 1,
               active: false,
               class: 'potion-unselected',
            },
            attack2: {
               type: 'attPotion',
               value: 2,
               active: false,
               class: 'potion-unselected',
            },
            attack3: {
               type: 'attPotion',
               value: 3,
               active: false,
               class: 'potion-unselected',
            },
            overload1: {
               type: 'overload',
               value: 4,
               active: false,
               class: 'potion-unselected',
            },
            overload2: {
               type: 'overload',
               value: 5,
               active: false,
               class: 'potion-unselected',
            },
            overload3: {
               type: 'overload',
               value: 6,
               active: false,
               class: 'potion-unselected',
            },
            overload4: {
               type: 'overload',
               value: 7,
               active: false,
               class: 'potion-unselected',
            },
            [potionName]: {
               type: chosenPotion.type,
               value: chosenPotion.value,
               active: true,
               class: 'potion-selected',
            }
         }));
         return { type: chosenPotion.type, value: chosenPotion.value, overloadOff: overloadOff }
      }
   },
   changeStrengthPotion: (potionName) => {
      const chosenPotion = get()[potionName];
      let overloadOff = false;
      const overload1 = get().overload1.active;
      const overload2 = get().overload2.active;
      const overload3 = get().overload3.active;
      const overload4 = get().overload4.active;
      if (chosenPotion.active) { // if potion is already on, turn off
         set(() => ({
            [potionName]: {
               type: chosenPotion.type,
               value: chosenPotion.value,
               active: false,
               class: 'potion-unselected',
            }
         }));
         return { type: chosenPotion.type, value: 0 }
      } else {
         if (overload1 || overload2 || overload3 || overload4) {
            overloadOff = true;
         }
         set(() => ({
            none: {
               type: 'none',
               value: 0,
               active: false,
               class: 'potion-unselected',
            },
            strength1: {
               type: 'strPotion',
               value: 1,
               active: false,
               class: 'potion-unselected',
            },
            strength2: {
               type: 'strPotion',
               value: 2,
               active: false,
               class: 'potion-unselected',
            },
            strength3: {
               type: 'strPotion',
               value: 3,
               active: false,
               class: 'potion-unselected',
            },
            overload1: {
               type: 'overload',
               value: 4,
               active: false,
               class: 'potion-unselected',
            },
            overload2: {
               type: 'overload',
               value: 5,
               active: false,
               class: 'potion-unselected',
            },
            overload3: {
               type: 'overload',
               value: 6,
               active: false,
               class: 'potion-unselected',
            },
            overload4: {
               type: 'overload',
               value: 7,
               active: false,
               class: 'potion-unselected',
            },
            [potionName]: {
               type: chosenPotion.type,
               value: chosenPotion.value,
               active: true,
               class: 'potion-selected',
            }
         }));
         return { type: chosenPotion.type, value: chosenPotion.value, overloadOff: overloadOff }
      }
   },
   changeRangePotion: (potionName) => {
      const chosenPotion = get()[potionName];
      let overloadOff = false;
      const overload1 = get().overload1.active;
      const overload2 = get().overload2.active;
      const overload3 = get().overload3.active;
      const overload4 = get().overload4.active;
      if (chosenPotion.active) { // if potion is already on, turn off
         set(() => ({
            [potionName]: {
               type: chosenPotion.type,
               value: chosenPotion.value,
               active: false,
               class: 'potion-unselected',
            }
         }));
         return { type: chosenPotion.type, value: 0 }
      } else {
         if (overload1 || overload2 || overload3 || overload4) {
            overloadOff = true;
         }
         set(() => ({
            none: {
               type: 'none',
               value: 0,
               active: false,
               class: 'potion-unselected',
            },
            range1: {
               type: 'rngPotion',
               value: 1,
               active: false,
               class: 'potion-unselected',
            },
            range2: {
               type: 'rngPotion',
               value: 2,
               active: false,
               class: 'potion-unselected',
            },
            overload1: {
               type: 'overload',
               value: 4,
               active: false,
               class: 'potion-unselected',
            },
            overload2: {
               type: 'overload',
               value: 5,
               active: false,
               class: 'potion-unselected',
            },
            overload3: {
               type: 'overload',
               value: 6,
               active: false,
               class: 'potion-unselected',
            },
            overload4: {
               type: 'overload',
               value: 7,
               active: false,
               class: 'potion-unselected',
            },
            [potionName]: {
               type: chosenPotion.type,
               value: chosenPotion.value,
               active: true,
               class: 'potion-selected',
            }
         }));
         return { type: chosenPotion.type, value: chosenPotion.value, overloadOff: overloadOff }
      }
   },
   changeMagicPotion: (potionName) => {
      const chosenPotion = get()[potionName];
      let overloadOff = false;
      const overload1 = get().overload1.active;
      const overload2 = get().overload2.active;
      const overload3 = get().overload3.active;
      const overload4 = get().overload4.active;
      if (chosenPotion.active) { // if potion is already on, turn off
         set(() => ({
            [potionName]: {
               type: chosenPotion.type,
               value: chosenPotion.value,
               active: false,
               class: 'potion-unselected',
            }
         }));
         return { type: chosenPotion.type, value: 0 }
      } else {
         if (overload1 || overload2 || overload3 || overload4) {
            overloadOff = true;
         }
         set(() => ({
            none: {
               type: 'none',
               value: 0,
               active: false,
               class: 'potion-unselected',
            },
            magic1: {
               type: 'magPotion',
               value: 1,
               active: false,
               class: 'potion-unselected',
            },
            magic2: {
               type: 'magPotion',
               value: 2,
               active: false,
               class: 'potion-unselected',
            },
            magic3: {
               type: 'magPotion',
               value: 3,
               active: false,
               class: 'potion-unselected',
            },
            overload1: {
               type: 'overload',
               value: 4,
               active: false,
               class: 'potion-unselected',
            },
            overload2: {
               type: 'overload',
               value: 5,
               active: false,
               class: 'potion-unselected',
            },
            overload3: {
               type: 'overload',
               value: 6,
               active: false,
               class: 'potion-unselected',
            },
            overload4: {
               type: 'overload',
               value: 7,
               active: false,
               class: 'potion-unselected',
            },
            [potionName]: {
               type: chosenPotion.type,
               value: chosenPotion.value,
               active: true,
               class: 'potion-selected',
            }
         }));
         return { type: chosenPotion.type, value: chosenPotion.value, overloadOff: overloadOff }
      }
   },
   changeOverloadPotion: (potionName) => {
      const chosenPotion = get()[potionName];
      if (chosenPotion.active) { // if potion is already on, turn off
         set(() => ({
            [potionName]: {
               type: chosenPotion.type,
               value: chosenPotion.value,
               active: false,
               class: 'potion-unselected',
            }
         }));
         return { type: chosenPotion.type, value: 0 }
      } else {
         set(() => ({
            none: {
               type: 'none',
               value: 0,
               active: false,
               class: 'potion-unselected',
            },
            attack1: {
               type: 'attPotion',
               value: 1,
               active: false,
               class: 'potion-unselected',
            },
            attack2: {
               type: 'attPotion',
               value: 2,
               active: false,
               class: 'potion-unselected',
            },
            attack3: {
               type: 'attPotion',
               value: 3,
               active: false,
               class: 'potion-unselected',
            },
            strength1: {
               type: 'strPotion',
               value: 1,
               active: false,
               class: 'potion-unselected',
            },
            strength2: {
               type: 'strPotion',
               value: 2,
               active: false,
               class: 'potion-unselected',
            },
            strength3: {
               type: 'strPotion',
               value: 3,
               active: false,
               class: 'potion-unselected',
            },
            range1: {
               type: 'rngPotion',
               value: 1,
               active: false,
               class: 'potion-unselected',
            },
            range2: {
               type: 'rngPotion',
               value: 2,
               active: false,
               class: 'potion-unselected',
            },
            magic1: {
               type: 'magPotion',
               value: 1,
               active: false,
               class: 'potion-unselected',
            },
            magic2: {
               type: 'magPotion',
               value: 2,
               active: false,
               class: 'potion-unselected',
            },
            magic3: {
               type: 'magPotion',
               value: 3,
               active: false,
               class: 'potion-unselected',
            },
            overload1: {
               type: 'overload',
               value: 4,
               active: false,
               class: 'potion-unselected',
            },
            overload2: {
               type: 'overload',
               value: 5,
               active: false,
               class: 'potion-unselected',
            },
            overload3: {
               type: 'overload',
               value: 6,
               active: false,
               class: 'potion-unselected',
            },
            overload4: {
               type: 'overload',
               value: 7,
               active: false,
               class: 'potion-unselected',
            },
            [potionName]: {
               type: chosenPotion.type,
               value: chosenPotion.value,
               active: true,
               class: 'potion-selected',
            }
         }));
         return { type: chosenPotion.type, value: chosenPotion.value }
      }
   },
}));