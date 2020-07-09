import React, {Component} from "react";
import CheckoutSummary from '../../Components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component{
    state = {
        ingredients: {
            salad: 1,
            meat: 1,
            cheese: 1,
            bacon: 1
        }
    }

    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        for (let param of query.entries()) {
            // in用于遍历object的属性，of用于遍历iterable对象
            // param - ['salad', '1']
            ingredients[param[0]] = +param[1];  // 取出来的是字符，+用来转换成数字

        }
        this.setState({ingredients: ingredients});
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
            </div>
        );
    }
}

export default Checkout;