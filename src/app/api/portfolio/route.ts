import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const dataFilePath = path.join(process.cwd(), "src", "data", "portfolio.json");

export async function GET() {
  try {
    const fileContents = fs.readFileSync(dataFilePath, "utf8");
    return NextResponse.json(JSON.parse(fileContents));
  } catch (error) {
    return NextResponse.json({ error: "Failed to read portfolio data" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();

    if (process.env.NODE_ENV === "production") {
      return NextResponse.json(
        { 
          success: true, 
          message: "Saved locally to browser storage (server filesystem is read-only in production)." 
        }, 
        { status: 200 }
      );
    }

    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), "utf8");

    return NextResponse.json({ success: true, message: "Portfolio saved successfully to local file!" });
  } catch (error) {
    console.error("Failed to write portfolio data:", error);
    return NextResponse.json({ error: "Failed to save portfolio data" }, { status: 500 });
  }
}
