import capitalize from "lodash/capitalize";
import mockProjects from "../fixtures/projects.json";

describe("Project List", () => {
  let skipWait = false;

  beforeEach(() => {
    // setup request mock
    cy.intercept("GET", "https://prolog-api.profy.dev/project", {
      fixture: "projects.json",
    }).as("getProjects");

    // open projects page
    cy.visit("http://localhost:3000/dashboard");

    // Conditionally wait for the request to resolve
    if (!skipWait) {
      cy.wait("@getProjects");
    }
  });

  context("desktop resolution", () => {
    beforeEach(() => {
      cy.viewport(1025, 900);
    });

    const renderedStatuses = mockProjects.map((project) => {
      return project.status === "error"
        ? "Critical"
        : project.status === "info"
        ? "Stable"
        : capitalize(project.status);
    });

    it("renders the projects", () => {
      const languageNames = ["React", "Node.js", "Python"];

      // get all project cards
      cy.get("main")
        .find("li")
        .each(($el, index) => {
          // check that project data is rendered
          cy.wrap($el).contains(mockProjects[index].name);
          cy.wrap($el).contains(languageNames[index]);
          cy.wrap($el).contains(mockProjects[index].numIssues);
          cy.wrap($el).contains(mockProjects[index].numEvents24h);
        });
    });

    it("color of the status badge matches the project status", () => {
      const statusColors = {
        warning: "rgb(255, 250, 235)",
        info: "rgb(236, 253, 243)",
        critical: "rgb(254, 243, 242)",
      };

      cy.get("main")
        .find("li")
        .each(($el, index) => {
          const expectedStatus = mockProjects[index].status;
          if (expectedStatus in statusColors) {
            cy.wrap($el)
              .find(".badge_container__FVLnl")
              .should(
                "have.css",
                "background-color",
                statusColors[expectedStatus],
              );
          }
        });
    });

    it("text writes 'Critical' for the error status and 'Stable' for the info status", () => {
      cy.get("main")
        .find("li")
        .each(($el, index) => {
          cy.wrap($el).contains(renderedStatuses[index]);
        });
    });

    it("color of the status badge matches the project status", () => {
      const statusColors = {
        warning: "rgb(255, 250, 235)",
        info: "rgb(236, 253, 243)",
        critical: "rgb(254, 243, 242)",
      };

      cy.get("main")
        .find("li")
        .each(($el, index) => {
          const expectedStatus = mockProjects[index].status;
          if (expectedStatus in statusColors) {
            cy.wrap($el)
              .find(".badge_container__FVLnl")
              .should(
                "have.css",
                "background-color",
                statusColors[expectedStatus],
              );
          }
        });
    });

    it("text writes 'Critical' for the error status and 'Stable' for the info status", () => {
      cy.get("main")
        .find("li")
        .each(($el, index) => {
          cy.wrap($el).contains(renderedStatuses[index]);
        });
    });
  });

  context("loading screen", () => {
    before(() => {
      skipWait = true;
    });

    after(() => {
      skipWait = false;
    });
    it("should display the loading screen while fetching data", () => {
      // Don't wait for the API to resolve yet, check for spinner immediately
      // cy.wait(500);
      cy.get(".spinner_spinnerCircle__UXPFN").should("be.visible");

      // Now wait for API to resolve
      cy.wait("@getProjects");

      // Check if the loading spinner is no longer displayed
      cy.get(".spinner_spinnerCircle__UXPFN").should("not.exist");
    });
  });

  context("error handling", () => {
    beforeEach(() => {
      // Mock a failed request
      cy.intercept("GET", "https://prolog-api.profy.dev/project", {
        statusCode: 500,
        body: {
          error: "Internal Server Error",
        },
      }).as("getProjectsFailed");

      cy.visit("http://localhost:3000/dashboard");
    });

    it("should display an error message when the request fails", () => {
      // Wait for the failed request to complete
      cy.wait("@getProjectsFailed");
      cy.wait(5000);
      // Check if the error message is displayed
      cy.get(".error_alertContainer__EPA7V")
        .should("be.visible")
        .and("contain", "There was a problem while loading the project data");
    });
    it("should reload data when 'Try again' button is clicked", () => {
      // Wait for the failed request to complete
      cy.wait("@getProjectsFailed");
      cy.get(".spinner_spinnerCircle__UXPFN", { timeout: 60000 }).should(
        "not.exist",
      );

      // Mock a successful request for the retry
      cy.intercept("GET", "https://prolog-api.profy.dev/project", {
        fixture: "projects.json",
      }).as("getProjectsRetry");
      cy.wait(5000);
      cy.get("button").contains("Try again").click();
      cy.wait("@getProjectsRetry").its("response.statusCode").should("eq", 200);
    });
  });
});
