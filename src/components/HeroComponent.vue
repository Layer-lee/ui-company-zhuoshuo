<template>
  <section id="hero" class="position-relative w-100" style="height: 50vh; overflow: hidden">
    <Swiper
      :modules="[Autoplay, Pagination]"
      :autoplay="{ delay: 3000, disableOnInteraction: false }"
      :pagination="{ clickable: true }"
      :loop="true"
    >
      <SwiperSlide v-for="(slide, index) in heroSlides" :key="index">
        <!-- 背景图 -->
        <div class="position-relative w-100 h-100" style="height: 100%">
          <img :src="slide.image" class="w-100 h-100 object-cover" alt="背景图" />

          <!-- 文字内容 -->
          <div
            class="position-absolute top-0 start-0 w-100 h-100 bg-black bg-opacity-50 d-flex align-items-center ps-5 pe-5"
          >
            <div class="text-white w-75 h-50">
              <h2 class="display-4 font-weight-bold mb-4">{{ slide.title }}</h2>
              <p class="lead mb-6">{{ slide.description }}</p>
              <!-- <router-link @click="navigateToLink(slide.link)" class="btn btn-primary px-5 py-3"> -->
              <!-- :to="slide.link"-->
              <!-- {{ slide.buttonText }} -->
              <!-- </router-link> -->
            </div>
          </div>
        </div>
      </SwiperSlide>

      <!-- 分页点 -->
      <div class="swiper-pagination position-absolute bottom-5 end-5"></div>
    </Swiper>
  </section>
</template>

<script setup>
import { heroSlides } from '@/data/heroImage.js' // 导入数据
import { Autoplay, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { useRouter } from 'vue-router'

// Swiper 样式（v10+）
import 'swiper/css'
import 'swiper/css/autoplay'
import 'swiper/css/pagination'

const router = useRouter()

const navigateToLink = (link) => {
  console.log('Navigating to:', link) // 打印链接
  router.push(link) // 手动路由跳转
}
</script>

<style scoped>
/* Swiper 分页点样式 */
:deep(.swiper-pagination-bullet) {
  width: 12px;
  height: 12px;
  background-color: rgba(255, 255, 255, 0.5);
  margin: 0 6px;
  transition: 0.3s ease;
}

:deep(.swiper-pagination-bullet-active) {
  background-color: white;
  transform: scale(1.3);
}

/* 保证文字不覆盖其他内容 */
.position-absolute {
  position: absolute !important;
}
</style>
