# Payment Processor Setup Guide

Complete guide to configuring all 5 payment processors.

---

## Stripe

### 1. Create Stripe Account

1. Go to https://stripe.com
2. Sign up for account
3. Complete verification

### 2. Get API Keys

1. Go to Dashboard → Developers → API Keys
2. Copy "Secret Key" (starts with `sk_live_`)
3. Copy "Publishable Key" (starts with `pk_live_`)

### 3. Configure in Railway

Add to environment variables:

```env
STRIPE_SECRET_KEY=sk_live_...
STRIPE_PUBLISHABLE_KEY=pk_live_...
```

### 4. Set Up Webhook

1. Go to Developers → Webhooks
2. Add endpoint: `https://your-backend.railway.app/api/v1/webhooks/stripe`
3. Select events:
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
   - `charge.refunded`
4. Copy signing secret
5. Add to environment:
   ```env
   STRIPE_WEBHOOK_SECRET=whsec_...
   ```

### 5. Test

Use test credentials:
- Card: `4242 4242 4242 4242`
- Expiry: `12/25`
- CVC: `123`

---

## PayPal

### 1. Create PayPal Developer Account

1. Go to https://developer.paypal.com
2. Sign up for account
3. Verify email

### 2. Get API Credentials

1. Go to Apps & Credentials
2. Select "Sandbox" or "Live"
3. Copy Client ID and Secret

### 3. Configure in Railway

```env
PAYPAL_CLIENT_ID=...
PAYPAL_CLIENT_SECRET=...
PAYPAL_MODE=live
```

### 4. Set Up Webhook

1. Go to Webhooks
2. Add endpoint: `https://your-backend.railway.app/api/v1/webhooks/paypal`
3. Select events:
   - `PAYMENT.CAPTURE.COMPLETED`
   - `PAYMENT.CAPTURE.DENIED`
   - `PAYMENT.CAPTURE.REFUNDED`

### 5. Test

Use PayPal sandbox account for testing.

---

## Green Financial

### 1. Contact Green Financial

1. Email: support@greenfinancial.com
2. Request API access for cannabis merchants
3. Complete verification

### 2. Get API Key

1. Receive API key from Green Financial
2. Receive API endpoint URL

### 3. Configure in Railway

```env
GREEN_FINANCIAL_API_KEY=...
GREEN_FINANCIAL_API_URL=https://api.greenfinancial.com
```

### 4. Set Up Webhook

1. Configure webhook endpoint: `https://your-backend.railway.app/api/v1/webhooks/green-financial`
2. Request signature key from Green Financial
3. Add to environment:
   ```env
   GREEN_FINANCIAL_WEBHOOK_SECRET=...
   ```

### 5. Test

Contact Green Financial for test credentials.

---

## CryptoMass

### 1. Create CryptoMass Account

1. Go to https://cryptomass.com
2. Sign up for merchant account
3. Complete KYC verification

### 2. Get API Key

1. Go to Dashboard → API Keys
2. Create new API key
3. Copy key and secret

### 3. Configure in Railway

```env
CRYPTOMASS_API_KEY=...
CRYPTOMASS_API_SECRET=...
CRYPTOMASS_API_URL=https://api.cryptomass.com
```

### 4. Set Up Webhook

1. Go to Webhooks
2. Add endpoint: `https://your-backend.railway.app/api/v1/webhooks/cryptomass`
3. Copy webhook secret
4. Add to environment:
   ```env
   CRYPTOMASS_WEBHOOK_SECRET=...
   ```

### 5. Test

Use CryptoMass sandbox for testing.

---

## WooCommerce

### 1. Set Up WooCommerce Store

1. Install WooCommerce plugin
2. Configure payment gateway
3. Enable REST API

### 2. Get API Credentials

1. Go to WooCommerce → Settings → Advanced → REST API
2. Create new API key
3. Copy Consumer Key and Consumer Secret

### 3. Configure in Railway

```env
WOOCOMMERCE_STORE_URL=https://your-store.com
WOOCOMMERCE_CONSUMER_KEY=...
WOOCOMMERCE_CONSUMER_SECRET=...
```

### 4. Set Up Webhook

1. Go to WooCommerce → Settings → Advanced → Webhooks
2. Create webhook for order events
3. Endpoint: `https://your-backend.railway.app/api/v1/webhooks/woocommerce`

### 5. Test

Test with WooCommerce test mode enabled.

---

## Testing Payment Processors

### Frontend Testing

1. Go to Checkout page
2. All 5 payment methods should appear
3. Select each processor
4. Complete test transaction

### Backend Testing

```bash
# Test Stripe
curl -X POST https://your-backend/api/v1/webhooks/stripe \
  -H "X-Stripe-Signature: <test-signature>" \
  -d '{...}'

# Test PayPal
curl -X POST https://your-backend/api/v1/webhooks/paypal \
  -d '{...}'

# Test Green Financial
curl -X POST https://your-backend/api/v1/webhooks/green-financial \
  -H "X-Signature: <signature>" \
  -d '{...}'

# Test CryptoMass
curl -X POST https://your-backend/api/v1/webhooks/cryptomass \
  -H "X-Signature: <signature>" \
  -d '{...}'

# Test WooCommerce
curl -X POST https://your-backend/api/v1/webhooks/woocommerce \
  -d '{...}'
```

---

## Switching Payment Processors

To change default processor:

1. Edit `apps/backend/src/adapters/factory.ts`
2. Change `DEFAULT_PROCESSOR` constant
3. Redeploy backend

---

## Troubleshooting

### Webhook Not Receiving Events

- Verify endpoint URL is correct
- Check firewall/CORS settings
- Verify signature validation
- Check logs in payment processor dashboard

### Payment Failing

- Verify API keys are correct
- Check test vs live mode
- Verify customer has sufficient balance
- Check payment processor logs

### Signature Validation Failing

- Verify webhook secret is correct
- Check signature header name
- Verify request body hasn't been modified

---

## Support

- **Stripe**: https://support.stripe.com
- **PayPal**: https://www.paypal.com/us/smarthelp
- **Green Financial**: support@greenfinancial.com
- **CryptoMass**: support@cryptomass.com
- **WooCommerce**: https://woocommerce.com/support/

---

**Payment processors configured and ready for production!** 💳
