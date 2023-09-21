import capitalize from "lodash/capitalize";
import mockProjects from "../fixtures/projects.json";

describe("Project List", () => {
  beforeEach(() => {
    // setup request mock
    cy.intercept("GET", "https://prolog-api.profy.dev/project", {
      fixture: "projects.json",
    }).as("getProjects");

    // open projects page
    cy.visit("http://localhost:3000/dashboard");

    // wait for request to resolve
    cy.wait("@getProjects");
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
  });
});
