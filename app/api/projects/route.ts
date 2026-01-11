import { NextResponse } from "next/server";
import Project from "@/models/Project";
import { connectDB } from "@/lib/db";

export async function GET() {
  try {
    await connectDB();

    const projects = await Project.find().sort({ createdAt: -1 });

    return NextResponse.json(projects, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();
    body.image = `https://drive.google.com/thumbnail?id=${body.image}&sz=w1200`

    const {
      title,
      category,
      description,
      image,
      url,
      featured,
    } = body;

    // ✅ Basic validation
    if (!title || !category || !description || !image || !url) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }


    const newProject = await Project.create({
      title,
      category,
      description,
      image,
      url,
      featured: featured ?? false,
    });

    return NextResponse.json(newProject, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to create project" },
      { status: 500 }
    );
  }
}