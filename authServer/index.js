const app = require('./config/express');


//initiallize mysql
require('./config/db.config');


//listening to port
app.listen (4050,()=>{
    console.log(`server started on port`);
});