const mongoose = require('mongoose');
const Schema = mongoose.Schema;




const TodoSchema = mongoose.Schema({
    
    team_id : {
        type : String
    },
    taskName : {
        type : String
    },
    team_domain : {
        type : String
    },
    team_id : {
        type : String
    },
    userName : {
        type : String
    },
    channel_id : {
        type : String
    },
    isActive : {
        type : Boolean,
        default : true
    }
    

});

TodoSchema.index({ name: 'text' });
TodoSchema.plugin(require('mongoose-timestamp'));
TodoSchema.plugin(require('mongoose-delete'), {
    overrideMethods: true,
    deletedAt: true
});

const Todo = module.exports = mongoose.model('Todo', TodoSchema);








