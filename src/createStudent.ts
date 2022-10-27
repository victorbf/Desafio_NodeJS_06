import { question } from "./Question";
import { Student } from "./Student";

export const createStudent = async () => {
  const studentName = await question("Qual nome do aluno(a)? ");
  
  try {
    await Student.create({
      name: studentName,
    });
    
    console.log(`${studentName} está no banco de dados.`);

    const createMoreStudents = await question("Gostaria de adicionar mais? (s/n)");

    if (createMoreStudents === 's') {
      await createStudent();
    } else {
      console.log('Finalizando operação...');
    }
  } catch (error: any) {
    console.error(error);
  }
}