// Type User
export interface Account {
  id: number;
  username: string;
  role: string;
}

// Type Mahasiswa
export interface Mahasiswa {
  id: number;
  user_id: Account;
  name: string;
  nim: string;
  angkatan: string;
  program_studi: string;
}

export interface Profile {
  id: number;
  name: string;
  nim: string;
  program_studi: string;
  role: string;
}

// Type Dosen
export interface Dosen {
  id: number;
  user_id: Account;
  name: string;
  nidn: string;
  fakultas: string;
}

// Type Course
export interface Course {
  id: number;
  title: string;
  description: string;
  instructor: Dosen;
  thumbnail: string;
  lessons: Lesson;
}

// Type Assignment
export interface Assignment {
  id: number;
  lesson_id: Lesson;
  title: string;
  description: string;
  deadline: string;
}

// Type Lesson
export interface Lesson {
  id: number;
  course_id: Course;
  title: string;
  description: string;
  content: string;
}

export interface Submission {
  id: number;
  assignment_id: Assignment;
  student_id: Mahasiswa;
  file: string;
  grade: number;
}
