// 1. Find all the information about each products

db.day1.find();// i have named as day1 

//2.Find the product price which are between 400 to 800

db.day1.find({product_price :{$gt:400,$lt:600}});

//3.Find the product price which are not between 400 to 600

db.day1.find({$or:[{"product_price":{$lt:400}},{"product_price":{$gt:600}}]});


//4.List the four product which are grater than 500 in price 

db.day1.find({product_price:{$gt:500}});

//5.Find the product name and product material of each products

db.day1.find({}, { product_name: 1, product_material: 1, _id: 0 });

//6.Find the product with a row id of 10

db.day1.find({id:'10'});

//7.Find only the product name and product material

db.day1.find({}, { product_name: 1, product_material: 1, _id: 0 });

//8.Find all products which contain the value of soft in product material 

db.day1.find({ product_material: "Soft" });

//9.Find products which contain product color indigo  and product price 492.00


db.day1.find({$or:[{ product_color: "indigo" },{ product_price: 492.00 }]})


//10.Delete the products which product price value are same
            
