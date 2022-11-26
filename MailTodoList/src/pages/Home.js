import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout , addTodo, deleteTodo} from "../firebase";
import { logout as logoutHandle } from "../store/auth"
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Home() {


const navigate = useNavigate()
const dispatch = useDispatch()    
const {user} = useSelector(state => state.auth)
const {todos} = useSelector ( state => state.todos)

const [todo, setTodo] = useState('')
const submitHandle = async e => {
     e.preventDefault()
     await addTodo({
        todo,
        uid: user.uid
     })
   setTodo ('')
}



const handleDelete = async id => {
   await deleteTodo(id)
}

const handleLogout = async () => {
    await logout()
    dispatch(logoutHandle())
    navigate('/login' , { replace: true }) 
}

if (user) {
  return  (
  <div className="max-w-xl mx-auto py-5">
      <h1 className="flex gap-x-4 items-center">
        Oturumun Açık ({user.email})
        <button onClick={handleLogout} className="h-8 rounded px-4 text-sm text-white bg-indigo-900">Çıkış yap</button>
      </h1>

<form className="flex gap-x-4 mt-4" onSubmit={submitHandle}>
  <input type="text" placeholder="Todo yaz"  onClick={e=> setTodo(e.target.value)} classname="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-100 rounded-md"/>
  <button disabled={!todo} className="disable:opacity-100 bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"type="submit"> Ekle </button>
</form>


<ul className="mt-4 flex flex-col gap-y-2">
    {todos.map(todo => (
        <li key={todo.id} className="p-4 flex justify-between items-center rounded bg-indigo-50 text-sm text-indigo-700">
            {todo.todo}
            <button onClick={() => handleDelete(todo.id)} className="h-7 rounded px-3 text-xs bg-indigo-700 text-white">
                Sil
            </button>
        </li>
    ))}
</ul>

  </div>
  )
}

    return (
        <div class= " text-center py-10 px-4 " >
            <Link class="bg-red-500  text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded" to="/register">Kayıt ol</Link>
            <Link class="bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded" to="/login">Giris yap</Link>
          
        </div>
    )
} 
