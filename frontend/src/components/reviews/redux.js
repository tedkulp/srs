import _ from 'lodash';
import update from 'immutability-helper';
import { createAction, createReducer } from 'redux-act';

import { req } from '../../util/api';

export const actions = {
  loadStart: createAction('start load'),
  loadSuccess: createAction('successful load'),
  loadError: createAction('failed load'),
  setNewItem: createAction('set a new item'),
  removeItem: createAction('remove an item'),
};

const initialState = {
  loading: false,
  currentItem: undefined,
  vocabItems: [],
};

const findIdx = (items, item) => {
  return items.findIndex(g => g.data._id === item.data._id && g.language === item.language);
};

const sliceVocabItem = (state, payload) => {
  return { vocabItems: { $splice: [[findIdx(state.vocabItems, payload), 1]] } }
};

const createDataObjects = data => _.flatten(data.map(item => [
  {
    language: 'japanese',
    data: item,
  },
  {
    language: 'english',
    data: item,
  },
]));

export const reducer = createReducer({
  [actions.loadStart]: state => ({ ...state, loading: true, currentItem: undefined }),
  [actions.loadSuccess]: (state, payload) => ({ ...state, loading: false, vocabItems: payload }),
  [actions.loadError]: (state, payload) => ({ ...state, loading: false, error: payload }),
  [actions.setNewItem]: (state, payload) => ({ ...state, currentItem: payload }),
  [actions.removeItem]: (state, payload) => update(state, sliceVocabItem(state, payload)),
}, initialState);

export function loadVocabItems() {
  return dispatch => {
    dispatch(actions.loadStart());
    return req('get', '/random-words')
      .then(response => createDataObjects(response.data))
      .then(data => dispatch(actions.loadSuccess(data)))
      .catch(error => dispatch(actions.loadError(error)));
  };
};

export function getNewItem(store) {
  const vocabItems = store.getState().reviews.vocabItems;
  return actions.setNewItem(_.sample(vocabItems));
};
