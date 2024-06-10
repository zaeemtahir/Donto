import stripe from 'stripe'

const stripeSecretKey = process.env.STRIPE_SECRET_KEY
const stripeInstance = stripe(stripeSecretKey)

export const stripePayment = async (req, res) => {
  const { amount, currency } = req.body
  try {
    const paymentIntent = await stripeInstance.paymentIntents.create({
      amount,
      currency,
    })
    res.send({
      clientSecret: paymentIntent.client_secret,
    })
  } catch (error) {
    res.status(500).send({ error: error.message })
  }
}
