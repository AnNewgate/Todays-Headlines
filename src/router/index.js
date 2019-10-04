import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import EditTabs from '@/components/container/EditTabs/EditTabs'
import Upload from '@/components/container/UploadImg'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Upload',
      component: Upload
    },
    {
      path: '/EditTabs',
      name: 'EditTabs',
      component: EditTabs
    }
  ]
})
