<template>
  <div 
    ref="wrapper" 
    class="scroll-warpper"
  > 
    <div class="content">
      <div class="header" v-if="$listeners.downScroll">
        <Load 
        :load="headerLoad"
        :color="headericonColor"
        :bgColor="headericonBgColor"
        :text="headerLoadText"
        :endText="headerLoadEndText"
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
          :color="footericonColor"
          :bgColor="footericonBgColor"
          :text="footerLoadText"
          :endText="footerLoadEndText"
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

function watchHandle(name) {
  return {
    handler(value) {
      this.updataLoadUrl(name, value);
    },
    immediate: true
  };
}
function propsHandle(value) {
  if (typeof value === 'object') {
    return {
      type: [String, Array],
      default: ()=>value,
    };
  } else {
    return {
      type: [String, Array],
      default: value,
    };
  }
}
export default {
  components: {
    Load
  },
  props: {
    iconColor: propsHandle("black"),
    iconBgColor: propsHandle("#42b983"),
    startIcon: propsHandle(null),
    loadIcon: propsHandle(null),
    loadText: propsHandle(["", "努力加载中"]),
    loadEndText: propsHandle(null),
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
      headericonColor: "",
      headericonBgColor: "",
      headerLoadText: "",
      headerLoadEndText: "",

      footerLoad: "idle",
      footerStartIcon: "",
      footerLoadIcon: "",
      footericonColor: "",
      footericonBgColor: "",
      footerLoadText: "",
      footerLoadEndText: "",

      contentHeight: 0
    };
  },
  watch: {
    iconColor: watchHandle("iconColor"),
    iconBgColor: watchHandle("iconBgColor"),
    startIcon: watchHandle("StartIcon"),
    loadIcon: watchHandle("LoadIcon"),
    loadText: watchHandle("LoadText"),
    loadEndText: watchHandle("LoadEndText")
  },
  methods: {
    // updata load icon url
    updataLoadUrl(type, value) {
      let header = "header" + type;
      let footer = "footer" + type;
      if (typeof value === "string") {
        this[header] = this[footer] = value;
      } else if (value instanceof Array) {
        this[header] = value[0];
        this[footer] = value[1];
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
