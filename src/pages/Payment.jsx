import { Navigate, useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../assets/components/CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51P16RoFOlOHXttOVSfktn1BjhwC0OUa1AyyAc8flwEA8yzR5ZE2eMcdK4e4w4qUPDh4i6QPKrkAmS7b7jQP8t27y00NJdLMgBa"
);

const Payment = ({ token, setToHide }) => {
  const location = useLocation();
  const { title, price, description, sellername } = location.state;

  const shippinFees = price * 0.2;
  const protectFees = price * 0.1;

  const total = price + 0.5 + shippinFees;

  const amount = Number((total * 100).toFixed(0));

  const options = {
    // Type de transaction
    mode: "payment",
    // Montant de la transaction
    amount: amount,
    // Devise de la transaction
    currency: "eur",
    // On peut customiser l'apparence ici
  };

  return token ? (
    <>
      <div className="payment-page ">
        <div className="payment-box container">
          <div>
            <h2>Résumé de la commande</h2>
          </div>
          <ul>
            <li>
              Commande <p>{price.toFixed(2)}€</p>
            </li>
            <li>
              Frais de protection acheteurs <p>{protectFees.toFixed(2)}€</p>
            </li>
            <li>
              Frais de port <p>{shippinFees.toFixed(2)}€</p>
            </li>
          </ul>
          <div className="price">
            <p>Total</p>
            <p>{total.toFixed(2)}€</p>
          </div>
          <div className="content">
            <p>
              Il ne vous reste plus qu'une étape pour vous offrir
              <span> {title}</span>. Vous allez payer{" "}
              <span>{total.toFixed(2)}€ </span>
              (frais de protection et frais de port inclus).
            </p>
          </div>
          <div className="checkout-form">
            <Elements stripe={stripePromise} options={options}>
              <CheckoutForm
                amount={amount}
                description={description}
                title={title}
                sellername={sellername}
              />
            </Elements>
          </div>
        </div>
      </div>
    </>
  ) : (
    <Navigate to="/login" />
  );
};

export default Payment;
