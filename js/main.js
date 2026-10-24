	let addBtns = document.querySelectorAll(".addBtn");
	let cartBtn = document.querySelector("#cartBtn");
	let products = [
	{ name: "Xiaomi 15", price: 4499 },
	{ name: "Redmi Note 14", price: 1399 },
	{ name: "Xiaomi Pad 7", price: 1999 }
	];
	let cart  = [];
	let cartPanel = document.getElementById("cartPanel");
	let cartList = document.getElementById("cartList");
	let cartTotal = document.getElementById("cartTotal");
	let clearBtn = document.getElementById("clearBtn");

	
	for (let i = 0;i<addBtns.length;i++){
		addBtns[i].addEventListener("click",function(){
			let found = false;
			for(let j = 0; j<cart.length;j++){
				if(products[i].name ===cart[j].name){
				cart[j].qty++;
				found=true;
				}
			}


		if(!found){
			cart.push({
			name:products[i].name,
			price:products[i].price,
			qty:1	
		});	
		}
			renderCart();
			console.log(cart);
		})
	}
	
	function renderCart(){
		cartList.textContent="";
		let total = 0;
		let count = 0;
		for(let i =0; i < cart.length;i++){
			let li = document.createElement("li");
			li.textContent = cart[i].name +"  count: " + cart[i].qty +  "        -￥" + 			cart[i].price*cart[i].qty;
			cartList.appendChild(li);
			total += cart[i].price * cart[i].qty;
			count += cart[i].qty;
			let delBtn = document.createElement("button");
			delBtn.textContent = "x";
			delBtn.addEventListener("click",function(){
			cart.splice(i,1);
			renderCart();
			})
			li.appendChild(delBtn);
		}
		cartBtn.textContent = "Cart ("  + count  +  ")";
		cartTotal.textContent = "Total: ￥" + total;
		
	}	

	cartBtn.addEventListener("click",function(){
	cartPanel.hidden = !cartPanel.hidden;
	})
	clearBtn.addEventListener("click",function(){
	cart=[];
	renderCart();
	})
