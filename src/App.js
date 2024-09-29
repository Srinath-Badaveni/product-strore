import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import Categories from "./components/Categories";
import Products from "./components/Products";
import {useSelector} from 'react-redux'


const App = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [PageNo, setPageNo] = useState(1);

  const currCategory = useSelector(state => state.category.category.name);
  // Fetch categories
  useEffect(() => {
    axios
      .get("https://dummyjson.com/products/categories")
      .then((response) => setCategories(response.data))
      .catch((error) => console.error("Error fetching categories", error));
  }, []);

  let limit = 50;
  // Function to fetch products
  const fetchProducts = async (category = "", search = "") => {
    setLoading(true);
    try {
      const response = await axios.get(`https://dummyjson.com/products`, {
        params: {
          limit: limit,
          category: category || undefined,
          q: search || undefined,
        },
      });
      setProducts(response.data.products);
    } catch (error) {
      console.error("Error fetching products", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch products when category or search term changes
  useEffect(() => {
    fetchProducts(setCategories, searchTerm);
  }),[setCategories,searchTerm];

  // Handle search button click
  const handleSearch = () => {
    fetchProducts(setCategories, searchTerm);
  };

  const handlePrev = () => {
    if (PageNo === 1) {
      setPageNo(1);
    } else {
      setPageNo(PageNo - 1);
    }
  };
  const handleNext = () => {
    if (PageNo === limit/10) {
      setPageNo(limit/10);
    } else {
      setPageNo(PageNo + 1);
    }
  };

  return (
    <div className="App">
      <Navbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onSearch={handleSearch} // Pass the search handler
      />

      <div style={{ paddingTop: "60px" }}>
        <Categories
          categories={categories}
        />

        <Products
          products={products}
          searchTerm={searchTerm}
          PageNo={PageNo}
        />

        {loading && <p>Loading...</p>}
      </div>
      <div className="bg-white-800 p-4 mt-8 justify-center flex">
        <div onClick={handlePrev} className="px-8 hover:cursor-pointer">
          <i class="fa-solid fa-arrow-left"></i>
        </div>
        <div className="font-bold">{PageNo}</div>
        <div onClick={handleNext} className="px-8 hover:cursor-pointer">
          <i class="fa-solid fa-arrow-right"></i>
        </div>
      </div>
    </div>
  );
};

export default App;
