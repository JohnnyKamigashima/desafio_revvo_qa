const AddNewCoursePage = require("./AddNewCoursePage")

class GerenciarCursosPage{
    elementos = {
        listaDeCursos:              () => cy.get('.ml.course-list.yui3-dd-drop'),
        botaoExcluirCurso:          () => cy.get('a.coursename:contains("Desafio Revvo QA")')
            .siblings('div.float-right').find('i[title="Excluir"]'),
        botaoConfirmarExcluir:      () => cy.get('button[class="btn btn-primary"]'),
        courseEditTitle:                () => cy.get('h1'),
        courseEditMenuName:             () => cy.get('#nav-drawer'),
        coursePainelObrigatorio:        () => cy.get('fieldset[id="id_general"] div[class="fcontainer clearfix"]')
        
    }

    validaCursoAdicionado(nomeCompleto, nomeCurto, mensagem){
        if(mensagem == ''){
            this.elementos.courseEditTitle().should('contain', nomeCompleto)
            this.elementos.courseEditMenuName().should('contain', nomeCurto)
        }else{
            AddNewCoursePage.verificaMensagensDeErro(mensagem)
        }
    }

    excluirCurso(curso){
        this.elementos.listaDeCursos()
        .should('have.length.gte', 0)
        .then(($lista)=>{
            console.dir($lista)
            console.log($lista[0].innerText)
            if($lista[0].innerText.includes(curso)){
                cy.wrap($lista)
                    .find('a.coursename:contains("'+curso+'")')
                    .siblings('div.float-right').find('i[title="Excluir"]').click();
                this.elementos.botaoConfirmarExcluir().click()
            }else{
                console.log('Curso não existe')
            }
        })
    }
}
module.exports = new GerenciarCursosPage();