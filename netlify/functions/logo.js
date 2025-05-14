
export async function handler(event, context) {
  const recipient = event.queryStringParameters.logo || "unknown";
  const userAgent = event.headers["user-agent"] || "unknown";
  const ip = event.headers["client-ip"] || "unknown";

  // Post to Google Sheets
  await fetch("https://script.google.com/macros/s/AKfycbx-sTFjpVxvt1XS3BvHEcQ5FWabra8mHrunjppcR1YU0HXEXNSUf1zNqtYbxmF3OYc3/exec", {
    method: "POST",
    body: JSON.stringify({
      recipient,
      user_agent: userAgent,
      ip
    }),
    headers: {
      "Content-Type": "application/json"
    }
  });

  // Serve the image
  const image = await fetch("https://kelleylogo.netlify.app/kelleylogo.png");
  const buffer = await image.arrayBuffer();

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "no-cache"
    },
    body: Buffer.from(buffer).toString("base64"),
    isBase64Encoded: true
  };
}
