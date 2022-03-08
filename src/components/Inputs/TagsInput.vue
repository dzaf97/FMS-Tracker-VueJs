<template>
  <div>
    <el-tag
      v-for="(tag, index) in dynamicTags"
      :key="tag + index"
      size="small"
      :type="tagType"
      :closable="true"
      :close-transition="false"
      @close="handleClose(tag)"
    >
      {{ tag }}
    </el-tag>

    <input
      id="tag-input"
      type="text"
      :placeholder="placeholder"
      class="form-control input-new-tag"
      v-model="inputValue"
      ref="saveTagInput"
      size="mini"
      @input="onInput"
      @keyup.enter="handleInputConfirm"
      @blur="handleInputConfirm"
    />
  </div>
</template>

<script>
import { Tag } from "element-ui";

export default {
  name: "tags-input",
  components: {
    [Tag.name]: Tag,
  },
  props: {
    placeholder: {
      type: String,
      default: "Add new tag",
      description: "Input placeholder",

    },
    value: {
      type: Array,
      default: () => [],
      description: "List of tags",
    },
    tagType: {
      type: String,
      default: "primary",
      description: "Tag type (primary|danger etc)",
    },
  },
  model: {
    prop: "value",
    event: "change",
  },
  data() {
    return {
      dynamicTags: [],
      inputVisible: false,
      inputValue: "",
    };
  },
  methods: {
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      this.$emit("change", this.dynamicTags);
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick(() => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.dynamicTags.push(inputValue);
        this.$emit("change", this.dynamicTags);
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
    onInput(evt) {
      this.$emit("input", evt.target.value);
    },
  },
  created() {
    this.$watch(
      "value",
      (newVal) => {
        this.dynamicTags = [...newVal];
      },
      { immediate: true }
    );
  },
};
</script>

<style>
#tag-input::placeholder {
  /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: #686868;
  opacity: 1; /* Firefox */
}

#tag-input:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: #686868;
}

#tag-input::-ms-input-placeholder {
  /* Microsoft Edge */
  color: #686868;
}

#tag-input {
  border-color: #202020;
  caret-color: #202020;
  color: #686868 ;
}

#tag-input:focus {
  border-color: #3ecf79;
}
</style>
