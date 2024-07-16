"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { Switch } from "@/components/ui/switch";
import { sendSubmit } from "@/actions/mail-fellow";
import { formSchema } from "@/actions/mail-fellow/type";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const MailFellowForm = () => {
  const sendAction = sendSubmit.bind(null);
  const [isAuto, setIsAuto] = useState(true);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      contacts: "",
      notion_page: "",
      auto_option: false,
      month: "",
      week: "",
    },
  });

  // TODO: toast message on submit
  function onSubmit(data: z.infer<typeof formSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form
        action={sendAction}
        // onClick={form.handleSubmit(onSubmit)}
        className="space-y-8"
      >
        <FormField
          control={form.control}
          name="auto_option"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Switch
                  checked={isAuto}
                  onCheckedChange={() => {
                    setIsAuto(!isAuto);
                    field.onChange(isAuto);
                  }}
                />
              </FormControl>
              {/* refer to https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input/checkbox
                如果action中使用 Checkbox and Switch, 需要在下面加一个input hidden 才能提交给服务器，并且的string的格式
              */}
              <input
                type="hidden"
                name="auto_option"
                value={String(isAuto)}
              ></input>
              <FormLabel> 是AI邮件内容 </FormLabel>
              <FormDescription>Y: 自动生成 N:</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {isAuto && (
          <FormField
            control={form.control}
            name="month"
            render={({ field }) => (
              <FormItem>
                <FormLabel>月份</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a month" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="六月">六月</SelectItem>
                    <SelectItem value="七月">七月</SelectItem>
                    <SelectItem value="八月">八月</SelectItem>
                  </SelectContent>
                </Select>
                <Input type="hidden" name="month" value={field.value}></Input>
              </FormItem>
            )}
          />
        )}
        {isAuto && (
          <FormField
            control={form.control}
            name="week"
            render={({ field }) => (
              <FormItem>
                <FormLabel>第几封信 (必选！！)</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="选择" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="0">第一封信</SelectItem>
                    <SelectItem value="1">第二封信</SelectItem>
                    <SelectItem value="2">第三封信</SelectItem>
                    <SelectItem value="3">第四封信</SelectItem>
                    <SelectItem value="4">第五封信</SelectItem>
                  </SelectContent>
                </Select>
                <Input type="hidden" name="week" value={field.value}></Input>
              </FormItem>
            )}
          />
        )}
        <FormField
          control={form.control}
          name="contacts"
          render={({ field }) => (
            <FormItem>
              <FormLabel>收件人 {isAuto && "（可选）"}</FormLabel>
              <FormControl>
                <Textarea
                  spellCheck={false}
                  placeholder="#昵称 空格 #邮箱 换行"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                收件人列表，格式为: #昵称 空格 #邮箱 换行 ， 如：
                <br />
                elon gong435491723@gmail.com
                <br />
                bob bob@q24.io
                <br />
                fori forrest@q24.io
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {!isAuto && (
          <FormField
            control={form.control}
            name="notion_page"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  邮件Notion的page_id {isAuto && "（可选）"}
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="b11a341846ae420c8dda4348144e63ea"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  取邮件内容为Notion网址，page_id是Notion网址的一长串识别码uuid，如：
                  <br />
                  https://www.notion.so/elongongspace/9-b11a341846ae420c8dda4348144e63ea
                  <br />
                  page_id则为b11a341846ae420c8dda4348144e63ea
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <Button variant="default" type="submit">
          生成邮件{!isAuto && "并预览"}
        </Button>
      </form>
    </Form>
  );
};

export default MailFellowForm;
