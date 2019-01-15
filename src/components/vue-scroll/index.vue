<template>
  <div 
    ref="wrapper" 
    class="scroll-warpper"
  > 
    <div class="content">
      <div class="header" v-if="$listeners.downScroll">
        <Load 
        :load="headerLoad"
        :color="iconColor"
        :text="headerText"
        :startIcon="headerStartIcon"
        :loadIcon="headerLoadIcon"
        >
        </Load>
      </div>

      <div :style="{'min-height':contentHeight}">
        <slot></slot>
      </div>

      <div class="footer" v-if="$listeners.downScroll || $listeners.upScroll">
        <Load 
          v-if="$listeners.upScroll" 
          :load="footerLoad" 
          :color="iconColor"
          :text="footerText"
          :startIcon="footerStartIcon"
          :loadIcon="footerLoadIcon"
          >
        </Load>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import Load from "./load";
let context = null;
export default {
  components: {
    Load
  },
  // event {
  // downScroll,
  // upScroll
  // }
  props: {
    iconColor: {
      type: String,
      default: "#42b983"
    },
    headerText: {
      type: String,
      default: ""
    },
    footerText: {
      type: String,
      default: "-----我是有底线的-----"
    },
    startIcon: {
      type: [String, Array],
      default: null
    },
    loadIcon: {
      type: [String, Array],
      default: null
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
      headerStartIcon: "",
      headerLoadIcon: "",

      footerLoad: "idle",
      footerStartIcon: "",
      footerLoadIcon: "",

      contentHeight: 0
    };
  },
  computed: {},
  watch: {
    startIcon(value) {
      this.updataLoadUrl("StartIcon", value);
    },
    loadIcon(value) {
      this.updataLoadUrl("LoadIcon", value);
    }
  },
  methods: {
    // updata load icon url
    updataLoadUrl(type, value) {
      let header = 'header' + type
      let footer = 'footer' + type
      if (typeof value === "string") {
        this.header = this.footer = value;
      } else if (value instanceof Array) {
        this.header = value[1];
        this.footer = value[1];
      }
    },

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
      this.$emit("downScroll", end);
    },
    footerHandle() {
      this.footerLoad = "start";
      let end = () => {
        this.loadEnd("footer");
      };
      this.$emit("upScroll", end);
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
.scroll-warpper {
  height: 100%;
  width: 100%;
  overflow: hidden;
}

.content {
  position: relative;
  min-height: 100%;
}

.header {
  position: absolute;
  left: 0;
  top: -50px;
  right: 0;
  bottom: 0;
  margin: auto;
}

.footer {
  height: 50px;
}
</style>
