import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import styled from 'styled-components';
import Modal from '../Modal';

const ReviewFormUl = styled.ul`
  list-style-type: none;
  padding-left: 2px
`;

const Sign = styled.div`
  text-align: right;
  color: red;
  margin: 0;
  padding-right: 10px;
  font-style: italic;
  font-size: 3px
`;

const Characteristics = styled.table`
  table-layout: fixed;
  width: 100%
`;

const CharTd = styled.td`
  width: 30%;
  font-size: 10px
`;
const Photos = styled.div`
  display: flex;
  display: -webkit-flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
`;

const Button = styled.button`
  background: #3C3C3C;
  color: white;
  border-radius: 50px;
  margin: 0 1em;
  margin-bottom: 10px;
  margin-top: 30px;
  padding: 0.5em 2em;
  border-style: none;
  border: 2px solid #333333;
  font-family: 'Poppins', sans-serif;
  width: auto;
  font-size: 14px;

  &:hover {
  background-color: white;
  color: #3C3C3C;
  cursor: pointer;
  };
`;

const ExitButton = styled.button`
  position: absolute;
  right: 0px;
  background: white;
  color: #3C3C3C;
  border-radius: 100px;

  &:hover {
    background-color: black;
    color: white;
    cursor: pointer;
    };
  `;

const ReviewForm = ({
  product, productID, isWritable, setisWritable, char, setDataUpdate, setSort,
}) => {
  const [summary, setSummary] = useState('');
  const [recommend, setRecommend] = useState('');
  const [rating, setRating] = useState(0);
  const [name, setName] = useState('');
  const [body, setBody] = useState('');
  const [email, setEmail] = useState('');
  const [photos, setPhotos] = useState([]);
  const [characteristics, setCharacteristics] = useState({});
  const [selectPhoto, setSelectPhoto] = useState([]);
  const [isupload, setisUpload] = useState(false);
  const [topSign, setTopSign] = useState('');
  const [starSign, setStarSign] = useState('Unselected');
  const [bodySign, setBodySign] = useState('Minimum required character left: [50]');
  const [emailSign, setEmailSign] = useState('');
  const summarySign = ('Can not be empty');
  const recommendSign = ('Unselected');

  const handleSubmit = () => {
    const data = {
      product_id: Number(productID),
      rating: Number(rating),
      summary,
      body,
      recommend: Boolean(recommend),
      name,
      email,
      photos,
      characteristics,
    };
    if ((data.body.length >= 50) && (data.email.includes('@')) && data.summary.length > 0) {
      axios.post('/reviews', data)
        .then((res) => {
          setDataUpdate(res);
          setSort('newest');
          setTopSign('Your Review is posted!');
          setisWritable(false);
        })
        .catch();
    }
  };
  const handleUpload = () => {
    setisUpload(true);
    selectPhoto.forEach((file) => {
      const fd = new FormData();
      fd.append('image', file);
      axios.post('/uploadimage', fd, { headers: { 'content-Type': 'multipart/form-data' } })
        .then((res) => { setPhotos((prev) => [...prev, res.data.displayURL]); setSort('newest'); })
        .catch((err) => console.error(err));
    });
  };
  const onClose = () => { setisWritable(false); };
  const content = (
    <div>
      <h2>
        {`About the ${product.name}`}
      </h2>
      <Sign>{topSign}</Sign>
      <ReviewFormUl>
        <li>
          Overall Rating
          {' '}
          <Sign>{starSign}</Sign>
          <div className="stars">
            <form
              action=""
              onChange={(e) => {
                setRating(e.target.value);
                if (e.target.value === '5') {
                  setStarSign(<p style={{ color: 'green', margin: '0' }}>Great</p>);
                } else if (e.target.value === '4') {
                  setStarSign(<p style={{ color: 'green', margin: '0' }}>Good</p>);
                } else if (e.target.value === '3') {
                  setStarSign(<p style={{ color: 'green', margin: '0' }}>Average</p>);
                } else if (e.target.value === '2') {
                  setStarSign(<p style={{ color: 'green', margin: '0' }}>Fair</p>);
                } else {
                  setStarSign(<p style={{ color: 'green', margin: '0' }}>Poor</p>);
                }
              }}
            >
              <input className="star star-5" id="star-5" type="radio" name="star" value="5" />
              <label className="star star-5" htmlFor="star-5">
                <input className="hidden" />
              </label>
              <input className="star star-4" id="star-4" type="radio" name="star" value="4" />
              <label className="star star-4" htmlFor="star-4">
                <input className="hidden" />
              </label>
              <input className="star star-3" id="star-3" type="radio" name="star" value="3" />
              <label className="star star-3" htmlFor="star-3">
                <input className="hidden" />
              </label>
              <input className="star star-2" id="star-2" type="radio" name="star" value="2" />
              <label className="star star-2" htmlFor="star-2">
                <input className="hidden" />
              </label>
              <input className="star star-1" id="star-1" type="radio" name="star" value="1" />
              <label className="star star-1" htmlFor="star-1">
                <input className="hidden" />
              </label>
            </form>
          </div>
        </li>
        <li>
          Do you recommend this product?
          {recommend.length === 0 ? <Sign>{recommendSign}</Sign> : ''}
          <form onChange={(e) => { setRecommend(e.target.value); }}>
            <input type="radio" name="recommendation" value="true" />
            Yes
            <input type="radio" name="recommendation" value="false" />
            No
          </form>
        </li>
        Characteristics
        <Characteristics style={{ textAlign: 'center' }}>
          <thead>
            <tr>
              <CharTd>&nbsp;</CharTd>
              <CharTd>1</CharTd>
              <CharTd>2</CharTd>
              <CharTd>3</CharTd>
              <CharTd>4</CharTd>
              <CharTd>5</CharTd>
            </tr>
          </thead>
          <tbody
            className={(!char.Size) ? 'hidden' : ''}
            onChange={(e) => {
              setCharacteristics((prev) => (
                { ...prev, [char.Size.id]: Number(e.target.value) }
              ));
            }}
          >
            <tr>
              <CharTd><b>Size</b></CharTd>
              <CharTd>
                <input type="radio" name="size" value="5" />
                <br />
                A size too small
              </CharTd>
              <CharTd>
                <input type="radio" name="size" value="4" />
                <br />
                ½ a size too small
              </CharTd>
              <CharTd>
                <input type="radio" name="size" value="3" />
                <br />
                Prefect
              </CharTd>
              <CharTd>
                <input type="radio" name="size" value="2" />
                <br />
                ½ a size too big
              </CharTd>
              <CharTd>
                <input type="radio" name="size" value="1" />
                <br />
                A size too wide
              </CharTd>
            </tr>
          </tbody>
          <tbody
            className={(!char.Width) ? 'hidden' : ''}
            onChange={(e) => {
              setCharacteristics((prev) => (
                { ...prev, [char.Width.id]: Number(e.target.value) }
              ));
            }}
          >
            <tr>
              <CharTd><b>Width</b></CharTd>
              <CharTd>
                <input type="radio" name="width" value="1" />
                <br />
                Too narrow
              </CharTd>
              <CharTd>
                <input type="radio" name="width" value="2" />
                <br />
                Slightly narrow
              </CharTd>
              <CharTd>
                <input type="radio" name="width" value="3" />
                <br />
                Perfect
              </CharTd>
              <CharTd>
                <input type="radio" name="width" value="4" />
                <br />
                Slightly wide
              </CharTd>
              <CharTd>
                <input type="radio" name="width" value="5" />
                <br />
                Too wide
              </CharTd>
            </tr>
          </tbody>
          <tbody
            className={(!char.Comfort) ? 'hidden' : ''}
            onChange={(e) => {
              setCharacteristics((prev) => (
                { ...prev, [char.Comfort.id]: Number(e.target.value) }
              ));
            }}
          >
            <tr>
              <CharTd>
                <b>Comfort</b>
                <br />
              </CharTd>
              <CharTd>
                <input type="radio" name="comfort" value="1" />
                <br />
                Uncomfortable
              </CharTd>
              <CharTd>
                <input type="radio" name="comfort" value="2" />
                <br />
                Slightly uncomfortable
              </CharTd>
              <CharTd>
                <input type="radio" name="comfort" value="3" />
                <br />
                Ok
              </CharTd>
              <CharTd>
                <input type="radio" name="comfort" value="4" />
                <br />
                Comfortable
              </CharTd>
              <CharTd>
                <input type="radio" name="comfort" value="5" />
                <br />
                Perfect
              </CharTd>
            </tr>
          </tbody>
          <tbody
            className={(!char.Quality) ? 'hidden' : ''}
            onChange={(e) => {
              setCharacteristics((prev) => (
                { ...prev, [char.Quality.id]: Number(e.target.value) }));
            }}
          >
            <tr>
              <CharTd><b>Quality</b></CharTd>
              <CharTd>
                <input type="radio" name="quality" value="1" />
                <br />
                Poor
              </CharTd>
              <CharTd>
                <input type="radio" name="quality" value="2" />
                <br />
                Below average
              </CharTd>
              <CharTd>
                <input type="radio" name="quality" value="3" />
                <br />
                What I expected
              </CharTd>
              <CharTd>
                <input type="radio" name="quality" value="4" />
                <br />
                Pretty great
              </CharTd>
              <CharTd>
                <input type="radio" name="quality" value="5" />
                <br />
                Perfect
              </CharTd>
            </tr>
          </tbody>
          <tbody
            className={(!char.Length) ? 'hidden' : ''}
            onChange={(e) => {
              setCharacteristics((prev) => (
                { ...prev, [char.Length.id]: Number(e.target.value) }
              ));
            }}
          >
            <tr>
              <CharTd>
                <b>Length</b>
              </CharTd>
              <CharTd>
                <input type="radio" name="length" value="1" />
                <br />
                Runs Short
              </CharTd>
              <CharTd>
                <input type="radio" name="length" value="2" />
                <br />
                Runs slightly short
              </CharTd>
              <CharTd>
                <input type="radio" name="length" value="3" />
                <br />
                Perfect
              </CharTd>
              <CharTd>
                <input type="radio" name="length" value="4" />
                <br />
                Runs slightly long
              </CharTd>
              <CharTd>
                <input type="radio" name="length" value="5" />
                <br />
                Runs long
              </CharTd>
            </tr>
          </tbody>
          <tbody
            className={(!char.Fit) ? 'hidden' : ''}
            onChange={(e) => {
              setCharacteristics((prev) => (
                { ...prev, [char.Fit.id]: Number(e.target.value) }));
            }}
          >
            <tr>
              <CharTd><b>Fit</b></CharTd>
              <CharTd>
                <input type="radio" name="fit" value="1" />
                <br />
                Runs tight
              </CharTd>
              <CharTd>
                <input type="radio" name="fit" value="2" />
                <br />
                Runs slightly tight
              </CharTd>
              <CharTd>
                <input type="radio" name="fit" value="3" />
                <br />
                Perfect
              </CharTd>
              <CharTd>
                <input type="radio" name="fit" value="4" />
                <br />
                Runs slightly long
              </CharTd>
              <CharTd>
                <input type="radio" name="fit" value="5" />
                <br />
                Runs long
              </CharTd>
            </tr>
          </tbody>
        </Characteristics>

        <li>Review summary</li>
        <Sign className={(summary.length !== 0) ? 'hidden' : ''}>{summarySign}</Sign>
        <li>
          <input type="text" maxLength="60" placeholder="Example: Best purchase ever!" style={{ width: '90%' }} onChange={(e) => setSummary(e.target.value)} />
        </li>
        <li>Review body</li>
        <Sign>{bodySign}</Sign>
        <li>
          <input
            type="text"
            maxLength="1000"
            placeholder="Why did you like the product or not?"
            style={{ width: '90%', height: '100px' }}
            onChange={(e) => {
              setBody(e.target.value);
              if (e.target.value.length < 50) {
                const remainTextNum = 50 - e.target.value.length;
                setBodySign(`Minimum required character left: [${remainTextNum}]`);
              } else {
                setBodySign(<p style={{ color: 'green', margin: '0' }}>Minimum reached</p>);
              }
            }}
          />
        </li>
        <li>Upload your photos</li>
        <Sign style={{ color: 'green' }}>Maximum 5 photos</Sign>
        <li>
          <div className={selectPhoto.length === 5 || isupload ? 'hidden' : ''}>
            <input
              className="hidden"
              type="file"
              id="image_input"
              accept="image/png, image/jpg"
              onChange={(e) => {
                setSelectPhoto((prev) => [...prev, (e.target.files[0])]);
              }}
            />
            <Button style={{ marginTop: '0px' }} type="button">
              <label htmlFor="image_input">
                CHOOSE A PHOTO
              </label>
            </Button>

          </div>
          <Photos>
            {selectPhoto.map((photo) => (
              <div style={{ position: 'relative' }}>
                <ExitButton
                  type="button"
                  className={isupload ? 'hidden' : ''}
                  onClick={() => { setSelectPhoto(selectPhoto.filter((item) => item !== photo)); }}
                >
                  X

                </ExitButton>
                <img
                  alt="product"
                  style={{ width: '120px' }}
                  src={URL.createObjectURL(photo)}
                />

              </div>
            ))}

          </Photos>
          <Button
            style={{ position: 'relative', left: '70%' }}
            type="button"
            className={isupload ? 'hidden' : ''}
            onClick={() => handleUpload()}
          >
            UPLOAD
          </Button>

        </li>

        <li>What is your nickname</li>
        <Sign className={(name.length !== 0) ? 'hidden' : ''}>{summarySign}</Sign>
        <input type="text" maxLength="60" placeholder="Example: jackson11!" style={{ width: '90%' }} onChange={(e) => setName(e.target.value)} />
        <li>
          <p style={{
            margin: '0', fontSize: '5px', position: 'absolute', right: '10%', textAlign: 'center',
          }}
          >
            For privacy reasons, do not use your full name or email address
          </p>
        </li>
        <li>Your email</li>
        <Sign><i>{emailSign}</i></Sign>
        <li>
          <input
            type="email"
            placeholder="Example: jackson11@email.com"
            style={{ width: '90%' }}
            onChange={(e) => {
              setEmail(e.target.value);
              if ((!e.target.value.includes('@')) || (!e.target.value.includes('.'))) {
                setEmailSign('Not a valid email');
              } else {
                setEmailSign('');
              }
            }}
          />

        </li>
        <li>

          <p style={{
            margin: '0', fontSize: '5px', position: 'absolute', right: '10%', textAlign: 'center',
          }}
          >
            For authentication reasons, you will not be emailed
          </p>
        </li>

        <li>
          <Button
            style={{ position: 'relative', left: '30%' }}
            type="submit"
            onClick={() => { handleSubmit(); }}
          >
            SUBMIT A REVIEW
          </Button>
        </li>
      </ReviewFormUl>
    </div>
  );
  return (
    <div>
      {(isWritable) ? <Modal title="Write Your Review" content={content} onClose={onClose} /> : ''}

    </div>
  );
};

ReviewForm.propTypes = {
  product: PropTypes.instanceOf(Object).isRequired,
  productID: PropTypes.number.isRequired,
  isWritable: PropTypes.bool.isRequired,
  setisWritable: PropTypes.func.isRequired,
  char: PropTypes.instanceOf(Object).isRequired,
  setDataUpdate: PropTypes.func.isRequired,
  setSort: PropTypes.func.isRequired,
};

export default ReviewForm;
