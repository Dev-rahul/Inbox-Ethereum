const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');

const web3 = new Web3(ganache.provider());
const {interface , bytecode} = require('../compile')

/* class Car {
    park() {
        return 'Stopped'
    }
    drive () {
        return 'Vroom!!'
    }
}

describe('Car', () => {
    it('can part', () => {
        const car = new Car();
        assert.equal(car.park(), 'Stopped')
    }) 

    it('can drive', () => {
        const car = new Car();
        assert.equal(car.drive(), 'Vroom!!')
    })
}) */
let accounts;
const initial_string = 'Hi There!';

beforeEach(async () => {
   accounts = await web3.eth.getAccounts();


 inbox = await  new web3.eth.Contract(JSON.parse(interface))
   .deploy({data: bytecode, arguments:[initial_string]})
   .send({from : accounts[0], gas: '1000000'})
});

describe('Inbox', () => {
    it('deployes a contract', () => {
        assert.ok(inbox.options.address);
    });
    
    it('has a default message', async ()=> {
        const message = await inbox.methods.message().call();
        assert.equal(message, initial_string)
    })
    it('can change the Message', async () => {
       await inbox.methods.setMessage('bye').send({from : accounts[0]});
       const message = await inbox.methods.message().call();
       assert.equal(message, 'bye')
    })
});