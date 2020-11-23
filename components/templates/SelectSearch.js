import { useState, useEffect, useRef } from 'react';

export default function SelectSearch({ options, onChange, itemType }) {

   const [display, setDisplay] = useState();
   const [search, setSearch] = useState('');
   const wrapperRef = useRef(null);

   const handleClickOutside = (e) => {
		const { current: wrap } = wrapperRef;
		if (wrap && !wrap.contains(e.target)) {
			setDisplay(false);
		}
   }
   
   useEffect(() => {
		window.addEventListener('mousedown', handleClickOutside);
		return () => {
			window.removeEventListener('mousedown', handleClickOutside);
		}
   });
   
   // const handleChange = (itemID, itemType, itemName) => {
   //    setDisplay(false);
   //    setSearch(itemName);
   //    onChange(itemID, itemType);
   // }

   const handleChange = (item, itemType) => {
      setDisplay(false);
      if (item.name) {
         setSearch(item.name);
      }
      onChange(item, itemType)
   }

   return (
      <div className='dropdown-container' ref={wrapperRef}>
         <input 
            className='dropdown-search' 
            placeholder={`Search for ${itemType}`} 
            autoComplete='off'
            value={search} 
            onClick={() => setDisplay(!display)}
            onChange={(e) => setSearch(e.target.value)}
         />
         {display &&
            <div className='dropdown-options-container'>
            {options
               .filter(({name}) => name.toLowerCase().indexOf(search.toLowerCase()) > -1)
               .map((item, i) => {
                  return <div className='dropdown-options' key={i} tabIndex='0' onClick={() => handleChange(item, itemType)}>{item.name}</div>
               })
            }
         </div> 
         }
      </div>
   )
}