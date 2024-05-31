"use client";

import { useEffect, useState } from "react";

export default function RenderStreamData() {
  const [data, setData] = useState<any[]>([]);

  const connectToStream = () => {
    // Connect to /api/stream as the SSE API source
    const eventSource = new EventSource("/api/events");
    return eventSource;
  };

  useEffect(() => {
    const eventSource = connectToStream();

    eventSource.addEventListener("message", (event) => {
      // Parse the data received from the stream into JSON
      // Add it the list of messages seen on the page
      console.log(event.data);
      setData((prevData) => [JSON.parse(event.data), prevData]);
    });

    eventSource.addEventListener("error", () => {
      eventSource.close();
      setTimeout(connectToStream, 1);
    });

    // As the component unmounts, close listener to SSE API
    return () => {
      eventSource.close();
    };
  }, []);

  return <div>{JSON.stringify(data)}</div>;
}
