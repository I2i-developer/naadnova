# Contact Form Email

The `/contact` form sends trial enquiries to `naadnovaofficial@gmail.com` through Resend.
The recipient comes from `siteConfig.contact.email` and cannot be changed by a visitor.
Each email includes the student's name, email, phone, instrument, learning mode, and message.
Reply-To is the student's validated email address.

## Configuration

1. Create a Resend API key and verify a sending domain in Resend.
2. Set these server-only variables in `.env.local` and Vercel's Production/Preview environments:

```dotenv
RESEND_API_KEY=your-resend-api-key
CONTACT_EMAIL_FROM=Naadnova Academy <enquiries@your-verified-domain.example>
```

3. Redeploy after setting the variables.
4. Submit a trial enquiry and confirm it appears in Resend's delivery logs and the academy inbox.

The verified sender is separate from the Gmail recipient. Do not use a Gmail address as the
Resend sender unless that sender is supported and verified by your provider.
Provider documentation: https://resend.com/docs/api-reference/emails/send-email

## Behavior

- Browser and server validation enforce required fields and message size limits.
- A hidden honeypot rejects simple automated submissions.
- Pending submissions disable the send button.
- Success is shown only after Resend accepts the email; inbox delivery depends on the provider.
- On validation or delivery failure, the visitor's entered details remain available to retry.
- Missing credentials return a visible error without sending an email or reporting success.
- API keys and submitted personal details are not written to application logs.
