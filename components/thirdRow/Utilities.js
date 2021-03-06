import useHover from '../../hooks/useHover';
import { useUserStats } from '../../state/userStats';
import { useEquippedGear } from '../../state/equippedGear';
import { useCopiedGear } from '../../state/copiedGear';

const Utilities = () => {

   const { setMultipleStats } = useUserStats();
   const { getEquippedGear, setEquippedGear } = useEquippedGear();
   const { getCopiedGear, setCopiedGear } = useCopiedGear();

   const handleCopy = () => {
      setCopiedGear(getEquippedGear());
   }

   const handlePaste = () => {
      setEquippedGear(getCopiedGear());
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
      setMultipleStats({
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
         <div className='utility-button-container'>
            <input type="image" src='/Misc/copyIcon3.png' onClick={handleCopy} ref={copyRef}/>
            {hoveredCopy && <h5 className='utility-buttons-hover'>Copy</h5>}
         </div>
         <div className='utility-button-container'>
            <input type="image" src='/Misc/pasteIcon2.png' onClick={handlePaste} ref={pasteRef}/>
            {hoveredPaste && <h5 className='utility-buttons-hover'>Paste</h5>}
         </div>
         <div className='utility-button-container'>
            <input type="image" src='/Misc/deleteIcon2.png' onClick={handleDelete} ref={deleteRef}/>
            {hoveredDelete && <h5 className='utility-buttons-hover'>Delete</h5>}
         </div>
      </div>
   );
}

export default Utilities;