import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';
import { NextResponse } from 'next/server';

const openai = new OpenAI({ apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY || '' }); // Use environment variable for API key

export async function POST(req: Request, res: Response) {
    if (req.method === 'POST') {
        const { prompt, image } = await req.json();

        const response = await openai.chat.completions.create({
            model: "gpt-4o",
            response_format: { type: "json_object" },
            messages: [
                {
                    role: "system",
                    content: "You are a helpful assistant. Your response should be in JSON format"
                },
                {
                    role: "user",
                    content: [{
                        type: "text",
                        text: "I want you to look at this image and tell me the object/item that you see, how many of them you see, and a short description of the object itself, not the image as a whole. return clean JSON. it should have the attributes: 'name', 'quantity', 'description'",
                    },
                    {
                        type: "image_url",
                        image_url: {
                            url: `data:image/jpeg;base64,${image}`,
                            // url: "https://assets.clevelandclinic.org/transform/LargeFeatureImage/cd71f4bd-81d4-45d8-a450-74df78e4477a/Apples-184940975-770x533-1_jpg",
                            // detail: 'low',
                        }
                    }
                    ]
                }
            ]
        })
        try {
            const content = response.choices[0].message.content
            const responseMessage = `Received prompt: ${content}`
            return NextResponse.json({ message: responseMessage })

        } catch (error) {
            console.error('Error', error);
            return NextResponse.json({ error: 'internal server error' }, { status: 500 })
        }

    }
}