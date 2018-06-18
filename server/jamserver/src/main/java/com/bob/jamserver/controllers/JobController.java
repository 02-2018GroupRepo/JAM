package com.bob.jamserver.controllers;

import com.bob.jamserver.model.Job;
import com.bob.jamserver.model.User;
import com.bob.jamserver.services.CustomerService;
import com.bob.jamserver.services.JobService;
import com.bob.jamserver.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@CrossOrigin
@RestController
public class JobController{
	@Autowired
	JobService jobService;
	
	@Autowired
	UserService userService;

	@Autowired
	CustomerService customerService;

	@RequestMapping(value="/create/job", method = RequestMethod.POST)
	public void create(@RequestBody  Job job){
		System.out.println("just ot create Job"+job.getTime());
		Job jobcreate = jobService.createJob(job);
		System.out.println("check if Job is null "+jobcreate.getDescription());
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
//		jobService.emailConfirmation(userEmail,jobId,jobDescription);



	}
}