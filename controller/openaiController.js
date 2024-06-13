const OpenAI = require("openai");
require("dotenv").config();

const openai = new OpenAI({
  apiKey: process.env["OPENAI_API_KEY"],
});

const getOpenAIResponse = async (text) => {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo",
      messages: [
        {
          role: "system",
          content:
            "Sök igenom texten, hitta skomärke och skomodell som texten handlar om, skriv endast ut ett skomärke och en skomodell. Exempelvis ser ditt svar ut såhär: Nike, Air Pegasus Premium. Om du inte kan se att texten handlar om ett specifikt skomärke eller skomodell så svarar du - Finns ej.",
        },
        { role: "user", content: text },
      ],
      max_tokens: 50,
      temperature: 0,
    });

    const response = completion.choices[0].message.content.trim();
    return { message: { content: response } };
  } catch (error) {
    console.error("Error fetching OpenAI response:", error);
    throw new Error("Error fetching OpenAI response");
  }
};

module.exports = { getOpenAIResponse };
