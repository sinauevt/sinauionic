package com.belajar.dao;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.belajar.entity.Student;

@Repository
public class StudentDao {
	
	private static Map<Integer, Student> students;
	
	static {
		students = new HashMap<>();
		students.put(1, new Student(1, "Joni", "Informatika"));
		students.put(2, new Student(1, "Soni", "Ekonomi"));
		students.put(3, new Student(1, "Alex", "Manajemen"));
	}

	public Collection<Student> getAllStudents() {
		return this.students.values();
	}
}
