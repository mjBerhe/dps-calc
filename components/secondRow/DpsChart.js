import { useEffect } from 'react';
import shallow from 'zustand/shallow';
import { useLists } from '../../state/lists';
import { useUserStats } from '../../state/userStats';
import { useUserStats2 } from '../../state/userStats2';
import { useFinalStats } from '../../state/finalStats';
import { useFinalStats2 } from '../../state/finalStats2';
import roundNumber from '../../formulas/roundNumber';

const DpsChart = () => {

   const currentMonster = useLists(state => state.currentMonster);

   const { attType, isSpecialAttack } = useUserStats(state => ({
      attType: state.attType,
      isSpecialAttack: state.isSpecialAttack,
   }), shallow);

   const { attType2, isSpecialAttack2 } = useUserStats2(state => ({
      attType2: state.attType,
      isSpecialAttack2: state.isSpecialAttack,
   }), shallow);

   const { maxHit, accuracy, dps, specMaxHit, specAccuracy } = useFinalStats(state => ({
      maxHit: state.maxHit,
      accuracy: state.accuracy,
      dps: state.dps,
      specMaxHit: state.specMaxHit,
      specAccuracy: state.specAccuracy,
   }), shallow);

   const { maxHit2, accuracy2, dps2 } = useFinalStats2(state => ({
      maxHit2: state.maxHit,
      accuracy2: state.accuracy,
      dps2: state.dps,
   }), shallow);

   const outputStat1 = (stat) => { // can be either accuracy or dps
      if (attType && currentMonster) {
         if (attType === 'magic' && stat === dps && !dps) { // want to do more testing
            return 'Select a Spell'
         } else {
            if (stat === accuracy) {
               return roundNumber(stat, 2)
            } else return roundNumber(stat, 4)
         }
      } else if (attType && !currentMonster) {
         return 'Select Monster'
      } else if (!attType && currentMonster) {
         return 'Select Attack Style'
      } else if (!attType && !currentMonster) {
         return 'Select Attack Style'
      }
   }

   const outputStat2 = (stat) => {
      if (attType2 && currentMonster) {
         if (attType2 === 'magic' && stat === dps2 && !dps2) {
            return 'Select a Spell'
         } else {
            if (stat === accuracy2) {
               return roundNumber(stat, 2)
            } else return roundNumber(stat, 4)
         }
      } else if (attType2 && !currentMonster) {
         return 'Select Monster'
      } else if (!attType2 && currentMonster) {
         return 'Select Attack Style'
      } else if (!attType2 && !currentMonster) {
         return 'Select Attack Style'
      }
   }

   const outputMaxhit1 = () => {
      if (attType === 'magic' && !maxHit) {
         return 'Select a Spell'
      } else {
         return maxHit
      }
   }

   const outputMaxhit2 = () => {
      if (attType2 === 'magic' && !maxHit2) {
         return 'Select a Spell'
      } else {
         return maxHit2
      }
   }


   return (
      <div className='r2-c2-stats'>
         <table className='r2-c2-table'>
            {isSpecialAttack && isSpecialAttack2 && 
               <tbody>
                  <tr>
                     <th>Armor Set</th>
                     <td>Set 1</td>
                     <td>Set 2</td>
                  </tr>
                  <tr>
                     <th>Spec Max Hit</th>
                     <td>{specMaxHit}</td>
                     <td>Spec Max Hit 2</td>
                  </tr>
                  <tr>
                     <th>Spec Accuracy</th>
                     <td>{specAccuracy}%</td>
                     <td>Spec Accuracy 2</td>
                  </tr>
               </tbody>
            }
            {!isSpecialAttack && !isSpecialAttack2 &&
               <tbody>
                  <tr>
                     <th>Armor Set</th>
                     <td>Set 1</td>
                     <td>Set 2</td>
                  </tr>
                  <tr>
                     <th>Max Hit</th>
                     <td>{outputMaxhit1()}</td>
                     <td>{outputMaxhit2()}</td>
                  </tr>
                  <tr>
                     <th>Accuracy</th>
                     <td>{outputStat1(accuracy)}%</td>
                     <td>{outputStat2(accuracy2)}%</td>
                  </tr>
                  <tr>
                     <th>DPS</th>
                     <td>{outputStat1(dps)}</td>
                     <td>{outputStat2(dps2)}</td>
                  </tr>
               </tbody>
            }
         </table>
      </div>
   )
}

export default DpsChart;