import React from "react";
import Aux from '../../../hoc/Auxiliary';

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map(igKey => {
            return (
                <li>
                    <span key={igKey} style={{textTransform: 'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}
                </li>
            )
        });

    return (
        <Aux>
            <h3>Your Order</h3>
            <p>Here is your delicious burger</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Continue to check out</p>
        </Aux>
    );
};

export default orderSummary;