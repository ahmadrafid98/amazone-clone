import { useState } from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { db } from "../firebase";
import Order from "./Order";

const Container = styled.div`
  padding: 20px 80px;
`;

const ListOrder = styled.div`
  margin: 30px 0;
`;

function Orders({ user }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      db.collection("users")
        .doc(user?.id)
        .collection("orders")
        .orderBy("created", "desc")
        .onSnapshot((snapshot) =>
          setOrders(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data,
            }))
          )
        );
    } else {
      setOrders([]);
    }
  }, [user]);
  return (
    <Container>
      <h1>Your Orders</h1>
      <ListOrder>
        {orders.map((order) => (
          <Order order={order} />
        ))}
      </ListOrder>
    </Container>
  );
}

const mapStateToProps = (state) => ({
  user: state.users.user,
});

export default connect(mapStateToProps)(Orders);
