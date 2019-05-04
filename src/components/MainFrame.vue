<template>
  <v-app id="inspire">
    <v-toolbar
        color="blue"
        dark
        fixed
        app
        clipped-left
    >
      <v-toolbar-title>Document Editor</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn flat color="white" @click="createEmptyDocument()">Create New Document</v-btn>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>

    </v-toolbar>

    <v-navigation-drawer v-model="drawer" fixed right app>
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
              v-model="openedDocument.body"
      ></editor>
      <Preserver
          :post="openedDocument"
          :is-post-new="isDocumentNew"
          v-on:appendDocument="appendDocument"
          v-on:updateDocument="updateDocument"
      ></Preserver>

      <v-btn class="ml-5" v-if="!isDocumentNew" depressed color="primary" @click="deleteDocument()">Delete</v-btn>
    </v-content>

    <v-footer color="blue" class="white--text" app>
      <span>Daniil Nizovkin</span>
      <v-spacer></v-spacer>
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
    import Preserver from './SaveForm';
    import {Editor, Preview} from '../build-entry';
    import {APIService} from '../util/APIService'

    const apiService = new APIService();

    export default {
        components: {Editor, Preview, Preserver},
        data: function () {
            return {
                drawer: true,
                text: '# Header',
                posts: [],
                errorz: [],
                openedDocument: {},
                isDocumentNew: true
            }
        },

        props: {
            source: String
        },

        mounted() {
            this.$refs.editor.focus();
        },

        created() {
            apiService.getDocs()
                .then(response => {
                    this.posts = response.data
                });

            this.createEmptyDocument();
        },


        methods: {
            openDocument: function (post) {
                this.isDocumentNew = false;
                this.openedDocument = post;
            },

            createEmptyDocument: function () {
                this.isDocumentNew = true;
                this.openedDocument = {title: 'New Document', user: 'User', body: '# Start typing here'};
            },

            deleteDocument() {
                apiService.deleteDoc(this.openedDocument._id)
                    .then(response => {
                        this.posts.splice(this.posts.indexOf(this.posts.find(docs => docs._id === this.openedDocument._id)), 1);
                        this.createEmptyDocument();
                        this.$msg('Document is deleted!')
                    })
            },
            appendDocument(addedDocument) {
                this.openedDocument = addedDocument;
                this.isDocumentNew = false;
                this.posts.push(this.openedDocument);
                this.$msg('Document is saved');
            },

            updateDocument(updatedDocument) {
                this.openedDocument = updatedDocument;
                this.posts[this.posts.indexOf(this.posts.find(doc => doc._id === this.openedDocument._id))] = this.openedDocument;
                this.$msg('Document is saved');
            }
        }
    }
</script>
