<template>
    <div>
          <div class="videoBox upload-box">
            <textarea placeholder="视频标题(30字以内)" class="title-input" maxlength="30" v-model="title"></textarea>
            <p class="words-number">{{textNum}}/30字</p>
            <div class="bui-box upload-footer">
              <div class="bui-left">
                <span ga_event="user_ugc_video_open" class="show-video-uploader show-uploader" @click="popupShow=!popupShow">
                  <i class="bui-icon icon-video_tool" style="font-size: 20px; color: rgb(42, 144, 215);"></i>
                  <span>添加视频</span>
                </span>
              </div>
            <div class="bui-right">
              <span class="msg-tip">{{ tip }}</span>
              <a v-bind:class="{ 'upload-publish': true, active: ifCanPublish }" @click="handleUpload">发布</a>
            </div>
            </div>
            <div class="uploader-popup" v-show="popupShow">
              <div class="videoUploadBox">
                  <p class="uploader-title">本地上传</p>
                  <p class="uploader-meta">发布后，视频将出现在首页和个人页</p>
                  <i class="bui-icon close-popup icon-close_small" @click="handdlePopupShow"></i>
                  <div class="bui-box upload-box">
                    <!-- <div ga_event="user_ugc_video_upload" class="bui-left upload-cover upload-cover-add"></div> -->
                    <el-upload class="avatar-uploader"
                           action="http://localhost:8888/action/postVideo"
                           v-bind:on-progress="uploadVideoProcess"
                           v-bind:on-success="handleVideoSuccess"
                           v-bind:before-upload="beforeUploadVideo"
                           v-bind:show-file-list="false">
                    <video v-if="videoForm.showVideoPath !='' && !videoFlag"
                           v-bind:src="videoForm.showVideoPath"
                           class="avatar video-avatar"
                           controls="controls">
                        您的浏览器不支持视频播放
                    </video>
                    <i v-else-if="videoForm.showVideoPath =='' && !videoFlag"
                       class="bui-left upload-cover upload-cover-add"></i>
                    <el-progress v-if="videoFlag == true"
                                 type="circle"
                                 v-bind:percentage="videoUploadPercent"
                                 style="margin-top:7px;">
                    </el-progress>
                    </el-upload>
                    <div class="bui-right upload-warning">
                      <span>支持绝大多数的视频格式，大小不超过100M，请勿上传反动色情等违法视频。</span>
                    </div>
                  </div>
              </div>
          </div>
          </div>
        </div>
</template>

<script>
import xss from 'xss'
import axios from 'axios'
export default {
  name: 'EditWenti',
  data () {
    return {
      popupShow: false,
      tip: '',
      title: '',
      video: null,
      videoFlag: false,
      // 是否显示进度条
      videoUploadPercent: '',
      // 进度条的进度，
      isShowUploadVideo: false,
      // 显示上传按钮
      videoForm: {
        showVideoPath: ''
      }
    }
  },
  computed: {
    // 计算属性的 getter
    ifCanPublish: function () {
      // `this` 指向 vm 实例
      // return this.video !== null
      return this.videoForm.showVideoPath !== '' && this.title.length !== 0
    },
    textNum: function () {
      return this.title.length
    },
    ifNull: function () {
      return this.videoForm.showVideoPath === '' && this.title.length === 0
    }
  },
  methods: {
    handleUpload () {
      var self = this
      if (!self.ifCanPublish) {
        if (self.title === '') {
          self.tip = '请输入内容！'
        } else if (self.videoForm.showVideoPath === '') {
          self.tip = '请上传视频！'
        }
        setTimeout(function () {
          self.tip = ''
        }, 2000)
      } else {
        var title = xss(self.title)
        axios.post('http://localhost:8888/action/formUpload', {
          videoTitle: title,
          videoPath: self.videoForm.showVideoPath
        }).then(function (response) {
          // console.log(response)
          if (response.data.status === 200) {
            self.title = ''
            self.videoForm.showVideoPath = ''
            alert('发布成功！')
          } else {
            alert(response.data.msg)
          }
        }).catch(function (error) {
          console.log(error)
          alert('发生了某些错误：' + error)
        })
      }
    },
    handdlePopupShow () {
      var msg = '确定要放弃上传视频？'
      if (this.videoForm.showVideoPath !== '') {
        if (confirm(msg) === true) {
          this.videoForm.showVideoPath = ''
          this.popupShow = false
        } else {
          this.popupShow = true
        }
      } else {
        this.popupShow = false
      }
    },
    // 上传前回调
    beforeUploadVideo (file) {
      var fileSize = file.size / 1024 / 1024 < 100
      if (['video/mp4', 'video/ogg', 'video/flv', 'video/avi', 'video/wmv', 'video/rmvb', 'video/mov'].indexOf(file.type) === -1) {
        alert('请上传正确的视频格式')
        return false
      }
      if (!fileSize) {
        alert('视频大小不能超过100MB')
        return false
      }
      this.isShowUploadVideo = false
    },
    // 进度条
    uploadVideoProcess (event, file, fileList) {
      this.videoFlag = true
      this.videoUploadPercent = file.percentage.toFixed(0) * 1
    },
    // 上传成功回调
    handleVideoSuccess (res, file) {
      this.isShowUploadVideo = true
      this.videoFlag = false
      this.videoUploadPercent = 0
      // 前台上传地址
      // if (file.status == 'success' ) {
      //      this.videoForm.showVideoPath = file.url;
      // } else {
      //      layer.msg("上传失败，请重新上传");
      // }
      // 后台上传地址
      if (res.status === 200) {
        this.videoForm.showVideoPath = res.path
      } else {
        alert('回应是：' + res.msg)
      }
    }
  }
}
</script>
