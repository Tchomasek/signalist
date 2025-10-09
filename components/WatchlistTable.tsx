import WatchlistButton from "./WatchlistButton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

const WATCHLIST_TABLE_HEADER = [
  "Symbol",
  "Company",
  "Price",
  "Change",
  "% Change",
  "Actions",
];

interface WatchlistItem {
  symbol: string;
  company: string;
  price: number;
  change: number;
  changePercent: number;
}

interface WatchlistTableProps {
  items: WatchlistItem[];
  userId: string;
}

const WatchlistTable = ({ items, userId }: WatchlistTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {WATCHLIST_TABLE_HEADER.map((header, index) => (
            <TableHead key={index} className="text-left">
              {header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((row) => (
          <TableRow key={row.symbol}>
            <TableCell className="text-left">{row.symbol}</TableCell>
            <TableCell className="text-left">{row.company}</TableCell>
            <TableCell className="text-left">{row.price}</TableCell>
            <TableCell className="text-left">{row.change}</TableCell>
            <TableCell className="text-left">{row.changePercent}</TableCell>
            <TableCell className="text-left">
              <WatchlistButton
                type="icon"
                userId={userId}
                symbol={row.symbol}
                company={row.company}
                isInWatchlist={true}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default WatchlistTable;
