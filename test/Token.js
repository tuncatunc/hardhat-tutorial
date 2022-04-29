const { expect } = require("chai");
const chai = require("chai")
const { solidity } = require("ethereum-waffle");

chai.use(solidity);

describe("Token contract", function () {

  let Token;
  let hardhatToken;
  let owner;
  let user1;
  let user2;
  let user3;
  let addrs;

  beforeEach(async function () {
    Token = await ethers.getContractFactory("Token");
    [owner, user1, user2, user3, ...addrs] = await ethers.getSigners();

    hardhatToken = await Token.deploy();
  })

  describe("Deployment", function () {
    it("Should set the right owner", async () => {
      expect(await hardhatToken.owner()).to.equal(owner.address);
    })

    it("Deployment should assign the total supply of tokens to the owner", async () => {

      const ownerBalance = await hardhatToken.balanceOf(owner.address);

      expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
    });
  })
  describe("Transactions", function () {
    it("Should transfer tokens from one account to another", async () => {

      const user1Balance = await hardhatToken.balanceOf(user1.address);

      expect(user1Balance).to.equal(0);

      await hardhatToken.transfer(user1.address, 10);

      const user1BalanceAfter = await hardhatToken.balanceOf(user1.address);

      expect(user1BalanceAfter).to.equal(10);

      const user2Balance = await hardhatToken.balanceOf(user2.address);

      expect(user2Balance).to.equal(0);

      await hardhatToken.transfer(user2.address, 10);

      const user2BalanceAfter = await hardhatToken.balanceOf(user2.address);

      expect(user2BalanceAfter).to.equal(10);
    })

    it("Should fail if the sender doesn't have enough balance", async () => {

      await hardhatToken.transfer(user1.address, 10);
      const user1BalanceAfter = await hardhatToken.balanceOf(user1.address);
      expect(user1BalanceAfter).to.equal(10);

      await expect(hardhatToken.connect(user1).transfer(user2.address, 20)).to.be.revertedWith("Not enough balance");
    })
  })
})

