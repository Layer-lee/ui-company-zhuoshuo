<template>
  <div class="contentContainer">
    <div class="card-about shadow-sm">
      <div class="card-about-body">
        <h2 class="card-about-title"><i :class="`bi ${icon} me-2`"></i>{{ title }}</h2>
        <!-- <h2 class="card-about-title">
          <i :class="`bi ${sections[4].icon} me-2`"></i>{{ sections[4].title }}
        </h2> -->
        <!-- 管理团队成员列表 -->
        <div v-for="member in management" :key="member.id" class="management-member mb-4">
          <div class="member-container">
            <div class="member-card">
              <!-- 头像区域 -->
              <div class="member-header">
                <img :src="member.image" alt="成员头像" class="member-avatar" />
              </div>

              <!-- 信息区域 -->
              <div class="member-info">
                <h2 class="member-name">{{ member.name }}</h2>
                <p class="member-title">{{ member.title }}</p>

                <!-- 职责分工 -->
                <div class="member-responsibility">
                  <h3 class="responsibility-title">职责分工</h3>
                  <p class="responsibility-content">{{ member.description }}</p>
                </div>
              </div>
            </div>
          </div>

          <hr v-if="member.id !== management[management.length - 1].id" class="my-4" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { management, sections } from '@/data/companyBasicInfo.js'
import { ref } from 'vue'

export default {
  name: 'MemberComponent',
  props: {
    icon: {
      type: String,
      default: 'bi-building',
    },
    title: {
      type: String,
      default: '领导介绍',
    },
  },
  setup() {
    return {
      sections: ref(sections),
      management: ref(management),
    }
  },
}
</script>

<style scoped>
/* 管理团队成员样式 */
.member-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.member-card {
  display: flex;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.member-header {
  width: 200px;
  background-color: #1a4b8e; /* 深蓝色背景 */
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.member-avatar {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 3px solid white;
  object-fit: cover;
}

.member-info {
  flex: 1;
  padding: 30px;
  color: #333;
}

.member-name {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 8px;
  color: #1a4b8e;
}

.member-position {
  font-size: 18px;
  color: #666;
  margin-bottom: 25px;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
}

.responsibility-title {
  font-size: 18px;
  color: #1a4b8e;
  margin-bottom: 12px;
}

.responsibility-content {
  font-size: 16px;
  line-height: 1.6;
  color: #444;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .member-card {
    flex-direction: column;
  }

  .member-header {
    width: 100%;
    padding: 20px 0;
  }

  .member-info {
    padding: 20px;
  }

  .member-avatar {
    width: 120px;
    height: 120px;
  }
}
</style>
