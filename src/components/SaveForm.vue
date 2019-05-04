<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <form>
    <v-container fluid fill-height>
      <v-layout align-center justify-start>
        <v-flex
            xs12
            sm12
            md5
        >
          <v-toolbar dark color="blue">
            <v-toolbar-title>Save document form</v-toolbar-title>
            <v-spacer></v-spacer>
                <v-btn v-if="isPostNew" color="primary" @click="createDoc">Save</v-btn>
                <v-btn v-else color="primary" @click="updateDoc">Save</v-btn>
          </v-toolbar>

          <v-card class="elevation-12">
            <v-card-text>
            <v-text-field
                v-bind:title="post.title"
                v-model="docName"
                v-validate="'required|max:50'"
                :counter="50"
                :error-messages="errors.collect('docName')"
                label="Document name"
                data-vv-name="docName"
                required
            ></v-text-field>

            <v-text-field
                v-bind:title="post.user"
                v-model="username"
                v-validate="'required|max:25'"
                :counter="25"
                :error-messages="errors.collect('username')"
                label="Username"
                data-vv-name="username"
                required
            ></v-text-field>
            </v-card-text>

          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </form>
</template>

<script>
    import Vue from 'vue'
    import VeeValidate from 'vee-validate'
    import {APIService} from '../util/APIService'

    let apiService = new APIService();

    Vue.use(VeeValidate);

    export default {
        $_veeValidate: {
            validator: 'new'
        },

        props: {
            post: {},
            isPostNew: Boolean
        },

        data: function () {
            return {
                docName: this.post.title,
                username: this.post.user,
                dictionary: {
                    custom: {
                        docName: {
                            required: () => 'Document name can not be empty',
                            max: 'The name field may not be greater than 50 characters'
                        },
                        username: {
                            required: () => 'Username can not be empty',
                            max: 'The name field may not be greater than 25 characters'
                        }
                    }
                }
            }
        },

        watch: {
            post: function (val) {
                this.docName = val.title;
                this.username = val.user;
            }
        },

        computed: {
            innerPost: function () {
                return {_id: this.post._id, title: this.docName, user: this.username, body: this.post.body}
            }
        },

        mounted() {
            this.$validator.localize('en', this.dictionary)
        },

        methods: {
            validate(fun) {
                let booleanPromise = this.$validator.validateAll();
                booleanPromise.then((bool) => {
                    if (bool) {
                        fun()
                    }
                })
            },

            updateDoc() {
                this.validate(() => {
                    apiService.updateDoc(this.innerPost)
                        .then(response => {
                            console.log(response.data);
                            this.$emit('updateDocument', response.data)
                        })
                })
            },
            createDoc() {
                this.validate(() => {
                    console.log({title: this.docName, user: this.username, body: this.post.body});
                    apiService.createDoc({title: this.docName, user: this.username, body: this.post.body})
                        .then(response => {
                            console.log(response.data);
                            this.$emit('appendDocument', response.data)
                        })
                })
            }

        }
    }
</script>

<style scoped>

</style>