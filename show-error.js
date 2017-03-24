const server = require('./src/server/server');
const Promise = require('bluebird');



function runTest (ds){
  var pg = server.dataSources[ds].connector;
  var promises = [], errors=[];
  for(var i=0; i<20 ;i++){
    promises.push(new Promise(function(resolve, reject){
      var c = i;
      console.log(ds, 'starting ', c, 'query');
      pg.executeSQL("SELECT 'asd'+1 ",[],{}, function(err, res){
        console.log(ds, 'finishing ', c, 'query', err ? 'Error' : 'Success');
        if(err) errors.push(err);
        resolve(res);
      });
    }));
  }

  return Promise.all(promises).then(function(){
    console.log('All Promises finished');
  });
}

runTest('testdbWorks').then(function(){
  console.log('\n\n!!!!!\n As you can see having a min three for testdbWorks allows it to function')
  console.log('Without the min, it silently stops and never runs the then\n!!!!!\n\n');
  return runTest('testdb');
}).then(function(){

  process.exit();
});
