"use client";
import { styled } from "styled-components";
import Center from "@/components/Center";
import Header from "@/components/Header";
import { useState, useEffect, useContext } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import ProductImages from "@/components/ProductImages";
import Button from "@/components/Button";
import { CartIcon } from "@/components/icons/CartIcon";
import { CartContext } from "@/components/CartContext";

const Title = styled.h1`
  font-size: 1.5em;
`;

const ColWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  margin-top: 40px;
  @media screen and (min-width: 768px){
    grid-template-columns: 0.8fr 1.2fr;
  }
`;

const Box = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;
`;

const PriceRow = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;
const Price = styled.span`
  font-size: 1.4rem;
`;
const ProductPage = () => {
  const { id } = useParams();
  const [productDetails, setProductDetails] = useState({});
  const { addProduct } = useContext(CartContext);

  useEffect(() => {
    axios
      .get("/api/product/" + id)
      .then((res) => {
        setProductDetails(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Header />
      <Center>
        <ColWrapper>
          <Box>
            <ProductImages images={productDetails.images} />
          </Box>
          <div>
            <Title>{productDetails.title}</Title>
            <p>{productDetails.description}</p>
            <PriceRow>
              <Price>
                <div>${productDetails.price}</div>
              </Price>
              <div>
                <Button onClick={() => addProduct(productDetails._id)}>
                  <CartIcon />
                  Add to cart
                </Button>
              </div>
            </PriceRow>
          </div>
        </ColWrapper>
      </Center>
    </>
  );
};

export default ProductPage;
