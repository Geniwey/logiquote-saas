import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

export async function generateQuote(
  tarifario: string,
  origen: string,
  destino: string,
  volumen: string,
  incoterm: string,
): Promise<string> {
  if (!genAI) {
    throw new Error('La API de IA no está configurada. Contacta con el administrador para configurar la clave de API.');
  }

  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });

  const prompt = `Actúa como un agente de aduanas y experto en comercio internacional. Aquí tienes las tarifas base de la empresa transitaria: ${tarifario}. El cliente ha pedido: Origen ${origen}, Destino ${destino}, Volumen ${volumen}, Incoterm ${incoterm}. Calcula un presupuesto detallado basándote SÓLO en las tarifas de la empresa. Devuelve el resultado en un formato limpio, estructurado y profesional, sin usar Markdown complejo, listo para mostrar al cliente.`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();

  if (!text) {
    throw new Error('Gemini no devolvió contenido válido');
  }

  return text;
}
