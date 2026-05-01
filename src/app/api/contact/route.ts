import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        access_key: "40e29eae-51f0-4caf-bfbf-ad6142266589",
        subject: `New message from ${name} — Portfolio`,
        from_name: name,
        replyto: email,
        email: email,
        message: message,
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error("Web3Forms error:", text);
      return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
    }

    const data = await response.json();

    if (data.success) {
      return NextResponse.json({ success: true });
    } else {
      console.error("Web3Forms rejected:", data);
      return NextResponse.json({ error: data.message || "Failed to send" }, { status: 500 });
    }
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
