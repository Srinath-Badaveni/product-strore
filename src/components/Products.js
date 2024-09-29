import React from "react";
import { useSelector } from "react-redux";


const Products = ({ products, searchTerm, PageNo }) => {
  let category = useSelector((state) => state.category.category.name);
  let setSearch = useSelector((state)=> state)
  console.log(setSearch)
  let cat = ''
  if (category) {
    cat = category.toLowerCase();
  }else{
    category = ''
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.length > 0 ? (
            products
              .filter((products) => {
                return (
                  products.id <= PageNo * 10 && products.id > PageNo * 10 - 10
                );
              })
              .filter((products) => {
                return searchTerm.toLowerCase() === ""
                  ? products
                  : products.title.toLowerCase().includes(searchTerm);
              })
              .filter((products) => {
                return cat === ''
                  ? products
                  : products.category.toLowerCase().includes(cat);
              })
              .map((product) => (
                <a key={product.id} href={product.href} className="group">
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                    <img
                      alt={product.imageAlt}
                      src={product.thumbnail}
                      className="h-full w-full object-cover object-center group-hover:opacity-75"
                    />
                  </div>
                  <h3 className="mt-4 text-sm text-gray-700">
                    {product.title}
                  </h3>
                  <p className="mt-1 text-lg font-medium text-gray-900">
                    ${product.price}
                  </p>
                </a>
              ))
          ) : (
            <p>No products found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
