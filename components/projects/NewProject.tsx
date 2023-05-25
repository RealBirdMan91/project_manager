"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import Modal from "react-modal";
import Input from "../shared/Input";
import { useProjectMutation } from "@/hooks/useProjects";

Modal.setAppElement("#modal");

function NewProject() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const { form, setFormData, isLoading, mutate, data } = useProjectMutation();
  function submitFormHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    mutate(form);
    setIsOpen(false);
  }

  return (
    <>
      <button
        disabled={isLoading}
        onClick={() => setIsOpen(true)}
        className="ml-6 inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        New Project
      </button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setIsOpen(false)}
        overlayClassName="bg-[rgba(0,0,0,.4)] flex justify-center items-center absolute top-0 left-0 h-screen w-screen"
        className="w-3/4 bg-white rounded-xl p-8"
      >
        <h1 className="text-3xl mb-6">New Project</h1>
        <form onSubmit={(e) => submitFormHandler(e)}>
          <Input
            label="Project Name"
            id="name"
            placeholder="unicorn..."
            value={form.name}
            onChange={(e) => setFormData({ ...form, name: e.target.value })}
          />
          <Input
            type="date"
            label="Due date"
            id="date"
            value={form.due}
            onChange={(e) => setFormData({ ...form, due: e.target.value })}
          />
          <label
            htmlFor="desc"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Description
          </label>
          <div className="mt-2">
            <textarea
              id="desc"
              name="description"
              rows={3}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              defaultValue={form.description}
              onChange={(e) =>
                setFormData({ ...form, description: e.target.value })
              }
            />
          </div>
          <button
            type="submit"
            className="mt-6 inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Submit
          </button>
        </form>
      </Modal>
    </>
  );
}

export default NewProject;
