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
   setLists: (lists) => {
      set(() => ({
         weapon: lists[0],
         // shield: lists[1],
         // helm: lists[2],
         // body: lists[3],
         // leg: lists[4],
         // boot: lists[5],
         // cape: lists[6],
         // glove: lists[7],
         // neck: lists[8],
         // ring: lists[9],
         // ammo: lists[10],
         monsters: lists[1],
      }));
   },
   findEquipment: (equipType, id) => {
      const equipList = get()[equipType];
      const foundItem = equipList.find(item => item.id === id);
      return foundItem;
   },
   setCurrentMonster: (monsterID) => {
      const monsterList = get().monsters;
      const foundMonster = monsterList.find(monster => monster.id === monsterID);
      set(() => ({
         currentMonster: foundMonster,
      }));
   }
}));