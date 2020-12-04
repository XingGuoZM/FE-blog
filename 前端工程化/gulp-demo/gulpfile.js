const add =require('./index');

function defaultTask(cb){
  add(1,2);
  cb();
}

exports.default=defaultTask;