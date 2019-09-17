import { createStore } from 'redux';
import { ActionType } from './actions'

export interface Item {
    isDone: boolean;
    name: string;
}

export enum Filters {
    All,
    Completed,
    Selected
}

export interface ItemState {
    items: Item[];
    filterSelected: Filters;
}

const initialState: ItemState = { items: [], filterSelected: Filters.All };

function reducer(state = initialState, action: ActionType): ItemState {
    switch (action.type) {
        case 'add':
            if (!action.payload) {
                return state;
            }
            return {
                ...state,
                items: [...state.items, { name: action.payload, isDone: false }]
            };
        case 'remove':
                state.items.splice(action.payload, 1)
            return {
                ...state,
                items: [...state.items]
            }
        case 'toggle':
            return {
                ...state,
                items: state.items.map((item, index) => index === action.payload ? { ...item, isDone: !item.isDone } : item)
            }
        case 'setFilter':
            return {
                ...state,
                filterSelected: action.payload
            }
    }return state;
}

export const store = createStore(
    reducer,
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__());