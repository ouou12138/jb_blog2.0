<template>
  <div class="player" v-if="songList.length > 0">
    <div class="player-notes">
      <svg-icon
          :iconClass="`icon-music${item}`"
          v-for="item in 4"
          :key="item"
          :style="{ color: randomColor() }"
          v-show="isPlaying.value"
      />
    </div>
    <div class="player-record">
      <img
          src="../assets/img/record.png"
          alt="播放器"
          @click="togglePlay"
          :class="isPlaying.value ? 'player-record--act' : ''"
          :title="songList[currentPlayIdx.value].name"
      />
      <audio
          loop="loop"
          ref="player"
          class="player-audio"
          :src="songList[currentPlayIdx.value].src"
      ></audio>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';

export default {
  name: 'MusicPlayer',
  setup() {
    const songList = ref([]);
    const currentPlayIdx = ref(0);
    const isPlaying = ref(false);

    // 获取音乐列表
    const getMusics = async () => {
      try {
        const data = await this.$api.getMusics({
          params: {
            pageIndex: 1,
            pageSize: 99
          }
        });
        songList.value = data.items;
      } catch (error) {
        this.$toast.error('获取音乐列表失败');
      }
    };

    // 播放/暂停
    const togglePlay = () => {
      const player = document.querySelector('audio');
      if (isPlaying.value) {
        player.pause();
        isPlaying.value = false;
      } else {
        player.play();
        isPlaying.value = true;
      }
    };

    // 上一曲
    const prev = () => {
      currentPlayIdx.value = currentPlayIdx.value - 1 < 0 ? songList.value.length - 1 : currentPlayIdx.value - 1;
      const player = document.querySelector('audio');
      player.pause();
      setTimeout(() => {
        isPlaying.value = true;
        player.play();
      }, 100);
    };

    // 下一曲
    const next = () => {
      currentPlayIdx.value = (currentPlayIdx.value + 1) % songList.value.length;
      const player = document.querySelector('audio');
      player.pause();
      setTimeout(() => {
        isPlaying.value = true;
        player.play();
      });
    };

    // 随机颜色
    const randomColor = () => {
      const r = Math.floor(Math.random() * 255);
      const g = Math.floor(Math.random() * 255);
      const b = Math.floor(Math.random() * 255);
      return `rgba(${r}, ${g}, ${b}, 0.8)`;
    };

    // 获取音乐列表
    onMounted(() => {
      getMusics();
    });

    return {
      songList,
      currentPlayIdx,
      isPlaying,
      togglePlay,
      prev,
      next,
      randomColor
    };
  }
};
</script>

<style scoped lang="scss">
.player {
  position: fixed;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  z-index: 20;
  &-notes {
    position: relative;
    width: 20px;
    font-size: 16px;
    margin-left: 20px;
    // cursor: pointer;
    .svg-icon {
      &:nth-child(4n + 1) {
        animation: randomSport 2s 1.2s ease infinite;
      }
      &:nth-child(4n + 2) {
        animation: randomSport2 2s 1.7s ease infinite;
      }
      &:nth-child(4n + 3) {
        animation: randomSport3 2s 0.8s ease infinite;
      }
      &:nth-child(4n + 4) {
        animation: randomSport4 2s 0.3s ease infinite;
      }
    }
  }
  &-record {
    position: absolute;
    left: 0;
    top: 50%;
    img {
      width: 120px;
      height: auto;
    }
    transform: translate(-75%, -50%);
    transition: all ease 0.5s;
    cursor: pointer;
    &:hover {
      transform: translate(-50%, -50%);
    }
  }
  &-record--act {
    animation: playing 10s linear infinite;
  }
  &-audio {
    width: 0;
    height: 0;
    opacity: 0;
    visibility: hidden;
  }
}
@keyframes playing {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
@keyframes randomSport {
  0% {
    transform: translate(-10px, -3px);
  }
  100% {
    opacity: 0;
    transform: translate(8px, -15px) rotate(-50deg);
  }
}
@keyframes randomSport2 {
  100% {
    opacity: 0;
    transform: translate(20px, -8px) rotate(20deg);
  }
}
@keyframes randomSport3 {
  100% {
    opacity: 0;
    transform: translate(15px, 3px) rotate(20deg);
  }
}
@keyframes randomSport4 {
  0% {
    transform: translate(-12px, -0);
  }
  100% {
    opacity: 0;
    transform: translate(7px, 16px) rotate(-60deg);
  }
}
</style>
