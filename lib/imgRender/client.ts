async function fetchImage(url: string) {
  try {
     // TODO: no cache just when dev
    const response = await fetch(url, {cache: "no-cache"});
    const arrayBuffer = await response.arrayBuffer();
    const base64String = Buffer.from(arrayBuffer).toString('base64');
    return base64String;
  } catch (error) {
    console.error(error);
    return "";
  }
}

export default async function imgrender(data: any) {
  const response = await fetch("https://api.imgrender.net/open/v1/pics", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      "X-API-Key": process.env['IMG_GEN_API']!,
    },
    body: JSON.stringify(data),
    cache: "no-cache", // TODO: no cache just when dev
  })
  const result = await response.json();
  if (result.code == 0 ) {
    const img64 = await fetchImage(result.data.url);
    return {url: result.data.url, img64: img64};
  } else {
    console.error(result);
    return {url: "", img64: ""};
  }
}
