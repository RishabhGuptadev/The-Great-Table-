const menu = [
    {
      id: 1,
      title: "Beaux Freres",
      category: "Drinks",
      price: 15.99,
      img:"./images/w1.jpg",
      count:0 },
    {
      id: 2,
      title: "Chateau Climens",
      category: "Drinks",
      price: 13.99,
      img:"./images/w1.jpg",    
      count:0
    },
    {
      id: 3,
      title: "Pasta",
      category: "Food",
      price: 6.99,
      img:"./images/w1.jpg",
      count:0
     },
    {
      id: 4,
      title: "Pizza",
      category: "Food",
      price: 20.99,
      img:"./images/w1.jpg",
    count:0
  },
      {
      id: 5,
      title: "ice cream",
      category: "Dessert",
      price: 22.99,
      img:"./images/w1.jpg",
    count:0},
        {
      id: 6,
      title: "Burger",
      category: "Food",
      price: 18.99,
      img:"./images/w1.jpg",
    count:0},
        {
      id: 7,
      title: "Water",
      category: "Drinks",
      price: 8.99,
      img:"./images/w1.jpg",
      count:0      
    },
    {
      id: 8,
      title: "Sundae",
      category: "Dessert",
      price: 12.99,
      img:"./images/w1.jpg",
      count:0    
    },
    {
      id: 9,
      title: "Chocolate Swirl",
      category: "Dessert",
      price: 16.99,
      img:"./images/w1.jpg",
    count:0        },
    {
      id: 10,
      title: "Domaine Serenne",
      category: "Drinks",
      price: 22.99,
      img:"./images/w1.jpg",
        count:0 },
  ];
  // get parent element
  const menuList = document.querySelector(".menu-list");
  const product = document.querySelector(".product");
  let filteredMenu = menu;


  // display all items when page loads
  window.addEventListener("DOMContentLoaded", function () {
    // diplayMenuItems(menu);
    displayMenuButtons();
    selectProductsOption();
    const products = filteredMenu.filter((product)=>product.category ==="Drinks");
    displayProducts(products);
  
  });
  
//display Menu buttons
  const displayMenuButtons =()=>{
    const uniqueMenuButtons = menu.reduce(
        function (values, item) {
          if (!values.includes(item.category)) {
            values.push(item.category);
          }
          return values;
        },
        []
      );
     
      const buttons = uniqueMenuButtons.map((btn)=>{
          return `
         <button class="menu-btns" data-id=${btn}>${btn}</button>
          `
      }).join("");
      menuList.innerHTML = buttons;
      setOneActive();

      createCheckOut(uniqueMenuButtons);
    }

  //set one of the tabs and product to active 
    function setOneActive(){
      const menuButton = document.querySelectorAll(".menu-btns");
      menuButton[0].classList.add("active-btn")
      let menuItem = filteredMenu.filter((product)=> product.category==="Drinks");
      displayProducts(menuItem);
    }

    menuList.addEventListener("click", removeActiveBtn );
    
    function removeActiveBtn(e){
      const menuButton = document.querySelectorAll(".menu-btns");
      menuButton.forEach((btn)=>{
         btn.classList.remove("active-btn");
      })
      addActive(e);
    }

    const addActive = (e)=>{
      const clickedTab = e.target.dataset.id;
      const menuButton = document.querySelectorAll(".menu-btns");
        menuButton.forEach((btn)=>{
          if(e.target.dataset.id === btn.dataset.id){
            btn.classList.add("active-btn");  
          }
        })

        //filter products based on the active tab 

        filterProducts(clickedTab);
        selectProductsOption();
    }


    //create and display all products

    const productContainer = document.querySelector(".product-container");
    const displayProducts=(filteredMenu)=>{
     const createdProduct =  filteredMenu.map((product)=>{
        return `
        <div id=${product.id} class="product active"> 
                    <div class="active">
                        <img src=${product.img} alt="not found"/>
                    </div>
                    <div class="title">
                        <h4>${product.title}</h4>
                        <h4>$ ${product.price}</h4>
                        <div id=${product.id} class="btn">
                            <button class="decrease" data-id="${product.id}">-</button>
                            <button class="valueBtn" >0</button>
                            <button class="increase" data-id=${product.id}>+</button>
                        </div>
                    </div>
                    
                </div>
        `
      }).join("");
      productContainer.innerHTML = createdProduct; 
      displayQty();
    }   

    //filter products based on the clicked tab 
    const filterProducts = (clickedTab) =>{
      filteredMenu = menu.filter((product)=>product.category === clickedTab);
      displayProducts(filteredMenu);
    }
    

    //filter products using select option
    const foodCategory = document.querySelector(".select-option");
    const selectProductsOption=()=>{
      const selectedProduct = filteredMenu.map((product)=>{
        return `
        <option class="options" id=${product.id}" value=${product.id}>${product.title}</option>
        `
      }).join("");
      
      foodCategory.innerHTML = selectedProduct;
    }

    // change quantity and add product to the check out section
     
  let count =0;
    
    function displayQty(){
        
        const productSelector = document.querySelectorAll(".product");
        productContainer.addEventListener("click",function(e){
        
          productSelector.forEach((product)=>{

              const selectedBtn = document.getElementById(product.id);
              const inc = selectedBtn.querySelector(".increase");
              const dec = selectedBtn.querySelector(".decrease");
              const value = selectedBtn.querySelector(".valueBtn");
              
              
            if(product.id === e.target.dataset.id){
             inc.addEventListener("click",function(){
                  count = count+1;
                  value.innerHTML= count;
             });
  
             dec.addEventListener("click",function(){
              if(count>0){
                count = count-1;
                value.innerHTML = count;
              }
              else {
                value.innerHTML = 0;
              }
              
              
             });    
             checkOut(product.id,count);
            }
          })
  
        })
      }

   //building a check out functionality   
   const productList = document.querySelector(".product-list");
   const productItem = document.querySelector(".product-item");
   const createCheckOut = (uniqueValue) =>{
     const uniqueCartValue =  uniqueValue.map((menu)=>{
        return  `<div id=${menu} class="item-total">
        <div class="item-title"> 
        <h4>${menu}</h4>
       <h4>$</h4>
        </div>
       
      </div>`
      });
      productList.innerHTML = uniqueCartValue; 
   }

// product added in the checkout section. 
let sum =0; 
 const checkOut =(id,lastValue)=>{
   
 const filteredProduct = filteredMenu.filter((product)=>product.id==id);
 const uniqueValue = menu.reduce((accu, item)=>{
  if(!accu.includes(item.category)){
    accu.push(item.category);
  }
  return accu;
 },[]);

 const grabId = uniqueValue.map((menu)=>{
   const cartCategory = document.getElementById(menu);
   return cartCategory;
 });

 if(filteredProduct[0].category == "Drinks"){
    grabId.forEach((cart)=>{
      if( cart.id === "Drinks"){
         filteredProduct.forEach((product)=>{
          const formattedValue =  (Math.round((product.price*lastValue) * 100) / 100).toFixed(2);
          sum=sum+parseInt(formattedValue);
          const elem = document.createElement("div");
          elem.classList.add("product-items-list");
          elem.innerHTML = `
          <h4>${product.title}</h4>
               <h4>$ ${product.price} x ${lastValue}</h4>
               <h4>$ ${formattedValue}</h4>
          `
          cart.appendChild(elem);
        });
       
      
      }
     
    })
 
 }

 else if(filteredProduct[0].category === "Food"){
  grabId.forEach((cart)=>{
    if( cart.id === "Food"){
       filteredProduct.forEach((product)=>{
        const formattedValue =  (Math.round((product.price*count) * 100) / 100).toFixed(2);
        sum=sum+parseInt(formattedValue);
        const elem = document.createElement("div");
        elem.classList.add("product-items-list");
        elem.innerHTML = `
        <h4>${product.title}</h4>
             <h4>$ ${product.price} x ${count}</h4>
             <h4>$ ${formattedValue}</h4>
        `
        cart.appendChild(elem);
      });
    }
   
  })
 }

 else if(filteredProduct[0].category === "Dessert"){
  grabId.forEach((cart)=>{
    if( cart.id === "Dessert"){
       filteredProduct.forEach((product)=>{
        const formattedValue =  (Math.round((product.price*lastValue) * 100) / 100).toFixed(2);
        sum=sum+parseInt(formattedValue);
        const elem = document.createElement("div");
        elem.classList.add("product-items-list");
        elem.innerHTML = `
        <h4>${product.title}</h4>
             <h4>$ ${product.price} x ${lastValue}</h4>
             <h4>$ ${formattedValue}</h4>
        `
        cart.appendChild(elem);
      });
    }
   
  })
 }
 totalBill(sum);
}

const totalBill = (sum) =>{
 const total = document.getElementById("subtotal");
 const amount = document.getElementById("amount");
 total.textContent = sum;
 amount.textContent=sum + 71;
}