<template>
  <footer class="text-white py-4" style="background-color: #2f4056">
    <div class="container">
      <div class="row">
        <!-- Company Info -->
        <div class="col-md-4 mb-4">
          <h3 class="h5 mb-3">{{ companyInfo.name }}</h3>
          <p class="mb-3 fw-bold">{{ companyInfo.slogan }}</p>
          <p class="small">{{ companyInfo.description }}</p>
        </div>

        <!-- Quick Links -->
        <div class="col-md-2 mb-4">
          <h3 class="h5 mb-3">快速链接</h3>
          <ul class="list-unstyled small">
            <li v-for="(link, index) in quickLinks" :key="index" class="mb-2">
              <a :href="link.url" class="text-white text-decoration-none">{{ link.text }}</a>
            </li>
          </ul>
        </div>

        <!-- Contact Info -->
        <div class="col-md-3 mb-4">
          <h3 class="h5 mb-3">联系方式</h3>
          <ul class="list-unstyled small">
            <li v-for="(contact, index) in contactInfo" :key="index" class="mb-2">
              <i :class="contact.icon + ' me-2'"></i>
              {{ contact.text }}
            </li>
          </ul>
        </div>

        <!-- Social Media -->
        <div class="col-md-3 mb-4">
          <h3 class="h5 mb-3">关注我们</h3>
          <div class="d-flex mb-3">
            <a
              v-for="(social, index) in socialMedia"
              :key="index"
              class="me-3 text-white"
              style="cursor: pointer"
              @click="showSocialModal(social.title, social.content)"
            >
              <i :class="social.icon + ' fa-lg'" :title="social.title"></i>
            </a>
          </div>
        </div>
      </div>
      <!-- Copyright -->
      <div class="border-top border-light pt-3">
        <div class="row">
          <div class="col-md-6 text-center text-md-start small">
            {{ copyright.text }}
          </div>
          <div class="col-md-6 text-center text-md-end small">
            <span>{{ copyright.license }}</span>
            <span class="mx-2">|</span>
            <span>{{ copyright.icp }}</span>
          </div>
        </div>
      </div>

      <SocialModal
        v-model="showModal"
        :title="modalTitle"
        :content="modalContent"
        header-bg-color="#cce5ff"
      />
    </div>
  </footer>
</template>

<script setup>
import SocialModal from '@/components/common/SocialModal.vue'
import {
  companyInfo,
  contactInfo,
  copyright,
  quickLinks,
  socialMedia,
} from '@/data/companyBasicInfo'
import { ref } from 'vue'

const showModal = ref(false)
const modalTitle = ref('')
const modalContent = ref('')

const showSocialModal = (title, content) => {
  modalTitle.value = title
  modalContent.value = content
  showModal.value = true
}
</script>

<style scoped>
.border-light {
  border-color: rgba(255, 255, 255, 0.1) !important;
}

a:hover {
  opacity: 0.8;
}
</style>
