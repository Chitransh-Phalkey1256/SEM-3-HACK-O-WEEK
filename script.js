// Collection of stationery products

const products = [
    {
        id: 1,
        name: "Notebook",
        price: 50
    },
    {
        id: 2,
        name: "Pen",
        price: 10
    },
    {
        id: 3,
        name: "Pencil",
        price: 5
    },
    {
        id: 4,
        name: "Eraser",
        price: 5
    },
    {
        id: 5,
        name: "Marker",
        price: 30
    }
];


// ---------------------------------------
// 1. CALLBACK
// ---------------------------------------

function getProducts(callback) {

    setTimeout(function () {

        callback(products);

    }, 1000);
}


function fetchProductsCallback() {

    document.getElementById("output").innerHTML =
        "Fetching products...";

    getProducts(function (data) {

        let result = "<h3>Products:</h3>";

        data.forEach(function (product) {

            result +=
                product.id + ". " +
                product.name +
                " - ₹" +
                product.price +
                "<br>";

        });

        document.getElementById("output").innerHTML = result;

    });
}


// ---------------------------------------
// 2. PROMISE
// ---------------------------------------

function getProductPromise(id) {

    return new Promise(function (resolve, reject) {

        setTimeout(function () {

            const product = products.find(function (p) {
                return p.id === id;
            });

            if (product) {
                resolve(product);
            } else {
                reject("Product not found!");
            }

        }, 1000);
    });
}


function fetchProductPromise() {

    document.getElementById("output").innerHTML =
        "Fetching product using Promise...";

    getProductPromise(2)

        .then(function (product) {

            document.getElementById("output").innerHTML =
                "<h3>Product Found</h3>" +
                "Name: " + product.name +
                "<br>" +
                "Price: ₹" + product.price;

        })

        .catch(function (error) {

            document.getElementById("output").innerHTML =
                error;

        });
}


// ---------------------------------------
// 3. ASYNC / AWAIT
// ---------------------------------------

function orderProduct() {

    return new Promise(function (resolve) {

        setTimeout(function () {

            resolve("Order placed successfully!");

        }, 1000);

    });
}


async function placeOrder() {

    document.getElementById("output").innerHTML =
        "Placing order...";

    try {

        const message = await orderProduct();

        document.getElementById("output").innerHTML =
            "<h3>" + message + "</h3>";

    }

    catch (error) {

        document.getElementById("output").innerHTML =
            "Order failed";

    }
}