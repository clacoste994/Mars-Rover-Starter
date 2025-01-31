const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.

describe("Command class", function() {

  it("throws error if command type is NOT passed into constructor as the first parameter", function() {
    expect( function() { new Command();}).toThrow(new Error('Command type required.'));
  });

  it("constructor sets commandType", function() {
    let modeCommand = new Command('MODE_CHANGE');
    let moveCommand = new Command('MOVE');
    let statusCommand = new Command('STATUS_CHECK');

    expect(modeCommand.commandType).toBe('MODE_CHANGE');
    expect(moveCommand.commandType).toBe('MOVE');
    expect(statusCommand.commandType).toBe('STATUS_CHECK');
  });


  it("constructor sets a value passed in as the 2nd argument", function() {
    let modeCommand = new Command('MODE_CHANGE', 'LOW_POWER');
    let moveCommand = new Command('MOVE', 12000);

    expect(modeCommand.value).toBe('LOW_POWER');
    expect(moveCommand.value).toBe(12000);
  });

});