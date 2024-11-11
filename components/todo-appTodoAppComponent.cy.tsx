import React from 'react'
import { TodoAppComponent } from './todo-app'



import { v4 as uuidv4 } from 'uuid';

describe('TodoApp Component', () => {
  it('deve renderizar o componente corretamente', () => {
    cy.mount(<TodoAppComponent />);
    
    // Verifica se o título "Lista de Tarefas" está presente
    cy.contains('Lista de Tarefas').should('be.visible');
    
    // Verifica se o campo de input e o botão estão presentes
    cy.get('input[placeholder="Adicionar nova tarefa"]').should('be.visible');
    cy.get('button[type="submit"]').contains('Adicionar').should('be.visible');
  });

  it('deve permitir adicionar uma nova tarefa', () => {
    cy.mount(<TodoAppComponent />);
    
    const todoText = 'Nova Tarefa';
    
    // Insere texto no input
    cy.get('input[placeholder="Adicionar nova tarefa"]').type(todoText);
    
    // Clica no botão de adicionar
    cy.get('button[type="submit"]').click();
    
    // Verifica se a nova tarefa foi adicionada
    cy.contains(todoText).should('be.visible');
  });

  it('deve permitir marcar uma tarefa como concluída', () => {
    cy.mount(<TodoAppComponent />);
    
    const todoText = 'Tarefa a concluir';
    
    // Adiciona uma nova tarefa
    cy.get('input[placeholder="Adicionar nova tarefa"]').type(todoText);
    cy.get('button[type="submit"]').click();
    
    // Marca a tarefa como concluída
    cy.get('[data-test=checkbox]').click();
    
    // Verifica se a tarefa foi marcada como concluída
    cy.get('label').contains(todoText).should('have.class', 'line-through');
  });

  it('deve permitir editar uma tarefa', () => {
    cy.mount(<TodoAppComponent />);
    
    const originalText = 'Tarefa editável';
    const updatedText = 'Tarefa editada';
    
    // Adiciona uma nova tarefa
    cy.get('input[placeholder="Adicionar nova tarefa"]').type(originalText);
    cy.get('button[type="submit"]').click();
    

    
    // Edita o texto da tarefa
    cy.get('input[type="text"]').clear().type(updatedText);
    
    // Clica em "Enter" ou em algum outro lugar para salvar a alteração
    cy.get('input[type="text"]').type('{enter}');
    
    // Verifica se o texto da tarefa foi atualizado
    cy.contains(updatedText).should('be.visible');
  });

  it('deve permitir remover uma tarefa', () => {
    cy.mount(<TodoAppComponent />);
    
    const todoText = 'Tarefa removível';
    
    // Adiciona uma nova tarefa
    cy.get('input[placeholder="Adicionar nova tarefa"]').type(todoText);
    cy.get('button[type="submit"]').click();
    
    // Verifica se a tarefa foi adicionada
    cy.contains(todoText).should('be.visible');
    
    cy.get('[data-test=delete]').click();

    // // Verifica se a tarefa foi removida
    cy.contains(todoText).should('not.exist');
  });
});
