import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Please fill in name, email and message." },
        { status: 400 }
      );
    }

    const { error } = await resend.emails.send({
      from: "CPC Salary Calculator <onboarding@resend.dev>", // change to your domain later if you verify a sender
      to: ["cpcforgovtemployees@gmail.com"],
      replyTo: email,
      subject: `New message from ${name} (Contact Form)`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });

    if (error) {
      console.error(error);
      return NextResponse.json({ error: "Failed to send email." }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Unexpected server error." }, { status: 500 });
  }
}
