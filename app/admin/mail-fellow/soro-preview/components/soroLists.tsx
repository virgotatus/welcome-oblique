import { Button } from "@/components/ui/button";
import { getChildren } from "@/hooks/notion/read/child-pages";
import { query_user_by_month } from "@/hooks/notion/read/fellowUsers";
import SendEmailButton from "../../manual-preview/components/sendEmailButton";
import { parseContacts } from "@/utils/mail-fellow";

const WeekPages = async ({ id, contact }: { id: string; contact: string }) => {
  const week_pages = await getChildren(id);

  return (
    <ul>
      {week_pages.map((page, idx) => (
        <li key={page.id} className="flex flex-row items-center">
          <a
            href={`/admin/mail-fellow/manual-preview/${contact}/${page.id}`}
            target="_blank"
          >
            {page.child_page.title}
          </a>
          <div className="scale-50">
            <SendEmailButton
              contacts={parseContacts(decodeURIComponent(contact))}
              notion_page={page.id}
            />
          </div>
        </li>
      ))}
    </ul>
  );
};

const SoroLists = async ({ month }: { month: string }) => {
  const user_pages = await query_user_by_month(month);
  const users_contact_str = await Promise.all(
    user_pages.map(async (page) => {
      return `${page.name}%20${page.email}`;
    })
  );
  return (
    <>
      <ul>
        {user_pages.map((page, idx) => (
          <li key={page.page_id}>
            {page.name + "_" + month + "_" + page.project}
            <WeekPages id={page.page_id} contact={users_contact_str[idx]} />
          </li>
        ))}
      </ul>
      <div className="text-bold border-4 border-blue-800 text-lg text-black rounded-md text-center">
        {`共计：${users_contact_str.length}个`}
      </div>
    </>
  );
};

export default SoroLists;
