
const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const schema=new Schema({
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
},
   {
        type:Date,
        timestamps:true,
        
   }
);
schema.set('toJSON',{
    virtual:true
})
module.exports=mongoose.model('News',schema);