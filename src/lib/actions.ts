"use server";

import { revalidatePath } from "next/cache";
import { db } from "./db";
import redisClient from "./redis";

export async function createTodo(todo: string) {
  const createdTodo = await db.todo.create({
    data: {
      title: todo,
    },
  });

  redisClient.publish("todos", JSON.stringify(createdTodo));
  revalidatePath("/");

  return createdTodo;
}
