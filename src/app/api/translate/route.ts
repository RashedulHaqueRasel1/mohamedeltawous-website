import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { text, target } = await req.json();

    const res = await fetch(
      `https://translation.googleapis.com/language/translate/v2?key=${process.env.GOOGLE_TRANSLATE_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          q: text,
          target,
          format: "text",
        }),
      },
    );

    const data = await res.json();

    return NextResponse.json({
      translatedText: data?.data?.translations?.[0]?.translatedText || text,
    });
  } catch (err) {
    return NextResponse.json({ translatedText: "" }, { status: 500 });
  }
}
