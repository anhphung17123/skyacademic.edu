export interface TeacherCredential {
  text: string;
  textVi?: string;
}

/** Teacher / instructor / creator / mentor – used for courses, books, flashcards */
export interface Teacher {
  id: string;
  name: string;
  nameVi?: string;
  imageUrl: string;
  role: string;
  roleVi?: string;
  bio?: string;
  bioVi?: string;
  email?: string;
  credentials?: TeacherCredential[];
}
