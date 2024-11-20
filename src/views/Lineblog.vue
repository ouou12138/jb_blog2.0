<template>
  <div class="section">
    <div class="banner">
      <p class="banner-subtitle">LineBlog</p>
      <p class="banner-title">行博</p>
    </div>
    <div class="main">
      <transition-group name="lineblog" class="lineblog" tag="ul">
        <li class="lineblog-item" v-for="item in lineblogList" :key="item.id">
          <div class="item-time">
            <div class="item-circle">
              <p class="item-month">{{ item.createTime | getMonth }}月</p>
              <p class="item-date">{{ item.createTime | getDate }}</p>
            </div>
            <p class="item-year">{{ item.createTime | getYear }}</p>
          </div>
          <div class="item-content">
            <p class="item-text">{{ item.contents }}</p>
            <div class="item-oper">
              <p class="item-oper--like" @click="likeLineblog(item.id)">
                {{ alreadyLikeList.includes(item.id) ? "已赞" : "点赞" }}
                <span>({{ item.likeNum }})</span>
                <span class="item-oper--icon">
                  <svg-icon iconClass="icon-heart" />
                </span>
              </p>
              <p class="item-oper--read">
                阅读
                <span>({{ item.readNum }})</span>
              </p>
            </div>
          </div>
        </li>
      </transition-group>
      <pagination
          class="lineblog-pagination"
          :total="total"
          :page-size="pageSize"
          :page-index="pageIndex"
          @change="handlePageChange"
      />
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import Pagination from '@/components/Pagination';

export default {
  name: 'LineBlog',
  components: { Pagination },
  setup() {
    const lineblogList = ref([]);
    const alreadyLikeList = ref([]);
    const pageIndex = ref(1);
    const pageSize = ref(8);
    const total = ref(0);

    const getYear = (val) => val.substr(0, 4) || '----';
    const getMonth = (val) => (val.substr(5, 2) - 0) || '-';
    const getDate = (val) => val.substr(8, 2) || '--';

    const initAlreadyLike = () => {
      const reg = /#(\d+)_lblike;/g;
      if (localStorage.info) {
        localStorage.info.replace(reg, (mt, $1) => {
          alreadyLikeList.value.push($1 - 0);
          return mt;
        });
      }
    };

    const likeLineblog = async (id) => {
      if (alreadyLikeList.value.includes(id)) {
        return;
      }
      try {
        await this.$api.likeLineblog({ id });
        alreadyLikeList.value.push(id);
        getLineblogs();
        localStorage.info =
            localStorage.info === undefined
                ? `#${id}_lblike;`
                : localStorage.info + `#${id}_lblike;`;
      } catch (error) {}
    };

    const getLineblogs = async () => {
      try {
        const res = await this.$api.getLineblogs({
          pageIndex: pageIndex.value,
          pageSize: pageSize.value,
          status: true,
        });
        lineblogList.value = res.data.tableData;
        total.value = res.data.total;
      } catch (error) {}
    };

    const handlePageChange = (pageIndex) => {
      pageIndex.value = pageIndex;
      getLineblogs();
    };

    onMounted(() => {
      setTimeout(() => {
        getLineblogs();
      }, 900);
      initAlreadyLike();
    });

    return {
      lineblogList,
      alreadyLikeList,
      pageIndex,
      pageSize,
      total,
      getYear,
      getMonth,
      getDate,
      likeLineblog,
      handlePageChange,
    };
  },
};
</script>

<style scoped lang="scss">
.banner {
  background: url("../assets/img/banner-lineblog.jpg") center center/cover
  no-repeat;
}
.section {
  max-width: 980px;
}
.lineblog {
  margin: 0 30px;
  &-enter-active {
    animation: listFadeIn ease-in 0.5s;
  }
  &-leave-active {
    position: absolute;
    animation: listFadeIn ease-in 0.4s alternate-reverse;
  }
  &-move {
    animation: listFadeIn ease-in 0.5s;
  }
  &-item {
    display: flex;
    margin-bottom: 50px;
  }
  &-pagination {
    margin: 0 30px;
  }
  .item {
    &-time {
      text-align: center;
      margin-right: 30px;
      user-select: none;
    }
    &-circle {
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 75px;
      height: 75px;
      border-radius: 100%;
      border: 2px solid #999;
    }
    &-month {
      color: #999;
    }
    &-date {
      font-size: 22px;
      font-weight: bold;
      color: #737373;
    }
    &-year {
      font-size: 18px;
      color: #c9c9c9;
      margin-top: 5px;
    }
    &-content {
      flex: 1;
      font-size: 15px;
      color: #737373;
      line-height: 24px;
      padding-top: 5px;
      transition: all ease 0.5s;
      padding-bottom: 20px;
      border-bottom: 1px dashed #c9c9c9;
    }
    &-oper {
      display: flex;
      margin-top: 25px;
      font-size: 13px;
      &--like {
        position: relative;
        margin-right: 30px;
        color: #c9c9c9;
        cursor: pointer;
        transition: all ease-in 0.3s;
        &:hover {
          color: #666;
          .item-oper--icon {
            opacity: 1;
            transform: translate(10px, -15px) scale(1.3) rotate(30deg);
          }
        }
      }
      &--icon {
        position: absolute;
        color: red;
        right: 0;
        top: 0;
        transition: all ease-in 0.3s;
        opacity: 0;
      }
      &--read {
        color: #c9c9c9;
      }
    }
  }
}
</style>
