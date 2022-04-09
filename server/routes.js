const router = require('express').Router();
const fetchData = require('./dataParser');

// Products
router.get('/products', (req, res) => {
  const { page } = req.query;
  const { count } = req.query;
  fetchData.products.fetchProductsData(page, count)
    .then((result) => res.send(result));
});

router.get('/products/:product_id', (req, res) => {
  const productID = req.params.product_id;
  fetchData.products.fetchProductIDData(productID)
    .then((result) => res.send(result));
});

router.get('/products/:product_id/styles', (req, res) => {
  const productID = req.params.product_id;
  const style = true;
  fetchData.products.fetchProductIDData(productID, style)
    .then((result) => res.send(result));
});

router.get('/products/:product_id/related', (req, res) => {
  const productID = req.params.product_id;
  const related = true;
  const styled = false;
  fetchData.products.fetchProductIDData(productID, styled, related)
    .then((result) => res.send(result));
});

// Reviews
router.get('/reviews', (req, res) => {
  const productID = req.query.product_id;
  const { page } = req.query;
  const { count } = req.query;
  const { sort } = req.query;
  fetchData.reviews.fetchReviewsData(sort, productID, page, count)
    .then((result) => res.send(result));
});

router.get('/reviews/meta', (req, res) => {
  const productID = req.query.product_id;
  fetchData.reviews.fetchReviewMeta(productID)
    .then((result) => res.send(result));
});

router.post('/reviews', (req, res) => {
  fetchData.reviews.addReview(req.body)
    .then(() => res.sendStatus(201));
});

router.put('/reviews/:review_id/helpful', (req, res) => {
  fetchData.reviews.markReviewAsHelpful(req.params.review_id)
    .then(() => res.sendStatus(204));
});

router.put('/reviews/:review_id/report', (req, res) => {
  fetchData.reviews.reportReview(req.params.review_id)
    .then(() => res.sendStatus(204));
});

// Questions and Answers
router.get('/qa/questions', (req, res) => {
  const productID = req.query.product_id;
  const { page } = req.query;
  const { count } = req.query;
  fetchData.questions.fetchQuestionsData(productID, page, count)
    .then((result) => res.send(result));
});

router.get('/qa/questions/:question_id/answers', (req, res) => {
  const questionID = req.params.question_id;
  fetchData.questions.fetchAnswerData(questionID)
    .then((result) => res.send(result));
});

router.post('/qa/questions', (req, res) => {
  fetchData.questions.addQuestion(req.body)
    .then(() => res.sendStatus(201));
});

router.post('/qa/questions/:question_id/answers', (req, res) => {
  fetchData.questions.addAnswer(req.params.question_id, req.body)
    .then(() => res.sendStatus(201));
});

router.put('/qa/questions/:question_id/helpful', (req, res) => {
  fetchData.questions.makeQuestionAsHelpful(req.params.question_id)
    .then(() => res.sendStatus(204));
});

router.put('/qa/questions/:question_id/report', (req, res) => {
  fetchData.questions.reportQuestion(req.params.question_id)
    .then(() => res.sendStatus(204));
});

router.put('/qa/answers/:answer_id/helpful', (req, res) => {
  fetchData.questions.makeAnswerAsHelpful(req.params.answer_id)
    .then(() => res.sendStatus(204));
});

router.put('/qa/answers/:answer_id/report', (req, res) => {
  fetchData.questions.reportAnswer(req.params.answer_id)
    .then(() => res.sendStatus(204));
});

// Cart
router.get('/cart', (req, res) => {
  fetchData.cart.fetchCartData()
    .then((result) => res.send(result));
});
router.post('/cart', (req, res) => {
  fetchData.cart.addCart(req.body)
    .then(() => res.sendStatus(201));
});

module.exports = router;
