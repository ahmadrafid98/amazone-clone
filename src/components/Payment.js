import { connect } from "react-redux";
import styled from "styled-components";
import CheckoutProduct from "./CheckoutProduct";
import { Link, useHistory } from "react-router-dom";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "./Subtotal";
import { useEffect } from "react";
import { emptyBasket } from "../actions/BasketActions";
import axios from "../axios";
import { db } from "../firebase";

const Container = styled.div`
  background-color: white;

  > h1 {
    text-align: center;
    padding: 10px;
    background-color: rgb(234, 237, 237);
    font-weight: 400;
    border-bottom: 1px solid lightgray;
  }

  > h1 a {
    text-decoration: none;
  }
`;

const PaymentSection = styled.div`
  display: flex;
  padding: 20px;
  margin: 0 20px;
  border-bottom: 1px solid lightgray;
`;

const PaymentTitle = styled.div`
  flex: 0.2;
`;

const PaymentAddress = styled.div`
  flex: 0.8;
`;

const PaymentItems = styled.div`
  flex: 0.8;
`;

const PaymentDetails = styled.div`
  flex: 0.8;

  > form {
    max-width: 400px;
  }

  > h3 {
    padding-bottom: 20px;
  }

  > form > div > button {
    background: #f0c14b;
    border-radius: 2px;
    width: 100%;
    height: 30px;
    border: 1px solid;
    font-weight: bolder;
    margin-top: 10px;
    border-color: #a88734 #9c7e31 #846a29;
    color: #111;
  }
`;

const PaymentPriceContainer = styled.div``;

function Payment({ basket, user, emptyBasket }) {
  const stripe = useStripe();
  const elements = useElements();
  const history = useHistory();

  const [processing, setProcessing] = useState("");
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        db.collection("users")
          .doc(user?.uid)
          .collection("orders")
          .doc(paymentIntent.id)
          .set({
            basket: basket,
            amount: paymentIntent.amount,
            created: paymentIntent.created,
          });

        setSucceeded(true);
        setError(null);
        setProcessing(false);

        emptyBasket();

        history.replace("/orders");
      });
  };

  const handleChange = (e) => {
    setDisabled(e.empty);
    setError(e.error ? e.error.message : "");
  };

  useEffect(() => {
    const getClientSecret = async () => {
      const response = await axios({
        method: "POST",
        url: `/payments/create?total=${getBasketTotal(basket) * 100}`,
      });
      setClientSecret(response.data.clientSecret);
    };

    if (getBasketTotal(basket) > 0) {
      getClientSecret();
    }
  }, [basket]);

  console.log("the secret is >>>> ", clientSecret);

  return (
    <Container>
      <h1>
        Checkout (<Link to="/checkout">{basket?.length} items</Link>)
      </h1>
      <PaymentSection>
        <PaymentTitle>
          <h3>Delivery Address</h3>
        </PaymentTitle>
        <PaymentAddress>
          <p>{user?.email}</p>
          <p>123 React Lane</p>
          <p>Los Angles, Ca</p>
        </PaymentAddress>
      </PaymentSection>
      <PaymentSection>
        <PaymentTitle>
          <h3>Review items and delivery</h3>
        </PaymentTitle>
        <PaymentItems>
          {basket.map((item) => (
            <CheckoutProduct key={item.id} {...item} />
          ))}
        </PaymentItems>
      </PaymentSection>
      <PaymentSection>
        <PaymentTitle>
          <h3>Payment Method</h3>
        </PaymentTitle>
        <PaymentDetails>
          <form onSubmit={handleSubmit}>
            <CardElement onChange={handleChange} />
            <PaymentPriceContainer>
              <CurrencyFormat
                renderText={(value) => (
                  <>
                    <h3>Order Total: {value}</h3>
                  </>
                )}
                decimalScale={2}
                value={getBasketTotal(basket)}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
              />
              <button disabled={processing || disabled || succeeded}>
                <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
              </button>
            </PaymentPriceContainer>
            {error && <div>{error}</div>}
          </form>
        </PaymentDetails>
      </PaymentSection>
    </Container>
  );
}

const mapStateToProps = (state) => ({
  basket: state.baskets.basket,
  user: state.users.user,
});

export default connect(mapStateToProps, { emptyBasket })(Payment);
