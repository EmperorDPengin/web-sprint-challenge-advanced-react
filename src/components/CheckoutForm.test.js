import React from "react";
import MutationObserver from 'mutationobserver-shim';
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CheckoutForm from "./CheckoutForm";

// Write up the two tests here and make sure they are testing what the title shows

test("renders without errors", () => {
    render(<CheckoutForm />);
});

test("shows success message on submit with form details", () => {
    render(<CheckoutForm />);
    const firstName = "Pengin";
    const lastName = "Emperor";
    const address = "1024 Cherry Street";
    const city = "Jericho";
    const state = "Central City";
    const zip = "10-21";

    userEvent.type(screen.getByLabelText(/first name:/i), firstName);
    userEvent.type(screen.getByLabelText(/last name:/i), lastName);
    userEvent.type(screen.getByLabelText(/address:/i), address);
    userEvent.type(screen.getByLabelText(/city:/i), city);
    userEvent.type(screen.getByLabelText(/state:/i), state);
    userEvent.type(screen.getByLabelText(/zip:/i), zip);

    userEvent.click(screen.getByRole("button", { name: /checkout/i}));

    expect(screen.getByTestId("successMessage")).toBeInTheDocument();

    expect(screen.getByText(`${firstName} ${lastName}`)).toBeInTheDocument();
    expect(screen.getByText(`${address}`)).toBeInTheDocument();
    expect(screen.getByText(`${city}, ${state} ${zip}`)).toBeInTheDocument();

});
