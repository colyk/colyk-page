import { NextResponse } from 'next/server';
const { Storage } = require('@google-cloud/storage');



export async function GET() {
  const storage = new Storage({
    projectId: process.env.GCP_PROJECT,
    keyFilename: process.env.GCP_CREDENTIALS_PATH
  });

  try {
    const [files] = await storage.bucket(process.env.GCP_STORAGE_NAME).getFiles();
    return NextResponse.json({ data: files.map(f => f.name) })
  }
  catch {
    return NextResponse.json({ data })
  }
}