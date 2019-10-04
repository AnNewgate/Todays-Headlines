<template>
    <div class="upload-list upload-list-picture-card">
        <!-- <div v-if="files"> -->
        <div v-for="item in files" v-bind:key="item.uid" class="upload-list-item upload-list-item-done">
            <div class="upload-list-item-info">
                <img :src="item.url" :alt="item.name" />
            </div>
            <span class="upload-list-item-actions" @click="handelDelete(item.uid)">
                <i class="anticon anticon-delete">
                    <svg viewBox="64 64 896 896" data-icon="delete" width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false" class="">
                        <path d="M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z"></path>
                    </svg>
                </i>
            </span>
        </div>
        <!-- </div> -->
    </div>
</template>

<script>
export default {
  name: 'UploadImg',
  props: {
    fileList: Array
  },
  computed: {
    files: function () {
      return this.fileList
    }
  },
  methods: {
    handelDelete (uid) {
      var files = [...this.files]
      files = files.filter(item => item.uid !== uid)
      this.$emit('delete', files)
      console.log(files)
    }
  }
}
</script>

<style>
.upload-list-picture-card {
    float: left;
}
.upload-list {
    font-family: "Chinese Quote", -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    font-size: 14px;
    font-variant: tabular-nums;
    line-height: 1.5;
    color: rgba(0, 0, 0, 0.65);
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    list-style: none;
    zoom: 1;
}
.upload-list-picture-card .upload-list-item {
    float: left;
    width: 72px;
    height: 72px;
    margin: 0 8px 8px 0;
    font-size: 14px;
    padding: 8px;
    border-radius: 4px;
    border: 1px solid #d9d9d9;
    position: relative;
}

.upload-list-picture-card .upload-list-item:hover {
    background: transparent;
}

.upload-list-picture-card .upload-list-item:hover .upload-list-item-info {
    background: transparent;
}

.upload-list-picture-card .upload-list-item:hover .upload-list-item-info:before {
    opacity: 1;
}

.upload-list-picture-card .upload-list-item-info {
    height: 100%;
    position: relative;
    overflow: hidden;
    padding: 0px;
}

.upload-list-picture-card .upload-list-item-info:before {
    content: ' ';
    position: absolute;
    z-index: 1;
    background-color: rgba(0, 0, 0, 0.5);
    -webkit-transition: all 0.3s;
    transition: all 0.3s;
    width: 100%;
    height: 100%;
    opacity: 0;
}

.upload-list-picture-card .upload-list-item-info img{
    width: 100%;
    height: 100%;
}

.upload-list-picture-card .upload-list-item-actions {
    position: absolute;
    left: 50%;
    top: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    z-index: 10;
    white-space: nowrap;
    opacity: 0;
    -webkit-transition: all 0.3s;
    transition: all 0.3s;
}

.upload-list-picture-card .upload-list-item-info:hover + .upload-list-item-actions, .upload-list-picture-card .upload-list-item-actions:hover {
    opacity: 1;
}

.upload-list-picture-card .upload-list-item-actions .anticon-delete {
    z-index: 10;
    -webkit-transition: all 0.3s;
    transition: all 0.3s;
    cursor: pointer;
    font-size: 16px;
    width: 16px;
    color: rgba(255, 255, 255, 0.85);
    margin: 0 4px;
}

.anticon {
    display: inline-block;
    font-style: normal;
    vertical-align: -0.125em;
    text-align: center;
    text-transform: none;
    line-height: 0;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
</style>
