import React from "react";
import classes from './Burger.module.css';
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

const burger = (props) => {
    let transformedIngredients = Object.keys( props.ingredients )
        .map( igKey => {
            return [...Array( props.ingredients[igKey] )].map( ( _, i ) => {
                return <BurgerIngredient key={igKey + i} type={igKey} />;
            } );
        } )
        .reduce((arr, el) => {
            return arr.concat(el)
        }, []);
    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Please start adding ingredients!</p>;
    }
    /*
    Object.keys(props.ingredients) 会把这个object的所有key作为string的形式放进array里
    比如有两层肉，那我们就需要生成两个<BurgerIngredient type = 'Meat'/>,这是通过生成一个长度为2的数组，再调用map函数实现的。
    [...Array(props.ingredients[igKey])].map((_, i)
     */

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type={"bread-top"} />
            {transformedIngredients}
            <BurgerIngredient type={"bread-bottom"} />
        </div>
    );
};

export default burger;