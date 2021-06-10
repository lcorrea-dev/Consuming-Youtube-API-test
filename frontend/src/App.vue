<template>
  <q-layout view="lHh Lpr lFf">

    <q-header elevated class="glossy">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
          icon="menu"
        />
        <q-toolbar-title>
          Youtube search APP
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered class="bg-grey-2">
      <q-list>
        <q-item-label header>Technical test by
          <span class="text-weight-bold">Luis Correa</span>
        </q-item-label>
        <q-item clickable tag="a" target="_blank" href="https://github.com/quasarframework/">
          <q-item-section avatar>
            <q-icon name="code" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Github repository for this project</q-item-label>
            <q-item-label caption>github.com/quasarframework</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" target="_blank" href="mailto: l.correa.bruna@gmail.com">
          <q-item-section avatar>
            <q-icon name="email" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Email</q-item-label>
            <q-item-label caption>l.correa.bruna@gmail.com</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" target="_blank" href="https://github.com/lcorrea-dev/">
          <q-item-section avatar>
            <q-icon name="rss_feed" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Github profile</q-item-label>
            <q-item-label caption>@lcorrea-dev</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" target="_blank" href="https://www.linkedin.com/in/luis-correa-bruna-19510084/">
          <q-item-section avatar>
            <q-icon name="feed" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Linkedin</q-item-label>
            <q-item-label caption>Luis Correa Bruna</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <YoutubeSearch />
    </q-page-container>

  </q-layout>
</template>

<script>
import { ref } from 'vue';
import YoutubeSearch from './components/YoutubeSearch.vue';

export default {
  name: 'LayoutDefault',

  components: {
    YoutubeSearch,
  },

  setup() {
    return {
      leftDrawerOpen: ref(false),
    };
  },
};
</script>
