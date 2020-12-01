import { useState, useEffect, useRef } from 'react';

export default function SelectSearchItem({ options, onChange, itemType }) {

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

   const handleSearch = (e) => {
      setSearch(e.target.value);
      if (!display) {
         setDisplay(true);
      }
   }

   const handleClick = () => {
      setDisplay(!display);
      setSearch('');
   }

   const handleChange = (item, itemType) => {
      setDisplay(false);
      if (item.name) {
         setSearch(item.name);
      }
      onChange(item, itemType)
   }

   const divRef = useRef(null);

   useEffect(() => {
      if (divRef.current && display) {
         divRef.current.scrollIntoView({ behaviour: 'smooth'});
      }
   }, [display])

   return (
      <div className='dropdown-item-container' ref={wrapperRef}>
         <input  
            placeholder={`Search for ${itemType}`} 
            autoComplete='off'
            value={search}
            onClick={handleClick}
            onChange={handleSearch}
         />
         {display &&
            <div className='dropdown-item-options-container'>
            {options
               .filter(({name}) => name.toLowerCase().indexOf(search.toLowerCase()) > -1)
               .map((item, i) => {
                  return <div className='dropdown-item-options' key={i} tabIndex='0' onClick={() => handleChange(item, itemType)}>{item.name}</div>
               })
            }
            </div>
         }
         <div className='dropdown-bottom' ref={divRef}></div>
      </div>
   )
}