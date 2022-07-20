import {
    GET_RECIPES,
    GET_DIETS,
    GET_RECIPE_DETAIL,
    POST_RECIPE,
    SET_LOADING,
    PAGINATE_RESULTS,
    
    RESET_RESPONSE,
} from "../types";


const initialState = {

  allRecipes:[],
    showedRecipes: [],
    paginatedResults: [],
  
    currentPage: 0,

    diets: [],

   
    recipeDetail: {},


    form: [],

    loading: false,


}

function getRecipe(state, payload) {
    let newState = {
        ...state,
       
        allRecipes: payload,
        showedRecipes:payload,
        loading : false,
    }

    if (payload.msg) {
        newState.paginatedResults = [];
        newState.loading = false;
    }
    return newState

}
function rootReducer(state = initialState, action) {
    switch (action.type) {
        case GET_RECIPES: return getRecipe(state, action.payload)
        case 'SEARCH_RECIPE': return {
          ...state, 
          showedRecipes:action.payload,
          loading : false,
              
        }
        case GET_DIETS: return {
            ...state, diets: action.payload
        }
      
        case GET_RECIPE_DETAIL: return {
            ...state,
            recipeDetail: action.payload,
            loading: state.loading && false
        }
        case POST_RECIPE: return {
            ...state, form: action.payload
        }
        case SET_LOADING: return {
            ...state,
            loading: action.payload
        }
        case PAGINATE_RESULTS: return {
            ...state,
            paginatedResults: action.payload,
            currentPage: 0,
            loading: state.loading && false
        }
    
        case RESET_RESPONSE: return {
            ...state,
            showedRecipes: state.allRecipes
        }
       
        case "FILTER_TYPES":
      const allDiets = state.showedRecipes;
      const filterTypes =
        action.payload === "all"
          ? state.allRecipes
          : allDiets.filter((r) => r.diets.includes(action.payload));
      return {
        ...state,
        showedRecipes: filterTypes,
      };
    case "ORDER_BY_NAME":
      const orderName =
        action.payload === "all"
          ? state.showedRecipes
          : action.payload === "asc"
          ? state.showedRecipes.sort((a, b) => {
              return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
            })
          : state.showedRecipes.sort((a, b) => {
              return b.name.toLowerCase().localeCompare(a.name.toLowerCase());
            });
      return {
        ...state,
        showedRecipes: orderName,
      };
    case "ORDER_BY_SCORE":
      const orderScore =
        action.payload === "all"
          ? state.showedRecipes
          : action.payload === "high"
          ? state.showedRecipes.sort((a, b) => b.healthScore - a.healthScore)
          : state.showedRecipes.sort((a, b) => a.healthScore - b.healthScore);
      return {
        ...state,
        showedRecipes: orderScore,
      };
      case 'SET_PAGE': return {
		...state,
		currentPage: action.payload,
	}
      case 'CLEAN_SEARCH': return {
        ...state
      }
        default: return state
    }

}

export default rootReducer