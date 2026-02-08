# Brevo (Sendinblue) Email Setup Guide

This guide will help you set up Brevo API for sending verification emails in your Mithila Makhana application.

## 🚀 Quick Start

### Step 1: Create Brevo Account

1. Go to [Brevo.com](https://www.brevo.com/) (formerly Sendinblue)
2. Click "Sign up free"
3. Complete the registration process
4. Verify your email address

### Step 2: Get Your SMTP Credentials

1. Log in to your Brevo dashboard
2. Go to **Settings** (top right) → **SMTP & API**
3. Navigate to the **SMTP** tab
4. Click on **"Create a new SMTP key"** or use existing one
5. You'll see:
   - **Login (SMTP_USER)**: Your Brevo account email
   - **SMTP key (SMTP_PASSWORD)**: The generated key (save this!)
   - **Server**: smtp-relay.brevo.com
   - **Port**: 587 (recommended) or 465

### Step 3: Verify Your Sender Email

⚠️ **IMPORTANT**: Brevo requires you to verify the "from" email address.

1. In Brevo dashboard, go to **Senders** → **Domains & Addresses**
2. Click **"Add a domain or address"**
3. Enter your sender email (e.g., noreply@yourdomain.com)
4. Follow verification steps (email confirmation or DNS records)
5. Wait for verification (usually instant for email, 24-48h for domains)

### Step 4: Configure Render Environment Variables

1. Go to your Render dashboard: https://dashboard.render.com/
2. Select your backend service (mithila-makhana-api)
3. Go to **Environment** tab
4. Add the following environment variables:

#### Required Variables:

```
SMTP_HOST = smtp-relay.brevo.com
SMTP_PORT = 587
SMTP_USER = your_brevo_login_email@example.com
SMTP_PASSWORD = your_brevo_smtp_key_here
SMTP_FROM_EMAIL = your_verified_sender@example.com
SMTP_FROM_NAME = Mithila Makhana
```

#### Detailed Configuration:

| Variable | Value | Description |
|----------|-------|-------------|
| `SMTP_HOST` | `smtp-relay.brevo.com` | Brevo SMTP server |
| `SMTP_PORT` | `587` | SMTP port (use 587 for TLS) |
| `SMTP_USER` | Your Brevo login email | Email you used to sign up |
| `SMTP_PASSWORD` | Your SMTP key from Brevo | NOT your account password |
| `SMTP_FROM_EMAIL` | Your verified sender email | Must be verified in Brevo |
| `SMTP_FROM_NAME` | `Mithila Makhana` | Display name for emails |

### Step 5: Save and Deploy

1. Click **"Save Changes"** in Render
2. Render will automatically redeploy your service
3. Wait for deployment to complete (2-3 minutes)

## 🧪 Testing Your Setup

### Test 1: Check Service Status

```bash
curl https://your-service.onrender.com/api/status
```

Expected response:
```json
{
  "status": "ok",
  "timestamp": "2024-02-08T...",
  "service": "Mithila Makhana API"
}
```

### Test 2: Register a Test User

```bash
curl -X POST https://your-service.onrender.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "TestPass123!",
    "name": "Test User"
  }'
```

Expected response:
```json
{
  "success": true,
  "message": "Registration successful. Please check your email to verify your account.",
  "data": {
    "id": "...",
    "email": "test@example.com",
    "name": "Test User"
  }
}
```

### Test 3: Check Your Email

- Check the inbox of the email you used for registration
- You should receive a verification email within 1-2 minutes
- Check spam folder if not in inbox

## 📊 Brevo Free Plan Limits

- **300 emails per day** (free tier)
- Unlimited contacts
- Email support
- Basic email templates

⚠️ If you need more emails, upgrade to a paid plan.

## 🐛 Troubleshooting

### Issue: "Authentication failed"

**Causes:**
- Wrong SMTP_USER or SMTP_PASSWORD
- Using account password instead of SMTP key
- Email not verified in Brevo

**Solutions:**
1. Double-check your SMTP credentials in Brevo dashboard
2. Generate a new SMTP key
3. Verify your sender email address
4. Check Render environment variables are saved correctly

### Issue: "Email not sent" or "Sender not verified"

**Causes:**
- SMTP_FROM_EMAIL not verified in Brevo
- Using unverified domain

**Solutions:**
1. Go to Brevo → Senders → Verify your email/domain
2. Use the exact verified email in SMTP_FROM_EMAIL
3. Wait for verification to complete

### Issue: "Connection timeout"

**Causes:**
- Wrong SMTP_HOST or SMTP_PORT
- Firewall blocking port 587

**Solutions:**
1. Verify SMTP_HOST is `smtp-relay.brevo.com`
2. Try port 465 instead of 587
3. Check Render service logs for detailed errors

### Issue: "Daily limit exceeded"

**Causes:**
- Exceeded 300 emails/day on free plan

**Solutions:**
1. Wait until tomorrow (limit resets daily)
2. Upgrade to paid Brevo plan
3. Use multiple Brevo accounts (not recommended)

## 📝 Checking Render Logs

To see detailed error messages:

1. Go to Render Dashboard
2. Select your service
3. Click on **Logs** tab
4. Look for errors related to email sending

Common log messages:
- `✅ Verification email sent:` - Success!
- `❌ Email sending failed:` - Check the error message
- `Invalid login:` - Wrong credentials
- `Sender not verified:` - Verify sender email in Brevo

## 🔐 Security Best Practices

1. **Never commit credentials to Git**
   - Use environment variables only
   - Add `.env` to `.gitignore`

2. **Use strong SMTP keys**
   - Regenerate keys if compromised
   - Store securely

3. **Monitor usage**
   - Check Brevo dashboard for email statistics
   - Set up alerts for failed sends

4. **Rotate keys regularly**
   - Generate new SMTP keys every 3-6 months
   - Update in Render environment variables

## 📚 Additional Resources

- [Brevo SMTP Documentation](https://developers.brevo.com/docs/send-emails-via-smtp)
- [Brevo API Dashboard](https://app.brevo.com/)
- [Render Environment Variables](https://docs.render.com/configure-environment-variables)
- [Nodemailer Brevo Guide](https://nodemailer.com/transports/smtp/)

## 🎯 Quick Reference Card

```env
# Copy these to Render Environment Variables
SMTP_HOST=smtp-relay.brevo.com
SMTP_PORT=587
SMTP_USER=your_email@example.com
SMTP_PASSWORD=xsmtpsib-abc123...
SMTP_FROM_EMAIL=noreply@yourdomain.com
SMTP_FROM_NAME=Mithila Makhana
```

## ✅ Verification Checklist

- [ ] Brevo account created and verified
- [ ] SMTP key generated
- [ ] Sender email verified in Brevo
- [ ] All environment variables added to Render
- [ ] Service redeployed on Render
- [ ] Test registration completed successfully
- [ ] Verification email received

---

**Need Help?** 
- Check Render logs for errors
- Verify all credentials in Brevo dashboard
- Ensure sender email is verified
- Test with a different email address
