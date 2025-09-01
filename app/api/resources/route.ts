import { NextResponse } from "next/server";
import { form } from "@/lib/formidable";
import Resource from "@/models/resource";
import connectDB from "@/lib/mongodb";
import { Readable } from "stream";
import type { IncomingMessage } from "http";

// Convert Web ReadableStream → Node Readable
function toNodeReadable(req: Request): IncomingMessage {
  const nodeStream = new Readable({
    read() {}, // no-op
  });

  const reader = req.body!.getReader();

  async function pump() {
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        nodeStream.push(null);
        break;
      }
      nodeStream.push(Buffer.from(value));
    }
  }
  pump();

  // Attach headers & method so formidable can see them
  (nodeStream as any).headers = Object.fromEntries(req.headers.entries());
  (nodeStream as any).method = req.method;

  return nodeStream as unknown as IncomingMessage;
}

export async function POST(req: Request) {
  const nodeReq = toNodeReadable(req);

  return new Promise((resolve) => {
    form.parse(nodeReq, async (err, fields, files) => {
      if (err) {
        return resolve(
          NextResponse.json({ error: err.message }, { status: 500 })
        );
      }

      try {
        await connectDB();

        const coverPath = files.coverImage?.[0]?.newFilename
          ? `/uploads/${files.coverImage[0].newFilename}`
          : "";

        const filePath = files.resourceFile?.[0]?.newFilename
          ? `/uploads/${files.resourceFile[0].newFilename}`
          : "";

        // 🔥 Ensure tags is always an array
        let tags: string[] = [];
        if (fields.tags?.[0]) {
          if (Array.isArray(fields.tags)) {
            tags = fields.tags.map((t: any) => String(t).trim());
          } else {
            tags = String(fields.tags[0])
              .split(",")
              .map((t) => t.trim())
              .filter((t) => t.length > 0);
          }
        }

        const resource = await Resource.create({
          title: fields.title?.[0],
          description: fields.description?.[0],
          content: fields.content?.[0],
          category: fields.category?.[0],
          type: fields.type?.[0],
          tags, // ✅ always array
          author: fields.author?.[0],
          language: fields.language?.[0],
          difficulty: fields.difficulty?.[0],
          estimatedReadTime: fields.estimatedReadTime?.[0],
          downloadUrl: fields.downloadUrl?.[0],
          externalUrl: fields.externalUrl?.[0],
          coverUrl: coverPath,
          fileUrl: filePath,
          status: fields.status?.[0] || "Draft",
          featured: fields.featured?.[0] === "true",
          allowDownload: fields.allowDownload?.[0] === "true",
          requiresLogin: fields.requiresLogin?.[0] === "true",
          metaTitle: fields.metaTitle?.[0],
          metaDescription: fields.metaDescription?.[0],
          metaKeywords: fields.metaKeywords?.[0],
        });

        return resolve(NextResponse.json(resource));
      } catch (dbErr: any) {
        return resolve(
          NextResponse.json({ error: dbErr.message }, { status: 500 })
        );
      }
    });
  });
}

export async function GET() {
  try {
    await connectDB();
    const resources = await Resource.find().sort({ createdAt: -1 });
    return NextResponse.json(resources);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
