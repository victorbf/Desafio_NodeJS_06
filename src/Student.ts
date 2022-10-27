import crypto from "node:crypto";
import { client } from "./Client";

export class Student {
  public static tableName = "students";

  public id!: string;
  public name!: string;

  static async create(student: Pick<Student, 'name'>): Promise<Student> {
    const createStudent = new Student();
    Object.assign(createStudent, {
      ...student,
      id: crypto.randomUUID(),
    });

    await client.query(
      `INSERT INTO ${Student.tableName} (id, name) VALUES ($1, $2);`,
      [createStudent.id, createStudent.name]
    );

    return createStudent;
  }
}
