var bodyparser=require("body-parser"),
methodoverride=require("method-override"),
mongoose=require("mongoose"),
express=require("express"),
app=express();
app.use(bodyparser.urlencoded({extended:true}));
app.use(methodoverride("_method"));
mongoose.connect("mongodb+srv://naman:7983766385@yelpcampcluster.qzvu8.mongodb.net/blogsdata?retryWrites=true&w=majority",{ useNewUrlParser: true, useUnifiedTopology: true },function(err){
	if(err){
		console.log(err);
	}else{
		console.log("connected to mongodb");
	}
});
var blogschema=new mongoose.Schema({
	title:String,
	image:String,
	body:String,
	date:{type:Date,default:Date.now}
});
var Blogs=mongoose.model("Blogs",blogschema);
app.get("/",function(req,res){
	res.redirect("/blogs");
});
app.get("/blogs",function(req,res){
Blogs.find({},function(err,blog){
	if(err)
		console.log(err);
	else{
		res.render("index.ejs",{blog:blog});
	}
});
});
app.get("/blogs/new",function(req,res){
	res.render("new.ejs");
});
app.post("/blogs",function(req,res){
	Blogs.create(req.body.post,function(err){
		if(err)
			console.log(err);
		else
			res.redirect("/blogs");
	});
});
app.get("/blogs/:id",function(req,res){
	Blogs.findById(req.params.id,function(err,foundblog){
		if(err)
			res.redirect("/blogs");
		else
			res.render("id.ejs",{blog:foundblog});
	});
});
app.get("/blogs/:id/edit",function(req,res){
	Blogs.findById(req.params.id,function(err,foundblog){
		if(err)
			res.redirect("/blogs");
		else
			res.render("edit.ejs",{blog:foundblog});
	});
});
app.put("/blogs/:id",function(req,res){
Blogs.findByIdAndUpdate(req.params.id,req.body.post,function(err,updatedblog){
	if(err)
		res.redirect("index.ejs");
	else
		res.redirect("/blogs/"+req.params.id);
});
});
app.delete("/blogs/:id",function(req,res){
Blogs.findByIdAndRemove(req.params.id,function(err){
	if(err)
		console.log(err);
	else
		res.redirect("/blogs");
});
});
app.listen(8080,function(){
	console.log("port started");
});