<template>
  <div class="contentContainer">
    <div class="card-about shadow-sm">
      <div class="card-about-body">
        <h2 class="card-about-title"><i :class="`bi ${icon} me-2`"></i>{{ title }}</h2>

        <div class="org-list">
          <!-- 左列机构 -->
          <div class="org-column">
            <ul class="org-items">
              <li v-for="org in leftColumn" :key="org.id" class="org-item">
                <a :href="org.link" target="_blank" class="org-link">{{ org.name }}</a>
              </li>
            </ul>
          </div>

          <!-- 右列机构 -->
          <div class="org-column">
            <ul class="org-items">
              <li v-for="org in rightColumn" :key="org.id" class="org-item">
                <a :href="org.link" target="_blank" class="org-link">{{ org.name }}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { organizations } from '@/data/companyBasicInfo.js'
export default {
  name: 'OrganizationComponent',
  props: {
    icon: {
      type: String,
      default: 'bi-building',
    },
    title: {
      type: String,
      default: '组织架构',
    },
  },
  data() {
    return {
      organizations: organizations,
    }
  },
  computed: {
    leftColumn() {
      return this.organizations.slice(0, Math.ceil(this.organizations.length / 2))
    },
    rightColumn() {
      return this.organizations.slice(Math.ceil(this.organizations.length / 2))
    },
  },
}
</script>

<style scoped>
.org-container {
  padding: 20px;
}

.org-list {
  display: flex;
  gap: 40px;
  margin-top: 20px;
}

.org-column {
  flex: 1;
}

/* 修改此处保留项目符号 */
.org-items {
  list-style: disc; /* 显示圆点符号 */
  padding-left: 50px; /* 调整缩进 */
  margin: 0;
}

.org-item {
  padding: 8px 0;
  border-bottom: 1px solid #eee;
}

.org-link {
  color: #333;
  text-decoration: none;
  font-size: 16px;
  transition: all 0.3s;
  display: block;
  padding: 6px 0;
  margin-left: -5px; /* 微调对齐 */
}

.org-link:hover {
  color: #1a4b8e;
  padding-left: 8px;
}

@media (max-width: 768px) {
  .org-list {
    flex-direction: column;
    gap: 10px;
  }

  .org-items {
    padding-left: 25px; /* 移动端增加缩进 */
  }
}
</style>
