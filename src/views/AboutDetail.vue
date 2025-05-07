<template>
  <div class="project-detail-page">
    <Header fixed />
    <div class="detail-container">
      <!-- 顶部标题 -->
      <section class="page-header py-4 bg-light" style="margin-top: var(--header-height)">
        <div class="container">
          <h1 class="display-4 text-center">关于我们</h1>
          <p class="lead text-center text-muted">江苏焯烁建设工程有限公司</p>
        </div>
      </section>

      <!-- 主体内容 -->
      <div class="container my-3">
        <div class="row">
          <!-- 左侧导航 -->
          <div class="col-md-3">
            <div class="sticky-top pt-3" style="top: 100px">
              <div class="list-group">
                <a
                  v-for="(item, index) in sections"
                  :key="index"
                  :href="`#${item.id}`"
                  class="list-group-item list-group-item-action"
                  :class="{ active: activeSection === item.id }"
                  @click.prevent="scrollTo(item.id)"
                >
                  <i :class="`bi ${item.icon} me-2`"></i>
                  {{ item.title }}
                </a>
              </div>
              <!-- 添加在这里的返回按钮 -->
              <button class="back-button mt-3" @click="goBack">
                <i class="bi bi-arrow-left"></i> 返回
              </button>
            </div>
          </div>

          <!-- 右侧内容 -->
          <div class="col-md-9" ref="contentContainer">
            <!-- 公司介绍 -->
            <section v-if="activeSection === 'company-intro'" id="company-intro">
              <div class="card-about shadow-sm">
                <div class="card-about-body">
                  <h2 class="card-about-title">
                    <i :class="`bi ${sections[0].icon} me-2`"></i>{{ sections[0].title }}
                  </h2>
                  <div class="row">
                    <!-- <div class="col-md-4">
                      <img
                        :src="companyInfo.logoImage"
                        alt="公司形象"
                        class="img-fluid rounded"
                        @click="openPreview(companyInfo.logoImage)"
                      />
                    </div> -->
                    <div class="col-md-12">
                      <p
                        class="card-about-text"
                        v-html="formattedDescription(companyInfo.introduction)"
                      ></p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <!-- 营业执照 -->
            <section v-if="activeSection === 'business-license'" id="business-license">
              <div class="card-about shadow-sm">
                <div class="card-about-body">
                  <h2 class="card-about-title">
                    <i :class="`bi ${sections[1].icon} me-2`"></i>{{ sections[1].title }}
                  </h2>
                  <div class="row">
                    <div class="col-md-6">
                      <ul class="list-group list-group-flush">
                        <li
                          v-for="(value, key) in companyInfo.license"
                          :key="key"
                          class="list-group-item d-flex justify-content-between"
                        >
                          <span class="fw-bold text-truncate">{{ key }}:</span>
                          <span class="license-value">{{ value }}</span>
                        </li>
                      </ul>
                    </div>
                    <div class="col-md-6">
                      <img
                        :src="companyInfo.licenseImage"
                        alt="营业执照"
                        class="img-fluid rounded border"
                        @click="openPreview(companyInfo.licenseImage)"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <!-- 资质证书 -->
            <section v-if="activeSection === 'certificates'" id="certificates" class="mb-2">
              <div class="card-about shadow-sm">
                <div class="card-about-body py-2">
                  <h2 class="card-about-title mb-2">
                    <i :class="`bi ${sections[2].icon} me-2`"></i>{{ sections[2].title }}
                  </h2>
                  <div class="row">
                    <div v-for="(cert, index) in certificates" :key="index" class="col-md-6 mb-4">
                      <div class="certificate-card">
                        <img
                          :src="cert.image"
                          :alt="cert.title"
                          class="img-fluid rounded border"
                          @error="handleImageError"
                          @click="openPreview(cert.image)"
                        />
                        <p class="text-center mt-2 fw-bold">{{ cert.title }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <!--领导介绍-->
            <section v-if="activeSection === 'management'" id="management">
              <Member
                :icon="sections[3].icon"
                :title="sections[3].title"
                @open-preview="openPreview"
              />
            </section>
            <!--组织结构-->
            <section v-if="activeSection === 'organization'" id="organization">
              <Organization :icon="sections[4].icon" :title="sections[4].title" />
            </section>
          </div>
        </div>
      </div>
    </div>

    <!-- 图片预览模态框 -->
    <div v-if="previewImage" class="image-preview-modal" @click.self="closePreview">
      <div class="preview-content">
        <img :src="previewImage" class="preview-image" />
        <button class="close-btn" @click="closePreview">
          <i class="bi bi-x-lg"></i>
        </button>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Footer from '@/components/FooterComponent.vue'
import Header from '@/components/HeaderComponent.vue'
import Member from '@/components/MemberComponent.vue'
import Organization from '@/components/OrgComponent.vue'
import { certificates, companyInfo, sections } from '@/data/companyBasicInfo.js'
import { handleHashScroll, scrollToElement, scrollToTop } from '@/utils/scroll'
import { onMounted, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'AboutDetail',
  components: {
    Footer,
    Header,
    Member,
    Organization,
  },
  setup() {
    const router = useRouter()
    const contentContainer = ref(null)

    // 将导入的数据转换为响应式
    const activeSection = ref('company-intro')
    const reactiveSections = ref(sections) // 关键修复：转换为响应式
    const previewImage = ref(null)
    // 返回上一页
    const goBack = () => {
      router.go(-1)
    }
    const openPreview = (imgSrc) => {
      previewImage.value = imgSrc
      document.body.style.overflow = 'hidden' // 禁止背景滚动
    }

    const closePreview = () => {
      previewImage.value = null
      document.body.style.overflow = ''
    }
    // 图片错误处理
    const handleImageError = (e) => {
      console.error('图片加载失败:', e.target.src)
      e.target.src = '/images/image-placeholder.png'
    }
    // 企业简介文字格式化换行
    const formattedDescription = (description) => {
      if (!description) return ''
      // 1. 首先处理原始换行符
      return String(description)
        .replace(/\n\n/g, '<br><br>') // 双换行保留
        .replace(/\n/g, ' ') // 单换行转空格
        .replace(/。/g, '。<br>') // 句号换行
    }
    // 使用公共滚动方法
    const scrollTo = (sectionId) => {
      scrollToElement(sectionId)
      activeSection.value = sectionId
      history.replaceState(null, null, `#${sectionId}`)
    }
    // 滚动监听（保持原有逻辑）
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100
      reactiveSections.value.forEach((section) => {
        const element = document.getElementById(section.id)
        if (element) {
          const { top, height } = element.getBoundingClientRect()
          const elementTop = top + window.scrollY
          if (scrollPosition >= elementTop && scrollPosition < elementTop + height) {
            activeSection.value = section.id
          }
        }
      })
    }
    onMounted(() => {
      // 页面加载时滚动到顶部
      scrollToTop() // 使用公共方法
      handleHashScroll(reactiveSections.value) // 处理hash路由
      window.addEventListener('scroll', handleScroll)
    })

    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll)
    })

    return {
      sections: reactiveSections, // 返回响应式数据
      companyInfo: ref(companyInfo),
      certificates: ref(certificates),
      activeSection,
      previewImage,
      openPreview,
      closePreview,
      scrollTo,
      handleImageError,
      goBack,
      contentContainer,
      formattedDescription,
    }
  },
}
</script>

<style scoped>
.back-button {
  width: calc(100% - 1.5rem); /* 减去左右padding */
  margin: 0.75rem; /* 与导航菜单对齐 */
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 0.25rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.back-button:hover {
  background-color: #e9ecef;
  border-color: #ced4da;
}

/* 左侧导航样式 */
.list-group-item {
  border-left: 3px solid transparent;
  transition: all 0.3s ease;
}

.list-group-item.active {
  border-left-color: #0d6efd;
  background-color: #f8f9fa;
  color: #0d6efd;
  font-weight: 500;
}

/* 证书卡片样式 */
.certificate-card {
  transition: transform 0.3s;
  height: 100%;
}

.certificate-card:hover {
  transform: translateY(-3px);
}

/* 图片样式 */
.certificate-card img {
  width: 100%;
  height: 180px;
  object-fit: contain;
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .sticky-top {
    position: static;
    margin-bottom: 1rem;
  }

  .card-body {
    padding: 0.75rem;
  }

  .certificate-card img {
    height: 150px;
  }
  .back-button {
    position: static;
    margin-top: 1rem;
    width: auto;
  }

  .sticky-top {
    position: static;
  }
}
/** 图片打开查看大图 */
/* 图片预览模态框样式 */
.image-preview-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  cursor: zoom-out;
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
}

.close-btn {
  position: absolute;
  top: -40px;
  right: 0;
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
}

/* 为所有可点击图片添加手型光标 */
.img-fluid {
  cursor: zoom-in;
  transition: transform 0.2s;
}

.img-fluid:hover {
  transform: scale(1.02);
}
/** 营业执照显示 */
.license-value {
  display: -webkit-box;
  -webkit-line-clamp: 2; /* 限制显示行数 */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 75%; /* 控制宽度 */
  transition: all 0.3s ease;
}

/* 鼠标悬停时显示完整内容 */
.list-group-item:hover .license-value {
  -webkit-line-clamp: unset;
  overflow: visible;
  white-space: normal;
  background-color: white;
  position: relative;
}
</style>
