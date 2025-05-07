<template>
  <section id="news" class="py-5 bg-light">
    <div class="container">
      <!-- 标题和描述 -->
      <div class="text-center mb-4">
        <h2 class="display-4 font-weight-bold mb-4">新闻中心</h2>
        <p class="text-muted mx-auto" style="max-width: 600px">
          了解我们的最新动态、行业资讯和公司新闻
        </p>
      </div>

      <!-- 新闻卡片展示 -->
      <div class="row row-cols-1 row-cols-md-3 g-4">
        <div v-for="(news, index) in newsItems" :key="index" class="col">
          <div class="card h-100 shadow-sm border-0 rounded">
            <img
              :src="news.image"
              :alt="news.title"
              class="card-img-top"
              style="height: 200px; object-fit: cover"
            />
            <div class="card-body">
              <div class="d-flex justify-content-between mb-3">
                <div class="text-muted" style="font-size: 0.9rem">
                  <i class="far fa-calendar-alt"></i> {{ news.date }}
                </div>
              </div>
              <h5 class="card-title font-weight-bold">{{ news.title }}</h5>
              <p class="card-text text-muted" style="font-size: 0.875rem">
                {{ news.summary }}
              </p>
              <router-link
                :to="'/news-detail/' + index"
                class="btn btn-outline-primary btn-sm mt-2"
              >
                阅读更多 →
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'News',
  data() {
    return {
      newsItems: [
        {
          title: '公司成功中标安徽省重点水利工程项目',
          summary:
            '近日，我公司成功中标安徽省某重点水利工程项目，这是公司在水利工程领域的又一重要突破，标志着公司综合实力的进一步提升。',
          date: '2025-04-01',
          image: new URL('@/assets/images/news-zhongbiao.jpg', import.meta.url).href,
        },
        {
          title: '公司举办2025年安全生产培训大会',
          summary:
            '为进一步提高员工安全意识，预防和减少生产安全事故，公司于上周举办了2025年安全生产培训大会，全体施工人员参加了此次培训。',
          date: '2025-03-15',
          image: new URL('@/assets/images/news-peixun.jpg', import.meta.url).href,
        },
        {
          title: '公司与江苏大学建筑工程学院建立校企合作',
          summary:
            '为促进产学研结合，培养专业人才，我公司近日与江苏大学建筑工程学院签订了校企合作协议，双方将在人才培养、技术研发等方面展开深入合作。',
          date: '2025-02-28',
          image: new URL('@/assets/images/news-shebei.jpg', import.meta.url).href,
        },
      ],
    }
  },
}
</script>

<style scoped>
/* 自定义样式 */
.card {
  transition: transform 0.3s ease-in-out;
}

.card:hover {
  transform: translateY(-5px);
}

.card-body {
  padding: 1.5rem;
}

.card-title {
  font-size: 1.25rem;
}

.card-text {
  font-size: 0.9rem;
}

.btn-outline-primary {
  border-color: #007bff;
  color: #007bff;
}

.btn-outline-primary:hover {
  background-color: #007bff;
  color: white;
}
</style>
