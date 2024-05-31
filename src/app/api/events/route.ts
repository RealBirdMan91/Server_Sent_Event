export const dynamic = "force-dynamic";
import redisClient from "@/lib/redis";

export async function GET() {
  const encoder = new TextEncoder();

  // Create a streaming response
  const customReadable = new ReadableStream({
    start(controller) {
      redisClient.subscribe("todos", (data) => {
        console.log(data);
        controller.enqueue(encoder.encode(`data: ${data}\n\n`));
      });
    },
  });
  // Return the stream response and keep the connection alive
  return new Response(customReadable, {
    // Set the headers for Server-Sent Events (SSE)
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      Connection: "keep-alive",
      "Cache-Control": "no-cache, no-transform",
      "Content-Encoding": "none",
    },
  });
}
