import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { removeFromBasket } from "../actions/BasketActions";

const Container = styled.div`
  display: flex;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const ProductInfo = styled.div`
  padding-left: 20px;

  > button {
    background: #f0c14b;
    border: 1px solid;
    margin-top: 10px;
    border-color: #a88734 #9c7e31 #846a29;
    color: #111;
  }
`;

const Image = styled.img`
  object-fit: contain;
  width: 180px;
  height: 180px;
`;

const Title = styled.p`
  font-size: 17px;
  font-weight: 800;
`;

const Price = styled.p``;

const Rating = styled.p`
  display: flex;
`;

function CheckoutProduct({
  id,
  title,
  price,
  image,
  rating,
  removeFromBasket,
  hideButton,
}) {
  return (
    <Container>
      <Image src={image} alt="" />
      <ProductInfo>
        <Title>{title}</Title>
        <Price>
          <small>$</small>
          <strong>{price}</strong>
        </Price>
        <Rating>
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p>⭐</p>
            ))}
        </Rating>
        {!hideButton && (
          <button onClick={() => removeFromBasket(id)}>
            Remove from Basket
          </button>
        )}
      </ProductInfo>
    </Container>
  );
}

export default connect(null, { removeFromBasket })(CheckoutProduct);
