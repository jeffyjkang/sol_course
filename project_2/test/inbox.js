// mocha, assert, web3 all come pre-bundled w/ truffle test

const Inbox = artifacts.require("Inbox");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */

contract("Inbox", function (accounts) {
  // console.log(accounts)
  let instance;
  beforeEach(async () => {
    instance = await Inbox.deployed()
  })
  // it("should assert true", async function () {
  //   await Inbox.deployed();
  //   return assert.isTrue(true);
  // });
  it('deploys a contract', () => {
    assert.ok(instance.address)
  })
  it('should return message', async () => {
    const val = await instance.getMessage()
    assert.equal(val, 'Hello world!')
  })
  it('should set message', async () => {
    await instance.setMessage('Bye world!')
    const newVal = await instance.getMessage()
    assert.equal(newVal, 'Bye world!')
  })
  it('can set message from another account', async () => {
    await instance.setMessage('Hello again world!', { from: accounts[1] })
    const nVal = await instance.getMessage()
    assert.equal(nVal, 'Hello again world!')
  })
});
