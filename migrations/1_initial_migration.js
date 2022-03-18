var MyToken = artifacts.require("./Migrations.sol");

module.exports = async function (deployer) {
    await deployer.deploy(MyToken, INITIAL_TOKENS);
};
