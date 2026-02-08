# ⚡ QUICK FIX: Brevo Email on Render

## 🎯 The Problem
You're getting "Authentication failed. Please try again." because Brevo SMTP credentials are not configured on Render.

## ✅ Quick Solution (5 minutes)

### Step 1: Get Brevo Credentials (2 min)

1. **Login to Brevo**: https://app.brevo.com/
2. **Go to**: Settings (top right) → SMTP & API → SMTP tab
3. **Copy these**:
   - Login email (your Brevo account email)
   - SMTP key (click "Create new SMTP key" if needed)

### Step 2: Verify Sender Email (1 min)

1. **In Brevo**: Go to Senders → Domains & Addresses
2. **Add**: Your sender email (e.g., noreply@yourdomain.com)
3. **Verify**: Follow email confirmation link
4. ⚠️ **MUST BE VERIFIED** or emails won't send!

### Step 3: Add to Render (2 min)

1. **Open**: https://dashboard.render.com/
2. **Select**: Your mithila-makhana-api service
3. **Click**: Environment tab
4. **Add these variables** (click "+ Add Environment Variable" for each):

```
SMTP_HOST = smtp-relay.brevo.com
SMTP_PORT = 587
SMTP_USER = your_brevo_email@example.com
SMTP_PASSWORD = your_brevo_smtp_key_here
SMTP_FROM_EMAIL = your_verified_sender@example.com
SMTP_FROM_NAME = Mithila Makhana
```

5. **Click**: "Save Changes"
6. **Wait**: 2-3 minutes for auto-redeploy

### Step 4: Test It! (1 min)

Try registering a new user in your app. You should receive a verification email!

## 📋 Copy-Paste Checklist

```
✓ Got SMTP_USER from Brevo (Login email)
✓ Got SMTP_PASSWORD from Brevo (SMTP key, not account password!)
✓ Verified sender email in Brevo Senders section
✓ Added all 6 environment variables to Render
✓ Clicked "Save Changes" on Render
✓ Waited for deployment to complete
✓ Tested registration - email received!
```

## 🐛 Still Not Working?

### Common Mistakes:

1. **Using account password** instead of SMTP key
   - ❌ Wrong: Your Brevo login password
   - ✅ Right: SMTP key from SMTP & API section

2. **Sender email not verified**
   - Go to Brevo → Senders → Verify your email

3. **Wrong SMTP_HOST**
   - Must be: `smtp-relay.brevo.com` (not sendinblue.com)

4. **Variables not saved**
   - Click "Save Changes" after adding variables
   - Check they appear in the Environment list

### Check Render Logs:

1. Render Dashboard → Your Service → Logs tab
2. Look for:
   - `✅ Verification email sent:` = Success!
   - `❌ Email sending failed:` = Check error message
   - `Invalid login:` = Wrong SMTP credentials

## 💡 Quick Test Command

```bash
# Replace with your actual Render URL
curl -X POST https://your-service.onrender.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test123!",
    "name": "Test User"
  }'
```

Should return:
```json
{
  "success": true,
  "message": "Registration successful. Please check your email..."
}
```

## 📞 Need More Help?

See detailed guide: [BREVO_SETUP_GUIDE.md](./BREVO_SETUP_GUIDE.md)

---

**TL;DR:** Get SMTP credentials from Brevo, verify sender email, add 6 environment variables to Render, save & wait for redeploy. Done! 🎉
