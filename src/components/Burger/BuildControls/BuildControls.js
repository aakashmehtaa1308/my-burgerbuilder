import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';


const controls = [
    { label: 'Salad', types: 'salad' },
    { label: 'Bacon', types: 'bacon' },
    { label: 'Cheese', types: 'cheese' },
    { label: 'Meat', types: 'meat' },
];

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
        {controls.map(ctrl => (
            <BuildControl
                key={ctrl.label}
                label={ctrl.label}
                added={() => props.ingredientAdded(ctrl.types)}
                removed={() => props.ingredientRemoved(ctrl.types)}
                disabled={props.disabled[ctrl.types]}/>
        ))}
        <button className={classes.OrderButton } 
            disabled={!props.purchasable}
            onClick={props.ordered}>{props.isAuth ? 'Order NOW!': 'SignIn to Continue'}</button>
    </div>
);

export default buildControls;