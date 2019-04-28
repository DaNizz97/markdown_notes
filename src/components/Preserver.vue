<template>
  <form>
    <v-container>
      <v-layout>
        <v-flex
            xs12
            md4
        >
          <v-text-field
              v-bind:title="title"
              v-model="docName"
              v-validate="'required|max:50'"
              :counter="50"
              :error-messages="errors.collect('docName')"
              label="Document name"
              data-vv-name="docName"
              required
          ></v-text-field>

          <v-text-field
              v-bind:title="user"
              v-model="username"
              v-validate="'required|max:25'"
              :counter="25"
              :error-messages="errors.collect('username')"
              label="Username"
              data-vv-name="username"
              required
          ></v-text-field>
        </v-flex>
        <v-btn @click="save">Save</v-btn>

      </v-layout>
    </v-container>
  </form>
</template>

<script>
    import Vue from 'vue'
    import VeeValidate from 'vee-validate'

    Vue.use(VeeValidate);

    export default {
        $_veeValidate: {
            validator: 'new'
        },

        props: {
            title: String,
            user: String,
        },

        data: function () {
            return {
                docName: this.title,
                username: this.user,
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
            title: function (val) {
                this.docName = val;
            },
            user: function (val) {
                this.username = val
            }
        },

        mounted() {
            this.$validator.localize('en', this.dictionary)
        },

        methods: {
            save() {
                let booleanPromise = this.$validator.validateAll();
                booleanPromise.then((bool) => {
                    if (bool) {

                    }
                })
            },
        }
    }
</script>

<style scoped>

</style>