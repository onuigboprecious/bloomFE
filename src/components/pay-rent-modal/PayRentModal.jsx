import React, { useState } from 'react';
import Modal from '../ui/Modal';
import StepAmount from './StepAmount';
import StepReview from './StepReview';
import StepSuccess from './StepSuccess';
import { useApp } from '../../context/AppContext';

export const PayRentModal = () => {
  const { isPayModalOpen, setIsPayModalOpen, rentAmount, selectedCard, triggerPaymentSuccess } = useApp();
  const [step, setStep] = useState(1);
  const [completedTx, setCompletedTx] = useState(null);

  const handleClose = () => {
    setIsPayModalOpen(false);
    // Reset steps after modal closes
    setTimeout(() => {
      setStep(1);
      setCompletedTx(null);
    }, 300);
  };

  const handleConfirmPayment = () => {
    const newTx = {
      id: `tx-${Date.now()}`,
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
      amount: rentAmount,
      card: `${selectedCard.brand} **** ${selectedCard.last4}`,
      status: "Captured",
      rewardsEarned: `${(rentAmount * selectedCard.pointsMultiplier).toLocaleString()} pts`,
      reference: `PAYR-${Math.floor(1000 + Math.random() * 9000)}`
    };
    triggerPaymentSuccess(newTx);
    setCompletedTx(newTx);
    setStep(3);
  };

  return (
    <Modal isOpen={isPayModalOpen} onClose={handleClose} maxWidth="max-w-md">
      {step === 1 && (
        <StepAmount onNext={() => setStep(2)} />
      )}
      {step === 2 && (
        <StepReview onBack={() => setStep(1)} onConfirm={handleConfirmPayment} />
      )}
      {step === 3 && (
        <StepSuccess onClose={handleClose} txDetails={completedTx} />
      )}
    </Modal>
  );
};

export default PayRentModal;
