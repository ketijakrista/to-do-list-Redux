import { Filters } from './store';

export function add(item: string): { type: 'add', payload: string } {
    return { type: 'add', payload: item };
}

export function remove(id: number): { type: 'remove', payload: number } {
    return { type: 'remove', payload: id };
}

export function toggle(id: number): { type: 'toggle', payload: number } {
    return { type: 'toggle', payload: id };
}

export function setFilter(name: any): { type: 'setFilter', payload: Filters } {
    return { type: 'setFilter', payload: name };
}

export type ActionType = ReturnType<typeof add> | ReturnType<typeof toggle> | ReturnType<typeof setFilter> | ReturnType<typeof remove>