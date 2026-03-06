const OPENAI_API_URL = "http://localhost:8080/api/ollama";

export const getOpenAIResponse = async (prompt) => {

  try {

    if (!prompt || prompt.trim() === "") {
      throw new Error("Prompt cannot be empty");
    }

    const response = await fetch(OPENAI_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        prompt: prompt
      })
    });

    if (!response.ok) {
      throw new Error(`Server Error: ${response.status}`);
    }

    const data = await response.text();

    return {
      success: true,
      data: data
    };

  } catch (error) {

    return {
      success: false,
      data: error.message
    };
  }
};