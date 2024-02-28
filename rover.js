class Rover {
   constructor(position) {
      this.position = position;
      this.mode = 'NORMAL';
      this.generatorWatts = 110
   }
   receiveMessage(message) {
      const response = {
         message: message.name,
         results: []
       }
       for(let i = 0; i < message.commands.length; i++) {
         if (message.commands[i].commandType === 'STATUS_CHECK') {
            response.results.push({
              completed: true,
              roverStatus: {
                mode: this.mode,
                generatorWatts: this.generatorWatts,
                position: this.position,
              } 
            })
        
         } else if (message.commands[i].commandType === 'MODE_CHANGE') {
          this.mode = message.commands[i].value;
          response.results.push({ completed: true });
     /*  } else if (message.commands[i].commandType === 'MODE_CHANGE' && message.commands[i].value === 'LOW_POWER') {
        this.mode = message.commands[i].value
        response.results.push({ completed: true });*/
    
      } else if (message.commands[i].commandType === 'MOVE' && message.commands[i].value === 'LOW_POWER') {
             this.mode = message.commands[i].value;
             response.results.push({ completed: false });
      } else if (message.commands[i].commandType === 'MOVE' && message.commands[i].value !== 'LOW_POWER') {
        this.position = message.commands[i].value;
        response.results.push({ completed: true });
    } else {
      response.results.push({ completed: true });
    }  
       } 
       return response;
   }
   
}



module.exports = Rover;