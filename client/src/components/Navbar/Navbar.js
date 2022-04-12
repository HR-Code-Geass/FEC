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

  const themeToggler = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <>
        <GlobalStyles />
        <div className="navbar">
          <h1 className="brand">Threads</h1>
          <div className="nav-side-btns">
            <Search />
            <Account />
            <Cart />
            <div className="dark-mode-btn" onClick={themeToggler} aria-hidden="true">
              <div className="dark-mode-toggle" />
            </div>
          </div>
        </div>
      </>
    </ThemeProvider>
  );
}

export default Navbar;
