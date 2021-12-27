import { useState, useEffect } from "react";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";

import classes from "./AvailableMeals.module.css";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        "https://test-bc676.firebaseio.com/meals.json"
      );

      if (!response.ok) {
        throw new Error("Something went wron!");
      }

      const responseData = await response.json();

      const loadedMeals = [];

      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }
      setMeals(loadedMeals);
      setLoading(false);
    };

    fetchMeals().catch((error) => {
      setLoading(false);
      setError(error.message);
      console.log(error.message);
    });
  }, []);

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.name}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        {loading && !error ? (
          <p style={{ fontStyle: "italic", textAlign: "center" }}>Loading...</p>
        ) : (
          <ul>{mealsList}</ul>
        )}
        {error && (
          <p style={{ color: "red", font: "bold", fontStyle: "italic" }}>
            Error occured: {error}
          </p>
        )}
      </Card>
    </section>
  );
};

export default AvailableMeals;
