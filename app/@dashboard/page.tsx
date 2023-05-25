import ProjectList from "@/components/projects/ProjectList";
import Navbar from "@/components/shared/Navbar";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { Project } from "@prisma/client";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import React from "react";

async function getData() {
  const data = await getServerSession(authOptions);
  if (!data) {
    return revalidatePath("/");
  }
  const projects = await db.project.findMany({
    where: {
      ownerId: data.user.id,
      deleted: false,
    },
  });

  return projects;
}

async function Home() {
  const initialData = (await getData()) as Project[];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* We've used 3xl here, but feel free to try other max-widths based on your needs */}
      <div className="mx-auto max-w-3xl">
        <h1>Dashboard</h1>
        <ProjectList projects={initialData} />
      </div>
    </div>
  );
}

export default Home;
