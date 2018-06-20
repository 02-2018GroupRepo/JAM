package com.bob.jamserver.controllers;

import com.bob.jamserver.model.*;
import com.bob.jamserver.services.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;

@CrossOrigin
@RestController
public class JobController{
	@Autowired
	JobService jobService;
	
	@Autowired
	UserService userService;

	@Autowired
	CabinetService cabinetService;

	@Autowired
	WindowService windowService;

	@Autowired
	DoorService doorService;

	@Autowired
	CustomerService customerService;

	@RequestMapping(value="/create/job", method = RequestMethod.POST)
	public HashMap<String, List<Job>> create(@RequestBody  Job job){
		System.out.println("is customer id null "+job.getCustomer().getId());
		Job jobcreated = jobService.createJob(job);

		Long userId = jobcreated.getUser().getId();
		System.out.println("USER ID:" + userId);
		List<Job> uncompletedJobs = jobService.jobsTodo(userId);
		List<Job> completedJobs = jobService.jobsDone(userId);
		HashMap<String, List<Job>> allJobs = new HashMap<String, List<Job>>();
		allJobs.put("completed",completedJobs);
		allJobs.put("uncompleted",uncompletedJobs);
		return allJobs;

	}
	@RequestMapping(value="/customer", method=RequestMethod.POST)
	public Job getCustomerForJob(@RequestBody Job job) {
		
//		System.out.println(job.getId());
		Job cust = jobService.findJobById(job.getId());

		return cust;
	}
	
	@RequestMapping(value="/completed", method = RequestMethod.POST)
	public  void jobCompleted(@RequestBody Job job) throws IOException {
		User user = job.getUser();
		System.out.println("is user passing "+job.getUser());
		String userEmail = user.getEmail();
		Long userId = user.getId();

		Long jobId = job.getId();


		String jobDescription = job.getDescription();
		System.out.println("job desc"+ jobDescription);
		jobService.updateJob(jobId);
		System.out.println(userEmail);



	}

	@RequestMapping(value="/complete/job", method=RequestMethod.POST)
	public HashMap<String,List> getSingleJob(@RequestBody Job job){
		System.out.println("getting single job "+ job.getId());
		List<Door> doors = doorService.getDoorsForJob(job.getId());

		List<Window> windows = windowService.getWindowsForJob(job.getId());

		List<Cabinet> cabinets = cabinetService.getCabinetsForJob(job.getId());

		HashMap<String, List> jobProperties = new HashMap<String, List>();
		jobProperties.put("doors", doors);
		jobProperties.put("windows", windows);
		jobProperties.put("cabinets",cabinets);
		System.out.println("how many doors "+jobProperties.get("doors").size());
		return  jobProperties;

	}

}