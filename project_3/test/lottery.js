const Lottery = artifacts.require("Lottery");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("Lottery", function ( accounts ) {
  let instance;
  beforeEach(async () => {
    instance = await Lottery.deployed();
  })
  // it("should assert true", async function () {
  //   await Lottery.deployed();
  //   return assert.isTrue(true);
  // });
  it('deploys a contract', () => {
    assert.ok(instance.address);
  })
  it('allows one account to enter', async () => {
    await instance.enter({from: accounts[0], value: web3.utils.toWei('.002', 'ether')});
    const players = await instance.getPlayers({from: accounts[0]});
    assert.equal(accounts[0], players[0]);
    assert.equal(1, players.length);
  })
  it('allows multiple accounts to enter', async () => {
    await instance.enter({from: accounts[1], value: web3.utils.toWei('.002', 'ether')});
    await instance.enter({from: accounts[2], value: web3.utils.toWei('.002', 'ether')});
    await instance.enter({from: accounts[3], value: web3.utils.toWei('.002', 'ether')});
    await instance.enter({from: accounts[4], value: web3.utils.toWei('.002', 'ether')});
    const players = await instance.getPlayers({from: accounts[0]});
    assert.equal(accounts[1], players[1]);
    assert.equal(accounts[2], players[2]);
    assert.equal(accounts[3], players[3]);
    assert.equal(accounts[4], players[4]);
    assert.equal(5, players.length);
  })
  it('requires a min amount of eth to enter', async () => {
    try {
      await instance.enter({from: accounts[5], value: web3.utils.toWei('.001', 'ether')});
      assert(false);
    }
    catch (err) {
      // console.log(err);
      assert(err);
    }
  })
  it('requires manager to call pickWinner', async () => {
    try {
      await instance.pickWinner({from: accounts[1]});
      assert(false);
    }
    catch (err) {
      // console.log(err);
      assert(err);
    }
  })
  it('resets the players array after pickWinner is called', async () => {
    await instance.pickWinner();
    const playersArray = await instance.getPlayers();
    assert.equal(0, playersArray.length);
  })
  it('sends money to winner and resets the players array', async () => {
    await instance.enter({from: accounts[0], value: web3.utils.toWei('1', 'ether')});
    const initialBalance = await web3.eth.getBalance(accounts[0]);
    // console.log('initialBalance: ', initialBalance);
    await instance.pickWinner({from: accounts[0]});
    const finalBalance = await web3.eth.getBalance(accounts[0]);
    // console.log('final Balance: ', finalBalance)
    const difference = finalBalance - initialBalance;
    const gasSpent = web3.utils.fromWei(`${web3.utils.toWei('1', 'ether') - difference}`, 'ether');
    // console.log('gas spent: ', gasSpent);
    assert(gasSpent > .0002);
  })
});
