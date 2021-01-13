'use strict';

// import a from './a';
// import b from './b';
// import c from './c';

// export default function() {
//   console.log(a.name+b.name+c.name)
// };

import { version } from '../package.json';

export default function () {
  console.log('version ' + version);
}