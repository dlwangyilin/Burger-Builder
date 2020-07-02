import React from "react";
import classes from './NaviationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = () => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" active={true}>
            Burger Builder
        </NavigationItem>
        <NavigationItem link="/" active={false}>
            Checkout
        </NavigationItem>
    </ul>
);

export default navigationItems;