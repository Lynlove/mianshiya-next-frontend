"use client";
import { Button } from "antd";
import { useState } from "react";
import MdEditor from "@/components/MdEditor";
import MdViewer from "@/components/MdViewer";

export default function Home() {
  const [text, setText] = useState<string>("");

  return (
    <div>
      <h1>Home</h1>
      <Button type="primary">Button</Button>

      <MdEditor value={text} onChange={setText} />
      <MdViewer value={text} />
    </div>
  );
}
