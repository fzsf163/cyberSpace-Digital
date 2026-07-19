import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { toast } from "sonner";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { ContactSection } from "@/components/landing/contact-section";

// The contact form relays valid submissions to Web3Forms via a client-side
// fetch; success/error both surface as sonner toasts. Mock the module so we can
// assert on it.
vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

describe("ContactSection", () => {
  // Stub fetch so no real Web3Forms request goes out; each test sets the
  // resolved value it needs.
  const fetchMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubEnv("NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY", "test-access-key");
    vi.stubGlobal("fetch", fetchMock);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
  });

  const fillValidForm = async (user: ReturnType<typeof userEvent.setup>) => {
    await user.type(screen.getByLabelText("Name"), "Ada Lovelace");
    await user.type(screen.getByLabelText("Email"), "ada@example.com");
    await user.type(
      screen.getByLabelText("Message"),
      "We need a full rebrand and a new marketing site.",
    );
    await user.click(screen.getByRole("button", { name: /send message/i }));
  };

  it("shows all three validation messages and does not submit when empty", async () => {
    const user = userEvent.setup();
    render(<ContactSection />);

    await user.click(screen.getByRole("button", { name: /send message/i }));

    expect(await screen.findByText("Tell us your name.")).toBeInTheDocument();
    expect(await screen.findByText("Enter a valid email address.")).toBeInTheDocument();
    expect(
      await screen.findByText("Give us a few more details about your project."),
    ).toBeInTheDocument();
    expect(fetchMock).not.toHaveBeenCalled();
    expect(vi.mocked(toast.success)).not.toHaveBeenCalled();
  });

  it("posts to Web3Forms, fires a success toast and resets on a successful submit", async () => {
    fetchMock.mockResolvedValue({ json: async () => ({ success: true }) });
    const user = userEvent.setup();
    render(<ContactSection />);

    await fillValidForm(user);

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledTimes(1);
    });
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe("https://api.web3forms.com/submit");
    expect(init.method).toBe("POST");
    expect(JSON.parse(init.body)).toMatchObject({
      access_key: "test-access-key",
      name: "Ada Lovelace",
      email: "ada@example.com",
      message: "We need a full rebrand and a new marketing site.",
    });

    await waitFor(() => {
      expect(vi.mocked(toast.success)).toHaveBeenCalledWith(
        "Message sent",
        expect.objectContaining({ description: expect.any(String) }),
      );
    });

    await waitFor(() => {
      expect(screen.getByLabelText("Name")).toHaveValue("");
    });
    expect(screen.getByLabelText("Email")).toHaveValue("");
    expect(screen.getByLabelText("Message")).toHaveValue("");
    // Human submit leaves the honeypot untouched.
    expect(JSON.parse(init.body).botcheck).toBe(false);
  });

  it("sends the honeypot flag when the hidden botcheck is filled", async () => {
    fetchMock.mockResolvedValue({ json: async () => ({ success: true }) });
    const user = userEvent.setup();
    const { container } = render(<ContactSection />);

    // Simulate a bot ticking the hidden checkbox before submit (fireEvent so
    // react-hook-form's onChange records the value).
    const honeypot = container.querySelector<HTMLInputElement>(
      'input[name="botcheck"]',
    );
    expect(honeypot).not.toBeNull();
    fireEvent.click(honeypot!);

    await fillValidForm(user);

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledTimes(1);
    });
    // botcheck flows to Web3Forms as truthy, which drops the submission server-side.
    expect(JSON.parse(fetchMock.mock.calls[0][1].body).botcheck).toBe(true);
  });

  it("fires an error toast and keeps the fields on a failed submit", async () => {
    fetchMock.mockResolvedValue({
      json: async () => ({ success: false, message: "Rejected" }),
    });
    const user = userEvent.setup();
    render(<ContactSection />);

    await fillValidForm(user);

    await waitFor(() => {
      expect(vi.mocked(toast.error)).toHaveBeenCalledTimes(1);
    });
    expect(vi.mocked(toast.success)).not.toHaveBeenCalled();
    // Fields are preserved so the user can retry.
    expect(screen.getByLabelText("Name")).toHaveValue("Ada Lovelace");
  });

  it("fires an error toast when the network request throws", async () => {
    fetchMock.mockRejectedValue(new Error("network down"));
    const user = userEvent.setup();
    render(<ContactSection />);

    await fillValidForm(user);

    await waitFor(() => {
      expect(vi.mocked(toast.error)).toHaveBeenCalledTimes(1);
    });
    expect(vi.mocked(toast.success)).not.toHaveBeenCalled();
  });
});
