import { useEffect } from 'react'
import { useLists } from '../../state/lists';

const DWHSpec = () => {

   const { setTempMonster } = useLists();
   const currentMonsterCopy = useLists(state => state.currentMonsterCopy);

   const handleChange = (e) => {
      const specAmount = parseInt(e.target.value, 10);
      // console.log(specAmount);

      if (currentMonsterCopy && specAmount) {
         setTempMonster({
            ...currentMonsterCopy,
            stats: {
               ...currentMonsterCopy.stats,
               defLvl: currentMonsterCopy.stats.defLvl*(0.7**specAmount),
            },
         });
      } else if (currentMonsterCopy && !specAmount) {
         setTempMonster(currentMonsterCopy);
      }
   }

   return (
      <div className='dwh-spec-container'>
         <img src="/Misc/DWH.png" alt="dragon warhammer"/>
         <input type="number" onChange={handleChange}/>
      </div>
   );
}

export default DWHSpec;