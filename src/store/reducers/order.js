import * as actionTypes from '../actions/actionsTypes';
import { updateObject } from '../utility';

const initialState = {
  orders: [],
  loading: false,
  purchased: false,
};

const purchaseInit = (state, action) => {
  return updateObject(state, { purchased: false });
};

const purchaseStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const purchaseSuccess = (state, action) => {
  const newOrder = updateObject(action.orderData, { id: action.orderId });
  return updateObject(state, {
    loading: false,
    purchased: true,
    orders: state.orders.concat(newOrder),
  });
};

const orderPurchaseFail = (state, action) => {
  return updateObject(state, { loading: false });
};

const orderPurchaseStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const fetchOrderSuccess = (state, action) => {
  return updateObject(state, { orders: action.orders, loading: false });
};

const fetchOrderFail = (state, action) => {
  return updateObject(state, { loading: false });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_INIT:
      return purchaseInit(state, action);
    case actionTypes.ORDER_PURCHASE_START:
      return purchaseStart(state, action);
    case actionTypes.ORDER_PURCHASE_SUCCESS:
      return purchaseSuccess(state, action);
    case actionTypes.ORDER_PURCHASE_FAIL:
      return orderPurchaseFail(state, action);
    case actionTypes.FETCH_ORDERS_START:
      return orderPurchaseStart(state, action);
    case actionTypes.FETCH_ORDERS_SUCCESS:
      return fetchOrderSuccess(state, action);
    case actionTypes.FETCH_ORDERS_FAIL:
      return fetchOrderFail(state, action);
    default:
      return state;
  }
};

export default reducer;
