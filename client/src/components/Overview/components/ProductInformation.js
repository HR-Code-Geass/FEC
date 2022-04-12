import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import StarBar from '../../StarBar';

const ProductHeader = styled.div`
font-size: 24px;
font-weight: 400;
display: flex;
justify-content: space-between;
`;

const ProductCategory = styled.div`
font-size: 12px;
width: auto;
color: #747571;

&:hover {
  color: black;
  cursor: pointer;
  };
`;

const Ratings = styled.div`
display: flex;
margin-bottom: 50px;
align-items: center;
`;

const ReadAllReviews = styled.a`
text-decoration: none;
margin-left: 10px;
font-size: 12px;
color: #747571;
`;

function ProductInformation({ styles, product, currentStyleIndex }) {
  if (!styles?.length) return null;
  return (
    <>
      <ProductCategory>{product?.category}</ProductCategory>
      <ProductHeader>
        <span>{product?.name}</span>
        {!styles?.[currentStyleIndex]?.sale_price
          ? `$${styles?.[currentStyleIndex]?.original_price}`
          : (
            <div style={{
              transform: 'translateX(35px)',
            }}
            >
              <strike>{`$${styles?.[currentStyleIndex]?.original_price}`}</strike>
            </div>
          )}
        {' '}
        {styles?.[currentStyleIndex]?.sale_price
          ? `$${styles?.[currentStyleIndex]?.sale_price}`
          : null}
      </ProductHeader>
      <Ratings>
        <StarBar rate={5} style={{ height: '10px' }} />
        <ReadAllReviews href="#reviews">Read all reviews</ReadAllReviews>
      </Ratings>
    </>
  );
}

ProductInformation.propTypes = {
  styles: PropTypes.instanceOf(Object).isRequired,
  currentStyleIndex: PropTypes.number.isRequired,
  product: PropTypes.instanceOf(Object).isRequired,
};

export default ProductInformation;
