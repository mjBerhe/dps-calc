import { useEffect, useRef } from 'react';
import { connectToDatabase } from '../util/mongoDB.js';
import Head from 'next/head'

import { useLists } from '../state/lists.js';

import Header from '../components/firstRow/Header';
import Set1Calculations from '../components/Set1Calculations';
import Set2Calculations from '../components/Set2Calculations';

import HeaderR2C1 from '../components/secondRow/column1/HeaderR2C1';
import LvlInputs from '../components/secondRow/column1/LvlInputs';
import PrayerSelect from '../components/secondRow/column1/PrayerSelect';
import PotionSelect from '../components/secondRow/column1/PotionSelect';
import HeaderR2C2 from '../components/secondRow/column2/HeaderR2C2';
import DpsChart from '../components/secondRow/column2/DpsChart';
import { SelectMonster } from '../components/secondRow/column2/SelectMonster';
import Utilities from '../components/secondRow/column2/Utilities';

import EquipmentSelect from '../components/thirdRow/EquipmentSelect';
import EquipmentSelect2 from '../components/thirdRow/EquipmentSelect2.js';

// const Weapon = require('../models/Weapons');

export default function DpsCalc({ lists }) {

   const { setLists } = useLists();

   useEffect(() => { // initial fetch of all equipment + monster lists
      setLists(lists);
   }, [])

   return (
      <div className='grid-container'>
         <Header/>
         <Set1Calculations/>
         <Set2Calculations/>

         <div className='r2-container'>
            <div className="r2-first-column">
               <HeaderR2C1/>
               <LvlInputs/>
               <PrayerSelect/>
               <PotionSelect/>
            </div>
            <div className="r2-second-column">
               <HeaderR2C2/>
               <DpsChart/>
               <SelectMonster/>
               <Utilities/>
            </div>
         </div>

         <div className='r3-container'>
            <div className='r3-first-column'>
               <EquipmentSelect/>
            </div>
            <div className='r3-second-column'>
               <EquipmentSelect2/>
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

export async function getStaticProps() { // for production
   // connect to database
   const { db } = await connectToDatabase();

   const weapons = await db.collection('weapons').find().sort({ name: 1 }).toArray();
   const shields = await db.collection('shields').find().sort({ name: 1 }).toArray();
   const helmets = await db.collection('helmets').find().sort({ name: 1 }).toArray();
   const chests = await db.collection('chests').find().sort({ name: 1 }).toArray();
   const legs = await db.collection('legs').find().sort({ name: 1 }).toArray();
   const boots = await db.collection('boots').find().sort({ name: 1 }).toArray();
   const capes = await db.collection('capes').find().sort({ name: 1 }).toArray();
   const gloves = await db.collection('gloves').find().sort({ name: 1 }).toArray();
   const necklaces = await db.collection('necklaces').find().sort({ name: 1 }).toArray();
   const rings = await db.collection('rings').find().sort({ name: 1 }).toArray();
   const ammos = await db.collection('ammos').find().sort({ name: 1 }).toArray();
   const monsters = await db.collection('monsters').find().sort({ name: 1 }).toArray();

   return {
      props: {
         lists: [
            JSON.parse(JSON.stringify(weapons)),
            JSON.parse(JSON.stringify(shields)),
            JSON.parse(JSON.stringify(helmets)),
            JSON.parse(JSON.stringify(chests)),
            JSON.parse(JSON.stringify(legs)),
            JSON.parse(JSON.stringify(boots)),
            JSON.parse(JSON.stringify(capes)),
            JSON.parse(JSON.stringify(gloves)),
            JSON.parse(JSON.stringify(necklaces)),
            JSON.parse(JSON.stringify(rings)),
            JSON.parse(JSON.stringify(ammos)),
            JSON.parse(JSON.stringify(monsters)),
         ]
      },
   };
};

// export async function getServerSideProps() { // for development
   
//    const { db } = await connectToDatabase(); // connect to database

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
//    const monsters = await db.collection('monsters').find().sort({ name: 1 }).limit(1500).toArray();

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
