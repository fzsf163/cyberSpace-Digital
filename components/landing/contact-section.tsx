"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

const contactFormSchema = z.object({
  name: z.string().min(2, "Tell us your name."),
  email: z.string().email("Enter a valid email address."),
  message: z.string().min(10, "Give us a few more details about your project."),
  // Honeypot — real users never toggle it; bots that fill every field do.
  botcheck: z.boolean().optional(),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export function ContactSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { name: "", email: "", message: "", botcheck: false },
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  // Submits to Web3Forms (no backend of our own): a client-side POST that
  // relays the message to the destination inbox. The access key is public by
  // design (see .env). react-hook-form awaits this, so `isSubmitting` drives
  // the button's disabled state.
  async function onSubmit(values: ContactFormValues) {
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY,
          subject: "New project inquiry — CyberSpace Digital",
          name: values.name,
          email: values.email,
          message: values.message,
          botcheck: values.botcheck ?? false,
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Message sent", {
          description:
            "Thanks for reaching out — we'll get back to you within 1-2 business days.",
        });
        form.reset();
      } else {
        toast.error("Something went wrong", {
          description:
            data.message ?? "Your message couldn't be sent. Please try again.",
        });
      }
    } catch {
      toast.error("Something went wrong", {
        description: "Please check your connection and try again.",
      });
    }
  }

  return (
    <section id="contact" className="relative py-24 lg:py-32 overflow-hidden bg-section">
      {/* Repeated word strip */}
      <div className="overflow-hidden mb-12 lg:mb-16" aria-hidden="true">
        <div className="flex w-max animate-contact-marquee">
          {[0, 1].map((half) => (
            <div key={half} className="flex shrink-0 items-center">
              {Array.from({ length: 8 }).map((_, i) => (
                <span
                  key={i}
                  className="pr-12 text-6xl lg:text-8xl font-display text-foreground/5 whitespace-nowrap"
                >
                  Contact
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-350 mx-auto px-6 lg:px-12">
        <Reveal>
          <div
            className="relative rounded-3xl border border-foreground overflow-hidden"
            onMouseMove={handleMouseMove}
          >
          {/* Spotlight effect */}
          <div
            className="absolute inset-0 opacity-10 pointer-events-none transition-opacity duration-300"
            style={{
              background: `radial-gradient(600px circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(0,0,0,0.15), transparent 40%)`
            }}
          />

          <div className="relative z-10 px-8 lg:px-16 py-16 lg:py-24">
            <div className="flex flex-col lg:flex-row items-start justify-between gap-16">
              {/* Left content */}
              <div className="flex-1 lg:max-w-md">
                <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-8">
                  <span className="w-12 h-px bg-foreground/30" />
                  Contact
                </span>

                <h2 className="text-6xl md:text-7xl lg:text-[72px] font-display tracking-tight mb-8 leading-[0.95]">
                  Let&apos;s build
                  <br />
                  something.
                </h2>

                <p className="text-xl text-muted-foreground mb-12 leading-relaxed max-w-xl">
                  Tell us about your project. We reply to every inquiry within
                  1-2 business days with next steps.
                </p>

                <p className="text-sm text-muted-foreground font-mono">
                  hello@cyberspace.digital
                </p>
              </div>

              {/* Right: contact form */}
              <div className="w-full lg:max-w-md">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {/* Honeypot — hidden from users & assistive tech; bots that
                        fill it are dropped by Web3Forms. Registered so its value
                        rides along in the submit payload. */}
                    <input
                      type="checkbox"
                      tabIndex={-1}
                      autoComplete="off"
                      aria-hidden="true"
                      className="hidden"
                      style={{ display: "none" }}
                      {...form.register("botcheck")}
                    />
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                            Name
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="Your name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                            Email
                          </FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="you@company.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                            Message
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="What are you looking to build?"
                              className="min-h-32"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="submit"
                      size="lg"
                      disabled={form.formState.isSubmitting}
                      className={cn(
                        "w-full bg-foreground hover:bg-foreground/90 text-background h-14 text-base rounded-full group"
                      )}
                    >
                      Send message
                      <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </form>
                </Form>
              </div>
            </div>
          </div>

          {/* Decorative corner */}
          <div className="absolute top-0 right-0 w-32 h-32 border-b border-l border-foreground/10" />
          <div className="absolute bottom-0 left-0 w-32 h-32 border-t border-r border-foreground/10" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
