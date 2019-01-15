<template>
  <div 
    ref="wrapper" 
    class="scroll-warpper"
  > 
    <div class="content">
      <div class="header" v-if="$listeners.downScroll">
        <slot name="header" v-if="headerLoad === 'idle'">
          <div class="header-content" :style="{background:iconColor}">
            <i class="iconfont icon-reload"></i>
          </div>
        </slot>
        
        <slot name="header-load"  v-if="headerLoad === 'start'">
          <div class="header-load">
            <i class="iconfont icon-loading1"></i>
          </div>
        </slot>
        
        <p v-if="headerLoad === 'end'">{{headerLoadText}}</p>
      </div>

      <div :style="{'min-height':contentHeight}">
        <slot></slot>
      </div>

      <div class="footer" v-if="$listeners.downScroll || $listeners.upScroll">
        <slot name="footer" v-if="footerLoad === 'idle'">
          <div class="footer-content" :style="{background:iconColor}">
            <i class="iconfont icon-reload"></i>
          </div>
        </slot>
        
        <slot name="footer-load"  v-if="footerLoad === 'start'">
          <div class="footer-load">
            <i class="iconfont icon-loading1"></i>
          </div>
        </slot>
        
        <p v-if="footerLoad === 'end'">{{footerLoadText}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
let context = null;
export default {
  // event {
  // downScroll,
  // upScroll
  // }
  props: {
    iconColor: {
      type: String,
      default: "#42b983"
    },
    headerLoadText: {
      type: String,
      default: ""
    },
    footerLoadText: {
      type: String,
      default: ""
    },
    options: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
      headerLoad: "idle", // idle  start  end
      footerLoad: "idle",
      contentHeight: 0
    };
  },
  computed: {},
  methods: {
    bindHandle() {
      let listeners = this.$listeners;
      for (let even in listeners) {
        context.on(even, listeners[even]);
      }

      context.on("pullingDown", this.headerHandle);
      context.on("pullingUp", this.footerHandle);
    },
    initScroll() {
      let contextOptions = {
        scrollY: true,
        probeType: 3,
        pullDownRefresh: false,
        pullUpLoad: false,
        mouseWheel: true
      };
      contextOptions.pullDownRefresh = this.$listeners.downScroll
        ? true
        : false;
      contextOptions.pullUpLoad = this.$listeners.upScroll
        ? this.options.pullUpLoad || {
            threshold: 100
          }
        : false;

      context = new BScroll(this.$refs.wrapper, {
        ...contextOptions,
        ...this.options
      });
    },
    loadEnd(type) {
      let time = 0;
      let load = type + "Load";

      if (this[load + "Text"]) {
        this[load] = "end";
        time = 500;
      }

      setTimeout(() => {
        if (type === "header") {
          context.finishPullDown();
        } else if (type === "footer") {
          context.finishPullUp();
        }

        context.refresh();
        this[load] = "idle";
      }, time);
    },
    computContentHeight() {
      let height = 0;
      if (this.$refs.wrapper) {
        height = this.$refs.wrapper.clientHeight + "px";
      }
      this.contentHeight = height;
    },
    headerHandle() {
      this.headerLoad = "start";
      let end = () => {
        this.loadEnd("header");
      };
      this.$emit('downScroll', end)
    },
    footerHandle() {
      this.footerLoad = "start";
      let end = () => {
        this.loadEnd("footer");
      };
      this.$emit('upScroll', end)
    }
  },
  mounted() {
    this.initScroll();
    this.bindHandle();
    this.computContentHeight();
  }
};
</script>

<style>
@import url("./font/iconfont.css");
.scroll-warpper {
  height: 100%;
  width: 100%;
  overflow: hidden;
}

.content {
  position: relative;
  min-height: 100%;
}

.footer {
  height: 50px;
}

.header {
  position: absolute;
  left: 0;
  top: -50px;
  right: 0;
  bottom: 0;
  margin: auto;
}

.header-content {
  border-radius: 50%;
  width: 30px;
  height: 30px;
  line-height: 30px;
  display: inline-block;
}

.icon-reload {
  font-size: 18px;
  color: white;
}
.icon-loading1 {
  font-size: 24px;
}

.header-load,.footer-load {
  animation: rotate 1s infinite linear;
  -webkit-animation: rotate 1s infinite linear;
}

.footer-content,.footer-load {
  line-height: 50px;
  text-align: center;
}

@keyframes rotate {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}

@-webkit-keyframes rotate /* Safari 和 Chrome */ {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
