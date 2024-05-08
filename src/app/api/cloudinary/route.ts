import {NextResponse} from "next/server";

interface ImageData {
  data: Blob | File;
}

export async function POST(request: Request) {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  const body = await request.json();
  const {image}: {image: ImageData} = body; // Definir la interfaz de ImageData

  if (!image) {
    return NextResponse.json({error: "No image provided"});
  }

  const formData = new FormData();

  formData.append("file", image.data);

  const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

  try {
    const cloudinaryResponse = await fetch(url, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Basic ${Buffer.from(`${apiKey}:${apiSecret}`).toString("base64")}`,
      },
    });

    const data = await cloudinaryResponse.json();

    if (data.error) {
      return NextResponse.json({
        error: data.error.message || "Error uploading image",
      });
    }

    return NextResponse.json({url: data.secure_url});
  } catch (error) {
    return NextResponse.json({error: "Error uploading image"});
  }
}
