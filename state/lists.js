import create from 'zustand';

export const useLists = create((set, get) => ({
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
   monsters: null,
   currentMonster: null,
   currentMonsterCopy: null,
   isDemon: false,
   isDragon: false,
   isLeafy: false,
   isUndead: false,
   isVampyre: false,
   listCount: 0,
   setLists: (lists) => {
      set(() => ({
         weapon: lists[0],
         shield: lists[1],
         helm: lists[2],
         body: lists[3],
         leg: lists[4],
         boot: lists[5],
         cape: lists[6],
         glove: lists[7],
         neck: lists[8],
         ring: lists[9],
         ammo: lists[10],
         monsters: lists[11],
      }));
   },
   findEquipment: (equipType, id) => {
      const equipList = get()[equipType];
      const foundItem = equipList.find(item => item.id === id);
      return foundItem;
   },
   // setCurrentMonster: (monsterID) => {
   //    const monsterList = get().monsters;
   //    const foundMonster = monsterList.find(monster => monster.id === monsterID);
   //    set(() => ({
   //       currentMonster: foundMonster,
   //       listCount: get().listCount + 1,
   //    }));
   // },
   setNewMonster: (monsterObject) => {
      set(() => ({
         currentMonster: monsterObject,
         currentMonsterCopy: monsterObject,
         listCount: get().listCount + 1,
      }));
   },
   setTempMonster: (monsterObject) => { // used when temp changing monsters stats
      set(() => ({
         currentMonster: monsterObject,
         listCount: get().listCount + 1,
      }));
   },
   checkDemon: () => {
      const currentMonster = get().currentMonster;
      if (currentMonster) {
         if (currentMonster.attributes.includes('demon')) {
            set(() => ({
               isDemon: true,
            }));
         } else {
            set(() => ({
               isDemon: false,
            }));
         }
      }
   },
   checkDragon: () => {
      const currentMonster = get().currentMonster;
      if (currentMonster) {
         if (currentMonster.attributes.includes('dragon')) {
            set(() => ({
               isDragon: true,
            }));
         } else {
            set(() => ({
               isDragon: false,
            }));
         }
      }
   },
   checkLeafy: () => {
      const currentMonster = get().currentMonster;
      if (currentMonster) {
         if (currentMonster.attributes.includes('leafy')) {
            set(() => ({
               isLeafy: true,
            }));
         } else {
            set(() => ({
               isLeafy: false,
            }));
         }
      }
   },
   checkUndead: () => {
      const currentMonster = get().currentMonster;
      if (currentMonster) {
         if (currentMonster.attributes.includes('undead')) {
            set(() => ({
               isUndead: true,
            }));
         } else {
            set(() => ({
               isUndead: false,
            }));
         }
      }
   },
   checkVampyre: () => {
      const currentMonster = get().currentMonster;
      if (currentMonster) {
         if (currentMonster.attributes.includes('vampyre')) {
            set(() => ({
               isVampyre: true,
            }));
            console.log('vampyre active')
         } else {
            set(() => ({
               isVampyre: false,
            }));
         }
      }
   },
}));