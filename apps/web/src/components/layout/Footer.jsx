import { FaDiscord, FaGithub, FaTwitch, FaTwitter } from "react-icons/fa"

const links = [
   { href: 'https://discord.com', icon: <FaDiscord /> },
   { href: 'https://twitter.com', icon: <FaTwitter /> },
   { href: 'https://github.com', icon: <FaGithub /> },
   { href: 'https://twitch.com', icon: <FaTwitch /> }
]

const Footer = () => {
  return (
    <footer className='w-screen bg-yellow-400 py-4 text-black relative z-10'>
      <div className='container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:flex-row'>
         <p className='font-right-grotesk-medium text-center text-m md:text-left'>
            &copy; Nova 2025. All rights reserved
         </p>

         <div className='flex justify-center gap-4 md:justify-start'>
            {links.map((link) => (
               <a key={link} href={link.href} target="_blank" rel="noopener noreferrer" className="font-right-grotesk-medium text-black transition-colors duration-500 ease-in-out hover:text-white">
                  {link.icon}
               </a>
            ))}
         </div>

         <a href="#privacy-policy" className="font-right-grotesk-medium text-center text-m hover:underline md:text-right">
            Privacy Policy

         </a>
      </div>
    </footer>
  )
}

export default Footer
