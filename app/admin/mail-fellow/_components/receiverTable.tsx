import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Receiver } from "@/actions/mail-fellow";

function ReceiverTable({ receivers }: { receivers: Receiver[] }) {
  return (
    <Table>
      <TableCaption>收件人列表</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">昵称</TableHead>
          <TableHead className="text-center">邮箱</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {receivers.map((receiver) => (
          <TableRow key={receiver.name}>
            <TableCell className="font-medium">{receiver.name}</TableCell>
            <TableCell className="text-center">{receiver.address}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={1}>Total</TableCell>
          <TableCell className="text-center">
            {receivers.length}
            {"位"}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}

export default ReceiverTable;
