import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import styled from 'styled-components';
import {
  PlusIcon,
} from '@heroicons/react/solid';
import { Line } from '../presentation/Line.styles';
import ReviewListEntry from './ReviewListEntry';
import ReviewForm from './ReviewForm';
import ReviewSearch from './ReviewSearch';
import ReviewSort from './ReviewSort';
import RatingBreakdown from './RatingBreakdown';

const RatingAndReview = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 1000px;
`;

const RRTop = styled.div`
display: flex;
`;

const Button = styled.button`
  background: #3C3C3C;
  color: white;
  border-radius: 50px;
  margin: 0 1em;
  margin-bottom: 10px;
  padding: 0.5em 2em;
  border-style: none;
  border: 2px solid #333333;
  font-family: 'Poppins', sans-serif;
  width: 200px;
  font-size: 16px;

  &:hover {
  background-color: black;
  cursor: pointer;
  };
`;

const MoreReviewsBtn = styled.div`
  border-radius: 50px;
  margin: 0 1em;
  margin-bottom: 10px;
  padding: 0.5em 1.5em;
  border-style: none;
  border: 2px solid #333333;
  font-family: 'Poppins', sans-serif;
  width: 150px;
  display: flex;
  justify-content: center;

  &:hover {
  background-color: black;
  color: white;
  background: #3C3C3C;
  cursor: pointer;
  };
`;

const ReviewDiv = styled.div`
  height: 100vh;
  width: 100%;
  overflow: auto;
  margin-bottom: 20px;
`;

const Reviews = ({
  product, productID, setAveRate, setTotalCount, aveRate, totalCount,
}) => {
  const [data, setData] = useState([]);
  const [reviewsData, setReviewsData] = useState([]);
  const [dataUpdate, setDataUpdate] = useState('');
  const [sort, setSort] = useState('relevant');
  const [recomPer, setRecomPer] = useState(0);
  const [moreReviewOnClick, setMoreReviewOnClick] = useState(false);
  const [char, setChar] = useState({});
  const [star5, setStar5] = useState(0);
  const [star4, setStar4] = useState(0);
  const [star3, setStar3] = useState(0);
  const [star2, setStar2] = useState(0);
  const [star1, setStar1] = useState(0);
  const [count, setCount] = useState(2);
  const [isWritable, setisWritable] = useState(false);
  useEffect(() => {
    axios.get(`/reviews/meta?product_id=${productID}`)
      .then((res) => {
        const ratingArray = Object.keys(res.data.ratings);
        let rateSum = 0;
        let rateUnit = 0;
        const curstar5 = res.data.ratings['5'];
        const curstar4 = res.data.ratings['4'];
        const curstar3 = res.data.ratings['3'];
        const curstar2 = res.data.ratings['2'];
        const curstar1 = res.data.ratings['1'];
        setChar(res.data.characteristics);

        ratingArray.forEach((item) => {
          rateUnit += Number(res.data.ratings[item]);
          rateSum += item * res.data.ratings[item];
        });

        const recomNum = Number(res.data.recommended.true);
        const currecomPer = (Math.round((recomNum / rateUnit) * 100));
        setRecomPer(currecomPer);

        let rate = (Math.round((rateSum / rateUnit) * 10));
        rate *= 0.1;
        rate = rate.toFixed(1);
        setCount(rateUnit);
        setStar5(`${Math.round((curstar5 / rateUnit) * 100)}%`);
        setStar4(`${Math.round((curstar4 / rateUnit) * 100)}%`);
        setStar3(`${Math.round((curstar3 / rateUnit) * 100)}%`);
        setStar2(`${Math.round((curstar2 / rateUnit) * 100)}%`);
        setStar1(`${Math.round((curstar1 / rateUnit) * 100)}%`);
        setAveRate(rate);
      });
  }, [productID, dataUpdate]);

  useEffect(() => {
    axios.get(`/reviews?product_id=${productID}&count=${count}&sort=${sort}`)
      .then((res) => {
        setData(res.data.results);
        setTotalCount(res.data.results.length);
        if (!moreReviewOnClick) {
          setReviewsData(res.data.results.slice(0, 2));
        } else {
          setReviewsData(res.data.results);
        }
      });
  }, [productID, count, sort, dataUpdate]);

  const size = (char.Size === undefined) ? '' : Math.round(char.Size.value);
  const width = (char.Width === undefined) ? '' : Math.round(char.Width.value);
  const comfort = (char.Comfort === undefined) ? '' : Math.round(char.Comfort.value);
  const quality = (char.Quality === undefined) ? '' : Math.round(char.Quality.value);
  const length = (char.Length === undefined) ? '' : Math.round(char.Length.value);
  const fit = (char.Fit === undefined) ? '' : Math.round(char.Fit.value);

  const changeSort = (newSort) => {
    setSort(newSort);
  };

  const collapseStyle = { position: 'relative', top: '-960px', left: '400px' };
  const reviews = reviewsData.map((review) => (
    <div className="review" key={review.review_id} style={{ width: '100%' }}>
      <ReviewListEntry review={review} setDataUpdate={setDataUpdate} />
    </div>
  ));
  return (
    <RatingAndReview id="reviews">
      <Line />
      <h3>Ratings & Reviews</h3>
      <RRTop>
        <RatingBreakdown
          data={data}
          setReviewsData={setReviewsData}
          aveRate={aveRate}
          recomPer={recomPer}
          star={{
            star1,
            star2,
            star3,
            star4,
            star5,
          }}
          char={{
            size,
            width,
            comfort,
            quality,
            length,
            fit,
          }}
          setTotalCount={setTotalCount}
        />
      </RRTop>
      <ReviewSearch data={data} setReviewsData={setReviewsData} />
      <ReviewSort changeSort={changeSort} totalCount={totalCount} />
      <ReviewForm
        product={product}
        productID={productID}
        setisWritable={setisWritable}
        isWritable={isWritable}
        char={char}
        setDataUpdate={setDataUpdate}
        setSort={setSort}
      />
      <ReviewDiv>
        <table>
          <tbody>
            <tr>
              <td colSpan="2">
                {reviewsData.length === 0
                  ? (<div><h2>There is no review yet</h2></div>)
                  : reviews}
              </td>
            </tr>
          </tbody>
        </table>
      </ReviewDiv>
      {(totalCount < 3 || reviewsData.length !== 2 || moreReviewOnClick)
        ? ''
        : (
          <MoreReviewsBtn onClick={() => { setReviewsData(data); setMoreReviewOnClick(true); }}>
            {' '}
            MORE REVIEWS
          </MoreReviewsBtn>
        ) }
      <Button
        style={(totalCount <= 2) ? collapseStyle : { }}
        onClick={() => setisWritable(true)}
      >
        ADD A REVIEW
        {' '}
        <PlusIcon style={{ height: '13px' }} />
      </Button>
    </RatingAndReview>
  );
};

Reviews.propTypes = {
  product: PropTypes.instanceOf(Object).isRequired,
  productID: PropTypes.number.isRequired,
  setAveRate: PropTypes.func.isRequired,
  setTotalCount: PropTypes.func.isRequired,
  aveRate: PropTypes.string.isRequired,
  totalCount: PropTypes.number.isRequired,
};

export default Reviews;
