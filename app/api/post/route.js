import { NextResponse } from 'next/server';
const {Storage} = require('@google-cloud/storage');



export async function GET() {
  const data = {'test': process.env.WHAT}


  return NextResponse.json({ data })
}