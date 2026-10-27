// @route   POST /api/ai/improve
// @desc    Optional AI assistance to enhance summary or bullet points
exports.improveText = async (req, res) => {
  try {
    const { type, text, targetRole } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(200).json({
        success: false,
        isConfigured: false,
        message: 'AI Assistance API key is not configured. Add GEMINI_API_KEY to your server .env file to enable intelligent suggestions.'
      });
    }

    if (!text || text.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Please provide text to improve'
      });
    }

    // Call Gemini API securely via backend
    const prompt = type === 'summary'
      ? `You are an expert executive resume writer. Enhance the following professional summary for a ${targetRole || 'professional role'}. Make it impactful, concise, and ATS-friendly. Keep it strictly truthful to the user's input without inventing fake degrees or employers:\n\n"${text}"\n\nReturn ONLY the improved summary paragraph:`
      : `You are an expert resume editor. Rewrite the following experience bullet points for a ${targetRole || 'professional role'} to use active verbs, highlight measurable impact, and maximize ATS readability. Do not hallucinate fake statistics; sharpen the phrasing based on the input:\n\n"${text}"\n\nReturn ONLY the improved bullet points (using •):`;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });

    const data = await response.json();
    if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
      const improvedText = data.candidates[0].content.parts[0].text.trim();
      return res.json({
        success: true,
        isConfigured: true,
        improvedText
      });
    } else {
      return res.status(500).json({
        success: false,
        message: 'Unable to generate enhancement from AI service.'
      });
    }
  } catch (err) {
    console.error('AI improve error:', err);
    res.status(500).json({
      success: false,
      message: 'Server error processing AI request'
    });
  }
};
