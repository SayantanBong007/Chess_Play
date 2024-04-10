import { expect } from "chai";
import { ethers } from "hardhat";

describe("ChessPlayCore", function () {
  let ChessPlayCore: any;
  let chessPlayCore: any;
  let owner: any;
  let addr1: any;
  let addr2: any;
  let addrs: any[];

  beforeEach(async function () {
    ChessPlayCore = await ethers.getContractFactory("ChessPlayCore");
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
    chessPlayCore = await ChessPlayCore.deploy();
    await chessPlayCore.deployed();
  });

  describe("createMatch", function () {
    it("Should create a new match successfully", async function () {
      const matchId: string = "match1";
      const stakedAmount: any = ethers.utils.parseEther("1");
      await expect(chessPlayCore.connect(addr1).createMatch(matchId, addr1.address, stakedAmount, { value: stakedAmount }))
        .to.emit(chessPlayCore, "MatchCreated")
        .withArgs(matchId, addr1.address, stakedAmount);
    });

    it("Should fail if match already exists", async function () {
      const matchId: string = "match1";
      const stakedAmount: any = ethers.utils.parseEther("1");
      await chessPlayCore.connect(addr1).createMatch(matchId, addr1.address, stakedAmount, { value: stakedAmount });
      await expect(chessPlayCore.connect(addr1).createMatch(matchId, addr1.address, stakedAmount, { value: stakedAmount }))
        .to.be.revertedWith("Already match created with this match id");
    });
  });

  describe("joinMatch", function () {
    it("Should let a user join an existing match", async function () {
      const matchId: string = "match1";
      const stakedAmount: any = ethers.utils.parseEther("1");
      await chessPlayCore.connect(addr1).createMatch(matchId, addr1.address, stakedAmount, { value: stakedAmount });
      await expect(chessPlayCore.connect(addr2).joinMatch(matchId, { value: stakedAmount }))
        .to.emit(chessPlayCore, "MatchStarted")
        .withArgs(matchId, addr2.address);
    });
  });

  describe("endMatch", function () {
    it("Should end a match correctly", async function () {
      const matchId: string = "match1";
      const stakedAmount: any = ethers.utils.parseEther("1");
      await chessPlayCore.connect(addr1).createMatch(matchId, addr1.address, stakedAmount, { value: stakedAmount });
      await chessPlayCore.connect(addr2).joinMatch(matchId, { value: stakedAmount });
      await expect(chessPlayCore.connect(addr1).endMatch(matchId, "matchURI", "nftURI", 0)) // Assuming 0 is for DRAW
        .to.emit(chessPlayCore, "MatchEnded")
        .withArgs(matchId, addr1.address, addr2.address, 0, "matchURI");
    });
  });
});