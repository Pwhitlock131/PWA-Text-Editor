import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

export const putDb = async (content) => {
  console.log('PUT to the database');

  const contactDb = await openDB('jate', 1);

  const tx = contactDb.transaction('jate', 'readwrite');

  const store = tx.objectStore('jate');

  const request = store.put({ id: 1, value: content });

  const result = await request;
  console.log('data has been saved to the database', result.value);
};

export const getDb = async () => {
  console.log('GET from database');

  const contactDb = await openDB('jate', 1);

  const tx = contactDb.transaction('jate', 'readonly');

  const store = tx.objectStore('jate');

  const request = store.getAll();

  const result = await request;
  console.log('Data has been retrieved from the database', result.value);

  return result?.value;
};

initdb();
