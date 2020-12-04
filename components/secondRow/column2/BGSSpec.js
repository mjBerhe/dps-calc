import { useEffect } from 'react'
import { useLists } from '../../../state/lists';
import useHover from '../../../hooks/useHover';

const BGSSpec = () => {

   const { setTempMonster } = useLists();
   const currentMonsterCopy = useLists(state => state.currentMonsterCopy);

   const handleChange = (e) => {
      const specAmount = parseInt(e.target.value, 10);
      // console.log(specAmount);

      if (currentMonsterCopy && specAmount) {
         if (currentMonsterCopy.stats.defLvl >= specAmount) {
            setTempMonster({
               ...currentMonsterCopy,
               stats: {
                  ...currentMonsterCopy.stats,
                  defLvl: currentMonsterCopy.stats.defLvl - specAmount,
               },
            });
         } else {
            setTempMonster({
               ...currentMonsterCopy,
               stats: {
                  ...currentMonsterCopy.stats,
                  defLvl: 0,
               }
            });
         }
      } else if (currentMonsterCopy && !specAmount) {
         setTempMonster(currentMonsterCopy);
      }
   }

   const [ref, hovered] = useHover();
   
   return (
      <div className='bgs-spec-container'>
         <img src="/Misc/BGS.png" alt="bandos godsword" ref={ref}/>
         <input type="number" onChange={handleChange}/>
         {hovered && <h5 className='utility-hover'>BGS Spec Dmg</h5>}
      </div>
   );
}

export default BGSSpec;