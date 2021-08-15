import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { addToBasket } from "../actions/BasketActions";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  z-index: 1;
  padding: 20px;
  margin: 10px;
  align-items: center;
  justify-content: flex-end;
  background-color: white;
  width: 100%;
  max-height: 400px;
  min-width: 100px;

  > img {
    max-height: 200px;
    width: 100%;
    object-fit: contain;
    margin-bottom: 15px;
  }

  > button {
    border: 1px solid;
    margin-top: 10px;
    background: #f0c14b;
    border-color: #a88734 #9c7e31 #846a29;
    color: #111;
  }
`;

const ProductInfo = styled.div`
  height: 100px;
  margin-bottom: 15px;
`;

const ProductPrice = styled.p`
  margin-top: 5px;
`;

const ProductRating = styled.div`
  display: flex;
`;

function Product(props) {
  return (
    <Container>
      <ProductInfo>
        <p>{props.title}</p>
        <ProductPrice>
          <small>$</small>
          <strong>{props.price}</strong>
        </ProductPrice>
        <ProductRating>
          {Array(props.rating)
            .fill()
            .map((_, i) => (
              <p>⭐</p>
            ))}
        </ProductRating>
      </ProductInfo>
      <img src={props.image} alt="" />
      <button onClick={() => props.addToBasket(props)}>Add to Basket</button>
    </Container>
  );
}

export default connect(null, { addToBasket })(Product);
