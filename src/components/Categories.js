import React, { useRef } from 'react';
import './Categories.css';
import { useDispatch } from 'react-redux';
import {setCat} from '../redux/slices/cat'

const Categories = ({ categories, selectedCategory }) => {
  const scrollRef = useRef(null);
  const dispatch = useDispatch();

  const scroll = (direction) => {
    const scrollAmount = 150;
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += direction === 'left' ? -scrollAmount : scrollAmount;
    }
  };

  return (
    <div className="categories-container">
      <button className="scroll-btn left" onClick={() => scroll('left')}>←</button>

      <div className="categories-list" ref={scrollRef}>
        <ul>
          <li
            style={{ cursor: 'pointer', fontWeight: !selectedCategory ? 'bold' : 'normal' }}
            onClick={(e)=> dispatch(setCat({name:''}))}
          >
            All
          </li>
          {categories.map((category) => (
            <li
              key={category.slug} // Assuming slug is unique
              // className={category.slug === selectedCategory ? 'selected' : ''}
              onClick={(e)=> dispatch(setCat({name:category.name}))}
            >
              {category.name}
            </li>
          ))}
        </ul>
      </div>

      <button className="scroll-btn right" onClick={() => scroll('right')}>→</button>
    </div>
  );
};


export default Categories;
