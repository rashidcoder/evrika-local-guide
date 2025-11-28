import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { text, sourceLang, targetLangs } = await req.json();
    
    if (!text || !sourceLang || !targetLangs || !Array.isArray(targetLangs)) {
      throw new Error("Missing required fields: text, sourceLang, targetLangs");
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const langNames: Record<string, string> = {
      uz: "Uzbek",
      qq: "Karakalpak",
      ru: "Russian",
      en: "English"
    };

    const translations: Record<string, string> = {};

    for (const targetLang of targetLangs) {
      if (targetLang === sourceLang) {
        translations[targetLang] = text;
        continue;
      }

      const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash",
          messages: [
            {
              role: "system",
              content: `You are a professional translator. Translate the given text from ${langNames[sourceLang]} to ${langNames[targetLang]}. Return ONLY the translated text, nothing else. Preserve the original formatting and tone.`
            },
            {
              role: "user",
              content: text
            }
          ],
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Translation error for ${targetLang}:`, errorText);
        translations[targetLang] = text; // Fallback to original
        continue;
      }

      const data = await response.json();
      translations[targetLang] = data.choices?.[0]?.message?.content?.trim() || text;
    }

    return new Response(JSON.stringify({ translations }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Translation error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Translation failed" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
