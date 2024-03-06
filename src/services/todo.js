// import { getAuth } from "firebase-admin/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "./firebase-auth";

export const getTasks = async (user) => {
  try {
    const uid = user.uid;
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

    return res;
  } catch (error) {
    console.log(error);
    throw new Error(error)
  }
};
