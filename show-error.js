const server = require('./src/server/server');
const Promise = require('bluebird');

var pg = server.dataSources.testdb.connector;

var promises = [], errors=[];
for(var i=0; i<20 ;i++){
  promises.push(new Promise(function(resolve, reject){
    var c = i;
    console.log('starting ', c, 'query');
    pg.executeSQL("SELECT 'asd'+1 ",[],{}, function(err, res){
      console.log('finishing ', c, 'query', err ? 'Error' : 'Success');
      if(err) errors.push(err);
      resolve(res);
    });
  }));
}

Promise.all(promises).then(function(){
  console.log('All Promises finished');
  process.exit();
});
