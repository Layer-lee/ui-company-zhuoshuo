<template>
  <header id="header" class="bg-white shadow-sm fixed-top">
    <div class="container">
      <!-- 左侧公司信息 -->
      <!-- Logo and Company Name Section -->
      <div class="row align-items-center py-2">
        <div class="col-md-12 d-flex align-items-center">
          <div class="logo me-3">
            <img src="@/assets/images/logo.png" alt="Company Logo" />
          </div>
          <div class="company-name">
            <p class="chinese-name mb-0">江苏焯烁建设工程有限公司</p>
            <p class="english-name mb-0">Jiangsu Zhuoshuo Construction Engineering Co., Ltd.</p>
          </div>
        </div>
      </div>

      <!-- 右侧导航栏 PC-->
      <div class="col-md-2 d-none d-md-block">
        <nav>
          <ul class="nav-list d-flex justify-content-end gap-4 mb-0">
            <li v-for="(item, index) in quickLinks" :key="index">
              <a
                :href="item.url"
                :class="{ 'nav-link': true, active: activeNav === item.url }"
                @click.prevent="setActiveNav(item.url)"
              >
                {{ item.text }}
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <!-- 移动端菜单 -->
      <div class="col-2 d-md-none text-end">
        <button @click="toggleMenu" class="navbar-toggler">
          <span class="navbar-toggler-icon"></span>
        </button>
      </div>

      <!-- 移动端折叠菜单 (独立于桌面导航) -->
      <div v-show="mobileMenuOpen" class="d-md-none">
        <nav>
          <ul class="nav-list-mobile">
            <li v-for="(item, index) in quickLinks" :key="index">
              <a
                :href="item.url"
                :class="{ 'nav-link': true, active: activeNav === item.url }"
                @click.prevent="setActiveNav(item.url)"
              >
                {{ item.text }}
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </header>
</template>
<script>
import { quickLinks } from '@/data/companyBasicInfo.js'
import { onMounted, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'Header',
  setup() {
    // 响应式状态
    const router = useRouter()
    const mobileMenuOpen = ref(false)
    const activeNav = ref('#home') // 默认激活首页

    // 初始化时读取URL hash
    onMounted(() => {
      activeNav.value = window.location.hash || '#home'
      window.addEventListener('hashchange', handleHashChange)
    })

    // 清理事件监听
    onUnmounted(() => {
      window.removeEventListener('hashchange', handleHashChange)
    })

    // 处理hash变化
    const handleHashChange = () => {
      activeNav.value = window.location.hash
    }
    // 修改后的导航点击处理
    const setActiveNav = (target) => {
      if (target.startsWith('#')) {
        // 如果是锚点链接
        if (router.currentRoute.value.path !== '/') {
          // 不在首页时先跳转首页
          router.push('/').then(() => {
            handleAnchorScroll(target)
          })
        } else {
          // 已经在首页直接滚动
          handleAnchorScroll(target)
        }
      } else {
        // 普通路由直接跳转
        router.push(target)
      }
      mobileMenuOpen.value = false
    }
    // 处理锚点跳转
    const handleAnchorScroll = (target) => {
      activeNav.value = target
      window.location.hash = target

      setTimeout(() => {
        const element = document.querySelector(target)
        if (element) {
          const headerHeight = document.querySelector('#header').offsetHeight
          const offsetPosition = element.offsetTop - headerHeight - 20

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
          })
        }
      }, 100) // 增加延迟确保页面跳转完成
    }

    // 切换移动菜单（保持原有功能）
    const toggleMenu = () => {
      mobileMenuOpen.value = !mobileMenuOpen.value
    }

    return {
      mobileMenuOpen,
      activeNav,
      toggleMenu,
      setActiveNav,
      quickLinks,
    }
  },
}
</script>
<style scoped>
/* Ensures header is fixed at the top */
header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: white;
  z-index: 1000;
  padding: 10px 0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* Ensures that the header content is properly spaced */
header .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
/* 导航链接基础样式 */
.nav-list {
  list-style: none;
  padding-left: 0; /* 消除内边距 */
}
.nav-link {
  color: #000 !important;
  font-weight: 500;
  font-size: 14px;
  white-space: nowrap;
  transition: color 0.3s;
  position: relative;
}

/* 悬停和激活状态 */
.nav-link:hover,
.nav-link.active {
  color: #1a4b8e !important;
  text-decoration: none;
  transform: scale(0.98);
}
/* 移动端菜单样式 */
.nav-list-mobile {
  flex-direction: column;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 0.5rem;
}

.navbar-toggler {
  border: 1px solid rgba(0, 0, 0, 0.813);
  padding: 0.25rem 0.5rem;
}

/* 移动端适配 */
@media (max-width: 575px) {
  .nav-list {
    list-style: none;
    flex-wrap: wrap;
    gap: 1rem;
  }
  .nav-link {
    padding: 0.5rem;
    font-size: 14px;
  }

  .nav-link.active::after {
    bottom: -3px;
    height: 1.5px;
  }
}
/* logo and company name section */
.logo img {
  width: 80px;
  height: auto;
}

/* company name section */
.chinese-name {
  font-size: 18px;
  color: black; /* 深蓝色 */
  font-weight: 800;
}

.english-name {
  font-size: 12px;
  color: #333;
}
</style>
