import { useEffect } from 'react';
import shallow from 'zustand/shallow';
import { useLists } from '../../../state/lists';
import { useUserStats } from '../../../state/userStats';
import { useUserStats2 } from '../../../state/userStats2';
import { useFinalStats } from '../../../state/finalStats';
import { useFinalStats2 } from '../../../state/finalStats2';
import roundNumber from '../../../formulas/roundNumber';

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

   const { maxHit2, accuracy2, dps2, specMaxHit2, specAccuracy2 } = useFinalStats2(state => ({
      maxHit2: state.maxHit,
      accuracy2: state.accuracy,
      dps2: state.dps,
      specMaxHit2: state.specMaxHit,
      specAccuracy2: state.specAccuracy,
   }), shallow);

   const outputStat1 = (stat) => { // can be either accuracy or dps
      if (attType && currentMonster) {
         if (attType === 'magic' && stat === dps && !dps) { // want to do more testing
            return <td>Select a Spell</td>
         } else {
            if (stat === accuracy) {
               if (accuracy > accuracy2) {
                  return <td><h3>{roundNumber(stat, 2)}%</h3></td>
               } else return <td>{roundNumber(stat, 2)}%</td>
            } else {
               if (dps > dps2) {
               return <td><h3>{roundNumber(stat, 4)}</h3></td>
               } else return <td>{roundNumber(stat, 4)}</td>
            }
         }
      } else if (attType && !currentMonster) {
         return <td>Select Monster</td>
      } else if (!attType && currentMonster) {
         return <td>Select Attack Style</td>
      } else if (!attType && !currentMonster) {
         return <td>Select Attack Style</td>
      }
   }

   const outputStat2 = (stat) => {
      if (attType2 && currentMonster) {
         if (attType2 === 'magic' && stat === dps2 && !dps2) {
            return <td>Select a Spell</td>
         } else {
            if (stat === accuracy2) {
               if (accuracy2 > accuracy) {
                  return <td><h3>{roundNumber(stat, 2)}%</h3></td>
               } else return <td>{roundNumber(stat, 2)}%</td>
            } else {
               if (dps2 > dps) {
               return <td><h3>{roundNumber(stat, 4)}</h3></td>
               } else return <td>{roundNumber(stat, 4)}</td>
            }
         }
      } else if (attType2 && !currentMonster) {
         return <td>Select Monster</td>
      } else if (!attType2 && currentMonster) {
         return <td>Select Attack Style</td>
      } else if (!attType2 && !currentMonster) {
         return <td>Select Attack Style</td>
      }
   }

   const outputMaxHit1 = () => {
      if (attType === 'magic' && !maxHit) { // must choose a spell
         return <td>Select a Spell</td>
      } else {
         if (maxHit > maxHit2) {
            return <td><h3>{maxHit}</h3></td>
         } else return <td>{maxHit}</td>
      }
   }

   const outputMaxHit2 = () => {
      if (attType2 === 'magic' && !maxHit2) {
         return <td>Select a Spell</td>
      } else {
         if (maxHit2 > maxHit) {
            return <td><h3>{maxHit2}</h3></td>
         } else return <td>{maxHit2}</td>
      }
   }

   const outputSpecMaxHit1 = () => {
      if (attType === 'magic' && !specMaxHit) {
         return <td>Select a Spell</td>
      } else {
         if (specMaxHit > specMaxHit2) {
            return <td><h3>{specMaxHit}</h3></td>
         } else return <td>{specMaxHit}</td>
      }
   }

   const outputSpecMaxHit2 = () => {
      if (attType === 'magic' && !specMaxHit) {
         return <td>Select a Spell</td>
      } else {
         if (specMaxHit2 > specMaxHit) {
            return <td><h3>{specMaxHit2}</h3></td>
         } else return <td>{specMaxHit2}</td>
      }
   }

   const outputSpecAccuracy1 = (stat) => {
      if (attType && currentMonster) {
         if (specAccuracy > specAccuracy2) {
            return <td><h3>{roundNumber(stat, 2)}%</h3></td>
         } else return <td>{roundNumber(stat, 2)}%</td>
      } else if (attType && !currentMonster) {
         return <td>Select Monster</td>
      } else if (!attType && currentMonster) {
         return <td>Select Attack Style</td>
      } else if (!attType && !currentMonster) {
         return <td>Select Attack Style</td>
      }
   }

   const outputSpecAccuracy2 = (stat) => {
      if (attType && currentMonster) {
         if (specAccuracy2 > specAccuracy) {
            return <td><h3>{roundNumber(stat, 2)}%</h3></td>
         } else return <td>{roundNumber(stat, 2)}%</td>
      } else if (attType && !currentMonster) {
         return <td>Select Monster</td>
      } else if (!attType && currentMonster) {
         return <td>Select Attack Style</td>
      } else if (!attType && !currentMonster) {
         return <td>Select Attack Style</td>
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
                        {outputSpecMaxHit1()}
                        {outputSpecMaxHit2()}
                  </tr>
                  <tr>
                     <th>Spec Accuracy</th>
                        {outputSpecAccuracy1(specAccuracy)}
                        {outputSpecAccuracy2(specAccuracy2)}
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
                     {outputMaxHit1()}
                     {outputMaxHit2()}
                  </tr>
                  <tr>
                     <th>Accuracy</th>
                     {outputStat1(accuracy)}
                     {outputStat2(accuracy2)}
                  </tr>
                  <tr>
                     <th>DPS</th>
                     {outputStat1(dps)}
                     {outputStat2(dps2)}
                  </tr>
               </tbody>
            }
         </table>
      </div>
   )
}

export default DpsChart;