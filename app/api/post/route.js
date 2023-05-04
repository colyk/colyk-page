import { NextResponse } from 'next/server';
const { Storage } = require('@google-cloud/storage');



export async function POST() {
  const storage = new Storage({
    projectId: process.env.GCP_PROJECT,
    keyFilename: process.env.GCP_CREDENTIALS_PATH
  });

  console.log(process.env)

  console.log(process.env.GCP_PROJECT)
  console.log(process.env.GCP_CREDENTIALS_PATH)
  console.log(process.env.GCP_STORAGE_NAME)

  try {
    // Makes an authenticated API request.
    const results = await storage.getBuckets();
  
    const [buckets] = results;
  
    console.log('Buckets:');
    buckets.forEach(bucket => {
     console.log(bucket.name);
    });
   } catch (err) {
    console.error('ERROR:', err);
   }

  try {
    const [files] = await storage.bucket(process.env.GCP_STORAGE_NAME).getFiles();
    return NextResponse.json({ data: files.map(f => f.name) })

  }
  catch (error) {
    console.error(error);
    // Expected output: ReferenceError: nonExistentFunction is not defined
    // (Note: the exact output may be browser-dependent)
    return NextResponse.json({ data: error })
  }
}