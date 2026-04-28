"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState, useTransition } from "react";
import { useDebounce } from "../hooks/useDebounce";

interface IProps {
  includeCompleted?: boolean;
  term?: string;
}

export default function SearchBar(initial: IProps) {
  const [term, setTerm] = useState(initial.term || "");
  const [includeCompleted, setIncludeCompleted] = useState(
    initial.includeCompleted || false,
  );
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const debouncedTerm = useDebounce(term, 1000);

  const isMounted = React.useRef(false);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }

    startTransition(() => {
      router.replace(
        `/?term=${encodeURIComponent(debouncedTerm)}&includeCompleted=${includeCompleted ? "true" : "false"}`,
      );
    });
  }, [debouncedTerm, includeCompleted]);

  return (
    <form className="flex items-center justify-between gap-4 mt-6">
      <label className="flex items-center gap-2">
        <input
          type="text"
          name="term"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder="Search todos..."
          className="border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {isPending && <span className="text-gray-500 text-sm">☕️</span>}
      </label>
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          name="includeCompleted"
          checked={includeCompleted}
          onChange={(e) => setIncludeCompleted(e.target.checked)}
          className="form-checkbox h-5 w-5 text-blue-600"
        />
        Completed
      </label>
    </form>
  );
}
