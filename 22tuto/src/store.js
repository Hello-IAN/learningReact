import { createStore, action, thunk, computed } from "easy-peasy";
import api from './api/posts';

/* keep all state and action */
export default createStore({
	posts: [],
	setPosts: action((state, payload) => {
		state.posts = payload;
	}),
	postTitle: '',
	setPostTitle: action((state, payload) => {
		state.postTitle = payload;
	}),
	postBody: '',
	setPostBody: action((state, payload) => {
		state.postBody = payload;
	}),
	editTitle: '',
	setEditTitle: action((state, payload) => {
		state.editTitle = payload;
	}),
	editBody: '',
	setEditBody: action((state, payload) => {
		state.editBody = payload;
	}),
	search: '',
	setSearch: action((state, payload) => {
		state.search = payload;
	}),
	searchResults: '',
	setSearchResults: action((state, payload) => {
		state.searchResults = payload;
	}),
	postCount: computed((state) => state.posts.length),
	getPostById: computed((state) => {
		return (id) => state.posts.find(post => (post.id).toString() === id);
	}),
	savePost: thunk(async (actions, newPosts, helpers) => {
		const { posts } = helpers.getState();
		try {
			const response = await api.post('/posts', newPosts); /* sending a new data to server using axios */
			actions.setPosts([ ...posts, response.data]);
			actions.setPostTitle(''); /* PostTitle초기화 */
			actions.setPostBody(''); /* postBody초기화 */
		} catch(err) {
			console.log(`Error. ${err.message}`);
		}
	}),
	deletePost: thunk(async (actions, id, helpers) => {
		const { posts } = helpers.getState();
		try {
			await api.delete(`/posts/${id}`)
			actions.setPosts(posts.filter(post => post.id !== id));
		} catch (err) {
			console.log(`Error. ${err.message}`);
		}
	}),
	editPost: thunk(async (actions, updatedPost, helpers) => {
		const { posts } = helpers.getState();
		const { id } = updatedPost;
		try {
			const response = await api.put(`/posts/${id}`, updatedPost)
			actions.setPosts(posts.map(post => post.id === id ? { ...response.data } : post)) /* //업데이트 된것만 던짐 */
			actions.setEditTitle('');
			actions.setEditBody('');
		} catch(err) {
			console.log(`Error. ${err.message}`);
		}
	})

})