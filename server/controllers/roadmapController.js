const axios = require("axios");

/**
 * Controller to generate custom tech roadmaps using Google Gemini 3.8 Flash
 */
exports.generateAiRoadmap = async (req, res) => {
  try {
    const {
      topic = "Full Stack Web Development",
      currentLevel = "Beginner",
      goal = "Build real projects and prepare for interviews",
      timePerDay = "1 hour",
      durationDays = 30,
    } = req.body;

    const daysCount = Math.min(Math.max(parseInt(durationDays, 10) || 30, 3), 60);

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        success: false,
        message: "Gemini API key is not configured on the server.",
      });
    }

    const prompt = `You are a world-class technical mentor and curriculum architect. Create a focused, realistic, step-by-step day-by-day learning roadmap for:
Topic: "${topic}"
Current Skill Level: "${currentLevel}"
Goal: "${goal}"
Daily Time Commitment: "${timePerDay}"
Total Duration: ${daysCount} days

IMPORTANT RULES:
1. Exactly ${daysCount} days must be provided in sequential order from day 1 to day ${daysCount}.
2. Every day must contain an actionable practical task and core concepts.
3. Order the topics progressively so nothing depends on prerequisites that haven't been taught yet.
4. Output MUST be ONLY valid JSON with no markdown formatting, no backticks, no extra text.

JSON Schema:
{
  "title": "Comprehensive ${topic} Roadmap",
  "topic": "${topic}",
  "level": "${currentLevel}",
  "totalDays": ${daysCount},
  "dailyCommitment": "${timePerDay}",
  "summary": "Short 2-sentence roadmap description",
  "days": [
    {
      "day": 1,
      "title": "Concise Day Title",
      "concepts": ["Concept 1", "Concept 2", "Concept 3"],
      "task": "Specific actionable exercise or code project to build today",
      "resourceQuery": "Search query for best video walkthrough"
    }
  ]
}`;

    // Call Google Gemini API (gemini-flash-latest)
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${apiKey}`;

    const geminiResponse = await axios.post(
      geminiUrl,
      {
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
        generationConfig: {
          temperature: 0.3,
          maxOutputTokens: 8192,
          responseMimeType: "application/json",
        },
      },
      { timeout: 30000 }
    );

    const candidateText =
      geminiResponse.data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!candidateText) {
      throw new Error("No response received from Gemini API");
    }

    // Clean JSON response (handling any possible markdown wrappers)
    const cleanedText = candidateText
      .replace(/^```json/im, "")
      .replace(/^```/im, "")
      .replace(/```$/im, "")
      .trim();

    let parsedRoadmap;
    try {
      parsedRoadmap = JSON.parse(cleanedText);
    } catch (parseError) {
      console.error("JSON parsing error from Gemini output:", parseError.message);
      // Fallback parser if JSON was slightly truncated
      const firstBracket = cleanedText.indexOf("{");
      const lastBracket = cleanedText.lastIndexOf("}");
      if (firstBracket !== -1 && lastBracket !== -1) {
        parsedRoadmap = JSON.parse(cleanedText.substring(firstBracket, lastBracket + 1));
      } else {
        throw parseError;
      }
    }

    return res.status(200).json({
      success: true,
      data: parsedRoadmap,
    });
  } catch (error) {
    console.error("Gemini Roadmap Generation Error:", error?.response?.data || error.message);

    // Provide intelligent fallback roadmap so user never experiences failure
    const fallbackDays = generateFallbackRoadmap(req.body);
    return res.status(200).json({
      success: true,
      fallback: true,
      data: fallbackDays,
    });
  }
};

/**
 * High-quality procedural fallback generator if AI hits rate limits
 */
function generateFallbackRoadmap({ topic = "Technology", currentLevel = "Beginner", timePerDay = "1 hour", durationDays = 14 }) {
  const days = Math.min(Math.max(parseInt(durationDays, 10) || 14, 3), 30);
  const syllabus = [];

  const phases = [
    { name: "Foundations & Environment Setup", weight: 0.25 },
    { name: "Core Architecture & Fundamental Patterns", weight: 0.35 },
    { name: "Real-world Practical Building & Integration", weight: 0.25 },
    { name: "Optimization, Best Practices & Production Deployment", weight: 0.15 },
  ];

  for (let i = 1; i <= days; i++) {
    const phaseIdx = Math.min(Math.floor((i / days) * phases.length), phases.length - 1);
    syllabus.push({
      day: i,
      title: `${phases[phaseIdx].name} - Part ${i}`,
      concepts: [
        `Mastering ${topic} fundamental concepts for Day ${i}`,
        "Debugging common pitfalls & syntax conventions",
        "Writing clean, modular code",
      ],
      task: `Implement a working hands-on module for ${topic} demonstrating today's core patterns.`,
      resourceQuery: `${topic} ${phases[phaseIdx].name} tutorial for ${currentLevel}`,
    });
  }

  return {
    title: `${topic} Accelerated Roadmap`,
    topic,
    level: currentLevel,
    totalDays: days,
    dailyCommitment: timePerDay,
    summary: `Structured ${days}-day milestone curriculum tailored for ${currentLevel} learners aiming to master ${topic}.`,
    days: syllabus,
  };
}
