import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../firebase";
import { useNavigate } from "react-router-dom";                                         /* navigate import ettim  */
import { login as loginHandle } from "../store/auth";


export default function Login() {
  const navigate = useNavigate()
  const dispatch =useDispatch()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = await login(email, password)
    
 

    if (user) {                                                                    /* user ı kontrol ediyorum  */ 
    dispatch(loginHandle(user))                                             /* loginhandle içerisine user bilgisini verip oturumu başlatıcam  */ 
    navigate ( '/', {                                                     /* navigate ile yönlendirme yaptım . git anasayfaya  replace true olarak */
    replace: true
  })  
}
  };


  return (
    <form
      className="max-w-xl mx-auto grid gap y-4 py-4"
      onSubmit={handleSubmit}
    >
      <div>
        <label className="block text-sm font-medium text-gray-700">
          E-posta
        </label>
        <div className="mt-1">
          <input
            type="email"
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}/>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Parola
        </label>
        <div className="mt-1">
          <input
            type="password"
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            placeholder="******"
            value={password}
            onChange={(e) => setPassword(e.target.value)}/>
        </div>
      </div>

      <div>
        <button
          disabled={!email || !password}
          className="disable: opacity-100 bg-green-700 hover:bg-green-500 text-white font-bold py-2 px-10 rounded"
          type="submit">
          Giriş yap
        </button>
      </div>
    </form>
  );
}
