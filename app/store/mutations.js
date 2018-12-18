export default {
  SET_THEME(state, payload) {
    localStorage.setItem('vr_theme', JSON.stringify(payload));
    state.theme = payload;
  },
  SET_LOADING(state, payload) {
    state.loading = payload;
  },
  SET_USER(state, payload) {
    localStorage.setItem('vr_user', JSON.stringify(payload));
    state.user = payload;
  },
  SET_CHANNELS(state, payload) {
    state.channels = payload;
  },
  SET_SELECTED_CHANNEL(state, payload) {
    state.selectedChannel = payload;
  },
  SET_POSTS(state, payload) {
    state.feed.items = payload;
  },
  APPEND_POST_COMMENT(state, payload) {
    const postInd = state.feed.items.findIndex(p => p._id === payload.post);
    state.feed.items[postInd].comments.push(payload);
  },
  APPEND_POST_LIKE(state, payload) {
    const postInd = state.feed.items.findIndex(p => p._id === payload.post);
    state.feed.items[postInd].likes.push(payload);
  },
  APPEND_POST_DISLIKE(state, payload) {
    const postInd = state.feed.items.findIndex(p => p._id === payload.post);
    state.feed.items[postInd].dislikes.push(payload);
  },
  APPEND_COMMENT_LIKE(state, payload) {
    for (const post of state.feed.items) {
      for (const comment of post.comments) {
        if (comment._id === payload.comment) {
          comment.likes.push(payload);
          return;
        }
      }
    }
  },
  APPEND_COMMENT_DISLIKE(state, payload) {
    for (const post of state.feed.items) {
      for (const comment of post.comments) {
        if (comment._id === payload.comment) {
          comment.dislikes.push(payload);
          return;
        }
      }
    }
  },
  SET_RECENT_ACTIVITY(state, payload) {
    state.profile.recentActivity = payload;
  },
}