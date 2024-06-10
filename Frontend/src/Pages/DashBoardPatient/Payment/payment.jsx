import React, { useState, useEffect } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js'
import axios from 'axios'
import './payment.css'
import Swal from 'sweetalert2'

const stripePromise = loadStripe(
  'pk_test_51PJTtkGUY0qZiMwJH9HOgpa6cZXi7FgXa8MYBAtyxD99Xa8iBgqDcTOEVDTY4URxNR3b0eh93NRzdKSOUIDo9myA00bUcvFNgf',
)

const CheckoutForm = () => {
  const stripe = useStripe()
  const elements = useElements()
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!stripe || !elements) {
      return
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    })

    if (error) {
      setError(error.message)
      return
    }

    try {
      const { data } = await axios.post(
        'http://localhost:3000/api/v1/payment',
        {
          amount: 1000,
          currency: 'usd',
        },
      )

      const clientSecret = data.clientSecret

      const { paymentIntent, error: confirmError } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: paymentMethod.id,
        })

      if (confirmError) {
        setError(confirmError.message)
        return
      }

      setSuccess(true)

      setError(null)
    } catch (err) {
      setError(err.message)
    }
  }
  const handleStatus = async () => {
    const id = localStorage.getItem('appointmentId')
    try {
      await axios.patch(
        `http://localhost:3000/api/v1/appointmentDoctor/${id}`,
        { status: 'Paid' },
      )
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    if (success) {
      handleStatus()
      localStorage.removeItem('appointmentId')
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        },
        didClose: () => {
          window.location.href = '/DashDisplay'
        },
      })

      Toast.fire({
        icon: 'success',
        title: 'Payment Successful',
      })
    }
  }, [success])

  return (
    <form className="payment-form" onSubmit={handleSubmit}>
      <h2>Payment</h2>
      <div className="card-element">
        <CardElement />
      </div>
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
      {error && <div className="error-message">{error}</div>}
    </form>
  )
}

const PaymentPage = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  )
}

export default PaymentPage
