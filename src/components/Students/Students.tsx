'use client';

import type StudentInterface from '@/types/StudentInterface';
import styles from './Students.module.scss';
import useStudents from '@/hooks/useStudents';
import Student from './Student/Student';
import AddStudent from './AddStudent/AddStudent';

const Groups = (): React.ReactElement => {
  const { students, deleteStudentMutate, addStudentMutate } = useStudents();

  return (
    <>
      <div className={styles.AddStudentWrapper}>
        <AddStudent
          onAdd={(data: any) => {
            addStudentMutate(data);
          }}
        />

      </div>
      <div className={styles.Students}>
        {students.map((student: StudentInterface) => (

          <Student
            student={student}
            onDelete={(id) => {
              deleteStudentMutate(id)
            }}
            key={student.id}
          />
        ))}
      </div>
    </>
  );
};

export default Groups;
