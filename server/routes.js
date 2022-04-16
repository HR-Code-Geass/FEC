const router = require('express').Router();
const multer = require('multer');
const fetchData = require('./dataParser');
const uploadImage = require('./apis/imageupload');

const upload = multer({});

// Products
router.get('/products', (req, res) => {
  const { page } = req.query;
  const { count } = req.query;
  fetchData.products.fetchProductsData(page, count)
    .then((result) => res.send(result))
    .catch((err) => {
      console.error(`Error fetching products from Heroku API: ${err.message}`);
      res.status(400).json({ message: err.message });
    });
});

router.get('/products/:product_id', (req, res) => {
  const productID = req.params.product_id;
  fetchData.products.fetchProductIDData(productID)
    .then((result) => res.send(result))
    .catch((err) => {
      console.error(`Error getting product information for product id ${productID} in Heroku API: ${err.message}`);
      res.status(400).json({ message: err.message });
    });
});

router.get('/products/:product_id/styles', (req, res) => {
  const productID = req.params.product_id;
  const style = true;
  fetchData.products.fetchProductIDData(productID, style)
    .then((result) => res.send(result))
    .catch((err) => {
      console.error(`Error getting styles for product w/ id ${productID} in Heroku API: ${err.message}`);
      res.status(400).json({ message: err.message });
    });
});

router.get('/products/:product_id/related', (req, res) => {
  const productID = req.params.product_id;
  const related = true;
  const styled = false;
  fetchData.products.fetchProductIDData(productID, styled, related)
    .then((result) => res.send(result))
    .catch((err) => console.error(err));
});

// Reviews
router.get('/reviews', (req, res) => {
  const productID = req.query.product_id;
  const { page } = req.query;
  const { count } = req.query;
  const { sort } = req.query;
  fetchData.reviews.fetchReviewsData(sort, productID, page, count)
    .then((result) => res.send(result))
    .catch((err) => {
      console.error(`Error fetching reviews from Heroku API: ${err.message}`);
      res.status(400).json({ message: err.message });
    });
});

router.get('/reviews/meta', (req, res) => {
  const productID = req.query.product_id;
  fetchData.reviews.fetchReviewMeta(productID)
    .then((result) => res.send(result))
    .catch((err) => {
      console.error(`Error fetching reviews meta from Heroku API ${err.message}`);
      res.status(400).json({ message: err.message });
    });
});

router.post('/reviews', (req, res) => {
  fetchData.reviews.addReview(req.body)
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.error(`Error adding review. Response from Heroku API: ${err.message}`);
      res.status(400).json({ message: err.message });
    });
});

router.put('/reviews/:review_id/helpful', (req, res) => {
  fetchData.reviews.markReviewAsHelpful(req.params.review_id)
    .then(() => res.sendStatus(204))
    .catch((err) => {
      console.error(`Error marking review w/ id ${req.params.review_id} in Heroku API: ${err.message}`);
      res.status(400).json({ message: err.message });
    });
});

router.put('/reviews/:review_id/report', (req, res) => {
  fetchData.reviews.reportReview(req.params.review_id)
    .then(() => res.sendStatus(204))
    .catch((err) => {
      console.error(`Error reporting review w/ id ${req.params.review_id} in Heroku API: ${err.message}`);
      res.status(400).json({ message: err.message });
    });
});

/* --------------------------- Questions and Answers ---------------------------*/
//
router.get('/qa/questions', (req, res) => {
  const productID = req.query.product_id;
  const { page } = req.query;
  const { count } = req.query;
  fetchData.questions.fetchQuestionsData(productID, page, count)
    .then((result) => res.send(result))
    .catch((err) => {
      console.error(`Error fetching questions from Heroku API: ${err.message}`);
      res.status(400).json({ message: err.message });
    });
});

router.get('/qa/questions/:question_id/answers', (req, res) => {
  const questionID = req.params.question_id;
  fetchData.questions.fetchAnswerData(questionID)
    .then((result) => res.send(result))
    .catch((err) => {
      console.error(`Error getting answers for question w/ id ${questionID}: ${err.message}`);
      res.status(400).json({ message: err.message });
    });
});

router.post('/qa/questions', (req, res) => {
  fetchData.questions.addQuestion(req.body)
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.error(`Error adding question. Response from Heroku API: ${err.message}`);
      res.status(400).json({ message: err.message });
    });
});

router.post('/qa/questions/:question_id/answers', (req, res) => {
  const questionID = req.params.question_id;
  fetchData.questions.addAnswer(questionID, req.body)
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.error(`Error adding answer to question w/ id ${questionID} to Heroku API: ${err.message}`);
      res.status(400).json({ message: err.message });
    });
});

router.put('/qa/questions/:question_id/helpful', (req, res) => {
  const questionID = req.params.question_id;
  fetchData.questions.makeQuestionAsHelpful(questionID)
    .then(() => res.sendStatus(204))
    .catch((err) => {
      console.error(`Error marking question w/ id ${questionID} helpful in Heroku API: ${err.message}`);
      res.status(400).json({ message: err.message });
    });
});

router.put('/qa/questions/:question_id/report', (req, res) => {
  const questionID = req.params.question_id;
  fetchData.questions.reportQuestion(questionID)
    .then(() => res.sendStatus(204))
    .catch((err) => {
      console.error(`Error reporting question w/ id ${questionID} in Heroku API: ${err.message}`);
      res.status(400).json({ message: err.message });
    });
});

router.put('/qa/answers/:answer_id/helpful', (req, res) => {
  const answerID = req.params.answer_id;
  fetchData.questions.makeAnswerAsHelpful(answerID)
    .then(() => res.sendStatus(204))
    .catch((err) => {
      console.error(`Error marking answer w/ id ${answerID} in Heroku API: ${err.message}`);
      res.status(400).json({ message: err.message });
    });
});

router.put('/qa/answers/:answer_id/report', (req, res) => {
  const answerID = req.params.answer_id;
  fetchData.questions.reportAnswer(answerID)
    .then(() => res.sendStatus(204))
    .catch((err) => {
      console.error(`Error reporting answer w/ id ${answerID} in Heroku API: ${err.message}`);
      res.status(400).json({ message: err.message });
    });
});

// Cart
router.get('/cart', (req, res) => {
  fetchData.cart.fetchCartData()
    .then((result) => res.send(result))
    .catch((err) => {
      console.error(`Error fetching cart from Heroku API: ${err.message}`);
      res.status(400).json({ message: err.message });
    });
});

router.post('/cart', (req, res) => {
  fetchData.cart.addCart(req.body)
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.error(`Error adding to cart. Response from Heroku API: ${err.message}`);
      res.status(400).json({ message: err.message });
    });
});

/* Image uploading to ImageBB -- sends `displayURL` back to front-end upon
successful image upload or `message` containing error message. */
router.post('/uploadimage', upload.single('image'), (req, res) => {
  console.log(`Attempting to upload image: ${req.file}`);
  uploadImage(req.file)
    .then((apiRes) => {
      const { display_url: displayURL } = apiRes.data.data;
      res.json({ displayURL });
    })
    .catch((err) => {
      console.error(`Error uploading image. Response from API: ${err.message}`);
      res.status(400).json({ message: err.message });
    });
});

module.exports = router;
