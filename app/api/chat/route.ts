const VIVI_API_URL = process.env.VIVI_API_URL;
const VIVI_CHANNEL_ID = process.env.VIVI_CHANNEL_ID;
const VIVI_API_KEY = process.env.VIVI_API_KEY;

export async function POST(request: Request) {
  try {
    const { message, threadId } = await request.json();

    if (!message || !threadId) {
      return Response.json(
        { error: "Missing message or threadId" },
        { status: 400 }
      );
    }

    if (!VIVI_API_URL || !VIVI_CHANNEL_ID || !VIVI_API_KEY) {
      return Response.json(
        { error: "Chat service not configured" },
        { status: 500 }
      );
    }

    const response = await fetch(
      `${VIVI_API_URL}/channelsApi/${VIVI_CHANNEL_ID}/invoke`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "vivi-api-key": VIVI_API_KEY,
        },
        body: JSON.stringify({
          message,
          threadId,
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("VIVI API error:", response.status, errorText);
      return Response.json(
        { error: "Chat service error" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    console.error("Chat API error:", error);
    return Response.json(
      { error: "Failed to process chat message" },
      { status: 500 }
    );
  }
}
