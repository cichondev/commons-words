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
          { icon: 'P', iconClass: 'grey lighten-1 white--text', title: 'Photos', subtitle: 'Jan 9, 2014', frequency: 9 },
          { icon: 'R', iconClass: 'grey lighten-1 white--text', title: 'Recipes', subtitle: 'Jan 17, 2014', frequency: 7 },
          { icon: 'W', iconClass: 'grey lighten-1 white--text', title: 'Work', subtitle: 'Jan 28, 2014', frequency: 5 }
        ],
        items2: [
          { icon: 'font_download', iconClass: 'blue white--text', title: 'Vacation itinerary', subtitle: 'Jan 20, 2014' },
          { icon: 'font_download', iconClass: 'amber white--text', title: 'Kitchen remodel', subtitle: 'Jan 10, 2014' }
        ]
      }
    },

    computed: {
      copyright () {
        return `${new Date().getFullYear()} - Edilson Cichon`
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
    <v-content>
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

                <v-list two-line subheader>

                  <v-slide-y-transition data-dev="add-word">
                    <v-list-tile class="mt-2" v-show="ui.isAddWord">
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
                    <v-list-tile class="mt-2" v-show="ui.isSearchWord">
                      <v-text-field
                        label="Search"
                        prepend-icon="search"
                      ></v-text-field>
                    </v-list-tile>
                  </v-slide-y-transition>

                  <v-list-tile
                    v-for="item in items"
                    :key="item.title"
                    avatar
                    @click=""
                  >
                    <v-list-tile-avatar>
                      <v-icon :class="[item.iconClass]">{{ item.icon }}</v-icon>
                    </v-list-tile-avatar>

                    <v-list-tile-content>
                      <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                      <v-list-tile-sub-title>{{ item.subtitle }}</v-list-tile-sub-title>
                    </v-list-tile-content>

                    <v-list-tile-action>
                      <v-btn icon @click="removeFrequency(item)">
                        <v-icon>remove_circle_outline</v-icon>
                      </v-btn>
                    </v-list-tile-action>

                    <span class="ml-4">{{ item.frequency }}</span>

                    <v-list-tile-action>
                      <v-btn icon @click="addFrequency(item)">
                        <v-icon>add_circle_outline</v-icon>
                      </v-btn>
                    </v-list-tile-action>
                  </v-list-tile>

                  <v-divider></v-divider>
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
