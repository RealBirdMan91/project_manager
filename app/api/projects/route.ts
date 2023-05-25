import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { Project } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

type RequestProject = Project & { due: string };

interface IRequest extends Request {
  json: () => Promise<RequestProject>;
}

export async function POST(request: IRequest) {
  const projectInput = await request.json();
  const data = await getServerSession(authOptions);
  console.log(data);
  if (!data) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }
  const newProject = await db.project.create({
    data: {
      name: projectInput.name,
      due: new Date(projectInput.due),
      description: projectInput.description,
      ownerId: data.user.id,
      deleted: false,
    },
  });

  return NextResponse.json(newProject);
}

export async function GET() {
  const data = await getServerSession(authOptions);
  console.log(data);
  if (!data) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }
  const projects = await db.project.findMany({
    where: {
      ownerId: data.user.id,
      deleted: false,
    },
  });

  return NextResponse.json(projects);
}
