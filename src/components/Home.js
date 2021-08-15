import React from "react";
import styled from "styled-components";
import Product from "./Product";

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
  max-width: 1500px;
`;

const HomeContainer = styled.div``;

const HomeImage = styled.img`
  width: 100%;
  z-index: -1;
  margin-bottom: -150px;
  mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
`;

const HomeRow = styled.div`
  display: flex;
  z-index: 1;
  margin-right: 5px;
  margin-left: 5px;
`;

function Home() {
  return (
    <Container>
      <HomeContainer>
        <HomeImage
          alt=""
          src="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Hero/Fuji_TallHero_Computers_1x._CB432469755_.jpg"
        />
        <HomeRow>
          <Product
            title="The Lean Startup: How Today's Entrepreneurs Use Continuous Innovation to Create Radically Successful Businesses"
            price={11.12}
            image="https://images-na.ssl-images-amazon.com/images/I/51T-sMqSMiL._SX329_BO1,204,203,200_.jpg"
            rating={5}
          />
          <Product
            title="Rich Dad Poor Dad: What the Rich Teach Their Kids About Money That the Poor and Middle Class Do Not! "
            price={8.96}
            image="https://images-na.ssl-images-amazon.com/images/I/51u8ZRDCVoL._SX330_BO1,204,203,200_.jpg"
            rating={5}
          />
        </HomeRow>
        <HomeRow>
          <Product
            title="Samsung Galaxy A51 Factory Unlocked Cell Phone | 128GB of Storage | Long Lasting Battery | Single SIM | GSM or CDMA Compatible | US Version | Black"
            price={399.99}
            image="https://images-na.ssl-images-amazon.com/images/I/71QZcCFQcAL._AC_SX679_.jpg"
            rating={5}
          />
          <Product
            id="126"
            title="Apple iPhone 11, 64GB, Black - Fully Unlocked (Renewed)"
            price={549.0}
            image="https://images-na.ssl-images-amazon.com/images/I/61gYe3YaoxL._AC_SX425_.jpg"
            rating={5}
          />
          <Product
            title="ASUS ROG Gaming Phone 3 (Strix Edition) ZS661KS Dual-SIM 256GB ROM + 8GB RAM Android Factory Unlocked 5G Smartphone (Black) - International Version "
            price={1107.77}
            image="https://images-na.ssl-images-amazon.com/images/I/71VcgBG3c8L._AC_SX679_.jpg"
            rating={5}
          />
        </HomeRow>
        <HomeRow>
          <Product
            title="SAMSUNG Electronics UN32N5300AFXZA 32 1080p Smart LED TV (2018), Black"
            price={237.99}
            image="https://images-na.ssl-images-amazon.com/images/I/91UsHjAPTlL._AC_SX425_.jpg"
            rating={5}
          />
        </HomeRow>
      </HomeContainer>
    </Container>
  );
}

export default Home;
