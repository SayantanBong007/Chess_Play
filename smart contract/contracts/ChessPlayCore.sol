pragma solidity ^0.8.12;

import "./interfaces/IChessPlayCore.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

/**
 * @dev Contract for managing chess matches and NFT minting.
 */
contract ChessPlayCore is
    Ownable,
    ERC721,
    ReentrancyGuard,
    ERC721URIStorage,
    ERC721Enumerable,
    IChessPlayCore
{
    mapping(string => Match) public matchUserDetails;

    uint256 constant WINNER_STAKED_AMOUNT_MULTIPLIER = 2;

    constructor() ERC721("ChessPlayNFT", "CPNFT") {}

    /**
     * @dev Mint an NFT for the winner of a match.
     * @param _winner The address of the match winner.
     * @param _tokenURI The URI for the token.
     * @return The ID of the minted NFT.
     */
    function mintNft(address _winner, string memory _tokenURI)
        private
        returns (uint256)
    {
        uint256 total = totalSupply();
        uint256 nftId = total + 1;
        _mint(_winner, nftId);
        _setTokenURI(nftId, _tokenURI);
        return nftId;
    }

    /**
     * @notice Create a new match with the specified details.
     * @param _matchId The unique ID of the match.
     * @param _matchCreator The address of the match creator.
     * @param _stakedAmount The amount staked for the match.
     */
    function createMatch(
        string memory _matchId,
        address _matchCreator,
        uint256 _stakedAmount
    ) external payable {
        require(
            matchUserDetails[_matchId]._matchStatus == MatchStatus.NOT_CREATED,
            "Already match created with this match id"
        );
        require(msg.value >= _stakedAmount, "send full stake amount");

        matchUserDetails[_matchId]._matchStatus = MatchStatus.CREATED;
        matchUserDetails[_matchId]._matchId = _matchId;
        matchUserDetails[_matchId]._matchCreator = _matchCreator;
        matchUserDetails[_matchId]._stakedAmount = _stakedAmount;
        matchUserDetails[_matchId]._createTime = block.timestamp;

        emit MatchCreated(_matchId, _matchCreator, _stakedAmount);
    }

    /**
     * @notice Join an existing match with the specified ID.
     * @param _matchId The ID of the match to join.
     * @param _matchJoiner The address of the match joiner.
     */
    function joinMatch(string memory _matchId, address _matchJoiner)
        external
        payable
    {
        require(
            matchUserDetails[_matchId]._matchStatus == MatchStatus.CREATED,
            "Invalid request for this match ID"
        );
        require(
            msg.value >= matchUserDetails[_matchId]._stakedAmount,
            "send full stake amount"
        );

        matchUserDetails[_matchId]._matchStatus = MatchStatus.STARTED;
        matchUserDetails[_matchId]._matchJoiner = _matchJoiner;
        matchUserDetails[_matchId]._startTime = block.timestamp;
        emit MatchStarted(_matchId, _matchJoiner);
    }

    /**
     * @notice End a match with the specified ID and result.
     * @param _matchId The ID of the match to end.
     * @param _matchURI The URI for the match data.
     * @param _matchNFTURI The URI for the NFT associated with the match.
     * @param _gameResult The result of the match.
     */
    function endMatch(
        string memory _matchId,
        string memory _matchURI,
        string memory _matchNFTURI,
        MatchResult _gameResult
    ) external {
        require(
            matchUserDetails[_matchId]._matchStatus == MatchStatus.STARTED,
            "Invalid request for this match ID"
        );
        require(
            msg.sender == matchUserDetails[_matchId]._matchCreator ||
                msg.sender == matchUserDetails[_matchId]._matchJoiner,
            "only match creator, joiner, or admin"
        );

        matchUserDetails[_matchId]._matchStatus = MatchStatus.ENDED;
        matchUserDetails[_matchId]._gameResult = _gameResult;
        matchUserDetails[_matchId]._matchURI = _matchURI;
        matchUserDetails[_matchId]._endTime = block.timestamp;

        address winnerAddress = address(0);

        if (_gameResult == MatchResult.DRAW) {
            _transferAmount(
                matchUserDetails[_matchId]._matchCreator,
                matchUserDetails[_matchId]._stakedAmount
            );
            _transferAmount(
                matchUserDetails[_matchId]._matchJoiner,
                matchUserDetails[_matchId]._stakedAmount
            );
        } else if (_gameResult == MatchResult.MATCH_CREATOR) {
            winnerAddress = matchUserDetails[_matchId]._matchCreator;
        } else if (_gameResult == MatchResult.MATCH_JOINER) {
            winnerAddress = matchUserDetails[_matchId]._matchJoiner;
        }

        if (winnerAddress != address(0)) {
            uint256 nftId = mintNft(winnerAddress, _matchNFTURI);

            matchUserDetails[_matchId]._nftId = nftId;

            _transferAmount(
                winnerAddress,
                WINNER_STAKED_AMOUNT_MULTIPLIER * matchUserDetails[_matchId]._stakedAmount
            );
        }

        emit MatchEnded(
            _matchId,
            matchUserDetails[_matchId]._matchCreator,
            matchUserDetails[_matchId]._matchJoiner,
            _gameResult,
            _matchURI
        );
    }

    function _transferAmount(address _user, uint256 _amount)
        private
        nonReentrant
    {
        (bool success, ) = address(_user).call{value: _amount}("");
        require(success, "sending money failed");
    }

    /**
     * @dev Get the NFT token IDs owned by a specific address.
     * @param _owner The address of the owner.
     * @return An array of token IDs.
     */
    function walletOfOwner(address _owner)
        public
        view
        returns (uint256[] memory)
    {
        uint256 ownerTokenCount = balanceOf(_owner);
        uint256[] memory tokenIds = new uint256[](ownerTokenCount);
        for (uint256 i; i < ownerTokenCount; i++) {
            tokenIds[i] = tokenOfOwnerByIndex(_owner, i);
        }
        return tokenIds;
    }

    /**
     * @dev Get the NFT token URIs owned by a specific address.
     * @param _owner The address of the owner.
     * @return An array of token URIs.
     */
    function walletOfOwnerURIs(address _owner)
        public
        view
        returns (string[] memory)
    {
        uint256 ownerTokenCount = balanceOf(_owner);
        string[] memory tokenUris = new string[](ownerTokenCount);
        for (uint256 i; i < ownerTokenCount; i++) {
            tokenUris[i] = tokenURI(tokenOfOwnerByIndex(_owner, i));
        }
        return tokenUris;
    }

    // The following functions are overrides required by Solidity for NFT contract.
    function _beforeTokenTransfer(
        address _from,
        address _to,
        uint256 _tokenId,
        uint256 _batchSize
    ) internal override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(_from, _to, _tokenId, _batchSize);
    }

    function _burn(uint256 _tokenId)
        internal
        override(ERC721, ERC721URIStorage)
    {
        super._burn(_tokenId);
    }

    function tokenURI(uint256 _tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(_tokenId);
    }

    function supportsInterface(bytes4 _interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(_interfaceId);
    }
}
