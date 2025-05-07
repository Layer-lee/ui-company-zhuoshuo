<template>
  <div class="project-page-container">
    <Header fixed />

    <main class="project-main-content">
      <section id="projects" class="py-5 bg-light">
        <div class="container text-center">
          <div class="d-flex justify-content-between align-items-center mb-4">
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
            <h2 class="section-title mb-0">工程案例</h2>
            <div style="width: 100px"></div>
            <!-- 保持标题居中 -->
          </div>
          <!-- <h2 class="section-title">工程案例</h2> -->
          <p class="section-summary">
            多年来，我们成功完成了众多大型工程项目，以下是我们的工程介绍
          </p>

          <!-- 新增搜索框 -->
          <div class="search-box mb-4">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="搜索项目名称或描述..."
              class="form-control"
            />
          </div>

          <div class="filter-buttons mb-4">
            <button
              v-for="(category, index) in projectCategories"
              :key="index"
              @click="setActiveCategory(category)"
              :class="['btn', activeCategory === category ? 'btn-primary' : 'btn-outline-primary']"
            >
              {{ category }}
            </button>
          </div>

          <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            <div v-for="(project, index) in displayedProjects" :key="index" class="col">
              <div class="card h-100">
                <img :src="project.image" class="card-img-top" :alt="project.title" />
                <div class="card-body d-flex flex-column">
                  <h5 class="card-title text-truncate hover-reveal">{{ project.title }}</h5>
                  <p class="card-text line-clamp-2 hover-reveal">{{ project.summary }}</p>
                  <router-link
                    :to="'/project/' + project.id"
                    class="text-blue-600 hover:text-blue-800 font-medium flex items-center cursor-pointer"
                  >
                    查看详情
                    <i class="fas fa-arrow-right ml-2"></i>
                  </router-link>
                </div>
              </div>
            </div>
          </div>

          <!-- 加载状态提示 -->
          <div v-if="loading" class="loading-indicator">
            <span class="spinner"></span> 加载中...
          </div>
          <div v-if="!hasMore && !loading" class="no-more-data">已经到底啦~</div>
        </div>
      </section>
    </main>

    <Footer fixed />
  </div>
</template>

<script setup>
import Footer from '@/components/FooterComponent.vue'
import Header from '@/components/HeaderComponent.vue'
import { projects } from '@/data/projects'
import { scrollToTop } from '@/utils/scroll.js'
import { debounce } from 'lodash-es'
import { computed, onErrorCaptured, onMounted, onUnmounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
// 状态管理
const activeCategory = ref('全部项目')
const searchQuery = ref('')
const loading = ref(false)
const hasMore = ref(true)
const currentPage = ref(1)
const pageSize = 6
const router = useRouter()

// 项目分类数组 - 必须正确定义
const projectCategories = ['全部项目', '港口工程', '航道工程', '市政工程', '水利工程']

// 错误处理
onErrorCaptured((err) => {
  console.error('组件错误:', err)
  return false
})
const goBack = () => {
  router.go(-1)
}

// 定义 filteredProjects 计算属性
const filteredProjects = computed(() => {
  let filtered = [...projects]

  // 分类过滤
  if (activeCategory.value !== '全部项目') {
    filtered = filtered.filter((p) => p.category === activeCategory.value)
  }

  // 搜索过滤
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(
      (p) =>
        (p.title?.toLowerCase().includes(query) ||
          p.summary?.toLowerCase().includes(query) ||
          p.description?.toLowerCase().includes(query)) ??
        false
    )
  }

  return filtered.sort((a, b) => b.id - a.id)
})

// 定义 displayedProjects 计算属性
const displayedProjects = computed(() => {
  return filteredProjects.value.slice(0, currentPage.value * pageSize)
})

// 检查是否还有更多数据
const checkHasMore = () => {
  hasMore.value = displayedProjects.value.length < filteredProjects.value.length
}
const loadMore = debounce(() => {
  if (loading.value || !hasMore.value) return

  loading.value = true
  currentPage.value++
  checkHasMore() // 每次加载后检查是否还有更多
  loading.value = false
}, 200)

const handleScroll = debounce(() => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement
  if (scrollHeight - (scrollTop + clientHeight) < 200) {
    loadMore()
  }
}, 100)
const setActiveCategory = (category) => {
  activeCategory.value = category
}
// 生命周期
onMounted(() => {
  scrollToTop()
  checkHasMore()
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
// 监听器
watch(searchQuery, () => {
  currentPage.value = 1
  checkHasMore()
})
</script>

<style scoped>
/* 页面布局 */
.project-main-content {
  flex: 1;
  overflow-y: auto;
  padding-top: var(--header-height, 80px);
}

/* 搜索框样式 */
.search-box {
  max-width: 500px;
  margin: 0 auto;
}

/* 加载指示器 */
.loading-indicator {
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
}

.spinner {
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top-color: #333;
  animation: spin 1s linear infinite;
  margin-right: 8px;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.no-more-data {
  padding: 20px;
  color: #999;
  font-size: 0.9em;
}
</style>
