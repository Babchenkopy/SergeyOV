import type StudentInterface from '@/types/StudentInterface';

export const getStudentsApi = async (): Promise<StudentInterface[]> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}students`);

    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}${response.statusText}`);
    }

    const students = await response.json() as StudentInterface[];

    return students;
  }
  catch (err) {
    console.log('>>> getStudentsApi', err);
    return [] as StudentInterface[];
  }
};


export const deleteStudentApi = async (id: any): Promise<number | null> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}students/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    return data.id ?? null;
  } catch (err) {
    console.log('>>> deleteStudentApi', err);
    return null;
  }
};


export const addStudentApi = async (studentData: any): Promise<number | null> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}students`, {
      method: 'POST',
      body: JSON.stringify(studentData)
    });

    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    return data.id ?? null;
  } catch (err) {
    console.log('>>> addStudentApi', err);
    return null;
  }
};
