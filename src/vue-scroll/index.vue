<template>
  <div 
    ref="wrapper" 
    class='scroll-warpper'
  > 
    <div class="scroll-content">
      <div class="scroll-header" v-if="$listeners.downScroll">
        <Load 
        :load="headerLoad"
        :text="headerLoadText"
        :endText="headerLoadEndText"
        :startIcon="startIcon"
        :loadIcon="headerLoadIcon"
        >
        </Load>
      </div>

      <div :style="{'min-height':contentHeight}">
        <slot></slot>

        <div v-if="isEmpty">
          <div v-if="emptyIcon" class="scroll-emptyIcon">
            <img :src="emptyIcon"/>
          </div>
          <p v-if="!isData && headerLoad !== 'start'">{{emptyText}}</p>
        </div>
        
      </div>

      <div class="scroll-footer" v-if="$listeners.upScroll && isData">
        <Load 
          :load="footerLoad" 
          :text="footerLoadText"
          :endText="footerLoadEndText"
          :loadIcon="footerLoadIcon"
          type='footer'
          >
        </Load>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import Load from "./load";
import LoadIcon from "./loadIcon";
let context = null;

function watchHandle(name) {
  return {
    handler(value) {
      this.updataLoadUrl(name, value);
    },
    immediate: true
  };
}
function propsHandle(value, type, required) {
  let response = {
    type: type || [String, Array],
    default: value,
    required: required || false
  };
  if (typeof value === "object") {
    response.default = () => value;
  }
  return response;
}
export default {
  components: {
    Load,
    LoadIcon
  },
  props: {
    length: propsHandle(null, Number, true),
    startIcon: propsHandle(null, [String, Boolean]),
    loadIcon: propsHandle(null, [String, Array, Boolean]),
    loadText: propsHandle(["", "努力加载中"]),
    loadEndText: propsHandle(null),
    emptyText: propsHandle("暂无数据可用", String),
    emptyIcon: propsHandle(null, String),
    isEmpty: propsHandle(true, Boolean),
    pageName: propsHandle(null, String),
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
      headerLoadText: "",
      headerLoadEndText: "",

      footerLoad: "idle",
      footerStartIcon: "",
      footerLoadIcon: "",
      footerLoadText: "正在加载......",
      footerLoadEndText: "",

      contentHeight: 0,

      count: 1 // page count
    };
  },
  computed: {
    isData() {
      return this.length !== 0;
    },
    page() {
      if (this.pageName) {
        return count;
      }
      return false;
    }
  },
  watch: {
    loadIcon: watchHandle("LoadIcon"),
    loadText: watchHandle("LoadText"),
    loadEndText: watchHandle("LoadEndText")
  },
  methods: {
    // updata load icon url
    updataLoadUrl(type, value) {
      let header = "header" + type;
      let footer = "footer" + type;
      if (typeof value === "string" || typeof value === "boolean") {
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

      if (this[load + "EndText"]) {
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
        setTimeout(() => {
          this[load] = "idle";
        }, 500);
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
      if (!this.isData) return;
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

    if (!this.isData) {
      context.autoPullDownRefresh();
    }
  }
};
</script>

<style>
.scroll-warpper {
  width: 100%;
  overflow: hidden;
}

.scroll-content {
  position: relative;
  min-height: 100.5%;
}

.scroll-content .scroll-upScroll {
  height: 10px;
}

.scroll-header {
  position: absolute;
  left: 0;
  top: -50px;
  right: 0;
  margin: auto;
}

.scroll-footer {
  height: 50px;
}

.scroll-emptyIcon img {
  width: 30%;
  max-width: 200px;
}
</style>
