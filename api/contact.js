export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  try {
    const { name, email, subject, message, website } = req.body || {};

    // 1. Honeypot check: silently drop automated spam submissions
    if (website) {
      return res.status(200).json({ success: true, message: 'Message sent successfully.' });
    }

    // 2. Input validation
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return res.status(400).json({ success: false, message: 'Valid name is required.' });
    }
    if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return res.status(400).json({ success: false, message: 'Valid email address is required.' });
    }
    if (!subject || typeof subject !== 'string' || subject.trim().length < 2) {
      return res.status(400).json({ success: false, message: 'Valid subject is required.' });
    }
    if (!message || typeof message !== 'string' || message.trim().length < 5) {
      return res.status(400).json({ success: false, message: 'Message must be at least 5 characters.' });
    }

    // 3. Secret API key — read securely from environment variables, never hardcoded in git
    const accessKey = process.env.WEB3FORMS_ACCESS_KEY || process.env.VITE_WEB3FORMS_ACCESS_KEY;

    if (!accessKey) {
      return res.status(500).json({
        success: false,
        message: 'Server configuration error: Access key not configured.',
      });
    }

    // 4. Secure server-to-server forward to Web3Forms
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        access_key: accessKey,
        name: String(name).trim(),
        email: String(email).trim(),
        subject: `[Portfolio Contact] ${String(subject).trim()}`,
        message: String(message).trim(),
        from_name: `${String(name).trim()} (via Portfolio)`,
      }),
    });

    const data = await response.json();

    if (response.ok && data.success) {
      return res.status(200).json({ success: true, message: 'Message sent successfully.' });
    } else {
      return res.status(response.status || 400).json({
        success: false,
        message: data.message || 'Failed to deliver message.',
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to deliver message. Please try again later.',
    });
  }
}
