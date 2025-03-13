import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));


const posts = [];


app.get("/", (req, res) => {
    res.render("index.ejs", { posts: posts});
});


app.post("/create-post", (req, res) => {
    res.render("post.ejs");
});
 
  
app.post("/posts", (req, res) => {

    const new_title = req.body["title"];
    const new_content = req.body["content"];

    const newPost = {
        title: new_title,
        content: new_content,
        date: new Date().toLocaleString(),
    };

    posts.push(newPost);

    res.redirect("/");
});

app.post("/edit-post", (req, res) => {
    const id = parseInt(req.body.id);
    const oldTitle = posts[id].title;
    const oldContent = posts[id].content;
    
    if (id >= 0 && id < posts.length) {
        posts.splice(id, 1); 
    }

    res.render("post.ejs", {
        title: oldTitle,
        content: oldContent,
    });

  
});

app.post("/delete-post", (req, res) => {
    const id = parseInt(req.body.id);
  
    if (id >= 0 && id < posts.length) {
        posts.splice(id, 1); 
    }
    res.redirect("/");
  
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
