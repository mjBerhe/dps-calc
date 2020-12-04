import { useEffect } from 'react'
import { useLists } from '../../../state/lists';
import useHover from '../../../hooks/useHover';

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

   const [ref, hovered] = useHover();

   return (
      <div className='dwh-spec-container'>
         <img src="/Misc/DWH.png" alt="dragon warhammer" ref={ref}/>
         <input type="number" onChange={handleChange}/>
         {hovered && <h5 className='utility-hover'>DWH Spec's Hit</h5>}
      </div>
   );
}

export default DWHSpec;