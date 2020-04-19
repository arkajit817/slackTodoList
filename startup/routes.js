const todo = require('../routes/todo');
const middleWare = require('../services/middleware');



module.exports = function (app) {
    app.use('/api/addtask',middleWare.checkAuthentication, todo);
}

