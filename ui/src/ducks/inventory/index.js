import axios from 'axios'
import { createAction, handleActions } from 'redux-actions'
import { openError, openSuccess } from '../alerts'


//action types
const actions = {
  INVENTORY_GET_ALL: 'inventory/get_all',
  INVENTORY_GET_ALL_PENDING: 'inventory/get_all_PENDING',
  INVENTORY_DELETE: 'inventory/delete',
  INVENTORY_CREATE: 'inventory/create',
  INVENTORY_UPDATE: 'inventory/update',
  INVENTORY_REFRESH: 'inventory/refresh'
}

export let defaultState = {
  all: [],
  fetched: false,
}

//action creator
export const findInventory = createAction(actions.INVENTORY_GET_ALL, () =>
  (dispatch, getState, config) => axios
    .get(`${config.restAPIUrl}/inventory`)
    .then((suc) => {
      dispatch(refreshInventory(suc.data))
    })
)

export const refreshInventory = createAction(actions.INVENTORY_REFRESH, (payload) =>
  (dispatcher, getState, config) =>
    payload.sort((inventoryA, inventoryB) =>
      inventoryA.name < inventoryB.name ? -1 : inventoryA.name > inventoryB.name ? 1 : 0)
)

export const createInventory = createAction(actions.INVENTORY_CREATE, (payload) =>
  (dispatch, getState, config) => axios
    .post(`${config.restAPIUrl}/inventory`, payload)
    .then((suc) => {
      //add newly created inventory to current state's list of objects.
      const invs = []
      getState().inventory.all.forEach(inv => {
        if (inv.id !== suc.data.id) {
          invs.push(inv)
        }
      })
      invs.push(suc.data)
      dispatch(refreshInventory(invs))
      const succMsg = 'Inventory successfully created.'
      dispatch(openSuccess(succMsg))
    })
    .catch((error) => {
      const errMsg = 'Failed to create Inventory.'
      dispatch(openError(errMsg))
    })
)

export const updateInventory = createAction(actions.INVENTORY_UPDATE, (payload) =>
  (dispatch, getState, config) => axios
    .put(`${config.restAPIUrl}/inventory/update`, payload)
    .then((suc) => {
      //add updated inventory to current state's list of objects.
      const invs = []
      getState().inventory.all.forEach(inv => {
        if (inv.id !== suc.data.id) {
          invs.push(inv)
        }
      })
      invs.push(suc.data)
      dispatch(refreshInventory(invs))
      const succMsg = 'Inventory successfully updated.'
      dispatch(openSuccess(succMsg))
    })
    .catch((error) => {
      const errMsg = 'Failed to update Inventory.'
      dispatch(openError(errMsg))
    })
)

export const removeInventory = createAction(actions.INVENTORY_DELETE, (ids) =>
  (dispatch, getState, config) => axios
    .delete(`${config.restAPIUrl}/inventory`, { data: ids } )
    .then((suc) => {
      const invs = []
      getState().inventory.all.forEach(inv => {
        if (!ids.includes(inv.id)) {
          invs.push(inv)
        }
      })
      dispatch(refreshInventory(invs))
      const succMsg = 'Inventory successfully deleted.'
      dispatch(openSuccess(succMsg))
    })
    .catch((error) => {
      const errMsg = 'Failed to delete Inventory.'
      dispatch(openError(errMsg))
    })
)

//reducer
export default handleActions({
  [actions.INVENTORY_GET_ALL_PENDING]: (state) => ({
    ...state,
    fetched: false,
  }),
  [actions.INVENTORY_REFRESH]: (state, action) => ({
    ...state,
    all: action.payload,
    fetched: true,
  }),
}, defaultState)
