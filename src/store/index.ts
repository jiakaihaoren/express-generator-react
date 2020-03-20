import { createStore, Store } from 'redux';
import { create } from 'redux-react-hook';
// eslint-disable-next-line import/extensions
import reducer from '../reducer';

export interface IState {
  show: boolean;
}

export interface Action {
    type: 'show';
    payload: boolean;
}

export const INITIAL_STATE: IState = {
  show: false,
};

export function makeStore(): Store<IState, Action> {
  return createStore(reducer, INITIAL_STATE);
}

export const { StoreContext, useDispatch, useMappedState } = create<
  IState,
  Action,
  Store<IState, Action>
>();
