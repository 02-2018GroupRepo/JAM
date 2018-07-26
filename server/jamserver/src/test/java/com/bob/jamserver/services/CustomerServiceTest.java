package com.bob.jamserver.services;

import com.bob.jamserver.model.Customer;
import com.bob.jamserver.repositories.CustomerRepository;
import org.junit.Before;
import org.junit.Test;

import static org.junit.Assert.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

public class CustomerServiceTest {
    private CustomerRepository customerRepository;
    private Customer customer;
   private Customer customer1;
    @Before
    public void setUp() throws Exception {
        customer = new Customer();
        customer1 = new Customer();
        customerRepository = mock(CustomerRepository.class);
        customer.setId(1L);
        customer.setFirst_name("John");
        customer.setLast_name("Mak");
        customer.setEmail("john_mak@gmail.com");
        customer.setPhone("817-772-7167");
        customer.setAddress("1800 sweet water drive dallas ,Tx");
    }

    @Test
    public void test_findByEmail() {
        when(customerRepository.findByEmail("john_mak@gmail.com")).thenReturn(customer);
        Customer cust = customerRepository.findByEmail("john_mak@gmail.com");
        assertEquals(customer,cust);
    }

    @Test
    public void test_findByEmailWhenCustomerDoesNoTExist() {
        when(customerRepository.findByEmail("tahrim@gmail.com")).thenReturn(null);
        assertEquals("Customer does not exist for email",customerRepository.findByEmail("tahrim@gmail.com"),null);
    }
}