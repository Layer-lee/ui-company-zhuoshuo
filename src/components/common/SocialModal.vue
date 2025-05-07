<template>
  <transition name="modal">
    <div v-if="visible" class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header" :style="{ backgroundColor: headerBgColor }">
            <h3>{{ title }}</h3>
            <button class="modal-close" @click="close">&times;</button>
          </div>
          <div class="modal-body">
            <slot>
              <p>{{ content }}</p>
            </slot>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" @click="close">关闭</button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'SocialModal',
  props: {
    modelValue: {
      // 使用标准的v-model prop名
      type: Boolean,
      default: false,
    },
    title: String,
    content: String,
    headerBgColor: {
      type: String,
      default: '#cce5ff',
    },
  },
  computed: {
    visible: {
      get() {
        return this.modelValue
      },
      set(value) {
        this.$emit('update:modelValue', value)
      },
    },
  },
  methods: {
    close() {
      this.visible = false
    },
  },
}
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  width: 100%;
  max-width: 500px;
}

.modal-container {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  overflow: hidden;
}

.modal-header {
  padding: 15px 20px;
  color: #333;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header h3 {
  margin: 0;
  font-size: 1.25rem;
}

.modal-close {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #666;
}

.modal-body {
  padding: 20px;
  color: #555;
}

.modal-footer {
  padding: 15px 20px;
  border-top: 1px solid #eee;
  text-align: right;
}

/* 过渡动画 */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s;
}

.modal-enter,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .modal-container,
.modal-leave-active .modal-container {
  transition: all 0.3s ease;
}

.modal-enter .modal-container,
.modal-leave-to .modal-container {
  transform: translateY(-20px);
  opacity: 0;
}
</style>
