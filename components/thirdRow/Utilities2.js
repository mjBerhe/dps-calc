import useHover from '../../hooks/useHover';
import { useUserStats2 } from '../../state/userStats2';
import { useEquippedGear2 } from '../../state/equippedGear2';
import { useCopiedGear } from '../../state/copiedGear';

const Utilities2 = () => {

   const { setMultipleStats2 } = useUserStats2();
   const { getEquippedGear, setEquippedGear } = useEquippedGear2();
   const { getCopiedGear, setCopiedGear } = useCopiedGear();

   const handleCopy = () => {
      setCopiedGear(getEquippedGear());
      // console.log('copied');
   }

   const handlePaste = () => {
      setEquippedGear(getCopiedGear());
      // console.log('pasted');
   }

   const handleDelete = () => {
      setEquippedGear({
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
      });
      setMultipleStats2({
         attType: null,
         attStyle: null,
         chosenSpell: null,
         isMagic: false,
         isRange: false,
      });
   }

   const [copyRef, hoveredCopy] = useHover();
   const [pasteRef, hoveredPaste] = useHover();
   const [deleteRef, hoveredDelete] = useHover(); 

   return (
      <div className='r3-buttons-container'>
         <div className='copy-button-container'>
            <input type="image" src='/Misc/copyIcon3.png' onClick={handleCopy} ref={copyRef}/>
            {hoveredCopy && <h5 className='prayer-item-hover'>Copy</h5>}
         </div>
         <div className='paste-button-container'>
            <input type="image" src='/Misc/pasteIcon2.png' onClick={handlePaste} ref={pasteRef}/>
            {hoveredPaste && <h5 className='prayer-item-hover'>Paste</h5>}
         </div>
         <div className='delete-button-container'>
            <input type="image" src='/Misc/deleteIcon2.png' onClick={handleDelete} ref={deleteRef}/>
            {hoveredDelete && <h5 className='prayer-item-hover'>Delete</h5>}
         </div>
      </div>
   );
}

export default Utilities2;