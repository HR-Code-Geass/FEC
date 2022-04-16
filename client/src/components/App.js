import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import Navbar from './Navbar/Navbar';
import ProductPage from './ProductPage';
// import Overview from './Overview/Overview';
import Questions from './QandA/Questions';
// import Reviews from './Reviews/Reviews';

import { GlobalStyles } from './globalStyles';
import { lightTheme, darkTheme } from './Themes';

const App = () => {
  const [theme] = useState('light');

  return (
    <div>
      <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
        <GlobalStyles />
        <Navbar theme={theme}>Threads</Navbar>
        <Router>
          <Routes>
            <Route
              path="/"
              exact
              element={<ProductPage theme={theme} />}
            />
            <Route
              path="QandA"
              element={<Questions productID={65635} productName="Heir Force Ones" />}
            />
          </Routes>
        </Router>
      </ThemeProvider>
    </div>
  );
};

export default App;
