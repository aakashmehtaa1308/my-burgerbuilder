import * as actionTypes from './actionsTypes';
import axios from '../../axios-orders';

export const orderPurchaseSuccess = (id, orderData) => {
  return {
    type: actionTypes.ORDER_PURCHASE_SUCCESS,
    orderData: orderData,
    orderId: id,
  };
};

export const orderPurchaseFail = (error) => {
  return {
    type: actionTypes.ORDER_PURCHASE_FAIL,
    error,
  };
};

export const orderPurchaseStart = () => {
  return {
    type: actionTypes.ORDER_PURCHASE_START,
  };
};

export const orderPurchase = (orderData, token) => {
  return (dispatch) => {
    dispatch(orderPurchaseStart());
    // console.log(orderData.userId);
    axios
      .post('/orders.json?auth=' + token, orderData)
      .then((response) => {
        dispatch(orderPurchaseSuccess(response.data.name, orderData));
      })
      .catch((err) => {
        dispatch(orderPurchaseFail(err));
      });
  };
};

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
};

export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
};

export const fetchOrderFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    }
};

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
};

export const fetchOrders = (token,userId) => {
    return (dispatch) => {
        dispatch(fetchOrdersStart());
        const queryParams = '?auth='+token+'&orderBy="userId"&equalTo="' + userId+'"';
        axios.get('/orders.json'+queryParams).then(res => {
            // console.log(res.data);
            const fetchedOrders = [];
            for(let key in res.data) {
                fetchedOrders.push({...res.data[key],
                id: key
            }); 
            }
            dispatch(fetchOrdersSuccess(fetchedOrders));
        }).catch(err => {
            dispatch(fetchOrderFail(err));
        })
    }
}