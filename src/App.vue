<script>
  import { mapState, mapActions, mapMutations } from 'vuex'

  export default {
    data: () => ({
      title: 'Words',
      ui: {
        isAddWord: false,
        isSearching: false,
        newWord: {
          word: null,
          translate: null
        },
        inputSearch: null,
        message: {
          isVisible: false,
          content: null,
          color: 'info',
          icon: 'info'
        }
      }
    }),

    computed: {
      ...mapState([
        'itemsDisplayed',
        'baseItems',
        'isLoading',
        'dataSaved'
      ])
    },

    methods: {

      ...mapActions([
        'initStore',
        'add',
        'remove',
        'saveItems',
        'sortItems',
        'performSearch'
      ]),

      ...mapMutations([
        'addFrequency',
        'decreaseFrequency'
      ]),

      initialize () {
        this.$ga.init()

        this.initStore()
          .then(() => {
            if (this.itemsDisplayed.length === 0) {
              this.ui.message.isVisible = true
              this.ui.message.content = 'Register your first word!'
            } else {
              this.ui.message.isVisible = false
            }
          })
      },

      showSearch () {
        this.ui.isSearching = true
        this.$nextTick(this.$refs.search.focus)
      },

      showAdd () {
        this.ui.isAddWord = !this.ui.isAddWord
        this.$nextTick(this.$refs.word.focus)
      },

      handleAdd () {
        const item = {
          word: this.ui.newWord.word,
          translate: this.ui.newWord.translate || '?',
          frequency: 1
        }
        this.add(item)
          .then(() => {
            this.ui.newWord = {word: null, translate: null}
            this.ui.isAddWord = false
          })
      },

      handleRemove (item) {
        if (!confirm(`The word "${item.word}" will be removed, has sure?`)) return
        this.remove(item)
      },

      handleSearch () {
        this.performSearch({
          getSearchValue: () => document.getElementById('search').value,
          onFinished: () => {
            if (this.itemsDisplayed.length === 0) {
              this.ui.message.isVisible = true
              this.ui.message.content = 'No words found!'
            } else {
              this.ui.message.isVisible = false
            }
          }
        })
      }
    },

    created () {
      this.initialize()
    }
  }
</script>

<template>
  <v-app class="disable-selection">
    <v-content>
      <v-layout row>
        <v-flex xs12 sm6 offset-sm3>
          <v-card>

            <v-toolbar color="light-blue" dark app v-show="!ui.isSearching">
              <v-toolbar-side-icon></v-toolbar-side-icon>
              <v-toolbar-title>{{ title }}</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn icon @click="showSearch">
                <v-icon>search</v-icon>
              </v-btn>
              <v-btn icon @click="sortItems">
                <v-icon>filter_list</v-icon>
              </v-btn>
              <v-btn icon :disabled="dataSaved" @click="saveItems">
                <v-icon>save</v-icon>
              </v-btn>
            </v-toolbar>

            <v-toolbar color="light-blue" dark app v-show="ui.isSearching">
              <v-btn icon @click="ui.isSearching = false">
                <v-icon>arrow_back</v-icon>
              </v-btn>
              <v-text-field
                label="Search..."
                ref="search"
                id="search"
                clearable
                single-line
                class="mt-3"
                @input="handleSearch"
              ></v-text-field>
            </v-toolbar>

            <v-slide-y-transition data-dev="progress">
              <v-progress-linear :indeterminate="true" v-show="isLoading"></v-progress-linear>
            </v-slide-y-transition>

            <v-list two-line subheader>
              <v-list-tile
                v-for="item in itemsDisplayed"
                :key="item.word"
                avatar
              >
                <v-list-tile-avatar>
                  <v-icon class="grey lighten-1 white--text">{{ item.word[0].toUpperCase() }}</v-icon>
                </v-list-tile-avatar>

                <v-list-tile-content>
                  <v-list-tile-title>{{ item.word }}</v-list-tile-title>
                  <v-list-tile-sub-title>{{ item.translate }}</v-list-tile-sub-title>
                </v-list-tile-content>

                <v-list-tile-action>
                  <v-btn icon @click="decreaseFrequency(item)">
                    <v-icon>remove_circle_outline</v-icon>
                  </v-btn>
                </v-list-tile-action>

                <span class="ml-4">
                  {{ item.frequency }}
                </span>

                <v-list-tile-action>
                  <v-btn icon @click="addFrequency(item)">
                    <v-icon>add_circle_outline</v-icon>
                  </v-btn>
                </v-list-tile-action>

                <v-list-tile-action>
                  <v-btn icon @click="handleRemove(item)">
                    <v-icon color="grey">delete</v-icon>
                  </v-btn>
                </v-list-tile-action>
              </v-list-tile>
            </v-list>

            <v-layout row style="margin-bottom: 80px"></v-layout>

            <v-layout v-show="ui.message.isVisible">
              <v-flex>
                <v-alert
                  center
                  :value="true"
                  :color="ui.message.color"
                  :icon="ui.message.icon"
                  outline
                  class="elevation-5 mb-5 mx-5"
                >
                    {{ ui.message.content }}
                </v-alert>
              </v-flex>
            </v-layout>

            <v-btn
              fab
              color="light-blue"
              fixed
              bottom
              right
              @click="showAdd"
            >
              <v-icon color="white">add</v-icon>
            </v-btn>
          </v-card>
        </v-flex>
      </v-layout>

      <v-dialog v-model="ui.isAddWord" width="500">
        <v-card>
          <v-card-title class="headline grey lighten-2" primary-title>
            New Word
          </v-card-title>

          <v-card-text>
            <v-text-field
              label="Word"
              prepend-icon="edit"
              v-model="ui.newWord.word"
              ref="word"
            ></v-text-field>
            <v-text-field
              label="Translate"
              prepend-icon="edit"
              v-model="ui.newWord.translate"
              ref="translate"
            ></v-text-field>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              flat
              @click="handleAdd"
            >
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-content>
  </v-app>
</template>

<style>
  .disable-selection {
    user-select: none;
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* Internet Explorer */
    -webkit-user-select: none; /* Chrome, Safari, and Opera */
    -webkit-touch-callout: none; /* Disable Android and iOS callouts*/
  }
</style>
