import React from "react";
import BridgeInfoPage from "./BridgeInfo.jsx";
import { renderWithStore } from "../../testFns";

test('Renders the "Loading..." text', () => {
  const { getByRole } = renderWithStore(<BridgeInfoPage />);
  expect(getByRole("heading", "Loading...")).toBeInTheDocument();
});
// TODO: add more tests!
