import {
  doc,
  deleteDoc,
  updateDoc,
  addDoc,
  collection,
} from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import db from '@/libs/db';
import { NewPlaceForm } from '@/types/place';

export const deletePlace = async (placeId: string) => {
  const placeRef = doc(db, 'places', placeId);
  await deleteDoc(placeRef);
};

export const updatePlace = async (
  placeId: string,
  placeData: Partial<NewPlaceForm>
) => {
  const placeRef = doc(db, 'places', placeId);

  await updateDoc(placeRef, placeData);
};

const encodeFileName = (fileName: string) => {
  const utf8FileName = new TextEncoder().encode(fileName);
  const binary = String.fromCharCode(...utf8FileName);
  return btoa(binary);
};

export const uploadImgs = async (files: File[]) => {
  let imgUrls: string[] = [];

  if (files.length > 0) {
    const storage = getStorage();
    const uploadPromises = files.map((file) => {
      const encodedFileName = encodeFileName(file.name);
      const imageRef = ref(storage, `images/${encodedFileName}`);
      return uploadBytes(imageRef, file).then(() => getDownloadURL(imageRef));
    });
    imgUrls = await Promise.all(uploadPromises);
  }

  return imgUrls;
};

export const uploadPlace = async (newPlaceData: NewPlaceForm) => {
  await addDoc(collection(db, 'places'), newPlaceData);
};
