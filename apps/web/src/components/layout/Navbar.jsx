import { useEffect, useRef, useState } from 'react';
import Button from "@components/ui/Button";
import { TiLocationArrow } from 'react-icons/ti';
import { useWindowScroll } from 'react-use';
import gsap from 'gsap/all';

const navItems = ['Studio', 'Work', 'Foundry', 'Blog', 'Contact'];

const Navbar = () => {
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [hasBackground, setHasBackground] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navContainerRef = useRef(null);
  const isJumping = useRef(false);

  const { y: currentScrollY } = useWindowScroll();

  const handleNavClick = () => {
    isJumping.current = true;
    setIsNavVisible(true);
    setHasBackground(true);
    setIsMobileMenuOpen(false); 
    setTimeout(() => {
      isJumping.current = false;
    }, 100);
  };

  useEffect(() => {
    if (isJumping.current) {
      return;
    }

    if (currentScrollY < 10) {
      setIsNavVisible(true);
      setHasBackground(true);
    } else if (currentScrollY > lastScrollY) {
      setIsNavVisible(false);
      setHasBackground(false);
    } else if (currentScrollY > 10 && currentScrollY < lastScrollY) {
      setIsNavVisible(true);
      setHasBackground(true);
    }

    setLastScrollY(currentScrollY);
  }, [currentScrollY, lastScrollY]);

  useEffect(() => {
    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.6,
    });
  }, [isNavVisible]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prev => !prev);
  };

  return (
    <div
      ref={navContainerRef}
      className={`fixed inset-x-0  z-50 h-16 border-none transition-all duration-700 md:top-4 md:inset-x-6 ${
        hasBackground ? 'floatingNav' : ''
      }`}
    >
      <header className="absolute top-1/2 w-full -translate-y-1/2 z-70">
        <nav className="flex size-full items-center justify-between p-4">
          <div className="flex items-center gap-7">
            <a href="#hero" className="cursor-pointer">
              <img
                src="/img/logo.svg"
                alt="logo"
                className="w-10 hover:scale-110 transition-transform duration-200" />
            </a>
            <Button
              id="product-button"
              title="Products"
              rightIcon={<TiLocationArrow />}
              containerClass="bg-blue-50 md:flex hidden items-center justify-center gap-1"
            />
          </div>
          
          <div className="flex h-full items-center">
            <div className="hidden md:block">
              {navItems.map((item) => (
                <a
                  key={item}
                  href={item === 'Blog' ? '/cms' : item === 'Foundry' ? '/foundry' : `#${item.toLowerCase()}`}
                  className="navHoverBtn"
                  onClick={handleNavClick}
                >
                  {item}
                </a>
              ))}
            </div>

            <button 
              className="md:hidden flex flex-col items-end space-y-1 ml-10 z-20"
              onClick={toggleMobileMenu}
            >
              <span className={`block h-0.5 w-7 bg-white transition-transform duration-300 ${isMobileMenuOpen ? '-rotate-45 translate-y-1.5' : ''}`}></span>
              <span className={`block h-0.5 w-5 bg-white transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
              <span className={`block h-0.5 w-7 bg-white transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-45 -translate-y-1.5' : ''}`}></span>
            </button>
          </div>
        </nav>
      </header>
      
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-[60] h-screen bg-black/40 backdrop-blur-xs md:hidden flex flex-col items-center justify-center"
          onClick={toggleMobileMenu} 
        >
          <div 
            className="flex flex-col space-y-8"
            onClick={(e) => e.stopPropagation()} 
          >
            {navItems.map((item) => (
              <a
                key={item}
                href={item === 'Blog' ? '/cms' : item === 'Foundry' ? '/foundry' : `#${item.toLowerCase()}`}
                className="text-white text-8xl font-right-grotesk-tall uppercase"
                onClick={handleNavClick}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;