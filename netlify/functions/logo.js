export async function handler(event, context) {
    const recipient = event.queryStringParameters.logo || "unknown";
  
    // Log to Logflare
    await fetch("https://api.logflare.app/logs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": "fFBOx4Xa4EBp",
      },
      body: JSON.stringify({
        source: "cdef6c9b-f1ee-40cb-b686-d8c9a2f485b5",
        log_entry: `Email opened by ${recipient}`,
        metadata: {
          recipient,
          user_agent: event.headers["user-agent"] || "unknown",
          ip: event.headers["client-ip"] || "unknown"
        }
      }),
    });
  
    // Fetch your image
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
  