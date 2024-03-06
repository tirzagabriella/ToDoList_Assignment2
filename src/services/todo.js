// import { getAuth } from "firebase-admin/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "./firebase-auth";

export const getTasks = async () => {
  try {
    const uid = auth.currentUser.uid;

    const tasksRef = collection(db, "tasks");
    const q = query(tasksRef, where("userId", "==", uid));
    const querySnapshot = await getDocs(q);
    

    let res = []
    querySnapshot.forEach((doc) => {
      res.push({
        id: doc.id,
        title: doc.data()["task"],
        completed: doc.data()["completed"],
        datetime: doc.data()["datetime"]
      })
    });

    console.log(res)

    return res;
  } catch (error) {
    console.log(error);
    throw new Error(error)
  }
};
