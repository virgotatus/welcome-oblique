import { Button } from "@/components/ui/button";

interface Props {
  month: string;
}

const OneDiSendBtn = ({ month }: Props) => {
  return (
    <Button variant="default" className="text-lg p-4">
      一键发送
    </Button>
  );
};
1;
export default OneDiSendBtn;
