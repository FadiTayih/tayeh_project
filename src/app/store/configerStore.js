import { createStore } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';
import rootReducer from './rootReducer';

export default function ConfigStore() {
  return createStore(rootReducer, devToolsEnhancer());
}
