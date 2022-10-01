const CampaignFactory = artifacts.require("CampaignFactory");
const Campaign = artifacts.require("Campaign");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("CampaignFactory", function (accounts) {
  let factory;
  let campaignAddress;
  let campaign;

  beforeEach(async () => {
    factory = await CampaignFactory.deployed();
    await factory.createCampaign('1', {from: accounts[0]});
    [campaignAddress] = await factory.getDeployedCampaigns();

    campaign = await new web3.eth.Contract(
      Campaign.abi,
      campaignAddress
    )
    // console.log(campaign);
  })
  // it("should assert true", async function () {
  //   await CampaignFactory.deployed();
  //   return assert.isTrue(true);
  // });
  describe('Campaigns', () => {
    it('deploys factory contract and campaign contracts', () => {
      assert.ok(factory.address);
      assert.ok(campaign.options.address);
    })
    it('marks caller as the campaign manager', async () => {
      const manager = await campaign.methods.manager().call();
      assert.equal(accounts[0], manager);
    })
    it('allows people to contribute, and marks them as approver', async () => {
      await campaign.methods.contribute().send({
        from: accounts[1],
        value: '200'
      })
      const isApproved = campaign.methods.approvers(accounts[1]).call()
      assert(isApproved)
    })
    it('requires a min contribution', async () => {
      try {
        await campaign.methods.contribute().send({
          from: accounts[2],
          value: '200'
        })
        assert(false);
      }
      catch (err) {
        assert(err)
      }
    })
    it('allows manager to make a payment request', async () => {
      await campaign.methods.createRequest(
        'Buy batteries',
        '100',
        accounts[3]
      ).send({
        from: accounts[0],
        gas: '3000000'
      })
      const request = await campaign.methods.requests(0).call()
      assert.equal('Buy batteries', request.description)
    })
    it('processes requests', async () => {
      let beforeBalance = await web3.eth.getBalance(accounts[1])
      beforeBalance = web3.utils.fromWei(beforeBalance, 'ether')
      beforeBalance = parseFloat(beforeBalance)
      // const contractBalanceBefore = await web3.eth.getBalance(campaignAddress)
      // console.log(contractBalanceBefore)
      // console.log(await campaign.methods.requests(0).call())

      await campaign.methods.contribute().send({
        from: accounts[0],
        value: web3.utils.toWei('3', 'ether')
      })
      await campaign.methods.createRequest(
        'send money cause',
        web3.utils.toWei('2', 'ether'),
        accounts[1]
      ).send({
        from: accounts[0],
        gas: '1000000'
      })
      await campaign.methods.approveRequest(0).send({
        from: accounts[0],
        gas: '1000000'
      })

      await campaign.methods.finalizeRequest(0).send({
        from: accounts[0],
        gas: '1000000'
      })
      // console.log(await campaign.methods.requests(0).call())
      let balance = await web3.eth.getBalance(accounts[1])
      balance = web3.utils.fromWei(balance, 'ether')
      balance = parseFloat(balance)
      // console.log(beforeBalance, balance)
      assert.equal(balance > balanceBefore, true)
      // const contractBalance = await web3.eth.getBalance(campaignAddress)
      // console.log(contractBalance)
    })
  })

});
