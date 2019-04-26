<template>
  <v-card>
    <v-container
        fluid
        grid-list-lg
    >
      <v-layout row wrap>
        <v-flex>
          <v-card color="cyan darken-2" class="white--text">
            <v-card-title primary-title>
              <div>
                <div class="headline">{{ title }}</div>
                <span>Listen to your favorite artists and albums whenever and wherever, online and offline.</span>
              </div>
            </v-card-title>
            <v-divider light></v-divider>
            <v-card-actions>
              <v-btn flat dark>Open document</v-btn>
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
        props: ['title']
    }
</script>

<style>
  .cursor-pointer {
    cursor: pointer;
  }
</style>
