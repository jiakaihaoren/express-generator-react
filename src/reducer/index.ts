// Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved

import { Action, IState, INITIAL_STATE } from '../store';

export default function reducer(state: IState = INITIAL_STATE, action: Action) {
  switch (action.type) {
    case 'show': {
      return {
        ...state,
        show: action.payload,
      };
    }

    default:
      return state;
  }
}
