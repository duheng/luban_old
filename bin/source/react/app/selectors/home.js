import { createSelector, } from 'reselect';


const getHome = state => {
  const { movies, } = { ...state.home, };
  return {
    movies
  };
};

export default createSelector(getHome, (home) => {
  console.log('redu-js--', getHome);
  return {
    home,
  };
});
