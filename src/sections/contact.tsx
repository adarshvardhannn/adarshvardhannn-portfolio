import { motion } from 'framer-motion';
import { useState, useRef } from 'react';
import { HiOutlineArrowRight, HiOutlineMail } from 'react-icons/hi';
import { socialLinks } from '@/data/site';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { SectionHeading } from '@/components/ui/section-heading';

// If VITE_API_URL is set (e.g. custom backend), use it; otherwise use relative /api/contact
const API_BASE = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace(/\/$/, '') : '';

export const ContactSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const submittingRef = useRef(false);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Prevent duplicate submissions
    if (submittingRef.current) return;
    submittingRef.current = true;

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    const form = event.currentTarget;
    const formData = new FormData(form);

    const name = ((formData.get('name') as string) || '').trim();
    const email = ((formData.get('email') as string) || '').trim();
    const subject = ((formData.get('subject') as string) || '').trim();
    const message = ((formData.get('message') as string) || '').trim();
    const website = ((formData.get('website') as string) || '').trim();

    // Client-side validation
    if (!name || name.length < 2 || name.length > 100) {
      setSubmitStatus('error');
      setErrorMessage('Please enter a valid name (2–100 characters).');
      setIsSubmitting(false);
      submittingRef.current = false;
      return;
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setSubmitStatus('error');
      setErrorMessage('Please enter a valid email address.');
      setIsSubmitting(false);
      submittingRef.current = false;
      return;
    }
    if (!subject || subject.length < 2 || subject.length > 200) {
      setSubmitStatus('error');
      setErrorMessage('Please enter a valid subject (2–200 characters).');
      setIsSubmitting(false);
      submittingRef.current = false;
      return;
    }
    if (!message || message.length < 5 || message.length > 5000) {
      setSubmitStatus('error');
      setErrorMessage('Please enter a message (5–5000 characters).');
      setIsSubmitting(false);
      submittingRef.current = false;
      return;
    }

    try {
      let sentSuccessfully = false;
      let failureMessage = '';

      // Primary Strategy: Internal Serverless / API Route (/api/contact)
      // This keeps third-party keys and URLs 100% hidden on the server.
      try {
        const endpoint = API_BASE ? `${API_BASE}/api/contact` : '/api/contact';
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({ name, email, subject, message, website }),
        });

        if (response.status !== 404) {
          const result = await response.json();
          if (response.ok && result.success) {
            sentSuccessfully = true;
          } else {
            failureMessage = result.message || 'Unable to send your message. Please try again.';
          }
        }
      } catch {
        // Fall through to client fallback if /api/contact is unavailable
      }

      // Fallback Strategy: Direct Client Web3Forms submission (if running static or fallback key provided)
      if (!sentSuccessfully && !failureMessage) {
        const clientKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
        if (clientKey) {
          try {
            const directResponse = await fetch('https://api.web3forms.com/submit', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
              },
              body: JSON.stringify({
                access_key: clientKey,
                name,
                email,
                subject: `[Portfolio Contact] ${subject}`,
                message,
                botcheck: website,
              }),
            });

            const directResult = await directResponse.json();
            if (directResponse.ok && directResult.success) {
              sentSuccessfully = true;
            } else {
              failureMessage = directResult.message || 'Unable to send message via fallback.';
            }
          } catch {
            failureMessage = 'Network error while delivering message.';
          }
        }
      }

      if (sentSuccessfully) {
        setSubmitStatus('success');
        form.reset();
      } else {
        setSubmitStatus('error');
        setErrorMessage(failureMessage || 'Unable to send your message. Please try again.');
      }
    } catch {
      setSubmitStatus('error');
      setErrorMessage('Unable to send your message. Please try again.');
    } finally {
      setIsSubmitting(false);
      submittingRef.current = false;
    }
  };

  return (
    <section id="contact" className="px-5 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Contact"
          title="Let’s build something secure and impactful."
          description="Whether it’s a cybersecurity project, digital forensics solution, AI-powered security system, or technical collaboration, I’m always open to connecting and building something meaningful."
        />

        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <motion.form
            className="glass-panel ring-glow rounded-[2rem] p-6 sm:p-8"
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            onSubmit={onSubmit}
          >
            {/* Honeypot field — visually hidden, traps bots */}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                left: '-9999px',
                top: '-9999px',
                opacity: 0,
                height: 0,
                overflow: 'hidden',
              }}
            >
              <input type="text" name="website" tabIndex={-1} autoComplete="off" />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Input name="name" placeholder="Your name" required disabled={isSubmitting} />
              <Input name="email" placeholder="Email address" type="email" required disabled={isSubmitting} />
            </div>
            <div className="mt-4">
              <Input name="subject" placeholder="Subject" required disabled={isSubmitting} />
            </div>
            <div className="mt-4">
              <Textarea
                name="message"
                placeholder="Tell me about your project, idea, or partnership..."
                required
                disabled={isSubmitting}
              />
            </div>
            <div className="mt-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <p className="text-sm text-white/52 break-words">
                Prefer email? Reach me at{' '}
                <a href="mailto:adarshraj5206@gmail.com" className="text-emerald-400 hover:underline">
                  adarshraj5206@gmail.com
                </a>
              </p>
              <Button type="submit" size="lg" disabled={isSubmitting} className="w-full sm:w-auto justify-center">
                {isSubmitting ? 'Sending...' : 'Send message'}{' '}
                <HiOutlineArrowRight className={isSubmitting ? 'animate-pulse' : ''} />
              </Button>
            </div>
            {submitStatus === 'success' && (
              <p className="mt-4 text-sm text-emerald-300 font-medium bg-emerald-400/10 border border-emerald-400/20 rounded-xl p-3">
                Thanks! Your message has been sent successfully. I will get back to you soon.
              </p>
            )}
            {submitStatus === 'error' && (
              <p className="mt-4 text-sm text-rose-400 font-medium bg-rose-400/10 border border-rose-400/20 rounded-xl p-3">
                {errorMessage}
              </p>
            )}
          </motion.form>

          <motion.aside
            className="glass-panel rounded-[2rem] p-6 sm:p-8"
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.05 }}
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-400/20 bg-emerald-400/10 text-emerald-300">
              <HiOutlineMail size={22} />
            </div>
            <h3 className="mt-5 font-display text-2xl font-semibold text-white">Let’s collaborate.</h3>
            <p className="mt-4 text-sm leading-7 text-white/64">
              Open to cybersecurity projects, internships, technical collaborations, CTFs, and interesting ideas at the
              intersection of security and technology.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-white/70 transition-all duration-300 hover:border-emerald-400/30 hover:bg-white/[0.06] hover:text-white"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
