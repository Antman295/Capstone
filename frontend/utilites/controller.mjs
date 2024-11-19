import axios from 'axios';

async function getRecipes() {
    try {
        let url = 'http://localhost:3000/api/recipes';

        let res = await axios.get(url);

        return res.data;
    } catch (err) {
        console.error(err);
    }
}

async function createRecipe(formData) {
    try {
        let url = 'http://localhost:3000/api/recipes';

        let res = await axios.post(url, formData);

        return res.data;
    } catch (err) {
        console.err(err);
    }
}

async function deleteRecipe(id) {
    try {
      let url = `http://localhost:3000/api/recipes/${id}`;
  
      let res = await axios.delete(url);
  
      return true;
    } catch (err) {
      console.error(err);
    }
  }
  
  async function updateRecipe(id, formData) {
    try {
      let url = `http://localhost:3000/api/recipes/${id}`;

  
      let res = await axios.put(url, formData);
  
      return res.data;
    } catch (err) {
      console.error(err);
    }
  }
  
  async function findOneRecipe(id) {
    try {
      let url = `http://localhost:3000/api/recipes/${id}`;
  
      let res = await axios.get(url);
  
      return res.data;
    } catch (err) {
      console.error(err);
    }
  }
  
  export {
    getRecipes,
    createRecipe,
    deleteRecipe,
    updateRecipe,
    findOneRecipe,
  };