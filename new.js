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
        image: " data:image/jpeg;base64,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"
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