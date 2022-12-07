export default {
  beforeMount(el: HTMLElement, binding: any) {
    el.innerHTML +=
      `<i class="fa ${binding.value} float-right text-green-400 text-xl"/>`;
  },
};
