"use server";

import { createClient } from "@/lib/supabase/server";
import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function subscribeToNewsletter(email: string): Promise<{ success: boolean; error?: string }> {
  if (!email || !email.includes("@")) {
    return { success: false, error: "Invalid email address" };
  }

  const supabase = await createClient();
  if (!supabase) return { success: false, error: "Service not configured" };

  const { error } = await supabase
    .from("newsletter_subscribers")
    .insert({ email: email.toLowerCase().trim() })
    .select()
    .single();

  if (error) {
    if (error.code === "23505") {
      return { success: true }; // Already subscribed
    }
    return { success: false, error: error.message };
  }

  // Send welcome email via Resend (non-blocking, best-effort)
  if (resend) {
    resend.emails.send({
      from: "Parallels <onboarding@resend.dev>",
      to: email,
      subject: "Welcome to Parallels — Where Faiths Converge",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
          <h1 style="font-size: 24px; margin-bottom: 16px;">Welcome to Parallels</h1>
          <p style="color: #666; line-height: 1.6; margin-bottom: 16px;">
            You're now part of a community exploring the common threads across the world's great traditions.
          </p>
          <p style="color: #666; line-height: 1.6; margin-bottom: 24px;">
            You'll receive our weekly digest featuring:
          </p>
          <ul style="color: #666; line-height: 1.8; margin-bottom: 24px; padding-left: 20px;">
            <li>Verse of the Day from a rotating tradition</li>
            <li>Curated comparisons across faiths</li>
            <li>New features and insights</li>
          </ul>
          <a href="https://parallels-ten.vercel.app" style="display: inline-block; background: #d4a054; color: #0a0a0f; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600;">
            Explore Parallels →
          </a>
        </div>
      `,
    }).catch(() => {}); // Silently fail — don't block subscription
  }

  return { success: true };
}
