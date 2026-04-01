import { useState, useEffect } from "react";

export default function App() {
  const [user, setUser] = useState(null);
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [age, setAge] = useState("");
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState("");
  const [calories, setCalories] = useState(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("user"));
    if (saved) setUser(saved);
  }, []);

  const login = () => {
    const name = prompt("Enter your name");
    if (name) {
      setUser(name);
      localStorage.setItem("user", JSON.stringify(name));
    }
  };

  const calculate = () => {
    const h = height / 100;
    const bmiVal = (weight / (h * h)).toFixed(1);
    setBmi(bmiVal);

    if (bmiVal < 18.5) setCategory("Underweight");
    else if (bmiVal < 24.9) setCategory("Normal");
    else if (bmiVal < 29.9) setCategory("Overweight");
    else setCategory("Obese");

    const cal = 10 * weight + 6.25 * height - 5 * age + 5;
    setCalories(Math.round(cal));
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>AI Fitness App</h2>

      {!user ? (
        <button onClick={login}>Login</button>
      ) : (
        <p>Welcome {user}</p>
      )}

      <input placeholder="Height" onChange={(e) => setHeight(e.target.value)} />
      <input placeholder="Weight" onChange={(e) => setWeight(e.target.value)} />
      <input placeholder="Age" onChange={(e) => setAge(e.target.value)} />

      <button onClick={calculate}>Calculate</button>

      {bmi && (
        <div>
          <p>BMI: {bmi}</p>
          <p>{category}</p>
          <p>Calories: {calories}</p>
        </div>
      )}
    </div>
  );
}
