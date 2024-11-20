<template>
  <div class="container-wrapper">
    <div class="fun-tip">没什么想说的，祝大家新年快乐吧</div>
    <div class="fun-tip fun-tip--bottom">该死！被你发现了我的底线</div>
    <div
        class="container"
        @touchstart="handleTouchStart"
        @touchend="handleTouchEnd"
        :style="{transform: `translateY(${translateY})`, transition: isMoving ? 'none' : 'all ease-in .3s'}"
    >
      <div class="page" :key="0">
        <section class="info">
          <div class="info-bg-animate" v-if="isFirstIn"></div>
          <div class="info-content" v-show="delayShow150">
            <NiWrapper type="round" style="padding: 10px">
              <div class="info-avatar" @click="handleAvatarClick">
                <transition name="quest">
                  <svg-icon
                      v-show="showQuestion"
                      class="question"
                      iconClass="icon-question"
                  />
                </transition>
                <div class="info-avatar-circle"></div>
                <img src="../assets/img/leelei.png" alt="" />
              </div>
            </NiWrapper>
            <p class="info-title">李大雷</p>
            <p class="info-subtitle">前端开发工程师</p>
            <div class="info-meta">
              <div class="info-meta--left">
                <NiCell
                    class="cell"
                    :click="false"
                    icon="birthday"
                    label="1997年03月"
                />
                <NiCell
                    class="cell"
                    icon="qq"
                    label="543784988"
                />
              </div>
              <div class="info-meta--right">
                <NiCell
                    class="cell"
                    :click="false"
                    icon="school"
                    label="广东工业大学"
                />
                <NiCell
                    class="cell"
                    icon="phone"
                    :canCopy="true"
                    label="有缘会知晓"
                />
              </div>
            </div>
          </div>
        </section>
        <svg-icon
            class="page-next"
            iconClass="icon-down"
            @click="handleNextPage()"
        />
      </div>
      <!-- Other pages go here, they will follow similar pattern -->
    </div>
  </div>
</template>

<script>
import { ref, watch, onMounted, defineComponent } from 'vue';
import SkillCard from '@/components/SkillCard';
import ProjectCard from '@/components/ProjectCard';
import CompanyCard from '@/components/CompanyCard';
import NiWrapper from '@/components/NiWrapper';
import HexagonChart from '@/components/HexagonChart';
import ResumeTab from '@/components/ResumeTab';
import NiCell from '@/components/NiCell';

export default defineComponent({
  name: 'Resume',
  components: {
    SkillCard,
    ProjectCard,
    CompanyCard,
    NiWrapper,
    HexagonChart,
    ResumeTab,
    NiCell
  },
  setup() {
    const isFirstIn = ref(true);
    const curIndex = ref(0);
    const translateY = ref('0%');
    const lastTranslateY = ref('0%');
    const isMoving = ref(false);
    const showQuestion = ref(false);
    const delayShow150 = ref(false);
    const startY = ref(0);
    const endY = ref(0);
    const page1ShowOption = ref({
      0: false,
      135: false,
      185: false,
      235: false
    });
    const page2ShowOption = ref({
      0: false,
      135: false,
      185: false,
      235: false
    });
    const page3ShowOption = ref({
      0: false,
      135: false,
      185: false,
      235: false
    });
    const page4ShowOption = ref({
      0: false,
      135: false,
      185: false
    });

    const baseOption = ref({
      title: '基础三件套',
      icon: 'base',
      labelWidth: 40,
      list: [
        { label: 'JS ', progress: '92' },
        { label: 'Css', progress: '88' },
        { label: 'Html', progress: '85' }
      ]
    });

    const frameOption = ref({
      title: '前端框架库',
      icon: 'frame',
      labelWidth: 40,
      list: [
        { label: 'React', progress: '90' },
        { label: 'JQ', progress: '80' },
        { label: 'Vue', progress: '90' }
      ]
    });

    const toolOption = ref({
      title: '前端工具集',
      icon: 'tool',
      labelWidth: 80,
      list: [
        { label: 'Sass | Less', progress: '80' },
        { label: 'Git | Svn', progress: '85' },
        { label: 'Webpack', progress: '84' },
        { label: 'Node | Go', progress: '85' }
      ]
    });

    const projectOptions = ref({
      title: '中台编辑器',
      labelList: ['基于prosemirror', '搭建整体框架']
    });

    const projectOptions2 = ref({
      title: '一些后台系统',
      labelList: ['抽离公共组件', '编写工具脚本', '制定开发规范']
    });

    const companyOptions = ref({
      title: '网易',
      icon: '',
      size: '200px',
      time: '2021.07-至今',
      labelList: ['负责十来个项目，做了一些微小的工作', '学习中...']
    });

    const companyOptions2 = ref({
      title: '蓝月亮有限公司',
      icon: 'bluemoon',
      size: '200px',
      time: '2020.05-2021.07',
      labelList: [
        '负责 PC 智能平台业务线和移动端 H5 的需求迭代',
        '负责维护和优化部分公共组件',
        '使用 Vue，Vuex，Vue-router，Typescrip，Less 等技术'
      ]
    });

    const isMobile = () => {
      const flag = navigator.userAgent.match(
          /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
      );
      return flag;
    };

    const setTimeShow = (obj, key) => {
      if (obj[key]) return;
      setTimeout(() => {
        obj[key] = true;
      }, key * 10);
    };

    const handleAvatarClick = () => {
      if (showQuestion.value) return;
      showQuestion.value = true;
      setTimeout(() => {
        showQuestion.value = false;
      }, 1500);
    };

    const handleNextPage = (flag = 'next') => {
      if (flag === 'next' && curIndex.value !== 4) {
        curIndex.value = (curIndex.value + 1) % 5;
      }
      if (flag === 'prev' && curIndex.value !== 0) {
        curIndex.value =
            curIndex.value - 1 < 0 ? curIndex.value + 4 : curIndex.value - 1;
      }
      lastTranslateY.value = translateY.value = `${-curIndex.value * 20}%`;
    };

    const handleTouchStart = (e) => {
      endY.value = e.touches[0].clientY;
      startY.value = e.touches[0].clientY;
      document.querySelector('.container').addEventListener('touchmove', handleTouchMove);
    };

    const handleTouchMove = (e) => {
      e.preventDefault();
      endY.value = e.touches[0].clientY;
      const diff = endY.value - startY.value;
      isMoving.value = true;
      if (diff < 80 && diff > -80) {
        translateY.value = `calc(${lastTranslateY.value} ${diff < 0 ? '-' : '+'} ${diff < 0 ? -diff : diff}px)`;
      }
    };

    const handleTouchEnd = () => {
      isMoving.value = false;
      const diffY = endY.value - startY.value;
      if (diffY <= 70 && diffY >= -70) {
        translateY.value = lastTranslateY.value;
        return;
      }
      if (diffY > 70) {
        handleNextPage('prev');
      } else if (diffY < -70) {
        handleNextPage();
      }
      document.querySelector('.container').removeEventListener('touchmove', handleTouchMove);
    };

    onMounted(() => {
      if (!isMobile()) {
        this.$router.push({ path: '/' });
      }
    });

    watch(curIndex, (newVal) => {
      switch (newVal) {
        case 0:
          setTimeout(() => {
            delayShow150.value = true;
            isFirstIn.value = false;
          }, 150);
          break;
        case 1:
          setTimeShow(page1ShowOption.value, 135);
          break;
        case 2:
          setTimeShow(page2ShowOption.value, 135);
          break;
        case 3:
          setTimeShow(page3ShowOption.value, 135);
          break;
      }
    });

    return {
      isFirstIn,
      translateY,
      delayShow150,
      showQuestion,
      handleAvatarClick,
      handleNextPage,
      handleTouchStart,
      handleTouchMove,
      handleTouchEnd,
      page1ShowOption,
      page2ShowOption,
      page3ShowOption,
      page4ShowOption
    };
  }
});
</script>

<style scoped lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: all ease 2s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.quest {
  &-enter-active {
    animation: quest ease 1s forwards;
  }
  &-leave-active {
    animation: quest ease 0.5s alternate-reverse;
  }
}

@keyframes quest {
  0% {
    transform: translate(-40px, 40px) rotate(0);
  }
  100% {
    transform: translate(0) rotate(30deg);
  }
}
.question {
  position: absolute;
  right: -20px;
  top: -20px;
  pointer-events: none;
  font-size: 28px;
  transform: rotate(30deg);
  z-index: -1;
}
@keyframes flowUp {
  0% {
    transform: translateY(8px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}
.container {
  height: 500vh;
  background-color: #e6eef4;
  overflow: hidden;
  &-wrapper{
    position: relative;
    height: 100vh;
    background-color: #e6eef4;
    overflow: hidden;
    .fun-tip{
      width: 100%;
      position: absolute;
      font-size: 12px;
      white-space: nowrap;
      color: #999;
      text-align: center;
      line-height: 50px;
      z-index: -1;
      &--bottom{
        bottom: 0;
      }
    }
  }
}

.page {
  width: 100vw;
  height: 100vh;
  position: relative;
  justify-content: center;
  color: #333;
  &-next,&-slogan {
    color: #999;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
  &-next{
    font-size: 20px;
    bottom: 30px;
    animation: tip ease-in infinite 0.5s alternate-reverse;
    @keyframes tip {
      0% {
        transform: translateX(-50%) translateY(0);
      }
      100% {
        transform: translateX(-50%) translateY(8px);
      }
    }
    cursor: pointer;
  }
  &-slogan{
    font-size: 12px;
    bottom: 20px;
    white-space: nowrap;
  }

  .info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    overflow: hidden;
    &-bg-animate {
      position: absolute;
      left: 50%;
      top: 0;
      width: 5px;
      height: 5px;
      border-radius: 100%;
      background-color: #dee4e9;
      animation: bgIn ease-in 1.5s;
      @keyframes bgIn {
        0% {
          transform: translateX(-50%) scale(1);
        }
        50% {
          transform: translateX(-50%) translateY(350px) scale(1);
        }
        100% {
          transform: translateX(-50%) translateY(350px) scale(200);
          opacity: 0.7;
        }
      }
    }
    &-content {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    &-avatar {
      position: relative;
      border: 2px solid #fff;
      width: 180px;
      height: 180px;
      border-radius: 100%;
      animation: zoomIn ease-in 1s;
      &-circle {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 185px;
        height: 185px;
        border-radius: 100%;
        border: 2px solid #fff;
        transform: translate(-50%, -50%);
        animation: expand ease .75s infinite;
        @keyframes expand {
          0% {
            transform: translate(-50%, -50%) scale(1);
          }
          100% {
            transform: translate(-50%, -50%) scale(1.1);
            opacity: 0;
          }
        }
      }
      img {
        width: 180px;
        border-radius: 100%;
        height: 180px;
        object-fit: cover;
      }
      @keyframes zoomIn {
        0% {
          transform: scale(0);
          opacity: 0;
        }
        85% {
          transform: scale(1.2);
        }
        95% {
          transform: scale(0.95);
        }
        100% {
          transform: scale(1);
          opacity: 1;
        }
      }
    }
    &-title {
      font-size: 28px;
      margin: 15px 0 7px;
      white-space: nowrap;
      overflow: hidden;
      font-weight: 500;
      opacity: 0;
      text-shadow: 1px 1px 2px #999;
      animation: typing1 0.75s steps(3, start) forwards,
      blink-caret 0.3s step-end 2;
      animation-delay: 1.5s;
      @keyframes typing1 {
        from {
          width: 0;
          opacity: 1;
        }
        to {
          width: 3em;
          opacity: 1;
        }
      }
    }
    &-subtitle {
      font-size: 22px;
      white-space: nowrap;
      text-shadow: 1px 1px 2px #999;
      overflow: hidden;
      animation: typing2 1.75s steps(7, end) forwards,
      blink-caret 0.3s step-end 6;
      animation-delay: 2.25s;
      opacity: 0;
      @keyframes typing2 {
        from {
          width: 0;
          opacity: 1;
        }
        to {
          width: 7em;
          opacity: 1;
        }
      }
    }
    @keyframes blink-caret {
      from,
      to {
        box-shadow: 1px 0 0 0 transparent;
      }
      50% {
        box-shadow: 1px 0 0 0;
      }
    }
    &-meta {
      display: flex;
      justify-content: space-between;
      font-size: 15px;
      margin-top: 20px;
      animation: flowUp ease 0.5s 4.5s forwards;
      opacity: 0;
      &--left {
        margin-right: 30px;
      }
      .cell {
        margin: 18px 0;
      }
    }
  }
  .sec {
    padding: 15px;
    box-sizing: border-box;
    &-title {
      font-size: 22px;
      font-weight: 600;
      text-shadow: 1px 1px 2px #999;
      animation: flyFromLeft ease-in .75s;
    }
    @keyframes flyFromLeft {
      0% {
        transform: translateX(-200px);
      }
      100% {
        transform: translateX(0);
        opacity: 1;
      }
    }
    &-subtitle {
      font-size: 13px;
      opacity: 0;
      text-shadow: 1px 1px 2px #999;
      animation: flyFromLeft ease-in .5s 0.75s forwards;
    }
    &-row {
      margin: 20px 0 20px;
      display: flex;
      justify-content: space-between;
      animation: flowUp ease 1s;
      > div {
        width: 100%;
      }
      &--half {
        > div {
          width: calc(50% - 10px);
        }
      }
    }
  }
  .fun {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 36px;
    height: 120px;
    padding: 10px;
    color: #fff;
    &-bg {
      left: 10px;
      top: 10px;
      width: calc(100% - 20px);
      height: 120px;
      position: absolute;
      animation: bgMove ease 12s infinite alternate-reverse;
      background: url("../assets/img/ad-bg.jpg") no-repeat;
      background-size: cover;
      background-position: 0;
      filter: blur(2px);
    }
    &-text {
      flex: 1;
      position: relative;
      height: 100%;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 2px 2px 4px 0 #bbb;
      overflow: hidden;
      z-index: 2;
    }
    @keyframes bgMove {
      0% {
        background-position: top;
      }
      100% {
        background-position: bottom;
      }
    }
  }
}
</style>
