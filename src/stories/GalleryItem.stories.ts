import GalleryItem from '@/components/GalleryItem.vue'

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'Example/GalleryItem',
  component: GalleryItem,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    title: { type: 'string', defaultValue: 'Why is type undefined?' },
  },
}

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { GalleryItem },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args }
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: '<GalleryItem v-bind="args" />',
})

export const Primary = Template.bind({})
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
Primary.args = {
  animation: true,
  source: 'GalleryItem',
}

// export const Secondary = Template.bind({})
// Secondary.args = {
//   label: 'GalleryItem',
// }

// export const Large = Template.bind({})
// Large.args = {
//   size: 'large',
//   label: 'GalleryItem',
// }

// export const Small = Template.bind({})
// Small.args = {
//   size: 'small',
//   label: 'GalleryItem',
// }
