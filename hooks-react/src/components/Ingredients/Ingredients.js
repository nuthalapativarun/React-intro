import React, { useReducer, useEffect, useCallback, useMemo } from 'react';
import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import ErrorModal from '../UI/ErrorModal';
import Search from './Search';
import useHttp from '../../hooks/http';

const ingredientReducer = (currentIngredients, action) => {
  switch (action.type) {
    case 'SET':
      return action.ingredients;
    case 'ADD':
      return [...currentIngredients, action.ingredient];
    case 'DELETE':
      return currentIngredients.filter(ing => ing.id !== action.id);
    default: throw new Error('Should not get there');
  }
}


const Ingredients = () => {
  const [ingredients, dispatch] = useReducer(ingredientReducer, []);
  const {isLoading, error, data, sendRequest, extra, identifier, clear} = useHttp();
  
  useEffect(() => {
    if(!isLoading && !error && identifier === 'REMOVE_INGREDIENT'){
      dispatch({type: 'DELETE', id: extra})
    }else if(!isLoading && !error && identifier === 'ADD_INGREDIENT'){
      dispatch({
        type: 'ADD',
        ingredient: { id: data.name, ...extra }
      });
    }
    
  }, [data, extra, identifier, isLoading, error]);

  const filteredIngredientsHandler = useCallback(filteredIngredients => {
    dispatch({
      type: 'SET',
      ingredients: filteredIngredients
    })
  }, []);

  const addIngredientHandler = useCallback(ingredient => {
    sendRequest(
      'https://react-hooks-51857.firebaseio.com/ingredients.json',
      'POST',
      JSON.stringify(ingredient),
      ingredient,
      'ADD_INGREDIENT'
    );
  }, [sendRequest]);

  const removedIngredientHandler = useCallback(id => {
    sendRequest(
      `https://react-hooks-51857.firebaseio.com/ingredients/${id}.json`, 
      'DELETE',
      null,
      id,
      'REMOVE_INGREDIENT'
      );
  }, [sendRequest]);

  const ingredientList = useMemo(() => {
    return (
      <IngredientList 
        ingredients={ingredients} 
        onRemoveItem={removedIngredientHandler}
       />
    );
  }, [ingredients])
  return (
    <div className="App">
      {error && <ErrorModal onClose={clear}>{error}</ErrorModal>}
      <IngredientForm 
        onAddIngredient={addIngredientHandler}
        loading={isLoading} />

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler} />
        {ingredientList}
      </section>
    </div>
  );
}

export default Ingredients;
