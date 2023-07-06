"use client";
import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import Featured from "@/components/Featured";
import NewProduct from "@/components/NewProduct";

const HomePage = () => {
  const [heroData, setHeroData] = useState(null);
  const [newProductData, setNewProductData] = useState(null);

  const fetchHeroData = async () => {
    const id = "64a5cff2ce89b532d6bc6d35";
    const response = await fetch("/api/product/" + id);
    const data = await response.json();

    setHeroData(data);
  };

  const fetchNewProductData = async () => {
 
    const response = await fetch("/api/product" );
    const data = await response.json();

    setNewProductData(data);
  };

  console.log(newProductData)

  useEffect(() => {
  
    fetchHeroData();
    fetchNewProductData()
  }, []);



  return (
    <div>
      <Header  />
      <Featured heroInfo={heroData} />
      <NewProduct newProducts={newProductData} />
    </div>
  );
};

export default HomePage;
