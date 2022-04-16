import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import Loading from './Loading';
import Overview from './Overview/Overview';
import Questions from './QandA/Questions';
import Reviews from './Reviews/Reviews';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 1100px;
  margin-left: 150px;
  align-items: center;
`;

const ProductPage = () => {
  const [productId] = useState(65635);
  const [product, setProduct] = useState({});
  const [aveRate, setAveRate] = useState('');
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get(`/products/${productId}`)
      .then((res) => {
        setProduct(res.data);
        setIsLoading(false);
      })
      .catch((err) => console.error(`Error fetching product data from API: ${err.message}`));
  }, [productId]);

  if (isLoading) return <Loading />;

  return (
    <Container>
      <Overview
        product={product}
        aveRate={aveRate}
        totalCount={totalCount}
      />
      <Questions
        productID={productId}
        productName={product?.name || ''}
      />
      <Reviews
        product={product}
        productID={productId}
        setAveRate={setAveRate}
        setTotalCount={setTotalCount}
        aveRate={aveRate}
        totalCount={totalCount}
      />
    </Container>
  );
};

export default ProductPage;
