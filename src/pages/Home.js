import { useEffect, useState } from "react";
import supabase from "../config/supabaseClient";
import SmoothieCard from "../components/SmoothieCard";

const Home = () => {
  const [error, setError] = useState(null);
  const [smoothies, setSmoothies] = useState([]);

  useEffect(() => {
    const fetchSmoothies = async () => {
      const { data, error } = await supabase.from("smoothies").select();
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
  }, []);

  return (
    <div className="page home">
      {error && <p>{error}</p>}
      {smoothies && (
        <div className="smoothies">
          <div className="smoothie-grid">
            {smoothies.map((smoothie) => (
              <SmoothieCard smoothie={smoothie} key={smoothie.id} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
