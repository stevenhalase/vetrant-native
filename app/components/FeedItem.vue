<template>
  <FlexboxLayout>
    <FlexboxLayout flexDirection="column">
      <Button text="+" />
      <Label :text="numLikes" />
      <Button text="-" />
      <Label :text="numDislikes" />
    </FlexboxLayout>
    <FlexboxLayout flexDirection="column">
      <FlexboxLayout>
        <FlexboxLayout>
            <Image class="user-avatar" :src="`data:${item.user.image.type};base64,${item.user.image.data}`" />
            <Label :text="username" />
        </FlexboxLayout>
        <FlexboxLayout>
          <Label :text="item.date" />
        </FlexboxLayout>
      </FlexboxLayout>
      <FlexboxLayout flexDirection="column">
        <Label :text="item.title" />
        <Image v-if="item.image" class="post-image" :src="`data:${item.image.type};base64,${item.image.data}`" />
        <Image v-if="item.giphyUrl" class="post-image" :src="item.giphyUrl" />
        <TextView :text="item.content" editable="false" />
      </FlexboxLayout>
      <FlexboxLayout>
        <Button :text="commentsLinkText" />
      </FlexboxLayout>
    </FlexboxLayout>
  </FlexboxLayout>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'feed-item',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      commentsOpen: false
    };
  },
  computed: {
    ...mapState({
      user: state => state.user,
    }),
    username() {
      return this.item.user.name ? this.item.user.name : this.item.user.username;
    },
    numLikes() {
      return this.item && this.item.likes ? this.item.likes.length : 0;
    },
    numDislikes() {
      return this.item && this.item.dislikes ? this.item.dislikes.length : 0;
    },
    commentsLinkText() {
      return this.item.comments ? this.item.comments.length !== 1 ? `${this.item.comments.length} Replies` : `${this.item.comments.length} Reply` : '0 Replies';
    },
    liked() {
      return this.item && this.item.likes ? this.item.likes.find(l => l.user === this.user._id) : false;
    },
    disliked() {
      return this.item && this.item.dislikes ? this.item.dislikes.find(d => d.user === this.user._id) : false;
    }
  },
  methods: {
    toggleComments() {
      this.commentsOpen = !this.commentsOpen;
    },
    like() {
      const like = {
        user: this.user._id,
        post: this.item._id
      };
      this.$store.dispatch('CREATE_LIKE', like);
    },
    dislike() {
      const dislike = {
        user: this.user._id,
        post: this.item._id
      };
      this.$store.dispatch('CREATE_DISLIKE', dislike);
    }
  }
}
</script>

<style scoped>

</style>
