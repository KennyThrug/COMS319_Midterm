const ELEMENTS_PER_ROW = 3;
let postParent;
function createNewRow(){
    totalParent = document.getElementById("ProductPages");
    postParent = document.createElement("div");
    postParent.className = "row";
    totalParent.appendChild(postParent);
}

function createPost(index,data){
    if(index == 0){
        createNewRow();
    }
    let curPost = document.createElement("div");
    curPost.className = "col-4";
    curPost.innerHTML = `
    <div class="ProductDiv">
        <h1>${data.name}</h1>
        <img src="${data.image}" style="width: 100%;">
        <div class="row">
            <p class="col-7">
                Price: ${data.price}
            </p>
            <p class="col-5 justify-content-end">
                ProductID: ${data.productID}
            </p>
        </div>
        <p class="productDisc">
            ${data.description}
        </p>
        <div class="row">
            <button class="col-4 btn btn-primary" style="margin-left: 5%; margin-bottom: 2%;">
                Button
            </button>
        </div>
    </div>`
    console.log("Test");
    postParent.appendChild(curPost)
}

function createAllPosts(json_data){
    for(let i = 0; i < json_data.tshirts.length;i++){
       createPost(i % ELEMENTS_PER_ROW,json_data.tshirts[i]);
    }
}

let json;
window.onload = function() {
    json = fetch("/data.json")
    .then(response => response.json())
    .then(posts => createAllPosts(posts));
}