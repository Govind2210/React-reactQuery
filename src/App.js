import { useQuery } from "@tanstack/react-query";
import { Form } from "./Component/Form";
function App() {
  const { data } = useQuery({
    queryKey: ["todos"],
    queryFn: async () =>
      await (await fetch("http://localhost:9000/todo")).json()
  });
  console.log("data", data);

  return (
    <div className="App">
      <Form />
      <div>
        <ul>
          {data?.data?.map((todo) => (
            <span key={todo.id}>
              <li style={{ color: "black" }}>Created : {todo.createdAt}</li>
              <p>Title : {todo.title}</p>
              <p>Status : {todo.isCompleted == false ? "Pending" : "Completed"}</p>
            </span>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;