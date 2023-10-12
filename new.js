// Initialize an empty posts array (in-memory "database")
let posts = [];
 
async function shoti() {
    try {
        const response = await fetch('https://liby.wasieacuna.repl.co/readpost', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: "" })
        });
        const result = await response.json();
        posts = result;
        displayPosts();
    } catch (error) {
        console.error(error);
    }
};
shoti() 
function displayPosts() {
    const postsList = document.getElementById("posts-list");
    postsList.innerHTML = "";
 
    try {
        if (Array.isArray(posts)) {
            for (let index = 0; index < posts.length; index++) {
                const post = posts[index];
                const postDiv = document.createElement("div");
                postDiv.className = "post";
                postDiv.innerHTML = `
                <strong><p><img src=${post.image}" width="30" height="30">${post.anonymous}</p></strong>
                <br>
                <p>${post.text}</p>
                <!---<p>Likes: <span id="likes-${index}">${post.likes}</span></p>
                <button onclick="likePost(${index})">Like</button>--->

                <p class="post-datetime">${post.datetime}</p>
                <div>
                  <!----  <input type="text" id="comment-${index}" placeholder="Leave a comment">
                    <button onclick="addComment(${index})">Comment</button> -->
                </div>
 
                <div id="comments-${index}"></div>
                `;
                postsList.appendChild(postDiv);
                //displayComments(index);
            }
        }
    } catch (err) {
        console.log(err);
    }
}
 
async function addPost(text, anonymous) {
    const currentDate = new Date();
    const datetime = currentDate.toLocaleString();
    const newPost = {
        text,
        anonymous,
        datetime,
        likes: 0,
        comments: [],
        image:"https://beebom.com/wp-content/uploads/2023/04/featured-new.jpg?w=730&h=487&crop=1&quality=75"
    };
    posts.push(newPost);
    const response = await fetch('https://liby.wasieacuna.repl.co/addpost', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newPost)
    });
    const result = await response.json();
    displayPosts();
    shoti() 
}
// new
document.getElementById("post-button").addEventListener("click", () => {
    const postText = document.getElementById("post-text").value;
    const anonymousName = "Anonymous";
    
    if (postText.trim() !== "") {
        if (containsBadWords(postText)) {
            alert("Your post contains inappropriate content and cannot be posted.");
        } else {
            addPost(postText, anonymousName);
            document.getElementById("post-text").value = "";

        }
    }
});

function containsBadWords(text) {
    const badWords = [
        "profanity",
  "expletive",
  "curse",
  "vulgar",
  "obscene",
  "indecent",
  "abusive",
  "offensive",
  "insulting",
  "vile",
  "filthy",
  "lewd",
  "crude",
  "nasty",
  "racist",
  "sexist",
  "homophobic",
  "xenophobic",
  "hateful",
  "disgusting",
  "mura",
  "bastos",
  "kalaswaan",
  "kantutan",
  "putang ina",
  "ulol",
  "tangina",
  "hayop",
  "gago",
  "bwisit",
  "burat",
  "pekpek",
  "kupal",
  "hindot",
  "pakshet",
  "libog",
  "torjackan",
  "kadyot",
  "pekpekero",
  "kantutin",
  "mga tarantado",
  "fcvk",
  "kantutan",
  "fuck you all",
  "ang papanget nio",

  
  
    ];
    
    text = text.toLowerCase();
    for (const badWord of badWords) {
        if (text.includes(badWord)) {
            return true; 
        }
    }
    
    return false; 
}

/** 
document.getElementById("post-button").addEventListener("click", () => {
    const postText = document.getElementById("post-text").value;
    const anonymousName = "Anonymous";
    if (postText.trim() !== "") {
        addPost(postText, anonymousName);
        document.getElementById("post-text").value = "";
    }
});
***/
 
function likePost(index) {
    posts[index].likes++;
    displayPosts();
}
 
function addComment(postIndex) {
    const commentText = document.getElementById(`comment-${postIndex}`).value;
    if (commentText.trim() !== "") {
        posts[postIndex].comments.push(commentText);
        displayComments(postIndex);
        document.getElementById(`comment-${postIndex}`).value = "";
    }
}

 
function displayComments(postIndex) {
try {
    const commentsDiv = document.getElementById(`comments-${postIndex}`);
    commentsDiv.innerHTML = "";
    posts[postIndex].comments.forEach((comment) => {
        const commentP = document.createElement("p");
        commentP.textContent = comment;
        commentsDiv.appendChild(commentP);
    });
   } catch (err) {
       console.log(err)
   }
}
document.querySelector(".hamburger").addEventListener("click", function () {
    document.querySelector(".header").classList.toggle("mobile");
    document.querySelector("body").classList.toggle("hidden");
  }); 











































/*** Initialize an empty posts array (in-memory "database")

let posts = [];

// Function to display posts and comments
async function displayPosts() { 
    const response = await fetch('https://liby.wasieacuna.repl.co/readpost', {
        headers: {
            'Content-Type': 'application/json'
        }, 
        body: ''
    })
    const result = await response.json();
    posts = result;
    
    const postsList = document.getElementById("posts-list");
    postsList.innerHTML = ""; // Clear previous posts

    // Loop through the posts and display them
    for(let index = 0; index < posts.length; index++) {
        const postDiv = document.createElement("div");
        postDiv.className = "post";
        postDiv.innerHTML = ` 
            <p><strong>${posts[index].anonymous}</strong></p>
            <p>${posts[index].text}</p>
            <p>Likes: <span id="likes-${index}">${posts[index].likes}</span></p>
            <button onclick="likePost(${index})">Like</button>
            
            <!-- Comment form -->
            <div>
                <input type="text" id="comment-${index}" placeholder="Leave a comment">
                <button onclick="addComment(${index})">Comment</button>
            </div>
            
            <!-- Display comments -->
            <div id="comments-${index}"></div>
        `;
        postsList.appendChild(postDiv);
        
        // Display comments for this post if comments array exists
        if (posts[index].comments) {
            displayComments(index);
        }
    }
}

// Function to add a new post
async function addPost(text, anonymous) {
   const currentDate = new Date();
   const datetime = currentDate.toLocaleString();
    const newPost = {
        text,
        anonymous,
        datetime, 
        likes: 0,
        comments: [], // Initialize an empty array for comments
    };
    posts.push(newPost);
    const response = await fetch('https://liby.wasieacuna.repl.co/addpost', {
        method: 'POST', // Specify the HTTP method as POST
        headers: {
            'Content-Type': 'application/json'
        }, 
        body: JSON.stringify(newPost) // Convert newPost to JSON
    })
    const result = await response.json();
    displayPosts();
}

// Function to handle the "Post" button click
document.getElementById("post-button").addEventListener("click", () => {
    const postText = document.getElementById("post-text").value;
    const anonymousName = "Anonymous"; // You can customize this
    if (postText.trim() !== "") {
        addPost(postText, anonymousName);
        document.getElementById("post-text").value = ""; // Clear the textarea
    }
});

// Function to handle post likes
function likePost(index) {
    posts[index].likes++;
    displayPosts();
}

// Function to add a comment to a post
function addComment(postIndex) {
    const commentText = document.getElementById(`comment-${postIndex}`).value;
    if (commentText.trim() !== "") {
        posts[postIndex].comments.push(commentText);
        displayComments(postIndex); // Update the displayed comments
        document.getElementById(`comment-${postIndex}`).value = ""; // Clear the comment input
    }
}

// Function to display comments for a post
function displayComments(postIndex) {
    const commentsDiv = document.getElementById(`comments-${postIndex}`);
    commentsDiv.innerHTML = "";
    // Clear previous comments

    // Loop through comments and display them
    posts[postIndex].comments.forEach((comment) => {
        const commentP = document.createElement("p");
        commentP.textContent = comment;
        commentsDiv.appendChild(commentP);
    });
}

displayPosts(); ***/