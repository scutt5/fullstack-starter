import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Grid from '@material-ui/core/Grid'
import React from 'react'
import Typography from '@material-ui/core/Typography'

const InventoryDeleteModal = ({
  handleDialog,
  handleDelete,
  isDialogOpen,
  initialValues = {},
}) =>
  <Dialog
    open={isDialogOpen}
    onClose={() => { handleDialog(false) }}
  >
    <DialogTitle id='alert-dialog-title'>Delete Inventory</DialogTitle>
    <DialogContent>
      <Grid container>
        <Grid item xs={12}>
          <Typography>
            Are you sure you want to delete this Inventory?
          </Typography>
        </Grid>
      </Grid>
    </DialogContent>
    <DialogActions>
      <Button onClick={() => { handleDialog(false) } } color='secondary'>
        No
      </Button>
      <Button disableElevation
        variant='contained'
        type='submit'
        form='deleteInventory'
        onClick={() => {
          handleDelete(initialValues)//fires off the delete modal
          handleDialog(true)//closes the dialog
        }}
        color='secondary'
      >
        Yes
      </Button>
    </DialogActions>
  </Dialog>

InventoryDeleteModal.defaultProps = {
  delete: {}
}

export default InventoryDeleteModal