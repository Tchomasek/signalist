"use server";

import { Watchlist } from "@/database/models/watchlist.model";
import { connectToDatabase } from "@/database/mongoose";

export async function getWatchlistSymbolsByEmail(
  email: string
): Promise<string[]> {
  if (!email) return [];

  try {
    const mongoose = await connectToDatabase();
    const db = mongoose.connection.db;
    if (!db) throw new Error("MongoDB connection not found");

    // Better Auth stores users in the "user" collection
    const user = await db
      .collection("user")
      .findOne<{ _id?: unknown; id?: string; email?: string }>({ email });

    if (!user) return [];

    const userId = (user.id as string) || String(user._id || "");
    if (!userId) return [];

    const items = await Watchlist.find({ userId }, { symbol: 1 }).lean();
    return items.map((i) => String(i.symbol));
  } catch (err) {
    console.error("getWatchlistSymbolsByEmail error:", err);
    return [];
  }
}

export async function toggleWatchlistItem({
  userId,
  symbol,
  company,
}: {
  userId: string;
  symbol: string;
  company: string;
}) {
  if (!userId || !symbol || !company) {
    throw new Error("Missing required fields");
  }

  try {
    await connectToDatabase();

    const existingItem = await Watchlist.findOne({ userId, symbol });

    if (existingItem) {
      await Watchlist.deleteOne({ _id: existingItem._id });
      return { added: false };
    } else {
      await Watchlist.create({ userId, symbol, company });
      return { added: true };
    }
  } catch (err) {
    console.error("toggleWatchlistItem error:", err);
    throw new Error("Failed to update watchlist");
  }
}
