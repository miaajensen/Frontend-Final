import { useState, useEffect } from 'react';

function CategoryCard({ category }) {
    return (
        <div className="category-card">
            <button className="category-title">
                category = {category}
            </button>
        </div>
    );
}

export default CategoryCard;