import React, {Component} from "react";
import CheckoutSummary from '../../Components/Order/CheckoutSummary/CheckoutSummary';
import {Route} from 'react-router-dom';
import ContactData from "./ContactData/ContactData";

class Checkout extends Component{
    state = {
        ingredients: null,
        price: 0
    }

    componentWillMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price = 0;
        console.log("Checkout will mount");
        for (let param of query.entries()) {
            // in用于遍历object的属性，of用于遍历iterable对象
            // param - ['salad', '1']
            if (param[0] === 'price') {
                price = Number.parseFloat(param[1]).toFixed(2);
                console.log("Order price is " + price);
            } else {
                ingredients[param[0]] = +param[1];  // 取出来的是字符，+用来转换成数字
            }
        }
        this.setState({ingredients: ingredients, price: price});
        console.log(this.state);
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('./checkout/contact-data');
    }

    render() {
        return (
            <div>
                <CheckoutSummary ingredients={this.state.ingredients}
                                 checkoutCancelled={this.checkoutCancelledHandler}
                                 checkoutContinued={this.checkoutContinuedHandler}/>
                <Route path={this.props.match.path + '/contact-data'}
                       render={(props) => (<ContactData {...props} ingredients={this.state.ingredients} price={this.state.price}/>)}/>
            </div>
        );
    }
}

export default Checkout;