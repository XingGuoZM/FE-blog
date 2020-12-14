const { getOptions } = require('loader-utils') ;

module.exports= function(source){
  const options = getOptions(this);
  console.log(JSON.stringify(options))
  // return JSON.stringify(source)
  return `module.exports = ${ JSON.stringify(source) }`;
}