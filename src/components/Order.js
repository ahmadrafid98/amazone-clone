import styled from "styled-components";
import moment from "moment";
import CheckoutProduct from "./CheckoutProduct";
import CurrencyFormat from "react-currency-format";

const Container = styled.div`
  padding: 40px;
  margin: 20px 0;
  border: 1px solid lightgray;
  background-color: white;
  position: relative;
`;

const OrderId = styled.p`
  position: absolute;
  top: 40px;
  right: 20px;
`;

const OrderTotal = styled.h3`
  text-align: right;
  font-weight: 500;
`;

function Order({ order }) {
  return (
    <Container>
      <h2>Order</h2>
      <p>{moment.unix(order.data.created).format("MMMM Do YYYY, h:mma")}</p>
      <OrderId>
        <small>{order.id}</small>
      </OrderId>
      {order.data.basket.map((item) => (
        <CheckoutProduct hideButton {...item} />
      ))}
      <CurrencyFormat
        renderText={(value) => (
          <>
            <OrderTotal>Order Total: {value}</OrderTotal>
          </>
        )}
        decimalScale={2}
        value={order.data.amaount * 100}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
      />
    </Container>
  );
}

export default Order;
