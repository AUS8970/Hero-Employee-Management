import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import './CheakOutForm.css'
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../auth/hook/useAxiosSecure';
import { Button, Spinner } from '@material-tailwind/react';

const CheckOutForm = ({ closeModal, selectedItem, refetch }) => {

  console.log(selectedItem._id)

  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [clientSecret, setClientSecret] = useState('');
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    getPaymentIntent()
  }, [selectedItem]);
  console.log(clientSecret)

  const getPaymentIntent = async () => {
    try {
      const { data } = await axiosSecure.post('/create-payment-intent', {
        email: selectedItem?.email,
        month: selectedItem?.month,
        salary: selectedItem?.salary,
      })
      console.log(data)
      setClientSecret(data.clientSecret)
    } catch (err) {
      console.log(err)
    }
  }

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async event => {
    setProcessing(true)
    event.preventDefault()

    if (!stripe || !elements) {
      return
    }

    const card = elements.getElement(CardElement);
    if (card == null) {
      setProcessing(false)
      return
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    })
    if (error) {
      setProcessing(false)
      return console.log('[error]', error);
    } else {
      console.log('[PaymentMethod]', paymentMethod);
    }

    // confirm payment
    const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          name: selectedItem.name,
          email: selectedItem.email,
        },
      },
    });

    if (paymentIntent.status === 'succeeded') {
      try {
        // Save data in db
        await axiosSecure.patch(`/payroll/${selectedItem._id}`, {
          ...selectedItem,
          paymentDate: new Date(),
          transactionId: paymentIntent?.id,
        })
        toast.success('Payment Successful!')
        refetch()
      } catch (err) {
        console.log(err)
      } finally {
        setProcessing(false)
        closeModal()
      };
    };
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
      <div className="flex w-full gap-3">
        <Button className="w-full" variant="gradient" color="red" onClick={closeModal}>
          Cancel
        </Button>
        <Button 
          disabled={!stripe || !clientSecret || processing} 
          className="w-full flex items-center justify-center" 
          type="submit" 
          variant="gradient" 
          color="green"
        >
          {processing ? (
              <Spinner />
            ) : (
              selectedItem && `Pay $${selectedItem.salary}`
          )}
        </Button>
      </div>
    </form>
  );
};

export default CheckOutForm;