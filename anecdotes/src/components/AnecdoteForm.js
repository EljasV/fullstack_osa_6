import {createAnecdote} from "../reducers/anecdoteReducer";
import {useDispatch} from "react-redux";
import {setNotification} from "../reducers/notificationReducer";

const AnecdoteForm = props => {
    const dispatch = useDispatch()

    const onSubmit = async event => {
        event.preventDefault();
        console.log(event.target)
        const content = event.target.anecdoteInput.value
        event.target.anecdoteInput.value = ""

        dispatch(createAnecdote(content))

        dispatch(setNotification(`You added ${content}`, 5))
    };

    return <>
        <h2>create new</h2>
        <form onSubmit={onSubmit}>
            <div><input name="anecdoteInput"/></div>
            <button>create</button>
        </form>
    </>;
};

export default AnecdoteForm