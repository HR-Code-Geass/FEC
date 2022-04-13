import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import StarBar from '../StarBar';

const RateNum = styled.h1`
  font-size: 60px
`;

const RatingDiv = styled.div`
  display: flex;
`;

const LeftDiv = styled.div`
width: 50%;
`;

const RightDiv = styled.div`
width: 50%;
`;

const RatingUser = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ScaleDiv = styled.div`
  &:hover .starScale {
    background-color: black;
    color: white
    }
  width: 100px
`;

const Bar = styled.div`
  background-color: #F9F7F7;
  height: 15px;
  width: 100%;

`;

const InsideBar = styled.div`
  background-color: green;
  height: 15px;
`;

const CharBar = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  font-size: 50%;
`;

const CharInsideBar = styled.div`
  background-color: #F9F7F7;
  height: 15px;
`;

const CharScaleDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 32%;
`;

const CharForthScaleDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 23%;
`;

const StarButton = styled.button`

  width: 100%;
  heigth: 100%;
  background-color: Transparent;
  border: none;
`;

const Triangle = () => (
  <svg height="19" width="19" fill="none" viewBox="0 0 19 19" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.42477 18.9998L0.444603 0.94311L18.6308 1.0572L9.42477 18.9998Z" fill="black" />
  </svg>
);

const RatingBreakdown = ({
  data, setReviewsData,
  aveRate, recomPer, star,
  char,
}) => {
  const [filter, setfilter] = useState([]);
  const [star5onClick, setStar5onClick] = useState(false);
  const [star4onClick, setStar4onClick] = useState(false);
  const [star3onClick, setStar3onClick] = useState(false);
  const [star2onClick, setStar2onClick] = useState(false);
  const [star1onClick, setStar1onClick] = useState(false);

  const filterStar = () => {
    let rateData = [];
    if (filter.length === 0) {
      setReviewsData(data);
    } else {
      filter.forEach((num) => {
        const filerdata = data.filter((review) => review.rating === num);
        rateData = rateData.concat(filerdata);
      });
      setReviewsData(rateData);
    }
  };
  return (
    <RatingDiv>
      <LeftDiv>
        <RateNum>{aveRate}</RateNum>
        <StarBar rate={Number(aveRate)} />
        <h4>
          {recomPer}
          % of reviews recommend this product
        </h4>
        <br />
        <RatingUser>
          <ScaleDiv>
            <StarButton
              type="button"
              className="starScale"
              style={(star5onClick) ? { color: 'red' } : {}}
              onClick={() => (
                star5onClick ? (setStar5onClick(false),
                filter.splice(filter.indexOf(5), 1), filterStar()) : (setStar5onClick(true),
                filter.unshift(5), filterStar())
              )}
            >
              <u>5 stars</u>
            </StarButton>
          </ScaleDiv>
          <Bar><InsideBar style={{ width: star.star5 }} /></Bar>
        </RatingUser>
        <br />
        <RatingUser>
          <ScaleDiv>
            <StarButton
              className="starScale"
              style={(star4onClick) ? { color: 'red' } : {}}
              onClick={() => (
                (star4onClick) ? (setStar4onClick(false),
                filter.splice(filter.indexOf(4), 1), filterStar()) : (setStar4onClick(true),
                filter.unshift(4), filterStar())
              )}
            >
              <u>4 stars</u>
            </StarButton>

          </ScaleDiv>
          <Bar><InsideBar style={{ width: star.star4 }} /></Bar>
        </RatingUser>
        <br />
        <RatingUser>
          <ScaleDiv>
            <StarButton
              className="starScale"
              style={(star3onClick) ? { color: 'red' } : {}}
              onClick={() => (
                (star3onClick) ? (setStar3onClick(false),
                filter.splice(filter.indexOf(3), 1), filterStar()) : (setStar3onClick(true),
                filter.unshift(3), filterStar())
              )}
            >
              <u>3 stars</u>
            </StarButton>

          </ScaleDiv>
          <Bar><InsideBar style={{ width: star.star3 }} /></Bar>
        </RatingUser>
        <br />
        <RatingUser>
          <ScaleDiv>
            <StarButton
              className="starScale"
              style={(star2onClick) ? { color: 'red' } : {}}
              onClick={() => ((
                star2onClick) ? (setStar2onClick(false),
                filter.splice(filter.indexOf(2), 1), filterStar()) : (setStar2onClick(true),
                filter.unshift(2), filterStar())
              )}
            >
              <u>2 stars</u>
            </StarButton>

          </ScaleDiv>
          <Bar><InsideBar style={{ width: star.star2 }} /></Bar>
        </RatingUser>
        <br />
        <RatingUser>
          <ScaleDiv>
            <StarButton
              type="button"
              className="starScale"
              style={(star1onClick) ? { color: 'red' } : {}}
              onClick={() => (
                (star1onClick) ? (setStar1onClick(false),
                filter.splice(filter.indexOf(1), 1), filterStar(filter)) : (setStar1onClick(true),
                filter.unshift(1), filterStar(filter))
              )}
            >
              <u>1 stars</u>
            </StarButton>
          </ScaleDiv>
          <Bar><InsideBar style={{ width: star.star1 }} /></Bar>
        </RatingUser>
        <StarButton
          onClick={() => {
            setReviewsData(data); setStar1onClick(false);
            setStar2onClick(false); setStar3onClick(false);
            setStar4onClick(false); setStar5onClick(false);
            setfilter([]);
          }}
        >
          <u>no filter</u>

        </StarButton>

        <br />
      </LeftDiv>
      <RightDiv>
        <div>
          <div className={(!char.size) ? 'hidden' : ''}>
            Size
            <CharBar>
              <div style={{
                transform: 'translate(-50%, -5%)', width: '30px', position: 'absolute', left: `${(char.size / 5) * 100}%`,
              }}
              >
                <Triangle />
              </div>
              <CharScaleDiv>
                <CharInsideBar />
                Too small
              </CharScaleDiv>
              <CharScaleDiv style={{ textAlign: 'center' }}>
                <CharInsideBar />
                Prefect
              </CharScaleDiv>
              <CharScaleDiv style={{ textAlign: 'right' }}>
                <CharInsideBar />
                Too Large
              </CharScaleDiv>
            </CharBar>
          </div>
          <br />
          <div className={(!char.width) ? 'hidden' : ''}>
            Width
            <CharBar>
              <div style={{
                transform: 'translate(-50%, -5%)', width: '30px', position: 'absolute', left: `${(char.width / 5) * 100}%`,
              }}
              >
                <Triangle />
              </div>
              <CharScaleDiv>
                <CharInsideBar />
                Too tight
              </CharScaleDiv>
              <CharScaleDiv style={{ textAlign: 'center' }}>
                <CharInsideBar />
                Prefect
              </CharScaleDiv>
              <CharScaleDiv style={{ textAlign: 'right' }}>
                <CharInsideBar />
                Too wide
              </CharScaleDiv>
            </CharBar>
          </div>
          <br />
          <div className={(!char.comfort) ? 'hidden' : ''}>
            Comfort
            <br />
            <CharBar>
              <div style={{
                transform: 'translate(-50%, -5%)', width: '30px', position: 'absolute', left: `${(char.comfort / 5) * 100}%`,
              }}
              >
                <Triangle />
              </div>
              <CharForthScaleDiv>
                <CharInsideBar />
                Poor
              </CharForthScaleDiv>
              <CharForthScaleDiv>
                <CharInsideBar />
              </CharForthScaleDiv>
              <CharForthScaleDiv>
                <CharInsideBar />
              </CharForthScaleDiv>
              <CharForthScaleDiv style={{ textAlign: 'right' }}>
                <CharInsideBar />
                Prefect
              </CharForthScaleDiv>
            </CharBar>
          </div>
          <br />
          <div className={(!char.quality) ? 'hidden' : ''}>
            Quality
            <CharBar>
              <div style={{
                transform: 'translate(-50%, -5%)', width: '30px', position: 'absolute', left: `${(char.quality / 5) * 100}%`,
              }}
              >
                <Triangle />
              </div>
              <CharForthScaleDiv>
                <CharInsideBar />
                Poor
              </CharForthScaleDiv>
              <CharForthScaleDiv>
                <CharInsideBar />
              </CharForthScaleDiv>
              <CharForthScaleDiv>
                <CharInsideBar />
              </CharForthScaleDiv>
              <CharForthScaleDiv style={{ textAlign: 'right' }}>
                <CharInsideBar />
                Prefect
              </CharForthScaleDiv>
            </CharBar>
          </div>
          <br />
          <div className={(!char.length) ? 'hidden' : ''}>
            Length
            <CharBar>
              <div style={{
                transform: 'translate(-50%, -5%)', width: '30px', position: 'absolute', left: `${(char.quality / 5) * 100}%`,
              }}
              >
                <Triangle />
              </div>
              <CharScaleDiv>
                <CharInsideBar />
                Too short
              </CharScaleDiv>
              <CharScaleDiv style={{ textAlign: 'center' }}>
                <CharInsideBar />
                Prefect
              </CharScaleDiv>
              <CharScaleDiv style={{ textAlign: 'right' }}>
                <CharInsideBar />
                Too long
              </CharScaleDiv>
            </CharBar>
          </div>
          <br />
          <div className={(!char.fit) ? 'hidden' : ''}>
            Fit
            <CharBar>
              <div style={{
                transform: 'translate(-50%, -5%)', width: '30px', position: 'absolute', left: `${(char.fit / 5) * 100}%`,
              }}
              >
                <Triangle />
              </div>
              <CharScaleDiv>
                <CharInsideBar />
                Too small
              </CharScaleDiv>
              <CharScaleDiv style={{ textAlign: 'center' }}>
                <CharInsideBar />
                Prefect
              </CharScaleDiv>
              <CharScaleDiv style={{ textAlign: 'right' }}>
                <CharInsideBar />
                Too big
              </CharScaleDiv>
            </CharBar>
          </div>
        </div>
      </RightDiv>
    </RatingDiv>
  );
};

RatingBreakdown.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
  setReviewsData: PropTypes.func.isRequired,
  aveRate: PropTypes.string.isRequired,
  recomPer: PropTypes.number.isRequired,
  star: PropTypes.instanceOf(Object).isRequired,
  char: PropTypes.instanceOf(Object).isRequired,
};

export default RatingBreakdown;
