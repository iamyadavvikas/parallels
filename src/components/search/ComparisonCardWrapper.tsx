"use client";

import ComparisonCard from "@/components/ui/ComparisonCard";

interface ComparisonCardWrapperProps {
  query: string;
  results: {
    religion: string;
    text: string;
    reference: string;
    bookTitle: string;
  }[];
}

export default function ComparisonCardWrapper({ query, results }: ComparisonCardWrapperProps) {
  return <ComparisonCard query={query} results={results} />;
}
