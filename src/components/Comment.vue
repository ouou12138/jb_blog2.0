<template>
  <div>
    <p class="comment-title" id="HI">
      <b>Hi~</b>
    </p>
    <div class="comment-action">
      <div class="comment-action__left">
        <transition name="comment-reply-bar">
          <div class="comment-reply-bar" v-show="isReplying">
            回复 @{{ replyObj ? replyObj.guest.name : "null" }}
            <button>
              <svg-icon iconClass="icon-close" @click="cancelReply" />
            </button>
          </div>
        </transition>
        <textarea placeholder="写下你的评论..." type="text" ref="commentInput" v-model="comment"></textarea>
      </div>
      <button class="comment-submit" @click="onSubmit">提 交</button>
    </div>
    <ul v-if="commentList.length > 0">
      <li class="comment-item" v-for="(item, index) in commentList" :key="item.id">
        <span class="comment-item-idx">
          {{ total - index - (pageIndex - 1) * pageSize }}楼
        </span>
        <span class="comment-item-avator">
          {{ item.guest.name ? item.guest.name.substr(0, 1).toUpperCase() : "-" }}
        </span>
        <div class="comment-item-content">
          <div class="comment-item-info">
            <p class="comment-item-name">
              <span>{{ item.guest.name || "-" }}</span>
            </p>
            <span class="comment-item-time">{{ format(item.createdAt) || "-" }}</span>
          </div>
          <div class="comment-item-detail" v-if="item.recommend">
            <p class="comment-item-replyto">
              @{{ item.recommend.guestName }}:
              <span>{{ item.recommend.comment }}</span>
            </p>
            <span class="comment-item-replytext">{{ item.comment }}</span>
          </div>
          <p class="comment-item-detail" v-show="!item.recommend">
            {{ item.comment }}
          </p>
          <p class="comment-item-control">
            <button @click="handleReply(item)">
              <svg-icon iconClass="icon-reply" />
              <span>回复</span>
            </button>
          </p>
        </div>
      </li>
    </ul>
    <OrderDialog openType="reg" :isShow.sync="showDialog" />
    <pagination :pageIndex="pageIndex" :pageSize="pageSize" :total="total" @change="handlePageChange" />
  </div>
</template>

<script>
import { ref, reactive, onMounted } from "vue";
import OrderDialog from "@/components/OrderDialog.vue";
import Pagination from "./Pagination.vue";
import dayjs from "dayjs";

export default {
  name: "Comment",
  components: {
    Pagination,
    OrderDialog,
  },
  setup(props, { emit }) {
    const commentList = ref([]);
    const comment = ref("");
    const pageIndex = ref(1);
    const pageSize = ref(5);
    const total = ref(1);
    const replyObj = ref(null);
    const isReplying = ref(false);
    const showDialog = ref(false);
    const lastCommentTimeStamp = ref(
      localStorage.lastCommentTimeStamp === undefined
        ? 0
        : Number(localStorage.lastCommentTimeStamp)
    );

    // 格式化时间
    const format = (timestamp) => {
      return dayjs(timestamp * 1000).format("YYYY-MM-DD");
    };

    // 分页处理
    const handlePageChange = (newPageIndex) => {
      pageIndex.value = newPageIndex;
      getComments();
    };

    // 提交评论
    const onSubmit = async () => {
      const reg = /#(\d+)_user;/;
      if (!localStorage.info || !reg.test(localStorage.info)) {
        showDialog.value = true;
      } else if (localStorage.info && reg.test(localStorage.info)) {
        const regText = localStorage.info.match(reg);
        if (!regText[1]) return;

        const recommend = isReplying.value && replyObj.value ? replyObj.value.id : null;
        await insertComment(regText[1] - 0, comment.value, recommend);
      }
    };

    // 获取评论
    const getComments = async () => {
      try {
        const data = await this.$api.getComments({
          params: {
            article: props.articleId,
            pageIndex: pageIndex.value,
            pageSize: pageSize.value,
          },
        });
        commentList.value = data.items;
        total.value = data.total;
        emit("update:count", data.total);
      } catch (error) {
        console.error("Failed to fetch comments:", error);
      }
    };

    // 回复处理
    const handleReply = (obj) => {
      isReplying.value = true;
      replyObj.value = obj;
    };

    const cancelReply = () => {
      isReplying.value = false;
      replyObj.value = null;
    };

    // 插入新评论
    const insertComment = async (guest, commentContent, recommend) => {
      if (commentContent.trim() === "" || commentContent.length > 255) {
        this.$toast.warning("回复内容不能为空或长于255字符");
        return;
      }
      if (Date.now() - lastCommentTimeStamp.value < 12000 * 1000) {
        this.$toast.warning("你的评论太快啦，请稍后重试");
        return;
      }
      try {
        await this.$api.insertComment({
          data: {
            guest,
            comment: commentContent,
            article: Number(props.articleId),
            recommend,
          },
        });
        resetState();
        this.$toast.success("评论成功！");
        await getComments();
      } catch (err) {
        this.$toast.error(err.msg ? err.msg : err);
      }
    };

    const resetState = () => {
      comment.value = "";
      isReplying.value = false;
      replyObj.value = null;
      lastCommentTimeStamp.value = Date.now();
      localStorage.setItem("lastCommentTimeStamp", Date.now());
    };

    onMounted(() => {
      getComments();
    });

    return {
      commentList,
      comment,
      pageIndex,
      pageSize,
      total,
      replyObj,
      isReplying,
      showDialog,
      format,
      handlePageChange,
      onSubmit,
      handleReply,
      cancelReply,
      insertComment,
    };
  },
};
</script>

<style scoped lang="scss">
.comment {
  font-size: 14px;

  &-title {
    text-align: center;
    margin: 20px 0;

    b {
      font-size: 28px;
      color: brown;
    }
  }

  &-action {
    display: flex;
    align-items: flex-end;

    &__left {
      position: relative;
      width: 100%;
      display: flex;
      margin-right: 10px;
      flex-direction: column;
      align-items: flex-start;
      margin-top: 20px;

      textarea {
        width: 100%;
        height: 36px;
        resize: none;
        padding: 8px 18px;
        border: none;
        border-radius: 40px;
        box-sizing: border-box;
        transition: all 0.3s cubic-bezier(0.19, 0.4, 0.17, 0.85);
        overflow: hidden;
        background-color: #f2f2f2;
        color: #666;
      }

      textarea:focus {
        letter-spacing: 1px;
        height: 60px;
        border-radius: 10px;
      }
    }
  }

  &-reply-bar {
    position: absolute;
    left: 0;
    top: -23px;
    display: inline-block;
    color: #fff;
    margin-left: 1em;
    background-color: rgb(133, 42, 42);
    font-size: 14px;
    border-radius: 4px 4px 0 0;
    padding: 4px 8px 0;
    z-index: 11;

    &-enter-active,
    &-leave-active {
      transition: all ease 0.5s;
    }

    &-enter,
    &-leave-to {
      opacity: 0;
      transform: translateX(-10px);
    }

    button {
      color: red;
      padding: 2px 3px;
      line-height: 1;
      background-color: transparent;
      cursor: pointer;
      transition: all ease 0.3s;

      &:hover {
        transform: rotate(180deg);
      }
    }
  }

  &-submit {
    color: #fff;
    font-size: 15px;
    width: 60px;
    height: 36px;
    background-color: brown;
    border-radius: 60px;
    cursor: pointer;
    transition: all ease 0.3s;

    &:hover {
      background-color: rgb(143, 36, 36);
    }

    &:active {
      background-color: rgb(126, 33, 33);
    }
  }

  &-ul {
    margin-top: 60px;
  }

  &-item {
    position: relative;
    padding: 10px;
    margin: 10px 0;
    overflow: hidden;
    display: flex;
    border-bottom: 1px dashed #c9c9c9;

    &-idx {
      position: absolute;
      right: 10px;
      top: 10px;
      color: #999;
      font-style: italic;
      font-size: 14px;
    }

    &-avator {
      width: 40px;
      height: 40px;
      font-size: 24px;
      text-align: center;
      line-height: 40px;
      margin-right: 15px;
      border-radius: 100%;
      transition: all ease 0.5s;
      border: 1px solid #e5e5e5;
      color: #b13713;
    }

    &-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      color: #999;
      font-size: 14px;
    }

    &-info {
      display: flex;
      flex-direction: column;
    }

    &-name {
      display: flex;
      align-items: center;
      font-size: 15px;
      color: #333;
    }

    &-tag {
      user-select: none;
      display: inline-block;
      font-size: 18px;
      color: rgba(17, 201, 88, 0.979);
      border-radius: 3px;
      margin-left: 5px;
    }

    &-time {
      font-size: 12px;
    }

    &-detail {
      font-size: 14px;
      color: #000;
      margin-top: 10px;
    }

    &-control {
      margin: 15px 0;
      font-size: 14px;

      button {
        padding: 0;
        display: inline-flex;
        align-items: center;

        .svg-icon {
          margin-right: 5px;
          transition: all ease 0.5s;
        }

        background-color: transparent;

        span {
          transition: all ease 0.5s;
        }

        color: #999;
        cursor: pointer;

        &:hover {
          color: #333;
        }
      }
    }

    &-replyto {
      background-color: #e5e5e5;
      color: #17aaee;
      padding: 10px;
      font-size: 13px;

      span {
        color: #666;
      }
    }

    &-replytext {
      display: inline-block;
      margin-top: 1em;
    }
  }
}
</style>
