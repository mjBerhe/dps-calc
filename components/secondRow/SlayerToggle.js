const SlayerToggle = () => {

   const handleToggle = (e) => {
      console.log(e);
   }

   return (
      <div className='slayer-toggle-container'>
         <img src="/Misc/slayerIcon.png" alt="slayer icon"/>
         <label className='toggle-control'>
            <input type="checkbox" onChange={handleToggle}/>
            <span className='control'></span>
         </label>
      </div>
   );
}

export default SlayerToggle;