import { OpenAI } from "openai";

//const openai = new OpenAI({apiKey: 'YOUR_API_KEY', // Replace with your actual API key});
const openai = new OpenAI();
  
  //const openai = new OpenAIApi(configuration);
  

export default async function handler(req, res) {

    const { message } = req.body;
    try {

        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini", // Choose your desired model
            messages: [
              {
                role: "system",
                content: "You are a helpful assistant."
              },
              {
                role: "user",
                content: message
              }
            ],
            store: true
        });
    
    
    
        res.status(200).json({ reply: response.choices[0].message });
        console.log(response.choices[0].message);
    
      } catch (error) {
    
        res.status(500).json({ error: error.message });
        console.log(error);
    
      }
    
}