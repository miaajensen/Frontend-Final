function CategoryCard({ category }) {
    return (
        <div className="category-card">
            <button className="category-title">
                {category}
            </button>
        </div>
    );
}

export default CategoryCard;