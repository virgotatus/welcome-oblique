import { RichText } from "./type"

export function merge_plain_text(rtx: RichText[]) {
  return rtx.reduce(function(a, b) {return a.concat(b.plain_text)}, "");
}