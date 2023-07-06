import React, { useState } from "react";
import { styled } from "styled-components";

const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
`;

const BigImage = styled.img`
  mamax-width: 100%;
  max-height: 200px;
`;
const ImageButtons = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 10px;
  margin-top: 10px;
`;

const ImageButton = styled.div`
  height: 60px;
  padding: 2px;
  cursor: pointer;
  border-radius: 5px;
  ${props => !props.active && 'opacity: .6'}
`;

const BigImageWrapper = styled.div`
  text-align: center;
`;

const ProductImages = ({ images }) => {
  const [activeImage, setActiveImage] = useState(images?.[1]);
  console.log(images?.[0]);
  return (
    <>
      <BigImageWrapper>
        <BigImage
          src={activeImage ? activeImage : images?.[1]}
          alt="display product"
        />
      </BigImageWrapper>

      <ImageButtons>
        {images?.map((image) => (
          <ImageButton key={image} active={image === activeImage} onClick={() => setActiveImage(image)}>
            <Image src={image} alt="diplay product" />
          </ImageButton>
        ))}
      </ImageButtons>
    </>
  );
};

export default ProductImages;
