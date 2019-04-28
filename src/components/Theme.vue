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
        <v-subheader>All documents</v-subheader>

        <Preview
            v-for="post in posts"
            v-bind:key="post.id"
            v-bind:post="post"
            v-on:openDocument="openDocument"
        ></Preview>
      </v-list>
    </v-navigation-drawer>

    <v-content>
      <editor ref="editor"
              :outline="true"
              :preview="true"
              v-model="openedDocument.body"></editor>

      <Preserver v-bind:title="openedDocument.title"
                 v-bind:user="openedDocument.user"
      ></Preserver>
    </v-content>

    <v-footer color="blue-grey" class="white--text" app>
      <span>Daniil Nizovkin</span>
      <v-spacer></v-spacer>
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
    import Preserver from './Preserver';
    import {Editor, Preview} from '../build-entry';
    import axios from 'axios';

    export default {
        components: {Editor, Preview, Preserver},
        data: function () {
            return {
                drawer: true,
                text: '# Header',
                posts: [],
                errorz: [],
                openedDocument: {},
            }
        },

        props: {
            source: String
        },

        mounted() {
            this.$refs.editor.focus();
        },

        created() {
            axios
                .get('http://localhost:3000/docs')
                .then(response => {
                    this.posts = response.data
                })
                .catch(e => {
                    this.errorz.push(e)
                });
        },


        methods: {
            openDocument: function (post) {
                this.openedDocument = post;
            },
        }
    }
</script>
