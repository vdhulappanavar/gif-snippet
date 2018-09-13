// var ace = require('brace');
// require('brace/mode/javascript');
// require('brace/theme/monokai');
import * as ace from 'brace';
import 'brace/mode/javascript';
import 'brace/theme/monokai';
export default () => {
  console.log('outside add listener');
  console.log(ace)
  self.addEventListener('message', e => { // eslint-disable-line no-restricted-globals
      if (!e) return;
      console.log(e)
      console.log(ace)
      console.log(e.data)
      console.log(e.data.data)

      console.log('in webworker');
      let users = e.data.users;
      console.log(typeof document);
      for (let i = 0; i < users.length-1; i++) {
          for (let j = i+1; j < users.length; j++) {
              if (users[i] > users[j]) {
                  const t = users[i];
                  users[i] = users[j];
                  users[j] = t;
              }
          }
      }

      postMessage(users);
  })
}