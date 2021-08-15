import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import CheckoutProduct from "./CheckoutProduct";
import Subtotal from "./Subtotal";

const Container = styled.div`
  display: flex;
  padding: 20px;
  background-color: white;
  height: max-content;
`;

const LeftPage = styled.div``;

const AdvertisementImage = styled.img`
  width: 100%;
  margin-bottom: 10px;
`;

const Title = styled.h2`
  padding: 10px;
  margin-right: 10px;
  border-bottom: 1px solid lightgray;
`;

const RightPage = styled.div``;

function Checkout({ basket, user }) {
  return (
    <Container>
      <LeftPage>
        <AdvertisementImage
          src="https://images-na.ssl-images-amazon.com/images/G/01/amazonglobal/images/PayCode/FinalAssets/Desktop/English/AmazonExports_FIAT_OnSite_Concepts_R3_DesktopStripe_1500x120_v1.png"
          alt=""
        />
        <div>
          <h3>Hello, {user?.email}</h3>
          <Title>Your shopping Basket</Title>
          {basket.length !== 0 ? (
            basket.map((item) => <CheckoutProduct key={item.id} {...item} />)
          ) : (
            <h1>No Product in Basket</h1>
          )}
        </div>
      </LeftPage>
      <RightPage>
        <Subtotal basket={basket} />
      </RightPage>
    </Container>
  );
}

const mapStateToProps = (state) => ({
  basket: state.baskets.basket,
  user: state.users.user,
});

export default connect(mapStateToProps)(Checkout);
