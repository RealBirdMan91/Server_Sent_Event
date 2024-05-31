"use client";
import { Todo } from "@prisma/client";
import React, { useEffect, useState } from "react";

function Todos({ initialTodos }: { initialTodos: Todo[] }) {
  const [data, setData] = useState<Todo[]>(initialTodos);

  useEffect(() => {
    const connectToStream = () => {
      // Connect to /api/stream as the SSE API source
      const eventSource = new EventSource("/api/events");
      return eventSource;
    };
    const eventSource = connectToStream();

    eventSource.addEventListener("message", (event) => {
      // Parse the data received from the stream into JSON
      // Add it the list of messages seen on the page
      console.log(event.data);
      setData((prevData) => [JSON.parse(event.data), ...prevData]);
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

  return (
    <ul className="overflow-auto">
      {data.map((todo) => (
        <li
          key={todo.id}
          className="text-slate-700 bg-white my-2 rounded-md px-8 py-4"
        >
          {todo.title} - {todo.completed ? "Done" : "Not done"}
        </li>
      ))}
    </ul>
  );
}

export default Todos;
