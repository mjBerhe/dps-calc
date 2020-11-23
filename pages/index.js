import { useEffect } from 'react';
import { connectToDatabase } from '../util/mongoDB.js';
import Head from 'next/head'
import { useUserStats } from '../state/userStats.js';
import { useLists } from '../state/lists.js';

import Header from '../components/firstRow/Header';
import LvlInputs from '../components/secondRow/LvlInputs';
import PrayerSelect from '../components/secondRow/PrayerSelect';
import PotionSelect from '../components/secondRow/PotionSelect';

import { SelectMonster } from '../components/secondRow/SelectMonster';
import { SelectWeapon } from '../components/thirdRow/SelectEquipment/SelectWeapon';
import { SelectWeaponStyle } from '../components/thirdRow/SelectEquipment/SelectAttackStyle';


export default function DpsCalc({ lists }) {

   const { setLists } = useLists();

   // initial fetch of all equipment + monster lists
   useEffect(() => {
      setLists(lists);
   }, [])

   useEffect(() => {
      console.log(lists[1])
   }, [lists])

   // if (isConnected) {
   //    console.log('connected to db')
   // } else console.log('not connected to db')

   return (
      <div className='grid-container'>
         <Header/>

         <div className='r2-container'>
            <div className="r2-first-column">
               <h2 className='r2-c1-header'>Stats & Boosts</h2>
               <LvlInputs/>
               <PrayerSelect/>
               <PotionSelect/>
            </div>
            <div className="r2-second-column">
               <h2 className='r2-c2-header'>Armor Set 1 vs Armor Set 2</h2>
               {/* <SelectMonster/> */}
            </div>
         </div>

         <div className='r3-container'>
            <div className='equipment-select'>
              <SelectWeapon/>
              <SelectWeaponStyle/>
            </div>
         </div>
      </div>
   );
}

// export async function getServerSideProps(context) {
//    const { client } = await connectToDatabase()
 
//    const isConnected = await client.isConnected() // Returns true or false
 
//    return {
//       props: { isConnected },
//    }
// }

// export async function getStaticProps() {
//    // connect to database
//    const { db } = await connectToDatabase();

//    const weapons = await db.collection('weapons').find().sort({ name: 1 }).toArray();
//    const shields = await db.collection('shields').find().sort({ name: 1 }).toArray();
//    const helmets = await db.collection('helmets').find().sort({ name: 1 }).toArray();
//    const chests = await db.collection('chests').find().sort({ name: 1 }).toArray();
//    const legs = await db.collection('legs').find().sort({ name: 1 }).toArray();
//    const boots = await db.collection('boots').find().sort({ name: 1 }).toArray();
//    const capes = await db.collection('capes').find().sort({ name: 1 }).toArray();
//    const gloves = await db.collection('gloves').find().sort({ name: 1 }).toArray();
//    const necklaces = await db.collection('necklaces').find().sort({ name: 1 }).toArray();
//    const rings = await db.collection('rings').find().sort({ name: 1 }).toArray();
//    const ammos = await db.collection('ammos').find().sort({ name: 1 }).toArray();
//    const monsters = await db.collection('monsters').find().sort({ name: 1 }).toArray();

//    return {
//       props: {
//          lists: [
//             JSON.parse(JSON.stringify(weapons)),
//             JSON.parse(JSON.stringify(shields)),
//             JSON.parse(JSON.stringify(helmets)),
//             JSON.parse(JSON.stringify(chests)),
//             JSON.parse(JSON.stringify(legs)),
//             JSON.parse(JSON.stringify(boots)),
//             JSON.parse(JSON.stringify(capes)),
//             JSON.parse(JSON.stringify(gloves)),
//             JSON.parse(JSON.stringify(necklaces)),
//             JSON.parse(JSON.stringify(rings)),
//             JSON.parse(JSON.stringify(ammos)),
//             JSON.parse(JSON.stringify(monsters)),
//          ]
//       },
//    };
// };

export async function getServerSideProps() {
   // connect to database
   const { db } = await connectToDatabase();

   const weapons = await db.collection('weapons').find().sort({ name: 1 }).limit(100).toArray();
   // const shields = await db.collection('shields').find().sort({ name: 1 }).toArray();
   // const helmets = await db.collection('helmets').find().sort({ name: 1 }).toArray();
   // const chests = await db.collection('chests').find().sort({ name: 1 }).toArray();
   // const legs = await db.collection('legs').find().sort({ name: 1 }).toArray();
   // const boots = await db.collection('boots').find().sort({ name: 1 }).toArray();
   // const capes = await db.collection('capes').find().sort({ name: 1 }).toArray();
   // const gloves = await db.collection('gloves').find().sort({ name: 1 }).toArray();
   // const necklaces = await db.collection('necklaces').find().sort({ name: 1 }).toArray();
   // const rings = await db.collection('rings').find().sort({ name: 1 }).toArray();
   // const ammos = await db.collection('ammos').find().sort({ name: 1 }).toArray();
   const monsters = await db.collection('monsters').find().sort({ name: 1 }).limit(100).toArray();

   return {
      props: {
         lists: [
            JSON.parse(JSON.stringify(weapons)),
            // JSON.parse(JSON.stringify(shields)),
            // JSON.parse(JSON.stringify(helmets)),
            // JSON.parse(JSON.stringify(chests)),
            // JSON.parse(JSON.stringify(legs)),
            // JSON.parse(JSON.stringify(boots)),
            // JSON.parse(JSON.stringify(capes)),
            // JSON.parse(JSON.stringify(gloves)),
            // JSON.parse(JSON.stringify(necklaces)),
            // JSON.parse(JSON.stringify(rings)),
            // JSON.parse(JSON.stringify(ammos)),
            JSON.parse(JSON.stringify(monsters)),
         ]
      },
   };
};
