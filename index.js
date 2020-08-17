const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const db = require("./database.js");


db.Startup();

const defaulthome = {
	title:"This is home page ",
    content:"Jagdeep Go to Compose Page and start creating posts" 
	}
const aboutus = "This is randomaly generated content by Our Server about us page";
const contactus = "This is randomly generated by Server Contact us page";

let postarray = [];
 
const app = express();
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
 
app.get("/",function(req,res){
    db.readpost().then(dbarray => {
        res.render("home",{ defaultpost : defaulthome,startingContent : dbarray});
		})
	.catch(err => {
		res.render("home",{ defaultpost : defaulthome,startingContent : [{title:"Error",content:"Error while loading data !"}]});
		} )
	
	
})
app.get("/about",function(req,res){
	res.render("about",{ aboutContent : aboutus});
})
app.get("/contact",function(req,res){
     
	res.render("contact",{ contactContent : contactus});
})
app.get("/compose",function(req,res){
	
	res.render("compose");
})
app.post("/compose",function(req,res){
	//  const post = {
	//  title:req.body.blog_title,
	//   content:req.body.blog_post
    //    };
	//  postarray.push(post);
	    db.createpost(req.body.blog_title,req.body.blog_post).then(sucess => { res.redirect("/");})
	    .catch(err => { res.redirect("/compose"); });
	
})
app.get("/post/:postid",function(req,res){
	 console.log("Req for id : ",req.params.postid);
	  db.readpostbyid(req.params.postid).then(postidarray => {
		  res.render("post",{ postr : postidarray[0] }); 
	  } )
    .catch(err => { res.render("post",{ postr :{title:"Error",content:"Post id not valid or post read error "} });  })	  
	//       let refname = _.lowerCase(req.params.postName)
	//  postarray.forEach(function(post){
	//  	let postname = _.lowerCase(post.title)
	//  	if( refname ===  postname ){
	//  		 res.render("post",{ postr : post });  console.log("match found !");
	//  		
	//  	}
	//  	else{ // res.redirect("/"); 
	//  	console.log("No match found"); 
	//  	}
	//  })
	  // res.render("compose");
})

const port = process.env.PORT || 3000;
app.listen(port,function(){console.log("Server start listening on port : ",port);})