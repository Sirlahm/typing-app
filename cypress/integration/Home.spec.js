/// <reference types="cypress"/>

const string =
  "This is a simple app for users to test and improve their typing skills. The app will present the user with a random text paragraph or the user can c/p his own choice of the paragraph. We will call it a challenge. Then the user will select the time duration of the test it can be 1 m, 2m 5m, or custom. Once the test is set up he can start the test and hence the timer. The user needs to type the paragraph in another text box as it is. For each correct word he will get 1 point, for each incorrect word he types he will receive 0 points. Total points will be the total no of words in the paragraph. At the end of the test, the user will be presented with his score which is his typing accuracy and speed.";
const arrayWords = string.trim().split(" ");

context("Home Page", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("Should Present a default paragraph. ", () => {
    cy.contains("button", "Start").click();
    cy.get("[data-cy='text-area-1']").type(string);
    cy.get("[data-cy='text-area-1']").should("have.text", string);
    cy.get(".index_words__yTQbP").should("have.text", string);
  });

  it("Should Select Timer.", () => {
    cy.get("select").select("120s").should("have.value", 120);
  });

  it("Should check if a single word is correct.", () => {
    cy.contains("button", "Start").click();
    expect("This").to.be.oneOf(arrayWords);
    expect("is").to.be.oneOf(arrayWords);
    expect("a").to.be.oneOf(arrayWords);
    expect("push").to.not.be.oneOf(arrayWords);
  });

  it("Should show modal when compose paragraph is clicked.", () => {
    cy.get("[data-cy='button-compose']").click();
    cy.get(".Modal_container__kGgk_").should("be.visible");
  });

  it("Should close modal when cancel button is clicked. ", () => {
    cy.contains("button", "Compose Paragraph").click();
    cy.get(".Modal_container__kGgk_").should("be.visible");

    cy.contains("button", "Cancel").click();
    cy.get("[data-cy='modal']").should("not.exist");
  });

  it("Should make the paragraph composed be the paragraph to be presented. ", () => {
    cy.contains("button", "Compose Paragraph").click();
    cy.get("[data-cy='text-area-2']").type("I composed this Paragraph.");
    cy.contains("button", "Submit").click();
    cy.contains("button", "Start").click();
    cy.get("[data-cy='text-area-1']").type("I composed this Paragraph.");
    cy.get("[data-cy='text-area-1']").should(
      "have.text",
      "I composed this Paragraph."
    );
    cy.get(".index_words__yTQbP").should(
      "have.text",
      "I composed this Paragraph."
    );
  });

  it("should not close the modal if nothing is typed and the submit is clicked. ", () => {
    cy.contains("button", "Compose Paragraph").click();
    cy.get(".Modal_container__kGgk_").should("be.visible");
    cy.contains("button", "Submit").click();

    cy.get(".Modal_container__kGgk_").should("be.visible");
  });

  it("should display wpm and typing  accuracy . ", () => {
    cy.contains("button", "Start").click();
    cy.get("[data-cy='text-area-1']").type(string);
    cy.get("[data-cy='h1-1']", { timeout: 60000 }).should("be.visible");
    cy.get("[data-cy='h1-2']", { timeout: 60000 }).should("be.visible");
  });
});
