import Vue from 'vue'

const styleInjectMixin = {
  beforeCreate(this: Vue): void {
    const styles = this.$options.styles
    if (Array.isArray(styles)) {
      styles.forEach((style) => {
        /* eslint-disable no-underscore-dangle */
        if (style.__inject__) {
          style.__inject__(this.$ssrContext)
        }
      })
    }
  },
}

export default styleInjectMixin
