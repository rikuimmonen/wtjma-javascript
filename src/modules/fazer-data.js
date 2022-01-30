const FazerFormat = (items, day) => {
  const array = [];
  const daysMenu = items[day].SetMenus;
  for (let i = 0; i < daysMenu.length; i++) {
    const meals = daysMenu[i].Meals;
    let meal = '';

    for (let j = 0; j < meals.length; j++) {
      meal += meals[j].Name + ' ';
    }

    array.push(meal);
  }

  return array;
};

const FazerData = {FazerFormat};
export default FazerData;
