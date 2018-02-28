import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import styles from './RecipePageComponent.scss'
import RecipeListComponent from '../RecipeListComponent'
import { fetchRecipes } from '../../actions/domainActions'
import SingleRecipeViewComponent from '../SingleRecipeViewComponent'
import endpoint from '../../utils/endpoint'
import { HeaderComponent } from '../HeaderComponent/HeaderComponent';

class RecipePageComponent extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount(){
    console.log('componentDidMount');
    this.handleSingleRecipeFetch()
  }
  handleSingleRecipeFetch(){
    if(this.props.recipes.length <= 0){
      console.log('fetchingRecipes')
      this.props.fetchRecipes(endpoint)
    }
  }
  handleNavToggle(recipe){
    console.log(recipe)
  }
  render() {
    return (
      <div className = "RecipePageComponent">
        <HeaderComponent />
        <SingleRecipeViewComponent
            recipeID={this.props.match.params.recipe}
            recipes={this.props.recipes}
            />
      </div>
    );
  }
}

RecipePageComponent.propTypes = {
  fetchRecipes: PropTypes.func,
  recipes: PropTypes.array,
}

function mapStateToProps(state) {
  return {
    recipes: state.domainReducer.recipes,
    fetchRecipes,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchRecipes
  }, dispatch);
}

export default connect(
    mapStateToProps,
    mapDispatchToProps)
  (RecipePageComponent);