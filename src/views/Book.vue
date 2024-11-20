<template>
  <div class="section">
    <div class="banner">
      <p class="banner-subtitle">BookList</p>
      <p class="banner-title">书单</p>
    </div>
    <div class="main">
      <div class="booklist">
        <transition-group name="booklist-colum" class="booklist-colum" tag="ul">
          <li class="booklist-item" v-for="item in bookList1" :key="item.id">
            <div class="book-pic">
              <img :src="item.src" alt="" draggable="false" />
            </div>
            <div>
              <ul class="book-stars">
                <li v-for="star in item.recommendation" :key="star">
                  <svg-icon iconClass="icon-star" />
                </li>
              </ul>
              <p class="book-name">{{ item.name }}</p>
              <p class="book-author">{{ item.author }}</p>
              <p class="book-evaluation">{{ item.evaluation }}</p>
            </div>
          </li>
        </transition-group>
        <transition-group name="booklist-colum" class="booklist-colum" tag="ul">
          <li class="booklist-item" v-for="item in bookList2" :key="item.id">
            <div class="book-pic">
              <img :src="item.src" alt="" draggable="false" />
            </div>
            <div>
              <ul class="book-stars">
                <li v-for="star in item.recommendation" :key="star">
                  <svg-icon iconClass="icon-star" />
                </li>
              </ul>
              <p class="book-name">{{ item.name }}</p>
              <p class="book-author">{{ item.author }}</p>
              <p class="book-evaluation">{{ item.evaluation }}</p>
            </div>
          </li>
        </transition-group>
        <transition-group name="booklist-colum" class="booklist-colum" tag="ul">
          <li class="booklist-item" v-for="item in bookList3" :key="item.id">
            <div class="book-pic">
              <img :src="item.src" alt="" draggable="false" />
            </div>
            <div>
              <ul class="book-stars">
                <li v-for="star in item.recommendation" :key="star">
                  <svg-icon iconClass="icon-star" />
                </li>
              </ul>
              <p class="book-name">{{ item.name }}</p>
              <p class="book-author">{{ item.author }}</p>
              <p class="book-evaluation">{{ item.evaluation }}</p>
            </div>
          </li>
        </transition-group>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';

export default {
  name: 'Book',
  setup() {
    const bookList = ref([]);
    const bookList1 = computed(() => bookList.value.filter((_, i) => (i + 1) % 3 === 1));
    const bookList2 = computed(() => bookList.value.filter((_, i) => (i + 1) % 3 === 2));
    const bookList3 = computed(() => bookList.value.filter((_, i) => (i + 1) % 3 === 0));

    const getBooks = async () => {
      try {
        const data = await fetchBooks(); // 替换为实际 API 调用
        bookList.value = data.items;
      } catch (error) {
        console.error('获取书籍列表失败', error);
      }
    };

    onMounted(() => {
      setTimeout(() => {
        getBooks();
      }, 900);
    });

    const fetchBooks = () => {
      // 模拟 API 请求
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            items: [
              { id: 1, src: 'path/to/image1', name: '书名1', author: '作者1', evaluation: '评价1', recommendation: 5 },
              { id: 2, src: 'path/to/image2', name: '书名2', author: '作者2', evaluation: '评价2', recommendation: 4 },
              // 更多书籍
            ],
          });
        }, 500);
      });
    };

    return {
      bookList1,
      bookList2,
      bookList3,
    };
  },
};
</script>

<style scoped lang="scss">
.banner {
  background: url("../assets/img/banner-book.jpg") center center/cover no-repeat;
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
.booklist {
  display: flex;
  justify-content: space-between;
  margin: 0 30px;
  &-colum {
    width: calc(33% - 30px);
    display: flex;
    flex-direction: column;
    align-content: flex-start;
    &:nth-child(3n + 2) {
      padding: 23px;
      border-left: 1px dashed #c9c9c9;
      border-right: 1px dashed #c9c9c9;
    }
    &-enter-active {
      animation: listFadeIn ease 0.5s;
    }
    &-leave-active {
      position: absolute;
      animation: listFadeIn ease 0.5s alternate-reverse;
    }
    &-move {
      transition: all ease 0.5s;
    }
  }

  &-item {
    width: 100%;
    text-align: justify;
    margin-bottom: 40px;
    padding-bottom: 30px;
    transition: all ease 0.5s;
    &:hover {
      transform: translateY(-10px);
    }
  }
}

.book {
  &-pic {
    margin-bottom: 20px;
    text-align: center;
    img {
      width: 80%;
      height: auto;
    }
  }
  &-name {
    font-weight: bold;
    font-size: 15px;
    margin-bottom: 5px;
  }
  &-author {
    font-size: 12px;
    color: #999;
    margin-bottom: 8px;
  }
  &-evaluation {
    font-size: 13px;
  }
  &-stars {
    display: flex;
    transition: all ease 0.5s;
    margin-bottom: 4px;
    li {
      font-size: 13px;
      display: inline-block;
      color: brown;
    }
  }
}
</style>
