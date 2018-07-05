<script>
  export default {
    data: () => ({
      title: 'Commons Words',
      ui: {
        isAddWord: false,
        isSearching: false,
        newWord: {
          word: null,
          translate: null
        },
        inputSearch: null,
        isLoading: true,
        dataSaved: true
      },
      lastSetTimeOutID: null,
      baseItems: [],
      items: []
    }),

    computed: {
      copyright () {
        return `${new Date().getFullYear()} - Edilson Cichon`
      },

      message () {
        return this.ui.isSearching && this.items.length === 0
          ? 'No words found! =('
          : 'Register your first word!'
      }
    },

    methods: {
      addFrequency (item) {
        item.frequency++
        this.ui.dataSaved = false
      },

      decreaseFrequency (item) {
        if (item.frequency > 0) {
          item.frequency--
          this.ui.dataSaved = false
        }
      },

      addWord () {
        const word = this.ui.newWord.word
        const translate = this.ui.newWord.translate || '?'
        if (!word || word.length < 3) return
        if (this.filterItemsByWord(word).length > 0) return
        let item = {
          word: word,
          translate: translate,
          frequency: 1,
          icon: word[0].toUpperCase(),
          iconClass: 'grey lighten-1 white--text'
        }
        this.items.push(item)
        this.baseItems.push(item)
        this.ui.newWord = { word: null, translate: null }
        this.ui.isAddWord = false
        this.saveItemsDatabase()
      },

      removeWord (item) {
        if (!confirm(`The word "${item.word}" will be removed, has sure?`)) return
        let index = this.items.indexOf(item)
        this.items.splice(index, 1)
        index = this.baseItems.indexOf(item)
        this.baseItems.splice(index, 1)
        this.saveItemsDatabase()
      },

      filterItemsByWord (value) {
        return this.items.filter(item => {
          const wordLower = item.word.toLowerCase()
          const searchLower = value.toLowerCase()
          return wordLower.indexOf(searchLower) >= 0
        })
      },

      filterItems (value) {
        return this.baseItems.filter(item => {
          const wordLower = item.word.toLowerCase()
          const translateLower = item.translate.toLowerCase()
          const searchLower = value.toLowerCase()
          return wordLower.indexOf(searchLower) >= 0 ||
            translateLower.indexOf(searchLower) >= 0
        })
      },

      showSearch () {
        this.ui.isSearching = true
        this.$nextTick(this.$refs.search.focus)
      },

      performSearch () {
        clearTimeout(this.lastSetTimeOutID)
        this.lastSetTimeOutID = setTimeout(() => {
          this.items = this.filterItems(this.ui.inputSearch || '')
        }, 500)
      },

      sort () {
        this.items = this.items.sort(this.callbackSort)
        this.saveItemsDatabase()
      },

      showAdd () {
        this.ui.isAddWord = !this.ui.isAddWord
        this.$nextTick(this.$refs.word.focus)
      },

      saveItemsDatabase () {
        window.localStorage.setItem('items', JSON.stringify(this.items))
        this.ui.dataSaved = true
      },

      callbackSort (a, b) {
        if (a.frequency < b.frequency) return 1
        if (a.frequency === b.frequency) return 0
        if (a.frequency > b.frequency) return -1
      },

      loadItemsDatabase () {
        setTimeout(() => {
          const items = window.localStorage.getItem('items')
          this.baseItems = items ? JSON.parse(items) : []
          this.baseItems = this.baseItems.sort(this.callbackSort)
          this.items = [...this.baseItems]
          this.ui.isLoading = false
        }, 1000)
      }
    },

    created () {
      this.loadItemsDatabase()
      this.$ga.init()
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
              <v-btn icon @click="sort">
                <v-icon>filter_list</v-icon>
              </v-btn>
              <v-btn icon :disabled="ui.dataSaved" @click="saveItemsDatabase">
                <v-icon>save</v-icon>
              </v-btn>
            </v-toolbar>

            <v-toolbar color="light-blue" dark app v-show="ui.isSearching">
              <v-btn icon @click="ui.isSearching = false">
                <v-icon>arrow_back</v-icon>
              </v-btn>
              <v-text-field
                label="Search..."
                v-model="ui.inputSearch"
                ref="search"
                clearable
                single-line
                class="mt-3"
                @input="performSearch"
              ></v-text-field>
            </v-toolbar>

            <v-slide-y-transition data-dev="progress">
              <v-progress-linear :indeterminate="true" v-show="ui.isLoading"></v-progress-linear>
            </v-slide-y-transition>

            <v-list two-line subheader>
              <v-list-tile
                v-for="item in items"
                :key="item.word"
                avatar
                @click=""
              >
                <v-list-tile-avatar>
                  <v-icon :class="[item.iconClass]">{{ item.icon }}</v-icon>
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
                  <v-btn icon @click="removeWord(item)">
                    <v-icon color="grey">delete</v-icon>
                  </v-btn>
                </v-list-tile-action>
              </v-list-tile>
            </v-list>

            <v-layout v-show="!ui.isLoading && items.length === 0">
              <v-flex>
                <v-alert
                  center
                  :value="true"
                  color="info"
                  icon="info"
                  outline
                  class="elevation-5 ma-5"
                >
                    {{ message }}
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
              class="mb-5"
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
              @click="addWord"
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
