import React, { useEffect, useState } from 'react';
import type { Route } from './+types/home';

// export function meta({}: Route.MetaArgs) {
//     return [
//         { title: 'New React Router App' },
//         { name: 'description', content: 'Welcome to React Router!' },
//     ];
// }

import {useReducer} from 'react';
import {Item} from "~/components/item";

interface State {
    count: number
};

type CounterAction =
    | { type: "reset" }
    | { type: "setCount"; value: State["count"] }

const initialState: State = { count: 0 };

function stateReducer(state: State, action: CounterAction): State {
    switch (action.type) {
        case "reset":
            return initialState;
        case "setCount":
            return { ...state, count: action.value };
        default:
            throw new Error("Unknown action");
    }
}

export default function Home() {
    const [state, dispatch] = useReducer(stateReducer, initialState);

    const addFive = () => dispatch({ type: "setCount", value: state.count + 5 });
    const reset = () => dispatch({ type: "reset" });

    return (
        <div>
            <h1>Welcome to my counter</h1>

            <p>Count: {state.count}</p>
            <button onClick={addFive}>Add 5</button>
            <button onClick={reset}>Reset</button>

            <button className={'btn btn--special'} >+ Pridaj</button>
        </div>
    );
}
