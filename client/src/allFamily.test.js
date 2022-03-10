import AllFamily from "./allFamily";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import { useSelector } from "react-redux";

jest.mock("react-redux");

test("Loading state shows then loading is true", async () => {
    useSelector.mockImplementation((cb) => cb({}));
    const { container } = render(
        <BrowserRouter>
            <AllFamily loading="true" />
        </BrowserRouter>
    );
    // console.log("print container:", container);
    expect(container.querySelector("div").innerHTML).toBe("Loading...");
});
test("Error state shows then error is truthy", async () => {
    useSelector.mockImplementation((cb) => cb({}));
    const { container } = render(
        <BrowserRouter>
            <AllFamily error="Loading error" />
        </BrowserRouter>
    );
    // console.log("print container:", container);
    expect(container.querySelector("div").innerHTML).toBe("Error");
});

test("Family members shows than there is a family", async () => {
    useSelector.mockImplementation((cb) =>
        cb([{ id: 1, first: "Firstname", last: "Lastname" }])
    );
    const { container } = render(
        <BrowserRouter>
            <AllFamily />
        </BrowserRouter>
    );
    // console.log("print container:", container);
    expect(container.getElementsByClassName("main-family-screen").length).toBe(
        1
    );
});
