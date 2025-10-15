import { getStudentsDb } from '@/db/getStudentsDb';
import { addStudentDb } from '@/db/addStudentDb';



export async function GET(): Promise<Response> {
  const students = await getStudentsDb();
  return new Response(JSON.stringify(students), {
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function POST(request: Request): Promise<Response> {
  //try {
    const data = await request.json();
    const newStudent = await addStudentDb(data); 

    return new Response(JSON.stringify(newStudent), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  // } catch (error) {
  //   return new Response(JSON.stringify({ error: 'Ошибка при добавлении студента' }), {
  //     status: 500,
  //     headers: { 'Content-Type': 'application/json' },
  //   });
  // }
}