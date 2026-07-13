import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { toast } from "sonner";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { ContactSection } from "@/components/landing/contact-section";

// The contact form never talks to a backend (static export) — the success
// path is a sonner toast. Mock the module so we can assert on it.
vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
  },
}));

describe("ContactSection", () => {
  // Guard the "no fetch/API anywhere" constraint: replace fetch entirely so
  // any accidental network call is both detected and blocked.
  const fetchMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubGlobal("fetch", fetchMock);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("shows all three validation messages when submitted empty", async () => {
    const user = userEvent.setup();
    render(<ContactSection />);

    await user.click(screen.getByRole("button", { name: /send message/i }));

    expect(await screen.findByText("Tell us your name.")).toBeInTheDocument();
    expect(await screen.findByText("Enter a valid email address.")).toBeInTheDocument();
    expect(
      await screen.findByText("Give us a few more details about your project."),
    ).toBeInTheDocument();
    expect(vi.mocked(toast.success)).not.toHaveBeenCalled();
  });

  it("fires a success toast, resets the fields and never fetches on valid submit", async () => {
    const user = userEvent.setup();
    render(<ContactSection />);

    const nameInput = screen.getByLabelText("Name");
    const emailInput = screen.getByLabelText("Email");
    const messageInput = screen.getByLabelText("Message");

    await user.type(nameInput, "Ada Lovelace");
    await user.type(emailInput, "ada@example.com");
    await user.type(messageInput, "We need a full rebrand and a new marketing site.");
    await user.click(screen.getByRole("button", { name: /send message/i }));

    await waitFor(() => {
      expect(vi.mocked(toast.success)).toHaveBeenCalledTimes(1);
    });
    expect(vi.mocked(toast.success)).toHaveBeenCalledWith(
      "Message sent",
      expect.objectContaining({ description: expect.any(String) }),
    );

    await waitFor(() => {
      expect(nameInput).toHaveValue("");
    });
    expect(emailInput).toHaveValue("");
    expect(messageInput).toHaveValue("");

    expect(fetchMock).not.toHaveBeenCalled();
  });
});
