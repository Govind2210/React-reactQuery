export const Form = () => {
    const queryClient = useQueryClient();

    const [text ,setText] = useState('');

    const createTods = (text) => {
        return () => fetch('http://localhost:9000/todo/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: text
            })
        })
    }

    const todoMutation = useMutation({
        mutationFn : createTods(text),
        onSuccess: () => {
            console.log("sucess Message")
            queryClient.invalidateQueries({ queryKey: ['todos'] })
            setText('')
        },
        onError: () => {
            console.log("Error Message")
        }
    })

  return (
    <div>
        <div>TODO WITH REACT QUERY</div>
        <div>
            <input onChange={e => setText(e.target.value)} value={text} type="text" />
            <button onClick={e => todoMutation.mutate()} >Create</button>
        </div>
    </div>
  )
}