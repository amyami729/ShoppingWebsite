# ShoppingWebsite
## Introduction
- 使用 Vue 實作購物網站功能，串接後端 API 所提供資訊
- 使用 Vue Router 處理網頁路徑並渲染頁面
- 使用 Vuex 管理購物車清單的商品
- 使用 localStorage 存放收藏清單的資料

## Features
- 前台
  - 輪播圖（輪播功能使用了 Vue 的 transition 來製作）
    - 點擊上、下一頁來切換圖片
    - 點擊底部小圓點來切換指定頁
    - 定時自動播放(下一頁)
    - 最末頁再跳下一頁時，即返回第一頁; 第一頁再跳前一頁時，即返回最末頁
  - 產品橫幅 Product banner
  - 特色產品推薦 Featured product recommendation
  - 產品列表頁面 Product list page
    - 搜尋商品 Search for products
    - 商品價格排序 Sort by price
    - 產品分類切換 product category switch
    - 產品列表分頁 Pagination
    - 單品詳細頁 Single product detail page
  - 收藏清單 Favorite
  - 購物車 Cart
    - 商品單選/全選功能
- 後台
  - 管理者登入、登出 login/SignOut
  - 產品列表 Product list
    - 產品新增、編輯、刪除
  - 訂單列表 Order
    - 訂單新增、編輯、刪除
  - 優惠劵 Coupon
    - 優惠劵新增、編輯、刪除

## Skill
- Language: Javascript
- Framework: Vue, Vuex, Bootstrap 4
- Other: HTML5, CSS3, SCSS, Git, Ajax, Webpack, RESTful API, Jest

## Use plugins
- vue-loading-overlay (載入效果)
- vee-validate (表單驗證)
- AOS (頁面滾動動畫)
- Font Awesome（圖標）

## Display
### 首頁
![](https://i.imgur.com/UksPyGA.jpg)

### 產品列表
![](https://i.imgur.com/SO1LoX5.jpg)

### 單品詳細頁
![](https://i.imgur.com/Q22hpGr.jpg)

### 收藏清單
![](https://i.imgur.com/BcHfvzm.png)

### 購物車
![](https://i.imgur.com/G2tfXwh.png)

### 後台管理者登入
![](https://i.imgur.com/cD9EP6v.png)

### 後台管理系統
![](https://i.imgur.com/6ATBsc4.png)
