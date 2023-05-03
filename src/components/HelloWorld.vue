<template>
  <i-container>
    <i-row>
      <i-column>
        <h1>H1 Heading</h1>
        <p>
          Nam gravida nisi nec tellus venenatis luctus. Nullam sagittis fringilla urna, ac pharetra nisi suscipit sed.
          Proin lacinia convallis vehicula. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere
          cubilia curae; Fusce vitae odio interdum, vulputate sem ac, rutrum sapien. Proin ipsum est, vulputate et metus
          vehicula, elementum molestie lectus. Donec ultrices mi sed sem dictum blandit. Proin rutrum magna ut vulputate
          volutpat. Vivamus ipsum leo, consequat et vestibulum eu, tempor tincidunt magna.
        </p>
        <h2 class="_color:light-50">H2 heading Light & gray paragraph</h2>
        <p class="_color:gray-40">
          Cras viverra, tortor a laoreet dictum, nulla elit consectetur est, vitae viverra ipsum purus non tortor. Sed
          mi augue, viverra id nibh at, mattis malesuada risus. Mauris id lacus tortor. Nulla iaculis dui egestas dui
          iaculis sagittis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Sed
          vestibulum, est nec sollicitudin vestibulum, lorem eros aliquet orci, vitae facilisis eros neque sit amet
          felis. Nunc arcu justo, malesuada in mi sed, interdum sollicitudin tellus. Nullam interdum massa pretium,
          molestie libero quis, vestibulum eros. Mauris tristique risus vitae ligula molestie, sed bibendum nulla
          sagittis. Mauris convallis tempus leo, at fermentum nisl gravida eu. Suspendisse potenti.
        </p>
        <h3>H3 heading with lead formating on paragraph text below</h3>
        <p class="lead">
          Etiam blandit ligula et risus ultricies efficitur. Sed egestas porttitor euismod. Aliquam dignissim at est id
          accumsan. Donec vitae ultrices nibh, efficitur gravida arcu. Maecenas lacinia ex posuere felis lobortis, nec
          tincidunt arcu consequat. Sed fermentum ligula et risus rhoncus, in mollis enim vehicula. Interdum et
          malesuada fames ac ante ipsum primis in faucibus. Nunc ac vulputate ipsum. Cras ut ipsum vel turpis dictum
          varius at sed mauris. Morbi congue imperdiet mattis. Ut lobortis auctor sapien, vitae gravida nulla
          consectetur eu. Sed rhoncus viverra tincidunt. In hac habitasse platea dictumst.
        </p>
      </i-column>
    </i-row>
    <i-row>
      <i-column>
        <h4>H4 - and code below</h4>
        <pre>
            <code>
const emit = defineEmits&lt;{
  (e: 'fileChange', file: File | null): void
}&gt;()

const <var>isDragging</var> = ref(false)
const <var>file</var> = ref(null)

const <var>handleFileInputChange</var> = (e: Event) => {
  const <var>input</var> = e.target as HTMLInputElement
  if (input.files) {
    file.value = input.files[0]
  }
  console.log(file)
  emit('fileChange', file.value)
}

const dragover = () => {
  isDragging.value = true
}
const dragleave = () => {
  isDragging.value = false
}
const drop = (e: DragEvent) => {
  const input = e.target as HTMLInputElement
  if (e.dataTransfer) input.files = e.dataTransfer.files
  handleFileInputChange(e)
  isDragging.value = false
}
        </code>
        </pre>
      </i-column>
      <i-column>
        <h5>H5 - and quotes below</h5>
        <blockquote class="blockquote -right">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
          <footer>Someone famous in <cite title="Source Title">Source Title</cite></footer>
        </blockquote>
        <blockquote class="blockquote -center">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
          <footer>Someone famous in <cite title="Source Title">Source Title</cite></footer>
        </blockquote>
        <blockquote class="blockquote">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
          <footer>Someone famous in <cite title="Source Title">Source Title</cite></footer>
        </blockquote>
      </i-column>
    </i-row>
  </i-container>
</template>
<script setup lang="ts"></script>
