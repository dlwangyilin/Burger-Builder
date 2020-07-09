import React, {Component} from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../Components/Burgur/Burger';
import BurgerControls from '../../Components/Burgur/BuildControls/BuildControls';
import Modal from '../../Components/UI/Modal/Modal';
import OrderSummary from'../../Components/Burgur/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import logo from "../../Components/Logo/Logo";
import Spinner from '../../Components/UI/Spinner/Spinner';
import withErrorHandler from "../../hoc/WithErrorHandler/WithErrorHandler";

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    };

    componentDidMount() {
        axios.get('/ingredients.json')
            .then(response => {
                this.setState({ingredients: response.data});
            }).catch(error => {this.setState({error: true})});
    }

    updatePurchaseState(ingredients) {

        const sum = Object.keys( ingredients )
            .map( igKey => {
                return ingredients[igKey];
            } )
            .reduce( ( sum, el ) => {
                return sum + el;
            }, 0 );
        this.setState({purchasable: sum > 0});

    };

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const newCount = oldCount + 1;
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = newCount;
        const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
        this.setState({ingredients: updatedIngredients, totalPrice: newPrice});
        this.updatePurchaseState(updatedIngredients);
    };

    removeIngredientHandler = (type) => {
        // type is passed by string, so we need to use bracket notation instead of dot notation.
        if (this.state.ingredients[type] <= 0) {
            alert("You don't have that ingredient");
            return;
        }
        const newCount = this.state.ingredients[type] - 1;
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = newCount;
        const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
        this.setState({ingredients: updatedIngredients, totalPrice: newPrice});
        this.updatePurchaseState(updatedIngredients);
    };

    purchaseHandler = () => {
        this.setState({purchasing: true})
    };

    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
    };

    purchaseContinueHandler = () => {

        const queryParams = [];
        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        queryParams.push('price=' + this.state.totalPrice);
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
    }

    render() {
        const disableInfo = {
            ...this.state.ingredients
        };

        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0;
        }

        let orderSummary = null;

        let burger = this.state.error? <p>This can't be loaded</p> : <Spinner/>;

        if (this.state.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients}/>
                    <BurgerControls
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        disabled={disableInfo}
                        price={this.state.totalPrice}
                        purchasable={this.state.purchasable}
                        ordered={this.purchaseHandler}
                    />
                </Aux>
            );

            orderSummary = (
                <OrderSummary
                    ingredients={this.state.ingredients}
                    price={this.state.totalPrice}
                    purchaseCanceled={this.purchaseCancelHandler}
                    purchaseContinued={this.purchaseContinueHandler}
                />
            );
        }

        if (this.state.loading) {
            orderSummary = <Spinner/>
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);