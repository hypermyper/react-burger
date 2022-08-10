

   describe('перетаскивание и тасовка ингредиентов в конструкторе, изменение их счетчиков', () => {

    before(() => {
      cy.viewport('macbook-15');
      cy.visit('http://localhost:3000');
  })
   it('Зашли на главную', () => {
       cy.visit('http://localhost:3000');
       cy.wait(1000);       
       cy.visit('http://localhost:3000/login');

   });    

   it('Авторизация', () => {
    cy.viewport('macbook-15');
    cy.get('[ name="login" ]').focus().type('hypermype.r@yandex.ru');
    cy.get('[ name="password" ]').focus().type('Jnwec88Vx');
    cy.get('button').contains('Войти').click();
    cy.intercept("POST", "https://norma.nomoreparties.space/api/auth/login");
    cy.wait(1000);
});   


describe('Открытие-закрытие модального окна', () => {
  it('Должно открываться модальное окно с ингредиентом', () => {
    cy.viewport('macbook-15');
    cy.get('ul a li').first().click({ multiple: true, force: true });
    cy.contains('Детали ингредиента');
    cy.contains('Конструктор');
    cy.wait(1000);    
  });

  it('Должно закрываться модальное окно с ингредиентом', () => {
    cy.viewport('macbook-15');
    cy.get('[class^=modal_button_close__]').last().click({ multiple: true, force: true });
    cy.contains('Детали ингредиента').should('not.exist');
    cy.wait(1000);    
  });
});

    it('Должно осуществиться перетаскивание булки в конструктор и увеличение счетчика', () => {
      cy.viewport('macbook-15');
      cy.get('[class^=burgerconstructor_burger_section__]').as('constructorDropArea');
      cy.get('a[href="/ingredients/60d3b41abdacab0026a733c7"]').as('bun');
      cy.get('@bun').trigger('dragstart');
      cy.get('@constructorDropArea').trigger('drop');
      cy.get('@bun').find('[class^=counter_counter__num__]').as('counter');
      cy.get('@counter').should('contain', 2);
      cy.wait(1000);      
    });
  
  
  
    it('Должно осуществиться перетаскивание соуса в конструктор и увеличение счетчика', () => {
      cy.viewport('macbook-15');
      cy.get('[class^=burgerconstructor_burger_section__]').as('constructorDropArea');
      cy.get('a[href="/ingredients/60d3b41abdacab0026a733cd"]').as('sauce');
      cy.get('@sauce').trigger('dragstart');
      cy.get('@constructorDropArea').trigger('drop');
      cy.get('@sauce').find('[class^=counter_counter__num__]').as('counter');
      cy.get('@counter').should('contain', 1);
      cy.wait(1000);      
    });
  
  
    it('Должно осуществиться перетаскивание начинки в конструктор и увеличение счетчика', () => {
      cy.viewport('macbook-15');
      cy.get('[class^=burgerconstructor_burger_section__]').as('constructorDropArea');
      cy.get('a[href="/ingredients/60d3b41abdacab0026a733ca"]').as('ingredient');
      cy.get('@ingredient').trigger('dragstart');
      cy.get('@constructorDropArea').trigger('drop');
      cy.get('@ingredient').find('[class^=counter_counter__num__]').as('counter');
      cy.get('@counter').should('contain', 1);
      cy.wait(1000);      
    });

  });

  describe('Создание заказа', () => { 

    it('Создание заказа', () => {
      cy.viewport('macbook-15');
      cy.get('button').contains('Оформить заказ').click({ force: true });
      cy.wait(1000);
  });

});