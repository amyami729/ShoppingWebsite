<template>
  <div class="modal fade" id="productModal" tabindex="-1" role="dialog" data-bs-backdrop="static" aria-labelledby="productModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content border-0">
        <div class="modal-header">
          <h5 class="modal-title" id="productModalLabel">
            <slot name="title"></slot>
          </h5>
          <button type="button" class="btn-close" @click="hideModel()" aria-label="Close"></button>
        </div>

        <div class="modal-body">
          <div class="row">
            <div class="col-sm-4">
              <div class="form-group">
                <label for="image">輸入圖片網址</label>
                <input type="text" class="form-control" id="image" v-model="currentProduct.imageUrl" placeholder="請輸入圖片連結">
              </div>
              <div class="form-group">
                <label for="customFile">
                  或 上傳圖片
                  <!-- 讀取效果的icon -->
                  <i class="fas fa-spinner fa-pulse" v-if="status.fileUploading"></i>
                  </label>
                <input type="file" id="customFile" class="form-control" ref="files" @change="uploadFile">
              </div>
              <img class="img-thumbnail" alt="商品圖片" :src="currentProduct.imageUrl">
            </div>

            <div class="col-sm-8">
              <div class="form-group">
                <label for="title">標題</label>
                <input type="text" class="form-control" id="title" v-model="currentProduct.title" placeholder="請輸入標題">
              </div>

              <div class="form-row">
                <div class="form-group col-md-6">
                  <label for="category">分類</label>
                  <input type="text" class="form-control" id="category" v-model="currentProduct.category" placeholder="請輸入分類">
                </div>
                <div class="form-group col-md-6">
                  <label for="price">單位</label>
                  <input type="unit" class="form-control" id="unit" v-model="currentProduct.unit" placeholder="請輸入單位">
                </div>
              </div>

              <div class="form-row">
                <div class="form-group col-md-6">
                  <label for="origin_price">原價</label>
                  <input type="number" class="form-control" id="origin_price" v-model="currentProduct.origin_price" placeholder="請輸入原價">
                </div>
                <div class="form-group col-md-6">
                  <label for="price">售價</label>
                  <input type="number" class="form-control" id="price" v-model="currentProduct.price" placeholder="請輸入售價">
                </div>
              </div>
              <hr>

              <div class="form-group">
                <label for="description">產品描述</label>
                <textarea type="text" class="form-control" id="description" v-model="currentProduct.description" placeholder="請輸入產品描述"></textarea>
              </div>

              <div class="form-group">
                <label for="content">說明內容</label>
                <textarea type="text" class="form-control" id="content" v-model="currentProduct.content" placeholder="請輸入產品說明內容"></textarea>
              </div>
              
              <div class="form-group">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="is_enabled" v-model="currentProduct.is_enabled" :true-value="1" :false-value="0">
                  <label class="form-check-label" for="is_enabled">是否啟用</label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" @click="hideModel()">取消</button>
          <button type="button" class="btn btn-success" @click="updateProduct">確認</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    currentItem: Object,
    isNew: Boolean
  }, 
  data() {
    return {
      currentProduct: {},  // 1.將當前產品之內容綁定在此
      status: {
        fileUploading: false   // 用來設定局部的loading狀態，預設為不顯示
      }
    }
  },
  methods: {
    hideModel() {
      this.$emit('emit-hide');
      this.$refs.files.value = '';
    },
    getProducts() {
      this.$emit('emit-getProducts');
    },
    // 2.透過post方式將currentProduct新增到資料庫裡
    updateProduct() {
      let api;
      let httpMethod;

      if (this.isNew) { 
        api  = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product`;  // 建立產品
        httpMethod = 'post';
      } else{  
        api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product/${this.currentItem.id}`;  // 編輯產品
        httpMethod = 'put';
      }
      
      // JavaScript向伺服器發送HTTP請求並通過自定義的httpMethod方法，將api和currentProduct資料一併傳送到後端
      // 當後端傳回的response是完成的狀態下(表示請求已完成)，我們可以用.then去處理成功結果
      this.$http[httpMethod](api, {data: this.currentProduct}).then((response) => { 
        if (response.data.success) {  // 若商品 建立/編輯 成功,
          this.hideModel();    // 關閉modal
          this.$store.dispatch('alertModules/updateMessage',
            { message: response.data.message, status: 'success' });
          this.getProducts();   // 重新取得產品資料
        }
      });
    },
    uploadFile() {
      // 取出圖檔
      const uploadedFile = this.$refs.files.files[0];  
      // 建立formData物件 
      const formData = new FormData(); 
      // 使用append()方式將uploadedFile圖片檔上傳到file-to-upload欄位，並新增到formData（將uploadedFile物件改成FormData的格式）
      formData.append('file-to-upload', uploadedFile); 
      // 定義路徑
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/upload`;  // 表單傳送
      // 取得JSON數據時即執行loading狀態
      this.status.fileUploading = true; 
      // 送出
      this.$http.post(api, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'  //設置請求的內容型態：form-data格式
        }
      }).then((response) => {
        // 取得JSON數據之後即停止loading狀態
        this.status.fileUploading = false; 

        if (response.data.success) {   // 若圖片上傳成功,
          this.currentProduct.imageUrl = response.data.imageUrl;
        }else {
          this.$store.dispatch('alertModules/updateMessage',
            { message: response.data.message, status: 'danger' });
          this.$refs.files.value = '';
        }
      });
    }
  },
  watch: {
    currentItem () {
      this.currentProduct = this.currentItem;
    }
  }
}
</script>