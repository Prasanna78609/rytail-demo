"use client";

import { CASE_STUDIES } from "@/data/caseStudies";
import { CaseStudyCard } from "./CaseStudyCard";

export default function CaseStudiesSection() {
  return (
    <section
      aria-labelledby="case-studies-heading"
      className="w-full bg-white py-20 sm:py-24"
    >
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 id="case-studies-heading" className="type-section text-[#090d0b]">
            How Leading Teams Operate Smarter With Our Platform.
          </h2>
          <p className="type-label mt-3 text-zinc-500">
            Illustrative data &amp; placeholder customer stories
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {CASE_STUDIES.map((study, index) => (
            <CaseStudyCard key={study.id} study={study} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
