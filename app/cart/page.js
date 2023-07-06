"use client";
import { primary } from "@/lib/colors";
import Center from "@/components/Center";
import Header from "@/components/Header";
import React, { useContext, useEffect, useState } from "react";
import { styled } from "styled-components";
import { CartContext } from "@/components/CartContext";
import axios from "axios";
import Table from "@/components/Table";
import Button from "@/components/Button";
import Input from "@/components/Input";

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  margin-top: 40px;
  @media screen and (min-width: 768px){
    grid-template-columns: 1.3fr 0.7fr;
  }
`;

const Box = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;
`;

const CartButton = styled.button`
  background-color: #000;
  color: #fff;
  padding: 5px 7px;
  border-radius: 5px;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  text-align: center;
  text-decoration: none;
  font-family: "Poppins", sans-serif;
  font-weight: 400;
  font-size: small;
  width: 100%;
`;

const ProductInfoCell = styled.td`
  padding: 10px 0;
`;

const ProductImageBox = styled.div`
  width: 100px;
  height: 100px;
  padding: 5px;
  box-shadow: 0 0 50px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  img {
    max-width: 80px;
    max-height: 80px;
  }
`;

const QuantityLabel = styled.span`
  padding: 0 15px;
  display:block;
  @media screen and (min-width: 768px){
    display:inline-block;
    padding: 0 15px;
  }
`;

const CityHolder = styled.div`
  display: flex;
  gap: 5px;
`;

const CartPage = () => {
  const { cartProducts, addProduct, removeProduct, clearCart } =
    useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");

  useEffect(() => {
    if (cartProducts?.length > 0) {
      axios
        .post("/api/cart", { ids: cartProducts })
        .then((response) => {
          setProducts(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setProducts([]);
    }
  }, [cartProducts]);

  useEffect(() => {
    if (window.location.href.includes("success")) {
      clearCart();
    }
  }, [clearCart]);

  function moreOfThisProduct(id) {
    addProduct(id);
  }

  function lessOfThisProduct(id) {
    removeProduct(id);
  }

  let total = 0;
  for (const productId of cartProducts) {
    const price = products.find((p) => p._id === productId)?.price || 0;
    total += price;
  }



  async function processPayment(e) {
    e.preventDefault();
    

    const response = await axios.post("/api/checkout", {
      name,
      email,
      city,
      postalCode,
      streetAddress,
      country,
      cartProducts,
    });

    if (response.data.url) {
      window.location = response.data.url;
    }

    // window.location.assign(data);
  }

  const resetCart = () => {
    clearCart()
  }

  if (window.location.href.includes("success")) {
    return (
      <>
        <Header />
        <Center>
          <ColumnsWrapper>
            <Box>
              <h1>Thanks for your order!</h1>
              <p>We will email you when your order will be sent.</p>
            </Box>
          </ColumnsWrapper>
        </Center>
      </>
    );
  }

  return (
    <>
      <Header />
      <Center>
        <ColumnsWrapper>
          <Box>
            <h2>Cart</h2>
            {!cartProducts?.length && <div>Your cart is empty</div>}
            {products?.length > 0 && (
              <Table>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                </thead>

                <tbody>
                  {products?.map((product) => (
                    <tr key={product.title}>
                      <ProductInfoCell>
                        <ProductImageBox>
                          <img src={product.images[0]} alt="product" />
                        </ProductImageBox>

                        {product.title}
                      </ProductInfoCell>
                      <td>
                        <Button onClick={() => lessOfThisProduct(product._id)}>
                          -
                        </Button>
                        <QuantityLabel>
                          {
                            cartProducts.filter((id) => id === product._id)
                              .length
                          }
                        </QuantityLabel>

                        <Button onClick={() => moreOfThisProduct(product._id)}>
                          +
                        </Button>
                      </td>
                      <td>
                        $
                        {cartProducts.filter((id) => id === product._id)
                          .length * product.price}
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td></td>
                    <td></td>
                    <td><Button onClick={resetCart} >
                         Clear Cart
                        </Button></td>
                    <td>Total ${total}</td>
                   
                  </tr>
                </tbody>
              </Table>
            )}
          </Box>
          {!!cartProducts?.length && (
            <Box>
              <h2>Order Information</h2>
              <form onSubmit={processPayment}>
                <Input
                  type="text"
                  placeholder="Name"
                  value={name}
                  name="name"
                  onChange={(e) => setName(e.target.value)}
                />
                <Input
                  type="text"
                  placeholder="Email"
                  value={email}
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <CityHolder>
                  <Input
                    type="text"
                    placeholder="City"
                    value={city}
                    name="city"
                    onChange={(e) => setCity(e.target.value)}
                  />
                  <Input
                    type="text"
                    placeholder="Postal Code"
                    value={postalCode}
                    name="postalCode"
                    onChange={(e) => setPostalCode(e.target.value)}
                  />
                </CityHolder>
                <Input
                  type="text"
                  placeholder="Street Address"
                  value={streetAddress}
                  name="streetAddress"
                  onChange={(e) => setStreetAddress(e.target.value)}
                />
                <Input
                  type="text"
                  placeholder="Country"
                  value={country}
                  name="country"
                  onChange={(e) => setCountry(e.target.value)}
                />
                {/* <input
                  type="hidden"
                  name="products"
                  value={cartProducts.join(",")}
                /> */}
                <CartButton type="submit">Continue to Payment</CartButton>
              </form>
            </Box>
          )}
        </ColumnsWrapper>
      </Center>
    </>
  );
};

export default CartPage;
