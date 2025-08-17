// src/app/api/pdf/route.ts
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import pdfParse from "pdf-parse";

export async function GET() {
  const filePath = path.resolve(process.cwd(), "/wala.pdf");
  const fileBuffer = fs.readFileSync(filePath);

  try {
    const data = await pdfParse(fileBuffer);
    return NextResponse.json({ text: data.text });
  } catch (error) {
    console.error("Error parsing PDF:", error);
    return NextResponse.json({ error: "Error parsing PDF" }, { status: 500 });
  }
}
