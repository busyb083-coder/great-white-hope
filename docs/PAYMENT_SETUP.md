# Payment Processor Setup Guide

Complete guide to integrating all 5 payment processors with Great White Hope.

---

## 🎯 Overview

Great White Hope supports 5 payment processors:

1. **Stripe** - Credit/debit cards, Apple Pay, Google Pay
2. **PayPal** - PayPal accounts and credit cards
3. **Green Financial** - Cannabis-friendly banking
4. **CryptoMass** - Credit/debit to cryptocurrency conversion
5. **WooCommerce** - Existing WooCommerce integration

Each processor uses an adapter pattern for easy integration and swapping.

---

## 💳 Stripe Integration

### 1. Create Stripe Account

1. Go to https://stripe.com
2. Click "Sign up"
3. Complete account setup
4. Verify email

### 2. Get API Keys

1. Go to https://dashboard.stripe.com
2. Click "Developers" → "API keys"
3. Copy:
   - **Secret Key** (starts with `sk_live_` or `sk_test_`)
   - **Publishable Key** (starts with `pk_live_` or `pk_test_`)

### 3. Get Webhook Secret

1. In Stripe dashboard, go to "Webhooks"
2. Click "Add endpoint"
3. Endpoint URL: `https://your-backend-domain/api/v1/webhooks/stripe`
4. Events to send:
   - `charge.succeeded`
   - `charge.failed`
   - `charge.refunded`
5. Copy **Signing secret** (starts with `whsec_`)

### 4. Configure Environment Variables

```env
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

### 5. Test Integration

```bash
# Use Stripe test card: 4242 4242 4242 4242
# Expiry: Any future date
# CVC: Any 3 digits
```

---

## 🅿️ PayPal Integration

### 1. Create PayPal Developer Account

1. Go to https://developer.paypal.com
2. Click "Sign up"
3. Complete account setup
4. Verify email

### 2. Get API Credentials

1. In PayPal dashboard, go to "Apps & Credentials"
2. Select "Sandbox" (for testing)
3. Under "REST API apps", click "Create App"
4. Copy:
   - **Client ID**
   - **Secret**

### 3. Get Webhook ID

1. In PayPal dashboard, go to "Webhooks"
2. Click "Create webhook"
3. Endpoint URL: `https://your-backend-domain/api/v1/webhooks/paypal`
4. Events:
   - `CHECKOUT.ORDER.COMPLETED`
   - `CHECKOUT.ORDER.APPROVED`
5. Copy **Webhook ID**

### 4. Configure Environment Variables

```env
PAYPAL_CLIENT_ID=your-client-id
PAYPAL_CLIENT_SECRET=your-secret
PAYPAL_MODE=sandbox  # Use 'live' in production
PAYPAL_WEBHOOK_ID=your-webhook-id
```

### 5. Test Integration

```bash
# Use PayPal sandbox account
# Email: sb-xxxxx@personal.example.com
# Password: (from PayPal dashboard)
```

---

## 🌿 Green Financial Integration

### 1. Contact Green Financial

Green Financial specializes in cannabis-friendly banking.

1. Go to https://greenfinancial.com
2. Contact sales for API access
3. Request:
   - API credentials
   - Webhook documentation
   - Test environment access

### 2. Get API Credentials

From Green Financial support:
- **API Key**
- **API Secret**
- **API Endpoint**

### 3. Configure Webhook

1. Provide webhook URL: `https://your-backend-domain/api/v1/webhooks/green-financial`
2. Get **Webhook Secret** from Green Financial

### 4. Configure Environment Variables

```env
GREEN_FINANCIAL_API_KEY=your-api-key
GREEN_FINANCIAL_API_SECRET=your-api-secret
GREEN_FINANCIAL_API_URL=https://api.greenfinancial.com
GREEN_FINANCIAL_WEBHOOK_SECRET=your-webhook-secret
```

### 5. Test Integration

Use test credentials provided by Green Financial support.

---

## 🪙 CryptoMass Integration

### 1. Create CryptoMass Account

CryptoMass converts credit/debit cards to cryptocurrency.

1. Go to https://cryptomass.com
2. Click "Sign up"
3. Complete account setup
4. Verify email

### 2. Get API Credentials

1. In CryptoMass dashboard, go to "API"
2. Click "Generate API Key"
3. Copy:
   - **API Key**
   - **API Secret**

### 3. Configure Webhook

1. In CryptoMass dashboard, go to "Webhooks"
2. Click "Add webhook"
3. URL: `https://your-backend-domain/api/v1/webhooks/cryptomass`
4. Copy **Webhook Secret**

### 4. Configure Environment Variables

```env
CRYPTOMASS_API_KEY=your-api-key
CRYPTOMASS_API_SECRET=your-api-secret
CRYPTOMASS_API_URL=https://api.cryptomass.com
CRYPTOMASS_WEBHOOK_SECRET=your-webhook-secret
```

### 5. Test Integration

Use test mode in CryptoMass dashboard.

---

## 🛒 WooCommerce Integration

### 1. Connect WooCommerce Store

If you have an existing WooCommerce store:

1. Go to your WooCommerce dashboard
2. Go to "Settings" → "REST API"
3. Click "Create an API key"
4. Copy:
   - **Consumer Key**
   - **Consumer Secret**

### 2. Configure Environment Variables

```env
WOOCOMMERCE_STORE_URL=https://your-woocommerce-site.com
WOOCOMMERCE_CONSUMER_KEY=your-consumer-key
WOOCOMMERCE_CONSUMER_SECRET=your-consumer-secret
```

### 3. Test Integration

Test syncing products and orders between Great White Hope and WooCommerce.

---

## 🔧 Backend Implementation

### Payment Processor Adapter

All processors use the same adapter interface:

```typescript
// apps/backend/src/adapters/paymentAdapter.ts

export interface PaymentProcessor {
  name: string;
  processPayment(order: any): Promise<PaymentResult>;
  verifyWebhook(signature: string, body: any): boolean;
  refund(transactionId: string, amount: number): Promise<RefundResult>;
}
```

### Add New Processor

1. Create adapter class implementing `PaymentProcessor`
2. Register in `PaymentProcessorFactory`
3. Add environment variables
4. Implement webhook handler

Example:

```typescript
export class MyPaymentAdapter implements PaymentProcessor {
  name = 'my_payment';

  async processPayment(order: any): Promise<PaymentResult> {
    // TODO: Implement payment logic
  }

  verifyWebhook(signature: string, body: any): boolean {
    // TODO: Verify webhook signature
  }

  async refund(transactionId: string, amount: number): Promise<RefundResult> {
    // TODO: Implement refund logic
  }
}

// Register
PaymentProcessorFactory.registerProcessor('my_payment', new MyPaymentAdapter());
```

---

## 🪝 Webhook Handling

### Webhook Endpoints

```
POST /api/v1/webhooks/stripe
POST /api/v1/webhooks/paypal
POST /api/v1/webhooks/green-financial
POST /api/v1/webhooks/cryptomass
POST /api/v1/webhooks/woocommerce
```

### Webhook Flow

1. Payment processor sends webhook
2. Backend verifies signature
3. Update order status in database
4. Send confirmation email
5. Return 200 OK

Example:

```typescript
router.post('/stripe', async (req, res) => {
  const signature = req.headers['stripe-signature'];
  
  try {
    const event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    switch (event.type) {
      case 'charge.succeeded':
        // Update order status
        break;
      case 'charge.failed':
        // Handle failure
        break;
    }

    res.json({ received: true });
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
  }
});
```

---

## 💰 Testing Payment Processors

### Stripe Test Cards

| Card | Result |
|------|--------|
| 4242 4242 4242 4242 | Successful charge |
| 4000 0000 0000 0002 | Card declined |
| 4000 0000 0000 0069 | Expired card |

### PayPal Sandbox

1. Create sandbox account at https://developer.paypal.com
2. Use sandbox credentials
3. Test payment flow

### Green Financial Test Mode

Contact Green Financial support for test credentials.

### CryptoMass Test Mode

1. In CryptoMass dashboard, enable "Test Mode"
2. Use test cards for testing

---

## 🚨 Production Checklist

- [ ] All API keys configured in production
- [ ] Webhook endpoints verified and working
- [ ] SSL certificates valid
- [ ] Rate limiting enabled
- [ ] Logging configured for payment events
- [ ] Error handling for failed payments
- [ ] Refund process tested
- [ ] Customer notifications configured
- [ ] PCI compliance verified
- [ ] Payment data encrypted

---

## 📊 Monitoring Payments

### View Payment Logs

```bash
# Backend logs
docker logs gwh-backend

# Database
SELECT * FROM "Order" WHERE status = 'COMPLETED';
```

### Payment Metrics

- Total transactions
- Success rate
- Average transaction time
- Failed transactions
- Refunds processed

---

## 🔒 Security Best Practices

1. **Never log sensitive data** (card numbers, API keys)
2. **Use HTTPS** for all payment endpoints
3. **Verify webhooks** before processing
4. **Implement rate limiting** on payment endpoints
5. **Store encrypted** payment data
6. **Use PCI-compliant** payment processors
7. **Implement 3D Secure** for credit cards
8. **Monitor for fraud** patterns

---

## 🆘 Troubleshooting

### Payment processor not responding

```bash
# Check API credentials
# Verify webhook endpoint is accessible
# Check logs for errors
docker logs gwh-backend | grep payment
```

### Webhook not being received

```bash
# Verify webhook URL is public
# Check firewall rules
# Verify signature verification is correct
# Check payment processor webhook logs
```

### Payment failed but no error message

```bash
# Check database for order status
# Check payment processor dashboard
# Review error logs
# Contact payment processor support
```

---

## 📞 Support

- **Stripe**: https://support.stripe.com
- **PayPal**: https://www.paypal.com/support
- **Green Financial**: https://greenfinancial.com/support
- **CryptoMass**: https://cryptomass.com/support
- **WooCommerce**: https://woocommerce.com/support

---

## 🎯 Next Steps

1. Choose payment processors to integrate
2. Create accounts and get API credentials
3. Configure environment variables
4. Implement adapter for each processor
5. Test with test credentials
6. Deploy to production
7. Monitor payment processing
8. Handle refunds and disputes

**Payment processing is critical to your business. Test thoroughly before going live!** 💰
