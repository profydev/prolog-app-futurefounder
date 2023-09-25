/* eslint-disable @typescript-eslint/no-namespace */

describe("Footer is rendering", () => {
  let currentVersion;

  before(() => {
    // Read the package.json file to get the current version
    cy.readFile("package.json").then((packageJson) => {
      currentVersion = packageJson.version;
    });
  });

  beforeEach(() => {
    cy.visit("http://localhost:3000/dashboard");
  });

  // List of dashboard pages to check
  const dashboardPages = [
    "/dashboard",
    "/dashboard/issues",
    "/dashboard/alerts",
    "/dashboard/users",
    "/dashboard/settings",
  ];

  dashboardPages.forEach((page) => {
    it(`render on ${page}`, () => {
      // Navigate to the specific dashboard page
      cy.visit(`http://localhost:3000${page}`);

      // Check if the footer is rendered
      cy.get(".footer_footerContainer__Y_kOB").should("exist");
    });
  });

  it("Version number of the application is shown", () => {
    // Check if the current version number is displayed
    cy.get(".footer_footerText__lKUFH").should(
      "contain",
      `Version: ${currentVersion}`,
    );
  });

  it("links are shown", () => {
    // Check if the links are displayed
    cy.get(".footer_footerLinks__vb7Ql").should("exist");
  });

  it("logo shown", () => {
    // Check if the links are displayed
    cy.get(".footer_footerLogo__UfcQo").should("exist");
  });
});
