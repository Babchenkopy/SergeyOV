import { deleteStudentsDb } from "@/db/deleteStudentDb";
import { type NextApiRequest } from "next/types"; 

export async function DELETE(
    req: NextApiRequest, 
    { params }: { params: { id: number } }
): Promise<Response> {
    const p = await params; 
    const studentId = await p.id; 
    const deleteStudentId = await deleteStudentsDb(studentId); 

    return new Response(JSON.stringify({ deleteStudentId }), {
        headers: {
            'Content-Type': 'application/json',
        },
    });
};