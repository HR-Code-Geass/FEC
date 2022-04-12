import React, { useState } from 'react';
// import { useTransition, animated } from 'react-spring';

import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from '../globalStyles';
import { lightTheme, darkTheme } from '../Themes';
import Account from '../../assets/account';
import Cart from '../../assets/cart';
import Search from '../../assets/search';

function Navbar() {
  const [theme, setTheme] = useState('light');
  const [toggle, setToggle] = useState({});

  const themeToggler = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
    setToggle(theme === 'light' ? { transform: 'translateX(-20px)', transition: 'transform 0.3s ease-in-out' } : { transform: 'translateX(0px)', transition: 'transform 0.3s ease-in-out' });
  };

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <>
        <GlobalStyles />
        <div className="navbar">
          <h1 className="brand">Threads</h1>
          <div className="nav-side-btns">
            <Search className="search" />
            <Account />
            <Cart />
            <div className="dark-mode-btn" onClick={themeToggler} aria-hidden="true">
              <div className="dark-mode-toggle" style={toggle} />
            </div>
          </div>
        </div>
      </>
    </ThemeProvider>
  );
}

export default Navbar;
