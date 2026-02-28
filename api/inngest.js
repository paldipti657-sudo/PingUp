import { serve } from "inngest/express";
import { inngest } from "../server/inngest/index.js";
import { functions } from "../server/inngest/functions.js";

export default serve({
  client: inngest,
  functions,
});