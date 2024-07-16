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
import { Contact } from "@/actions/mail-fellow";

function ContactTable({ contacts }: { contacts: Contact[] }) {
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
        {contacts.map((contact) => (
          <TableRow key={contact.name}>
            <TableCell className="font-medium">{contact.name}</TableCell>
            <TableCell className="text-center">{contact.address}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={1}>Total</TableCell>
          <TableCell className="text-center">
            {contacts.length}
            {"位"}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}

export default ContactTable;
