const express = require('express');
const cors = require('cors');
const port = 8090;

// 1. 宣告server app
const app = express();

// 2. 使用全局的套件
// Express預設是非同網域不能獲取資源，因此Express官方自己出了一個套件cors
app.use(cors());

// parse request body as JSON
// 將傳入的Request Object以JSON的方式讀取
// 串接處理流程:讀資料和轉換成 JSON Object
app.use(express.json());

// 3. 宣告route, api path
// category
var routes = express.Router();
routes.get('/product/category', (req, res) => { 
	const category = ['全部商品', '特色推薦', '經典設計', '木椅', '塑膠椅', '金屬椅', '沙發'];
	res.send(category);
});

// 4. 使用routes
app.use('/api',routes);

// 5. server app監聽port
module.express = app.listen(port, function(err){
	if(err){
		console.log(err);
		return;
	}
	console.log('http://localhost:' + port + '\n');
});



// // key = id, value = prodcutFormat
// let products = {};
// // 因為id必須唯一，所以每次POST新資料進來都要把id++
// let id = 0;

// var productFormat = {
// 	id: -1,
// 	category: "金屬椅",
// 	content: "皮製經典復古沙發，是由多位大師級的工匠和設計師， 經過不容妥協的選材和設計，再經由專家嚴格的多項耐用性和安全性的測試， 聯手打造出兼具尊爵的視覺饗宴以及最高等級的使用體驗的產品。",
// 	description: "尺寸: 長1.2m x 寬0.6m x 高1.0m 材質: 皮革、泡棉、木材",
// 	id: "-MoYj-tceq53Z9e785Ck",
// 	imageUrl: "https://cdn.shopify.com/s/files/1/2004/3463/articles/best-double-tent-cot_800x800.jpg?v=1499365588",
// 	is_enabled: 1,
// 	origin_price: "1500",
// 	price: "999",
// 	title: "工業風輕巧長椅",
// 	unit: "張",
// 	num: 1
// }

// // 2、路由
// var routes = express.Router();

// // 3、编写接口
// // 返回特定product
// routes.get('/products/:id', (req, res) => {
// 	// 返回数据给客户端，返回json数据
// 	res.json(products[req.params.id]);
// 	console.log(JSON.stringify(products));
// });

// // 返回所有products
// routes.get('/products', (req, res) => {
// 	// 返回数据给客户端，返回json数据
// 	res.json(products);
// 	console.log(JSON.stringify(products));
// });

// routes.post('/products', (req, res) => {
// 	console.log(JSON.stringify(req.body));
// 	products[id++] = req.body;
// 	console.log(JSON.stringify(products));
// 	res.send('ok');
// });

// routes.delete('/products/:id', (req, res) => {
// 	delete products[req.params.id];
// 	console.log(JSON.stringify(products));
// 	res.send('ok');
// })

// // TODO
// routes.post('/login', (req, res) => {
// 	if (req.body.username == 'amy@gmail.com' && req.body.password == '123') {
// 		return 'admin';
// 	} else if (req.body.username == 'user@gmail.com' && req.body.password == '123') {
// 		return 'user';
// 	} else {
// 		return 'guest';
// 	}
// });