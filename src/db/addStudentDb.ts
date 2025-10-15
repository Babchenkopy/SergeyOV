import sqlite3 from 'sqlite3';
import getRandomFio from '@/utils/getRandomFio';
import FioInterface from '@/types/FioInterface';
sqlite3.verbose();

export const addStudentDb = async (data: any): Promise<number | null> => {
  const db = new sqlite3.Database(process.env.DB ?? './db/vki-web.db');

  const addedId = await new Promise<number | null>((resolve, reject) => {
    const sql = 'INSERT INTO student (firstName, middleName, lastName) VALUES (?, ?, ?)';

    db.run(sql, [data.firstName, data.middleName, data.lastName], function (err) {
      if (err) {
        db.close();
        reject(err);

      
        return;
      }

      if (this.changes > 0) {
        resolve(1); 
      } else {
        resolve(null);
      }

      db.close();
    });
  });

  return 1;
};

/**
 * Добавление  рандомных студента
 * @param mount количество добавляемых записей - 10 по умолчанию
 * @returns
 */
export const addRandomStudentsDb = async (amount: number = 10): Promise<FioInterface[]> => {
  const db = new sqlite3.Database(process.env.DB ?? './db/vki-web.db');

  const fios: FioInterface[] = [];
  let fiosInsert: string = ''
  for (let i = 0; i < amount; i++) {
    const fio = getRandomFio();
    fios.push(fio);
    fiosInsert += `('${fio.firstName}', '${fio.lastName}', '${fio.middleName}', 1)`;
    fiosInsert += `${i === amount - 1 ? ';' : ','}`;
  }

  await new Promise((resolve, reject) => {
    db.run(`INSERT INTO student (firstName, lastName, middleName, groupId) VALUES ${fiosInsert}`, [], (err) => {
      if (err) {
        reject(err);
        db.close();
        return;
      }
      resolve(fios);
      db.close();
    });
  });

  return fios;
};
