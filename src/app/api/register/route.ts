import { NextRequest } from "next/server";

export const runtime = 'edge'

export async function POST(request: NextRequest) {
    const { publicKey, guid } = await request.json() as { publicKey: string, guid: string }

    console.log(publicKey, guid)

    const req = await fetch(`https://api.zeroness.dev/projects/0e281bdd91c90aa64621f7395aa5be88/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.ZERO_NESS_API_KEY}`
        },
        body: JSON.stringify({ publicKey, guid }),
    });

    const res = await req.json();

    return Response.json(res)
}