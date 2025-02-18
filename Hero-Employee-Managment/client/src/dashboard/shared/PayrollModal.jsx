import React from 'react';
import { Dialog, DialogBody, DialogHeader } from "@material-tailwind/react";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckOutForm from "./CheakOutForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)

const PayrollModal = ({ isModalOpen, closeModal, selectedItem, refetch }) => {

  console.log(selectedItem)

  return (
    <Dialog open={isModalOpen} handler={closeModal}>
      <DialogHeader>
        {selectedItem && ( <span className=""> Pay {selectedItem.name} </span> )}
      </DialogHeader>
      <DialogBody>
        <Elements stripe={stripePromise}>
          <CheckOutForm
            closeModal={closeModal}
            selectedItem={selectedItem} 
            refetch={refetch}
            salary={selectedItem && selectedItem.salary} 
          />
        </Elements>
      </DialogBody>
    </Dialog>
  );
};

export default PayrollModal;