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
