import WatchlistTable from "@/components/WatchlistTable";
import { getCompanyProfile, getQuote } from "@/lib/actions/finnhub.actions";
import { getWatchlistSymbolsByEmail } from "@/lib/actions/watchlist.actions";
import React from "react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const Watchlist = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) redirect("/sign-in");
  const user = {
    id: session.user.id,
    name: session.user.name,
    email: session.user.email,
  };
  const watchlistSymbols = await getWatchlistSymbolsByEmail(user.email);

  console.log({ watchlistSymbols });

  const watchlistItems = await Promise.all(
    watchlistSymbols.map(async (symbol) => {
      const profile = await getCompanyProfile(symbol);
      const quote = await getQuote(symbol);
      return {
        symbol,
        company: profile?.name || symbol,
        price: quote?.c || 0,
        change: quote?.d || 0,
        changePercent: quote?.dp || 0,
      };
    })
  );

  return (
    <div>
      <WatchlistTable items={watchlistItems} userId={user.id} />
    </div>
  );
};

export default Watchlist;
