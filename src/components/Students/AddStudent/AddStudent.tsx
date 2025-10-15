import type StudentInterface from '@/types/StudentInterface';
import styles from './AddStudent.module.scss';
import { useForm } from 'react-hook-form';

interface Props {
  student: StudentInterface;
}

interface AddStudentForm {
    firstName: string, 
    lastName: string, 
    middleName: string
}

export default function AddStudent({ onAdd }: {
    onAdd: (data: AddStudentForm) => void;
}) {
    const { register, handleSubmit } = useForm<AddStudentForm>(); 

    return (
        <form onSubmit={handleSubmit(onAdd)}>

            <h2>Добавить нового студента</h2>

            <div className={ styles.inputsContainer }>
                <input type="text" {...register('firstName')} placeholder='Имя' required/>
                <input type="text" {...register('middleName')} placeholder='Отчество' required/>
                <input type="text" {...register('lastName')} placeholder='Фамилия' required/>
            </div>

            <button className={ styles.saveButton } type='submit'>Сохранить</button>
        </form>
    );
};

