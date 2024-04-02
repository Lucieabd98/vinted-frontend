import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import axios from "axios";

const CheckoutForm = ({ amount, description }) => {
  console.log(`le total ===> ${amount}`);
  console.log(`la description ===> ${description}`);
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState(null);
  const [completed, setCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // On commence à charger
    setIsLoading(true);

    if (elements == null) {
      return;
    }

    // Vérification et validation des infos entrées dans les inputs
    const { error: submitError } = await elements.submit();
    if (submitError) {
      // Affiche l'erreur en question
      //   setErrorMessage(error.message);
      return;
    }

    const response = await axios.post(
      "https://site--backend-vinted--txtnrrwcytwl.code.run/payment",
      { amount, description }
    );

    console.log(response.message);

    const clientSecret = response.data.client_secret;

    // Requête à Stripe pour valider le paiement
    const stripeResponse = await stripe.confirmPayment({
      // elements contient les infos et la configuration du paiement
      elements,
      clientSecret,
      // Éventuelle redirection
      confirmParams: {
        return_url: "http://localhost:5173/",
      },
      // Bloque la redirections
      redirect: "if_required",
    });

    // Si une erreur a lieu pendant la confirmation
    if (stripeResponse.error) {
      // On la montre au client
      setErrorMessage(stripeResponse.error.message);
    }

    // Si on reçois un status succeeded on fais passer completed à true
    if (stripeResponse.paymentIntent.status === "succeeded") {
      setCompleted(true);
    }
    // On a fini de charger
    setIsLoading(false);
  };

  return completed ? (
    <p>Paiement effectué</p>
  ) : (
    <form className="checkout-form" onSubmit={handleSubmit}>
      <PaymentElement />
      <button type="submit" disabled={!stripe || !elements || isLoading}>
        Pay
      </button>
      {/* Éventuel message d'erreur */}
      {errorMessage && <div>{errorMessage}</div>}
    </form>
  );
};

export default CheckoutForm;
