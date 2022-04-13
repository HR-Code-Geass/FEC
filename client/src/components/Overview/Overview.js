import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import ProductInformation from './components/ProductInformation';
import StyleSelector from './components/StyleSelector';
import Cart from './components/Cart';
import ImageGallery from './components/ImageGallery';

function Overview({ product, theme }) {
  const [styles, setStyles] = useState({});
  const [currentStyleIndex, setCurrentStyleIndex] = useState(0);

  useEffect(() => {
    if (product === {}) {
      return;
    }
    axios.get(`/products/${product.id}/styles`)
      .then((res) => {
        setStyles(res.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [product]);

  const selectStyle = (newStyleIndex) => {
    setCurrentStyleIndex(newStyleIndex);
  };

  return (
    <div className="overview-body">
      <ImageGallery
        styles={styles}
        currentStyleIndex={currentStyleIndex}
        selectStyle={selectStyle}
      />
      <div className="right-div">
        <ProductInformation
          product={product}
          styles={styles}
          currentStyleIndex={currentStyleIndex}
        />

        <StyleSelector
          styles={styles}
          currentStyleIndex={currentStyleIndex}
          selectStyle={selectStyle}
        />

        <Cart styles={styles} theme={theme} currentStyleIndex={currentStyleIndex} />
        {product?.description}
      </div>
    </div>
  );
}

Overview.propTypes = {
  product: PropTypes.instanceOf(Object).isRequired,
  theme: PropTypes.string.isRequired,
};

export default Overview;
