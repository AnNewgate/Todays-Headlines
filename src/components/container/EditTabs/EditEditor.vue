<template>
    <div class="editor-out">
              <div class="editor">
                  <div class="editor-wrapper">
                      <div class="editor-title">
                          <input placeholder="请输入文章标题（5-30个汉字）" maxlength="30" autocomplete="off" type="text" class="title-input" v-model="title">
                      </div>
                      <div class="syl-wrapper" id="editor-content">
                          <!-- <vue-editor v-model="content" placeholder="请输入正文" :editorToolbar="customToolbar" @text-change="onEditorChange"></vue-editor> -->
                      </div>
                  </div>
              </div>
              <div class="editor-footer">
                  <div class="bui-left">
                    <div class="rest-words">字数<span>{{restwords}}</span></div>
                  </div>
                  <div class="bui-right">
                    <span class="msg-tip">{{ tip }}</span>
                    <a v-bind:class="{ 'upload-publish': true, active: ifCanPublish }" @click="handleUpload">发布</a>
                 </div>
              </div>
          </div>
</template>

<script>
import Vue from 'vue'
import { VueEditor, Quill } from 'vue2-editor'
import xss from 'xss'
import axios from 'axios'
Vue.component('vue-editor', VueEditor)
export default {
  name: 'EditEditor',
  data () {
    return {
      tip: '',
      quill: null,
      title: '',
      restwords: 0,
      customToolbar: [['bold', 'underline'], [{ 'header': [1, 2, 3, 4, 5, 6, false] }], ['blockquote'], [{ list: 'ordered' }, { list: 'bullet' }], ['image']]
    }
  },
  computed: {
    // 计算属性的 getter
    ifCanPublish: function () {
      // `this` 指向 vm 实例
      return this.restwords !== 0 && this.title.length !== 0
    },
    ifNull: function () {
      return this.restwords === 0 && this.title.length === 0
    }
  },
  methods: {
    handleUpload () {
      var self = this
      if (!self.ifCanPublish) {
        if (self.title === '') {
          self.tip = '请输入标题！'
        } else if (self.title.length < 5) {
          self.tip = '标题应该输入5-30个汉字'
        } else if (self.restwords === 0) {
          self.tip = '请输入内容！'
        }
        setTimeout(function () {
          self.tip = ''
        }, 2000)
      } else {
        var title = xss(self.title)
        var content = xss(self.quill.getText(0))
        axios.post('http://localhost:8888/action/formUpload', {
          title: title,
          content: content
        }).then(function (response) {
          // console.log(response)
          if (response.data.status === 200) {
            self.title = ''
            self.quill.setContents([{ insert: '\n' }])
            self.restwords = 0
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
  },
  mounted: function () {
    var options = {
      modules: {
        toolbar: this.customToolbar
      },
      placeholder: '请输入正文',
      theme: 'snow'
    }
    var self = this
    var quill = new Quill('#editor-content', options)
    self.quill = quill
    quill.on('text-change', function (delta, oldDelta, source) {
      if (source === 'user') {
        self.restwords = self.quill.getLength() - 1
      }
    })
  }
}
</script>
