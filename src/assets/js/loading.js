import Vue from 'vue'
import LoadingComponent from '@/components/Loading.vue'

const Loading = {}
let showLoading = false // 存储loading显示状态
let loadingNode = null // 存储loading节点元素
const LoadingConstructor = Vue.extend(LoadingComponent)

Loading.install = function (Vue) {
  Vue.prototype.$loading = function (type) {
    if (type === 'hide') {
      if (!loadingNode) { return }
      loadingNode.isShow = showLoading = false
    } else {
      if (showLoading) {
        // 如果loading还在，则不再执行
        return
      }
      if (!loadingNode) {
        loadingNode = new LoadingConstructor({
          data: {
            isShow: showLoading
          }
        })
        loadingNode.$mount() // 挂在实例，为了获取下面的loadingNode.$el
        document.body.appendChild(loadingNode.$el)
      }
      loadingNode.isShow = showLoading = true
    }
  };

  ['show', 'hide'].forEach(function (type) {
    Vue.prototype.$loading[type] = function () {
      return Vue.prototype.$loading(type)
    }
  })
  Vue.prototype.$loading.hideBefore = function (fn) {
    Vue.prototype.$loading('hide')
    setTimeout(() => {
      fn()
    }, 200)
  }
}

export default Loading
