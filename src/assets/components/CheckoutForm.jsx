import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import axios from "axios";

const CheckoutForm = ({ amount, description, title, sellername }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [error, setError] = useState(null);
  const [completed, setCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    try {
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
        setError(error.message);
        return;
      }

      const response = await axios.post(
        "https://site--backend-vinted--txtnrrwcytwl.code.run/payment",
        { amount: amount, description: description }
      );

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
        setError(stripeResponse.error.message);
      }

      // Si on reçois un status succeeded on fais passer completed à true
      if (stripeResponse.paymentIntent.status === "succeeded") {
        setCompleted(true);
      }
      // On a fini de charger
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  return completed ? (
    <p>
      <span>Achat réalisé avec succés !</span> Nous vous confirmons que votre
      paiement pour
      <span> {title} </span>a bien été effectué. Maintenant, attendez que
      <span> {sellername} </span>
      envoie le colis.
    </p>
  ) : (
    <form className="checkout-form" onSubmit={handleSubmit}>
      <PaymentElement />
      <button
        className="payment-button"
        type="submit"
        disabled={!stripe || !elements || isLoading}
      >
        Pay
      </button>
      {/* Éventuel message d'erreur */}
      {error && <div>{error}</div>}
    </form>
  );
};

export default CheckoutForm;
