let cartBtn = document.querySelector("#cartBtn");
let products = [
	{ name: "Xiaomi 15", price: 4499, category: "phones", image: "https://images.unsplash.com/photo-1760597371617-5c0652f58178?w=600&h=600&fit=crop&auto=format&q=70" },
	{ name: "Redmi Note 14", price: 1399, category: "phones", image: "https://images.unsplash.com/photo-1758218118907-a55daaa572c0?w=600&h=600&fit=crop&auto=format&q=70" },
	{ name: "Xiaomi Pad 7", price: 1999, category: "tablets", image: "https://images.unsplash.com/photo-1526485797145-514b2fe83749?w=600&h=600&fit=crop&auto=format&q=70" },
	{ name: "Redmi Pad 2", price: 1099, category: "tablets", image: "https://images.unsplash.com/photo-1587033411391-5d9e51cce126?w=600&h=600&fit=crop&auto=format&q=70" },
	{ name: "Xiaomi Book Pro 14", price: 6999, category: "laptops", image: "https://images.unsplash.com/photo-1709721821603-8f0f11ce3e0d?w=600&h=600&fit=crop&auto=format&q=70" },
	{ name: "Redmi Book 16", price: 4299, category: "laptops", image: "https://images.unsplash.com/photo-1736576660096-744a1dae8e03?w=600&h=600&fit=crop&auto=format&q=70" },
	{ name: "Xiaomi Watch S4", price: 999, category: "wearables", image: "https://images.unsplash.com/photo-1723622555972-37af178c623a?w=600&h=600&fit=crop&auto=format&q=70" },
	{ name: "Xiaomi Smart Band 9", price: 249, category: "wearables", image: "https://images.unsplash.com/photo-1641361777339-0ee075cf3ab4?w=600&h=600&fit=crop&auto=format&q=70" },
	{ name: "Xiaomi Robot Vacuum", price: 1999, category: "smart-home", image: "https://images.unsplash.com/photo-1558317374-24793bc9f2fb?w=600&h=600&fit=crop&auto=format&q=70" },
	{ name: "Xiaomi Water Purifier", price: 1499, category: "smart-home", image: "https://images.unsplash.com/photo-1662460149302-02a1934bbc12?w=600&h=600&fit=crop&auto=format&q=70" }
];
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let cartPanel = document.getElementById("cartPanel");
let cartList = document.getElementById("cartList");
let cartTotal = document.getElementById("cartTotal");
let clearBtn = document.getElementById("clearBtn");
let productList = document.querySelector(".product-list");
let categoryItems = document.querySelectorAll(".sidebar li")

function renderProducts(category) {
	productList.textContent = "";

	for (let i = 0; i < products.length; i++) {
		if(category === "all" || products[i].category === category){

		// ① 造 5 个元素
		let card = document.createElement("div");
		let img = document.createElement("img");
		let titleText = document.createElement("h3");
		let priceText = document.createElement("p");
		let btn = document.createElement("button");

		// ② 加 class
		card.classList.add("card");
		priceText.classList.add("price");
		btn.classList.add("addBtn");

		// ③ 写内容
		img.src = products[i].image;
		img.alt = products[i].name;
		titleText.textContent = products[i].name;
		priceText.textContent = "¥" + products[i].price.toLocaleString();
		btn.textContent = "Add to Cart";

		// ④ 造完按钮马上绑事件（原来 Add to Cart 的代码搬到这里）
		btn.addEventListener("click", function () {
			let found = false;
			for (let j = 0; j < cart.length; j++) {
				if (products[i].name === cart[j].name) {
					cart[j].qty++;
					found = true;
				}
			}

			if (!found) {
				cart.push({
					name: products[i].name,
					price: products[i].price,
					qty: 1
				});
			}
			renderCart();
		});

		// ⑤ 组装
		card.appendChild(img);
		card.appendChild(titleText);
		card.appendChild(priceText);
		card.appendChild(btn);
		productList.appendChild(card);
		}
	}
}

function renderCart() {
	localStorage.setItem("cart",JSON.stringify(cart));
	cartList.textContent = "";

	if(cart.length ===0){
		let li = document.createElement("li");
		li.textContent = "Your cart is empty";
		cartList.appendChild(li);
	}
	let total = 0;
	let count = 0;
	for (let i = 0; i < cart.length; i++) {
		let li = document.createElement("li");
		li.textContent = cart[i].name + " × " + cart[i].qty + " - ¥" + (cart[i].price * cart[i].qty).toLocaleString();
		cartList.appendChild(li);
		total += cart[i].price * cart[i].qty;
		count += cart[i].qty;
		let delBtn = document.createElement("button");
		delBtn.textContent = "×";
		delBtn.classList.add("delBtn");
		delBtn.addEventListener("click", function () {
			cart.splice(i, 1);
			renderCart();
		});
		li.appendChild(delBtn);
	}
	cartBtn.textContent = "Cart (" + count + ")";
	cartTotal.textContent = "Total: ¥" + total.toLocaleString();
}

cartBtn.addEventListener("click", function () {
	cartPanel.hidden = !cartPanel.hidden;
});

clearBtn.addEventListener("click", function () {
	cart = [];
	renderCart();
});

for (let i = 0; i < categoryItems.length; i++) {
	categoryItems[i].addEventListener("click", function () {
		let category = categoryItems[i].dataset.category; 

		// 1. 全部关灯
		for (let j = 0; j < categoryItems.length; j++) {
			categoryItems[j].classList.remove("active");
		}

		// 2. 开被点的这一盏
		categoryItems[i].classList.add("active");
		renderProducts(category); 

	});
}

renderProducts("all");
renderCart();
