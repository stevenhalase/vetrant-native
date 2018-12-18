<template>
  <ListView for="item in displayedFeedItems">
    <v-template>
      <FeedItem :item="item" />
    </v-template>
  </ListView>
</template>

<script>
import FeedItem from '@/components/FeedItem.vue';
import { mapState } from 'vuex';

export default {
  name: 'feed',
  data() {
    return {
      end: this.feed ? this.feed.items.length > 10 ? 10 : this.feed.items.length : 10
    }
  },
  computed: {
    ...mapState({
      channels: state => state.channels,
      feed: state => state.feed
    }),
    sortedFeedItems() {
      const feedItems = Array.from(this.feed.items);
      return feedItems.sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
      });
    },
    displayedFeedItems() {
      const feedItems = Array.from(this.sortedFeedItems);
      return feedItems.slice(0, this.end);
    },
    showingAllFeedItems() {
      return this.end === this.feed.items.length;
    }
  },
  beforeMount() {
    this.$store.dispatch('GET_CHANNELS');
  },
  components: {
    FeedItem
  }
}
</script>

<style scoped>

</style>
