import create from 'zustand';

export const usePrayers = create((set, get) => ({
   attack1: {
      type: 'attPrayer',
      value: 1,
      active: false,
      class: 'prayer-item-off',
   },
   attack2: {
      type: 'attPrayer',
      value: 2,
      active: false,
      class: 'prayer-item-off',
   },
   attack3: {
      type: 'attPrayer',
      value: 3,
      active: false,
      class: 'prayer-item-off',
   },
   strength1: {
      type: 'strPrayer',
      value: 1,
      active: false,
      class: 'prayer-item-off',
   },
   strength2: {
      type: 'strPrayer',
      value: 2,
      active: false,
      class: 'prayer-item-off',
   },
   strength3: {
      type: 'strPrayer',
      value: 3,
      active: false,
      class: 'prayer-item-off',
   },
   chivalry: {
      type: 'specialPrayer',
      value: 4,
      active: false,
      class: 'prayer-item-off',
   },
   piety: {
      type: 'specialPrayer',
      value: 5,
      active: false,
      class: 'prayer-item-off',
   },
   range1: {
      type: 'rngPrayer',
      value: 1,
      active: false,
      class: 'prayer-item-off',
   },
   range2: {
      type: 'rngPrayer',
      value: 2,
      active: false,
      class: 'prayer-item-off',
   },
   range3: {
      type: 'rngPrayer',
      value: 3,
      active: false,
      class: 'prayer-item-off',
   },
   range4: {
      type: 'rngPrayer',
      value: 4,
      active: false,
      class: 'prayer-item-off',
   },
   magic1: {
      type: 'magPrayer',
      value: 1,
      active: false,
      class: 'prayer-item-off',
   },
   magic2: {
      type: 'magPrayer',
      value: 2,
      active: false,
      class: 'prayer-item-off',
   },
   magic3: {
      type: 'magPrayer',
      value: 3,
      active: false,
      class: 'prayer-item-off',
   },
   magic4: {
      type: 'magPrayer',
      value: 4,
      active: false,
      class: 'prayer-item-off',
   },
   changeAttackPrayer: (prayerName) => {
      const chosenPrayer = get()[prayerName];
      let specialPrayerDeactivated = false;
      const chivalry = get().chivalry.active;
      const piety = get().piety.active;
      if (chosenPrayer.active) { // if prayer is already on, turn it off
         set(() => ({
            [prayerName]: {
               type: chosenPrayer.type,
               value: chosenPrayer.value,
               active: false,
               class: 'prayer-item-off',
            }
         }));
         return { type: chosenPrayer.type, value: 0 }
      } else { // turn every other similar prayer off, and turn chosen prayer on
         if (chivalry || piety) { // if chivalry or piety was just active
            specialPrayerDeactivated = true; // keep track that it was deactivated
         }
         set(() => ({
            attack1: {
               type: 'attPrayer',
               value: 1,
               active: false,
               class: 'prayer-item-off',
            },
            attack2: {
               type: 'attPrayer',
               value: 2,
               active: false,
               class: 'prayer-item-off',
            },
            attack3: {
               type: 'attPrayer',
               value: 3,
               active: false,
               class: 'prayer-item-off',
            },
            chivalry: {
               type: 'specialPrayer',
               value: 4,
               active: false,
               class: 'prayer-item-off',
            },
            piety: {
               type: 'specialPrayer',
               value: 5,
               active: false,
               class: 'prayer-item-off',
            },
            [prayerName]: {
               type: chosenPrayer.type,
               value: chosenPrayer.value,
               active: true,
               class: 'prayer-item-on',
            }
         }));
         return { type: chosenPrayer.type, value: chosenPrayer.value, specialPrayerDeactivated: specialPrayerDeactivated }
      }
   },
   changeStrengthPrayer: (prayerName) => {
      const chosenPrayer = get()[prayerName];
      let specialPrayerDeactivated = false;
      const chivalry = get().chivalry.active;
      const piety = get().piety.active;

      if (chosenPrayer.active) { // if prayer is already on, turn it off
         set(() => ({
            [prayerName]: {
               type: chosenPrayer.type,
               value: chosenPrayer.value,
               active: false,
               class: 'prayer-item-off',
            }
         }));
         return { type: chosenPrayer.type, value: 0 }
      } else { // turn every other similar prayer off, and turn chosen prayer on
         if (chivalry || piety) { // if chivalry or piety was just active
            specialPrayerDeactivated = true; // keep track that it was deactivated
         }
         set(() => ({
            strength1: {
               type: 'strPrayer',
               value: 1,
               active: false,
               class: 'prayer-item-off',
            },
            strength2: {
               type: 'strPrayer',
               value: 2,
               active: false,
               class: 'prayer-item-off',
            },
            strength3: {
               type: 'strPrayer',
               value: 3,
               active: false,
               class: 'prayer-item-off',
            },
            chivalry: {
               type: 'specialPrayer',
               value: 4,
               active: false,
               class: 'prayer-item-off',
            },
            piety: {
               type: 'specialPrayer',
               value: 5,
               active: false,
               class: 'prayer-item-off',
            },
            [prayerName]: {
               type: chosenPrayer.type,
               value: chosenPrayer.value,
               active: true,
               class: 'prayer-item-on',
            }
         }));
         return { type: chosenPrayer.type, value: chosenPrayer.value, specialPrayerDeactivated: specialPrayerDeactivated }
      }
   },
   changeSpecialPrayer: (prayerName) => {
      const chosenPrayer = get()[prayerName];
      if (chosenPrayer.active) { // if prayer is already on, turn it off
         set(() => ({
            [prayerName]: {
               type: chosenPrayer.type,
               value: chosenPrayer.value,
               active: false,
               class: 'prayer-item-off',
            }
         }));
         return { type: chosenPrayer.type, value: 0 }
      } else { // turn every other similar prayer off, and turn chosen prayer on
         set(() => ({
            attack1: {
               type: 'attPrayer',
               value: 1,
               active: false,
               class: 'prayer-item-off',
            },
            attack2: {
               type: 'attPrayer',
               value: 2,
               active: false,
               class: 'prayer-item-off',
            },
            attack3: {
               type: 'attPrayer',
               value: 3,
               active: false,
               class: 'prayer-item-off',
            },
            strength1: {
               type: 'strPrayer',
               value: 1,
               active: false,
               class: 'prayer-item-off',
            },
            strength2: {
               type: 'strPrayer',
               value: 2,
               active: false,
               class: 'prayer-item-off',
            },
            strength3: {
               type: 'strPrayer',
               value: 3,
               active: false,
               class: 'prayer-item-off',
            },
            chivalry: {
               type: 'specialPrayer',
               value: 4,
               active: false,
               class: 'prayer-item-off',
            },
            piety: {
               type: 'specialPrayer',
               value: 5,
               active: false,
               class: 'prayer-item-off',
            },
            [prayerName]: {
               type: chosenPrayer.type,
               value: chosenPrayer.value,
               active: true,
               class: 'prayer-item-on',
            }
         }));
         return { type: chosenPrayer.type, value: chosenPrayer.value }
      }
   },
   changeRangePrayer: (prayerName) => {
      const chosenPrayer = get()[prayerName];
      if (chosenPrayer.active) { // if prayer is already on, turn it off
         set(() => ({
            [prayerName]: {
               type: chosenPrayer.type,
               value: chosenPrayer.value,
               active: false,
               class: 'prayer-item-off',
            }
         }));
         return { type: chosenPrayer.type, value: 0 }
      } else { // turn every other similar prayer off, and turn chosen prayer on
         set(() => ({
            range1: {
               type: 'rngPrayer',
               value: 1,
               active: false,
               class: 'prayer-item-off',
            },
            range2: {
               type: 'rngPrayer',
               value: 2,
               active: false,
               class: 'prayer-item-off',
            },
            range3: {
               type: 'rngPrayer',
               value: 3,
               active: false,
               class: 'prayer-item-off',
            },
            range4: {
               type: 'rngPrayer',
               value: 4,
               active: false,
               class: 'prayer-item-off',
            },
            [prayerName]: {
               type: chosenPrayer.type,
               value: chosenPrayer.value,
               active: true,
               class: 'prayer-item-on',
            }
         }));
         return { type: chosenPrayer.type, value: chosenPrayer.value }
      }
   },
   changeMagicPrayer: (prayerName) => {
      const chosenPrayer = get()[prayerName];
      if (chosenPrayer.active) { // if prayer is already on, turn it off
         set(() => ({
            [prayerName]: {
               type: chosenPrayer.type,
               value: chosenPrayer.value,
               active: false,
               class: 'prayer-item-off',
            }
         }));
         return { type: chosenPrayer.type, value: 0 }
      } else { // turn every other similar prayer off, and turn chosen prayer on
         set(() => ({
            magic1: {
               type: 'magPrayer',
               value: 1,
               active: false,
               class: 'prayer-item-off',
            },
            magic2: {
               type: 'magPrayer',
               value: 2,
               active: false,
               class: 'prayer-item-off',
            },
            magic3: {
               type: 'magPrayer',
               value: 3,
               active: false,
               class: 'prayer-item-off',
            },
            magic4: {
               type: 'magPrayer',
               value: 4,
               active: false,
               class: 'prayer-item-off',
            },
            [prayerName]: {
               type: chosenPrayer.type,
               value: chosenPrayer.value,
               active: true,
               class: 'prayer-item-on',
            }
         }));
         return { type: chosenPrayer.type, value: chosenPrayer.value }
      }
   },
}))