import { onMounted } from 'vue'

/**
 * 滚动到页面顶部（考虑header高度）
 * @param {string} [headerSelector='#header'] - header元素选择器
 * @param {number} [offset=0] - 额外偏移量
 */
export const scrollToTop = (headerSelector = '#header', offset = 0) => {
  const headerHeight = document.querySelector(headerSelector)?.offsetHeight || 0
  window.scrollTo({
    top: offset - headerHeight,
    behavior: 'smooth',
  })
}

/**
 * 滚动到指定元素（考虑header高度）
 * @param {string} targetId - 目标元素ID
 * @param {string} [headerSelector='#header'] - header元素选择器
 * @param {number} [offset=0] - 额外偏移量
 */
export const scrollToElement = (targetId, headerSelector = '#header', offset = 0) => {
  const headerHeight = document.querySelector(headerSelector)?.offsetHeight || 0
  const element = document.getElementById(targetId)

  if (element) {
    window.scrollTo({
      top: element.offsetTop - headerHeight + offset,
      behavior: 'smooth',
    })
  }
}

/**
 * 处理hash路由滚动
 * @param {Array} sections - 可滚动区域数组
 * @param {string} [headerSelector='#header'] - header元素选择器
 */
export const handleHashScroll = (sections = [], headerSelector = '#header') => {
  onMounted(() => {
    if (window.location.hash) {
      const hash = window.location.hash.substring(1)
      if (sections.some((s) => s.id === hash)) {
        setTimeout(() => {
          scrollToElement(hash, headerSelector)
        }, 100)
      }
    }
  })
}
