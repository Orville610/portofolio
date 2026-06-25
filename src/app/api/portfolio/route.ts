import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const dataFilePath = path.join(process.cwd(), "src", "data", "portfolio.json");

const getLocalData = () => {
  const fileContents = fs.readFileSync(dataFilePath, "utf8");
  return JSON.parse(fileContents);
};

export async function GET() {
  const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
  const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (redisUrl && redisToken) {
    try {
      const res = await fetch(redisUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${redisToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(["GET", "portfolio_data"]),
      });

      if (res.ok) {
        const { result } = await res.json();
        if (result) {
          return NextResponse.json(JSON.parse(result));
        } else {
          const localData = getLocalData();
          await fetch(redisUrl, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${redisToken}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(["SET", "portfolio_data", JSON.stringify(localData)]),
          });
          return NextResponse.json(localData);
        }
      }
    } catch (error) {
      console.error("Upstash Redis GET error:", error);
    }
  }

  try {
    return NextResponse.json(getLocalData());
  } catch (error) {
    return NextResponse.json({ error: "Failed to read portfolio data" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
    const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

    if (redisUrl && redisToken) {
      const res = await fetch(redisUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${redisToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(["SET", "portfolio_data", JSON.stringify(data)]),
      });

      if (res.ok) {
        return NextResponse.json({ success: true, message: "Portfolio saved successfully to Upstash Redis!" });
      } else {
        throw new Error("Failed to write to Upstash Redis");
      }
    }

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
    console.error("Failed to save portfolio data:", error);
    return NextResponse.json({ error: "Failed to save portfolio data" }, { status: 500 });
  }
}
