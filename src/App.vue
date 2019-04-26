<template>
  <v-app>
  <Theme></Theme>
  </v-app>
</template>

<script>
    import {Theme} from './build-entry.js';

    export default {
        name: 'app',
        components: {
            Theme
        },
        data() {
            return {
                text: ''
            };
        }
    };
</script>
