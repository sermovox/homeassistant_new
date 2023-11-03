// import hass from "homeassistant-ws";
//import * as hassImp from 'homeassistant-ws';
// const hass = hassImp.default;
const readline = require('readline').createInterface({// see https://stackoverflow.com/questions/65260118/how-to-use-async-await-to-get-input-from-user-but-wait-till-entire-condition-sta
    input: process.stdin,
    output: process.stdout,
  });

const hass=require("homeassistant-ws");
// console.log('ciao');
main();
async function main() {
  // Establishes a connection, and authenticates if necessary:
  const client = await hass({
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJiNmYxMDk3NDYxODI0YmZhYjkwNTc2NjQ1ZDVmODU4MyIsImlhdCI6MTY5NDQ0Mjg2MiwiZXhwIjoyMDA5ODAyODYyfQ.ppeuf-Ma1vLVQCT0Qrt07C5TXGHsHasX3ElOl1NCX3A', 
    host: '192.168.1.212',
    port: 8123,
   });
   const ws=client.rawClient;// ws obj , ex call ws.on('close,)or ws.onclose() ??

   // console.log('ciao mondo :\n',JSON.stringify(client));

  // Get a list of all available states, panels or services:
  let states=await client.getStates();
  console.log('ciao mondo :\n',states);
  /*
  await client.getServices();
  await client.getPanels();

  // Get hass configuration:
  await client.getConfig();
*/

  // Listen for all HASS events - the 'message' event is a homeassistant-ws event triggered for
  // all messages received through the websocket connection with HASS:
  //
  // See https://developers.home-assistant.io/docs/api/websocket/ for details on HASS events:
  client.on('message', (rawMessageData) => {
    console.log(' raw message received: ',rawMessageData);
  });

  // Listen only for state changes:
  client.on('state_changed', (stateChangedEvent) => {
    console.log('state_changed event : ',stateChangedEvent.data.new_state.state);
  });

let ex=false;


    let outprompt='>>>>>>>>>>>> please input :  lights,turn_on,light.my_light ';
    console.error('now start requesting iterately: ',outprompt);

    doinp();

  function doinp(){  requestInput(outprompt).then(readin);// debug, if we were in a async we could : await  requestInput()
  }

function readin(read_){
    let reads=read_.split(",");
    if(reads[0]=='exit')  console.error('Call a service, ends');
    else{
          // Call a service, by its domain and name. The third argument is optional.
          console.error('Call a service, by its domain and name. The third argument is optional:',reads);
  client.callService(reads[0],reads[1], {
    entity_id: reads[2]
  }).then(doinp);
    }
  

}

function requestInput (shown) {// use :
    // in async  await requestInput
    // otherwise use a cn :  requestInput.then(goon);
    
return new Promise((resolve, reject) => {
console.error(shown);
readline.question(shown, async (url) => {
console.error('readline got line',url);
//readline.close();
resolve(url);

});
});
}
}