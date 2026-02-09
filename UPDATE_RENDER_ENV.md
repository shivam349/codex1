# Update Render Environment Variables

## ✅ What We Fixed
Your local MongoDB credentials have been updated and admin password has been reset successfully.

## ⚠️ Action Required
You need to update the MongoDB password on Render:

### Steps:

1. **Go to Render Dashboard**
   - Visit: https://dashboard.render.com/
   - Sign in with your account

2. **Find Your Backend Service**
   - Look for: `codex1` or your backend service name
   - Click on it

3. **Update Environment Variables**
   - Click on **"Environment"** tab in the left sidebar
   - Find the variable: `MONGO_URI`
   - Click **Edit** (pencil icon)
   
4. **Update the Value**
   Replace the current MONGO_URI with:
   ```
   mongodb+srv://shivamgarg1515_db_user:9334659932@cluster0.ouzkhsh.mongodb.net/mithila-makhana?retryWrites=true&w=majority&appName=Cluster0
   ```

5. **Save and Redeploy**
   - Click **"Save Changes"**
   - Render will automatically redeploy your service (~2-5 minutes)

6. **Wait for Deployment**
   - Watch the "Events" or "Logs" tab
   - Wait for status to show: "Live"

### After Deployment:

Test the login again:
```bash
curl -X POST https://codex1-nq28.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@mithilamakhana.com", "password": "admin123"}'
```

Should return: `{"success":true, ...}`

### Then Login:

Go to your admin panel and login with:
- **Email:** admin@mithilamakhana.com
- **Password:** admin123

---

## Alternative: Use Command Line (if you have Render CLI)

```bash
render env set MONGO_URI="mongodb+srv://shivamgarg1515_db_user:9334659932@cluster0.ouzkhsh.mongodb.net/mithila-makhana?retryWrites=true&w=majority&appName=Cluster0" --service=codex1
```
