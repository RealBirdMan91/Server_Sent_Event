import { Todo } from "@prisma/client";
import { db } from "./db";
import redisClient from "./redis";

const DEFAULT_EXPIRATION = 3600;

export async function getTodos() {
  /*   const redisTodos = await redisClient.get("todos");

  if (redisTodos) {
    return JSON.parse(redisTodos);
  }
 */
  const todos = await db.todo.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  //redisClient.setEx("todos", DEFAULT_EXPIRATION, JSON.stringify(todos));
  return todos;
}
