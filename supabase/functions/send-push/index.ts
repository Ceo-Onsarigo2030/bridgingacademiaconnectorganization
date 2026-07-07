// Supabase Edge Function: send-push
// Deploy with: supabase functions deploy send-push --no-verify-jwt
// Requires secrets:
//   supabase secrets set VAPID_PUBLIC_KEY=xxxx
//   supabase secrets set VAPID_PRIVATE_KEY=xxxx
//   supabase secrets set VAPID_SUBJECT=mailto:b.aconnect254@gmail.com
//   supabase secrets set SUPABASE_URL=xxxx (auto-provided)
//   supabase secrets set SUPABASE_SERVICE_ROLE_KEY=xxxx
//
// Generate a VAPID key pair once with: npx web-push generate-vapid-keys

import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.4";
import webpush from "https://esm.sh/web-push@3.6.7";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { title, body, url, type } = await req.json();

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, serviceKey);

    webpush.setVapidDetails(
      Deno.env.get("VAPID_SUBJECT") || "mailto:b.aconnect254@gmail.com",
      Deno.env.get("VAPID_PUBLIC_KEY")!,
      Deno.env.get("VAPID_PRIVATE_KEY")!
    );

    const { data: subs, error } = await supabase.from("push_subscriptions").select("*");
    if (error) throw error;

    const payload = JSON.stringify({ title, body, url: url || "/" });

    const results = await Promise.allSettled(
      (subs || []).map((s: any) => webpush.sendNotification(s.subscription, payload))
    );

    const failedEndpoints: string[] = [];
    results.forEach((r, i) => {
      if (r.status === "rejected") failedEndpoints.push(subs[i].endpoint);
    });
    if (failedEndpoints.length) {
      await supabase.from("push_subscriptions").delete().in("endpoint", failedEndpoints);
    }

    await supabase.from("notifications").insert({ title, body, type, sent_to: (subs || []).length });

    return new Response(
      JSON.stringify({ sent: (subs || []).length - failedEndpoints.length, failed: failedEndpoints.length }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
