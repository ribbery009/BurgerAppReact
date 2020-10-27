import React, {Component} from 'react';
import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

const INGREDIENT_PRICES = {
  salad: 300,
  cheese: 500,
  meat: 1000,
  bacon: 400,
}

class BurgerBuilder extends Component{

  state = {
    ingredients: {
      salad:0,
      bacon:0,
      cheese:0,
      meat:0
    },
    totalPrice: 0,
    purchasable: false,
    purchasing: false
  }

  uptadePurchaseState (ingredients){

    const sum = Object.keys(ingredients).map(igKey => {
    
      return ingredients[igKey];
    })
    .reduce((sum, el) =>{
      return sum+el;
    },0)
    this.setState({purchasable: sum>0})
  }

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCounted = oldCount + 1;
    const updatedIngredients = {...this.state.ingredients};
    updatedIngredients[type]=updatedCounted;
const priceAddition = INGREDIENT_PRICES[type];
const oldPrice = this.state.totalPrice;
const newPrice = oldPrice + priceAddition;
this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
this.uptadePurchaseState(updatedIngredients);
  }

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if(oldCount <=0)
    {
      return;
    }
    const updatedCounted = oldCount - 1;
    const updatedIngredients = {...this.state.ingredients};
    updatedIngredients[type]=updatedCounted;
const priceAddition = INGREDIENT_PRICES[type];
const oldPrice = this.state.totalPrice;
const newPrice = oldPrice - priceAddition;
this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
this.uptadePurchaseState(updatedIngredients);
  }

  purchaseHandler = () => {
    this.setState({purchasing:true});
  }

  purchaseCancelHandler = () =>{
    console.log("PurchaseCancelHand")
    this.setState({purchasing:false});
  }

  purchaseContinueHandler = () => {
  alert("You continue!");
  }
render(){
  console.log("BurgerBuilder.js");
  const disabledInfo = {
    ...this.state.ingredients
  };

  for(let key in disabledInfo){
  disabledInfo[key] = disabledInfo[key] <=0
  }
  return(
    <Aux>
      <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
        <OrderSummary ingredients={this.state.ingredients}
        purchaseCanceled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler}
        price={this.state.totalPrice}/>
      </Modal>
        <Burger ingredients={this.state.ingredients}/>
       <BuildControls
        ingredientAdded={this.addIngredientHandler}
        ingredientRemoved={this.removeIngredientHandler}
        disabled={disabledInfo}
        purchasable={this.state.purchasable}
        price={this.state.totalPrice}
        ordered={this.purchaseHandler}/>
    </Aux>
  )
}

}

export default BurgerBuilder;