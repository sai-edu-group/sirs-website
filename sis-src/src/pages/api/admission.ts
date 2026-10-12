// MODULES //
import axios from "axios";

// OTHERS //
import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();

    const url = `https://api-in21.leadsquared.com/v2/LeadManagement.svc/Lead.Capture?accessKey=u$r85c3874595f2808421d11c1750fa3c15&secretKey=6052c09d27196406ff50e495a7cb6eb55b02d43c`;

    const response = await axios.post(url, body, {
      headers: { "Content-Type": "application/json" },
    });

    return new Response(JSON.stringify(response.data), { status: 200 });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
};
