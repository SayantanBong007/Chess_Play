const express = require("express");
const { createMatch, getMatchById, joinMatch, setMatchWinner, rewardClaimed, getMatchsByUserAddress } = require("../controller/matchController");

// Create a new router instance
const matchRouter = express.Router();

// Define route for creating a match
matchRouter
    .route("/create")
    .post(createMatch);

// Define route for getting matches by user address
matchRouter
    .route("/usermatchs/:userAddress")
    .get(getMatchsByUserAddress);
    
// Define route for getting a match by match ID
matchRouter
    .route("/:matchId")
    .get(getMatchById);

// Define route for joining a match
matchRouter
    .route("/joinmatch")
    .patch(joinMatch);
    
// Define route for setting match winner
matchRouter
    .route("/setmatchwinner")
    .patch(setMatchWinner);

// Define route for claiming reward
matchRouter
    .route("/rewardClaimed")
    .patch(rewardClaimed);

// Export the match router
module.exports = matchRouter;