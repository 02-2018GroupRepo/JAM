package com.bob.jamserver.services;

import com.bob.jamserver.config.EmailConfig;
import com.bob.jamserver.model.Customer;
import com.bob.jamserver.model.Job;
import com.bob.jamserver.repositories.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
public class JobService {
	
	@Autowired
	JobRepository jobRepo;
	
	@Autowired
	private EmailConfig config;


	public Job createJob(Job job){
		return jobRepo.save(job);
	}
	
	public List<Job> findUserJobs(Long userId){
		return jobRepo.findJobsByUserId(userId);
		
	}
	public Job findJobById(Long id){
		return jobRepo.findJobById(id);
	}
	
	public Customer getCustomer(Long jobId) {
		return jobRepo.findCustomerById(jobId);
	}
	
	public void emailConfirmation(String userEmail,Long jobId,String Description) throws IOException {
        System.out.println(userEmail);
		config.emails(userEmail,jobId,Description);
	}
	public void updateJob(Long jobId) {
		Job completedJob = jobRepo.findJobById(jobId);
		completedJob.setCompleted(true);

		jobRepo.save(completedJob);
		
	}
	public List<Job> jobsDone(Long userId){
		return jobRepo.findJobsByUserIdAndCompletedTrue(userId);
	}

	public List<Job> jobsTodo(Long userId){
	    return jobRepo.findJobsByUserIdAndCompletedFalse(userId);
    }

	
}
