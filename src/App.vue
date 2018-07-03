<script>
  export default {
    data () {
      return {
        title: 'Commons Words',
        ui: {
          isAddWord: false,
          isSearchWord: false,
          inputNew: null,
          inputSearch: null
        },
        items: [
          { word: 'What', translate: 'o que?', frequency: 9, icon: 'P', iconClass: 'grey lighten-1 white--text' },
          { word: 'Why', translate: 'Por que?', frequency: 7, icon: 'R', iconClass: 'grey lighten-1 white--text' },
          { word: 'Who', translate: 'Quem?', frequency: 5, icon: 'W', iconClass: 'grey lighten-1 white--text' },
          { word: 'When', translate: 'Quando?', frequency: 5, icon: 'W', iconClass: 'grey lighten-1 white--text' },
          { word: 'Where', translate: 'Onde?', frequency: 5, icon: 'W', iconClass: 'grey lighten-1 white--text' },
          { word: 'How', translate: 'Como?', frequency: 5, icon: 'W', iconClass: 'grey lighten-1 white--text' }
        ]
      }
    },

    computed: {
      copyright () {
        return `${new Date().getFullYear()} - Edilson Cichon`
      },

      filteredItems () {
        if (!this.ui.inputSearch) return this.items

        return this.items.filter(item => {
          const wordLower = item.word.toLowerCase()
          const translateLower = item.translate.toLowerCase()
          const searchLower = this.ui.inputSearch.toLowerCase()
          return wordLower.indexOf(searchLower) >= 0 ||
            translateLower.indexOf(searchLower) >= 0
        })
      }
    },

    methods: {
      addFrequency (item) {
        item.frequency++
      },
      removeFrequency (item) {
        item.frequency > 0 && item.frequency--
      },
      addWord() {
        if (!this.ui.inputNew || this.ui.inputNew.length < 3) return
        this.items.push({
          icon: this.ui.inputNew[0].toUpperCase(),
          iconClass: 'grey lighten-1 white--text',
          title: this.ui.inputNew,
          subtitle: Date(),
          frequency: 1
        })
        this.ui.inputNew = null
        this.ui.isAddWord = false
      }
    }
  }
</script>

<template>
  <v-app>
    <v-content class="disable-selection">
      <v-slide-y-transition mode="out-in">
        <v-layout row>
          <v-flex xs12 sm6 offset-sm3>
            <v-card>
              <v-toolbar color="light-blue" dark>
                <v-toolbar-side-icon></v-toolbar-side-icon>

                <v-toolbar-title>{{ title }}</v-toolbar-title>

                <v-spacer></v-spacer>

                <v-btn icon @click="ui.isSearchWord = !ui.isSearchWord">
                  <v-icon>search</v-icon>
                </v-btn>

                <v-btn icon @click="ui.isAddWord = !ui.isAddWord">
                  <v-icon>add</v-icon>
                </v-btn>
              </v-toolbar>

              <v-slide-y-transition data-dev="add-word">
                <v-list-tile class="mt-4" v-show="ui.isAddWord">
                  <v-text-field
                    label="Word"
                    prepend-icon="edit"
                    v-model="ui.inputNew"
                  ></v-text-field>
                  <v-list-tile-action>
                    <v-btn
                      icon
                      round
                      class="ml-5"
                      @click="addWord"
                    >
                      <v-icon>save_alt</v-icon>
                    </v-btn>
                  </v-list-tile-action>
                </v-list-tile>
              </v-slide-y-transition>

              <v-slide-y-transition data-dev="search-word">
                <v-list-tile class="mt-4" v-show="ui.isSearchWord">
                  <v-text-field
                    label="Search"
                    prepend-icon="search"
                    v-model="ui.inputSearch"
                  ></v-text-field>
                </v-list-tile>
              </v-slide-y-transition>

              <v-list two-line subheader>
                <v-list-tile
                  v-for="item in filteredItems"
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
                    <v-btn icon @click="removeFrequency(item)">
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
                </v-list-tile>
              </v-list>
            </v-card>
          </v-flex>
        </v-layout>
      </v-slide-y-transition>
    </v-content>
    <v-footer :fixed="false" app>
      <v-spacer></v-spacer>
      <span class="mr-3">&copy {{ copyright }}</span>
    </v-footer>
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
