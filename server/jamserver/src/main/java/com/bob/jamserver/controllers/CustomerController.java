package com.bob.jamserver.controllers;

import com.bob.jamserver.model.Customer;
import com.bob.jamserver.services.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@CrossOrigin
@RestController
public class CustomerController {
    @Autowired
    CustomerService customerService;

    @RequestMapping(value="/create/customer")
    public Customer createCustomer(@RequestBody Customer customer){
        System.out.println("got to customer controller "+customer.getLast_name()+customer.getFirst_name());
        return  customerService.createCustomer(customer);

    }
}
