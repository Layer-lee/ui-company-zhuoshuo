<template>
  <section id="partners" class="py-5 bg-light">
    <div class="container text-center">
      <h2 class="section-title mb-3">合作伙伴</h2>
      <p class="section-summary mb-4">我们与众多知名企业建立了长期稳定的合作关系</p>

      <!-- 普通网格布局（少于等于6个合作伙伴时） -->
      <div v-if="partners.length <= 6" class="row row-cols-2 row-cols-md-4 row-cols-lg-6 g-4">
        <div
          v-for="(partner, index) in partners"
          :key="index"
          class="col d-flex flex-column align-items-center"
        >
          <div class="mb-3 d-flex justify-content-center align-items-center" style="height: 100px">
            <a :href="partner.website" target="_blank">
              <img
                :src="partner.imgPath"
                class="img-fluid"
                style="max-height: 100%; max-width: 100%; object-fit: contain"
                :alt="partner.name + ' Logo'"
                @error="handleImageError"
              />
            </a>
          </div>
        </div>
      </div>

      <!-- 走马灯布局（超过6个合作伙伴时） -->
      <div v-else class="partners-carousel">
        <div id="partnersCarousel" class="carousel slide" data-bs-ride="carousel">
          <!-- 指示器 -->
          <div class="carousel-indicators">
            <button
              v-for="(_, index) in Math.ceil(partners.length / itemsPerSlide)"
              :key="index"
              type="button"
              data-bs-target="#partnersCarousel"
              :data-bs-slide-to="index"
              :class="{ active: index === 0 }"
              aria-current="true"
              :aria-label="'Slide ' + (index + 1)"
            ></button>
          </div>

          <!-- 轮播内容 -->
          <div class="carousel-inner">
            <div
              v-for="(slide, slideIndex) in paddedChunkedPartners"
              :key="slideIndex"
              class="carousel-item"
              :class="{ active: slideIndex === 0 }"
            >
              <div class="row row-cols-2 row-cols-md-4 row-cols-lg-6 g-4">
                <div
                  v-for="(partner, partnerIndex) in slide"
                  :key="partnerIndex"
                  class="col d-flex flex-column align-items-center"
                >
                  <div
                    v-if="partner"
                    class="mb-3 d-flex justify-content-center align-items-center"
                    style="height: 100px"
                  >
                    <a :href="partner.website" target="_blank">
                      <img
                        :src="partner.imgPath"
                        class="img-fluid"
                        style="max-height: 100%; max-width: 100%; object-fit: contain"
                        :alt="partner.name + ' Logo'"
                        @error="handleImageError"
                      />
                    </a>
                  </div>
                  <div v-else style="height: 100px"></div>
                </div>
              </div>
            </div>
          </div>

          <!-- 导航按钮 -->
          <button
            class="carousel-control-prev"
            type="button"
            data-bs-target="#partnersCarousel"
            data-bs-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button
            class="carousel-control-next"
            type="button"
            data-bs-target="#partnersCarousel"
            data-bs-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { partners } from '@/data/partners'
import { Carousel } from 'bootstrap'

export default {
  name: 'PartnersComponent',
  data() {
    return {
      itemsPerSlide: 6, // 每页显示6个合作伙伴
      partners: partners, // 从外部文件导入的数据
      carouselInstance: null,
    }
  },
  computed: {
    // 原始分块数据
    chunkedPartners() {
      const chunks = []
      for (let i = 0; i < this.partners.length; i += this.itemsPerSlide) {
        chunks.push(this.partners.slice(i, i + this.itemsPerSlide))
      }
      return chunks
    },
    // 填充空白的分块数据（确保每页都有6个元素）
    paddedChunkedPartners() {
      return this.chunkedPartners.map((chunk) => {
        // 如果当前页不足6个，用null填充
        const padded = [...chunk]
        while (padded.length < this.itemsPerSlide) {
          padded.push(null)
        }
        return padded
      })
    },
  },
  mounted() {
    // 初始化轮播
    if (this.partners.length > 6) {
      const carouselElement = document.getElementById('partnersCarousel')
      this.carouselInstance = new Carousel(carouselElement, {
        interval: 4000, // 3秒自动切换
        ride: 'carousel',
        wrap: true,
      })
    }
  },
  methods: {
    handleImageError(event) {
      event.target.src = '/img/placeholder.png'
      event.target.alt = '图片加载失败'
    },
  },
}
</script>

<style scoped>
#partners {
  background-color: #f8f9fa;
}

.partners-carousel {
  padding: 0 50px;
}

.carousel-indicators {
  position: relative;
  margin: 20px 0 0;
}

.carousel-indicators button {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.3);
  margin: 0 5px;
}

.carousel-indicators button.active {
  background-color: #0d6efd;
}

.carousel-control-prev,
.carousel-control-next {
  width: 40px;
  height: 40px;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 50%;
  top: 50%;
  transform: translateY(-50%);
}

.carousel-control-prev {
  left: -20px;
}

.carousel-control-next {
  right: -20px;
}

.carousel-control-prev-icon,
.carousel-control-next-icon {
  width: 20px;
  height: 20px;
}
/*
.card {
  transition: transform 0.3s ease;
  min-height: 150px;
}

.card:hover {
  transform: translateY(-5px);
} */
</style>
