import { NextRequest, NextResponse } from "next/server";
import { like } from "drizzle-orm";

import db from "../../../db";
import { advocates } from "../../../db/schema";

/**
 * Fetches a list of Advocate
 * @returns {Promise<NextResponse<{ data: Advocate[] }>>}
 */
export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const searchTerm = req.nextUrl.searchParams.get("searchTerm");

    console.log("SEARCH_TERM", searchTerm);
    const data = await db
      .select()
      .from(advocates)
      .where(like(advocates.firstName, `%${searchTerm}`));

    console.log("DATA", data);

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    console.error("Error fetching /app/api/advocates", error);
    /**
     * Pretend I send something to an error logging service here
     * ex:
     *
     * Sentry.captureException(error)
     */
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
