import sqlite3 from 'sqlite3';
sqlite3.verbose();

export const deleteStudentsDb = async (id: number): Promise<number | null> => {
  const db = new sqlite3.Database(process.env.DB ?? './db/vki-web.db');

  const deletedId = await new Promise<number | null>((resolve, reject) => {
    const sql = 'DELETE FROM student WHERE id = ?';

    db.run(sql, [id], function (err) {
      if (err) {
        db.close();
        reject(err);
        return;
      }

      if (this.changes > 0) {
        resolve(id); 
      } else {
        resolve(null);
      }

      db.close();
    });
  });

  return deletedId;
};
