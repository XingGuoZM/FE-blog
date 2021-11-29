import { cloneDeep } from 'lodash';
import { obj1 } from './foo'

const res = cloneDeep({ obj1 });
console.log(res);
document.write('hello world');