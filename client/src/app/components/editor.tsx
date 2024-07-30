"use client";
import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";

interface BlockNoteContent {
  type: string;
  props: {
    level?: number;
    textColor?: string;
    backgroundColor?: string;
    textAlignment?: string;
  };
  content: any;
}

function convertMongoDBToBlockNote(mongoContent: any): BlockNoteContent[] {
  return mongoContent.map((block: any) => {
    switch (block.type) {
      case "heading":
        return {
          type: "heading",
          props: {
            level: block.props.level,
            textColor: block.props.textColor,
            backgroundColor: block.props.backgroundColor,
            textAlignment: block.props.textAlignment,
          },
          content: block.content,
        };
      case "paragraph":
        return {
          type: "paragraph",
          props: {
            textColor: block.props.textColor,
            backgroundColor: block.props.backgroundColor,
            textAlignment: block.props.textAlignment,
          },
          content: block.content.map((textBlock: any) => ({
            type: "text",
            text: textBlock.text,
            styles: textBlock.styles || {},
          })),
        };
      case "bulletListItem":
        return {
          type: "bulletListItem",
          props: {
            textColor: block.props.textColor,
            backgroundColor: block.props.backgroundColor,
            textAlignment: block.props.textAlignment,
          },
          content: block.content.map((textBlock: any) => ({
            type: "text",
            text: textBlock.text,
            styles: textBlock.styles || {},
          })),
        };
      case "table":
        return {
          type: "table",
          props: {
            textColor: block.props.textColor,
            backgroundColor: block.props.backgroundColor,
            textAlignment: block.props.textAlignment,
          },
          content: {
            type: "tableContent",
            rows: block.content.rows.map((row: any) => ({
              cells: row.cells,
            })),
          },
        };
      default:
        throw new Error(`Unsupported block type: ${block.type}`);
    }
  });
}
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
export default function Editor({ content }) {
  const transformedContent = convertMongoDBToBlockNote(content);
  console.log(transformedContent);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  const editor = useCreateBlockNote({ initialContent: transformedContent });
  return <BlockNoteView editor={editor} theme="light" />;
}
