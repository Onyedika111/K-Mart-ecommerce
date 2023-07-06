"use client";
import React, { useContext } from "react";
import Center from "./Center";
import { styled } from "styled-components";
import Button from "./Button";
import ButtonLink from "./ButtonLink";
import { CartIcon } from "./icons/CartIcon";
import { CartContext } from "./CartContext";

const Bg = styled.div`
  background-color: #222;
  color: #fff;
  padding: 50px 0;
`;
const Title = styled.h1`
  margin: 0;
  font-weight: bold;
  font-size: 1.5rem;
  @media screen and (min-width: 768px) {
    font-size: 3rem;
  }
`;

const Desc = styled.p`
  color: #aaa;
  font-size: 0.8rem;
`;

const ColumnsWrapper = styled.div`
  display: grid;

  grid-template-columns: 1fr;
  gap: 40px;
  img {
    max-width: 100%;
    max-height:200px;
    display:block;
    margin:0 auto;
  }
  div:nth-child(1){
    order:2;
  }
  @media screen and (min-width: 768px) {
    grid-template-columns: 1.1fr 0.9fr;
    div:nth-child(1){
      order:0;
    }
    img {
      max-width: 100%;
    }
  }
`;

const Column = styled.div`
  display: flex;
  align-items: center;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 25px;
`;

function Featured({ heroInfo }) {
  const { addProduct } = useContext(CartContext);
  function addFeaturedToCart() {
    addProduct(heroInfo._id);
  }

  return (
    <Bg>
      <Center>
        <ColumnsWrapper>
          <Column>
            <div>
              <Title>{heroInfo?.title}</Title>
              <Desc>{heroInfo?.description}</Desc>
              <ButtonsWrapper>
                <ButtonLink
                  href={"/product/" + heroInfo?._id}
                  outline={1}
                  white={1}
                >
                  Read more
                </ButtonLink>
                <Button white onClick={addFeaturedToCart}>
                  <CartIcon />
                  Add to cart
                </Button>
              </ButtonsWrapper>
            </div>
          </Column>

          <Column>
            <img
              src={heroInfo?.images[0]}
              alt=""
            />
          </Column>
        </ColumnsWrapper>
      </Center>
    </Bg>
  );
}

export default Featured;