let cart = [];

function addToCart(name, price) {
    cart.push({ name, price });
    displayCart();
}

function displayCart() {
    let cartContainer = document.getElementById("cartList");
    cartContainer.innerHTML = ""; // เคลียร์เนื้อหาเดิมก่อน

    // สร้างตาราง
    let table = document.createElement("table");
    table.style.width = "100%";
    table.style.borderCollapse = "collapse";

    // หัวข้อของตาราง
    let thead = document.createElement("thead");
    let headerRow = document.createElement("tr");
    let headers = ["List", "Product", "Price", "Option"]; // **ลบ "หมายเหตุ" ออก**

    headers.forEach(text => {
        let th = document.createElement("th");
        th.textContent = text;
        th.style.border = "1px solid black";
        th.style.padding = "8px";
        th.style.textAlign = "center";
        th.style.backgroundColor = "#ddd";
        headerRow.appendChild(th);
    });

    thead.appendChild(headerRow);
    table.appendChild(thead);

    // ข้อมูลสินค้า
    let tbody = document.createElement("tbody");

    cart.forEach((item, index) => {
        let row = document.createElement("tr");

        // เพิ่มลำดับที่
        let tdIndex = document.createElement("td");
        tdIndex.textContent = index + 1;
        tdIndex.style.textAlign = "center";

        // รายการสินค้า
        let tdName = document.createElement("td");
        tdName.textContent = item.name;

        // ราคา
        let tdPrice = document.createElement("td");
        tdPrice.textContent = `$${item.price}`;
        tdPrice.style.textAlign = "center";

        // ปุ่มลบ
        let tdRemove = document.createElement("td");
        let removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.style.color = "white";
        removeButton.style.backgroundColor = "red";
        removeButton.style.border = "none";
        removeButton.style.padding = "5px 10px";
        removeButton.style.cursor = "pointer";
        removeButton.onclick = function() {
            removeFromCart(index);
        };

        tdRemove.appendChild(removeButton);
        tdRemove.style.textAlign = "center";

        // เพิ่มทุกคอลัมน์เข้าแถว
        row.appendChild(tdIndex);
        row.appendChild(tdName);
        row.appendChild(tdPrice);
        row.appendChild(tdRemove); // **ไม่มีหมายเหตุแล้ว**

        tbody.appendChild(row);
    });

    table.appendChild(tbody);
    cartContainer.appendChild(table);
}

function removeFromCart(index) {
    // ลบสินค้าตามดัชนีที่เลือก
    cart.splice(index, 1);
    displayCart(); // อัพเดตการแสดงผลหลังจากลบสินค้า
}


function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    // แสดงฟอร์ม Checkout
    document.getElementById("checkoutForm").style.display = "block";

    // แสดงสินค้าในตะกร้า
    let checkoutCartList = document.getElementById("checkoutCartList");
    checkoutCartList.innerHTML = "";
    
    let totalAmount = 0;
    cart.forEach((item, index) => {
        let li = document.createElement("li");
        li.textContent = `${index + 1}. ${item.name} - $${item.price}`;
        checkoutCartList.appendChild(li);
        totalAmount += item.price;
    });

    document.getElementById("checkoutTotal").textContent = totalAmount;
    
}

function confirmCheckout() {
    const name = document.getElementById("customerName").value.trim();
    const address = document.getElementById("address").value.trim();
    const contact = document.getElementById("contact").value.trim();

    if (!name || !address || !contact) {
        alert("Please fill out all customer information before confirming.");
        return;
    }

    // สร้างข้อความสรุป
    let summary = "✅ Order Summary:\n";
    let totalAmount = 0;

    cart.forEach((item, index) => {
        summary += `${index + 1}. ${item.name} - $${item.price}\n`;
        totalAmount += item.price;
    });

    summary += `\n🧾 Total: $${totalAmount}\n`;
    summary += `\n👤 Customer Name: ${name}\n🏠 Address: ${address}\n📞 Contact: ${contact}`;

    alert(summary);

    // ✅ ล้างข้อมูลทั้งหมดหลังสั่งซื้อ
    cart = [];
    displayCart();

    // ล้าง input fields
    document.getElementById("customerName").value = "";
    document.getElementById("address").value = "";
    document.getElementById("contact").value = "";

    // ล้างรายการใน checkout summary
    document.getElementById("checkoutCartList").innerHTML = "";
    document.getElementById("checkoutTotal").textContent = "0";

    // ซ่อนฟอร์ม
    document.getElementById("checkoutForm").style.display = "none";
}