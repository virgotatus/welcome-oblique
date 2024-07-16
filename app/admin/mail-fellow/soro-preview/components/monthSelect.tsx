"use client";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";

const MonthSelect = ({ month }: { month: string }) => {
  const router = useRouter();
  return (
    <>
      <Label>{month}</Label>
      <Select
        value={month}
        onValueChange={(val) => {
          router.push(`/admin/mail-fellow/soro-preview/${val}`);
        }}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Month" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="六月">六月</SelectItem>
          <SelectItem value="七月">七月</SelectItem>
          <SelectItem value="八月">八月</SelectItem>
        </SelectContent>
      </Select>
    </>
  );
};

export default MonthSelect;
