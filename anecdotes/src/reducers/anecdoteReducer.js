import {createSlice} from "@reduxjs/toolkit";
import {displayMessage} from "./notificationReducer";
import {useDispatch} from "react-redux";
import anecdoteService from "../services/anecdotes"

const anecdotesAtStart = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]


const getId = () => (100000 * Math.random()).toFixed(0)


const anecdoteSlice = createSlice({
    name: "anecdote",
    initialState: [],
    reducers: {
        updateAnecdote(state, action) {
            const id = action.payload.id
            const changedAnecdote = action.payload.body
            console.log(action.payload)
            return state.map(anecdote => anecdote.id !== id ? anecdote : changedAnecdote).sort((a, b) => b.votes - a.votes)
        },
        appendAnecdote(state, action) {
            return [...state, action.payload].sort((a, b) => b.votes - a.votes)
        },
        setAnecdotes(state, action) {
            return action.payload.sort((a, b) => b.votes - a.votes)
        }
    }
})


export const {appendAnecdote, updateAnecdote, setAnecdotes} = anecdoteSlice.actions

export const initializeAnecdotes = () => {
    return async dispatch => {
        const anecdotes = await anecdoteService.getAll()
        dispatch(setAnecdotes(anecdotes))
    }
}

export const createAnecdote = content => {
    return async (dispatch) => {
        const newAnecdote = await anecdoteService.createNew(content)
        dispatch(appendAnecdote(newAnecdote))
    }
}
export const vote = (id) => {
    return async (dispatch, getState) => {
        const toBeVoted = getState().anecdote.find(other => other.id === id);
        const updated = await anecdoteService.update(id, {...toBeVoted, votes: toBeVoted.votes + 1})
        dispatch(updateAnecdote({id: id, body: updated}))
    }
}

export default anecdoteSlice.reducer