package com.belajar.controller;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.belajar.entity.Student;
import com.belajar.service.StudentService;

@RestController
@RequestMapping("/students")
public class StudentController {

	@Autowired
	private StudentService studentService;
	
	@CrossOrigin
	@RequestMapping(method = RequestMethod.GET)
	public Collection<Student> getAllStudents() {
		return studentService.getAllStudents();
	}
	
}
