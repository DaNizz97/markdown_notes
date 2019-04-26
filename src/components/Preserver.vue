<template>
  <form>
    <v-container>
      <v-layout>
        <v-flex
            xs12
            md4
        >
          <v-text-field
              v-model="docName"
              v-validate="'required|max:25'"
              :counter="25"
              :error-messages="errors.collect('docName')"
              label="Document name"
              data-vv-name="docName"
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

        data: () => ({
            docName: '',
            dictionary: {
                custom: {
                    docName: {
                        required: () => 'Name can not be empty',
                        max: 'The name field may not be greater than 25 characters'
                    }
                }
            }
        }),

        mounted() {
            this.$validator.localize('en', this.dictionary)
        },

        methods: {
            save() {
                let booleanPromise = this.$validator.validateAll();
                booleanPromise.then((bool) => {
                    if (bool) {
                        console.log(this.docName)
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>