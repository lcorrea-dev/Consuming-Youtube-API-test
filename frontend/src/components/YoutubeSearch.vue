<template>
  <q-page>
    <div class="row flex-center">
      <form @submit.prevent="getYoutubeVideos" class="q-pa-md col-8 ">
        <q-input
          filled
          color="teal"
          hint="Type keywords to search, then hit Enter key."
          v-model="inputText"
          :rules="[ val => val.length <= 256 || 'Please use maximum 256 characters']"
        />
        <div class="row justify-center">
          <q-btn
            type="submit"
            :loading="this.submitting"
            label="Search in youtube videos"
            class="q-mt-md"
            color="teal"
          >
            <template v-slot:loading>
              <q-spinner-facebook />
            </template>
          </q-btn>
        </div>
      </form>
    </div>
    <div>
      <q-infinite-scroll
        class="row justify-around q-gutter-md q-mt-md"
        @load="getNextYoutubeVideosPage"
        :offset="250"
      >
        <q-card
          class="my-card"
          style="max-width:400px"
          v-for="result in results"
          :key="result.url"
        >
          <a :href="result.url"><img :src="result.thumbnail" style="width:400px"></a>
          <q-card-section>
            <div class="text-h6">{{ result.title }}</div>
            <div class="text-subtitle2">{{ result.description }}</div>
          </q-card-section>
        </q-card>
        <template v-slot:loading class="col-12">
          <div class="row col-12 justify-center q-my-md" style="width: 400px">
            <q-spinner-dots color="primary" size="40px" />
          </div>
        </template>
      </q-infinite-scroll>
    </div>

    <q-dialog v-model="errorToolbar">
      <q-card>
        <q-toolbar>
          <q-toolbar-title><span class="text-weight-bold">Warning</span></q-toolbar-title>
          <q-btn flat round dense icon="close" v-close-popup />
        </q-toolbar>
        <q-card-section class="q-my-md text-center" >
          <q-avatar icon="warning" color="info" text-color="white" class="q-mx-md" />
          <span>
            {{ this.errorText }}
            <br>
            <span class="text-weight-bold">Please try again</span>.
          </span>
        </q-card-section>
      </q-card>
    </q-dialog>

  </q-page>
</template>

<style>
</style>

<script>
import { ref } from 'vue';
import axios from 'axios';
import { validateInputText, getResponseErrorText } from '@/utils/utils';

export default {
  name: 'YoutubeSearch',
  setup() {
    const inputText = ref('');
    return {
      inputText,
    };
  },
  data() {
    return {
      results: [],
      submitting: false,
      errorToolbar: false,
      errorText: '',
      nextPageToken: '',
    };
  },
  methods: {
    getYoutubeVideos() {
      try {
        validateInputText(this.inputText);
      } catch (error) {
        this.errorToolbar = true;
        this.errorText = error.message;
        return;
      }
      this.submitting = true;
      axios.get(`${process.env.VUE_APP_API_HOST}/api/v1/youtube-search/${this.inputText}`).then((response) => {
        this.nextPageToken = response.data.nextPageToken;
        this.results = response.data.items;
        this.submitting = false;
      }).catch((e) => {
        this.errorToolbar = true;
        this.errorText = getResponseErrorText(e);
        this.submitting = false;
      });
    },
    getNextYoutubeVideosPage(index, done) {
      if (this.results.length === 0 || !this.nextPageToken) {
        done();
        return;
      }
      axios.get(`${process.env.VUE_APP_API_HOST}/api/v1/youtube-search/${this.inputText}/${this.nextPageToken}`).then((response) => {
        const expectedResultCountForPage = 36;
        if (response.data.count < expectedResultCountForPage) {
          this.nextPageToken = '';
        } else {
          this.nextPageToken = response.data.nextPageToken;
        }
        this.results.push(...response.data.items);
        done();
      }).catch((e) => {
        this.errorToolbar = true;
        this.errorText = getResponseErrorText(e);
        done();
      });
    },
  },
};

</script>
