const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
    // Define the field for match ID
    matchId: {
        type: String,
        required: [true, "There must be a Match Id"],
        unique: true
    },
    // Define the field for match creator address
    matchCreatorAddress: {
        type: String,
        required: [true, "There must be a game creator"],
    },
    // Define the field for stacked amount
    stackedAmount: {
        type: Number,
        required: [true, "There must be a staked amount"],
        default: 0
    },
    // Define the field for match joiner address
    matchJoinerAddress: {
        type: String,
        default: ""
    },
    // Define the field for match winner address
    matchWinnerAddress: {
        type: String,
        default: ""
    },
    // Define the field for match result status
    matchResultStatus: {
        type: String,
        default: "NOT",
        enum: { values: ['NOT', 'WON', 'DRAW'], message: 'Result can only be NOT, WON ,DRAW' }
    },
    // Define the field for reward claimed status
    rewardClaimed: {
        type: Boolean,
        default: false
    },
    // Define the field for creation date
    createdAt: {
        type: Date,
        default: Date.now(),
    }
})

// Create a model based on the match schema
const Match = mongoose.model("MatchDetails", matchSchema);
module.exports = Match;
