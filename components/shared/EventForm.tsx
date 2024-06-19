"use client";

import React, { useState, useEffect } from "react";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import CardWrapper from "./CardWrapper";
import { Checkbox } from "../ui/checkbox";
import Dropdown from "./Dropdown";
import { useRouter } from "next/navigation";
import { IEvent } from "../../lib/db/models/events.models";
import { fetchEvent } from "../../lib/actions/events.actions";

const schema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().optional(),
  location: z.string().optional(),
  imageUrl: z.string().url({ message: "Invalid URL" }),
  startDateTime: z.date(),
  endDateTime: z.date(),
  price: z.string().optional(),
  capacity: z.string().optional(),
  isFree: z.boolean(),
  url: z.string().url({ message: "Invalid URL" }).optional(),
  category: z.string().min(1, { message: "Category is required" }),
});

type FormData = z.infer<typeof schema>;
type EventFormProps = {
  userId: string;
  type: "Create" | "Update";
  event?: IEvent;
  eventId?: string;
};
const EventForm: React.FC<EventFormProps> = ({
  userId,
  type,
  event,
  eventId,
}) => {
  const defaultValues = event
    ? {
        title: event.title,
        description: event.description,
        location: event.location,
        imageUrl: event.imageUrl,
        startDateTime: new Date(event.startDateTime),
        endDateTime: new Date(event.endDateTime),
        price: event.price,
        capacity: event.capacity,
        isFree: event.isFree,
        url: event.url,
        category: event.category.name,
      }
    : {
        title: "",
        description: "",
        location: "",
        imageUrl: "",
        startDateTime: new Date(),
        endDateTime: new Date(),
        price: "",
        capacity: "",
        isFree: false,
        url: "",
        category: "",
      };
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues,
  });
  const [apiError, setApiError] = useState<string | null>(null);
  const [categories, setCategories] = useState<{ _id: string; name: string }[]>(
    []
  );
  const [fetchedEvent, setFetchedEvent] = useState<IEvent | null>(null);

  useEffect(() => {
    const fetchEventIfNeeded = async () => {
      if (type === "Update" && eventId) {
        const fetchedEvent = await fetchEvent(eventId);
        setFetchedEvent(fetchedEvent);
      }
    };

    fetchEventIfNeeded();
  }, [type, eventId]);
  const router = useRouter();

  // useEffect(() => {
  //   fetch("/api/categories")
  //     .then((response) => response.json())
  //     .then((data) => setCategories(data))
  //     .catch((error) => console.error("Error fetching categories:", error));
  // }, []);

  const onSubmit = async (data: FormData) => {
    setApiError(null);
    try {
      let response;
      if (type === "Create") {
        response = await fetch("/api/add-event", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (response && response.ok) {
          console.log("Event created successfully!");
          form.reset();
          router.push(`/events/`);
        } else if (response) {
          const errorData = await response.json();
          setApiError(errorData.error || "An error occurred");
        }
      } else {
        setApiError("An error occurred");
      }
    } catch (error) {
      setApiError("An error occurred");
    }
  };
  return (
    <CardWrapper
      title="Add Event"
      footerContent={<Button type="submit">Add Event</Button>}
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <FormProvider {...form}>
        <Form {...form}>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Event title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input placeholder="Event description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input placeholder="Event location" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image URL</FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://example.com/image.jpg"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="startDateTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Start Date and Time</FormLabel>
                <FormControl>
                  <Input
                    type="datetime-local"
                    {...field}
                    value={field.value.toISOString().slice(0, 16)}
                    onChange={(e) => field.onChange(new Date(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="endDateTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>End Date and Time</FormLabel>
                <FormControl>
                  <Input
                    type="datetime-local"
                    {...field}
                    value={field.value.toISOString().slice(0, 16)}
                    onChange={(e) => field.onChange(new Date(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input placeholder="Event price" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="capacity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Capacity</FormLabel>
                <FormControl>
                  <Input placeholder="Event capacity" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="isFree"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Is Free?</FormLabel>
                <FormControl>
                  {/* <Input
                    type="checkbox"
                    {...field}
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                  /> */}
                  <Checkbox id="terms1" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>URL</FormLabel>
                <FormControl>
                  <Input placeholder="https://example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Dropdown
                    onChangeHandler={field.onChange}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {apiError && <p style={{ color: "red" }}>{apiError}</p>}
        </Form>
      </FormProvider>
    </CardWrapper>
  );
};
export default EventForm;
