import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import styles from './RecipePageComponent.css'

import RecipeListComponent from '../RecipeListComponent';
import * as domainActions from '../../actions/domainActions'
import SingleRecipeViewComponent from '../SingleRecipeViewComponent'
import endpoint from '../../utils/endpoint';

class RecipePageComponent extends Component {
  constructor(props) {
    super(props)
    
    // if location params change in the same component
    this.props.history.listen((location, action)=>{
      let recipeID = this.props.match.params.recipe
    })
  }
  null
  componentDidMount(){
    this.handleSingleRecipeFetch();
  }
  handleSingleRecipeFetch(){
    if(this.props.recipes.length <= 0){
      this.props.fetchRecipes(endpoint);
    }
  }
  render() {
    return (
      <div className = "RecipePageComponent">
        <nav>
          <Link to="/">Home</Link>
          <RecipeListComponent recipes={this.props.recipes}/>
        </nav>
        <SingleRecipeViewComponent
          recipeID={this.props.match.params.recipe}
          recipes={this.props.recipes}
          />
      </div>
    );
  }
}

RecipePageComponent.propTypes = {}

RecipePageComponent.defaultProps = {}

// export default RecipePageComponent
function mapStateToProps(state) {
  return {
    recipes: state.domainReducer.recipes,
    fetchRecipes: domainActions.fetchRecipes,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    ...domainActions
  }, dispatch);
}

export default connect(
    mapStateToProps,
    mapDispatchToProps)
  (RecipePageComponent);