import deepFreeze from 'deep-freeze'
import counterReducer from './reducer'

describe('unicafe reducer', () => {
    const initialState = {
        good: 0,
        ok: 0,
        bad: 0
    }

    test('should return a proper initial state when called with undefined state', () => {
        const state = {}
        const action = {
            type: 'DO_NOTHING'
        }

        const newState = counterReducer(undefined, action)
        expect(newState).toEqual(initialState)
    })

    test('good is incremented', () => {
        const action = {
            type: 'GOOD'
        }
        const state = initialState

        deepFreeze(state)
        const newState = counterReducer(state, action)
        expect(newState).toEqual({
            good: 1,
            ok: 0,
            bad: 0
        })
    })
    test('increment all', () => {

        const state = initialState

        deepFreeze(state)
        const newState1 = counterReducer(state, {type: "GOOD"})
        deepFreeze(newState1)
        const newState2 = counterReducer(newState1, {type: "OK"})
        deepFreeze(newState2)
        const newState3 = counterReducer(newState2, {type: "BAD"})
        expect(newState3).toEqual({
            good: 1,
            ok: 1,
            bad: 1
        })
    })
    test('zeroes', () => {

        const state = initialState

        deepFreeze(state)
        const newState1 = counterReducer(state, {type: "GOOD"})
        deepFreeze(newState1)

        const newState2=counterReducer(newState1,{type:"ZERO"})
        expect(newState2).toEqual({
            good: 0,
            ok: 0,
            bad: 0
        })
    })
})