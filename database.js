const mongoose = require("mongoose");


exports.Startup = function(){ 
	mongoose.connect("mongodb+srv://jagdeepherokuapp1:jagdeepherokuapp1@cluster0.xwhiy.azure.mongodb.net/herokuapp?retryWrites=true&w=majority"
    ,{ useUnifiedTopology: true ,  
       useNewUrlParser: true , 
	  })
.then( c => {console.log(" connsction sucess db !");
 // db connected !
  //    RD();
  
 } )
.catch(err => {console.log("db Error here : ",err); })

process.on('SIGINT', function() {
  mongoose.connection.close(function () {
    console.log('Mongoose disconnected on app termination');
    process.exit(0);
  });
});
	
}

const blogPostSchema = mongoose.Schema({title:String, content:String });
const blogpostmodel = mongoose.model("heroku_blog",blogPostSchema);


function CR(title,post){
	const newpost = new blogpostmodel({
		title:title,
		content:post
	})
	return new Promise((resolve,reject) => { 
	newpost.save().then(sucess => { console.log("New post created succes !",sucess); resolve("post create sucess"); })
	 .catch(error => {console.log("error is saving post...",error); reject("post create error"); })
	  })
}
 
function RD(){
	return new Promise((resolve,reject) => {  
		blogpostmodel.find({},{__v:0}).then(sucess => {console.log("Read all sucess !"); resolve(sucess); })
		.catch(err => {console.log("blogs read error"); reject("db read err"); })
		
	})    
	
}

function RDid(ID){
	return new Promise( (resolve,reject) => {
	  	blogpostmodel.find({_id:ID},{__v:0}).then(sucess => {console.log("blogs read unique ID sucess !"); resolve(sucess); })
		.catch(err => {console.log("blogs read unique ID error"); reject("db ID read err"); })
	} )
	
}

exports.createpost = CR ;
exports.readpost = RD ;
exports.readpostbyid = RDid ;