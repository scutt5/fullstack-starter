package com.starter.fullstack.rest;

import com.starter.fullstack.api.Inventory;
import com.starter.fullstack.dao.InventoryDAO;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import org.springframework.util.Assert;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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
  @PutMapping("/update")
  public Inventory updateInventory(@RequestBody Inventory inventory) { 
    Optional<Inventory> ret = this.inventoryDAO.update(inventory);
    if (ret.isPresent()) {
      return ret.get();
    }
    return null;
  }

  /**
   * Delete a single Inventory, or list of Inventories.
   * @param ids List of Inventories to be deleted as Strings.
   * @return The deleted Inventories.
   */
  @DeleteMapping
  public List<Inventory> deleteInventory(@RequestBody List<String> ids) {
    List<Inventory> rets = new LinkedList<Inventory>();
    //check if not empty.
    if (ids.size() > 0) {
      rets = this.inventoryDAO.delete(ids);
    }
    return rets;
  }
}

