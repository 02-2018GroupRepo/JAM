package com.bob.jamserver.services;

import com.bob.jamserver.model.Cabinet;
import com.bob.jamserver.model.Job;
import com.bob.jamserver.repositories.CabinetRepository;
import org.junit.Before;
import org.junit.Test;

import java.util.ArrayList;
import java.util.List;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

public class CabinetServiceTest {
    private CabinetService cabinetService;

    private CabinetRepository cabinetRepo;
    private Cabinet cabinet;
    private Cabinet cabinet1;
    @Before
    public void setUp() throws Exception {
        cabinet = new Cabinet();
        cabinet1 = new Cabinet();
        cabinet1.setId(2L);
        cabinet.setId(1L);
        cabinet.setColor("blue");
        cabinet.setHeight(20);
        cabinet.setType("wood");
        cabinet.setHinges(2);
        cabinet.setQuantity(5);
        cabinet.setWidth(10);
        cabinet.setScrews(40);
        cabinetRepo = mock(CabinetRepository.class);

    }


    @Test
    public void test_updateCabinet() {
        when(cabinetRepo.findCabinetById(1L)).thenReturn(cabinet);
        cabinet.setColor("white");
        assertEquals("white",cabinet.getColor());
        cabinet.setHeight(5);
        assertEquals(5,cabinet.getHeight(),0);
        cabinet.setType("ceramic");
        assertEquals("ceramic",cabinet.getType());
        cabinet.setHinges(4);
        assertEquals(4,cabinet.getHinges(),0);
        cabinet.setQuantity(10);
        assertEquals(10,cabinet.getQuantity(),0);
    }

    @Test
    public void test_getCabinetsForJob() {
        Job job = new Job();
        job.setId(1L);
        Long jobId = job.getId();
        cabinet.setJob(job);
        cabinet1.setJob(job);

        List<Cabinet> cabinets = new ArrayList<Cabinet>();
        cabinets.add(cabinet1);
        cabinets.add(cabinet);

        when(cabinetRepo.findByJobIdOrderByIdDesc(jobId)).thenReturn(cabinets);
        assertEquals(2,cabinets.size());
        assertThat(cabinet1,is(cabinets.get(0)));
    }

    @Test
    public void test_deleteCabinet() {
        cabinetRepo.deleteById(cabinet.getId());
        when(cabinetRepo.findById(1L)).thenReturn(null);
        assertEquals(cabinetRepo.findById(1L),null);

    }

}