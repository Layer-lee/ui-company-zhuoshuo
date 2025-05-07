<template>
  <section id="services" class="py-5 bg-light">
    <div class="container text-center">
      <h2 class="section-title">核心业务</h2>
      <p class="section-summary">
        我们提供全方位的建设工程施工服务，从设计规划到施工管理，为客户打造高品质的工程项目
      </p>

      <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        <div v-for="(service, index) in services" :key="index" class="col">
          <div class="card shadow-sm">
            <div class="card-body text-center">
              <div class="icon-container mb-4">
                <i :class="service.icon"></i>
              </div>
              <h5 class="card-title">{{ service.title }}</h5>
              <p class="card-text">{{ service.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { services } from '@/data/services'
</script>

<style scoped>
.icon-container {
  width: 60px;
  height: 60px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #007bff;
  color: white;
  border-radius: 50%;
}

.icon-container i {
  font-size: 1.5rem;
}
</style>
