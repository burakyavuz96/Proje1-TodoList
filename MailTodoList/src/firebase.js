import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut,} from "firebase/auth";
import { getFirestore, collection, addDoc, deleteDoc, onSnapshot, doc} from "firebase/firestore";
import toast from "react-hot-toast";
import store from "./store";
import { setTodos } from "./store/todos";

const firebaseConfig = {
  apiKey: "AIzaSyA7CgFSTQZgVvRLRW9kllZxE9DNx6dQERA",
  authDomain: "notlist-d7a99.firebaseapp.com",
  projectId: "notlist-d7a99",
  storageBucket: "notlist-d7a99.appspot.com",
  messagingSenderId: "353235760987",
  appId: "1:353235760987:web:44de89f33cceb6bbfccc7e",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);


export const register = async (email, password) => {
  try {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return user
  } catch (error) {
    toast.error(error.message);
  }
};

export const login = async (email, password) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    return user
  } catch (error) {
    toast.error(error.message);
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
    return true;
  } catch (error) {
    toast.error(error.message);
  }
};

export const addTodo= async data => {
  const result = await addDoc (collection(db, 'todos'), data)
  console.log(result.id)
}

onSnapshot(collection(db, 'todos'), (doc) => {
  store.dispatch(
    setTodos(
      doc.docs.reduce((todos, todo)=> [ ... todos, todo.data()], [])                            /* todo bilgisi giriş burası     */
    )
  )  

});

export const deleteTodo = async id => {
  try {
  await deleteDoc(doc(db, "todos", id))
  } catch (error) {
     toast.error(error.message)
  }                                                                                          /* todo bilgisi giriş burası     */
}

export default app;
