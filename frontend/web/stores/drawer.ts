export const useDefaultDrawer = defineStore('defaultDrawer', {
  state: () => ({
    isVisible: false,
  }),
  actions: {
    open() {
      this.isVisible = true;
    },
    close() {
      this.isVisible = false;
    },
    toggle() {
      this.isVisible = ! this.isVisible;
    },
  },
});
