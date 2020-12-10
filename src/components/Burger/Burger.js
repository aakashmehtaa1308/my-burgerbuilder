import React from 'react';

import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {

    let transformedIngredients = Object.keys(props.ingredients).map(igKey => {
        // console.log(igKey);//transform all keys of object into an array...
        // console.log([...Array(props.ingredients[igKey])]);//makes an array of null values with size of props.ingredients[igKey] ..
        return [...Array(props.ingredients[igKey])].map((hra, i) => {
            // console.log(hra);
            return <BurgerIngredient key = {igKey + i} type = {igKey} />;
        });
    }).reduce((arr, el) => { //arr is previous value(result up to previous state) and el is current value..
        return arr.concat(el);
    }, []);
    // reduce is used to convert array of arrays in single array..
    if(transformedIngredients.length === 0) {
        transformedIngredients = <p>Please start adding ingredients!</p>
    }


    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
};

export default burger;