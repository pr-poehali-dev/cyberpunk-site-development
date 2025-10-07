CREATE TABLE enrollments (
  id SERIAL PRIMARY KEY,
  course_id INTEGER NOT NULL,
  course_title VARCHAR(255) NOT NULL,
  student_name VARCHAR(255) NOT NULL,
  student_email VARCHAR(255) NOT NULL,
  student_phone VARCHAR(50) NOT NULL,
  enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);