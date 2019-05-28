<template>
  <div id="app">
    <div class="title">
      <h1>Microbios</h1>
      <small>Run cellular automata experiments</small>
    </div>
    <World/>
    <Controls/>
    <Code/>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import World from './components/World.vue'
import Controls from './components/Controls.vue'
import Code from './components/Code.vue'

export default {
  name: 'app',
  components: {
    World,
    Controls,
    Code,
  },

  mounted() { this.init().then(this.play) },
  methods: { ...mapActions(['init', 'play']) },
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Quicksand|Fascinate');

* {
  box-sizing: border-box;
}
body {
  font-family: 'Quicksand', sans-serif;
  background: rgba(248, 207, 96, 1) url(./assets/golden.png);
  text-align: center;
  margin: 0;
}

.title {
  display: inline-block;
  margin-top: 1rem;
  margin-bottom: 2rem;

  h1 {
    margin: 0px;
    font-size: 2rem;
    color: rgb(223, 128, 12);
    text-shadow: 0px 5px 0px white, 0px 9px 0px #7a4815;
    font-family: 'Fascinate', sans-serif;

    @media (min-width: 425px) {
      & {
        font-size: 4.5rem;
      }
    }
  }
  small {
    float: right;
    color: black;
    font-size: 1rem;
    font-style: italic;
    background: rgba(255,255,255,.6);
    padding: 3px;
  }
}
</style>
