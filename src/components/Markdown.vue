<template>
  <VueMarkdown :toc="true" :source="source" toc-anchor-link-class="md-anchor" class="markdown-body" />
</template>

<script>
import { defineComponent } from 'vue';
import VueMarkdown from 'vue-markdown';

export default defineComponent({
  name: 'Markdown',
  components: {
    VueMarkdown,
  },
  props: {
    source: {
      type: String,
      default: '',
    },
  },
});
</script>

<style lang="scss">
@use "@/assets/css/markdown.scss";

.md-anchor {
  color: #999;
  font-size: 16px;
  text-decoration: none;

  &:hover {
    text-decoration: none;
  }
}
</style>
