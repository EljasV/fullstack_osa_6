import {useMutation, useQueryClient} from "react-query";
import {createAnecdote} from "../requests";
import {useNotificationDispatch} from "../NotificationContext";

const AnecdoteForm = () => {
    const queryClient = useQueryClient()
    const notificationDispatch = useNotificationDispatch()

    const newAnecdoteMutation = useMutation(createAnecdote, {
        onSuccess: () => {
            queryClient.invalidateQueries("anecdotes")
        },
        onError: (err) => {
            if (err.code === "ERR_BAD_REQUEST") {
                notificationDispatch({type: "SET", payload: "Too short anecdote, must have length of 5 or more."})
                setTimeout(() => {
                    notificationDispatch({type: "RESET"})
                }, 5000)
            }
        }
    })

    const onCreate = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        console.log('new anecdote')
        newAnecdoteMutation.mutate({content, votes: 0})
        notificationDispatch({type: "SET", payload: `Created ${content}`})
        setTimeout(() => {
            notificationDispatch({type: "RESET"})
        }, 5000)
    }

    return (
        <div>
            <h3>create new</h3>
            <form onSubmit={onCreate}>
                <input name='anecdote'/>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm
