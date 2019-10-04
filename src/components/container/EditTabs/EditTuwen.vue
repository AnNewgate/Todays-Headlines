<template>
    <div class='imgBox uploadBox'>
          <textarea placeholder="有什么新鲜事想告诉大家" class="title-input" id="emojiText" maxlength="2000" v-model="textdata"></textarea>
          <p class="words-number">{{textNum}}/2000字</p>
          <div class="tab-pane-footer">
            <div class="bui-left">
              <span class="show-image-upload show-uploader" @click="emojiShow=false;popupShow=!popupShow">
                <img src="../../../assets/image-icon.png" class="image-icon">
                <span>图片</span>
              </span>
              <span class="show-emoji show-uploader" @click="popupShow=false;emojiShow=!emojiShow">
                <img src="../../../assets/emoji-icon.png" class="image-icon">
                <span>表情</span>
              </span>
            </div>
            <div class="bui-right">
              <span class="msg-tip">{{ tip }}</span>
              <a v-bind:class="{ 'upload-publish': true, active: ifCanPublish }" @click="handleUpload">发布</a>
            </div>
          </div>
          <div class="uploader-popup" v-show="popupShow">
              <div class="imgUploadBox">
                  <p class="uploader-title">本地上传</p>
                  <p class="uploader-meta">共9张，还能上传{{ 9 - fileList.length }}张</p>
                  <i class="bui-icon close-popup icon-close_small" @click="handlePopupShow"></i>
                  <div class="bui-box upload-box clearfix">
                    <my-upload v-bind:fileList="fileList" @delete="handleDelete"></my-upload>
                    <div v-if="fileList.length < 9">
                          <div ga_event="user_ugc_video_upload" class="bui-left upload-cover upload-cover-add" @click.stop="handleClick"></div>
                          <input type="file" accept="image/jpeg,image/x-png" @change="handleFileList" class="hiddenInput"/>
                    </div>
                </div>
              </div>
          </div>
          <div class="uploader-popup emoji-panel" style="" v-show="emojiShow">
            <i class="bui-icon close-popup icon-close_small" @click="handleEmojiShow"></i>
            <div class="emoji-box">
              <div class="emoji-list" @click="handleSelectEmoji">
                <i class="emoji" data-content="微笑" style="background-image: url('https://s3.pstatp.com/toutiao/tt_tps/static/images/ttemoji_v2/emoji_1_smile@3x.png';"></i>
                <i class="emoji" data-content="爱慕" style="background-image: url('https://s3.pstatp.com/toutiao/tt_tps/static/images/ttemoji_v2/emoji_2_kiss@3x.png');"></i>
                <i class="emoji" data-content="惊呆" style="background-image: url('https://s3.pstatp.com/toutiao/tt_tps/static/images/ttemoji_v2/emoji_3_daze@3x.png');"></i>
                <i class="emoji" data-content="酷拽" style="background-image: url('https://s3.pstatp.com/toutiao/tt_tps/static/images/ttemoji_v2/emoji_4_smoke@3x.png');"></i>
                <i class="emoji" data-content="抠鼻" style="background-image: url('https://s3.pstatp.com/toutiao/tt_tps/static/images/ttemoji_v2/emoji_5_pick_nose@3x.png');"></i>
                <i class="emoji" data-content="流泪" style="background-image: url('https://s3.pstatp.com/toutiao/tt_tps/static/images/ttemoji_v2/emoji_6_cry@3x.png');"></i>
                <i class="emoji" data-content="发怒" style="background-image: url('https://s3.pstatp.com/toutiao/tt_tps/static/images/ttemoji_v2/emoji_7_anger@3x.png');"></i>
                <i class="emoji" data-content="呲牙" style="background-image: url('https://s3.pstatp.com/toutiao/tt_tps/static/images/ttemoji_v2/emoji_8_laugh@3x.png');"></i>
                <i class="emoji" data-content="鼾睡" style="background-image: url('https://s3.pstatp.com/toutiao/tt_tps/static/images/ttemoji_v2/emoji_9_sleep@3x.png');"></i>
                <i class="emoji" data-content="害羞" style="background-image: url('https://s3.pstatp.com/toutiao/tt_tps/static/images/ttemoji_v2/emoji_10_shy@3x.png');"></i>
                <i class="emoji" data-content="可爱" style="background-image: url('https://s3.pstatp.com/toutiao/tt_tps/static/images/ttemoji_v2/emoji_11_naughty@3x.png');"></i>
                <i class="emoji" data-content="晕" style="background-image: url('https://s3.pstatp.com/toutiao/tt_tps/static/images/ttemoji_v2/emoji_12_dizzy@3x.png');"></i>
                <i class="emoji" data-content="衰" style="background-image: url('https://s3.pstatp.com/toutiao/tt_tps/static/images/ttemoji_v2/emoji_13_stunned@3x.png');"></i>
                <i class="emoji" data-content="闭嘴" style="background-image: url('https://s3.pstatp.com/toutiao/tt_tps/static/images/ttemoji_v2/emoji_14_shut_up@3x.png');"></i>
                <i class="emoji" data-content="机智" style="background-image: url('https://s3.pstatp.com/toutiao/tt_tps/static/images/ttemoji_v2/emoji_15_wit@3x.png');"></i>
                <i class="emoji" data-content="来看我" style="background-image: url('https://s3.pstatp.com/toutiao/tt_tps/static/images/ttemoji_v2/emoji_16_attention@3x.png');"></i>
                <i class="emoji" data-content="灵光一闪" style="background-image: url('https://s3.pstatp.com/toutiao/tt_tps/static/images/ttemoji_v2/emoji_17_hand_sample@3x.png');"></i>
                <i class="emoji" data-content="耶" style="background-image: url('https://s3.pstatp.com/toutiao/tt_tps/static/images/ttemoji_v2/emoji_18_ye@3x.png');"></i>
                <i class="emoji" data-content="捂脸" style="background-image: url('https://s3.pstatp.com/toutiao/tt_tps/static/images/ttemoji_v2/emoji_19_distress_situation@3x.png');"></i>
                <i class="emoji" data-content="打脸" style="background-image: url('https://s3.pstatp.com/toutiao/tt_tps/static/images/ttemoji_v2/emoji_20_play_face@3x.png');"></i>
                <i class="emoji" data-content="大笑" style="background-image: url('https://s3.pstatp.com/toutiao/tt_tps/static/images/ttemoji_v2/emoji_21_smile@3x.png');"></i>
                <i class="emoji" data-content="哈欠" style="background-image: url('https://s3.pstatp.com/toutiao/tt_tps/static/images/ttemoji_v2/emoji_22_yawn@3x.png');"></i>
                <i class="emoji" data-content="震惊" style="background-image: url('https://s3.pstatp.com/toutiao/tt_tps/static/images/ttemoji_v2/emoji_23_surprise@3x.png');"></i>
                <i class="emoji" data-content="送心" style="background-image: url('https://s3.pstatp.com/toutiao/tt_tps/static/images/ttemoji_v2/emoji_24_take_heart@3x.png');"></i>
                <i class="emoji" data-content="困" style="background-image: url('https://s3.pstatp.com/toutiao/tt_tps/static/images/ttemoji_v2/emoji_25_sleepy@3x.png');"></i>
                <i class="emoji" data-content="what" style="background-image: url('https://s3.pstatp.com/toutiao/tt_tps/static/images/ttemoji_v2/emoji_26_what@3x.png');"></i>
                <i class="emoji" data-content="泣不成声" style="background-image: url('https://s3.pstatp.com/toutiao/tt_tps/static/images/ttemoji_v2/emoji_27_sobbing@3x.png');"></i>
                <i class="emoji" data-content="小鼓掌" style="background-image: url('https://s3.pstatp.com/toutiao/tt_tps/static/images/ttemoji_v2/emoji_28_handclap@3x.png');"></i>
                <i class="emoji" data-content="酷" style="background-image: url('https://s3.pstatp.com/toutiao/tt_tps/static/images/ttemoji_v2/emoji_29_cool@3x.png');"></i>
                <i class="emoji" data-content="大金牙" style="background-image: url('https://s3.pstatp.com/toutiao/tt_tps/static/images/ttemoji_v2/emoji_29_cool@3x.png');"></i>
                <i class="emoji" data-content="偷笑" style="background-image: url('https://s3.pstatp.com/toutiao/tt_tps/static/images/ttemoji_v2/emoji_30_titter@3x.png');"></i>
                <i class="emoji" data-content="石化" style="background-image: url('https://s3.pstatp.com/toutiao/tt_tps/static/images/ttemoji_v2/emoji_31_lightning_strike@3x.png');"></i>
                <i class="emoji" data-content="思考" style="background-image: url('https://s3.pstatp.com/toutiao/tt_tps/static/images/ttemoji_v2/emoji_32_meditation@3x.png');"></i>
                <i class="emoji" data-content="吐血" style="background-image: url('https://s3.pstatp.com/toutiao/tt_tps/static/images/ttemoji_v2/emoji_33_vomiting_blood@3x.png');"></i>
                <i class="emoji" data-content="可怜" style="background-image: url('https://s3.pstatp.com/toutiao/tt_tps/static/images/ttemoji_v2/emoji_34_acting_cute@3x.png');"></i>
                <i class="emoji" data-content="嘘" style="background-image: url('https://s3.pstatp.com/toutiao/tt_tps/static/images/ttemoji_v2/emoji_35_quietly@3x.png');"></i>
                <i class="emoji" data-content="撇嘴" style="background-image: url('https://s3.pstatp.com/toutiao/tt_tps/static/images/ttemoji_v2/emoji_36_hum@3x.png');"></i>
                <i class="emoji" data-content="黑线" style="background-image: url('https://s3.pstatp.com/toutiao/tt_tps/static/images/ttemoji_v2/emoji_37_khan@3x.png');"></i>
                <i class="emoji" data-content="笑哭" style="background-image: url('https://s3.pstatp.com/toutiao/tt_tps/static/images/ttemoji_v2/emoji_38_forced_smile@3x.png');"></i>
                <i class="emoji" data-content="雾霾" style="background-image: url('https://s3.pstatp.com/toutiao/tt_tps/static/images/ttemoji_v2/emoji_39_haze@3x.png');"></i>
                <i class="emoji" data-content="奸笑" style="background-image: url('https://s3.pstatp.com/toutiao/tt_tps/static/images/ttemoji_v2/emoji_40_smirk@3x.png');"></i>
                <i class="emoji" data-content="得意" style="background-image: url('https://s3.pstatp.com/toutiao/tt_tps/static/images/ttemoji_v2/emoji_41_cool@3x.png');"></i>
                <i class="emoji" data-content="憨笑" style="background-image: url('https://s3.pstatp.com/toutiao/tt_tps/static/images/ttemoji_v2/emoji_42_bad_smile@3x.png');"></i>
                <i class="emoji" data-content="抓狂" style="background-image: url('https://s3.pstatp.com/toutiao/tt_tps/static/images/ttemoji_v2/emoji_43_crazy@3x.png');"></i>
                <i class="emoji" data-content="泪奔" style="background-image: url('https://s3.pstatp.com/toutiao/tt_tps/static/images/ttemoji_v2/emoji_44_tears@3x.png');"></i>
                <i class="emoji" data-content="钱" style="background-image: url('https://s3.pstatp.com/toutiao/tt_tps/static/images/ttemoji_v2/emoji_45_money@3x.png');"></i>
                <i class="emoji" data-content="吻" style="background-image: url('https://s3.pstatp.com/toutiao/tt_tps/static/images/ttemoji_v2/emoji_46_kiss@3x.png');"></i>
                <i class="emoji" data-content="恐惧" style="background-image: url('https://s3.pstatp.com/toutiao/tt_tps/static/images/ttemoji_v2/emoji_47_fear@3x.png');"></i>
                <i class="emoji" data-content="笑" style="background-image: url('https://s3.pstatp.com/toutiao/tt_tps/static/images/ttemoji_v2/emoji_48_smile@3x.png');"></i>
                <i class="emoji" data-content="快哭了" style="background-image: url('https://s3.pstatp.com/toutiao/tt_tps/static/images/ttemoji_v2/emoji_49_injustice@3x.png');"></i>
                <i class="emoji" data-content="翻白眼" style="background-image: url('https://s3.pstatp.com/toutiao/tt_tps/static/images/ttemoji_v2/emoji_50_their@3x.png');"></i>
                <i class="emoji" data-content="互粉" style="background-image: url('https://s3.pstatp.com/toutiao/tt_tps/static/images/ttemoji_v2/emoji_51_focus@3x.png');"></i>
                <i class="emoji" data-content="赞" style="background-image: url('https://s3.pstatp.com/toutiao/tt_tps/static/images/ttemoji_v2/emoji_52_like@3x.png');"></i>
                <i class="emoji" data-content="鼓掌" style="background-image: url('https://s3.pstatp.com/toutiao/tt_tps/static/images/ttemoji_v2/emoji_53_handclap@3x.png');"></i>
                <i class="emoji" data-content="谢谢" style="background-image: url('https://s3.pstatp.com/toutiao/tt_tps/static/images/ttemoji_v2/emoji_54_3Q@3x.png');"></i>
                <i class="emoji" data-content="祈祷" style="background-image: url('https://s3.pstatp.com/toutiao/tt_tps/static/images/ttemoji_v2/emoji_54_3Q@3x.png');"></i>
                <i class="emoji" data-content="kiss" style="background-image: url('https://s3.pstatp.com/toutiao/tt_tps/static/images/ttemoji_v2/emoji_55_kiss@3x.png');"></i>
                <i class="emoji" data-content="去污粉" style="background-image: url('https://s3.pstatp.com/toutiao/tt_tps/static/images/ttemoji_v2/emoji_56_household_cleanser@3x.png');"></i>
                <i class="emoji" data-content="666" style="background-image: url('https://s3.pstatp.com/toutiao/tt_tps/static/images/ttemoji_v2/emoji_57_666@3x.png');"></i>
                <i class="emoji" data-content="玫瑰" style="background-image: url('https://s3.pstatp.com/toutiao/tt_tps/static/images/ttemoji_v2/emoji_58_rose@3x.png');"></i>
                <i class="emoji" data-content="胡瓜" style="background-image: url('https://s3.pstatp.com/toutiao/tt_tps/static/images/ttemoji_v2/emoji_59_cucumber@3x.png');"></i>
                <i class="emoji" data-content="啤酒" style="background-image: url('https://s3.pstatp.com/toutiao/tt_tps/static/images/ttemoji_v2/emoji_60_beer@3x.png');"></i>
                <i class="emoji" data-content="我想静静" style="background-image: url('https://s3.pstatp.com/toutiao/tt_tps/static/images/ttemoji_v2/emoji_61_distress_situation@3x.png');"></i>
                <i class="emoji" data-content="委屈" style="background-image: url('https://s3.pstatp.com/toutiao/tt_tps/static/images/ttemoji_v2/emoji_62_injustice@3x.png');"></i>
                <i class="emoji" data-content="舔屏" style="background-image: url('https://s3.pstatp.com/toutiao/tt_tps/static/images/ttemoji_v2/emoji_63_lick_screen@3x.png');"></i>
                <i class="emoji" data-content="鄙视" style="background-image: url('https://s3.pstatp.com/toutiao/tt_tps/static/images/ttemoji_v2/emoji_64_despise@3x.png');"></i>
                <i class="emoji" data-content="飞吻" style="background-image: url('https://s3.pstatp.com/toutiao/tt_tps/static/images/ttemoji_v2/emoji_65_kiss@3x.png');"></i>
                <i class="emoji" data-content="再见" style="background-image: url('https://s3.pstatp.com/toutiao/tt_tps/static/images/ttemoji_v2/emoji_66_bye@3x.png');"></i>
                <i class="emoji" data-content="紫薇别走" style="background-image: url('https://s3.pstatp.com/toutiao/tt_tps/static/images/ttemoji_v2/emoji_67_erkang@3x.png');"></i>
                <i class="emoji" data-content="求抱抱" style="background-image: url('https://s3.pstatp.com/toutiao/tt_tps/static/images/ttemoji_v2/emoji_68_hug@3x.png');"></i>
                <i class="emoji" data-content="听歌" style="background-image: url('https://s3.pstatp.com/toutiao/tt_tps/static/images/ttemoji_v2/emoji_69_hitler@3x.png');"></i>
                <i class="emoji" data-content="周冬雨的凝视" style="background-image: url('https://s3.pstatp.com/toutiao/tt_tps/static/images/ttemoji_v2/emoji_70_zhoudongyu_gaze@3x.png');"></i>
                <i class="emoji" data-content="马思纯的微笑" style="background-image: url('https://s3.pstatp.com/toutiao/tt_tps/static/images/ttemoji_v2/emoji_71_masichun_smile@3x.png');"></i>
                <i class="emoji" data-content="吐舌" style="background-image: url('https://s3.pstatp.com/toutiao/tt_tps/static/images/ttemoji_v2/emoji_72_dogo@3x.png');"></i>
                <i class="emoji" data-content="呆无辜" style="background-image: url('https://s3.pstatp.com/toutiao/tt_tps/static/images/ttemoji_v2/emoji_73_cat@3x.png');"></i>
                <i class="emoji" data-content="看" style="background-image: url('https://s3.pstatp.com/toutiao/tt_tps/static/images/ttemoji_v2/emoji_74_2ha@3x.png');"></i>
                <i class="emoji" data-content="白眼" style="background-image: url('https://s3.pstatp.com/toutiao/tt_tps/static/images/ttemoji_v2/emoji_75_dogo@3x.png');"></i>
                <i class="emoji" data-content="熊吉" style="background-image: url('https://s3.pstatp.com/toutiao/tt_tps/static/images/ttemoji_v2/emoji_76_bear@3x.png');"></i>
                <i class="emoji" data-content="骷髅" style="background-image: url('https://s3.pstatp.com/toutiao/tt_tps/static/images/ttemoji_v2/emoji_77_skeleton@3x.png');"></i>
                <i class="emoji" data-content="黑脸" style="background-image: url('https://s3.pstatp.com/toutiao/tt_tps/static/images/ttemoji_v2/emoji_78_black_face@3x.png');"></i>
                <i class="emoji" data-content="吃瓜群众" style="background-image: url('https://s3.pstatp.com/toutiao/tt_tps/static/images/ttemoji_v2/emoji_79_eat_melon@3x.png');"></i>
                <i class="emoji" data-content="绿帽子" style="background-image: url('https://s3.pstatp.com/toutiao/tt_tps/static/images/ttemoji_v2/emoji_80_green_hat@3x.png');"></i>
                <i class="emoji" data-content="汗" style="background-image: url('https://s3.pstatp.com/toutiao/tt_tps/static/images/ttemoji_v2/emoji_81_sweat@3x.png');"></i>
                <i class="emoji" data-content="摸头" style="background-image: url('https://s3.pstatp.com/toutiao/tt_tps/static/images/ttemoji_v2/emoji_82_lear_ropes@3x.png');"></i>
                <i class="emoji" data-content="皱眉" style="background-image: url('https://s3.pstatp.com/toutiao/tt_tps/static/images/ttemoji_v2/emoji_83_frown@3x.png');"></i>
                <i class="emoji" data-content="擦汗" style="background-image: url('https://s3.pstatp.com/toutiao/tt_tps/static/images/ttemoji_v2/emoji_84_wipe_sweat@3x.png');"></i>
                <i class="emoji" data-content="红脸" style="background-image: url('https://s3.pstatp.com/toutiao/tt_tps/static/images/ttemoji_v2/emoji_85_redface@3x.png');"></i>
                <i class="emoji" data-content="尬笑" style="background-image: url('https://s3.pstatp.com/toutiao/tt_tps/static/images/ttemoji_v2/emoji_86_orz@3x.png');"></i>
                <i class="emoji" data-content="做鬼脸" style="background-image: url('https://s3.pstatp.com/toutiao/tt_tps/static/images/ttemoji_v2/emoji_87_makeface@3x.png');"></i>
                <i class="emoji" data-content="强" style="background-image: url('https://s3.pstatp.com/toutiao/tt_tps/static/images/ttemoji_v2/emoji_88_intensity@3x.png');"></i>
                <i class="emoji" data-content="如花" style="background-image: url('https://s3.pstatp.com/toutiao/tt_tps/static/images/ttemoji_v2/emoji_89_ruhua@3x.png');"></i>
                <i class="emoji" data-content="叶" style="background-image: url('https://s3.pstatp.com/toutiao/tt_tps/static/images/ttemoji_v2/emoji_90_spit@3x.png');"></i>
                <i class="emoji" data-content="惊喜" style="background-image: url('https://s3.pstatp.com/toutiao/tt_tps/static/images/ttemoji_v2/emoji_91_surprise@3x.png');"></i>
                <i class="emoji" data-content="敲打" style="background-image: url('https://s3.pstatp.com/toutiao/tt_tps/static/images/ttemoji_v2/emoji_92_knock@3x.png');"></i>
                <i class="emoji" data-content="奋斗" style="background-image: url('https://s3.pstatp.com/toutiao/tt_tps/static/images/ttemoji_v2/emoji_93_refuel@3x.png');"></i>
                <i class="emoji" data-content="叶彩虹" style="background-image: url('https://s3.pstatp.com/toutiao/tt_tps/static/images/ttemoji_v2/emoji_94_rainbow@3x.png');"></i>
                <i class="emoji" data-content="大哭" style="background-image: url('https://s3.pstatp.com/toutiao/tt_tps/static/images/ttemoji_v2/emoji_95_bigcry@3x.png');"></i>
                <i class="emoji" data-content="比心" style="background-image: url('https://s3.pstatp.com/toutiao/tt_tps/static/images/ttemoji_v2/emoji_96_fingerheart@3x.png');"></i>
                <i class="emoji" data-content="加油" style="background-image: url('https://s3.pstatp.com/toutiao/tt_tps/static/images/ttemoji_v2/emoji_97_refuel@3x.png');"></i>
                <i class="emoji" data-content="碰拳" style="background-image: url('https://s3.pstatp.com/toutiao/tt_tps/static/images/ttemoji_v2/emoji_98_fist@3x.png');"></i>
                <i class="emoji" data-content="ok" style="background-image: url('https://s3.pstatp.com/toutiao/tt_tps/static/images/ttemoji_v2/emoji_99_OK@3x.png');"></i>
                <i class="emoji" data-content="击掌" style="background-image: url('https://s3.pstatp.com/toutiao/tt_tps/static/images/ttemoji_v2/emoji_100_highfive@3x.png');"></i>
                <i class="emoji" data-content="左上" style="background-image: url('https://s3.pstatp.com/toutiao/tt_tps/static/images/ttemoji_v2/emoji_101_left@3x.png');"></i>
                <i class="emoji" data-content="握手" style="background-image: url('https://s3.pstatp.com/toutiao/tt_tps/static/images/ttemoji_v2/emoji_102_shakehand@3x.png');"></i>
                <i class="emoji" data-content="18禁" style="background-image: url('https://s3.pstatp.com/toutiao/tt_tps/static/images/ttemoji_v2/emoji_103_18@3x.png');"></i>
                <i class="emoji" data-content="刀" style="background-image: url('https://s3.pstatp.com/toutiao/tt_tps/static/images/ttemoji_v2/emoji_104_knife@3x.png');"></i>
                <i class="emoji" data-content="V5" style="background-image: url('https://s3.pstatp.com/toutiao/tt_tps/static/images/ttemoji_v2/emoji_105_V5@3x.png');"></i>
                <i class="emoji" data-content="给力" style="background-image: url('https://s3.pstatp.com/toutiao/tt_tps/static/images/ttemoji_v2/emoji_106_awesome@3x.png');"></i>
                <i class="emoji" data-content="心" style="background-image: url('https://s3.pstatp.com/toutiao/tt_tps/static/images/ttemoji_v2/emoji_107_heart@3x.png');"></i>
                <i class="emoji" data-content="伤心" style="background-image: url('https://s3.pstatp.com/toutiao/tt_tps/static/images/ttemoji_v2/emoji_108_broken_heart@3x.png');"></i>
                <i class="emoji" data-content="屎" style="background-image: url('https://s3.pstatp.com/toutiao/tt_tps/static/images/ttemoji_v2/emoji_109_shit@3x.png');"></i>
                <i class="emoji" data-content="礼物" style="background-image: url('https://s3.pstatp.com/toutiao/tt_tps/static/images/ttemoji_v2/emoji_110_gifts@3x.png');"></i>
                <i class="emoji" data-content="蛋糕" style="background-image: url('https://s3.pstatp.com/toutiao/tt_tps/static/images/ttemoji_v2/emoji_111_cake@3x.png');"></i>
                <i class="emoji" data-content="撒花" style="background-image: url('https://s3.pstatp.com/toutiao/tt_tps/static/images/ttemoji_v2/emoji_112_flower@3x.png');"></i>
                <i class="emoji" data-content="不看" style="background-image: url('https://s3.pstatp.com/toutiao/tt_tps/static/images/ttemoji_v2/emoji_113_lookat@3x.png');"></i>
                <i class="emoji" data-content="炸弹" style="background-image: url('https://s3.pstatp.com/toutiao/tt_tps/static/images/ttemoji_v2/emoji_114_bomb@3x.png');"></i>
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
  name: 'EditTuwen',
  data () {
    return {
      popupShow: false,
      emojiShow: false,
      tip: '',
      fileList: [],
      textdata: ''
    }
  },
  computed: {
    // 计算属性的 getter
    ifCanPublish: function () {
      // `this` 指向 vm 实例
      return this.textdata.length !== 0
    },
    textNum: function () {
      // `this` 指向 vm 实例
      return this.textdata.length
    },
    ifNull: function () {
      return JSON.stringify(this.fileList) === '[]' && this.textdata.length === 0
    }
  },
  methods: {
    handleClick () {
      this.$el.querySelector('.hiddenInput').click()
    },
    handlePopupShow () {
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
    handleEmojiShow () {
      this.emojiShow = false
    },
    handleSelectEmoji (e) {
      var self = this
      if (e.target.className === 'emoji') {
        var obj = document.getElementById('emojiText')
        var str = '[' + e.target.getAttribute('data-content') + ']'
        if (document.selection) {
          var sel = document.selection.createRange()
          sel.text = str
          obj.focus()
        } else if (typeof obj.selectionStart === 'number' && typeof obj.selectionEnd === 'number') {
          var startPos = obj.selectionStart
          var endPos = obj.selectionEnd
          var cursorPos = startPos
          var tmpStr = self.textdata
          self.textdata = tmpStr.substring(0, startPos) + str + tmpStr.substring(endPos, tmpStr.length)
          cursorPos += str.length
          obj.selectionStart = obj.selectionEnd = cursorPos
          obj.focus()
        } else {
          self.textdata += str
          obj.focus()
        }
        // this.textdata += '[' + e.target.getAttribute('data-content') + ']'
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
        self.tip = '请输入内容！'
        setTimeout(function () {
          self.tip = ''
        }, 2000)
      } else {
        var text = xss(self.textdata)
        var imgList = { imgs: self.fileList }
        axios.post('http://localhost:8888/action/formUpload', {
          content: text,
          imgList: imgList
        }).then(function (response) {
          // console.log(response)
          if (response.data.status === 200) {
            self.textdata = ''
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
