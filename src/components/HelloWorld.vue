<template>
  <i-container fluid>
    <i-row>
      <i-column>
        <div class="d1">Zen Garden</div>
      </i-column>
    </i-row>
    <i-row class="_margin-top:2">
      <i-column>
        <h1>h1. Zen heading</h1>
        <h2>h2. Zen heading</h2>
        <h3>h3. Zen heading</h3>
        <h4>h4. Zen heading</h4>
        <h5>h5. Zen heading</h5>
        <h6>h6. Zen heading</h6>
      </i-column>
    </i-row>
    <i-row class="_margin-top:2">
      <i-column>
        <i-table border striped>
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Username</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">#</th>
              <td>Alex</td>
              <td>Grozav</td>
              <td>@alexgrozav</td>
            </tr>
            <tr>
              <th scope="row">#</th>
              <td>John</td>
              <td>Doe</td>
              <td>@johndoe</td>
            </tr>
            <tr>
              <th scope="row">#</th>
              <td>Alice</td>
              <td>Doe</td>
              <td>@alicecooper</td>
            </tr>
          </tbody>
        </i-table>
      </i-column>
    </i-row>
    <i-row class="_margin-top:2">
      <i-column>
        <i-alert color="info">
          <template #icon>
            <i-icon name="ink-info" />
          </template>
          <p>Heads up! This alert needs your attention, but it's not super important.</p>
        </i-alert>
      </i-column>
    </i-row>
    <i-row class="_margin-top:2">
      <i-column><i-badge color="primary">Primary</i-badge></i-column>

      <i-column><i-badge color="secondary">Secondary</i-badge></i-column>

      <i-column><i-badge color="light">Light</i-badge></i-column>

      <i-column><i-badge color="dark">Dark</i-badge></i-column>

      <i-column><i-badge color="info">Info</i-badge></i-column>

      <i-column><i-badge color="success">Success</i-badge></i-column>

      <i-column><i-badge color="warning">Warning</i-badge></i-column>

      <i-column><i-badge color="danger">Danger</i-badge> </i-column>
    </i-row>
    <i-row class="_margin-top:2">
      <i-column>
        <i-card>
          Some quick example text to build on the card title and make up the bulk of the card's content.
        </i-card>
      </i-column>
      <i-column>
        <i-card>
          <template #image>
            <img src="@/assets/screenshot.png" alt="Card Image" />
          </template>
          <h4 class="card-title">Card Title</h4>
          <p class="card-subtitle">Card Subtitle</p>
          <p>Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          <a class="card-link" href="https://inkline.io"> Example Link </a>
        </i-card>
      </i-column>
      <i-column>
        <i-card>
          <template #header> Card Header </template>
          Some quick example text to build on the card title and make up the bulk of the card's content.
          <template #footer> Card Footer </template>
        </i-card>
      </i-column>
    </i-row>
    <i-row class="_margin-top:2">
      <i-column>
        <i-header color="light" class="_text-align:center">
          <h1>Inkline Light Header</h1>
          <p>This is a header paragraph lorem ipsum dolor sit amet.</p>
          <i-button color="primary">Button</i-button>
        </i-header>
      </i-column>
    </i-row>
    <i-row class="_margin-top:2">
      <i-column>
        <i-header color="dark" class="_text-align:center">
          <h1>Inkline Dark Header</h1>
          <p>This is a header paragraph lorem ipsum dolor sit amet.</p>
          <i-button color="primary">Button</i-button>
        </i-header>
      </i-column>
    </i-row>
    <i-row class="_margin-top:2">
      <i-column>
        <i-header color="primary" class="_text-align:center">
          <h1>Inkline Primary Header</h1>
          <p>This is a header paragraph lorem ipsum dolor sit amet.</p>
          <i-button color="light">Button</i-button>
        </i-header></i-column
      >
    </i-row>
    <i-row class="_margin-top:2">
      <i-column>
        <i-list-group>
          <i-list-group-item>
            <h4>List Group Heading</h4>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua.
            </p>
          </i-list-group-item>
          <i-list-group-item>
            <h4>List Group Heading</h4>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua.
            </p>
          </i-list-group-item>
          <i-list-group-item>
            <h4>List Group Heading</h4>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua.
            </p>
          </i-list-group-item>
        </i-list-group>
      </i-column>
    </i-row>
    <i-row class="_margin-top:2">
      <i-column>
        <i-media>
          <template #image>
            <img src="@/assets/screenshot.png" height="80" width="80" alt="Media Image" />
          </template>
          <h3>Media Title</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et...
          </p>
        </i-media>
      </i-column>
    </i-row>
    <i-row class="_margin-top:2" center>
      <i-column>
        <i-popover>
          <i-button>Popover</i-button>
          <template #header> Popover Header </template>
          <template #body> This is the popover body. Useful information goes here. </template>
          <template #footer> Popover Footer </template>
        </i-popover>
      </i-column>
    </i-row>
    <i-row class="_margin-top:2">
      <i-column>
        <i-progress color="dark">
          <i-progress-bar :value="counter" />
        </i-progress>
      </i-column>
    </i-row>
    <i-row class="_margin-top:2">
      <i-column>
        <i-tabs v-model="active">
          <template #header>
            <i-tab-title for="tab-1"> Tab 1 </i-tab-title>
            <i-tab-title for="tab-2"> Tab 2 </i-tab-title>
            <i-tab-title for="tab-3"> Tab 3 </i-tab-title>
          </template>
          <i-tab name="tab-1"> Tab 1 content </i-tab>
          <i-tab name="tab-2"> Tab 2 content </i-tab>
          <i-tab name="tab-3"> Tab 3 content </i-tab>
        </i-tabs>
      </i-column>
    </i-row>
    <i-row class="_margin-top:2">
      <i-column>
        <p>This is a normal paragraph.</p>
      </i-column>
      <i-column>
        <p class="lead">And this is a paragraph with <code>.lead</code> class.</p>
      </i-column>
    </i-row>
    <i-row class="_margin-top:2"></i-row>
  </i-container>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useIntervalFn } from '@vueuse/core'

defineProps<{
  msg: string
}>()

const counter = ref(0)
const active = ref('tab-1')

useIntervalFn(() => {
  counter.value <= 100 ? counter.value++ : (counter.value = 0)
}, 2000)

// count()
</script>
<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
