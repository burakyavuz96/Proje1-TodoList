import { useState } from "react";
import { register } from "../firebase";


export default function Register() {


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = await register(email, password);
     
  }
  return (
    <form
      className="max-w-xl mx-auto grid gap y-4 py-4" onSubmit={handleSubmit}>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          E-posta
        </label>
        <div className="mt-1">
          <input
            type="email"
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            placeholder="you@example.com"
            value={email} onChange={(e) => setEmail(e.target.value)} />
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
            value={password} onChange={(e) => setPassword(e.target.value)}/>
        </div>
      </div>

      <div>
        <button disabled={!email || !password}
          className="disable: opacity-100 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-10 rounded"
          type="submit">
          Kayıt ol
        </button>
      </div>
    </form>
  );
}
