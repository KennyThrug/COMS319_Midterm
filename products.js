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
    curPost.className = "col-md-4";
    curPost.innerHTML = `
    <div class="ProductDiv">
        <h1>${data.name}</h1>
        <img src="${data.image}" style="width: 100%;">
        <div class="row">
            <p class="col-md-7">
                Price: $${data.price}
            </p>
            <p class="col-md-5 justify-content-end">
                ProductID: ${data.productID}
            </p>
        </div>
        <p class="productDisc">
            ${data.description}
        </p>
        <div class="row">
            <button id="${data.productID}" class="cartButton col-md-6 btn btn-primary" style="margin-left: 5%; margin-bottom: 2%;" onclick="addOrRemoveToCart(this,'${data.productID}')">
                Add to Cart
            </button>
        </div>
    </div>`
    console.log("Test");
    postParent.appendChild(curPost)
}

//is_shirts variable is true if on the shirts page, false if on other page
function createAllPosts(json_data,is_shirts){
    if(is_shirts){
        fullPosts = json_data.tshirts;
    }
    else{
        fullPosts = json_data.otherMerch;
    }
    for(let i = 0; i < fullPosts.length;i++){
       createPost(i % ELEMENTS_PER_ROW,fullPosts[i]);
    }
}
function addOrRemoveToCart(element,id){
    if(element.innerHTML == "Remove from Cart"){
        element.innerHTML = "Add to Cart";
        //Remove from the cart array
        for(let i = 0; i < cart.length; i++){
            if(cart[i].ID == id){
                cart.splice(i,1);
            }
        }
    }
    else{
        element.innerHTML = "Remove from Cart";
        cart.push({
            elmnt: element,
            ID: id
        });
    }
    //Reloads display
    reloadCart(fullPosts);
}
//Just takes an ID
function removeFromCart(id){
    allCartButtons = document.getElementsByClassName("cartButton");
    for(let i = 0; i < allCartButtons.length;i++){
        console.log(allCartButtons[i].id);
        if(allCartButtons[i].id == id){
            return addOrRemoveToCart(allCartButtons[i],id);
        }
    };
    console.log("Test22")
}

let cart = [];
//Let alldata be something like json.tshirts or json.products
function reloadCart(alldata){
    console.log(alldata);
    console.log(cart);
    let cartParent = document.getElementById("Cart");
    cartParent.innerHTML = "";
    let totalNumber = 0;
    for(let i = 0; i < cart.length;i++){
        let data;
        //Sets data to the correct product, using the productID
        for(let j = 0; j < alldata.length;j++){
            if(cart[i].ID == alldata[j].productID){
                data = alldata[j];
                break;
            }
        }
        //If it can't find that productID (generally means nothing is in cart)
        if(data == null){
            return;
        }
        totalNumber += data.price;
        cartChild = document.createElement("div");
        cartChild.className = "productInCart";
        cartChild.innerHTML = 
`            <h3>${data.name}</h3>
            <div class="row">
                <img src="${data.image}" class="col-6">
                <div class="col-5">
                    <p>Price: $${data.price}</p>
                    <button class="btn btn-secondary" style="height: 50%; font-size: small;" onClick="removeFromCart('${cart[i].ID}')">Remove From Cart</button>
                </div>
            </div>`
        cartParent.appendChild(cartChild);
    }
    let total = document.createElement("div");
    total.id = "total";
    total.style = "width=100%"
    total.innerHTML = `
        <h3>Total</h3>
        <p>$
            ${totalNumber}
        </p>
        <button class="btn btn-primary" onclick="buyProduct()">Purchase</button>`;
    cartParent.appendChild(total);
}

function buyProduct(){
    window.alert("Congrats on Buying this product. Unfortunately, just like the money you just spent, the products are fake.");
    console.log(cart);
    while(cart.length != 0){
        removeFromCart(cart[0].ID);
    }
    reloadCart();
    console.log(cart);
}

let json;
let fullPosts;