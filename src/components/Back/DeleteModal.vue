<template>
  <div class="modal fade" id="deleteProductModal" tabindex="-1" role="dialog" data-bs-backdrop="static" aria-labelledby="deleteModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content border-0">

        <div class="modal-header">
          <h5 class="modal-title" id="deleteModalLabel">
            <slot name="title"></slot>
          </h5>
          <button type="button" class="btn-close" @click="hideModel()" data-dismiss="modal" aria-label="Close"></button>
        </div>

        <div class="modal-body">
          確定刪除「<span style="color: red;">{{ currentItem.title }}</span>」？
        </div>
        
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" @click="hideModel()">取消</button>
          <button type="button" class="btn btn-danger" @click="deleteItem(currentItem.id)">確認</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    currentItem: Object,
  },
  methods: {
    hideModel() {
      this.$emit('emit-hide');
    },
    deleteItem(id) {
      this.$emit('deleteItem', id);
    }
  }
}
</script>