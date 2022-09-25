const Campaign = artifacts.require("Campaign");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("Campaign", function (/* accounts */) {
  it("should assert true", async function () {
    await Campaign.deployed();
    return assert.isTrue(true);
  });
});
