package com.starter.fullstack.rest;

import com.starter.fullstack.api.Inventory;
import com.starter.fullstack.dao.InventoryDAO;
import java.util.List;
import java.util.Optional;
import org.springframework.util.Assert;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


/**
 * Inventory Controller.
 */
@RestController
@RequestMapping("/inventory")
public class InventoryController {
  private final InventoryDAO inventoryDAO;

  /**
   * Default Constructor.
   * @param inventoryDAO inventoryDAO.
   */
  public InventoryController(InventoryDAO inventoryDAO) {
    Assert.notNull(inventoryDAO, "Inventory DAO must not be null.");
    this.inventoryDAO = inventoryDAO;
  }

  /**
   * Find Products.
   * @return List of Product.
   */
  @GetMapping
  public List<Inventory> findInventories() {
    return this.inventoryDAO.findAll();
  }


  /**
   * Create an Inventory.
   * @param inventory The inventory to be created.
   * @return The created inventory.
   */
  @PostMapping
  public Inventory createInventory(@RequestBody Inventory inventory) {
    return this.inventoryDAO.create(inventory);
  }

  /*
   * Update an Inventory.
   * @param inventory The inventory to be updated.
   * @return The updated inventory.
   */
  @PostMapping("/update")
  public Inventory updateInventory(@RequestBody Inventory inventory) { 
    Optional<Inventory> ret = this.inventoryDAO.update(inventory);
    if (ret.isPresent()) {
      return ret.get();
    }
    return null;
  }

  /**
   * Delete an Inventory.
   * @param id The inventory id as a String.
   * @return The deleted inventory.
   */
  @DeleteMapping
  public Inventory deleteInventory(@RequestBody String id) {
    Optional<Inventory> ret = this.inventoryDAO.delete(id);
    if (ret.isPresent()) {
      return ret.get();
    }
    return null;
  }
}

