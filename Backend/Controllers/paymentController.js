import stripe from 'stripe'

const stripeSecretKey =
  'sk_test_51PJTtkGUY0qZiMwJ4E2rdBdbYZCB9atAIekQ5LkVATpPEktivpkUY7XQ8nBgMmokPCvF4qAgDF8Ul7imcsxMsHuM00IwMKSSHJ'
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
