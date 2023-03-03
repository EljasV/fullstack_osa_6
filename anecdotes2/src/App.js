import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import {useMutation, useQuery, useQueryClient} from "react-query";
import {getAnecdotes, updateAnecdote} from "./requests";
import {useNotificationDispatch} from "./NotificationContext";

const App = () => {
    const notificationDispatch = useNotificationDispatch()

    const queryClient = useQueryClient()
    const anecdoteVoteMutation = useMutation(updateAnecdote, {onSuccess: () => queryClient.invalidateQueries("anecdotes")})

    const handleVote = (anecdote) => {
        anecdoteVoteMutation.mutate({id: anecdote.id, anecdote: {...anecdote, votes: anecdote.votes + 1}})
        notificationDispatch({type: "SET", payload: `Voted for ${anecdote.content}`})
        setTimeout(() => {
            notificationDispatch({type: "RESET"})
        }, 5000)
    }

    const result = useQuery("anecdotes", getAnecdotes, {retry: 1})

    if (result.isLoading) {
        return <div>loading data...</div>
    }
    if (result.isError) {
        return <h1>anecdote service not available due to problems in server</h1>
    }

    const anecdotes = result.data


    return (
        <div>
            <h3>Anecdote app</h3>

            <Notification/>
            <AnecdoteForm/>

            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => handleVote(anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default App
