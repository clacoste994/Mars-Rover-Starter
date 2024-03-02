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

         if (command.commandType === 'MOVE') {
               if (this.mode === 'LOW_POWER') {
                  response.results.push({ completed: false });
                  console.log(response.results);
               } else if (command.commandType === 'MOVE') {
                     if (this.mode === 'NORMAL') {
                        this.position = command.value;
                        response.results.push({ completed: true });
                     }
                  }
               
            
         }
      }
      return response;
   }

}



module.exports = Rover;


