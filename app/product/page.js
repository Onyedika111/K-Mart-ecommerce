"use client";
import { useState, useEffect } from "react";

import Center from "@/components/Center";
import Header from "@/components/Header";
import { styled } from "styled-components";
import ProductsGrid from "@/components/ProductsGrid";

const Title = styled.h1`
  font-size: 1.5em;
`;

function ProductPage() {
  const [products, setProducts] = useState(null);

  const fetchAllProducts = async () => {
    const response = await fetch("/api/allproducts");
    const data = await response.json();

    setProducts(data);
  };



  useEffect(() => {
    fetchAllProducts();
  }, []);

  return (
    <>
      <Header />
      <Center>
              <Title>All Products</Title>
              <ProductsGrid products={products} />
      </Center>
    </>
  );
}

export default ProductPage;
