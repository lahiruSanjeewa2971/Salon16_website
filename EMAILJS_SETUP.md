# EmailJS Setup Guide for Contact Form

This guide will help you set up EmailJS to send emails from your contact form for **FREE** (200 emails/month).

## Step 1: Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account (no credit card required)
3. Verify your email address

## Step 2: Add Email Service

1. In your EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions for your provider
5. **Copy the Service ID** (you'll need this later)

## Step 3: Create Email Template

1. Go to **Email Templates** in your dashboard
2. Click **Create New Template**
3. Use this template structure:

```
Subject: New Contact Form Message from {{from_name}}

From: {{from_name}}
Email: {{from_email}}
Phone: {{phone}}

Message:
{{message}}

---
This message was sent from your website contact form.
```

4. **Copy the Template ID** (you'll need this later)

## Step 4: Get Your Public Key

1. Go to **Account** → **General**
2. Find your **Public Key** (also called API Key)
3. **Copy the Public Key**

## Step 5: Configure Environment Variables

1. Create a `.env` file in your project root (if it doesn't exist)
2. Add the following variables:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id_here
VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
VITE_CONTACT_EMAIL=your-email@example.com
```

3. Replace the placeholder values with your actual values from EmailJS
4. **Important**: Restart your development server after adding environment variables

## Step 6: Test the Form

1. Start your development server: `npm run dev`
2. Navigate to the Contact page
3. Fill out the form and submit
4. Check your email inbox for the message

## Troubleshooting

- **"EmailJS configuration is missing"**: Make sure all environment variables are set in your `.env` file
- **Emails not received**: Check your spam folder and verify your EmailJS service is connected correctly
- **Rate limit errors**: Free tier allows 200 emails/month. Upgrade if you need more.

## Free Tier Limits

- ✅ 200 emails per month
- ✅ No credit card required
- ✅ Perfect for small businesses and personal projects

## Need More Emails?

If you need more than 200 emails/month, EmailJS offers paid plans starting at $15/month for 1,000 emails.

