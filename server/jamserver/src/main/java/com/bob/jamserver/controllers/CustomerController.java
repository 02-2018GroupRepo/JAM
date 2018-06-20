package com.bob.jamserver.controllers;

import com.bob.jamserver.model.Customer;
import com.bob.jamserver.services.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@CrossOrigin
@RestController
public class CustomerController {
    @Autowired
    CustomerService customerService;

    @RequestMapping(value="/create/customer", method=RequestMethod.POST)
    public Customer createCustomer(@RequestBody Customer customer){

        return  customerService.createCustomer(customer);

    }
}
