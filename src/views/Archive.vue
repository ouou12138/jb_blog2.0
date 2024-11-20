<template>
  <div class="archive section">
    <div class="banner">
      <p class="banner-subtitle">Article</p>
      <p class="banner-title">博文</p>
    </div>
    <div class="main">
      <div class="main-left">
        <div class="searchbar-wrap">
          <div class="searchbar">
            <input
                type="text"
                placeholder="请输入文章名进行查找..."
                v-model="title"
                @keyup.enter="handleSearch"
            />
            <svg-icon class="icon" iconClass="icon-search" @click="handleSearch" />
          </div>
        </div>
        <div class="article">
          <transition-group name="article-list" tag="ul">
            <li
                class="article-item"
                v-for="item in articleList"
                :key="item.id"
                @click="jumpToArticle(item.id)"
            >
              <p class="article-title">{{ item.title }}</p>
              <div class="article-time">
                <p>
                  <svg-icon iconClass="icon-clock" />
                  {{ format(item.createdAt) }}
                </p>
                <p>
                  <svg-icon iconClass="icon-update" />
                  {{ format(item.updatedAt) }}
                </p>
              </div>
              <div class="article-footer">
                <ul class="article-tag" v-if="item.tags">
                  <li
                      class="article-tag-item"
                      v-for="tag in item.tags"
                      :key="tag.id"
                  >
                    {{ tag.name || '' }}
                  </li>
                </ul>
                <p class="article-hot">
                  <span>点赞({{ item.likeCount || 0 }})</span>
                  <span>阅读({{ item.readCount || 0 }})</span>
                </p>
              </div>
            </li>
          </transition-group>
        </div>
        <pagination
            class="article-pagination"
            :pageIndex="pageIndex"
            :pageSize="pageSize"
            :total="total"
            @change="handlePageChange"
        />
      </div>
      <div class="main-right">
        <div class="card date">
          <p class="card-title">日期</p>
          <month-picker @change="handleMonthChange" />
        </div>
        <div class="card tags">
          <p class="card-title">分类</p>
          <tag-picker @change="handleTagChange" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import dayjs from 'dayjs'
import MonthPicker from '@/components/MonthPicker'
import TagPicker from '@/components/TagPicker'
import Pagination from '@/components/Pagination'

export default {
  name: 'Archive',
  components: { MonthPicker, TagPicker, Pagination },
  setup() {
    // 数据定义
    const title = ref('')
    const startTime = ref('')
    const endTime = ref('')
    const tag = ref('')
    const pageIndex = ref(1)
    const pageSize = ref(8)
    const total = ref(0)
    const articleList = ref([])

    // 方法定义
    const format = (timestamp) => {
      return dayjs(timestamp * 1000).format('YYYY-MM-DD')
    }

    const jumpToArticle = (id) => {
      window.$router.push({ name: 'Article', params: { id } })
    }

    const handlePageChange = (newPageIndex) => {
      pageIndex.value = newPageIndex
      getArticles()
    }

    const handleSearch = () => {
      getArticles()
    }

    const handleMonthChange = (timeObj) => {
      if (!timeObj) {
        startTime.value = ''
        endTime.value = ''
      } else {
        startTime.value = timeObj.startTime
        endTime.value = timeObj.endTime
      }
      getArticles()
    }

    const handleTagChange = (selectedTag) => {
      tag.value = selectedTag || ''
      getArticles()
    }

    const getArticles = async () => {
      try {
        const data = await window.$api.getArticles({
          params: {
            keyword: title.value,
            startTime: startTime.value,
            endTime: endTime.value,
            tag: tag.value,
            pageIndex: pageIndex.value,
            pageSize: pageSize.value,
          },
        })
        hanldeAnimate(data.items)
        total.value = data.total
      } catch (error) {
        console.error(error)
      }
    }

    const hanldeAnimate = (newData) => {
      if (newData.length > articleList.value.length) {
        articleList.value = newData
        return
      }
      if (newData.length < articleList.value.length) {
        const delArr = []
        for (let i = articleList.value.length - 1; i >= 0; i--) {
          let flag = false
          for (const newItem of newData) {
            if (newItem.id === articleList.value[i].id) {
              flag = true
              break
            }
          }
          if (!flag) {
            delArr.push(i)
          }
        }
        const timer = setInterval(() => {
          if (delArr.length === 0) {
            clearInterval(timer)
          } else {
            articleList.value.splice(delArr.shift(), 1)
          }
        }, 100)
        return
      }
      if (newData.length === 0) {
        const timer = setInterval(() => {
          if (articleList.value.length === 0) {
            clearInterval(timer)
          } else {
            articleList.value.shift()
          }
        }, 100)
      }
    }

    // 生命周期
    onMounted(() => {
      setTimeout(() => {
        getArticles()
      }, 800)
    })

    return {
      title,
      startTime,
      endTime,
      tag,
      pageIndex,
      pageSize,
      total,
      articleList,
      format,
      jumpToArticle,
      handlePageChange,
      handleSearch,
      handleMonthChange,
      handleTagChange,
      getArticles,
      hanldeAnimate,
    }
  },
}
</script>


<style scoped lang="scss">
.banner {
  background: url("../assets/img/banner-archive.jpg") center center/cover
  no-repeat;
}
.main {
  display: flex;
  &-left {
    width: 66%;
    border-right: 1px dashed #c9c9c9;
  }
  &-right {
    flex: 1;
  }
}
.searchbar {
  font-size: 16px;
  border: 1px solid #fff;
  display: flex;
  border-radius: 30px;
  overflow: hidden;
  border: 1px solid #c9c9c9;
  transition: all ease 0.3s;
  margin: 0 30px;
  input {
    flex: 1;
    background-color: transparent;
    padding: 10px 15px;
  }
  .icon {
    color: #c9c9c9;
    padding: 10px 15px;
    cursor: pointer;
    transition: all ease 0.3s;
    &:hover {
      transform: scale(1.2);
    }
  }
  &:hover,
  &:focus-within {
    border: 1px solid #666;
    .icon {
      color: #666;
    }
  }
}
.article {
  font-size: 14px;
  &-list {
    &-enter-active {
      animation: listFadeIn ease 0.6s;
    }
    &-leave-active {
      position: absolute;
      animation: listFadeIn ease 0.4s alternate-reverse;
    }
    &-move {
      transition: all ease 0.5s;
    }
  }

  &-item {
    color: #333;
    position: relative;
    padding: 20px;
    margin: 30px 20px;
    transition: all ease 0.3s;
    cursor: pointer;
    border: 1px solid transparent;
    &::after {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      border: 1px solid transparent;
      border-radius: 2px;
    }
    &:hover {
      transform: scale(1.02);
      &::after {
        animation: shadowZoom ease 0.5s forwards;
      }
    }
    @keyframes shadowZoom {
      0% {
        transform: scale(1.05, 1.5);
        border: 1px solid transparent;
      }
      100% {
        transform: scale(1);
        border: 1px solid #d5d5d5;
      }
    }
  }
  &-title {
    font-size: 22px;
    font-weight: bold;
  }
  &-time {
    margin-top: 10px;
    display: flex;
    font-size: 13px;
    p {
      margin-right: 15px;
      color: #999;
    }
  }
  &-footer {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    align-items: center;
    margin-top: 15px;
  }
  &-pagination {
    margin: 0 30px;
  }
  &-tag {
    display: flex;
    &-item {
      background-color: #999;
      border-radius: 2px;
      color: #fff;
      margin-right: 15px;
      padding: 2px 3px 4px;
    }
  }
  &-hot {
    color: #999;
    span {
      margin-right: 15px;
    }
  }
}
.card {
  padding: 0 30px;
  margin-bottom: 30px;
  &-title {
    font-size: 18px;
    margin-bottom: 10px;
  }
}
</style>
