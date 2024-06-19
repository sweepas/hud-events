"use client";

import { useEffect, useState } from "react";
import AllEvents from "@/components/shared/AllEvents";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { fetchAllEvents } from "../lib/actions/events.actions";
import CategoryFilter from "@/components/shared/CategoryFilter";
import { SearchParamProps } from "../types/types";

const HomePage = ({ searchParams }: SearchParamProps) => {
  const [events, setEvents] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const page = Number(searchParams?.page) || 1;
  const searchText = (searchParams?.query as string) || "";
  const category = (searchParams?.category as string) || "";

  useEffect(() => {
    const fetchEventsData = async () => {
      const response = await fetchAllEvents({
        query: searchText,
        category,
        page,
        limit: 6,
      });

      if (response) {
        setEvents(response.data || []);
        setTotalPages(response.totalPages);
      } else {
        console.error("Failed to fetch events");
      }
    };

    fetchEventsData();
  }, [searchText, category, page]);



  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-contain py-5 md:py-10">
        <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
          <div className="flex flex-col justify-center gap-8">
            <h1 className="h1-bold">Explore Community Events Near You!</h1>
            <p className="p-regular-20 md:p-regular-24">
              Have fun, help others, and embrace your HUD. Discover events and
              activities happening in your neighborhood.
            </p>
            <Button size="lg" asChild className="button w-full sm:w-fit">
              <Link href="#events">Explore Now</Link>
            </Button>
          </div>
          <Image
            src="/assets/images/festival.jpeg"
            alt="hero"
            width={1000}
            height={1000}
            className="max-h-[70vh] object-contain object-center 2xl:max-h-[50vh]"
            priority
          />
        </div>
      </section>
      <section
        id="events"
        className="wrapper my-8 flex flex-col gap-8 md:gap-12"
      >
        <div className="flex w-full flex-col gap-5 md:flex-row">
          <CategoryFilter />
        </div>
       

        <div className="flex w-full flex-col gap-5 md:flex-row"></div>

        <AllEvents
          events={events}
          emptyTitle="No Events Found"
          emptyStateSubtext="Come back later"
          collectionType="All_Events"
          limit={6}
          page={page}
          totalPages={totalPages}
        />
      </section>
    </>
  );
};
export default HomePage;
