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
import { sendSubmit } from "@/actions/mail-fellow";

const formSchema = z.object({
  contacts: z
    .string()
    .min(3, { message: "contacts must be at least 3 characters." }),
  notion_page: z.string().min(10).max(50),
});

const sendAction = sendSubmit.bind(null);

const SendForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      contacts: "",
      notion_page: "",
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
          name="contacts"
          render={({ field }) => (
            <FormItem>
              <FormLabel>收件人</FormLabel>
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
        <FormField
          control={form.control}
          name="notion_page"
          render={({ field }) => (
            <FormItem>
              <FormLabel>邮件Notion的page_id</FormLabel>
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
        <Button variant="default" type="submit">
          提交预览
        </Button>
      </form>
    </Form>
  );
};

export default SendForm;
