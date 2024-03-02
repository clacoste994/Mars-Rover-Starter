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
       /*
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
        
         } 
         
         if (message.commands[i].commandType === 'MODE_CHANGE') {
          this.mode = message.commands[i].value;
          response.results.push({ completed: true });
       } else if (message.commands[i].commandType === 'MODE_CHANGE' && message.commands[i].value === 'LOW_POWER') {
        this.mode = message.commands[i].value
        response.results.push({ completed: true });
    
      } 
       if (message.commands[i].commandType === 'MOVE' && message.commands[i].value !== String) {
             if(this.mode === 'LOW_POWER'){          
             response.results.push({ completed: false });
             this.position = this.position;
      } else if (message.commands[i].commandType === 'MOVE' && message.commands[i].value !== 'LOW_POWER') {
         if(this.mode === 'NORMAL') {
        this.position = message.commands[i].value;
        response.results.push({ completed: true });
    }  
       } 
      }
   }*/




   for (const command of message.commands) {
      if (command.commandType === 'STATUS_CHECK') {
         response.results.push({
           completed: true,
           roverStatus: {
             mode: this.mode,
             generatorWatts: this.generatorWatts,
             position: this.position,
           }
    
         })
   
      } else if (command.commandType === 'MODE_CHANGE') {
         if (command.value === 'NORMAL') {
           this.mode = command.value;
           response.results.push({ completed: true });
         } else if (command.value === 'LOW_POWER') {
           this.mode = command.value;
           response.results.push({ completed: true });
         }
      } 
     // for (const mode of Rover)
      


       if (command.commandType === 'MOVE') {
         if(command.value !== String) {
         if (this.mode === 'LOW_POWER') {
          this.position = this.position;
          response.results.push({ completed: false });
        } else if (command.commandType === 'MOVE') {
         if (command.value !== String) {
          if (this.mode === 'NORMAL') {
           this.position = command.value;
           response.results.push({ completed: true });
        }
      }
   }
      }
      }
    }
       return response;
   }

}



module.exports = Rover;


