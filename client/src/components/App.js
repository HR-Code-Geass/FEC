import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled, { ThemeProvider } from 'styled-components';

import Navbar from './Navbar/Navbar.js';
import Overview from './Overview/Overview.js';
import Reviews from './Reviews/Reviews.js';
import Questions from './QandA/Questions';
import RelatedItems from './RelatedItems.js';

import { GlobalStyles } from './globalStyles.js';
import { lightTheme, darkTheme } from './Themes';

const Container = styled.div`
display: flex;
flex-direction: column;
align-items: center;
width: 1280px;
margin-left: 40px;
`;

function App() {
  const [theme, setTheme] = useState('light');
  const [productId, setProductId] = useState(65635);
  const [product, setProduct] = useState();
  const [aveRate, setAveRate] = useState('');
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    axios.get(`/products/${productId}`)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [productId]);

  return (
    <div>
      <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
        <GlobalStyles />
        <Navbar>Threads</Navbar>
        <Container>
          <Overview product={product} />
          <RelatedItems />
          <Questions />
          <Reviews
            productID={productId}
            setAveRate={setAveRate}
            setTotalCount={setTotalCount}
            aveRate={aveRate}
            totalCount={totalCount}
          />
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default App;

// const [cart, setCart] = useState({ items: 0, products: [{}] });

// function incrementCart() {
//   setCart((prevCart) => ({ items: prevCart.items + 1 }));
// }

// function decrementCart() {
//   cart.items > 0 ? setCart((prevCart) => ({ items: prevCart.items - 1 })) : null;
// }

// cart={cart} decrementCart={decrementCart}

// incrementCart={incrementCart}
