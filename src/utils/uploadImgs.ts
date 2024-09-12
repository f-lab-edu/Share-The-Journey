import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

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
