package com.belajar.service;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.belajar.dao.StudentDao;
import com.belajar.entity.Student;

@Service
public class StudentService {

	@Autowired
	private StudentDao studentDao;
	
	public Collection<Student> getAllStudents() {
		return studentDao.getAllStudents();
	}
}
