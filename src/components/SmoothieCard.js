import { Link } from "react-router-dom";
import supabase from "../config/supabaseClient";

const SmoothieCard = ({ smoothie }) => {
  const handleDelete = async () => {
    //Delete record
    const { data, error } = await supabase
      .from("smoothies")
      .delete()
      .eq("id", smoothie.id)
      .select();

    if (error) {
      console.log(error);
    }

    if (data) {
      console.log(data);
    }
  };

  return (
    <div className="smoothie-card">
      <h3>{smoothie.title}</h3>
      <p>{smoothie.method}</p>
      <div className="rating">{smoothie.rating}</div>
      <div className="buttons">
        <Link to={"/" + smoothie.id}>
          <i className="mateiral-icons">edit</i>
        </Link>
        <button onClick={handleDelete}>X</button>
      </div>
    </div>
  );
};

export default SmoothieCard;
