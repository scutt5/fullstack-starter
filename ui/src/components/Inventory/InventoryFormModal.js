import Button from '@material-ui/core/Button'
import { Checkbox } from '@material-ui/core'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Grid from '@material-ui/core/Grid'
import { MenuItem } from '@material-ui/core'
import React from 'react'
import TextField from '../Form/TextField'
import { Field, Form, Formik } from 'formik'

const InventoryFormModal = ({
  formName,
  handleDialog,
  isDialogOpen,
  handleInventory,
  title,
  productsList,
  initialValues = {}
}) => {
  const measurementList = [
    { label: 'Cup', value: 'CUP' },
    { label: 'Gallon', value: 'GALLON' },
    { label: 'Ounce', value: 'OUNCE' },
    { label: 'Pint', value: 'PINT' },
    { label: 'Pound', value: 'POUND' },
    { label: 'Quart', value: 'QUART' }
  ]

  const validate = (values) => {
    let errors = {}

    if (!values.productType) {
      errors.productType = 'Product Type is required.'
    }

    if (!values.unitOfMeasurement) {
      errors.unitOfMeasurement = 'Unit of Measurement is required.'
    }

    return errors
  }

  return (
    <Dialog
      open={isDialogOpen}
      maxWidth='sm'
      fullWidth={true}
      onClose={() => { handleDialog(false) }}
    >
      <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={values => {
          handleInventory(values)
          handleDialog(true)
        }}>
        {helpers =>
          <Form
            autoComplete='off'
            id={formName}
          >
            <DialogTitle id='alert-dialog-title'>
              {`${title} Inventory`}
            </DialogTitle>
            <DialogContent>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={12}>
                  <Field
                    custom={{ variant: 'outlined', fullWidth: true, }}
                    name='name'
                    label='Name'
                    component={TextField}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Field
                    custom={{ variant: 'outlined', fullWidth: true, }}
                    name='productType'
                    select
                    label='Product Type'
                    component={TextField}
                    required
                  >
                    {productsList && productsList.length > 0 ?
                      productsList.map(prod =>
                        <MenuItem key={prod.name} value={prod.name}>
                          {prod.name}
                        </MenuItem>
                      ) :
                      <MenuItem disabled>No products available</MenuItem>
                    }
                  </Field>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Field
                    custom={{ variant: 'outlined', fullWidth: true, }}
                    name='description'
                    label='Product Description'
                    component={TextField}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Field
                    custom={{ variant: 'outlined', fullWidth: true, }}
                    name='averagePrice'
                    label='Average Price'
                    type='number'
                    component={TextField}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Field
                    custom={{ variant: 'outlined', fullWidth: true, }}
                    name='amount'
                    label='Amount'
                    type='number'
                    component={TextField}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Field
                    custom={{ variant: 'outlined', fullWidth: true, }}
                    name='unitOfMeasurement'
                    select
                    label='Unit of Measurement'
                    component={TextField}
                    required
                  >
                    {measurementList.map(unit =>
                      <MenuItem key={unit.value} value={unit.value}>
                        {unit.label}
                      </MenuItem>
                    )}
                  </Field>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Field
                    custom={{ variant: 'outlined', fullWidth: true, }}
                    name='bestBeforeDate'
                    label='Best Before Date'
                    type='date'
                    component={TextField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Field
                    name='neverExpires'
                    type='checkbox'
                    render={({ field, form }) =>
                      <FormControlLabel
                        control={
                          <Checkbox
                            {...field}
                            checked={field.value}
                            onChange={chng => form.setFieldValue(field.name, chng.target.checked)}
                          />
                        }
                        label="Never Expires"
                      />
                    }
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => { handleDialog(false) }} color='secondary'>Cancel</Button>
              <Button
                disableElevation
                variant='contained'
                type='submit'
                form={formName}
                color='secondary'
                disabled={!helpers.dirty}>
                Save
              </Button>
            </DialogActions>
          </Form>
        }
      </Formik>
    </Dialog>
  )
}

export default InventoryFormModal
