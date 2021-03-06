package com.bob.jamserver.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name= "job")

public class Job {
   @Id
   @GeneratedValue(strategy=GenerationType.IDENTITY)
   private Long id;
   
   private Boolean completed;
   private Date time;
   private String description;
   @ManyToOne(fetch= FetchType.LAZY)
   @JoinColumn(name = "user_id")
   @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
   private User user;
   
   @ManyToOne(fetch=FetchType.LAZY)
   @JoinColumn(name="customer_id")
   @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
   private  Customer customer;
   
   public Job() {
	   
   }


   public User getUser() {
	return user;
}


public void setUser(User user) {
	this.user = user;
}


public Boolean getCompleted() {
	return completed;
}


public void setCompleted(Boolean completed) {
	this.completed = completed;
}


public String getDescription() {
	return description;
}
   
public void setDescription(String description) {
	this.description = description;
}

public Customer getCustomer() {
	return customer;
}

public void setCustomer(Customer customer) {
	this.customer = customer;
}


   public Long getId() {
       return id;
   }

   public void setId(Long id) {
       this.id = id;
   }

    public Date getTime() {
        return time;
    }

    public void setTime(Date time) {
        this.time = time;
    }
}
