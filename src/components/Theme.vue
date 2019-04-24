<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-app id="inspire">
    <v-toolbar
        color="blue-grey"
        dark
        fixed
        app
        clipped-right
    >
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Document Editor</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>

    <v-navigation-drawer v-model="drawer" fixed app>
      <v-list two-line subheader>
        <v-subheader>General</v-subheader>

        <v-list-tile avatar @click="">
          <v-list-tile-content>
            <v-list-tile-title>File name</v-list-tile-title>
            <v-list-tile-sub-title>Change your Google+ profile photo</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile avata @click="">
          <v-list-tile-content>
            <v-list-tile-title>Show your status</v-list-tile-title>
            <v-list-tile-sub-title>Your status is visible to everyone</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-content>
      <Editor ref="editor" :outline="true" :preview="true" v-model="text"></Editor>
    </v-content>

    <v-footer color="blue-grey" class="white--text" app>
      <span>Vuetify</span>
      <v-spacer></v-spacer>
      <span>&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
    import {Editor} from '../build-entry';

    export default {
        components: {Editor},
        data: () => ({
            drawer: null,
            drawerRight: null,
            right: false,
            left: false,
            text: '# Header'
        }),
        props: {
            source: String
        },
        comments: {
            Editor
        }
    }
</script>
