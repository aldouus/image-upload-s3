'use server';
import { revalidatePath } from "next/cache";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from 'uuid';
import sharp from "sharp";

const REGION = process.env.AWS_S3_REGION!;
const BUCKET = process.env.AWS_S3_BUCKET!;
const ACCESS_KEY_ID = process.env.AWS_S3_ACCESS_KEY_ID!;
const SECRET_ACCESS_KEY = process.env.AWS_S3_SECRET_ACCESS_KEY!;

const s3Client = new S3Client({
  region: REGION,
  credentials: {
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY,
  },
});

async function uploadFileToS3(file: Buffer, fileName: string) {
  try {
    const fileBuffer = await sharp(file)
      .resize({
        width: 1000,
        fit: sharp.fit.cover,
        position: sharp.strategy.entropy,
      })
      .webp({ force: true, quality: 80 })
      .toBuffer();

    const params = {
      Bucket: BUCKET,
      Key: `images/meme_${uuidv4()}.webp`,
      Body: fileBuffer,
      ContentType: "image/webp",
    };

    const command = new PutObjectCommand(params);
    const res = await s3Client.send(command);
    return fileName;
  } catch (error) {
    throw error;
  }
}

export async function uploadFile(prevState: any, formData: any) {
  try {
    const file = formData.get("file");
    if (!file || file.size === 0) {
      return { status: 400, message: "No file selected" };
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    await uploadFileToS3(buffer, file.name);

    revalidatePath("/");

    return { status: 200, message: "File uploaded successfully" };
  } catch (error) {
    return { status: 500, message: "Error uploading file" };
  }
}
