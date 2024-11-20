<template>
  <transition name="dialog">
    <div class="dialog" v-if="isShow">
      <div class="dialog-title">信息填写</div>
      <form action>
        <div class="form-item">
          <label class="form-key" for="name">起个响当当的名字吧！</label>
          <p class="form-value">
            <input type="text" id="name" autocomplete="off" v-model="name" />
          </p>
        </div>
        <div class="form-item">
          <label class="form-key" for="email">整个静鸡鸡的邮箱吧！</label>
          <p class="form-value">
            <input type="text" id="email" autocomplete="off" v-model="email" />
          </p>
        </div>
        <div class="form-tip">TIP:此订阅仅会向您推送博文，博主用生命担保不会把你的信息卖个其他网站来牟取利益，请您放心</div>
        <div>
          <button
              class="form-btn form-submit"
              type="button"
              @click="onSubmit(true)"
              v-if="openType === 'subscribe'"
          >订 &nbsp; 阅</button>
          <button
              class="form-btn form-submit"
              type="button"
              @click="onSubmit(false)"
              v-else
          >确 &nbsp; 定</button>
          <button class="form-btn form-close" type="button" @click="handleClose">关 &nbsp; 闭</button>
        </div>
      </form>
    </div>
  </transition>
</template>

<script>
import { defineProps, ref, watch, onMounted } from 'vue';

export default {
  name: 'OrderDialog',
  setup(props, { emit }) {
    // 定义 props
    const { openType, isShow } = defineProps({
      openType: {
        type: String,
        default: 'subscribe'
      },
      isShow: {
        type: Boolean,
        default: false
      }
    });

    // 定义响应式数据
    const name = ref('');
    const email = ref('');

    // 监听 isShow 的变化
    watch(isShow, (nv) => {
      if (nv) {
        setTimeout(() => {
          document.getElementById('name').focus()
        }, 600);
      }
    });

    // 提交表单
    const onSubmit = async (isSubscribed) => {
      const { name: userName, email: userEmail } = { name: name.value, email: email.value };

      if (userName.trim() === '' || userName.length > 30 || ['李雷', '李大雷'].includes(userName)) {
        this.$toast.warning('用户名为空或者长度大于30字符');
        return;
      } else if (!/^([-_A-Za-z0-9.]+)@([_A-Za-z0-9]+\.)+[A-Za-z0-9]{2,3}$/.test(userEmail)) {
        this.$toast.warning('邮箱格式不对');
        return;
      }

      await insertGuest(userName, userEmail, isSubscribed);
    };

    // 插入新用户
    const insertGuest = async (name, email, isSubscribed) => {
      try {
        const data = await this.$api.insertGuest({
          data: { name, email, isSubscribed }
        });
        if (data) {
          if (isSubscribed) {
            localStorage.info = localStorage.info === undefined
                ? `#${data.id}_sub;#${data.id}_user;`
                : localStorage.info + `#${data.id}_sub;#${data.id}_user;`;
          } else {
            localStorage.info = localStorage.info === undefined
                ? `#${data.id}_user;`
                : localStorage.info + `#${data.id}_user;`;
          }
        } else {
          this.$toast.error('订阅失败');
        }

        if (openType === 'subscribe') {
          this.$toast.success('订阅成功！');
        } else {
          this.$toast.success('注册成功！');
        }
        handleClose();
      } catch (err) {
        this.$toast.error(err.msg ? err.msg : err);
        handleClose();
      }
    };

    // 关闭 dialog
    const handleClose = () => {
      emit('update:isShow', false);
    };

    return {
      name,
      email,
      onSubmit,
      insertGuest,
      handleClose,
      openType,
      isShow
    };
  }
};
</script>


<style scoped lang="scss">
.dialog {
  position: fixed;
  padding: 20px 30px;
  left: calc(50% - 230px);
  top: 20%;
  width: 400px;
  background-color: rgba($color: #000000, $alpha: 0.85);
  box-shadow: 0 0 10px 0 #252525;
  z-index: 50;
  color: #fff;
  &-title {
    font-size: 18px;
    margin-bottom: 40px;
  }
  input {
    font-size: 13px;
    width: 100%;
    border: 0;
    color: #fff;
    border-bottom: 1px solid #666;
    background-color: transparent;
  }

  &-enter,
  &-enter-active {
    animation: zoomDialog linear 0.5s;
  }
  &-leave,
  &-leave-active {
    animation: zoomDialog linear 0.5s alternate-reverse;
  }
}
.form {
  &-item {
    color: #999;
    transition: color ease 0.5s;
    &:focus-within {
      color: #fff;
    }
    margin-bottom: 20px;
  }
  &-key {
    display: inline-block;
    margin-bottom: 10px;
  }
  &-value {
    position: relative;
    overflow: hidden;
    &:focus-within::after {
      transform: translateX(0);
    }
    &::after {
      content: "";
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 1px;
      transform: translateX(-100%) scaleY(0.5);
      background-color: #fff;
      transition: all ease 0.8s;
    }
  }
  &-tip {
    font-size: 12px;
    color: #999;
  }
  &-btn {
    width: 70px;
    height: 34px;
    margin-top: 30px;
    cursor: pointer;
    transition: all ease 0.5s;
  }
  &-close {
    border: 1px solid #666;
    color: #999;
    background-color: transparent;
    &:hover {
      color: #c9c9c9;
      border: 1px solid #999;
    }
  }
  &-submit {
    position: relative;
    z-index: 1;
    margin-right: 15px;
    color: rgb(33, 157, 240);
    border: 1px solid rgb(33, 157, 240);
    background-color: transparent;
    overflow: hidden;
    &:hover {
      color: #fff;
      &::after {
        opacity: 1;
        transform: rotate(22.5deg) scale(1, 30);
      }
    }
    &::after {
      content: "";
      display: block;
      position: absolute;
      opacity: 0;
      width: 160%;
      height: 3px;
      left: -25%;
      top: 50%;
      transform: rotate(22.5deg);
      background-color: rgb(33, 157, 240);
      transition: all ease 0.5s;
      z-index: -1;
    }
  }
  @keyframes zoomDialog {
    0% {
      opacity: 0;
      transform: scale(0);
    }
    75% {
      opacity: 0.9;
      transform: scale(1.1);
    }
    90% {
      opacity: 1;
      transform: scale(0.95);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }
}
</style>
