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
        <slot name="header-load" v-if="headerLoad === 'start'">
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
        <slot name="footer">

        </slot>
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
  computed: {
  },
  methods: {
    bindHandle() {
      let listeners = this.$listeners;
      for (let even in listeners) {
        context.on(even, listeners[even]);
      }
    },
    initScroll() {
      let contextOptions = {
        scrollY: true,
        probeType: 3,
        pullDownRefresh: false,
        pullUpLoad: false,
        mouseWheel: true
      };
      contextOptions.pullDownRefresh = true;
      contextOptions.pullUpLoad = this.upScroll ? true : false;
      context = new BScroll(this.$refs.wrapper, {
        ...contextOptions,
        ...this.options
      });
    },
    loadEnd() {
      let time = 0;
      if (this.headerLoadText) {
        this.headerLoad = "end";
        time = 500;
      }

      setTimeout(() => {
        context.finishPullDown();
        context.refresh();
        this.headerLoad = "idle";
      }, time);
    },
    computContentHeight() {
      let height = 0
      if (this.$refs.wrapper) {
        height = this.$refs.wrapper.clientHeight + "px";
      }
      this.contentHeight = height
    }
  },
  mounted() {
    this.initScroll();
    this.bindHandle();

    this.computContentHeight()

    context.on("pullingDown", () => {
      this.headerLoad = "start";
      this.$listeners.downScroll(this.loadEnd);
    });

    
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

.header-load {
  animation: rotate 1s infinite linear;
  -webkit-animation: rotate 1s infinite linear;
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
