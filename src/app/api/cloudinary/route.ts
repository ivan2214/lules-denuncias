import {NextResponse} from "next/server";

interface ImageData {
  data: string; // Cambiado a tipo string
}

export async function POST(request: Request) {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const uploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET!; // Tu upload preset
  const body = await request.json();
  const {image}: {image: ImageData} = body;

  if (!image) {
    return NextResponse.json({error: "No image provided"});
  }

  // Convertir la cadena Base64 a Blob
  const base64Data = image.data.replace(/^data:image\/(png|jpeg|jpg);base64,/, "");
  const blob = await fetch(`data:image/png;base64,${base64Data}`).then((res) => res.blob());

  const formData = new FormData();

  formData.append("file", blob, "image.png"); // Aquí puedes proporcionar un nombre de archivo opcional
  formData.append("upload_preset", uploadPreset); // Aquí se agrega el upload preset

  const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

  try {
    const cloudinaryResponse = await fetch(url, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Basic ${Buffer.from(`${apiKey}:`).toString("base64")}`, // No se necesita el api secret
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
