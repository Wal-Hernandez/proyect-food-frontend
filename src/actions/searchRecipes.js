
export default function searchRecipes(response,name) {
 
  const search = response.filter(recipe => recipe.name.toLowerCase().includes(name.toLowerCase()));
    return {
            type: 'SEARCH_RECIPE',
            payload: search 
          };
    }
