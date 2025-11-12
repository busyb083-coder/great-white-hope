import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CreditCard, Lock, AlertCircle, CheckCircle } from 'lucide-react'
import { useCart } from '../contexts/CartContext'
import { paymentsAPI, ordersAPI } from '../lib/api'

export default function Checkout() {
  const navigate = useNavigate()
  const { items, total, clearCart } = useCart()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: 'US',
    paymentProcessor: 'stripe',
    cardNumber: '',
    cardExpiry: '',
    cardCVC: '',
  })

  const paymentProcessors = [
    { id: 'stripe', name: 'Stripe', icon: '💳' },
    { id: 'paypal', name: 'PayPal', icon: '🅿️' },
    { id: 'green-financial', name: 'Green Financial', icon: '🏦' },
    { id: 'cryptomass', name: 'CryptoMass', icon: '₿' },
    { id: 'woocommerce', name: 'WooCommerce', icon: '🛒' },
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const validateStep1 = () => {
    if (!formData.email || !formData.firstName || !formData.lastName) {
      setError('Please fill in all required fields')
      return false
    }
    if (!formData.address || !formData.city || !formData.state || !formData.zip) {
      setError('Please fill in complete address')
      return false
    }
    return true
  }

  const validateStep2 = () => {
    if (!formData.paymentProcessor) {
      setError('Please select a payment method')
      return false
    }
    if (formData.paymentProcessor === 'stripe' || formData.paymentProcessor === 'woocommerce') {
      if (!formData.cardNumber || !formData.cardExpiry || !formData.cardCVC) {
        setError('Please fill in card details')
        return false
      }
    }
    return true
  }

  const handleSubmit = async () => {
    setError('')
    setLoading(true)

    try {
      // Create order
      const orderResponse = await ordersAPI.create({
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zip: formData.zip,
        country: formData.country,
        items: items,
        total: total * 1.08,
        processor: formData.paymentProcessor,
      })

      const orderId = orderResponse.data.id

      // Process payment
      const paymentResponse = await paymentsAPI.initiate(orderId, formData.paymentProcessor, {
        amount: total * 1.08,
        currency: 'USD',
        cardNumber: formData.cardNumber,
        cardExpiry: formData.cardExpiry,
        cardCVC: formData.cardCVC,
      })

      if (paymentResponse.data.success) {
        setSuccess(true)
        clearCart()
        setTimeout(() => {
          navigate('/')
        }, 3000)
      } else {
        setError(paymentResponse.data.message || 'Payment failed')
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Payment processing failed')
    } finally {
      setLoading(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h1>
          <button
            onClick={() => navigate('/shop')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    )
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <CheckCircle size={64} className="mx-auto text-green-600 mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
          <p className="text-gray-600 mb-4">Thank you for your purchase. Redirecting...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Progress */}
        <div className="flex items-center justify-between mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition ${
                  s <= step
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-300 text-gray-600'
                }`}
              >
                {s}
              </div>
              {s < 3 && <div className={`h-1 w-12 mx-2 ${s < step ? 'bg-blue-600' : 'bg-gray-300'}`}></div>}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow p-8">
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                  <AlertCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="text-red-700">{error}</p>
                </div>
              )}

              {/* Step 1: Shipping */}
              {step === 1 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900">Shipping Address</h2>

                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="col-span-2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                    <input
                      type="text"
                      name="address"
                      placeholder="Address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="col-span-2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                    <input
                      type="text"
                      name="city"
                      placeholder="City"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                    <input
                      type="text"
                      name="state"
                      placeholder="State"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                    <input
                      type="text"
                      name="zip"
                      placeholder="ZIP Code"
                      value={formData.zip}
                      onChange={handleInputChange}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    >
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>
                      <option value="MX">Mexico</option>
                    </select>
                  </div>

                  <button
                    onClick={() => {
                      if (validateStep1()) {
                        setStep(2)
                        setError('')
                      }
                    }}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition"
                  >
                    Continue to Payment
                  </button>
                </div>
              )}

              {/* Step 2: Payment Method */}
              {step === 2 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900">Payment Method</h2>

                  <div className="grid grid-cols-2 gap-4">
                    {paymentProcessors.map((processor) => (
                      <button
                        key={processor.id}
                        onClick={() => setFormData((prev) => ({ ...prev, paymentProcessor: processor.id }))}
                        className={`p-4 rounded-lg border-2 transition ${
                          formData.paymentProcessor === processor.id
                            ? 'border-blue-600 bg-blue-50'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        <div className="text-2xl mb-2">{processor.icon}</div>
                        <div className="font-semibold text-gray-900">{processor.name}</div>
                      </button>
                    ))}
                  </div>

                  {(formData.paymentProcessor === 'stripe' || formData.paymentProcessor === 'woocommerce') && (
                    <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                      <input
                        type="text"
                        name="cardNumber"
                        placeholder="Card Number"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <input
                          type="text"
                          name="cardExpiry"
                          placeholder="MM/YY"
                          value={formData.cardExpiry}
                          onChange={handleInputChange}
                          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                        <input
                          type="text"
                          name="cardCVC"
                          placeholder="CVC"
                          value={formData.cardCVC}
                          onChange={handleInputChange}
                          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                      </div>
                    </div>
                  )}

                  <div className="flex gap-4">
                    <button
                      onClick={() => setStep(1)}
                      className="flex-1 border-2 border-gray-300 hover:border-gray-400 text-gray-900 font-bold py-3 rounded-lg transition"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => {
                        if (validateStep2()) {
                          setStep(3)
                          setError('')
                        }
                      }}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition"
                    >
                      Review Order
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Review */}
              {step === 3 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900">Review Order</h2>

                  <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm text-gray-600">Shipping To</p>
                      <p className="font-semibold text-gray-900">
                        {formData.firstName} {formData.lastName}
                      </p>
                      <p className="text-gray-600">{formData.address}</p>
                      <p className="text-gray-600">
                        {formData.city}, {formData.state} {formData.zip}
                      </p>
                    </div>

                    <div className="border-t pt-4">
                      <p className="text-sm text-gray-600">Payment Method</p>
                      <p className="font-semibold text-gray-900">
                        {paymentProcessors.find((p) => p.id === formData.paymentProcessor)?.name}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={() => setStep(2)}
                      className="flex-1 border-2 border-gray-300 hover:border-gray-400 text-gray-900 font-bold py-3 rounded-lg transition"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleSubmit}
                      disabled={loading}
                      className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-bold py-3 rounded-lg transition flex items-center justify-center gap-2"
                    >
                      <Lock size={18} />
                      {loading ? 'Processing...' : 'Place Order'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6 sticky top-4">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6 pb-6 border-b">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      {item.name} x {item.quantity}
                    </span>
                    <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-2 mb-6 pb-6 border-b">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax (8%)</span>
                  <span className="font-semibold">${(total * 0.08).toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-between mb-6">
                <span className="text-lg font-bold text-gray-900">Total</span>
                <span className="text-2xl font-bold text-blue-600">${(total * 1.08).toFixed(2)}</span>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg text-sm text-gray-600">
                <p className="font-semibold text-gray-900 mb-2">🔒 Secure Payment</p>
                <p>All transactions are encrypted and secure.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
