import { NextRequest, NextResponse } from "next/server";

import db from "../../../db";
import { advocates } from "../../../db/schema";

/**
 * Fetches a list of Advocate
 * @returns {Promise<NextResponse<{ data: Advocate[] }>>}
 */
export async function GET() {
  try {
    const data = await db.select().from(advocates);
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
