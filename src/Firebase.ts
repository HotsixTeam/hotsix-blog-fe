import { initializeApp } from 'firebase/app';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDPVkgzrSDgz0x5Kp9u3F_1tnMy5f80Gxo',
  authDomain: 'hotsix-blog-5f9b1.firebaseapp.com',
  projectId: 'hotsix-blog-5f9b1',
  storageBucket: 'hotsix-blog-5f9b1.appspot.com',
  messagingSenderId: '626143740589',
  appId: '1:626143740589:web:7ae3a47537750974563c24',
  measurementId: 'G-HBVFK071KV',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage();

export const uploadImageToFirebase = async (file: File): Promise<string> => {
  const storageRef = ref(storage, `image/${Date.now()}`);
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);
  return url;
};
