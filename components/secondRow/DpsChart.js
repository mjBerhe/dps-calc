import { useEffect } from 'react';
import shallow from 'zustand/shallow';
import { useFinalStats } from '../../state/finalStats';
import { useFinalStats2 } from '../../state/finalStats2';
import calcHitChance from '../../formulas/accuracy';

const DpsChart = () => {

   const { setFinalStat } = useFinalStats();
   const { maxAttRoll, maxDefRoll, maxHit, accuracy, attSpeed, dps } = useFinalStats(state => ({
      maxAttRoll: state.maxAttRoll,
      maxDefRoll: state.maxDefRoll,
      maxHit: state.maxHit,
      accuracy: state.accuracy,
      attSpeed: state.attSpeed,
      dps: state.dps,
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

   return (
      <div className='r2-c2-stats'>
         <table className='r2-c2-table'>
            <tr>
               <th>Armor Set</th>
               <td>Set 1</td>
               <td>Set 2</td>
            </tr>
            <tr>
               <th>Max Hit</th>
               <td>{maxHit}</td>
               <td>{maxHit2}</td>
            </tr>
            <tr>
               <th>Accuracy</th>
               <td>{accuracy}</td>
               <td>{accuracy2}</td>
            </tr>
            <tr>
               <th>DPS</th>
               <td>{dps}</td>
               <td>{dps2}</td>
            </tr>
         </table>
      </div>
   )
}

export default DpsChart;