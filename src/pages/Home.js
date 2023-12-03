import { useEffect, useState } from "react";
import supabase from "../config/supabaseClient";
import SmoothieCard from "../components/SmoothieCard";

const Home = () => {
  const [error, setError] = useState(null);
  const [smoothies, setSmoothies] = useState([]);
  const [orderBy, setOrderBy] = useState("created_at");

  useEffect(() => {
    const fetchSmoothies = async () => {
      const { data, error } = await supabase
      .from("smoothies")
      .select()
      .order(orderBy);
      if (error) {
        setError("Could not fetch the smoothies");
        setSmoothies(null);
        console.log(error);
      }
      if (data) {
        setSmoothies(data);
        setError(null);
      }
    };
    fetchSmoothies();
  }, [orderBy]);

  const handleDelete = (id) => {
    setSmoothies((prevSmoothies) => {
      return prevSmoothies.filter((sm) => sm.id !== id);
    });
  };

  return (
    <div className="page home">
      {error && <p>{error}</p>}
      {smoothies && (
        <div className="smoothies">
          <div className="order-by">
            <p>Order by:</p>
            <button onClick={() => setOrderBy('created_at')}>Time Created</button>
            <button onClick={() => setOrderBy('title')}>Title</button>
            <button onClick={() => setOrderBy('rating')}>Rating</button>
          </div>
          <div className="smoothie-grid">
            {smoothies.map((smoothie) => (
              <SmoothieCard
                smoothie={smoothie}
                key={smoothie.id}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
