import React from 'react';
import classes from './Burger.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'


const burger = (props) => {
  console.log("[Burger.js] Object", props.ingredients)
  let transformedIngredients = Object.keys(props.ingredients)
  .map( igKey => {
    console.log("[Burger.js,First Map,keys]",igKey)
  return [...Array(props.ingredients[igKey])].map((_,i) => {
    console.log("[Burger.js] Second map,i: ",i)
    console.log("[Burger.js] Second map,igKey: ",igKey)
    return <BurgerIngredient key={igKey+i} type={igKey} />;
  })
  })
  .reduce((arr,curr) => {
    return arr.concat(curr);
    }, [])

    if(transformedIngredients.length === 0)
    {
    transformedIngredients=<p>Please starting add ingredients!</p>
    }
  console.log("[Burger.js] init trans: ",transformedIngredients);
  return(
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top"/>
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom"/>
    </div>
  );
};

export default burger;