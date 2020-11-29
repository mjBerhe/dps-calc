import { useEffect } from 'react';
import shallow from 'zustand/shallow';
import { useLists } from '../../state/lists';
import { useUserStats } from '../../state/userStats';
import { useUserStats2 } from '../../state/userStats2';
import { useFinalStats } from '../../state/finalStats';
import { useFinalStats2 } from '../../state/finalStats2';
import calcHitChance from '../../formulas/accuracy';

const DpsChart = () => {

   const currentMonster = useLists(state => state.currentMonster);
   const attType = useUserStats(state => state.attType);
   const attType2 = useUserStats2(state => state.attType);

   const { setFinalStat } = useFinalStats();
   const { maxAttRoll, maxDefRoll, maxHit, accuracy, attSpeed, dps, effectiveAttLvl } = useFinalStats(state => ({
      maxAttRoll: state.maxAttRoll,
      maxDefRoll: state.maxDefRoll,
      maxHit: state.maxHit,
      accuracy: state.accuracy,
      attSpeed: state.attSpeed,
      dps: state.dps,
      effectiveAttLvl: state.effectiveAttLvl,
   }), shallow);

   const { setFinalStat2 } = useFinalStats2();
   const { maxAttRoll2, maxDefRoll2, maxHit2, accuracy2, attSpeed2, dps2 } = useFinalStats2(state => ({
      maxAttRoll2: state.maxAttRoll,
      maxDefRoll2: state.maxDefRoll,
      maxHit2: state.maxHit,
      accuracy2: state.accuracy,
      attSpeed2: state.attSpeed,
      dps2: state.dps,
   }), shallow);

   useEffect(() => { // runs whenever maxAttRoll or maxDefRoll changes
      const tempAccuracy = calcHitChance(maxAttRoll, maxDefRoll);
      setFinalStat('accuracy', tempAccuracy);
   }, [maxAttRoll, maxDefRoll]);

   useEffect(() => { // runs whenver accuracy or maxHit or attSpeed changes
      const tempDps = (accuracy * (maxHit/2)) / (attSpeed*0.6);
      setFinalStat('dps', tempDps);
   }, [accuracy, maxHit, attSpeed]);

   useEffect(() => { // runs whenever maxAttRoll or maxDefRoll changes
      const tempAccuracy2 = calcHitChance(maxAttRoll2, maxDefRoll2);
      setFinalStat2('accuracy', tempAccuracy2);
   }, [maxAttRoll2, maxDefRoll2]);

   useEffect(() => { // runs whenver accuracy or maxHit or attSpeed changes
      const tempDps2 = (accuracy2 * (maxHit2/2)) / (attSpeed2*0.6);
      setFinalStat2('dps', tempDps2);
   }, [accuracy2, maxHit2, attSpeed2]);

   useEffect(() => {
      // console.log(`effectiveAttLvl: ${effectiveAttLvl}`);
      // console.log(`maxDefRoll: ${maxDefRoll}`);
      console.log(`attType: ${attType}`);
   }, [effectiveAttLvl, maxAttRoll, maxDefRoll,  dps]);

   const outputStat1 = (stat) => {
      if (attType && currentMonster) {
         if (attType === 'magic' && stat === dps && !dps) { // want to do more testing
            return <td>Select a Spell</td>
         } else return <td>{stat}</td>
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
         } else return <td>{stat}</td>
      } else if (attType2 && !currentMonster) {
         return <td>Select Monster</td>
      } else if (!attType2 && currentMonster) {
         return <td>Select Attack Style</td>
      } else if (!attType2 && !currentMonster) {
         return <td>Select Attack Style</td>
      }
   }

   const outputMaxhit1 = () => {
      if (attType === 'magic' && !maxHit) {
         return <td>Select a Spell</td>
      } else {
         return <td>{maxHit}</td>
      }
   }

   const outputMaxhit2 = () => {
      if (attType2 === 'magic' && !maxHit2) {
         return <td>Select a Spell</td>
      } else {
         return <td>{maxHit2}</td>
      }
   }

   return (
      <div className='r2-c2-stats'>
         <table className='r2-c2-table'>
            <tbody>
               <tr>
                  <th>Armor Set</th>
                  <td>Set 1</td>
                  <td>Set 2</td>
               </tr>
               <tr>
                  <th>Max Hit</th>
                  {outputMaxhit1()}
                  {outputMaxhit2()}
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
         </table>
      </div>
   )
}

export default DpsChart;