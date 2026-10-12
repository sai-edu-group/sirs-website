// MODULES //
import axios from "axios";

// OTHERS //
import type { APIRoute } from "astro";

const LEAD_CAPTURE_URL =
  "https://api-in21.leadsquared.com/v2/LeadManagement.svc/Lead.Capture";

/** Server-only credentials — set LEADSQUARED_ACCESS_KEY / LEADSQUARED_SECRET_KEY in .env and Vercel */
const readEnv = (key: string): string | undefined =>
  import.meta.env[key] ?? process.env[key];

const json = (body: unknown, status: number) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });

export const POST: APIRoute = async ({ request }) => {
  const accessKey = readEnv("LEADSQUARED_ACCESS_KEY");
  const secretKey = readEnv("LEADSQUARED_SECRET_KEY");

  if (!accessKey || !secretKey) {
    return json({ error: "LeadSquared credentials are not configured." }, 500);
  }

  try {
    const body = await request.json();

    const response = await axios.post(LEAD_CAPTURE_URL, body, {
      params: { accessKey, secretKey },
      headers: { "Content-Type": "application/json" },
    });

    return json(response.data, 200);
  } catch (err: any) {
    return json({ error: err.message }, 500);
  }
};
