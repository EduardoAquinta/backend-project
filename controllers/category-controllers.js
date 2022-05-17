const express = require("express");
const app = express();
app.use(express.json());

const {selectCategory} = require("../models/category-models");

//A controller that returns a working OK message
exports.getMessage = (request, response) => {
    const message = {"message" : "all working well"};
        response.status(200).send(message);
};

//A controller for fetching the category table contents
exports.getCategory = (request, response) => {
    selectCategory().then((categories) => {
        response.status(200).send({categories: categories});
        });
};

//A controller for fetching a review inputted in the url by the user
exports.getReview = (request, response, next) => {
    const {review_id} = request.params;
    selectReview(review_id).then((review) => {
        response.status(200).send({ review });
    })
    .catch((error) => {
        next(error);
    });
};