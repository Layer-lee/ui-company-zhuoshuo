<template>
  <section id="contact" class="py-5">
    <div class="container text-center">
      <h2 class="section-title">联系我们</h2>
      <p class="section-summary">如果您有任何问题或项目需求，请随时与我们联系</p>

      <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        <!-- 左侧联系信息 -->
        <div class="col-lg-6 mb-auto">
          <div class="card shadow-sm p-4">
            <h3 class="h4">联系信息</h3>
            <div class="contact-info">
              <div v-for="item of contactInfo" :key="item.title" class="mb-2">
                <i :class="item.icon + ' me-2'"></i>
                <strong>{{ item.title }}</strong>
                <span class="d-block text-align-end indent-2em">
                  {{ item.text }}
                </span>
              </div>
            </div>
            <!-- wechat qq icon-->
            <div class="d-flex gap-3 mt-4">
              <i
                v-for="(social, index) in socialMedia"
                :key="index"
                :class="social.icon + ' text-primary fs-4'"
                style="cursor: pointer"
                @click="showSocialModal(social.title, social.content)"
                :title="social.title"
              ></i>
            </div>
          </div>
        </div>
        <!-- 右侧联系我们的表单 -->
        <div class="col-lg-6">
          <div class="card shadow-sm p-4 h-100">
            <h3 class="h4 mb-4">发送消息</h3>
            <form @submit.prevent="submitMessage">
              <div class="row form-row">
                <div class="col-md-6 form-group">
                  <label for="name">姓名</label>
                  <input
                    type="text"
                    class="form-control"
                    id="name"
                    v-model="form.name"
                    placeholder="请输入您的姓名"
                    required
                  />
                </div>
                <div class="col-md-6 form-group">
                  <label for="email">邮箱</label>
                  <input
                    type="email"
                    class="form-control"
                    id="email"
                    v-model="form.email"
                    placeholder="请输入您的邮箱"
                    required
                  />
                </div>
              </div>
              <div class="form-group">
                <label for="subject">主题</label>
                <input
                  type="text"
                  class="form-control"
                  id="subject"
                  v-model="form.subject"
                  placeholder="请输入消息主题"
                  required
                />
              </div>
              <div class="form-group">
                <label for="message">消息内容</label>
                <textarea
                  class="form-control"
                  id="message"
                  v-model="form.message"
                  placeholder="请输入您的消息内容"
                  rows="5"
                  required
                ></textarea>
              </div>
              <button type="submit" class="btn btn-primary w-100 mt-3">发送消息</button>
            </form>
          </div>
        </div>
      </div>
    </div>

    <SocialModal
      v-model="showModal"
      :title="modalTitle"
      :content="modalContent"
      header-bg-color="#cce5ff"
    />
  </section>
</template>

<script setup>
import SocialModal from '@/components/common/SocialModal.vue'
import { contactInfo, socialMedia } from '@/data/companyBasicInfo'
import { emailService } from '@/services/emailService'
import { ref } from 'vue'

const form = ref({
  name: '',
  email: '',
  subject: '',
  message: '',
})

const showModal = ref(false)
const modalTitle = ref('')
const modalContent = ref('')

const submitMessage = async () => {
  try {
    await emailService.sendEmail(form.value)
    alert('邮件已成功发送！')
    form.value = { name: '', email: '', subject: '', message: '' }
  } catch (error) {
    console.error(error)
    alert('邮件发送失败，请稍后再试！')
  }
}

const showSocialModal = (title, content) => {
  modalTitle.value = title
  modalContent.value = content
  showModal.value = true
}
</script>

<style scoped>
.form-group {
  margin-bottom: 1rem;
  text-align: left;
}

.contact-info {
  list-style: none;
  padding: 0;
  margin: 0;
  text-align: left;
}
.h4 {
  text-align: left;
  font-size: 1.25rem;
  font-weight: 600;
}
.indent-2em {
  text-indent: 2em; /* 1em ≈ 当前字体大小的1倍 */
}
</style>
