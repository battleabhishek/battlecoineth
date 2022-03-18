var mytoken = artifacts.require("mytoken.sol");

const token = artifacts.required("my token");

const chai = require("./chaisetup.js");
const BN = web3.utils.BN;
const expect = chai.expect;

const { BN, constants, expectEvent, expectRevert } = require('@openzeppelin/test-helpers');
const { expect } = require('chai');
const { ZERO_ADDRESS } = constants;

const {
    shouldBehaveLikeERC20,
    shouldBehaveLikeERC20Transfer,
    shouldBehaveLikeERC20Approve,
} = require('./ERC20.behavior');

const ERC20Mock = artifacts.require('ERC20Mock');
const ERC20DecimalsMock = artifacts.require('ERC20DecimalsMock');

require('dotenv').config({ path: '../.env' });

contract('Token Test', function (accounts) {
    const [initialHolder, recipient, anotherAccount] = accounts;
    beforeEach(async () => {
        this.myToken = await Token.new(process.env.INITIAL_TOKENS);
    });

    it("All tokens should be in my account", async () => {
        //let instance = await Token.deployed();
        let instance = this.myToken;
        let totalSupply = await instance.totalSupply();
        //… more content
        return expect(instance.balanceOf(initialHolder)).to.eventually.be.a.bignumber.equal(totalSupply);

    });

    it("I can send tokens from Account 1 to Account 2", async () => {
        const sendTokens = 1;
        let instance = this.myToken;
        let totalSupply = await instance.totalSupply();
        //… more content
        return expect(instance.balanceOf(recipient)).to.eventually.be.a.bignumber.equal(new BN(sendTokens));
    });

    it("It's not possible to send more tokens than account 1 has", async () => {
        let instance = this.myToken;
        return expect(instance.balanceOf(initialHolder)).to.eventually.be.a.bignumber.equal(balanceOfAccount);
        //… more content
    });
});