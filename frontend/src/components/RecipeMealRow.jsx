function RecipeMealRow({ meal_type }) {
    return (
      <tr>
        <th colSpan={4}>{meal_type}</th>
      </tr>
    );
  }
  
  export default RecipeMealRow;