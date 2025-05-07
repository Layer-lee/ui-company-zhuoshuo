<template>
  <Transition name="fade">
    <div v-if="isOpen" class="image-preview-modal" @click.self="handleClose">
      <div class="preview-content">
        <img :src="currentImage" class="preview-image" @click.stop="handleNext" />

        <!-- 导航按钮 -->
        <button
          v-if="showNavigation && hasPrevious"
          class="nav-btn prev-btn"
          @click.stop="handlePrev"
        >
          <i class="bi bi-chevron-left"></i>
        </button>

        <button v-if="showNavigation && hasNext" class="nav-btn next-btn" @click.stop="handleNext">
          <i class="bi bi-chevron-right"></i>
        </button>

        <!-- 修复关闭按钮 - 添加.stop修饰符 -->
        <button class="close-btn" @click.stop="handleClose">
          <i class="bi bi-x-lg"></i>
        </button>

        <div class="index-indicator" v-if="showNavigation">
          {{ currentIndex + 1 }} / {{ imageList.length }}
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { computed, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  isOpen: Boolean,
  currentImage: String,
  currentIndex: Number,
  imageList: Array,
})

const emit = defineEmits(['close', 'prev', 'next'])

const showNavigation = computed(() => props.imageList.length > 1)
const hasPrevious = computed(() => props.currentIndex > 0)
const hasNext = computed(() => props.currentIndex < props.imageList.length - 1)

const handleClose = () => {
  emit('close')
}

const handlePrev = () => {
  emit('prev')
}

const handleNext = () => {
  emit('next')
}

const handleKeydown = (e) => {
  if (e.key === 'Escape') handleClose()
  else if (showNavigation.value) {
    if (e.key === 'ArrowLeft') handlePrev()
    else if (e.key === 'ArrowRight') handleNext()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<style scoped>
/* 保持原有样式不变，确保包含所有样式类 */
.image-preview-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.preview-content {
  position: relative;
  max-width: 90%;
  max-height: 90%;
}

.preview-image {
  max-width: 100%;
  max-height: 90vh;
  object-fit: contain;
  cursor: pointer;
}

/* 确保关闭按钮在最上层 */
.close-btn {
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(0, 0, 0, 0.5);
  border: none;
  color: white;
  font-size: 1.5rem;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10; /* 确保在最上层 */
  transition: background 0.2s;
}

.close-btn:hover {
  background: rgba(0, 0, 0, 0.8);
}

.nav-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  border: none;
  color: white;
  font-size: 2rem;
  width: 50px;
  height: 80px;
  cursor: pointer;
  transition: background 0.2s;
}

.nav-btn:hover {
  background: rgba(0, 0, 0, 0.8);
}

.prev-btn {
  left: 20px;
}

.next-btn {
  right: 20px;
}

.index-indicator {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  color: white;
  background: rgba(0, 0, 0, 0.5);
  padding: 5px 15px;
  border-radius: 20px;
  font-size: 0.9rem;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
