import React from "react";
import styled from "styled-components";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { auth } from "../firebase";

const Container = styled.div`
  height: 60px;
  display: flex;
  align-items: center;
  background-color: #131921;
  position: sticky;
  top: 0;
  z-index: 100;
`;

const Logo = styled.img`
  width: 100px;
  object-fit: contain;
  margin: 0 20px;
  margin-top: 18px;
`;

const SearchContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  border-radius: 24px;
`;

const SearchInput = styled.input`
  height: 12px;
  padding: 10px;
  border: none;
  width: 100%;
`;

const IconSearch = styled(SearchIcon)`
  padding: 5px;
  background-color: #cd9042;
  && {
    height: 22px;
  }
`;

const IconShoppingBasket = styled(ShoppingBasketIcon)``;

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 15px;
  margin-right: 15px;
  color: white;
`;

const ItemLineOne = styled.span`
  font-size: 10px;
`;

const ItemLineTwo = styled.span`
  font-weight: 800;
  font-size: 13px;
`;

const ItemBasket = styled.div`
  display: flex;
  align-items: center;
  color: white;
`;

const BasketCount = styled(ItemLineTwo)`
  margin-left: 10px;
  margin-right: 10px;
`;

function Header({ basket, user }) {
  const logOut = () => {
    auth.signOut();
  };
  return (
    <Container>
      <Link to="/">
        <Logo src="http://pngimg.com/uploads/amazon/amazon_PNG11.png" />
      </Link>
      <SearchContainer>
        <SearchInput type="text" />
        <IconSearch />
      </SearchContainer>
      <NavContainer>
        <Link to={!user && "/login"}>
          <Item onClick={logOut}>
            <ItemLineOne>Hello {user?.email || "Guest"}</ItemLineOne>
            <ItemLineTwo>{user ? "Sign Out" : "Sign In"}</ItemLineTwo>
          </Item>
        </Link>
        <Link to="/orders">
          <Item>
            <ItemLineOne>Returns</ItemLineOne>
            <ItemLineTwo>& Orders</ItemLineTwo>
          </Item>
        </Link>
        <Item>
          <ItemLineOne>Your</ItemLineOne>
          <ItemLineTwo>Prime</ItemLineTwo>
        </Item>
        <Link to="/checkout">
          <ItemBasket>
            <IconShoppingBasket />
            <BasketCount>{basket?.length}</BasketCount>
          </ItemBasket>
        </Link>
      </NavContainer>
    </Container>
  );
}

const mapStateToProps = (state) => ({
  basket: state.baskets.basket,
  user: state.users.user,
});

export default connect(mapStateToProps)(Header);
