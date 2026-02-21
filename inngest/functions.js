import { inngest } from "./index.js";

export const syncUserCreation = inngest.createFunction(
  { id: "sync-user-from-clerk" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    console.log("User created:", event.data);
    return { success: true };
  }
);

export const functions = [syncUserCreation];