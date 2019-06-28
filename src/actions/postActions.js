import {
  START_FETCH,
  FETCH_POSTS,
  START_POST,
  NEW_POST,
  CLICK_MENU
} from "./types";

export const fetchPosts = () => dispatch => {
  dispatch({ type: START_FETCH, payload: "start FETCH >>>" });
  fetch("https://jsonplaceholder.typicode.com/posts")
    .then(res => res.json())
    .then(posts =>
      dispatch({
        type: FETCH_POSTS,
        payload: posts
      })
    );
};

export const createPost = postData => dispatch => {
  //start request
  dispatch({ type: START_POST, payload: "start POST >>>" });
  return fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(postData)
  })
    .then(res => res.json())
    .then(post =>
      dispatch({
        type: NEW_POST,
        payload: post
      })
    );
};

export const clickMenu = menuId => dispatch => {
  dispatch({
    type: CLICK_MENU,
    menuId
  });
};
