<template>
  <div class="project-detail-page">
    <Header />

    <main class="project-detail-container">
      <!-- 项目名称部分 -->
      <section id="project-title" class="detail-section-title">
        <div class="title-wrapper">
          <button class="back-button" @click="goBack">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
          </button>
          <h1 class="title-text">{{ projectData.title }}</h1>
          <!-- 添加一个空的占位元素保持对称 -->
          <div class="button-placeholder"></div>
        </div>
      </section>

      <!-- 项目描述部分 -->
      <div class="description-content" v-html="formattedDescription"></div>

      <!-- 项目图片展示 -->
      <section class="project-gallery">
        <div class="gallery-grid">
          <div
            v-for="(img, index) in processedImages"
            :key="index"
            class="gallery-item"
            @click="openImagePreview(index)"
          >
            <img :src="img.url" class="gallery-image" />
          </div>
        </div>
      </section>
    </main>

    <Footer />

    <ImagePreviewModal
      :isOpen="previewStore.isOpen.value"
      :currentImage="previewStore.currentImage.value"
      :currentIndex="previewStore.currentIndex.value"
      :imageList="previewStore.imageList.value"
      @close="previewStore.closePreview"
      @prev="previewStore.showPrev"
      @next="previewStore.showNext"
    />
  </div>
</template>
<script setup>
import Footer from '@/components/FooterComponent.vue'
import Header from '@/components/HeaderComponent.vue'
import ImagePreviewModal from '@/components/common/ImagePreviewModal.vue'
import { projects } from '@/data/projects'
import { useImagePreview } from '@/stores/imagePreview'
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const projectData = ref({
  title: '',
  summary: '',
  description: '',
  images: [],
})

const goBack = () => {
  window.history.back()
}

// 加载项目数据
const loadProjectData = () => {
  const projectId = Number(route.params.id)
  const project = projects.find((p) => p.id === projectId)

  if (project) {
    projectData.value = {
      title: project.title,
      summary: project.summary, // 确保加载summary
      description: project.description, // 确保加载description
      images: Array.isArray(project.images)
        ? project.images
        : project.image
        ? [{ url: project.image }]
        : [],
    }
    document.title = `${project.title} - 项目详情`
  }
}
/** --------------------图片处理------------------------ */
// 使用全局图片预览功能
const previewStore = useImagePreview()

// 获取图片URL的方法
const getImageUrl = (path) => {
  if (!path) return ''
  if (typeof path === 'string' && path.startsWith('http')) return path
  if (path?.default) return path.default
  return path
}

// 处理图片URL
const processedImages = computed(() => {
  return (
    projectData.value.images?.map((img) => ({
      raw: img.url,
      url: getImageUrl(img.url),
    })) || []
  )
})

// 打开图片预览
const openImagePreview = (index) => {
  previewStore.openPreview(
    processedImages.value[index].url,
    index,
    processedImages.value.map((img) => img.url)
  )
}

/** --------------------文字处理------------------------ */
// 处理项目描述换行
const formattedDescription = computed(() => {
  if (!projectData.value.description) return ''
  // 1. 首先处理原始换行符
  return String(projectData.value.description)
    .replace(/\n\n/g, '<br><br>') // 双换行保留
    .replace(/\n/g, ' ') // 单换行转空格
    .replace(/。/g, '。<br>') // 句号换行
})

// 滚动到指定section
const scrollTo = (sectionId) => {
  const header = document.querySelector('#header')
  const headerHeight = header ? header.offsetHeight : 0
  const element = document.getElementById(sectionId)

  if (element) {
    window.scrollTo({
      top: element.offsetTop - headerHeight,
      behavior: 'smooth',
    })

    activeSection.value = sectionId
    history.replaceState(null, null, `#${sectionId}`)
  }
}

onMounted(() => {
  loadProjectData()
  // 确保标题不被header遮挡
  scrollTo()
})
</script>

<style scoped>
/* Header固定顶部 */
header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

/* 主内容容器 */
.project-detail-container {
  flex: 1;
  width: 60%;
  margin: 0 auto;
  padding: 20px 0;
  display: flex;
  flex-direction: column;
}

.detail-section-title {
  position: sticky;
  top: var(--header-height, 80px);
  background: white;
  padding: 20px 0;
  z-index: 50;
  margin-bottom: 10px;
}

/* 标题容器 */
.title-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 1200px; /* 可选，限制最大宽度 */
  margin: 0 auto;
  position: relative;
}

.detail-section-title h1 {
  font-size: 2.2rem;
  margin: 0;
}

/*************** 项目描述 ******************/

/* 描述区域 */
.description-content {
  line-height: 1.8;
  padding: 20px 0;
  white-space: normal;
  overflow: visible;
}

/* 图片区域 */
.project-gallery {
  flex: 1;
  overflow-y: auto; /* 仅图片区域可滚动 */
  padding: 20px 0;
  margin-top: 20px;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  padding-bottom: 20px;
}

/* 图片项样式 */
.gallery-item {
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 4px;
  overflow: hidden;
}

.gallery-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.gallery-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

/* Footer样式 */
footer {
  flex-shrink: 0;
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .project-detail-container {
    width: 90%;
  }
}

@media (max-width: 768px) {
  .gallery-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .gallery-grid {
    grid-template-columns: 1fr;
  }
}
</style>
