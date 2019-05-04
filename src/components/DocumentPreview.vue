<template>
  <v-card>
    <v-container
        fluid
        grid-list-lg
    >
      <v-layout row wrap>
        <v-flex>
          <v-card color="blue darken-2" class="white--text">
            <v-card-title primary-title>
              <div>
                <div class="headline">{{ post.title }}</div>
                <span>Created by {{ post.user }}.</span>
              </div>
            </v-card-title>
            <v-divider light></v-divider>
            <v-card-actions>
              <v-btn flat dark v-on:click="$emit('openDocument', post)">Open document</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
    export default {
        name: 'Preview',
        props: {
            post: {}
        }
    }
</script>

<style>
  .cursor-pointer {
    cursor: pointer;
  }
</style>
