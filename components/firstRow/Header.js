import Link from 'next/link';

const Header = () => {
   return (
      <div className='header-container'>
         <div className='header-logo'>
            <Link href='/'>
               <a><h1>OSRS DPS</h1></a>
            </Link>
         </div>
         <div className='header-link-dps'>
            <Link href='/'>
               <a><h3>DPS Calculator</h3></a>
            </Link>
         </div>
         <div className='header-link-tba1'>
            <Link href='/'>
               <a><h3>Coming Soon</h3></a>
            </Link>
         </div>
         <div className='header-link-tba2'>
            <Link href='/'>
               <a><h3>Coming Soon</h3></a>
            </Link>
         </div>
      </div>
   )
}

export default Header;