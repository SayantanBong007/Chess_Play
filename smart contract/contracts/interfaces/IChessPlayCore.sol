// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

interface IChessPlayCore {
    enum MatchResult {
        MATCH_CREATOR,
        MATCH_JOINER,
        DRAW
    }

    enum MatchStatus {
        NOT_CREATED,
        CREATED,
        STARTED,
        ENDED
    }

    struct Match {
        MatchStatus _matchStatus;
        string _matchId;
        address _matchCreator;
        address _matchJoiner;
        uint256 _stakedAmount;
        MatchResult _gameResult;
        string _matchURI;
        uint256 _nftId;
        uint256 _createTime;
        uint256 _startTime;
        uint256 _endTime;
    }

    event MatchCreated(
        string indexed _matchId,
        address indexed _matchCreator,
        uint256 _stakeAmount
    );
    event MatchStarted(string indexed _matchId, address indexed _mathJoiner);
    event MatchEnded(
        string indexed _matchId,
        address indexed _matchCreator,
        address indexed _matchJoiner,
        MatchResult _gameResult,
        string _matchDataURI
    );

    function createMatch(string calldata _matchId, address _matchCreator, uint256 _stakedAmount) external payable;

    function joinMatch(string calldata _matchId, address _matchJoiner) external payable;

    function endMatch(string calldata _matchId, string calldata _matchURI, string calldata _matchNFTURI, MatchResult _gameResult) external;

    function walletOfOwner(address _owner) external view returns (uint256[] memory);

    function walletOfOwnerURIs(address _owner) external view returns (string[] memory);
}