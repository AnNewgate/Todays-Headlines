<template>
    <div>
          <div class="wendaBox upload-box">
            <input type="text" placeholder="请输入问题标题(5-40字)" class="wenda-title-input wenda-input" maxlength="40" v-model="title">
            <textarea placeholder="添加问题背景描述(选填，0-40字)" class="wenda-content-input wenda-input" maxlength="40" v-model="content"></textarea>
            <p class="words-number">{{textNum}}/40字</p>
            <div class="bui-box upload-footer">
              <div class="bui-left">
              <span class="show-uploader" @click="popupShow=!popupShow">
                <!-- <i class="bui-icon icon-pic_tool" style="font-size: 15px; color: rgb(237, 64, 64);"></i> -->
                <img src="../../../assets/image-icon.png" class="image-icon">
                <span>添加图片</span>
              </span>
            </div>
            <div class="bui-right">
              <span class="msg-tip">{{ tip }}</span>
              <a v-bind:class="{ 'upload-publish': true, active: ifCanPublish }" @click="handleUpload">发布</a>
            </div>
            </div>
            <div class="uploader-popup" v-show="popupShow">
              <div class="wendaUploadBox">
                  <p class="uploader-title">本地上传</p>
                  <p class="uploader-meta">共3张，还能上传{{ 3 - fileList.length }}张</p>
                  <i class="bui-icon close-popup icon-close_small" @click="handdlePopupShow"></i>
                  <div class="bui-box upload-box clearfix">
                    <my-upload v-bind:fileList="fileList" @delete="handleDelete"></my-upload>
                    <div v-if="fileList.length < 3">
                          <div ga_event="user_ugc_video_upload" class="bui-left upload-cover upload-cover-add" @click.stop="handleClick"></div>
                          <input type="file" accept="image/jpeg,image/x-png" @change="handleFileList" class="hiddenInput"/>
                    </div>
                </div>
              </div>
          </div>
          </div>
        </div>
</template>

<script>
import Vue from 'vue'
import Upload from '../UploadImg'
import xss from 'xss'
import axios from 'axios'
Vue.component('my-upload', Upload)
export default {
  name: 'EditWenti',
  data () {
    return {
      popupShow: false,
      tip: '',
      title: '',
      content: '',
      fileList: []
    }
  },
  computed: {
    // 计算属性的 getter
    ifCanPublish: function () {
      // `this` 指向 vm 实例
      return this.title.length > 4
    },
    textNum: function () {
      return this.content.length
    },
    ifNull: function () {
      return this.title.length === 0 && this.content.length === 0 && JSON.stringify(this.fileList) === '[]'
    }
  },
  methods: {
    handleClick () {
      this.$el.querySelector('.hiddenInput').click()
    },
    handdlePopupShow () {
      var msg = '确定要放弃上传图片？'
      if (JSON.stringify(this.fileList) !== '[]') {
        if (confirm(msg) === true) {
          this.fileList = []
          this.popupShow = false
        } else {
          this.popupShow = true
        }
      } else {
        this.popupShow = false
      }
    },
    handleFileList (e) {
      var that = this
      let $target = e.target || e.srcElement
      let file = $target.files[0]
      let newFile = {}
      var imgSize = file.size / 1024
      if (imgSize > 1000) {
        alert('请上传大小不要超过1M的图片')
      } else {
        var reader = new FileReader()
        reader.readAsDataURL(file)
        newFile.uid = file.lastModified + parseInt(Math.random() * 100)
        newFile.name = file.name
        reader.onload = (data) => {
          let res = data.target || data.srcElement
          newFile.url = res.result
          that.fileList = [...that.fileList, newFile]
        }
      }
    },
    handleDelete (fileList) {
      this.fileList = fileList
    },
    handleUpload () {
      var self = this
      if (!self.ifCanPublish) {
        if (self.title === '') {
          self.tip = '请输入问题！'
        } else if (self.title.length < 5) {
          self.tip = '标题应该输入5-40个汉字'
        }
        setTimeout(function () {
          self.tip = ''
        }, 2000)
      } else {
        var title = xss(self.title)
        var content = xss(self.content)
        var imgList = { imgs: self.fileList }
        axios.post('http://localhost:8888/action/formUpload', {
          title: title,
          content: content,
          imgList: imgList
        }).then(function (response) {
          // console.log(response)
          if (response.data.status === 200) {
            self.title = ''
            self.content = ''
            self.fileList = []
            alert('发布成功！')
          } else {
            alert(response.data.msg)
          }
        }).catch(function (error) {
          console.log(error)
          alert('发生了某些错误：' + error)
        })
      }
    }
  }
}
</script>
