
function createPost(index, data){
    let parentOfPost = document.getElementById("Post-Contents");
    let post = document.createElement("div");
    post.className = "row post-full-body";
    post.innerHTML = `
    <header class="PostHeader row">
        <div class="col-md-4">
            <p>
                <strong>
                    ${data.title}
                </strong> by ${data.author}<br>
                Date published: ${data.date_published}
            </p>
        </div>
        <div class="col-md-6 tags">
            Heres where Tags will be
        </div>
        <div class="col-md-2">
            <p>
                Date of Post: ${data.date}
            </p>
        </div>
    </header>
    <div class="col-sm-9 post-text-body">
        <p>
            ${data.text}
        </p>
    </div>
    <div class="col-sm-3 post-image-body">
        <img src="${data.image}" width="50%">
    </div>
    `;
    parentOfPost.appendChild(post);
}
function createAllPosts(json_data){
    for(let i = 0; i < json_data.posts.length;i++){
       createPost(i,json_data.posts[i]);
    }
}
//This is a function soley in charge of hiding and reshowing the search bar
function toggleAdvancedSearch(){
    let toggleButton = document.getElementById(`toggleAdvancedSearch`);
    var card = document.getElementById(`AdvancedSearch`);
    let collapsableCard = new bootstrap.Collapse(card, {toggle: false});
    toggleButton.addEventListener('click',function () {
        collapsableCard.toggle();
    });
}
let json;
//Does the following when the page has fully loaded... Added for extra safety to avoid data races, which I have come across in the past
window.onload = function() {
    toggleAdvancedSearch();
    json = fetch("/data.json")
    .then(response => response.json())
    .then(posts => createAllPosts(posts));
}