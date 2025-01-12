import * as productDuck from '../../ducks/products'
import Button from '@material-ui/core/Button'
import { Checkbox } from '@material-ui/core'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
//import findProducts from '../../ducks/products/index.js'
import Grid from '@material-ui/core/Grid'
import { MenuItem } from '@material-ui/core'
import React from 'react'
import TextField from '../Form/TextField'
import { Field, Form, Formik } from 'formik'

class InventoryFormModal extends React.Component {
  render() {
    const {
      formName,
      handleDialog,
      handleInventory,
      title,
      schema,
      productsList,
      initialValues = {}
    } = this.props

    //for use in dropdown displays
    const measurementList = [
      { label: 'Cup', value: 'CUP' },
      { label: 'Gallon', value: 'GALLON' },
      { label: 'Ounce', value: 'OUNCE' },
      { label: 'Pint', value: 'PINT' },
      { label: 'Pound', value: 'POUND' },
      { label: 'Quart', value: 'QUART' }
    ]

    return (
      <Dialog
        open={this.props.isDialogOpen}
        maxWidth='sm'
        fullWidth={true}
        onClose={() => { handleDialog(false) }}
      >
        <Formik
          initialValues={initialValues}
          validationSchema={schema}
          onSubmit={values => {
            handleInventory(values)
            handleDialog(true)
          }}>
          {helpers =>
            <Form
              noValidate
              autoComplete='off'
              id={formName}
            >
              <DialogTitle id='alert-dialog-title'>
                {`${title} Inventory`}
              </DialogTitle>
              <DialogContent>
                <Grid container>
                  {/* Name Field (Required)*/}
                  <Grid item xs={12} sm={12}>
                    <Field
                      custom={{ variant: 'outlined', fullWidth: true, }}
                      name='name'//binds the field to Formik's state under the name 'name'
                      label='Name'
                      component={TextField}
                    />
                  </Grid>
                  {/*Product Type Dropdown (Required)*/}
                  <Grid item xs={12} sm={12}>
                    <Field
                      custom={{ variant: 'outlined', fullWidth: true, }}
                      name='productType'
                      select
                      label='Product Type'
                      component={TextField}
                    >
                      {/*Check if empty*/}
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
                  {/*Description Field (Optional)*/}
                  <Grid item xs={12} sm={12}>
                    <Field
                      custom={{ variant: 'outlined', fullWidth: true, }}
                      name='description'
                      label='Product Description'
                      component={TextField}
                    />
                  </Grid>
                  {/*Average Price Field (Optional)*/}
                  <Grid item xs={12} sm={12}>
                    <Field
                      custom={{ variant: 'outlined', fullWidth: true, }}
                      name='averagePrice'
                      label='Average Price'
                      type='number'
                      component={TextField}
                    />
                  </Grid>
                  {/*Amount Field (Optional)*/}
                  <Grid item xs={12} sm={12}>
                    <Field
                      custom={{ variant: 'outlined', fullWidth: true, }}
                      name='amount'
                      label='Amount'
                      type='number'
                      component={TextField}
                    />
                  </Grid>
                  {/*Unit of Measure Dropdown (Required)*/}
                  <Grid item xs={12} sm={12}>
                    <Field
                      custom={{ variant: 'outlined', fullWidth: true, }}
                      name='unitOfMeasurement'
                      select
                      label='Unit of Measurement'
                      component={TextField}
                    >
                      {measurementList.map(unit =>
                        <MenuItem key={unit.value} value={unit.value}>
                          {unit.label}
                        </MenuItem>
                      )}
                    </Field>
                  </Grid>
                  {/*Best Before Date (Optional)*/}
                  <Grid item xs={12} sm={12}>
                    <Field
                      custom={{ variant: 'outlined', fullWidth: true, }}
                      name='bestBeforeDate'
                      label='Best Before Date'
                      type='date'
                      component={TextField}
                    />
                  </Grid>
                  {/*Never Expires (Optional)*/}
                  <Grid item xs={12} sm={12}>
                    <Field
                      custom={{ variant: 'outlined', fullWidth: true, }}
                      name='neverExpires'
                      label='Never Expires'
                      type='checkbox'
                      component={TextField}
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
}

export default InventoryFormModal
