<template>
  <section id="about" class="py-5">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-md-6 mb-4 mb-md-0">
          <img :src="aboutImage" alt="公司简介" class="img-fluid rounded shadow" />
        </div>

        <div class="col-md-6">
          <h2 class="section-title">关于江苏焯烁建设工程</h2>

          <!-- 显示summary内容 -->
          <div v-if="companyInfo.summary">
            <template v-if="Array.isArray(companyInfo.summary)">
              <p
                v-for="(para, idx) in companyInfo.summary"
                :key="'summary-' + idx"
                class="section-text mb-2"
              >
                {{ para }}
              </p>
            </template>
            <p v-else class="section-text">{{ companyInfo.summary }}</p>
          </div>

          <!-- 显示description内容 -->
          <div v-if="companyInfo.description">
            <template v-if="Array.isArray(companyInfo.description)">
              <p
                v-for="(para, idx) in companyInfo.description"
                :key="'desc-' + idx"
                class="section-text mb-2"
              >
                {{ para }}
              </p>
            </template>
            <p v-else class="section-text">{{ companyInfo.description }}</p>
          </div>

          <div class="row mt-4">
            <div class="col-6 mb-2" v-for="(service, index) in services" :key="index">
              <i class="bi bi-check-circle-fill text-primary me-2"></i>
              {{ service }}
            </div>
          </div>
          <router-link
            to="/about-detail"
            class="text-blue-600 hover:text-blue-800 font-medium flex items-center cursor-pointer"
          >
            了解更多
            <i class="fas fa-arrow-right ml-2"></i>
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import aboutImage from '@/assets/images/aboutus.jpg'
import { companyInfo } from '@/data/companyBasicInfo'
import { ref } from 'vue'

const services = ref(['建设工程施工', '土石方工程施工', '河道疏浚施工', '建筑劳务分包'])
</script>
<style scoped></style>
