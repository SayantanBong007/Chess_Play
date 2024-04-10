const Match = require("../model/matchModel");
const AppError = require("../utils/AppError");
const { catchAsync } = require("../utils/catchAsync");
const { v4: uuidv4 } = require('uuid');

// Controller function to create a new match
exports.createMatch = catchAsync(async (req, res, next) => {
    const { matchCreatorAddress, stackedAmount } = req.body;
    const matchId = uuidv4();
    const _match = await Match.findOne({matchId});

    if (_match) {
        return next(new AppError("Match already created with this id", 400));
    }
    const newMatch = await Match.create({ matchId, matchCreatorAddress, stackedAmount });
    return res.status(200).send({ success: true, data: newMatch });
})

// Controller function to get a match by its ID
exports.getMatchById = catchAsync(async (req, res, next) => {
    const matchId = req.params.matchId;
    const match = await Match.findOne({matchId});

    if (!match) {
        return next(new AppError("No Match found with that ID", 404));
    }
    return res.status(200).send({ success: true, data: match });
})

// Controller function to get matches by user address
exports.getMatchsByUserAddress = catchAsync(async (req, res, next) => {
    const userAddress = req.params.userAddress;
    const matches = await Match.find({$or: [{matchCreatorAddress:userAddress},{matchJoinerAddress: userAddress}]});
    return res.status(200).send({ success: true, data: matches });
})

// Controller function to join a match
exports.joinMatch = catchAsync(async (req, res, next) => {
    const { matchId, matchJoinerAddress } = req.body;
    const match = await Match.findOneAndUpdate({matchId}, {
        matchJoinerAddress
    });
    if (!match) {
        return next(new AppError("No Match found with that ID", 404));
    }
    return res.status(200).send({ success: true, data: match });
})

// Controller function to set the winner of a match
exports.setMatchWinner = catchAsync(async (req, res, next) => {
    const { matchId, matchWinnerAddress,matchResultStatus } = req.body;
    const match = await Match.findOneAndUpdate({matchId}, {
        matchWinnerAddress,
        matchResultStatus
    });
    if (!match) {
        return next(new AppError("No Match found with that ID", 404));
    }
    return res.status(200).send({ success: true, data: match });
})

// Controller function to mark a reward as claimed
exports.rewardClaimed = catchAsync(async (req, res, next) => {
    const { matchId } = req.body;
    const match = await Match.findOneAndUpdate({matchId}, {
        rewardClaimed: true
    });
    if (!match) {
        return next(new AppError("No Match found with that ID", 404));
    }
    return res.status(200).send({ success: true, data: match });
})
