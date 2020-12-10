import React, {Component} from 'react';
import {Redirect, Route} from 'react-router-dom';

import CheckoutSummary from '../../components/order/checkoutSummary/checkoutSummary';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';
// import * as action from '../../store/actions/index';

class Checkout extends Component {

    // componentWillMount() {
    //     this.props.onPurchaseInit();
    // }
    // state = {
    //     ingredients: null,
    //     totalPrice: 0
    // }

    // componentWillMount() {
    //     const query = new URLSearchParams(this.props.location.search);
    //     const ingredients = {};
    //     let price = 0;
    //     for(let param of query.entries()) {
    //         if(param[0] === 'price') {
    //             price = param[1];
    //         } else {
    //             ingredients[param[0]] = +param[1];
    //         }
    //     }

    //     this.setState({ingredients: ingredients, totalPrice: price});
    // }

    checkoutCancelledHandler= () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data'); 
    }


    render() {
        let summary = <Redirect to="/" />
        if(this.props.ings) {
            const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null;
            summary = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary ingredients={this.props.ings}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}
                    />
                    <Route
                        path={this.props.match.path + '/contact-data'}
                        component={ContactData}
                        // render={(props) => (<ContactData ingredients={this.state.ingredients} price = {this.state.totalPrice} {...props}/>)}
                        />
                </div>
            )
        }
        return summary;
    }
};

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        purchased: state.order.purchased
    }
}
// const mapDispatchToProps = dispatch => {
//     return {
//         onPurchaseInit: () => {dispatch(action.purchaseInit())}
//     }
// }
export default connect(mapStateToProps)(Checkout);