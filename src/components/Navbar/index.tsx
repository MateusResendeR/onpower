import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);  // Controla o estado do menu (aberto ou fechado)

  const toggleMenu = () => {
    setIsOpen(!isOpen);  // Alterna o estado do menu
  };

  return (
    <nav className="fixed w-full bg-black shadow-sm z-50">
      <div className="container mx-auto px-6 flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center"
        >
          <Link to="/">
            <img
              src="/Logo.png"
              alt="Logo"
              className="h-[100px]"
            />
          </Link>
        </motion.div>

        {/* Menu Hamburger para dispositivos móveis */}
        <div className="md:hidden flex items-center mr-4">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Links de navegação visíveis em telas maiores */}
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="text-gray-700 md:text-white hover:text-[#eafd5c] transition-colors">
            Início
          </Link>
          <Link to="/partners" className="text-gray-700 md:text-white hover:text-[#eafd5c] transition-colors">
            Onde estamos
          </Link>
          <Link to="/faq" className="text-gray-700 md:text-white hover:text-[#eafd5c] transition-colors">
            FAQ
          </Link>
          <Link to="/contact" className="text-gray-700 md:text-white hover:text-[#eafd5c] transition-colors">
            Contato
          </Link>
          <a 
            href="https://area-parceiro.onpowermidia.com.br" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-gray-700 md:text-white hover:text-[#eafd5c] transition-colors"
          >
            Área do parceiro
          </a>
        </div>
      </div>

      {/* Menu Hamburguer aberto em telas menores */}
      <div
        className={`md:hidden ${isOpen ? 'block' : 'hidden'} bg-white p-4 space-y-4`}
      >
        <Link
          to="/"
          className="text-gray-700 hover:text-[#eafd5c] transition-colors block"
          onClick={toggleMenu}
        >
          Início
        </Link>
        <Link
          to="/partners"
          className="text-gray-700 hover:text-[#eafd5c] transition-colors block"
          onClick={toggleMenu}
        >
          Onde estamos
        </Link>
        <Link
          to="/faq"
          className="text-gray-700 hover:text-[#eafd5c] transition-colors block"
          onClick={toggleMenu}
        >
          FAQ
        </Link>
        <Link
          to="/contact"
          className="text-gray-700 hover:text-[#eafd5c] transition-colors block"
          onClick={toggleMenu}
        >
          Contato
        </Link>
        <a
          href="https://area-parceiro.onpowermidia.com.br"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-700 hover:text-[#eafd5c] transition-colors block"
          onClick={toggleMenu}
        >
          Área do parceiro
        </a>
      </div>
    </nav>
  );
};


export default Navbar;