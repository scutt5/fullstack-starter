package com.starter.fullstack.dao;

import com.starter.fullstack.api.Inventory;
import java.util.LinkedList;
import java.util.List;
import javax.annotation.Resource;
import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.ClassRule;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.test.context.junit4.SpringRunner;
import org.testcontainers.containers.MongoDBContainer;
import org.testcontainers.utility.DockerImageName;

/**
 * Test Inventory DAO.
 */
@DataMongoTest
@RunWith(SpringRunner.class)
public class InventoryDAOTest { 
  @ClassRule
  public static final MongoDBContainer mongoDBContainer = new MongoDBContainer(DockerImageName.parse("mongo:4.0.10"));

  @Resource
  private MongoTemplate mongoTemplate;
  private InventoryDAO inventoryDAO;
  private static final String NAME = "Amber";
  private static final String PRODUCT_TYPE = "hops";
  private static final String ID = "id";

  @Before
  public void setup() { 
    this.inventoryDAO = new InventoryDAO(this.mongoTemplate);
  }

  @After
  public void tearDown() { 
    this.mongoTemplate.dropCollection(Inventory.class);
  }

  /**
   * Test Find All method.
   */
  @Test
  public void findAll() { 
    Inventory inventory = new Inventory();
    inventory.setName(NAME);
    inventory.setProductType(PRODUCT_TYPE);
    this.mongoTemplate.save(inventory);
    List<Inventory> actualInventory = this.inventoryDAO.findAll();
    Assert.assertFalse(actualInventory.isEmpty());
  }

  /**
   * Test Create method.
   */
  @Test
  public void createTest() { 
    Inventory in = new Inventory();
    in.setName(NAME);
    in.setProductType(PRODUCT_TYPE);
    this.mongoTemplate.save(in);

    Inventory created = this.inventoryDAO.create(in);
    Assert.assertTrue(inventoryDAO.findAll().contains(created));
  }


  /**
   * Test Retrieve method.
   */
  @Test
  public void retrieveTest() { 
    Inventory in2 = new Inventory();
    in2.setName(NAME);
    in2.setProductType(PRODUCT_TYPE);
    in2.setId(ID);
    this.mongoTemplate.save(in2);

    Assert.assertTrue((this.inventoryDAO.retrieve(ID).get()).equals(in2));
  }

  /**
   * Test delete method.'
   * Updated to pass list of inventories to be deleted.
   */
  @Test
  public void deleteTest() { 
    Inventory in3 = new Inventory();
    in3.setName(NAME);
    in3.setProductType(PRODUCT_TYPE);
    in3.setId(ID);
    this.mongoTemplate.save(in3);  

    List<String> del = new LinkedList<String>();
    del.add(ID);
    this.inventoryDAO.delete(del);
    Assert.assertFalse(this.inventoryDAO.retrieve(ID).isPresent());
  }
}
