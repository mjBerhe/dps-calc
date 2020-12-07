import Link from 'next/link';

const Footer = () => {
   return (
      <div className='footer-container'>
         <div className='footer-credit'>
            <h3>Special Thanks</h3>
            <Link href='https://oldschool.runescape.wiki/'>
               <a target='_blank'><img src="/Misc/wikiLogo.png" height='70px' alt="osrs wiki logo"/></a>
            </Link>
            <Link href='https://www.osrsbox.com/'>
               <a target='_blank'><img src="/Misc/osrsboxLogo.png" height='40px' alt="osrsbox logo"/></a>
            </Link>
            <Link href='https://docs.google.com/spreadsheets/d/1wzy1VxNWEAAc0FQyDAdpiFggAfn5U6RGPp2CisAHZW8/edit#gid=158500257'>
               <a target='_blank'><img src="/Misc/googlesheetsLogo.png" height='40px' alt="google sheets logo"/></a>
            </Link>
         </div>
         <div className='footer-copyright'>
            <h3>&#169; 2020 OSRS DPS</h3>
         </div>
      </div>
   )
}

export default Footer;