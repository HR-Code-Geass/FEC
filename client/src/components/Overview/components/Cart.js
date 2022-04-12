import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import PropTypes from 'prop-types';

const AddToCartBtn = styled.button`
color: white;
border-radius: 10px;
background-color: #3C3C3C;
margin-bottom: 40px;
font-size: 14px;
border-style: none;
height: 50px;
width: 100%;
&:hover {
  background-color: black;
  cursor: pointer;
  };

`;

const SizeBtn = styled.div`
display: flex;
width: 45px;
height: 45px;
margin-right: 10px;
color: #747571;
background: #F3F4F3;
font-weight: 300;
justify-content: center;
align-items: center;
border: 1.5px solid transparent;

&:hover {
  border: 1.5px solid #dcdddb;
  cursor: pointer;
}
`;

const Sizes = styled.div`
width: 100%;
display: grid;
margin-bottom: 50px;
grid-template-columns: repeat(7, 1fr);
grid-auto-rows: auto;
justify-content: space-between;
row-gap: 12px;
margin-top: 50px;
`;

const Quantity = styled.select`
width: 100%;
height: 30px;
margin-bottom: 10px;
`;

function Cart({ styles, currentStyleIndex }) {
  const [cart, setCart] = useState({ sku: '', quantity: 0 });

  if (!styles?.length) return null;

  function selectSku(Sku) {
    setCart({
      sku: Sku, quantity: styles?.[currentStyleIndex]?.skus[Sku].quantity,
    });
  }

  function handleQuantityChange(e) {
    setCart({ sku: cart.sku, quantity: e.target.value });
  }

  const addToCart = () => {
    axios.post('/cart', { sku_id: cart.sku, count: cart.quantity })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Sizes>
        {Object.keys(styles?.[currentStyleIndex]?.skus).map((sku) => (
          <SizeBtn
            onClick={() => selectSku(sku)}
            key={sku}
            style={
              sku === cart.sku
                ? { border: '1.5px solid #333333' }
                : null
            }
          >
            {styles?.[currentStyleIndex]?.skus[sku].size}
          </SizeBtn>
        ))}
      </Sizes>
      <Quantity onChange={(e) => handleQuantityChange(e)}>
        {[...Array(Math.min(cart.quantity, 15)).keys()]
          .map((i) => <option value={i + 1} key={i}>{i + 1}</option>)}
      </Quantity>
      <AddToCartBtn className="add-to-cart-btn" onClick={addToCart}>Add to Cart</AddToCartBtn>

    </div>
  );
}

Cart.propTypes = {
  styles: PropTypes.instanceOf(Object).isRequired,
  currentStyleIndex: PropTypes.number.isRequired,
};

export default Cart;
