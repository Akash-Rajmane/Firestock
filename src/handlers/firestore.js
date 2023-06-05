import {
  serverTimestamp,
  setDoc,
  doc,
  getDocs,
  collection,
} from "firebase/firestore";
import { db } from "../lib/firebase.config";

const Firestore = {
  readDocs: (...args) => {
    const [collection_name] = args;
    let docs = [];
    const ref = collection(db, collection_name);

    return new Promise(async (resolve, reject) => {
      try {
        const snapshots = await getDocs(ref);

        snapshots.forEach((doc) => {
          const d = { ...doc.data(), id: doc.id };
          docs.push(d);
          resolve(docs);
        });
      } catch (e) {
        reject(e);
        console.log(e);
      }
    });
  },

  writeDoc: (...args) => {
    const [inputs, collection_name] = args;
    return new Promise(async (resolve) => {
      try {
        const randomIndex = Math.floor(Math.random() * 1000000000);
        const docRef = doc(db, collection_name, `${randomIndex}`);
        await setDoc(docRef, {
          title: inputs.title,
          path: inputs.path,
          createdAt: serverTimestamp(),
          username: inputs.username,
          useremail: inputs.useremail,
        });
        resolve("New doc inserted successfully");
      } catch (e) {
        console.log(e);
      }
    });
  },
};

export default Firestore;
