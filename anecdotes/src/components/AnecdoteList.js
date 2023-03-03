import {vote} from "../reducers/anecdoteReducer";
import {useDispatch, useSelector} from "react-redux";
import {displayMessage, reset, setNotification} from "../reducers/notificationReducer";


const AnecdoteList = props => {
    const anecdotes = useSelector(state => {
        return state.anecdote.filter(anecdote => anecdote.content.includes(state.filter));
    })
    const dispatch = useDispatch()

    return (
        <div>
            {anecdotes.map(anecdote => {
                    const onClick = () => {
                        dispatch(setNotification(`You voted for ${anecdote.content}`, 5))
                        return dispatch(vote(anecdote.id));
                    };
                    return <div key={anecdote.id}>
                        <div>
                            {anecdote.content}
                        </div>
                        <div>
                            has {anecdote.votes}
                            <button onClick={onClick}>vote</button>
                        </div>
                    </div>;
                }
            )}

        </div>);
}

export default AnecdoteList