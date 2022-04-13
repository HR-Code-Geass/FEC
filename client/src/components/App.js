import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled, { ThemeProvider } from 'styled-components';

import Navbar from './Navbar/Navbar';
import Overview from './Overview/Overview';
import Reviews from './Reviews/Reviews';
import Questions from './QandA/Questions';
// import RelatedItems from './RelatedItems';

import { GlobalStyles } from './globalStyles';
import { lightTheme, darkTheme } from './Themes';

const Container = styled.div`
display: flex;
flex-direction: column;
align-items: center;
width: 1280px;
margin-left: 40px;
align-items: center;
`;

function App() {
  const [theme] = useState('light');
  const [productId] = useState(65635);
  const [product, setProduct] = useState({});
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
        <Navbar theme={theme}>Threads</Navbar>
        <Container>
          <Overview theme={theme} product={product} aveRate={aveRate} totalCount={totalCount} />
          {/* <RelatedItems /> */}
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
