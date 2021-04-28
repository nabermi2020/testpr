describe("Home Page", () => {
   it('should display a list of courses', () => {
     cy.server();
     cy.fixture('courses.json').as('coursesJSON');
     cy.route('/api/courses', '@coursesJSON').as('courses');

     cy.visit('/');
     cy.contains('All Courses');

     //expect(true).to.equal(true);

     cy.wait('@courses');

     cy.get('mat-card').should('have.length', 9);
   });

   it('should display the advanced courses', () => {
    cy.get('.mat-tab-label').should('have.length', 2);

    cy.get('.mat-tab-label').last().click();

    cy.get('.mat-tab-body-active .mat-card-title').its('length').should('be.gt', 1);

     cy.get('.mat-tab-body-active .mat-card-title').first().should(
       'contain',
       'Angular Security Course'
     );

    // cy.contains('VIEW COURSE').first().click();


   });


   it('navigate to some specific course', () => {
     cy.server();
     cy.fixture('testing-course.json').as('courseJSON');
     cy.route('/api/courses/6', '@courseJSON').as('courses');

     cy.fixture('testing-lessons-page-1.json').as('lessonsJSON');
     cy.route('/api/lessons?courseId=6&filter=&sortOrder=asc&pageNumber=0&pageSize=3', '@lessonsJSON').as('lessons');

     cy.wait(2500);

     let card = cy.get('mat-card > mat-card-actions > button').first().click();


     cy.wait('@lessons');

     cy.get('.course').should('contain', 'Angular Testing Course');
   });


});
