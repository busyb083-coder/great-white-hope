import { useState } from 'react'
import { ChevronRight, Check, Lock } from 'lucide-react'

export default function Checkout() {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [paymentProcessor, setPaymentProcessor] = useState('stripe')
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: '',
  })

  const processors = [
    { id: 'stripe', name: 'Stripe', icon: '💳', desc: 'Credit/Debit Cards, Apple Pay, Google Pay' },
    { id: 'paypal', name: 'PayPal', icon: '🅿️', desc: 'PayPal Account or Credit Card' },
    { id: 'green-financial', name: 'Green Financial', icon: '🌿', desc: 'Cannabis-Friendly Banking' },
    { id: 'cryptomass', name: 'CryptoMass', icon: '₿', desc: 'Crypto to Card Conversion' },
    { id: 'woocommerce', name: 'WooCommerce', icon: '🛒', desc: 'Existing WooCommerce Account' },
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handlePayment = async () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setStep(4)
    }, 2000)
  }

  const subtotal = 4500
  const tax = 450
  const shipping = 0
  const total = subtotal + tax + shipping

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-3xl font-bold">Checkout</h1>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Progress Indicator */}
            <div className="mb-8 flex items-center justify-between">
              {[1, 2, 3, 4].map((s) => (
                <div key={s} className="flex items-center flex-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition ${
                      step >= s
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {step > s ? <Check size={20} /> : s}
                  </div>
                  {s < 4 && (
                    <div
                      className={`flex-1 h-1 mx-2 transition ${
                        step > s ? 'bg-blue-600' : 'bg-gray-200'
                      }`}
                    ></div>
                  )}
                </div>
              ))}
            </div>

            {/* Step 1: Shipping */}
            {step === 1 && (
              <div className="bg-white rounded-lg shadow p-8 space-y-6">
                <h2 className="text-2xl font-bold">Shipping Address</h2>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="col-span-2 border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    name="address"
                    placeholder="Street Address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="col-span-2 border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    name="state"
                    placeholder="State"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    name="zip"
                    placeholder="ZIP Code"
                    value={formData.zip}
                    onChange={handleInputChange}
                    className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Country</option>
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                  </select>
                </div>
                <button
                  onClick={() => setStep(2)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition"
                >
                  Continue to Payment <ChevronRight size={20} />
                </button>
              </div>
            )}

            {/* Step 2: Payment Method */}
            {step === 2 && (
              <div className="bg-white rounded-lg shadow p-8 space-y-6">
                <h2 className="text-2xl font-bold">Payment Method</h2>
                <div className="grid grid-cols-1 gap-4">
                  {processors.map((processor) => (
                    <button
                      key={processor.id}
                      onClick={() => setPaymentProcessor(processor.id)}
                      className={`p-4 rounded-lg border-2 transition text-left ${
                        paymentProcessor === processor.id
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-3xl">{processor.icon}</span>
                        <div>
                          <h3 className="font-bold">{processor.name}</h3>
                          <p className="text-sm text-gray-600">{processor.desc}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={() => setStep(1)}
                    className="flex-1 border-2 border-gray-300 hover:border-blue-300 py-3 rounded-lg font-semibold transition"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition"
                  >
                    Continue <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Review & Confirm */}
            {step === 3 && (
              <div className="bg-white rounded-lg shadow p-8 space-y-6">
                <h2 className="text-2xl font-bold">Review Order</h2>
                
                <div className="border rounded-lg p-4 space-y-3">
                  <h3 className="font-bold">Shipping Address</h3>
                  <p className="text-sm text-gray-600">
                    {formData.firstName} {formData.lastName}<br />
                    {formData.address}<br />
                    {formData.city}, {formData.state} {formData.zip}
                  </p>
                </div>

                <div className="border rounded-lg p-4 space-y-3">
                  <h3 className="font-bold">Payment Method</h3>
                  <p className="text-sm text-gray-600">
                    {processors.find(p => p.id === paymentProcessor)?.name}
                  </p>
                </div>

                <div className="border rounded-lg p-4 space-y-3">
                  <h3 className="font-bold">Order Items</h3>
                  <p className="text-sm text-gray-600">Premium Live Resin (1x) - $45.00</p>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => setStep(2)}
                    className="flex-1 border-2 border-gray-300 hover:border-blue-300 py-3 rounded-lg font-semibold transition"
                  >
                    Back
                  </button>
                  <button
                    onClick={handlePayment}
                    disabled={loading}
                    className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition"
                  >
                    {loading ? 'Processing...' : (
                      <>
                        <Lock size={20} />
                        Complete Purchase
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Success */}
            {step === 4 && (
              <div className="bg-white rounded-lg shadow p-12 text-center space-y-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <Check size={32} className="text-green-600" />
                </div>
                <h2 className="text-3xl font-bold">Order Confirmed!</h2>
                <p className="text-gray-600">
                  Thank you for your purchase. Your order has been confirmed and will be shipped soon.
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-2">Order Number</p>
                  <p className="text-2xl font-bold">GWH-2024-001234</p>
                </div>
                <a href="/" className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition">
                  Return to Home
                </a>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6 sticky top-24 space-y-6">
              <h2 className="text-xl font-bold">Order Summary</h2>
              
              <div className="border-b pb-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Premium Live Resin</span>
                  <span>$45.00</span>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>${(subtotal / 100).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span>${(tax / 100).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span>Free</span>
                </div>
              </div>

              <div className="border-t pt-4 flex justify-between text-lg font-bold">
                <span>Total</span>
                <span className="text-blue-600">${((total) / 100).toFixed(2)}</span>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded p-3 text-sm text-blue-800">
                <p>✓ Secure checkout with SSL encryption</p>
                <p>✓ Your payment information is safe</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
