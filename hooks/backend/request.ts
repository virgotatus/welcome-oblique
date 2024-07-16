export interface Item {
  type: "idea" | "tool" | "amateur";
  explaination: string;
  query: string;
}

export interface ToolEmbed extends Item {
  type: "tool";
  tool: string;
  category: string;
  tag: string;
  description: string;
  price: number | string;
}

export interface IdeaEmbed extends Item {
  type: "idea";
  idea: string;
  note: string;
  tag: string;
}

export interface AmateurEmbed extends Item {
  type: "amateur";
  amateur: string;
  notion_url: string;
  owner: string;
}


export default async function fetchBackend(type:"idea" | "tool", query:string, top_n:number=1)
: Promise<IdeaEmbed|ToolEmbed|Item> 
{
  const response = await fetch(`${process.env.BACKEND_URL!}/${type}?` + new URLSearchParams({"query": query, "top_n": top_n.toString()}), {
    method: "GET",
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  });
  const result = await response.json();
  if (type === "idea") {
    return result as IdeaEmbed;
  } else if (type === "tool") {
    return result as ToolEmbed;
  } else {
    throw new Error("Backend fetch Invalid type not idea, tool or amateur");
  }
}


export async function fetchAmateur(username:string, query:string, city:string, top_n:number=1)
: Promise<AmateurEmbed> 
{
  const response = await fetch(`${process.env.BACKEND_URL!}/amateur`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify({username: username, query: query, city: city, top_n: top_n}),
  });
  const result = await response.json();
  return result as AmateurEmbed;
}
