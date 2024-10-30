import { deleteTodo, setTodo } from "./todosReducer";
import { useDispatch } from "react-redux";

export default function TodoItem({
  todo,
}: {
  todo: { id: string; title: string };
}) {
  const dispatch = useDispatch();
  return (
    <li key={todo.id} className="list-group-item">
      <button onClick={() => dispatch(deleteTodo(todo.id))} className="btn btn-danger">Delete </button>
      <button onClick={() => dispatch(setTodo(todo))} className="btn btn-primary">Edit </button>
      {todo.title}
    </li>
  );
}