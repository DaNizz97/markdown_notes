<template>
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

        <Preview
        v-for="post in posts"
        v-bind:key="post.id"
        v-bind:title="post.title"
        ></Preview>

      </v-list>
    </v-navigation-drawer>

    <v-content>
      <editor ref="editor" :outline="true" :preview="true" v-model="text"></editor>
    </v-content>

    <v-footer color="blue-grey" class="white--text" app>
      <span>Vuetify</span>
      <v-spacer></v-spacer>
      <span>&copy; 2019  </span>
    </v-footer>
  </v-app>
</template>

<script>
    import { Editor, Preview } from '../build-entry';
    export default {
        components: { Editor, Preview },
        data: () => ({
            drawer: true,
            text: '# Header',
            posts: [
                { id: 1, title: 'title_1' },
                { id: 2, title: 'title 2' },
                { id: 3, title: 'title 3' }
            ]
        }),
        props: {
            source: String
        },
        mounted() {
            this.$refs.editor.focus();
        }
    }
</script>
