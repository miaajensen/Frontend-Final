import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";


function CategoryCard({ category }) {
    const navigate = useNavigate();

    const { setSelectedCategory } = useAppContext();

    function handleClick() {
        setSelectedCategory(category);
        navigate('/results');
    }

    return (
        <div className="category-card">
            <button
                className="category-title"
                onClick={handleClick}
            >
                {category}
            </button>
        </div>
    );
}


export default CategoryCard;