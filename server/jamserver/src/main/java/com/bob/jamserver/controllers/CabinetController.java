package com.bob.jamserver.controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.bob.jamserver.model.Cabinet;
import com.bob.jamserver.services.CabinetService;

import java.util.HashMap;
import java.util.List;

@CrossOrigin
@RestController
public class CabinetController {
	private final Logger logger = LoggerFactory.getLogger(CabinetController.class);
	
	@Autowired
	private CabinetService cabinetService;

	private HashMap<String,List<Cabinet>> cabinets = new HashMap<String, List<Cabinet>>();

	@RequestMapping(value = "/cabinet/create", method = RequestMethod.POST)

	public HashMap<String, List<Cabinet>> createCabinet(@RequestBody Cabinet cabinet) {

		logger.info("check if cabinet is  null "+cabinet);
		cabinetService.createCabinet(cabinet);
		logger.info("Successfully created cabinet");
		cabinets.put("CabinetCreatedSuccessfully",cabinetService.getCabinetsForJob(cabinet.getJob().getId()));
		return cabinets ;
	}

	@RequestMapping(value="/edit/cabinet",method=RequestMethod.POST)
	public HashMap<String, List<Cabinet>> updateCabinet(@RequestBody Cabinet cabinet){
		String type = cabinet.getType();
		int hinges = cabinet.getHinges();
		int screws = cabinet.getScrews();
		int quantity = cabinet.getQuantity();
		double height = cabinet.getHeight();
		double width = cabinet.getWidth();
		String color = cabinet.getColor();

		Long jodId =  cabinet.getJob().getId();
		cabinetService.updateCabinet(cabinet.getId(),type,hinges,screws,quantity,height,width,color);

		
		cabinets.put("CabinetCreatedSuccessfully",cabinetService.getCabinetsForJob(jodId));
		return cabinets;
	}

	@RequestMapping(value="/delete/cabinet", method=RequestMethod.POST)
	public HashMap<String , List<Cabinet>> deleteCabinet(@RequestBody Cabinet cabinet) {
		Long jobId = cabinet.getJob().getId();
		cabinetService.deleteCabinet(cabinet.getId());
		cabinetService.getCabinetsForJob(jobId);
		cabinets.put("CabinetCreatedSuccessfully", cabinetService.getCabinetsForJob(jobId));
		return cabinets;
	}

}
