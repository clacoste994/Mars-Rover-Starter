const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {

  it('constructor sets position and default values for mode and generatorWatts', function(){
        let rover = new Rover(23,'NORMAL',110);
        expect(rover.position).toBe(23);
        expect(rover.mode).toBe('NORMAL');
        expect(rover.generatorWatts).toBe(110);
  })
  
  it('response returned by receiveMessage contains the name of the message', function(){
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let message = new Message('Test message with two commands', commands);
    let rover = new Rover(98382);   
    let response = rover.receiveMessage(message);
    expect(response.message).toBe('Test message with two commands');
  })

  it('response returned by receiveMessage includes two results if two commands are sent in the message', function(){
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let message = new Message('Test message with two commands', commands);
    let rover = new Rover(8900)
    let response = rover.receiveMessage(message)
  expect(response.results).toEqual([{"completed": true}, {"completed": true, "roverStatus": {"generatorWatts": 110, "mode": "LOW_POWER", "position": 8900}}])
  })

  it('responds correctly to the status check command', function(){
    let commands = [new Command('STATUS_CHECK')];
    let message = new Message('Status check', commands);
    let rover = new Rover(8900)
    let response = rover.receiveMessage(message)
  expect(response.results).toEqual([{completed: true, roverStatus: { mode: 'NORMAL', generatorWatts: 110, position: 8900 }}])  
  })

  it('responds correctly to the mode change command', function(){
    let commands = [new Command('MODE_CHANGE', 'NORMAL')];
    let message = new Message('Changing mode', commands);
    let rover = new Rover(8900)
    let response = rover.receiveMessage(message)
    expect(rover.mode).toEqual('NORMAL')
    expect(response.results).toEqual([{ completed: true }])
  })

  it('responds with a false completed value when attempting to move in LOW_POWER mode', function(){
    let commands = [new Command('MOVE', 8500)];
    let message = new Message("MOVE.", commands);
    let rover = new Rover(8500, 'LOW_POWER')
    let response = rover.receiveMessage(message)
    expect(response.results).toBeFalsy
  })

  it('responds with the position for the move command', function(){
    let commands = [new Command('MOVE', 9000)];
    let message = new Message('Moving rover', commands);
    let rover = new Rover(7000, 'NORMAL')
    let response = rover.receiveMessage(message)
    expect(rover.position).toEqual(9000)
  })

});
