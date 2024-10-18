import { NextRequest } from "next/server";

export const runtime = 'edge'

export async function POST(request: NextRequest) {
    const { challenge, signature, guid } = await request.json() as { challenge: string, signature: string, guid: string }

    const req = await fetch(`https://api.zeroness.dev/projects/0e281bdd91c90aa64621f7395aa5be88/verify`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.ZERO_NESS_API_KEY}`
        },
        body: JSON.stringify({ challenge, signature, guid }),
    });

    const res = await req.json();

    return Response.json(res)
}