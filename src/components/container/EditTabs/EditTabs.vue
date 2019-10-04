<template>
  <div id="edit-tabs">
    <a-tabs defaultActiveKey="1" :activeKey='showTab.toString()' :animated="{inkBar:true, tabPane:false}" @change="callback">
      <a-tab-pane tab="发图文" key="1">
        <edit-tuwen v-if="showTab == 1" ref="edit1"></edit-tuwen>
      </a-tab-pane>
      <a-tab-pane tab="写文章" key="2" forceRender>
        <edit-editor v-if="showTab == 2" ref="edit2"></edit-editor>
      </a-tab-pane>
      <a-tab-pane tab="提问题" key="3">
        <edit-wenti v-if="showTab == 3" ref="edit3"></edit-wenti>
      </a-tab-pane>
      <a-tab-pane tab="发视频" key="4">
        <edit-video v-if="showTab == 4" ref="edit4"></edit-video>
      </a-tab-pane>
      <a v-show="extraShow" slot="tabBarExtraContent" style="margin-right: 19px">想要发更专业的文章</a>
    </a-tabs>
  </div>
</template>

<script>
import Vue from 'vue'
import { Tabs, Upload, Icon } from 'ant-design-vue'
import ElementUI from 'element-ui'
import EditTuwen from './EditTuwen'
import EditEditor from './EditEditor'
import EditWenti from './EditWenti'
import EditVideo from './EditVideo'
Vue.component('a-tabs', Tabs)
Vue.component('a-tab-pane', Tabs.Group)
Vue.component('a-upload', Upload)
Vue.component('a-icon', Icon)
Vue.component('edit-tuwen', EditTuwen)
Vue.component('edit-editor', EditEditor)
Vue.component('edit-wenti', EditWenti)
Vue.component('edit-video', EditVideo)
Vue.use(ElementUI)
Vue.use(Tabs)
export default {
  name: 'EditTabs',
  data () {
    return {
      extraShow: false,
      showTab: 1
    }
  },
  methods: {
    callback (key) {
      // console.log(key)
      // console.log(this.showTab)
      var ifNull = this.$refs['edit' + this.showTab].ifNull
      var msg = ['确定要放弃图文发布？', '是否放弃长文发布？', '是否放弃提问发布？', '是否放弃视频发布？']
      // console.log(ifNull)
      if (!ifNull) {
        if (confirm(msg[this.showTab - 1]) === true) {
          this.showTab = key
          this.extraShow = parseInt(key) === 2
        }
      } else {
        this.showTab = key
        this.extraShow = parseInt(key) === 2
      }
    }
  }
}
</script>

<style scoped>
#edit-tabs {
  width: 660px;
  height: 190px;
  text-align: left;
  border: 1px solid #e8e8e8;
}
</style>
