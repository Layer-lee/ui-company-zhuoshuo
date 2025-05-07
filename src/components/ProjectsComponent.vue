<template>
  <section id="projects" class="py-5 bg-light">
    <div class="container text-center">
      <h2 class="section-title">工程案例</h2>
      <p class="section-summary">
        多年来，我们成功完成了众多大型工程项目，以下是我们的部分代表性工程
      </p>

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

      <router-link to="/projects" class="btn btn-primary mt-4">查看更多项目</router-link>
    </div>
  </section>
</template>

<script setup>
import { projects } from '@/data/projects'
import { computed, ref } from 'vue'

const activeCategory = ref('全部项目')
const projectCategories = ['全部项目', '港口工程', '航道工程', '市政工程', '水利工程']

const sortedProjects = computed(() => {
  return [...projects].sort((a, b) => b.id - a.id)
})

const displayedProjects = computed(() => {
  let filtered = sortedProjects.value
  if (activeCategory.value !== '全部项目') {
    filtered = filtered.filter((project) => project.category === activeCategory.value)
  }
  return filtered.slice(0, 6)
})

const setActiveCategory = (category) => {
  activeCategory.value = category
}
</script>

<style scoped></style>
