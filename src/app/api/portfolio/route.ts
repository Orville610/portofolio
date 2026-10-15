import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getPortfolioData, PORTFOLIO_KEY } from "@/lib/server/portfolio";
import { isAdmin } from "@/lib/server/auth";
import { portfolioSchema } from "@/lib/server/schema";
import { redisCommand } from "@/lib/server/redis";
import { normalizePortfolio } from "@/lib/portfolio";
import { errorResponse, HttpError, noStore, readJson, requireSameOrigin } from "@/lib/server/http";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(await getPortfolioData(), { headers: noStore });
}
export async function POST(request: NextRequest) {
  try {
    requireSameOrigin(request);
    if (!await isAdmin(request)) throw new HttpError(401, "Your admin session has expired. Please sign in again.");
    const parsed = portfolioSchema.safeParse(await readJson(request));
    if (!parsed.success) {
      const issue = parsed.error.issues[0];
      throw new HttpError(400, `${issue.path.join(".")}: ${issue.message}`);
    }
    const data = normalizePortfolio(parsed.data);
    const result = await redisCommand<string>(["SET", PORTFOLIO_KEY, JSON.stringify(data)]);
    if (result !== "OK") throw new Error("Portfolio was not saved");
    revalidatePath("/");
    revalidatePath("/resume");
    revalidatePath("/projects/[slug]", "page");
    revalidatePath("/sitemap.xml");
    return NextResponse.json({ success: true, message: "Changes saved for all visitors.", data }, { headers: noStore });
  } catch (error) { return errorResponse(error); }
}
