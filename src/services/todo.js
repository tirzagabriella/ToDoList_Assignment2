import { addDoc, collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { db } from "./firebase-auth";

export const getTasks = async (user) => {
  try {
    const uid = user.uid;
    const tasksRef = collection(db, "tasks");
    const q = query(tasksRef, where("userId", "==", uid));
    const querySnapshot = await getDocs(q);

    let res = [];
    querySnapshot.forEach((doc) => {
      res.push({
        id: doc.id,
        title: doc.data()["task"],
        completed: doc.data()["completed"],
        datetime: doc.data()["datetime"],
      });
    });

    return res;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const addTask = async (task, datetime, uid) => {
  try {
    const docRef = await addDoc(collection(db, "tasks"), {
      task: task,
      completed: false,
      datetime: datetime,
      userId: uid,
    });
    // console.log("Document written with ID: ", docRef.id);
  } catch (error) {
    console.log("Error adding task : ", error);
  }
};

export const editTask = async (taskId, title, completed) => {
  try {
    await updateDoc(doc(db, "tasks", taskId), {
      task: title,
      completed: completed
    });
  } catch (error) {
    console.log("Error updating data : ", error);
  }
};
